import { Button, Icon } from "@/shared/ui";
import { useAuth0 } from "@auth0/auth0-react";
import { HeaderUser } from "./header-user";
import { useMediaQuery } from "@/shared/lib/hooks";

interface HeaderAuthProps {}

export const HeaderAuth = ({}: HeaderAuthProps) => {
  const { loginWithRedirect, isAuthenticated, isLoading, logout, user } =
    useAuth0();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  if (isLoading) return null;

  return isAuthenticated && user ? (
    <HeaderUser user={user} onLogout={logout} isMd={isMd} />
  ) : (
    <Button
      variant={isMd ? "default" : "text"}
      className="md:ml-2 py-1 md:py-2"
      onClick={() => loginWithRedirect()}
    >
      {!isMd && <Icon name="login" className="w-6 h-6 mr-2 fill-current" />}
      Login {isLg && "/ Sign Up"}
    </Button>
  );
};
