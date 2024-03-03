import { View } from "react-native";
import { MD2Colors, ProgressBar } from "react-native-paper";
import { Typography } from "../UI/Typography";
import { StarRender } from "./StarredRate";
import { useEffect, useState } from "react";
var _ = require("lodash");
/* Rate */
function ReviewSummary({ reviews }) {
  const [width, setWidth] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    if (reviews?.length > 0) {
      const ratingValue = reviews?.reduce((a, b) => (a += b["rating"]), 0);
      const productRatingValue = ratingValue / reviews.length;
      const value = (180 * productRatingValue) / 5;
      setWidth(value);
      setRatingValue(ratingValue / reviews?.length);
    }
  }, [reviews]);

  const rating = _.groupBy(reviews, "rating");

  const getProgress = (item) => {
    if (reviews.length > 0) {
      if (Object.hasOwn(rating, item)) {
        return (rating[item].length * 100) / reviews.length / 100;
      }
    }
    return 0;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        alignItems: "center",
        columnGap: 60,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <View style={{ flex: 2 }}>
        {[5, 4, 3, 2, 1].map((item) => {
          return (
            <View key={item} style={{ marginBottom: 2 }}>
              <Typography
                color={MD2Colors.black}
                size={12}
                fontWeight="Regular"
              >
                {item + " étoiles"}
              </Typography>
              <ProgressBar
                progress={getProgress(item)}
                color={MD2Colors.black}
              />
              <Typography
                style={{ position: "absolute", right: 0 }}
                fontWeight="Medium"
              >
                {Object.hasOwn(rating, item) && rating[item].length}
              </Typography>
            </View>
          );
        })}
      </View>

      <View style={{ flex: 2 }}>
        <Typography
          color={MD2Colors.black}
          variant="headlineMedium"
          size={27}
          fontWeight="Bold"
          textTrasform={"uppercase"}
        >
          {ratingValue.toFixed(1) + "/5"}
        </Typography>
        <StarRender width={width} />
        <Typography size={18} fontWeight="Regular">
          {reviews?.length + " Avis"}
        </Typography>
      </View>
    </View>
  );
}

export default ReviewSummary;
