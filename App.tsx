import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { DefaultTheme, PaperProvider, MD2Colors } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { View } from "react-native";
import { Routes } from "./src/Pages/Routes";
import React from "react";
import { AppToast } from "./src/Components/Shared/AppToast";
import { persistor, store } from "./src/utils/store/store";

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
              <Routes />
            </QueryClientProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
      <AppToast />
    </View>
  );
}
