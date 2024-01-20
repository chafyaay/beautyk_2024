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
  Button,
  MD3LightTheme,
} from "react-native-paper";
import { cities } from "../../utils/models";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { Separator } from "../../components/commun/Separator";
import { CustomerInput } from "../../components/UI/CustomerInput";
import {
  $defaultColor,
  $primaryBgColor,
  $primaryColor,
} from "../../utils/device";

let initialFormInputs = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  phone: "",
  address: "",
};

const getFormLabel = (input: string) => {
  const labels = {
    email: "Email",
    first_name: "Prénom",
    last_name: "Nom",
    username: "Nom d'utulisateur ",
    password: "Mot de passe",
    phone: "Numéro de Téléphone",
    address: "Adress",
    city: "Ville",
  };
  if (!!input) return labels[input];
  return "";
};

const validationSchema = Yup.object().shape({
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

  address: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
});

export const CustomerDetails: React.FC<{
  navigation: any;
  getCityHandler: (city: string) => void;
  getCustomerDetailsHandler: (customerDetails: any) => void;
  isValidForm: (e: boolean) => void;
}> = ({
  navigation,
  getCustomerDetailsHandler,
  isValidForm,
  getCityHandler,
}) => {
  const [visible, setVisible] = useState(false);
  const [cityValue, setCityValue] = useState("");
  const formik = useRef() as any;

  const onValidateForm = () => {
    const touched = Object.keys(formik?.current?.touched).length <= 0;
    const a = !touched && formik?.current?.isValid;
    const b = !!cityValue;
    const c = a && b;

    console.log("touched------", Object.keys(formik?.current.touched).length);

    isValidForm(c);
  };

  useEffect(() => {
    onValidateForm();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ email: "", city: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
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
          <View>
            {Object.keys(initialFormInputs).map((input) => (
              <>
                <TextInput
                  style={{
                    marginBottom: 5,
                    fontSize: 14,
                  }}
                  mode="outlined"
                  theme={MD3LightTheme}
                  label={getFormLabel(input)}
                  onChangeText={handleChange(input)}
                  onSelectionChange={(e) => {
                    onValidateForm();
                    getCustomerDetailsHandler(values);
                  }}
                  onBlur={handleBlur(input)}
                  value={values[input]}
                />
                {touched[input] && errors[input] && (
                  <Text variant="bodySmall" style={{ color: MD2Colors.red800 }}>
                    {errors[input] as any}
                  </Text>
                )}
              </>
            ))}
          </View>
        )}
      </Formik>

      <TextInput
        style={{
          marginBottom: 5,
          fontSize: 14,
        }}
        mode="outlined"
        theme={MD3LightTheme}
        label={getFormLabel("city")}
        value={cityValue}
        onFocus={(e) => {
          setVisible(true);
          e.target.blur();
        }}
      />
      <Portal>
        <Dialog visible={visible} style={{ backgroundColor: "white" }}>
          <Dialog.Content>
            <Picker
              selectedValue={cityValue}
              onValueChange={(itemValue, itemIndex) => {
                setCityValue(itemValue);
                getCityHandler(itemValue);
              }}
              mode="dialog"
            >
              {cities?.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </Dialog.Content>
          <Divider style={{ marginBottom: 10 }} />
          <Dialog.Actions>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                mode="contained"
                buttonColor={$primaryColor}
                onPress={() => {
                  onValidateForm();
                  setVisible(false);
                }}
              >
                Accepter
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};