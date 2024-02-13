import { View } from "react-native";
import { MD2Colors, MD3Colors, ProgressBar, Text } from "react-native-paper";
import { Typography } from "../UI/Typography";
import { StarRender } from "./StarredRate";
import { useQuery } from "react-query";
import { retrieveProductReviews } from "../../utils/api-calls";
import { useEffect, useState } from "react";
var _ = require("lodash");
/* Rate */
function ReviewSummary({ productId }) {
  const [width, setWidth] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);

  const { data, isLoading } = useQuery(
    "List product reviews",
    async () => await retrieveProductReviews(productId)
  );

  useEffect(() => {
    if (data?.length > 0) {
      const ratingValue = data?.reduce((a, b) => (a += b["rating"]), 0);
      const productRatingValue = ratingValue / data.length;
      const value = (180 * productRatingValue) / 5;
      setWidth(value);
      setRatingValue(ratingValue / data?.length);
    }
  }, [data]);

  const rating = _.groupBy(data, "rating");

  const getProgress = (item) => {
    if (data.length > 0) {
      if (Object.hasOwn(rating, item)) {
        return (rating[item].length * 100) / data.length / 100;
      }
    }
    return 0;
  };

  return (
    <>
      {!isLoading && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            alignItems: "center",
            columnGap: 60,
            borderWidth: 1,
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
            >
              {ratingValue.toFixed(1) + "/5"}
            </Typography>
            <StarRender width={width} />
            <Typography size={18} fontWeight="Regular">
              {data?.length + " Avis"}
            </Typography>
          </View>

          {/*  <View>
            <Typography color={MD2Colors.yellow800} size={34} fontWeight="Bold">
              {ratingValue.toFixed(1) + "/5"}
            </Typography>
            <StarRender width={width} />
            <Typography size={18} fontWeight="Regular">
              {data?.length + "Avis"}
            </Typography>
          </View>
          <View>
            <Text>hello</Text>
          </View> */}
        </View>
      )}
    </>
  );
}

export default ReviewSummary;
