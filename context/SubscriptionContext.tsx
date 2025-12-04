import createContextHook from "@nkzw/create-context-hook";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = '@medipharm_app_subscription'

export const [SubscriptionContext, useSubscription] = createContextHook(() => {
    const [isPremium, setIsPremium] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        loadSubscription()
            .then()
    }, []);

    const loadSubscription = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setIsPremium(JSON.parse(stored))
            }
        }catch (error) {
            console.error('failed to load subscription: ', error)
        }finally {
            setIsLoading(false)
        }
    }

    const subscribe = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(true))
            setIsPremium(true)
        }catch (error) {
            console.error('failed to subscribe: ', error)
        }
    }

    const unsubscribe = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(false))
            setIsPremium(false)
        }catch (error) {
            console.error('failed to unsubscribe: ', error)
        }
    }

    return {
        isPremium,
        isLoading,
        subscribe,
        unsubscribe
    }
})