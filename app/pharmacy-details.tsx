import {View, Text, ScrollView, StyleSheet, Platform} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import {AppleMaps, GoogleMaps} from 'expo-maps'
import {useMemo, useState} from "react";
import {pharmacies} from "@/api/pharmacies";
import {medicines} from "@/api/medecine";
import {useMutation} from "@tanstack/react-query";
import colors from "@/constants/colors";

interface LeafletSection {
    title: string
    content: string
}

const generateText = (prompt: string) => {
    return prompt
}

export default function PharmacyDetails() {
    const { pharmacyId, medicineId } = useLocalSearchParams<{
        pharmacyId: string
        medicineId: string
    }>()

    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
    const [aiExplanation, setAiExplanation] = useState<Map<string, string>>(new Map())

    const pharmacy = useMemo(() => pharmacies.find(p => p.id === pharmacyId), [pharmacyId])
    const medicine = useMemo(() => medicines.find(m => m.id === medicineId), [medicineId])

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

            const explanation = generateText(prompt)
            return {sectionTitle: section.title, explanation}
        },
        onSuccess: (data) => {
            setAiExplanation(prev => new Map(prev).set(data.sectionTitle, data.explanation))
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
        if (aiExplanation.has(section.title)) {
            explainWithAiMutation.mutate(section)
        }
    }

    if (!pharmacy || !medicine) {
        return(
            <View>
                <Text>Information non disponible</Text>
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
                    {Platform.OS === 'ios' ? (
                        <AppleMaps.View
                            style={styles.maps}
                            cameraPosition={{
                                coordinates: {
                                    longitude: pharmacy?.coordinates?.longitude,
                                    latitude: pharmacy?.coordinates?.latitude
                                }
                            }}
                        />
                    ) : (
                        <GoogleMaps.View />
                    )}
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    mapContainer: {},
    maps: {},
})