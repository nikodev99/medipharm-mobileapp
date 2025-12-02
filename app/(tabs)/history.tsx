import { Medicine, medicines } from "@/api/medecine";
import colors from "@/constants/colors";
import { RecentSearch, useRecentSearches } from "@/context/RecentSearchesContext";
import { Stack, useRouter } from "expo-router";
import {ChevronRight, Clock, Trash2} from "lucide-react-native";
import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    if (days < 7) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    return new Date(timestamp).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function HistoryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const {recentSearches, clearRecentSearches} = useRecentSearches();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    const handleClearHistory = () => {
        if (!showConfirm) {
            setShowConfirm(true);
            setTimeout(() => setShowConfirm(false), 3000);
            return
        }
        clearRecentSearches();
        setShowConfirm(false);
    }

    const handleMedicationPress = (medecineId: string) => {
        router.push(`/pharmacy-results?medecineId=${medecineId}`);
    }

    const renderMedecineItem = ({item}: {item: RecentSearch}) => {
        const medicine = medicines.find(m => m.id === item.medecineId) as Medicine;
        if (!medicine) return null;

        const timeAgo = getTimeAgo(item.searchedAt as number);

        return(
            <TouchableOpacity style={styles.historyItem} onPress={() => handleMedicationPress(item.medecineId as string)}>
                <View style={styles.historyItemContainer}>
                    <Clock size={20} color={colors.ligth.primary} />
                </View>
                <View style={styles.historyInfo}>
                    <Text style={styles.historyName}>{medicine.name}</Text>
                    <Text style={styles.historyGeneric}>{medicine.genericName}</Text>
                    <Text style={styles.historyTime}>{timeAgo}</Text>
                </View>
                <ChevronRight size={20} color={colors.ligth.textTertiary} />
            </TouchableOpacity>
        )
    }

    return(
        <>
            <Stack.Screen options={{headerShown: false}} />
            <View style={styles.container}>
                <View style={[styles.header, {paddingTop: insets.top + 20}]}>
                    <Text style={styles.headerTitle}>Historique</Text>
                    <Text style={styles.headerSubTitle}>Vos recherches récentes</Text>
                </View>

                {recentSearches.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Clock size={64} color={colors.ligth.textSecondary} />
                        <Text style={styles.emptyStateText}>Aucune recherche récente</Text>
                        <Text style={styles.emptyStateSubText}>Vos recherches de médicaments apparaitrons ici</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.headerAction}>
                            <Text style={styles.countText}>
                                {recentSearches.length} recherche{recentSearches.length > 1 ? 's' : ''}
                            </Text>
                            <TouchableOpacity 
                                style={[styles.clearButton, showConfirm && styles.clearButtonConfirm]} 
                                onPress={handleClearHistory}
                            >
                                <Trash2 size={16} color={showConfirm ? '#ffffff' : colors.ligth.error} />
                                <Text style={[styles.clearButtonText, showConfirm && styles.clearButtonTextConfirm]}>
                                    {showConfirm ? 'Appuyer pour confirmer' : 'Effacer tout'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList 
                            data={recentSearches} 
                            keyExtractor={(item, index) => `${item.medecineId}-${index}`}
                            renderItem={renderMedecineItem}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ligth.background
    },
    header: {
        backgroundColor: colors.ligth.primary,
        paddingHorizontal: 20,
        paddingBottom: 24
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: colors.ligth.surface,
        marginBottom: 4
    },
    headerSubTitle: {
        fontSize: 15,
        color: "rgba(255, 255, 255, 0.9)",
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyStateText: {
        fontSize: 20,
        fontWeight: '600' as const,
        color: colors.ligth.text,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 8
    },
    emptyStateSubText: {
        fontSize: 15,
        color: colors.ligth.textSecondary,
        textAlign: 'center',
        lineHeight: 22
    },
    headerAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBlockColor: colors.ligth.border,
        backgroundColor: colors.ligth.surface
    },
    countText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: colors.ligth.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: .5
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(244, 67, 54, 0.1)'
    },
    clearButtonConfirm: {
        backgroundColor: colors.ligth.error
    },
    clearButtonText: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: colors.ligth.error,
        marginLeft: 6
    },
    clearButtonTextConfirm: {
        color: '#ffffff'
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.ligth.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: colors.ligth.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1
    },
    historyItemContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: `${colors.ligth.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    historyInfo: {
        flex: 1,
    },
    historyName: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: colors.ligth.text,
        marginBottom: 2
    },
    historyGeneric: {
        fontSize: 13,
        color: colors.ligth.textSecondary,
        marginBottom: 4
    },
    historyTime: {
        fontSize: 12,
        color: colors.ligth.textTertiary,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20
    }
})
