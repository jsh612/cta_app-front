import React from "react";
import { AdMobBanner } from "expo-ads-admob";

const IOSAd = () => {
  const bannerError = error => {
    console.log(("An error", error));
    return;
  };

  return (
    <AdMobBanner
      adUnitID="ca-app-pub-1397214494138395/1262883469"
      servePersonalizedAds
      onDidFailToReceiveAdWithError={bannerError}
    />
  );
};

export default IOSAd;
