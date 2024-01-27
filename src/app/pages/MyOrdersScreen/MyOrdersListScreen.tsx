import { useEffect } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { MD2Colors, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import { BG_LIGHT_COLOR } from "../../utils/device";

export const MyOrdersListScreen = ({ route, navigation }) => {
  const { orders } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView>
        <ScrollView style={{ padding: 10 }}>
          <Header
            showCart
            title={"Historique des commandes "}
            navigation={navigation}
          />
          {orders.map((order) => (
            <View
              style={{
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: BG_LIGHT_COLOR.disabled,
                backgroundColor: "white",
                marginBottom: 10,
              }}
            >
              <Text
                variant="labelMedium"
                style={{ textTransform: "uppercase", marginBottom: 10 }}
              >
                Commande N° {order.id}
              </Text>
              {order?.line_items.map((product) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("ProductDetailsScreen", {
                      product: product,
                    });
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingTop: 15,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: BG_LIGHT_COLOR.disabled,
                      borderRadius: 3,
                    }}
                    source={{ uri: product?.image.src }}
                  />
                  <View style={{ paddingLeft: 5 }}>
                    <Text
                      style={{ color: MD2Colors.grey800 }}
                      variant="titleSmall"
                    >
                      {product.name}
                    </Text>
                    <View>
                      <Text style={{ color: MD2Colors.grey600, fontSize: 12 }}>
                        Quantité: {product.quantity}
                      </Text>
                      <Text style={{ color: MD2Colors.grey600, fontSize: 12 }}>
                        Prix : {product.subtotal} Dh
                      </Text>
                      <Text
                        variant="titleMedium"
                        style={{
                          color: MD2Colors.grey600,
                          fontSize: 12,
                        }}
                      >
                        Total :{product.price} Dh
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
