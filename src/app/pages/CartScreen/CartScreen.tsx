import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {
  DataTable,
  Icon,
  IconButton,
  MD2Colors,
  MD3LightTheme,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { useEffect } from "react";
import { ProductListCard } from "../../components/Product/ProductListCard";
import { PressableButton } from "../../components/UI/Buttons";
import { TEXT_COLOR, deviceHeight } from "../../utils/device";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../../components/UI/Typography";
import AppHeader from "../../components/AppHeader/AppHeader";
import Spacer from "../../components/UI/Spacer";
import { cartReducer } from "../../utils/store/reducers/cart.reducers";
import { cartState } from "../../utils/store/store";

export default function CartScreen() {
  const cart = useSelector(cartState);

  const cartCount = cart?.items?.reduce((a, b) => (a += b?.quantity), 0);
  const subTotal = cart?.items?.reduce(
    (a, b) => (a += b?.quantity * b?.product.price),
    0
  );
  const navigation = useNavigation() as any;

  useEffect(() => {
    if (!cartCount)
      navigation.setOptions({
        header: () => <AppHeader />,
      });
  }, [cartCount]);

  if (cartCount) {
    return (
      <View style={{ flex: 1 }}>
        <BottomNavBar />
        <ScrollView>
          <SafeAreaView>
            <View style={{ padding: 15 }}>
              <View style={{ marginTop: 20 }}>
                {cart?.items?.map(({ product }) => {
                  return (
                    <ProductListCard
                      key={product.id}
                      navigation={navigation}
                      product={product}
                    />
                  );
                })}
              </View>
              {/* code promo */}
              <View style={{ marginTop: 20 }}>
                <TextInput
                  style={styles.codePromo}
                  label="Code promo"
                  value=""
                  placeholder="XC123FV"
                  onChangeText={(text) => {}}
                  mode="outlined"
                  theme={MD3LightTheme}
                />
                <View style={{ position: "absolute", right: 2, top: 8 }}>
                  <PressableButton
                    fontWeight="Bold"
                    type="default"
                    children="Valider"
                  />
                </View>
              </View>
              {/* TOTAL */}
              <View style={{ marginTop: 20 }}>
                <DataTable
                  style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginBottom: 30,
                  }}
                >
                  <DataTable.Row>
                    <DataTable.Title>Total Produits</DataTable.Title>
                    <DataTable.Title numeric>{cartCount}</DataTable.Title>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Title>Sous-Total (Dh)</DataTable.Title>
                    <DataTable.Title numeric>{subTotal} </DataTable.Title>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Title>Sous-Total (Dh)</DataTable.Title>
                    <DataTable.Title numeric>{subTotal} </DataTable.Title>
                  </DataTable.Row>
                </DataTable>

                <PressableButton
                  type="primary"
                  fontWeight="Bold"
                  children="Valider mon Panier"
                  onPress={() => {
                    navigation.navigate("CheckoutScreen");
                  }}
                />
              </View>
            </View>
            <Spacer size={100} />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
  return (
    <Portal>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <View style={{ alignItems: "center", height: deviceHeight / 3 }}>
          <Icon size={100} source="shopping" />
          <Typography size={24} fontWeight="Medium">
            Votre panier est Vide :(
          </Typography>
          <Spacer size={39} />
          <PressableButton
            children="Continuer vos achats"
            onPress={() => navigation?.navigate("HomeScreen")}
            fontWeight="Bold"
            type="default"
          />
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderColor: MD2Colors.indigo100,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5,
    width: "100%",
    height: 100,
    backgroundColor: "white",
  },
  cover: {
    width: "33%",
    height: 70,
    marginRight: "3%",
    borderRightColor: MD2Colors.indigo100,
    borderRightWidth: 1,
  },
  codePromo: {},
});
