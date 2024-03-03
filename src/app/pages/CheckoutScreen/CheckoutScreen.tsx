import React, { useState } from "react";
import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { MD2Colors, Icon, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { PressableButton } from "../../components/UI/Buttons";
import Spacer from "../../components/UI/Spacer";
import { Typography } from "../../components/UI/Typography";
import { deviceWidth } from "../../utils/device";
import ShippingMode from "../../components/Checkout/ShippingMode";
import CustomerDetails from "../../components/Checkout/Customer_Details";
import { createOrderApiCall } from "../../utils/api-calls";
import { CustomersProps, OrderProps } from "../../utils/models";
import { cartSelector, customerSelector } from "../../utils/store/selectors";
import { CartDetails } from "../../components/Checkout/CartDetails";
import { PayementOptions } from "../../components/Checkout/PayementOptions";
import { OrderDetails } from "../../components/Checkout/OrderDetails";

const Step1 = () => CartDetails();
const Step2 = (props) => CustomerDetails(props);
const Step3 = (props) => ShippingMode(props);
const Step4 = (props) => PayementOptions(props);

const STEPPER_MENU = [
  {
    id: 1,
    label: "Paniers",
    editable: false,
    description: "Résumé de la commande",
  },
  {
    id: 2,
    label: "Coordonnées",
    editable: false,
    description:
      "Nous utiliserons cet e-mail pour vous envoyer des détails et des mises à jour concernant votre commande.            ",
  },
  {
    id: 3,
    label: "Livraison",
    editable: false,
    description:
      "Valider le mode d'expidition et  l’adresse du lieu de livraison de votre commande.            ",
  },
  {
    id: 4,
    label: "Paiement",
    editable: false,
    description: "",
  },
];

export default function CheckoutScreen({ navigation }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [stepIndex, setStepIndex] = useState(2);
  const [step2Valid, setStep2Valid] = useState(true);
  const [step3Valid, setStep3Valid] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({});
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({}) as any;
  const [shippingFees, setShippingFees] = useState({}) as any;

  const cart = useSelector(cartSelector);
  const customer = useSelector(customerSelector) as CustomersProps;

  const onNextStep = (a) => {
    setStepIndex((e) => e + a);
  };

  const getIcon = (id) => {
    if (id === 1) return "basket";
    else if (id === 2) return "account-tie";
    else if (id === 3) return "map-marker";
    else if (id === 4) return "cash-fast";
  };

  const onSubmitOrder = async () => {
    let orderData = {} as OrderProps;
    const shipping =
      Object.keys(shippingDetails).length > 0
        ? { ...shippingDetails }
        : { ...orderData.shipping };
    setIsloading(true);
    orderData = {
      date_created: String(new Date()),
      shipping:
        Object.keys(shippingDetails).length > 0
          ? { ...shippingDetails }
          : { ...orderData.shipping },
      payment_method: paymentDetails.id,
      payment_method_title: paymentDetails.method_title,
      ...customerDetails,
      ...orderData,
      line_items: cart.items,
    };

    alert(JSON.stringify(paymentDetails));
    /*  const response = await createOrderApiCall(orderData);
    if (response) {
      setIsloading(false);
      navigation.navigate("OrderReceivedScreen", { ...response });
    }  */
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        {STEPPER_MENU.map((option) => (
          <Pressable
            onPress={() => setStepIndex(option.id)}
            key={option.id}
            disabled={stepIndex !== option.id}
            style={[
              {
                borderRadius: 5,
                padding: 5,
                flex: 1,
                alignItems: "center",
                height: 80,
                paddingTop: 15,
              },
              {
                backgroundColor:
                  stepIndex === option.id
                    ? MD2Colors.yellow500
                    : MD2Colors.grey50,
              },
            ]}
          >
            <Icon
              color={
                stepIndex === option.id ? MD2Colors.black : MD2Colors.grey500
              }
              size={24}
              source={getIcon(option.id)}
            />
            <Typography
              color={
                stepIndex === option.id ? MD2Colors.black : MD2Colors.grey500
              }
              fontWeight="Medium"
              children={option.label}
              size={13}
            />
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <ScrollView style={{ padding: 15 }}>
            {/* stepper content */}
            <Typography fontWeight="Regular" size={13}>
              {STEPPER_MENU.find((item) => item.id === stepIndex)?.description}
            </Typography>

            {stepIndex === 1 && <Step1 />}
            {stepIndex === 2 && (
              <Step2
                step2Data={setCustomerDetails}
                isStep2valid={setStep2Valid}
              />
            )}

            {stepIndex === 3 && (
              <>
                <Step3
                  step3Data={setShippingDetails}
                  setSelectedCity={setSelectedCity}
                  isStep3valid={setStep3Valid}
                />
                <Divider />
                <Spacer size={16} />
                <Typography size={18}>Mode d'expédition</Typography>
                <ShippingMode
                  onShippingFees={setShippingFees}
                  city={selectedCity}
                />
              </>
            )}
            {stepIndex === 4 && (
              <Step4 selectedPaymentOption={setPaymentDetails} />
            )}
            <Spacer size={50} />
          </ScrollView>
        </View>

        {/* button */}

        <View style={[styles.bottom, { flex: 1 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            {stepIndex === 1 && (
              <PressableButton
                rightIcon="chevron-right"
                onPress={() => onNextStep(1)}
                type="primary"
                style={{ flex: 1 }}
                fontWeight="Medium"
              >
                Valider
              </PressableButton>
            )}

            {stepIndex === 2 && (
              <>
                <PressableButton
                  icon="chevron-left"
                  onPress={() => onNextStep(-1)}
                  type="primary"
                  style={{ flex: 2 }}
                  fontWeight="Medium"
                >
                  Articles
                </PressableButton>
                <PressableButton
                  rightIcon="chevron-right"
                  onPress={() => onNextStep(1)}
                  type="primary"
                  disabled={!step2Valid}
                  style={{ flex: 1 }}
                  fontWeight="Medium"
                >
                  Valider
                </PressableButton>
              </>
            )}

            {stepIndex === 3 && (
              <>
                <PressableButton
                  icon="chevron-left"
                  onPress={() => onNextStep(-1)}
                  type="primary"
                  style={{ flex: 2 }}
                  fontWeight="Medium"
                >
                  Coordonnées
                </PressableButton>
                <PressableButton
                  rightIcon="chevron-right"
                  onPress={() => onNextStep(1)}
                  type="primary"
                  disabled={!step3Valid}
                  style={{ flex: 1 }}
                  fontWeight="Medium"
                >
                  Valider
                </PressableButton>
              </>
            )}

            {stepIndex === 4 && (
              <>
                <PressableButton
                  icon="chevron-left"
                  onPress={() => onNextStep(-1)}
                  type="primary"
                  fontWeight="Medium"
                >
                  Livraison
                </PressableButton>
                <PressableButton
                  disabled={!paymentDetails}
                  onPress={onSubmitOrder}
                  type="default"
                  fontWeight="Bold"
                >
                  Commander
                </PressableButton>
              </>
            )}
          </View>

          <OrderDetails shippingFees={shippingFees?.name} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flex: 1 },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    padding: 15,
  },
  step: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderRadius: 5,
    padding: 5,
  },
  bottom: {
    backgroundColor: MD2Colors.grey100,
    width: deviceWidth,
    padding: 15,
    shadowColor: MD2Colors.grey400,
    shadowOffset: { width: -0, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 13,
    borderRadius: 10,
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    marginBottom: 15,
    shadowColor: MD2Colors.grey700,
    shadowOffset: { width: -0, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 3,
    backgroundColor: MD2Colors.white,
    borderRadius: 5,
    padding: 10,
  },
});

/*   const submitOrderHandler = async () => {
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

  const ContactInformation = ({ editable, value }) => {
    if (editable)
      return (
        <TextField value={value} handleChange={() => {}} label={"E-mail"} />
      );
    return <Typography children={value} />;
  };

  const ShippingAddress = ({ editable }) => {
    const shipping = { ...customer.shipping };
    delete shipping.country;
    delete shipping.company;

    const shippingAdress = {
      full_name: `${customer.first_name}  ${customer.last_name}`,
      full_address: `${customer.shipping.address_1}, ${customer.shipping.address_2}`,
      location: `${customer.shipping.postcode} , ${customer.shipping.city} , ${customer.shipping.state}`,
      phone: customer.billing.phone,
    };
    if (editable)
      return (
        <View>
          {Object.keys(shipping).map((key) => (
            <TextField
              value={shipping[key]}
              handleChange={() => {}}
              label={getCustomerShippingLabel(key)}
            />
          ))}
        </View>
      );
    return (
      <View>
        <Typography fontWeight="Bold" children={shippingAdress.full_name} />
        <Typography
          fontWeight="Medium"
          children={shippingAdress.full_address}
        />
        <Typography fontWeight="Medium" children={shippingAdress.location} />
        <Typography fontWeight="Medium" children={shippingAdress.phone} />
      </View>
    );
  };
   */
