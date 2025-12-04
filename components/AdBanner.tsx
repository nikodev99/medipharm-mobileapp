import {useSubscription} from "@/context/SubscriptionContext";
import {useEffect} from "react";
import {AdMobConfig} from "@/constants/admod";
import {Platform, Text, View, StyleSheet} from "react-native";
import colors from "@/constants/colors";

export default function AdBanner() {
    const {isPremium} = useSubscription()

    useEffect(() => {
        if (!isPremium) {
            console.log('show ad banner id: ', AdMobConfig.getCurrentBannerId())
        }
    }, [isPremium]);

    if (isPremium)
        return null

    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <View style={styles.adContent}>
                    <View style={styles.adTextContainer}>
                        <Text style={styles.adLabel}>PUBLICITÉ</Text>
                        <Text style={styles.adText}>es publicités Google AdMob apparaîtront ici sur mobile</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.adContent}>
                <View style={styles.adTextContainer}>
                    <Text style={styles.adLabel}>PUBLICITÉ</Text>
                    <Text style={styles.adText}>Obtenez Premium pour supprimer les publicités</Text>
                    <Text style={styles.adNote}>
                        Note: Pour afficher de vraies publicités AdMob, vous devez construire l&apos;app avec EAS Build et configurer les ID AdMob dans constants/admob.ts
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light.surface,
        borderTopWidth: 1,
        borderTopColor: colors.light.border,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: colors.light.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        minHeight: 60
    },
    adContent: {
        flex: 1,
        paddingVertical: 8
    },
    adTextContainer: {
        gap: 4
    },
    adLabel: {
        fontSize: 10,
        fontWeight: '700' as const,
        color: colors.light.textTertiary,
        letterSpacing: .5
    },
    adText: {
        fontSize: 13,
        fontWeight: '500' as const,
        color: colors.light.text,
        lineHeight: 18
    },
    adNote: {
        fontSize: 11,
        fontWeight: '400' as const,
        color: colors.light.textSecondary,
        lineHeight: 16,
        marginTop: 4,
        fontStyle: 'italic' as const
    }
})
