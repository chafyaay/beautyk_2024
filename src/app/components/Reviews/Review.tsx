import moment from "moment";
import { Alert, View } from "react-native";
import { MD2Colors, Avatar, Icon, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { deleteProductReviews } from "../../utils/api-calls";
import { UserProps } from "../../utils/store/reducers/user.reducers";
import { Typography } from "../UI/Typography";

/* Review */
function Review({
  id,
  review,
  reviewer,
  reviewer_email,
  rating,
  reviewer_avatar_urls,
  date_created,
}) {
  const { user } = useSelector((state: UserProps) => state.user);

  const deleteReviewComment = async (id) => {
    Alert.alert("Supprimer un Avis", "Voulez-vous supprimer cet avis ?", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Supprimer",
        onPress: async () => {
          const response = await deleteProductReviews(id);
          console.log(response);
        },
      },
    ]);
  };
  return (
    <View
      style={{
        borderColor: MD2Colors.grey200,
        borderRadius: 5,
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row",
        columnGap: 10,
        marginTop: 10,
        paddingLeft: 10,
        paddingTop: 10,
      }}
    >
      <Avatar.Image size={30} source={{ uri: reviewer_avatar_urls[48] }} />
      <View style={{ flex: 1 }}>
        <Typography fontWeight="Regular" size={12}>
          <>
            {reviewer} ({rating}
            <Icon source="star" size={10} />)
          </>
        </Typography>
        <Typography size={10} children={moment(date_created).format("LL")} />
        <Typography
          variant="bodyMedium"
          size={12}
          children={review.replace(/<[^>]*>?/gm, "")}
          style={{
            backgroundColor: MD2Colors.grey100,
            overflow: "hidden",
            borderRadius: 5,
            padding: 4,
            marginTop: 5,
          }}
        />
      </View>
      {!!(user.email === reviewer_email) && (
        <IconButton
          onPress={() => deleteReviewComment(id)}
          size={12}
          icon="trash-can-outline"
        />
      )}
    </View>
  );
}

export default Review;
