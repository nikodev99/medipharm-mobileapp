import createContextHook from "@nkzw/create-context-hook";
import {useColorScheme} from "react-native";
import {useEffect, useState} from "react";
import colors from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

const THEME_STORAGE_KEY = '@gu_medipharm_theme'

export const [ThemeContext, useTheme] = createContextHook(() => {
    const systemColorScheme = useColorScheme()
    const [themeMode, setThemeMode] = useState<ThemeMode>('system')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const activeColorScheme: ColorScheme = themeMode === "system" ? (systemColorScheme === 'dark' ? 'dark' : 'light') : themeMode
    const color = colors[activeColorScheme]

    useEffect(() => {
        loadTheme()
            .then()
    }, []);

    const loadTheme = async () => {
        try {
            const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system')) {
                setThemeMode(storedTheme as ThemeMode);
            }
        }catch (error) {
            console.error('failed to load theme: ', error)
        }finally {
            setIsLoading(false)
        }
    }

    const setTheme = async (mode: ThemeMode) => {
        try {
            setThemeMode(mode)
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode)
        }catch (error) {
            console.error('failed to load theme: ', error)
        }
    }

    return {
        themeMode,
        activeColorScheme,
        color,
        setTheme,
        isLoading
    }
})