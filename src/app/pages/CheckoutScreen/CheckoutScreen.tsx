import { SafeAreaView, ScrollView, View } from "react-native";
import { CustomerDetails } from "./CustomerDetails";
import { OrderDetails } from "./OrderDetails";
import { PayementOptions } from "./PayementOptions";
import { useEffect, useState } from "react";
import { deviceWidth } from "../../utils/device";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import { OrderProps } from "../../utils/models";
import { useSelector } from "react-redux";
import { CREATE_ORDER } from "../../utils/api-calls";
import Header from "../../components/Header/Header";
import { PrimaryButton } from "../../components/UI/Buttons";

export default function CheckoutScreen({ navigation }) {
  const [customerDetails, setCustomerDetails] = useState({}) as any;
  const [payementDetails, setPayementDetails] = useState({}) as any;
  const [isValid, setIsvalid] = useState(false);
  const [isformvalid, setisformvalid] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [shippingMethod, setShippingMethod] = useState<{
    slug: string;
    description: string;
    name: string;
  }>();
  const [isLoading, setIsloading] = useState(false);
  const { cart } = useSelector((state) => state) as any;

  useEffect(() => {
    const b = !!payementDetails?.id;
    const c = isValid && b;
    setisformvalid(c);
  }, [isValid, payementDetails]);

  const submitOrderHandler = async () => {
    const { address, city, email, first_name, last_name, phone } =
      customerDetails;
    let line_items = [];
    cart.items.forEach((item) => {
      line_items.push({ product_id: item.product.id, quantity: item.quantity });
    });

    let orderData: OrderProps = {
      payment_method: "",
      payment_method_title: "",
      set_paid: false,
      password: "",
      billing: {
        phone,
        first_name,
        last_name,
        address_1: address,
        address_2: "",
        city,
        state: "",
        postcode: "",
        country: "",
        email,
      },
      shipping: {
        first_name,
        last_name,
        address_1: address,
        address_2: "",
        city,
        state: "",
        postcode: "",
        country: "",
      },
      line_items: line_items,
      shipping_lines: [
        {
          method_id: shippingMethod?.slug,
          method_title: shippingMethod?.description,
          total: shippingMethod?.name,
        },
      ],
    };
    setIsloading(true);
    const response = await CREATE_ORDER(orderData);
    if (response) {
      setIsloading(false);
      navigation.navigate("OrderReceivedScreen", { ...response });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <SafeAreaView>
        <ScrollView>
          <Header navigation={navigation} title={"Valider votre commande"} />
          <View style={{ padding: 15, paddingBottom: 160 }}>
            <CustomerDetails
              isValidForm={setIsvalid}
              getCustomerDetailsHandler={setCustomerDetails}
              navigation={navigation}
              getCityHandler={setSelectedCity}
            />
            <OrderDetails
              getShippingMethod={setShippingMethod}
              city={selectedCity}
            />
            <PayementOptions getPayementDetailsHandler={setPayementDetails} />
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
          <PrimaryButton
            disabled={!isformvalid}
            onEventHandler={submitOrderHandler}
            title="Valider votre commande"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
