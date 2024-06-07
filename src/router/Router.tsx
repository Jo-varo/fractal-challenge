import { createBrowserRouter } from "react-router-dom";
import Page404 from "../views/404";
import App from "../App";
import ManageOrder from "../views/ManageOrder";
import Orders from "../views/Orders";
import Home from "../views/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'my-orders',
        element: <Orders />,
      },
      {
        path: 'add-order',
        element: <ManageOrder />,
      },
      {
        path: 'add-order/:id',
        element: <ManageOrder />,
      },
    ],
  },
]);