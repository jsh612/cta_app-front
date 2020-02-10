import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { Platform } from "react-native";

const IOSAd = () => {
  const bannerError = error => {
    console.log(("An error", error));
    return;
  };

  const ID =
    Platform.OS === "ios"
      ? "ca-app-pub-1397214494138395/1262883469"
      : "ca-app-pub-1397214494138395/5882253935";
  return (
    <AdMobBanner
      // adUnitID="ca-app-pub-1397214494138395/1262883469" // ios
      // adUnitID="ca-app-pub-1397214494138395/5882253935" // 안드로이드
      adUnitID={ID}
      servePersonalizedAds
      onDidFailToReceiveAdWithError={bannerError}
    />
  );
};

export default IOSAd;
