import { apolloClient } from "@/shared/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN!}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {" "}
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>{" "}
    </Auth0Provider>
  );
};
