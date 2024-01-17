import { ScrollView, View } from "react-native";
import { CustomerDetails } from "./CustomerDetails";
import { OrderDetails } from "./OrderDetails";
import { PayementOptions } from "./PayementOptions";
import { useState } from "react";
import { deviceHeight, deviceWidth } from "../../utils/device";
import { Button, MD2Colors } from "react-native-paper";

export default function CheckoutScreen({ navigation }) {
  const [city, setCity] = useState("");
  const [isvalid, setIsvalid] = useState(false);

  return (
    <View style={{ flex: 1, height: deviceHeight, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ padding: 15, paddingBottom: 200 }}>
          <CustomerDetails
            isValidForm={setIsvalid}
            onGetCity={setCity}
            navigation={navigation}
          />
          <OrderDetails city={city} />
          <PayementOptions />
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          position: "absolute",
          width: deviceWidth,
          height: 90,
          bottom: 0,
          padding: 20,
        }}
      >
        <Button
          onPress={() => {
            alert(1);
          }}
          disabled={!isvalid}
          style={{
            backgroundColor: isvalid ? MD2Colors.greenA400 : MD2Colors.grey300,
          }}
          labelStyle={{
            color: isvalid ? MD2Colors.indigo700 : MD2Colors.grey700,
          }}
          mode="contained"
          dark
          aria-disabled
        >
          Valider votre commande
        </Button>
      </View>
    </View>
  );
}
