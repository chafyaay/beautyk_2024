import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { PressableButton } from "../UI/Buttons";
import { TextHolder } from "../UI/TextHolder";
import {
  Card,
  Avatar,
  MD2LightTheme,
  Dialog,
  Portal,
  Text,
  RadioButton,
  IconButton,
  Icon,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "../../utils/store/reducers/user.reducers";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { updateCustomerApi } from "../../utils/api-calls";
import {
  BG_COLOR,
  BG_DARK_COLOR,
  BG_LIGHT_COLOR,
  TEXT_COLOR,
  deviceWidth,
} from "../../utils/device";
import {
  BillingAdressValidation,
  ShippingAdressValidation,
} from "../../utils/form-validation";
import { CustomersProps, cities } from "../../utils/models";
import { setCustomer, setUser } from "../../utils/store/actions/user.actions";
import React, { useEffect, useRef, useState } from "react";
import { TextField } from "../UI/TextField";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import DataIndex from "../../utils/DataIndex";
import Spacer from "../UI/Spacer";
import AppHeader from "../AppHeader/AppHeader";

/* RenderAdress Form */
type UpdateAddressFormProps = {
  formAddess: "billing" | "shipping";
};

const UpdateAddressForm: React.FC<UpdateAddressFormProps> = ({
  formAddess,
}) => {
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState("") as any;
  const [formValidation, setFormValidation] = useState({});
  const [form, setForm] = useState({}) as any;
  const formik = useRef() as any;
  const navigation = useNavigation();
  const { customer } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    /* update form*/
    let f = { ...customer[formAddess] };
    if (formAddess === "billing") {
      delete f.country;
    } else if (formAddess === "shipping") {
      delete f.country;
    }
    setForm(f);
    /* update validation schema*/
    if (formAddess === "billing") setFormValidation(BillingAdressValidation);
    else if (formAddess === "shipping")
      setFormValidation(ShippingAdressValidation);

    /* Update header title */
    navigation.setOptions({
      header: () => (
        <AppHeader goBack title={"Modifier l'" + DataIndex[formAddess]} />
      ),
    });
  }, [formAddess]);

  useEffect(() => {
    if (!!city) formik.current.setFieldValue("city", city);
  }, [city]);

  useEffect(() => {
    if (Object.keys(form).length > 0) setCity(form?.city);
  }, [form]);

  const onSubmitHandler = async (values) => {
    let data = {};
    data[formAddess] = values;

    const response = await updateCustomerApi(customer.id, data);

    if (!!response?.message)
      Toast.show({
        type: "error",
        props: {
          msg: response.message,
        },
      });
    else if (response[formAddess]) {
      dispatch(
        setCustomer({
          ...customer,
          ...response,
        })
      );
      Toast.show({ type: "success", props: { msg: "updated" } });
    }
  };

  return (
    <View>
      {Object.keys(form).length > 0 && (
        <Formik
          validationSchema={Yup.object().shape({ ...formValidation })}
          onSubmit={onSubmitHandler}
          initialValues={form}
          validateOnBlur
          validateOnChange
          innerRef={formik}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid,
            isValidating,
          }) => (
            <View style={{ width: "100%" }}>
              {Object.keys(form).map((key) => (
                <TextField
                  label={DataIndex[key]}
                  value={values[key]}
                  handleChange={handleChange(key)}
                  handleBlur={handleBlur(key)}
                  touched={touched[key] as any}
                  error={errors[key] as any}
                  onFocus={(e) => {
                    if (key === "city") {
                      setVisible(true);
                      e.target.blur();
                    }
                  }}
                />
              ))}
              <Spacer size={30} />
              <PressableButton
                children={DataIndex.saveModification}
                onPress={handleSubmit}
                type="default"
                fontWeight="Bold"
                disabled={!isValid}
                fullwidth
              />
            </View>
          )}
        </Formik>
      )}

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

export default UpdateAddressForm;
