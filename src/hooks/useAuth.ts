import { useAppSelector } from ".";

export function useAuth() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    isAuthenticated: isAuthenticated || localStorage.getItem("me"),
    user,
  };
}
