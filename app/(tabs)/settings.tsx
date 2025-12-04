import {Alert, Linking, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router";
import {ThemeMode, useTheme} from "@/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ReactNode, useState} from "react";
import {
    Bell,
    ChevronRight,
    FileText,
    Globe,
    HelpCircle, Info,
    Mail,
    Moon,
    Shield,
    Smartphone,
    Sun, Users
} from "lucide-react-native";

export default function SettingsScreen() {
    const insets = useSafeAreaInsets()
    const {color, themeMode, setTheme} = useTheme()
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true)
    const [language, setLanguage] = useState<string>('Français')

    const styles = createStyles(color)

    const handleThemeChange = () => {
        Alert.alert(
            'Thème', 'Choisissez votre thème', [
                {text: 'Clair', onPress: () => setTheme('light')},
                {text: 'Sombre', onPress: () => setTheme('dark')},
                {text: 'Système', onPress: () => setTheme('system')},
            ]
        )
    }

    const getThemeLabel = (mode: ThemeMode): string => {
        switch (mode) {
            case 'light': return 'Clair'
            case 'dark': return 'Sombre'
            case 'system': return 'Système'
        }
    }

    const getThemeIcon = (mode: ThemeMode): ReactNode => {
        switch (mode) {
            case 'light' : return <Sun size={22} color={color.primary} />
            case 'dark' : return <Moon size={22} color={color.primary} />
            case "system" : return <Smartphone size={22} color={color.primary} />
        }
    }

    const handleLanguageChange = () => {
        Alert.alert(
            'Langue',
            'Choisissez votre langue',
            [
                {
                    text: 'Français',
                    onPress: () => setLanguage('Français')
                },
                {
                    text: 'English',
                    onPress: () => setLanguage('English')
                },
                { text: 'Annuler', style: 'cancel' }
            ], {
                cancelable: true,
            }
        );
    }

    const handleNotifications = () => {
        Alert.alert(
            'Notifications',
            'Gérez vos préférences de notification',
            [
                { text: 'OK' }
            ]
        );
    }

    const handlePrivacy = () => {
        Alert.alert(
            'Confidentialité',
            'Vos données sont protégées et ne sont jamais partagées avec des tiers sans votre consentement.',
            [
                { text: 'OK' }
            ]
        );
    }

    const handleTerms = () => {
        Alert.alert(
            'Conditions d\'utilisation',
            'Veuillez lire nos conditions d\'utilisation sur notre site web.',
            [
                {
                    text: 'Ouvrir le site',
                    onPress: () => Linking.openURL('https://example.com/terms')
                },
                { text: 'Fermer', style: 'cancel' }
            ]
        );
    }

    const handleAbout = () => {
        Alert.alert(
            'À propos',
            'GU Medipharm v0.1.0\n\nTrouvez vos médicaments rapidement à Brazzaville.',
            [
                { text: 'OK' }
            ]
        );
    }

    const handleHelp = () => {
        Alert.alert(
            'Aide',
            'Besoin d\'aide ? Contactez-nous par email.',
            [
                {
                    text: 'Contacter',
                    onPress: () => Linking.openURL('mailto:support@gupharmacy.com')
                },
                { text: 'Fermer', style: 'cancel' }
            ]
        );
    }

    const handleContact = () => {
        Linking.openURL('mailto:contact@gupharmacy.com').then();
    }

    const handleTeam = () => {
        Alert.alert(
            'Équipe',
            'GU Pharmacie est développé par l\'équipe GU à Brazzaville.\n\nNotre mission : faciliter l\'accès aux médicaments pour tous.',
            [
                { text: 'OK' }
            ]
        );
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={[styles.header, {paddingTop: insets.top + 20}]}>
                    <Text style={styles.headerText}>Paramètres</Text>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Apparence</Text>

                        <TouchableOpacity style={styles.menuItem} onPress={handleThemeChange}>
                            <View style={styles.menuItemLeft}>
                                {getThemeIcon(themeMode)}
                                <Text style={styles.menuItemText}>Thème</Text>
                            </View>
                            <View style={styles.menuItemRight}>
                                <Text style={styles.menuItemValue}>{getThemeLabel(themeMode)}</Text>
                                <ChevronRight size={20} color={color.textTertiary} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Préférence</Text>
                        <TouchableOpacity style={styles.menuItem} onPress={handleLanguageChange}>
                            <View style={styles.menuItemLeft}>
                                <Globe size={22} color={color.primary} />
                                <Text style={[styles.menuItemText, { color: color.text }]}>Langue</Text>
                            </View>
                            <View style={styles.menuItemRight}>
                                <Text style={styles.menuItemValue}>{language}</Text>
                                <ChevronRight size={20} color={color.textTertiary} />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <Bell size={22} color={color.primary} />
                                <Text style={styles.menuItemText}>Notifications</Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={(value) => {
                                    setNotificationsEnabled(value);
                                    handleNotifications();
                                }}
                                trackColor={{
                                    false: color.border,
                                    true: color.primary
                                }}
                                thumbColor="#FFFFFF"
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Legal</Text>

                        <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
                            <View style={styles.menuItemLeft}>
                                <Shield size={22} color={color.primary} />
                                <Text style={styles.menuItemText}>Confidentialité</Text>
                            </View>
                            <ChevronRight size={20} color={color.textTertiary} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={handleTerms}>
                            <View style={styles.menuItemLeft}>
                                <FileText size={22} color={color.primary} />
                                <Text style={styles.menuItemText}>Conditions d&apos;utilisation</Text>
                            </View>
                            <ChevronRight size={20} color={color.textTertiary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Support</Text>
                        <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
                            <View style={styles.menuItemLeft}>
                                <HelpCircle size={22} color={color.primary} />
                                <Text style={styles.menuItemText}>Aide</Text>
                            </View>
                            <ChevronRight size={20} color={color.textTertiary} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={handleContact}>
                            <View style={styles.menuItemLeft}>
                                <Mail size={22} color={color.primary} />
                                <Text style={styles.menuItemText}>Nous contacter</Text>
                            </View>
                            <ChevronRight size={20} color={color.textTertiary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>A propos</Text>
                        <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
                            <View style={styles.menuItemLeft}>
                                <Info size={22} color={color.primary} />
                                <Text style={styles.menuItemText}>À propos de l&apos;app</Text>
                            </View>
                            <ChevronRight size={20} color={color.textTertiary} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={handleTeam}>
                            <View style={styles.menuItemLeft}>
                                <Users size={22} color={color.primary} />
                                <Text style={styles.menuItemText}>Équipe</Text>
                            </View>
                            <ChevronRight size={20} color={color.textTertiary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Version 1.0.0</Text>
                        <Text style={styles.footerText}>© 2025 GU Medipharm</Text>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const createStyles = (color: Record<string, string>) => StyleSheet.create({
    container: {
        backgroundColor: color.background,
        flex: 1
    },
    header: {
        backgroundColor: color.primary,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: color.surface,
    },
    content: {
        flex: 1,
        padding: 20,
        marginBottom: 60
    },
    section: {
        marginBottom: 32
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600' as const,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
        color: color.textSecondary
    },
    menuItem: {
        backgroundColor: color.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: color.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    menuItemText: {
        color: color.text,
        fontSize: 16,
        fontWeight: '500' as const,
        marginLeft: 16
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    menuItemValue: {
        color: color.textSecondary,
        fontSize: 15
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 32,
        gap: 8
    },
    footerText: {
        color: color.textTertiary,
        fontSize: 13
    }
})