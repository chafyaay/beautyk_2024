import {
  Image,
  ImageBackground,
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
  IconButton,
  MD2Colors,
  MD2DarkTheme,
  MD2LightTheme,
  MD3Colors,
  MD3DarkTheme,
  MD3LightTheme,
  Paragraph,
  Text,
  TextInput,
} from "react-native-paper";
import AddToCart from "../../components/AddToCart";
import {
  $color1,
  $color2,
  deviceHeight,
  deviceWidth,
} from "../../utils/device";
import { ProductProps } from "../../utils/models";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { useEffect } from "react";
import { ProductCard } from "../../components/Product/ProductCard";

export default function CartScreen({ navigation }) {
  const { cart } = useSelector((state) => state) as any;
  const cartCount = cart?.items?.reduce((a, b) => (a += b?.quantity), 0);
  const subTotal = cart?.items?.reduce(
    (a, b) => (a += b?.quantity * b?.product.price),
    0
  );

  useEffect(() => {
    navigation.setOptions({
      title: !!cartCount ? "Mon Panier" : "",
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
        <>
          <View
            style={{
              width: 200,
              position: "absolute",
              zIndex: 8,
              top: 130,
              left: deviceWidth / 2 - 100,
            }}
          ></View>
          <View
            style={{
              width: 200,
              position: "absolute",
              zIndex: 8,
              bottom: 130,
              left: deviceWidth / 2 - 100,
            }}
          >
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
              onPress={() => navigation?.navigate("home")}
              mode="contained"
            >
              Continuer votre achat
            </Button>
          </View>

          <ImageBackground
            resizeMode="contain"
            imageStyle={{ width: 200, left: 60, top: -50 }}
            style={{
              width: deviceWidth,
              height: deviceHeight,
              backgroundColor: "white",
            }}
            source={{
              uri: "https://orgaliving.com/wp-content/uploads/2024/01/empty.png",
            }}
          />
        </>
      ) : (
        <>
          <BottomNavBar currentPageName={"cart"} navigation={navigation} />

          <ScrollView>
            <View style={{ padding: 20 }}>
              {cart?.items?.map(({ product }) => {
                const { sale_price, price, regular_price } =
                  product as ProductProps;
                return <ProductCard type="a" product={product} />;
              })}
            </View>
            {/* code promo */}
            <View style={{ padding: 20 }}>
              <TextInput
                style={styles.codePromo}
                label="Code promo"
                value=""
                placeholder="XC123FV"
                onChangeText={(text) => {}}
                mode="outlined"
                theme={MD3LightTheme}
              />
              <Button
                theme={MD3LightTheme}
                mode="text"
                style={{ position: "absolute", bottom: 25, right: 30 }}
              >
                Valider
              </Button>
            </View>
            {/* TOTAL */}
            <View style={{ padding: 20 }}>
              <DataTable style={{ backgroundColor: "white", borderRadius: 5 }}>
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

              <Button
                style={{ marginTop: 20 }}
                theme={MD3LightTheme}
                mode="contained"
                onPress={() => {
                  navigation.navigate("RegisterScreen");
                }}
              >
                Valider mon Panier
              </Button>
            </View>
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
