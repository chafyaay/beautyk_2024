import { SafeAreaView, ScrollView, View } from "react-native";
import { CustomerDetails } from "./CustomerDetails";
import { OrderDetails } from "./OrderDetails";
import { PayementOptions } from "./PayementOptions";
import { useEffect, useState } from "react";
import { deviceWidth } from "../../utils/device";
import { OrderProps } from "../../utils/models";
import { useSelector } from "react-redux";
import { CREATE_ORDER } from "../../utils/api-calls";
import { PressableButton } from "../../components/UI/Buttons";

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
        company: "",
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
        company: "",
        phone: "",
      },
      line_items: line_items,
      shipping_lines: [
        {
          method_id: shippingMethod?.slug,
          method_title: shippingMethod?.description,
          total: shippingMethod?.name,
          taxes: null,
        },
      ],
      id: 0,
      parent_id: 0,
      status: "",
      currency: "",
      version: "",
      prices_include_tax: false,
      date_created: "",
      date_modified: "",
      discount_total: "",
      discount_tax: "",
      shipping_total: "",
      shipping_tax: "",
      cart_tax: "",
      total: "",
      total_tax: "",
      customer_id: 0,
      order_key: "",
      transaction_id: "",
      customer_ip_address: "",
      customer_user_agent: "",
      created_via: "",
      customer_note: "",
      date_completed: undefined,
      date_paid: undefined,
      cart_hash: "",
      number: "",
      meta_data: [],
      tax_lines: [],
      fee_lines: [],
      coupon_lines: [],
      refunds: [],
      payment_url: "",
      is_editable: true,
      needs_payment: false,
      needs_processing: true,
      date_created_gmt: "",
      date_modified_gmt: "",
      date_completed_gmt: undefined,
      date_paid_gmt: undefined,
      currency_symbol: "",
      _links: {
        self: [],
        collection: [],
        customer: [],
      },
    };
    setIsloading(true);
    const response = await CREATE_ORDER(orderData);
    if (response) {
      setIsloading(false);
      navigation.navigate("OrderReceivedScreen", { ...response });
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <SafeAreaView>
        <ScrollView>
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
          <PressableButton
            type="primary"
            disabled={!isformvalid}
            onPress={submitOrderHandler}
            children="Valider votre commande"
            fontWeight="Bold"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
