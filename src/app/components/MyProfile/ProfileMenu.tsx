import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deviceHeight } from "../../utils/device";
import { useNavigation } from "@react-navigation/native";
import { PressableButton } from "../UI/Buttons";
import {
  customerSelector,
  orderSelector,
  userSelector,
} from "../../utils/store/selectors";
import { logOut } from "../../utils/store/actions/user.actions";

export const ProfileMenu = () => {
  const navigation = useNavigation() as any;
  const user = useSelector(userSelector);
  const orders = useSelector(orderSelector);
  const dispatch = useDispatch();

  const isLoggedIn = useMemo(() => {
    return !!user.token && !!user.email;
  }, [user]);

  const menu = [
    {
      icon: "shopping-outline",
      label: `Mes Commandes`,
      action: () => navigation.navigate("MyOrdersListScreen"),
    },
    {
      icon: "account-outline",
      label: "Mon compte ",
      action: () => {},
    },
    {
      icon: "heart-outline",
      label: "Votre liste d'envis",
      action: () => {},
    },
    {
      icon: "history",
      label: "Vu Récemment",
      action: () => {},
    },
    {
      icon: "home-outline",
      label: "Mes Adresse",
      action: () => {},
    },
    {
      icon: !!isLoggedIn ? "logout" : "login",
      label: !!isLoggedIn ? "Se déconnecter " : "Se conncter",
      action: () => {
        if (!!isLoggedIn) {
          dispatch(logOut());
        }
      },
    },
  ];

  return (
    <View style={{ padding: 20, height: deviceHeight }}>
      {menu?.map(({ icon, label, action }, index) => (
        <PressableButton
          key={index}
          fontWeight="Medium"
          icon={icon}
          onPress={() => {
            action();
          }}
          type="menu"
        >
          {index === 0 ? label + ` (${orders?.length})` : label}
        </PressableButton>
      ))}
    </View>
  );
};
