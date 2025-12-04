import {View, Text, ScrollView, StyleSheet, Platform, TouchableOpacity, ActivityIndicator} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import {AppleMaps, GoogleMaps} from 'expo-maps'
import {useMemo, useState} from "react";
import {pharmacies, pharmacyStocks} from "@/api/pharmacies";
import {medicines} from "@/api/medecine";
import {useMutation} from "@tanstack/react-query";
import colors from "@/constants/colors";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ClockIcon,
    FileTextIcon,
    MapPin,
    PhoneIcon,
    Sparkles
} from "lucide-react-native";
import {handleCall} from "@/helper/helper";
import {generateText} from "ai";
import {createOpenAI} from "@ai-sdk/openai";

interface LeafletSection {
    title: string
    content: string
}

const gateway = createOpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
})

export default function PharmacyDetails() {
    const { pharmacyId, medicineId } = useLocalSearchParams<{
        pharmacyId: string
        medicineId: string
    }>()

    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
    const [aiExplanation, setAiExplanation] = useState<Map<string, string>>(new Map())

    const pharmacy = useMemo(() => pharmacies.find(p => p.id === pharmacyId), [pharmacyId])
    const medicine = useMemo(() => medicines.find(m => m.id === medicineId), [medicineId])
    const price = useMemo(() => {
        const stock = pharmacyStocks?.find(s => s.pharmacyId === pharmacyId && s.medicineId === medicineId)
        return stock ? stock.price : null
    }, [pharmacyId, medicineId])

    const leafletSections: LeafletSection[] = useMemo(() => [
        {
            title: 'Composition',
            content: medicine?.name + "est classée parmi les anti-inflammatoires non stéroïdiens (AINS). Elle est utilisée pour " +
                "ses propriétés antalgiques (soulage la douleur), antipyrétiques (réduit la fièvre) et antiagrégantes plaquettaires (fluidifie le sang)."
        },
        {
            title: 'Indications thérapeutiques',
            content: 'Elle possède quatre propriétés principales qui dictent son usage : antalgique (anti-douleur), antipyrétique ' +
                '(anti-fièvre), anti-inflammatoire et antiagrégant plaquettaire (fluidifiant du sang).'
        },
        {
            title: "Posologie et mode d'administration",
            content: 'L\'utilisation de ' + medicine?.name + ', surtout à fortes doses ou sur le long terme, n\'est pas anodine et ' +
                'comporte des risques (notamment hémorragiques et gastro-intestinaux). Elle est également contre-indiquée ' +
                'pour la douleur et la fièvre chez l\'enfant et l\'adolescent en cas d\'infection virale (risque de syndrome de Reye).'
        },
        {
            title: 'Contre Indications',
            content: 'Les contre-indications de l\'Aspirine (Acide Acétylsalicylique ou AAS) sont très importantes, car ce médicament, ' +
                's\'il est mal utilisé, peut entraîner des effets secondaires graves, notamment hémorragiques ou allergiques.'
        },
        {
            title: 'Effets indésirables',
            content: medicine?.name + '(Acide Acétylsalicylique - AAS) peut provoquer divers effets indésirables, dont la fréquence ' +
                'et la gravité dépendent souvent de la dose et de la durée du traitement.'
        },
        {
            title: 'Interactions médicamenteuses',
            content: medicine?.name + '(Acide Acétylsalicylique - AAS) interagit avec de nombreux médicaments, principalement en raison de ' +
                'ses effets sur la coagulation sanguine et son impact sur la muqueuse digestive, ainsi que sa façon d\'être métabolisée.'
        },
        {
            title: 'Conservation',
            content: 'La conservation de ' + medicine?.name + '(acide acétylsalicylique - AAS) est essentielle pour garantir son efficacité et sa ' +
                'sécurité. L\'AAS est sensible à l\'humidité et à la chaleur, ce qui peut provoquer sa décomposition chimique.'
        },
    ], [medicine?.name])

    const explainWithAiMutation = useMutation({
        mutationFn: async (section: LeafletSection) => {
            const prompt = `Tu es un pharmacien expert qui explique les notices médicamenteuses en français simple. Voici 
            une section d'une notice de médicament : médicament: ${medicine?.name}, Titre: ${section.title}. Explique en termes simples et
            compréhensibles pour un patient, sans jargon médical complexe. Soi clair, garde un ton proféssionnel mais accessible.`

            const {text} = await generateText({
                model: gateway('gpt-4-turbo'),
                prompt: prompt
            })
            console.log('TEXT: ', text)
            return {sectionTitle: section.title, explanation: text}
        },
        onSuccess: (data) => {
            console.log('EXPLANATION: ', data)
            setAiExplanation(prev => new Map(prev).set(data.sectionTitle, data.explanation))
        },
        onError: (error) => {
            console.log('ERROR: ', error)
        }
    })

    const toggleSection = (sectionTitle: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev)
            if (newSet.has(sectionTitle)) {
                newSet.delete(sectionTitle)
            } else {
                newSet.add(sectionTitle)
            }
            return newSet
        })
    }

    const handleExplainSection = (section: LeafletSection) => {
        if (!aiExplanation.has(section.title)) {
            explainWithAiMutation.mutate(section)
        }
    }

    if (!pharmacy || !medicine) {
        return(
            <View style={styles.container}>
                <Text style={styles.errorText}>Information non disponible</Text>
            </View>
        )
    }

    return(
        <>
            <Stack.Screen options={{
                title: pharmacy?.name,
                headerStyle: {backgroundColor: colors.ligth.primary},
                headerTintColor: colors.ligth.surface,
                headerTitleStyle: {fontWeight: '600' as const}
            }} />
            <ScrollView style={styles.container}>
                <View style={styles.mapContainer}>
                    {/*{Platform.OS === 'ios' ? (
                        <AppleMaps.View
                            style={styles.maps}
                            cameraPosition={{
                                coordinates: {
                                    longitude: pharmacy?.coordinates?.longitude,
                                    latitude: pharmacy?.coordinates?.latitude
                                },
                                zoom: 15
                            }}
                            markers={[
                                {
                                    coordinates: {
                                        longitude: pharmacy?.coordinates?.longitude,
                                        latitude: pharmacy?.coordinates?.latitude
                                    },
                                    title: pharmacy?.name
                                }
                            ]}
                        />
                    ) : Platform.OS === 'android' ? (
                        <GoogleMaps.View
                            style={styles.maps}
                            cameraPosition={{
                                coordinates: {
                                    longitude: pharmacy?.coordinates?.longitude,
                                    latitude: pharmacy?.coordinates?.latitude
                                },
                                zoom: 15
                            }}
                            markers={[
                                {
                                    coordinates: {
                                        longitude: pharmacy?.coordinates?.longitude,
                                        latitude: pharmacy?.coordinates?.latitude
                                    },
                                    title: pharmacy?.name
                                }
                            ]}
                        />
                    ): (
                        <View style={[styles.maps, {justifyContent: 'center', alignItems: 'center', backgroundColor: colors.ligth.surface}]}>
                            <MapPin size={48} color={colors.ligth.textSecondary} />
                            <Text style={{marginTop: 12, color: colors.ligth.textSecondary}}>Carte non disponible pour cet appareil</Text>
                        </View>
                    )}*/}
                    <View style={[styles.maps, {justifyContent: 'center', alignItems: 'center', backgroundColor: colors.ligth.surface}]}>
                        <MapPin size={48} color={colors.ligth.textSecondary} />
                        <Text style={{marginTop: 12, color: colors.ligth.textSecondary}}>Carte non disponible pour cet appareil</Text>
                    </View>
                </View>

                <View style={styles.pharmacyCardInfo}>
                    <View style={styles.pharmacyHeader}>
                        <Text style={styles.pharmacyName}>{pharmacy?.name}</Text>
                        <Text style={styles.pharmacyPrice}>{price} FCFA</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MapPin size={18} color={colors.ligth.textSecondary} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoDistrict}>{pharmacy.district}</Text>
                            <Text style={styles.infoAddress}>{pharmacy.address}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <ClockIcon size={18} color={colors.ligth.textSecondary} />
                        <Text style={styles.infoHours}>{pharmacy.openingHours}</Text>
                    </View>

                    <TouchableOpacity style={styles.callButton} onPress={() => handleCall(pharmacy?.phone)}>
                        <PhoneIcon size={18} color={colors.ligth.surface} />
                        <Text style={styles.callButtonText}>Appeler {pharmacy?.phone}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.medicineInfoCard}>
                    <Text style={styles.medicineName}>{medicine?.name}</Text>
                    <Text style={styles.medicineGenericName}>{medicine?.genericName}</Text>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{medicine?.category}</Text>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <FileTextIcon size={18} color={colors.ligth.primary} />
                    <Text style={styles.sectionTitle}>Notice du médicament</Text>
                </View>

                <View style={styles.premiumBadge}>
                    <Sparkles size={16} color={'#ffd700'} />
                    <Text style={styles.premiumText}>Passer Premium</Text>
                </View>

                {leafletSections?.map(section => {
                    const isExpanded = expandedSections.has(section.title)
                    const hasAiExplanation = aiExplanation.has(section.title)
                    const isLoadingAi = explainWithAiMutation.isPending && explainWithAiMutation.variables?.title === section.title
                    return(
                        <View key={section?.title} style={styles.leafletSection}>
                            <TouchableOpacity style={styles.leafletHeader} onPress={() => toggleSection(section.title)}>
                                <Text style={styles.leafletTitle}>{section.title}</Text>
                                {isExpanded ? (
                                    <ChevronUpIcon size={20} color={colors.ligth.text} />
                                ) : (
                                    <ChevronDownIcon size={20} color={colors.ligth.text} />
                                )}
                            </TouchableOpacity>
                            {isExpanded && (
                                <>
                                    <Text style={styles.leafletContent}>{section.content}</Text>

                                    <TouchableOpacity
                                        style={[styles.aiButton, (hasAiExplanation || isLoadingAi) && styles.aiActiveButton]}
                                        onPress={() => handleExplainSection(section)}
                                        disabled={isLoadingAi || hasAiExplanation}
                                    >
                                        {isLoadingAi ? (
                                            <ActivityIndicator size='small' color={colors.ligth.surface} />
                                        ) : (
                                            <Sparkles size={16} color={colors.ligth.surface} />
                                        )}
                                        <Text style={styles.aiButtonText}>
                                            {hasAiExplanation ? 'Explication Affiché': 'Expliquer avec l\'IA'}
                                        </Text>
                                    </TouchableOpacity>

                                    {hasAiExplanation && (
                                        <View style={styles.aiExplanation}>
                                            <View style={styles.aiExplanationContainer}>
                                                <Sparkles size={16} color={colors.ligth.primary} />
                                                <Text style={styles.aiExplanationTitle}>Explication Simplifiée</Text>
                                            </View>
                                            <Text style={styles.aiExplanationText}>
                                                {aiExplanation.get(section.title)}
                                            </Text>
                                        </View>
                                    )}
                                </>
                            )}
                        </View>
                    )
                })}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ligth.background
    },
    mapContainer: {
        height: 250,
        width: '100%',
        backgroundColor: colors.ligth.surface
    },
    maps: {
        height: '100%',
        width: '100%'
    },
    pharmacyCardInfo: {
        backgroundColor: colors.ligth.surface,
        padding: 20,
        marginBottom: 8
    },
    pharmacyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16
    },
    pharmacyName: {
        flex: 1,
        fontSize: 22,
        fontWeight: '700' as const,
        color: colors.ligth.text,
        marginRight: 12
    },
    pharmacyPrice: {
        fontSize: 22,
        fontWeight: '700' as const,
        color: colors.ligth.primary
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12
    },
    infoTextContainer: {
        flex: 1,
        marginLeft: 10
    },
    infoDistrict: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: colors.ligth.text,
        marginBottom: 2
    },
    infoAddress: {
        fontSize: 15,
        color: colors.ligth.textSecondary,
        lineHeight: 20
    },
    infoHours: {
        fontSize: 15,
        color: colors.ligth.textSecondary,
        marginLeft: 10,
        flex: 1
    },
    callButton: {
        backgroundColor: colors.ligth.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 8
    },
    callButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600' as const,
        marginLeft: 10
    },
    medicineInfoCard: {
        backgroundColor: colors.ligth.surface,
        padding: 20,
        marginBottom: 8,
    },
    medicineName: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: colors.ligth.text,
        marginBottom: 4
    },
    medicineGenericName: {
        fontSize: 15,
        color: colors.ligth.textSecondary,
        marginBottom: 10
    },
    categoryBadge: {
        backgroundColor: colors.ligth.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start'
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: colors.ligth.surface,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.ligth.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.ligth.border

    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: colors.ligth.text,
        marginLeft: 8
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff9e6',
        marginHorizontal: 20,
        marginTop: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffd700'
    },
    premiumText: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: '#888608',
        marginLeft: 6
    },
    leafletSection: {
        backgroundColor: colors.ligth.surface,
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: colors.ligth.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 2,
    },
    leafletHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    leafletTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600' as const,
        color: colors.ligth.text
    },
    leafletContent: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        fontSize: 15,
        color: colors.ligth.text,
    },
    aiButton: {
        backgroundColor: colors.ligth.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 8,
    },
    aiActiveButton: {
        backgroundColor: colors.ligth.textSecondary,
    },
    aiButtonText: {
        color: colors.ligth.surface,
        fontSize: 14,
        fontWeight: '600' as const,
        marginLeft: 8
    },
    aiExplanation: {
        backgroundColor: '#f0f7ff',
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: colors.ligth.primary
    },
    aiExplanationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    aiExplanationTitle: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: colors.ligth.primary,
        marginLeft: 6
    },
    aiExplanationText: {
        fontSize: 15,
        color: colors.ligth.text,
        lineHeight: 22
    },
    errorText: {
        fontSize: 16,
        color: colors.ligth.error,
        textAlign: 'center',
        padding: 20
    }
})