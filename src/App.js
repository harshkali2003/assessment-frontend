import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import HomePage from "./components/layout/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoutes from "./routes/ProtectedAdminRoute"
import Restock from "./pages/admin/Restock"
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path : "/admin/stock/increase/:productId",
    element : (
      <ProtectedAdminRoutes>
      <Restock/>
      </ProtectedAdminRoutes>
    )
  },
  {
    path : "/admin/stock/decrease/:productId",
    element : (
      <ProtectedAdminRoutes>
      <Restock/>
      </ProtectedAdminRoutes>
    )
  },
  {
    path : "/admin/add",
    element : (
      <ProtectedAdminRoutes>
      <AddProduct/>
      </ProtectedAdminRoutes>
    )
  },
  {
    path : "/admin/edit/:id",
    element : (
      <ProtectedAdminRoutes>
      <EditProduct/>
      </ProtectedAdminRoutes>
    )
  },
    {
    path: "/login",
    element: (
      <ProtectRoute>
        <Login />
      </ProtectRoute>
    ),
  },
    {
    path: "/signup",
    element: (
      <ProtectRoute>
        <Signup />
      </ProtectRoute>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        draggable
        newestOnTop
        theme="light"
      />
    </div>
  );
}

export default App;
