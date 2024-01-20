import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  DataTable,
  Divider,
  Icon,
  IconButton,
  MD2Colors,
  MD2DarkTheme,
  MD2LightTheme,
  MD3Colors,
  MD3DarkTheme,
  MD3LightTheme,
  Paragraph,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import AddToCart from "../../components/AddToCart";
import {
  $color1,
  $color2,
  $defaultColor,
  $primaryColor,
  deviceHeight,
  deviceWidth,
} from "../../utils/device";
import { ProductProps } from "../../utils/models";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { useEffect } from "react";
import { ProductCard } from "../../components/Product/ProductCard";
import { onClearCart } from "../../utils/store/actions/cart.actions";
import Header from "../../components/Header/Header";
import { PrimaryButton } from "../../components/UI/Buttons";

export default function CartScreen({ navigation, route }) {
  const { cart } = useSelector((state) => state) as any;
  const cartCount = cart?.items?.reduce((a, b) => (a += b?.quantity), 0);
  const subTotal = cart?.items?.reduce(
    (a, b) => (a += b?.quantity * b?.product.price),
    0
  );

  useEffect(() => {
    navigation.setOptions({
      title: !!cartCount ? "Mon Panier" : "",
      headerShown: false,
      headerLeft: (props) => {
        return (
          <>
            {!!cartCount && (
              <IconButton
                onPress={() => navigation.goBack()}
                icon={"arrow-left"}
                size={17}
              ></IconButton>
            )}
          </>
        );
      },
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!cartCount ? (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Icon color={$primaryColor} size={100} source="shopping-outline" />
            <Text
              variant="titleMedium"
              style={{
                color: MD2Colors.indigo500,
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              Votre panier est Vide :(
            </Text>
            <Button
              onPress={() => navigation?.navigate("HomeScreen")}
              mode="contained"
              buttonColor={$defaultColor}
              textColor={$primaryColor}
            >
              Continuer vos achats
            </Button>
          </View>
        </View>
      ) : (
        <>
          <BottomNavBar pageId={route.name} navigation={navigation} />

          <ScrollView>
            <SafeAreaView>
              <View style={{ padding: 15 }}>
                <Header navigation={navigation} title={"Mon panier"} />
                <View style={{ marginTop: 20 }}>
                  {cart?.items?.map(({ product }) => {
                    const { sale_price, price, regular_price } =
                      product as ProductProps;
                    return (
                      <ProductCard
                        navigation={navigation}
                        type="a"
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
                  <Pressable
                    style={{ position: "absolute", right: 5, top: 10 }}
                  >
                    <PrimaryButton onEventHandler={() => {}} title="Valider" />
                  </Pressable>
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

                  <PrimaryButton
                    onEventHandler={() => {
                      navigation.navigate("RegisterScreen");
                    }}
                    title="Valider mon Panier"
                  />
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
        </>
      )}
    </View>
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
