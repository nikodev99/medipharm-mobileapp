import { View, Text, StyleSheet } from "react-native";
import {Link, Stack} from "expo-router";
import colors from "@/constants/colors";

export default function NotFound() {
    return(
        <>
            <Stack.Screen options={{ title: 'Page Introuvable' }}/>
            <View style={styles.container}>
                <Text style={styles.title}>Cette page n&apo;existe pas.</Text>
                <Link href={'/'} style={styles.link}>
                    <Text style={styles.linkText}>Retourner à l&apo;accueil</Text>
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.light.background
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold' as const,
        color: colors.light.text,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: colors.light.primary,
    }
})