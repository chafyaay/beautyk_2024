import { View } from "react-native";
import {
  MD2Colors,
  Text,
  Divider,
  MD2LightTheme,
  Portal,
  TextInput,
  Modal,
  Dialog,
} from "react-native-paper";
import { cities } from "../../utils/models";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { Separator } from "../../components/commun/Separator";
import { CustomerInput } from "../../components/commun/CustomerInput";

const CustomerForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
};

const getFormLabel = (input: string) => {
  const labels = {
    email: "Email",
    first_name: "Prénom",
    last_name: "Nom",
    username: "Nom d'utulisateur ",
    phone: "Numéro de Téléphone",
    address: "Adress",
    city: "Ville",
  };
  if (!!input) return labels[input];
  return "";
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
  last_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
  email: Yup.string().email("Email invalide").required("Valeur Requise"),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Le numéro de téléphone n'est pas valide "
    )
    .required("Valeur Requise"),
  city: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
  address: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
});

export const CustomerDetails: React.FC<{
  navigation: any;
  onGetCity: (city: string) => void;
  isValidForm: (e: boolean) => void;
}> = ({ navigation, onGetCity, isValidForm }) => {
  const [visible, setVisible] = useState(false);
  const [cityValue, setCityValue] = useState("");
  const formik = useRef() as any;

  useEffect(() => {
    formik?.current?.setFieldValue("city", cityValue);
    onGetCity(cityValue);
  }, [cityValue]);

  useEffect(() => {
    isValidForm(formik.current.isValid);
    console.log(formik.current.errors);
  });

  return (
    <View style={{ flex: 1 }}>
      <Formik
        validateOnBlur
        validateOnMount
        validationSchema={DisplayingErrorMessagesSchema}
        initialValues={CustomerForm}
        onSubmit={() => {}}
        validateOnChange
        innerRef={formik as any}
      >
        {({ touched, errors, values, isValid, handleBlur, handleChange }) => (
          <>
            {Object.keys(CustomerForm).map((input) => (
              <>
                <TextInput
                  style={{ marginTop: 10 }}
                  label={getFormLabel(input)}
                  onChangeText={handleChange(input)}
                  onBlur={handleBlur(input)}
                  value={values[input]}
                  onFocus={(e) => {
                    if (input === "city") {
                      setVisible(true);
                      e.target.blur();
                    }
                  }}
                  dense
                  mode="outlined"
                  theme={MD2LightTheme}
                  activeOutlineColor={
                    touched[input] && errors[input]
                      ? MD2Colors.red800
                      : MD2Colors.indigo500
                  }
                />

                {touched[input] && errors[input] && (
                  <Text variant="bodySmall" style={{ color: MD2Colors.red800 }}>
                    {errors[input] as any}
                  </Text>
                )}
              </>
            ))}
            <Portal>
              <Dialog visible={visible} style={{ backgroundColor: "white" }}>
                <Picker
                  selectedValue={cityValue}
                  onValueChange={(itemValue, itemIndex) => {
                    setCityValue(itemValue);
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
          </>
        )}
      </Formik>
    </View>
  );
};
