import { View } from "react-native";
import { Typography } from "../../Theme/Typography";
import { useQuery } from "react-query";
import { getFeaturedData } from "../../utils/api-calls";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { ITEM_WIDTH, SLIDER_WIDTH } from "./Promotion";
import { useState } from "react";
import ProductCard from "../Shared/ProductCard";

const CarouselCardItem = ({ product }) => (
  <ProductCard
    product={product}
    showAddTocart={true}
    showTitle={true}
    cardView={"GRID"}
  />
);

export function FeaturedProducts() {
  const [index, setIndex] = useState(1);
  const { data, isLoading } = useQuery("get Featured Data", async () =>
    getFeaturedData(4)
  );
  return (
    <View>
      <Typography variant="heading1">FeaturedProducts</Typography>

      <View>
        {!isLoading && (
          <>
            <Carousel
              layout="default"
              layoutCardOffset={9}
              data={data?.data}
              renderItem={(props) => <CarouselCardItem product={props?.item} />}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH / 2}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
            />
            <Pagination
              dotsLength={data.data.length}
              activeDotIndex={index}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
          </>
        )}
      </View>
    </View>
  );
}
