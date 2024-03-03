import { ActivityIndicator, Modal, Pressable, View } from "react-native";
import { IconButton, MD2Colors, Portal, Text } from "react-native-paper";
import {
  deleteProductReviews,
  retrieveProductReviews,
} from "../../utils/api-calls";
import { ProductProps } from "../../utils/models";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Svg, { G, Path } from "react-native-svg";
import AddReviewForm from "./AddReviewForm";

import Spacer from "../UI/Spacer";
import { useSelector } from "react-redux";
import { Typography } from "../UI/Typography";

import ReviewSummary from "./ReviewSummary";
import { PressableButton } from "../UI/Buttons";
import { deviceHeight } from "../../utils/device";
import { useQuery } from "react-query";
import { json } from "stream/consumers";
import { Comment } from "./Comment";
moment.locale("fr");

export const ReviewList: React.FC<{ product: ProductProps }> = ({
  product,
}) => {
  const [reviewSubmitted, setReviewSubmitted] = useState(null);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  /*  const getReviewData = async () => {
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
  }; */

  const [productId, setProductId] = useState(null);

  const [comments, setComments] = useState([]);

  const { data, isLoading } = useQuery(
    "get comments",
    async () => await retrieveProductReviews(product.id)
  );

  useEffect(() => {
    retrieveProductReviews(product.id).then((response) => {
      setComments(response);
    });
  }, [reviewSubmitted]);

  useEffect(() => {
    if (reviewSubmitted) {
      setProductId(product.id);
      setReviewModalVisible(false);
      // setReviewSubmitted(false);
    }
  }, [reviewSubmitted]);

  return (
    <View>
      <ReviewSummary reviews={comments} />

      <View>
        <Spacer size={14} />
        <Typography fontWeight="Bold" textTrasform={"uppercase"}>
          Avis des Clients
        </Typography>
        {comments?.map((item, index) => (
          <Comment
            reviewDeleted={setReviewSubmitted}
            item={item}
            key={index}
            {...item}
          />
        ))}
      </View>

      <View>
        <Spacer size={20} />
        <PressableButton
          onPress={() => setReviewModalVisible(true)}
          type="primary"
          fontWeight="Bold"
        >
          Ajouter un Avis
        </PressableButton>
      </View>

      <Portal>
        <Modal
          visible={reviewModalVisible}
          onDismiss={() => {
            setReviewModalVisible(false);
          }}
          animationType="slide"
          transparent={true}
        >
          <Pressable
            onPress={() => {
              setReviewModalVisible(false);
            }}
            style={{
              flex: 1,
              height: deviceHeight,
              flexDirection: "column",
              backgroundColor: "rgba(0,0,0,.4)",
            }}
          >
            <View style={{ flex: 3 }}></View>

            <View
              style={{
                flex: 2,
                backgroundColor: MD2Colors.white,
                shadowColor: MD2Colors.grey700,
                shadowOffset: { width: 0, height: -10 },
                shadowOpacity: 0.2,
                shadowRadius: 13,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <IconButton
                onPress={() => setReviewModalVisible(false)}
                icon="close"
                size={24}
                style={{ position: "absolute", right: 0 }}
              />
              <AddReviewForm
                reviewSubmitted={setReviewSubmitted}
                productId={product.id}
              />
            </View>
          </Pressable>
        </Modal>
      </Portal>
    </View>
  );
};
