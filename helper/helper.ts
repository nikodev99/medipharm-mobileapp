import {Linking, Platform} from "react-native";

export const handleCall = (phone: string) => {
    const phoneNumber = Platform.select({
        ios: `telprompt:${phone}`,
        android: `tel:${phone}`
    })

    if (phoneNumber) {
        Linking.openURL(phoneNumber)
    }
}