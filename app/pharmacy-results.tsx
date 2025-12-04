import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {useMemo} from "react";
import {medicines} from "@/api/medecine";
import {pharmacies, pharmacyStocks} from "@/api/pharmacies";
import {Clock, MapPin, Phone} from "lucide-react-native";
import {handleCall} from "@/helper/helper";
import {useTheme} from "@/context/ThemeContext";

export default function PharmacyResults() {
    const router = useRouter()
    const { medicineId } = useLocalSearchParams<{ medicineId: string }>()
    const { color } = useTheme()
    const styles = createStyles(color)

    const medicine = useMemo(() => medicines.find(m => m.id === medicineId), [medicineId])
    const availablePharmacies = useMemo(() => {
        const stocks = pharmacyStocks.filter(stock => {
            return stock.medicineId === medicineId && stock.inStock
        })
        return stocks.map(stock => {
            const pharmacy = pharmacies.find(pharmacy => pharmacy.id === stock.pharmacyId)
            return pharmacy ? { ...pharmacy, price: stock.price, stock } : null
        }).filter(p => p !== null)
    }, [medicineId])

    const routeToPharmacyDetails = (pharmacyId: string) => {
        router.push({
            pathname: '/pharmacy-details',
            params: {
                pharmacyId: pharmacyId,
                medicineId: medicineId
            }
        })
    }

    if (!medicine) {
        return(
            <View style={styles.container}>
                <Text style={styles.errorText}>Médicament non trouvé</Text>
            </View>
        )
    }

    return(
        <>
            <Stack.Screen options={{
                title: medicine?.name,
                headerStyle: {
                    backgroundColor: color.primary
                },
                headerTintColor: color.surface,
                headerTitleStyle: {
                    fontWeight: '600' as const
                }
            }} />
            <ScrollView style={styles.container}>
                <View style={styles.medicineInfoCard}>
                    <Text style={styles.medicineName}>{medicine?.name}</Text>
                    <Text style={styles.medicineGeneric}>{medicine?.genericName}</Text>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{medicine?.category}</Text>
                    </View>
                    <Text style={styles.medecineDescription}>{medicine?.description}</Text>
                </View>

                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>
                        {availablePharmacies.length} pharmacie{availablePharmacies.length > 1 ? 's' : ''} disponible{availablePharmacies.length > 1 ? 's' : ''}
                    </Text>
                </View>

                {availablePharmacies.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            Aucune pharmacie ne dispose de ce médicament en stock actuellement
                        </Text>
                        <Text style={styles.emptyStateSubText}>
                            Veuillez réessayer plus tard ou contacter directement les pharmacies
                        </Text>
                    </View>
                ) : (
                    availablePharmacies?.map(pharmacy => (
                        <TouchableOpacity
                            key={pharmacy?.id}
                            style={styles.pharmacyCard}
                            onPress={() => routeToPharmacyDetails(pharmacy?.id)}
                        >
                            <View style={styles.pharmacyHeader}>
                                <Text style={styles.pharmacyName}>{pharmacy?.name}</Text>
                                <Text style={styles.pharmacyPrice}>{pharmacy?.price} FCFA</Text>
                            </View>

                            <View style={styles.pharmacyDetail}>
                                <MapPin size={16} color={color.textSecondary} />
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.pharmacyDistrict}>{pharmacy?.district}</Text>
                                    <Text style={styles.pharmacyAddress}>{pharmacy?.address}</Text>
                                </View>
                            </View>

                            <View style={styles.pharmacyDetail}>
                                <Clock size={16} color={color.textSecondary} />
                                <Text style={styles.pharmacyHour}>{pharmacy?.openingHours}</Text>
                            </View>

                            <TouchableOpacity style={styles.callButton} onPress={() => handleCall(pharmacy?.phone)}>
                                <Phone size={18} color="#fff" />
                                <Text style={styles.callButtonText}>{pharmacy?.phone}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </>
    )
}

const createStyles = (color: Record<string, string>) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    errorText: {
        fontSize: 16,
        color: color.error,
        textAlign: 'center',
    },
    medicineInfoCard: {
        backgroundColor: color.surface,
        padding: 20,
        marginBottom: 8
    },
    medicineName: {
        fontSize: 22,
        fontWeight: '700' as const,
        color: color.text,
        marginBottom: 4
    },
    medicineGeneric: {
        fontSize: 16,
        color: color.textSecondary,
        marginBottom: 12
    },
    categoryBadge: {
        backgroundColor: color.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 12
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '700' as const,
        color: color.surface,
    },
    medecineDescription: {
        fontSize: 15,
        color: color.text,
        lineHeight: 22,
    },
    resultsHeader: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: color.surface,
        borderBottomWidth: 1,
        borderBottomColor: color.border
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: color.text,
    },
    emptyState: {
        padding: 40,
        alignItems: 'center'
    },
    emptyStateText: {
        fontSize: 16,
        color: color.text,
        textAlign: 'center',
        marginBottom: 8
    },
    emptyStateSubText: {
        fontSize: 14,
        color: color.textSecondary,
        textAlign: 'center',
    },
    pharmacyCard: {
        backgroundColor: color.surface,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 12,
        shadowColor: color.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    pharmacyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12
    },
    pharmacyName: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600' as const,
        color: color.text,
        marginRight: 8
    },
    pharmacyPrice: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: color.primary,
    },
    pharmacyDetail: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    detailTextContainer: {
        flex: 1,
        marginLeft: 8
    },
    pharmacyDistrict: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: color.text,
        marginBottom: 2
    },
    pharmacyAddress: {
        fontSize: 14,
        color: color.textSecondary,
        lineHeight: 20
    },
    pharmacyHour: {
        fontSize: 14,
        color: color.textSecondary,
        marginLeft: 8,
        flex: 1
    },
    callButton: {
        backgroundColor: color.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 12
    },
    callButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600' as const,
        marginLeft: 8
    }
})