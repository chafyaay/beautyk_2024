import { ImageBackground, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { TEXT_COLOR, deviceHeight, deviceWidth } from "../../utils/device";
import { PressableButton } from "../../components/UI/Buttons";
import {
  getToken,
  getUserData,
  setToken,
} from "../../utils/store/actions/user.actions";
import { connect } from "react-redux";
import {
  setAllProducts,
  setProduct,
} from "../../utils/store/actions/product.action";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextHolder } from "../../components/UI/TextHolder";
import Spacer from "../../components/UI/Spacer";
import LoginForm from "./LoginForm";

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles?.wrapcontainer}>
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Spacer size={60} />
            <ImageBackground
              style={{
                width: 160,
                height: 100,
                flexDirection: "row",
                justifyContent: "center",
              }}
              imageStyle={{ width: 160, alignContent: "center" }}
              resizeMode="center"
              source={require("../../../../assets/beautyk-logo.png")}
            />
            <Spacer size={60} />
            <>
              <TextHolder
                text="Se Connecter"
                size={20}
                weight="bold"
                color={TEXT_COLOR.primary}
              />
              <Spacer size={15} />
              <LoginForm />
            </>
          </View>

          <View style={styles.footer}>
            <TextHolder
              text="Pas encore inscrit ? "
              color={TEXT_COLOR.primary}
              type={"B"}
              size={"s"}
            />
            <PressableButton
              caption={"Créer un compte"}
              onPress={undefined}
              mode="contained"
              type="default"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state,
  token: state,
  cart: state?.cartReducer,
  products: state,
});

export default connect(mapStateToProps, {})(LoginScreen);

const styles = StyleSheet.create({
  wrapcontainer: {
    backgroundColor: "white",
    height: deviceHeight,
    width: deviceWidth,
    padding: 20,
  },
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
