import { Button } from "@/shared/ui";
import { useAuth0 } from "@auth0/auth0-react";
import { HeaderUser } from "./header-user";

interface HeaderAuthProps {}

export const HeaderAuth = ({}: HeaderAuthProps) => {
  const { loginWithRedirect, isAuthenticated, isLoading, logout, user } =
    useAuth0();

  if (isLoading) return null;

  return isAuthenticated ? (
    <HeaderUser user={user} onLogout={logout} />
  ) : (
    <Button onClick={() => loginWithRedirect()}>Login / Sign Up</Button>
  );
};
