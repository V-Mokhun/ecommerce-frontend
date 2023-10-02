import { Button } from "@/shared/ui";
import { useAuth0 } from "@auth0/auth0-react";
import { HeaderUser } from "./header-user";
import { useMediaQuery } from "@/shared/lib/hooks";

interface HeaderAuthProps {}

export const HeaderAuth = ({}: HeaderAuthProps) => {
  const { loginWithRedirect, isAuthenticated, isLoading, logout, user } =
    useAuth0();
  const isLg = useMediaQuery("(min-width: 1024px)");

  if (isLoading) return null;

  return isAuthenticated && user ? (
    <HeaderUser user={user} onLogout={logout} />
  ) : (
    <Button className="ml-2" onClick={() => loginWithRedirect()}>
      Login {isLg && "/ Sign Up"}
    </Button>
  );
};
