import { ActivityIndicator, Alert, View } from "react-native";
import {
  Avatar,
  Divider,
  Icon,
  IconButton,
  MD2Colors,
  Text,
} from "react-native-paper";
import {
  deleteProductReviews,
  retrieveProductReviews,
} from "../../utils/api-calls";
import { ProductProps } from "../../utils/models";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Svg, { G, Path } from "react-native-svg";
import AddReviewForm from "./AddReviewForm";
import { TextHolder } from "../UI/TextHolder";
import Spacer from "../UI/Spacer";
import { useSelector } from "react-redux";
import { UserProps } from "../../utils/store/reducers/user.reducers";
import { Typography } from "../UI/Typography";
import Review from "./Review";
import ReviewSummary from "./ReviewSummary";
moment.locale("fr");

export const ReviewList: React.FC<{ product: ProductProps }> = ({
  product,
}) => {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getReviewData = async () => {
    setIsLoading(true);
    const response = await retrieveProductReviews(product.id);

    if (!!response) {
      const data = response;
      const reviews = !!data
        ? data?.filter((item) => item.product_id === product.id)
        : [];
      setReviews(reviews);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getReviewData();
  }, [reviewSubmitted]);

  return (
    <View>
      <ReviewSummary productId={product.id} />
      {!!isLoading && (
        <ActivityIndicator animating={true} color={MD2Colors.indigo50} />
      )}
      {!isLoading && (
        <View>
          <Typography fontWeight="Bold">Avis de Clients</Typography>
          {reviews?.map((item, index) => (
            <Review item={item} key={index} {...item} />
          ))}
        </View>
      )}

      <View>
        <Spacer size={20} />
        <Typography fontWeight="Bold">Ajouter un Avis</Typography>
        <Spacer size={10} />
        <AddReviewForm
          reviewSubmitted={setReviewSubmitted}
          productId={product.id}
        />
      </View>
    </View>
  );
};
