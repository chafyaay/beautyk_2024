import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Portal,
  Text,
  TextInput,
  Modal,
  Dialog,
  MD3DarkTheme,
  MD2LightTheme,
} from "react-native-paper";
import { TEXT_COLOR, deviceHeight } from "../../utils/device";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik, FormikConfig, FormikHelpers, FormikValues } from "formik";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { CustomersProps, cities } from "../../utils/models";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/store/actions/user.actions";
import { UserProps } from "../../utils/store/reducers/user.reducers";
import { BillingAdressValidation } from "../../utils/form-validation";
import { PressableButton } from "../../components/UI/Buttons";

const RenderForm = ({ inputs, customer, adress }) => {
  const user = useSelector((state: any) => state.user) as UserProps;
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const formik = useRef() as any;
  const navigation = useNavigation();

  useEffect(() => {
    formik.current.setFieldValue("city", city);
  }, [city]);

  function update_customer(_customer: CustomersProps) {
    throw new Error("Function not implemented.");
  }

  return (
    <View>
      <Formik
        onSubmit={(values) => {
          let _customer = { ...customer } as CustomersProps;
          _customer[adress] = values;

          update_customer(_customer)
            .then((response) => {
              if (response) {
                dispatch(
                  setUser({
                    ...user,
                    customer: response,
                  })
                );
              }
              Toast.show({ type: "success", text1: "updated" });
              navigation.goBack();
            })
            .catch((err) => {
              Toast.show({ type: "error", text1: JSON.stringify(err) });
            });
        }}
        initialValues={inputs}
        validationSchema={BillingAdressValidation}
        validateOnBlur
        validateOnChange
        innerRef={formik as any}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <>
            {Object.keys(inputs).map((key) => {
              return (
                <>
                  <TextInput
                    theme={MD2LightTheme}
                    dense
                    style={{
                      marginBottom: 5,
                      fontSize: 14,
                    }}
                    value={values[key]}
                    mode="outlined"
                    label={key}
                    onChangeText={handleChange(key)}
                    onSelectionChange={(e) => {}}
                    onBlur={handleBlur(key)}
                    onFocus={(e) => {
                      if (key === "city") {
                        setVisible(true);
                        e.target.blur();
                      }
                    }}
                  />
                  {touched[key] && errors[key] && (
                    <Text
                      variant="bodySmall"
                      style={{ color: TEXT_COLOR.a_error, marginBottom: 10 }}
                    >
                      {errors[key] as any}
                    </Text>
                  )}
                </>
              );
            })}
            <View style={{ height: 60 }} />
            <PressableButton
              caption={"Valider"}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

      <Portal>
        <Dialog visible={visible} style={{ backgroundColor: "white" }}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => {
              setCity(itemValue);
              setVisible(false);
            }}
            mode="dialog"
          >
            {cities.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </Dialog>
      </Portal>
    </View>
  );
};

const UpdateAdressScreen = () => {
  const { params } = useRoute() as any;
  const navigation = useNavigation();

  /*   useEffect(() => {
    navigation.setOptions({
      title: `Modier adresse de ${params.adress}`,
    });
  }, []); */

  React.useEffect(() => {
    navigation.setOptions({
      title: "No title",
    });
  }, []);

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        height: deviceHeight,
        padding: 10,
        paddingTop: 0,
      }}
    >
      <ScrollView>
        <RenderForm
          adress={params.adress}
          customer={params.customer}
          inputs={params.adressForm}
        />
      </ScrollView>
    </View>
  );
};

export default UpdateAdressScreen;
