import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
import Root from "./Layout/Root.jsx";
import Home from "./Pages/Home/Home.jsx";
import AllScholarship from "./Pages/AllScholarship/AllScholarship.jsx";
import AuthProvider from "./firebaseAuth/AuthProvider.jsx";
import Login from "./Pages/Login/Login.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import ScholarshipDetails from "./Pages/ScholarshipDetails/ScholarshipDetails.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Payment from "./Pages/Payment/Payment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "all-scholarship",
        element: <AllScholarship></AllScholarship>,
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path: 'registration',
        element:<Registration></Registration>
      },
      {
        path: '/scholarship/:id',
        element:<PrivateRoute><ScholarshipDetails></ScholarshipDetails></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:5000/all-scholarship/${params.id}`)
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:5000/all-scholarship/${params.id}`)
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
