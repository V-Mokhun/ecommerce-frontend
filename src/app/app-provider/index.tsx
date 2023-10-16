import { apolloClient } from "@/shared/lib/apollo";
import { store } from "@/store";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ReduxProvider>
  );
};
