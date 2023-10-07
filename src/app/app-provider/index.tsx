import { apolloClient } from "@/shared/lib/apollo";
import { ApolloProvider } from "@apollo/client";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
