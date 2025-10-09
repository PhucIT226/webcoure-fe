import { Outlet } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

function Admin() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default Admin;
