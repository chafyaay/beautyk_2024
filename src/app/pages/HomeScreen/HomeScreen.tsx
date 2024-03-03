import { ScrollView, View } from "react-native";
import Promotion from "../../components/Promotion/Promotion";

import React, { useEffect, useState } from "react";
import { ActivityIndicator, MD2Colors, Portal } from "react-native-paper";

import FeaturedProducts from "../../components/Promotion/FeaturedProducts";
import OnSaleProducts from "../../components/Home/OnSaleProducts";
import ProductsBanners from "../../components/Promotion/ProductsBanners";
import ProductCategoiesBanners from "../../components/Promotion/ProductcategoiesBanners";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerApiCall,
  getOrdersApiCall,
  getReportsApiCall,
} from "../../utils/api-calls";
import Spacer from "../../components/UI/Spacer";
import { Typography } from "../../components/UI/Typography";
import { PressableButton } from "../../components/UI/Buttons";
import { productSelector, userSelector } from "../../utils/store/selectors";

import { useQuery } from "react-query";
import { deviceHeight, deviceWidth } from "../../utils/device";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { setProductTotal } from "../../utils/store/actions/product.action";
import {
  set_Customer,
  set_Orders,
} from "../../utils/store/actions/user.actions";

export default function HomeScreen() {
  const user = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const InitAppData = () => {
    setIsLoading(true);
    getCustomerApiCall(user?.email).then(async (response) => {
      dispatch(set_Customer(response));
      if (response) {
        const orders = await getOrdersApiCall(response?.id);

        dispatch(set_Orders(orders));
        setIsLoading(false);
      }
    });
  };

  const { data, isFetched } = useQuery(
    "Get all shop  products",
    async () => await getReportsApiCall()
  );

  useEffect(() => {
    InitAppData();
  }, [user]);

  useEffect(() => {
    if (isFetched) dispatch(setProductTotal(data));
  }, [isFetched]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {!!isLoading && (
        <Portal>
          <View
            style={{
              height: deviceHeight,
              width: deviceWidth,
              backgroundColor: "rgba(0,0,0,.5)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                zIndex: 1,
                width: deviceWidth / 3,
                height: 80,
                backgroundColor: "rgba(0,0,0,.5)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <ActivityIndicator color={MD2Colors.yellow600} />
            </View>
          </View>
        </Portal>
      )}
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
          <Typography
            children="Nous Contactez"
            color={MD2Colors.grey400}
            fontWeight="Medium"
          />
          <PressableButton
            fontWeight="Light"
            icon="phone"
            type="default"
            children={" " + process.env.REACT_APP_PHONE}
          />
        </View>

        <Spacer size={130} />
      </ScrollView>
    </View>
  );
}
