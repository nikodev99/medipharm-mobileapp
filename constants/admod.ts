import {Platform} from "react-native";
import Constants from "expo-constants";

export const AdMobConfig = {
    appId: {
        ios: Constants.expoConfig?.extra?.ADMOB_IOS_APP_ID || 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY',
        android: Constants.expoConfig?.extra?.ADMOB_ANDROID_APP_ID || 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY',
    },

    bannerAdUnitId: {
        ios: __DEV__
            ? 'ca-app-pub-3940256099942544/2934735716'
            : Constants.expoConfig?.extra?.ADMOB_IOS_BANNER_ID || 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
        android: __DEV__
            ? 'ca-app-pub-3940256099942544/6300978111'
            : Constants.expoConfig?.extra?.ADMOB_ANDROID_BANNER_ID || 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    },

    getCurrentBannerId: () => {
        return Platform.OS === 'ios'
            ? AdMobConfig.bannerAdUnitId.ios
            : AdMobConfig.bannerAdUnitId.android;
    },
};