import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { PressableButton } from "../UI/Buttons";
import { TextField } from "../UI/TextField";
import { Typography } from "../UI/Typography";
import { EmailValidator } from "../../utils/form-validation";
import { getCustomerShippingLabel } from "../../utils/helpers";
import { CustomersProps } from "../../utils/models";
import { customerSelector } from "../../utils/store/selectors";
import * as Yup from "yup";

/* STEP 2 */
function CustomerDetails({ isStep2valid, step2Data }) {
  const [editable, setEditable] = useState(false);
  const { email } = useSelector(customerSelector) as CustomersProps;

  if (!editable) {
    step2Data(email);
    return (
      <View>
        <Typography>{email}</Typography>
        <PressableButton
          onPress={() => setEditable(true)}
          fontWeight="Bold"
          type="Link"
        >
          Modifier
        </PressableButton>
      </View>
    );
  } else
    return (
      <Formik
        initialValues={{ email }}
        validateOnBlur
        validateOnChange
        validationSchema={Yup.object().shape({ ...EmailValidator })}
        onSubmit={() => {}}
      >
        {({ values, errors, isValid, touched, handleBlur, handleChange }) => {
          isStep2valid(isValid);
          step2Data(values);
          return (
            <TextField
              value={values["email"]}
              handleChange={handleChange("email")}
              handleBlur={handleBlur("email")}
              label={getCustomerShippingLabel("email")}
              error={errors["email"] as any}
              touched={touched["email"] as any}
            />
          );
        }}
      </Formik>
    );
}

export default CustomerDetails;
