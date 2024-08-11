import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { MD2Colors, Avatar, Card } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import Toast from "react-native-toast-message";
import { retrieveProducts } from "../../utils/api-calls";
import { deviceWidth } from "../../utils/device";
import { Typography } from "../../Theme/Typography";
import { PressableButton } from "../../Theme/PressableButton";
import { Spacer } from "../../Theme/Spacer";

export const AppToast = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    retrieveProducts(`products?search=${query}&per_page=3&page=1`).then(
      (response) => {
        setData(response.data);
        setIsLoading(false);
      }
    );
  }, [query]);
  return (
    <Toast
      config={{
        error: ({ text1, text2, props }) => {
          return (
            <View
              style={{
                padding: 10,
                margin: 0,
                width: deviceWidth - 20,
                borderRadius: 8,
                borderColor: MD2Colors.deepOrange500,
                backgroundColor: MD2Colors.deepOrange100,
              }}
            >
              <RenderHTML
                source={{
                  html: `<p>${props.msg}</p>`,
                }}
              />
            </View>
          );
        },

        success: ({ text1, text2, props }) => (
          <View
            style={{
              padding: 10,
              margin: 0,
              width: deviceWidth - 20,
              borderRadius: 8,
              borderColor: MD2Colors.green100,
              backgroundColor: MD2Colors.green400,
            }}
          >
            <Typography
              variant="body1"
              children={props?.msg?.replace(/<[^>]*>?/gm, "")}
            />
          </View>
        ),
        updatedcart: ({ text1, text2, onPress, hide, show, props }) => {
          return (
            <View
              style={{
                width: deviceWidth - 20,
                borderWidth: 3,
                borderRadius: 8,
                borderColor: MD2Colors.green500,
                backgroundColor: "white",
                justifyContent: "space-between",
                padding: 10,
                alignItems: "center",
              }}
            >
              <Avatar.Icon
                size={40}
                {...props}
                style={{ backgroundColor: MD2Colors.green500 }}
                icon="check"
              />
              <Typography variant="body1" children={text1} />
              <Typography variant="body1" children={text2} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  columnGap: 10,
                }}
              >
                <PressableButton
                  children={"Continuer vos achats"}
                  onPress={() => {
                    hide();
                  }}
                  variant={"primary"}
                />

                <PressableButton
                  onPress={() => {
                    props.action();
                    hide();
                  }}
                  children="Panier"
                  variant={"link"}
                />
              </View>
            </View>
          );
        },
        search: ({ props }) => {
          setQuery(props.searchQuery);

          return (
            <View
              style={{
                backgroundColor: MD2Colors.grey200,
                width: deviceWidth,
                borderRadius: 4,
                padding: 10,
                top: 44,
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 16,
              }}
            >
              {!!isLoading && <ActivityIndicator size={15} />}
              {!isLoading && (
                <>
                  {data?.map((product, id) => (
                    <Card
                      onPress={() => props.action(product)}
                      mode="contained"
                      contentStyle={{
                        backgroundColor: MD2Colors.grey100,
                      }}
                    >
                      <Card.Title
                        left={() => (
                          <Card.Cover
                            resizeMode="cover"
                            style={{ width: 50, height: 50 }}
                            source={{ uri: product?.images[0]?.src }}
                          />
                        )}
                        title={
                          <Typography variant="body1">
                            {product.name}
                          </Typography>
                        }
                        titleNumberOfLines={2}
                        titleVariant="bodyLarge"
                        leftStyle={{ marginLeft: -10 }}
                      />
                    </Card>
                  ))}
                  <Spacer size={12} />
                  <PressableButton
                    icon="chevron-right"
                    variant="primary"
                    onPress={props?.action2}
                  >
                    {"Afficher tous les produits"}
                  </PressableButton>
                </>
              )}
            </View>
          );
        },
      }}
    />
  );
};

/*      <View
              style={{
                backgroundColor: MD2Colors.grey300,
                width: deviceWidth - 40,
                overflow: "hidden",
                margin: 20,
                padding: 10,
                borderRadius: 5,
                top: 34,
                alignItems: "flex-start",
              }}
            >
              {!!isLoading && <ActivityIndicator />}
              {data?.map((product, id) => {
                return (
                  <Pressable
                    onPress={() => {
                      props.action(product);
                    }}
                    key={id}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: MD2Colors.grey300,
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      fontWeight="SemiBold"
                      size={15}
                      color={MD2Colors.grey600}
                      numberOfLines={2}
                      style={{
                        lineHeight: 20,
                        paddingTop: 10,
                      }}
                    >
                      {product?.name + "-" + product?.name}
                    </Typography>
                    {/* <Typography
                      fontWeight="SemiBold"
                      size={15}
                      color={MD2Colors.grey600}
                      numberOfLines={2}
                      style={{
                        lineHeight: 20,
                        paddingTop: 10,
                      }}
                    >
                      {product?.name}
                    </Typography> 
                    </Pressable>
                    );
                  })}
                  <Spacer size={12} />
                  <PressableButton
                    icon="chevron-right"
                    type="Link"
                    fontWeight="Bold"
                    onPress={props?.action2}
                  >
                    {"Afficher tous les produits"}
                  </PressableButton>
                </View> */
