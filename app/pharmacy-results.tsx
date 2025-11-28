import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {useMemo} from "react";
import {medicines} from "@/api/medecine";
import {pharmacies, pharmacyStocks} from "@/api/pharmacies";
import colors from "@/constants/colors";
import {Clock, MapPin, Phone} from "lucide-react-native";

export default function PharmacyResults() {
    const router = useRouter()
    const { medecineId } = useLocalSearchParams<{ medecineId: string }>()

    const medecine = useMemo(() => medicines.find(m => m.id === medecineId), [medecineId])
    const availablePharmacies = useMemo(() => {
        const stocks = pharmacyStocks.filter(stock => {
            return stock.medicineId === medecineId && stock.inStock
        })
        return stocks.map(stock => {
            const pharmacy = pharmacies.find(pharmacy => pharmacy.id === stock.pharmacyId)
            return pharmacy ? { ...pharmacy, price: stock.price, stock } : null
        }).filter(p => p !== null)
    }, [medecineId])

    const routeToPharmacyDetails = (pharmacyId: string) => {
        router.push({
            pathname: '/pharmacy-details',
            params: {
                pharmacyId: pharmacyId,
                medecineId: medecineId
            }
        })
    }

    const handleCall = (phone: string) => {
        const phoneNumber = Platform.select({
            ios: `telprompt:${phone}`,
            android: `tel:${phone}`
        })

        if (!medecine) {
            return(
                <View style={styles.container}>
                    <Text style={styles.errorText}>Médicament non trouvé</Text>
                </View>
            )
        }
    }

    console.log('Pharmacy results Mounted')

    return(
        <>
            <Stack.Screen options={{
                title: medecine?.name,
                headerStyle: {
                    backgroundColor: colors.ligth.primary
                },
                headerTintColor: colors.ligth.surface,
                headerTitleStyle: {
                    fontWeight: '600' as const
                }
            }} />
            <ScrollView style={styles.container}>
                <View style={styles.medecineInfoCard}>
                    <Text style={styles.medecineName}>{medecine?.name}</Text>
                    <Text style={styles.medecineGeneric}>{medecine?.genericName}</Text>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{medecine?.category}</Text>
                    </View>
                    <Text style={styles.medecineDescription}>{medecine?.description}</Text>
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
                                <MapPin size={16} color={colors.ligth.textSecondary} />
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.pharmacyDistrict}>{pharmacy?.district}</Text>
                                    <Text style={styles.pharmacyAddress}>{pharmacy?.address}</Text>
                                </View>
                            </View>

                            <View style={styles.pharmacyDetail}>
                                <Clock size={16} color={colors.ligth.textSecondary} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ligth.background
    },
    errorText: {
        fontSize: 16,
        color: colors.ligth.error,
        textAlign: 'center',
    },
    medecineInfoCard: {
        backgroundColor: colors.ligth.surface,
        padding: 20,
        marginBottom: 8
    },
    medecineName: {
        fontSize: 22,
        fontWeight: '700' as const,
        color: colors.ligth.text,
        marginBottom: 4
    },
    medecineGeneric: {
        fontSize: 16,
        color: colors.ligth.textSecondary,
        marginBottom: 12
    },
    categoryBadge: {
        backgroundColor: colors.ligth.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 12
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '700' as const,
        color: colors.ligth.surface,
    },
    medecineDescription: {
        fontSize: 15,
        color: colors.ligth.text,
        lineHeight: 22,
    },
    resultsHeader: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.ligth.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.ligth.border
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: colors.ligth.text,
    },
    emptyState: {
        padding: 40,
        alignItems: 'center'
    },
    emptyStateText: {
        fontSize: 16,
        color: colors.ligth.text,
        textAlign: 'center',
        marginBottom: 8
    },
    emptyStateSubText: {
        fontSize: 14,
        color: colors.ligth.textSecondary,
        textAlign: 'center',
    },
    pharmacyCard: {
        backgroundColor: colors.ligth.surface,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 12,
        shadowColor: colors.ligth.shadow,
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
        color: colors.ligth.text,
        marginRight: 8
    },
    pharmacyPrice: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: colors.ligth.primary,
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
        color: colors.ligth.text,
        marginBottom: 2
    },
    pharmacyAddress: {
        fontSize: 14,
        color: colors.ligth.textSecondary,
        lineHeight: 20
    },
    pharmacyHour: {
        fontSize: 14,
        color: colors.ligth.textSecondary,
        marginLeft: 8,
        flex: 1
    },
    callButton: {
        backgroundColor: colors.ligth.primary,
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