import { apolloClient } from "@/shared/lib/apollo";
import { persistor, store } from "@/store";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
