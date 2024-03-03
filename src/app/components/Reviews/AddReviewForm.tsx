import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { MD2Colors, Icon, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import DataIndex from "../../utils/DataIndex";
import { createProductReviewApi } from "../../utils/api-calls";
import {
  LoggedInReviewValidation,
  LoggedOutReviewValidation,
} from "../../utils/form-validation";
import { PressableButton } from "../UI/Buttons";
import Spacer from "../UI/Spacer";
import { TextField } from "../UI/TextField";

import * as Yup from "yup";
import { UserProps } from "../../utils/store/reducers";
import { Typography } from "../UI/Typography";
import { userSelector } from "../../utils/store/selectors";

export const Rating = ({ setRating, rating }) => (
  <View>
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <Pressable
          onPress={() => {
            setRating(item);
          }}
        >
          <Icon
            color={
              rating + 1 <= item ? MD2Colors.grey400 : MD2Colors.yellowA700
            }
            size={25}
            source="star"
          />
        </Pressable>
      ))}
    </View>
  </View>
);

const AddReviewForm: React.FC<{
  productId?: number;
  reviewSubmitted?: (e: boolean) => void;
}> = ({ productId, reviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({});
  const [reviewValidation, setReviewValidation] = useState({});
  const formik = useRef() as any;

  const user = useSelector(userSelector) as any;

  useEffect(() => {
    if (!!rating) formik.current.setFieldValue("rate", rating);
  }, [rating]);

  useEffect(() => {
    if (!!user) {
      setReviewForm({
        review: "",
        rate: 0,
      });
      setReviewValidation(LoggedInReviewValidation);
    } else {
      setReviewForm({
        review: "",
        reviewer: "",
        reviewer_email: "",
        rating: 0,
      });
      setReviewValidation(LoggedOutReviewValidation);
    }
  }, []);

  const onSubmit = async (values) => {
    setIsLoading(true);
    reviewSubmitted(false);
    const data = {
      product_id: productId,
      reviewer: user.userName,
      reviewer_email: user.email,
      rating: values.rate,
      review: values.review,
    };

    const response = await createProductReviewApi(data);

    if (!!response?.id) {
      Toast.show({
        type: "success",
        props: {
          msg: "Les détails du compte ont bien été modifiés.",
        },
      });
      reviewSubmitted(true);
    } else if (response.message) {
      Toast.show({
        type: "error",
        props: {
          msg: response.message,
        },
      });
      reviewSubmitted(true);
    }

    setIsLoading(false);

    formik.reset();
  };

  return (
    <>
      <Typography fontWeight="Bold" textTrasform={"uppercase"}>
        Ajouter des avis
      </Typography>
      <Spacer size={10} />
      <Rating setRating={setRating} rating={rating} />
      <Spacer size={10} />
      <Formik
        validationSchema={Yup.object().shape(reviewValidation)}
        onSubmit={onSubmit}
        initialValues={reviewForm}
        validateOnBlur
        validateOnChange
        innerRef={formik}
        validateOnMount
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
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={{ flex: 1 }}>
              {Object.keys(reviewForm).map((key) => (
                <>
                  <TextField
                    value={values[key]}
                    label={
                      DataIndex[key === "review" ? "enter_your_review" : ""]
                    }
                    handleChange={handleChange(key)}
                    handleBlur={handleBlur(key)}
                    multiline={key === "review"}
                    touched={touched[key] as any}
                    error={errors[key] as any}
                    hidden={key === "rate"}
                  />
                  {errors[key] && (
                    <Typography
                      size={13}
                      color={MD2Colors.redA700}
                      children={String(errors[key])}
                    />
                  )}
                </>
              ))}
            </View>
            <PressableButton
              style={{ flex: 1 }}
              type="primary"
              disabled={!isValid}
              onPress={handleSubmit}
              children={"Soumettre"}
              fullwidth
              isLoading={isLoading}
              fontWeight="Bold"
            />
          </View>
        )}
      </Formik>
    </>
  );
};

export default AddReviewForm;
