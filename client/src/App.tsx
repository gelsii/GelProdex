import { createBrowserRouter } from "react-router";
import Home from "./routes/landingPage/Home";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPageLayout from "./layouts/LandingPageLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./auth/components/SignIn";
import Products from "./routes/landingPage/Products";
import SignUp from "./auth/components/SignUp";
import ProductsList from "./routes/dashboard/ProductsList";

const App = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    children: [
      {
        element: <LandingPageLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "products",
            element: <Products />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <ProductsList />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ],
    errorElement: <h1>gell</h1>,
  },
]);

export default App;
