import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { DefaultTheme, PaperProvider, MD2Colors } from "react-native-paper";
import { persistor, store } from "./src/app/utils/store/store";
import { CustomizedToast } from "./src/app/components/UI/CustomizedToast";
import { PersistGate } from "redux-persist/integration/react";
import { View } from "react-native";
import { Routing } from "./src/app/routing/Routing";
import BottomNavBar from "./src/app/components/BottomNavBar/BottomNavBar";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme?.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <QueryClientProvider client={new QueryClient()}>
              <Routing />
            </QueryClientProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
      <CustomizedToast />
    </View>
  );
}
