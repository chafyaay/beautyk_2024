import { ImageBackground, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { TEXT_COLOR, deviceHeight, deviceWidth } from "../../utils/device";
import { PressableButton } from "../../components/UI/Buttons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Spacer from "../../components/UI/Spacer";
import LoginForm from "./LoginForm";
import { Typography } from "../../components/UI/Typography";

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles?.wrapcontainer}>
      <Spacer size={100} />
      <ImageBackground
        style={{
          width: 160,
          height: 100,
          flexDirection: "row",
          justifyContent: "center",
          flex: 1,
        }}
        imageStyle={{ width: 160, alignContent: "center" }}
        resizeMode="center"
        source={require("../../../../assets/beautyk-logo.png")}
      />

      <View style={{ flex: 2, width: deviceWidth, padding: 25 }}>
        <Typography
          children="Se Connecter"
          size={20}
          fontWeight="Bold"
          textTrasform={"uppercase"}
        />
        <Spacer size={10} />
        <LoginForm />
      </View>

      <View style={[styles.footer, { flex: 1 }]}>
        <Typography children="Pas encore inscrit ? " />
        <PressableButton
          children={"Créer un compte"}
          onPress={undefined}
          type="default"
          fontWeight="Bold"
        />
      </View>
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
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
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
