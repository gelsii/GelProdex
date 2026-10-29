import { createBrowserRouter } from "react-router";
import Home from "./routes/landingPage/Home";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const App = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
    ],
    errorElement: <h1>gell</h1>,
  },
]);

export default App;
