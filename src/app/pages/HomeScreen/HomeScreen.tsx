import { ScrollView, View } from "react-native";
import Promotion from "../../components/Promotion/Promotion";

import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import React, { useEffect, useState } from "react";
import { Portal, Text, ActivityIndicator } from "react-native-paper";

import FeaturedProducts from "../../components/Promotion/FeaturedProducts";
import OnSaleProducts from "../../components/Home/OnSaleProducts";
import ProductsBanners from "../../components/Promotion/ProductsBanners";
import ProductCategoiesBanners from "../../components/Promotion/ProductcategoiesBanners";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "../../utils/store/reducers/user.reducers";
import {
  getHomeDataApi,
  getCustomerApiCall,
  getOrdersApi,
  allSettingOptions,
} from "../../utils/api-calls";
import {
  setCustomer,
  setOrders,
  setUser,
} from "../../utils/store/actions/user.actions";
import { BG_COLOR, deviceHeight, deviceWidth } from "../../utils/device";
import Spacer from "../../components/UI/Spacer";
import {
  setHomeBanners,
  setHomeCategoriesSlider,
  setHomePromotionBanner,
} from "../../utils/store/actions/product.action";
import { Typography } from "../../components/UI/Typography";
import { PressableButton } from "../../components/UI/Buttons";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state: UserProps) => state.user);
  const dispatch = useDispatch();

  const loadAppData = async () => {
    setIsLoading(true);
    const customerDetails = await getCustomerApiCall(user?.email);
    const promotionData = await await getHomeDataApi("promotion");
    const categoriesBannerData = await await getHomeDataApi("section-slider");
    const bannersData = await await getHomeDataApi("banner_2");

    if (customerDetails?.length > 0) {
      dispatch(setCustomer(customerDetails[0]));
      const myOrders = await await getOrdersApi(customerDetails[0].id);
      if (myOrders?.data?.length > 0) dispatch(setOrders(myOrders.data));
    }
    if (promotionData.data.length > 0) {
      dispatch(setHomePromotionBanner(promotionData.data));
    }
    if (categoriesBannerData.data.length > 0) {
      dispatch(setHomeCategoriesSlider(categoriesBannerData.data));
    }
    if (bannersData.data.length > 0) {
      dispatch(setHomeBanners(bannersData.data));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadAppData();
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <BottomNavBar />
      <ScrollView style={{ paddingBottom: 230, flex: 1 }}>
        <Promotion />
        <Spacer size={30} />
        <Typography fontWeight="SemiBold" align="center" size={24}>
          Nos catégories
        </Typography>
        <Spacer size={30} />
        <ProductCategoiesBanners />

        <Spacer size={30} />
        <Typography fontWeight="SemiBold" align="center" size={24}>
          Nos Principaux coins
        </Typography>
        <Spacer size={30} />

        <ProductsBanners />
        <Spacer size={30} />
        <Typography fontWeight="SemiBold" align="center" size={24}>
          Nos populaires Produits
        </Typography>
        <Spacer size={30} />
        <FeaturedProducts />
        <Spacer size={30} />
        <Typography fontWeight="SemiBold" align="center" size={24}>
          Produits en PROMO !
        </Typography>
        <Spacer size={30} />
        <OnSaleProducts />
        <Spacer size={30} />
        <View style={{ padding: 20 }}>
          <Typography children="Nous Contactez" fontWeight="Medium" />
          <PressableButton
            fontWeight="Bold"
            icon="phone"
            type="default"
            children={" " + process.env.REACT_APP_PHONE}
          />
        </View>

        <Spacer size={130} />
      </ScrollView>

      {!!isLoading && (
        <Portal>
          <View
            style={{
              position: "absolute",
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.9)",
              zIndex: 9,
              height: deviceHeight,
              width: deviceWidth,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={BG_COLOR.default} size={30} />
          </View>
        </Portal>
      )}
    </View>
  );
}
