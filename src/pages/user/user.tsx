import { Outlet } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";

function User() {
  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}

export default User;
