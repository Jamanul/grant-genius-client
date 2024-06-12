import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider,useQuery,
  useMutation,
  useQueryClient, } from "@tanstack/react-query";
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
import Dashboard from "./Layout/Dashboard.jsx";
import UserHome from "./Pages/Dashboard/UserHome/UserHome.jsx";
import UserApplication from "./Pages/Dashboard/UserApplication/UserApplication.jsx";
import App from "./App.jsx";
import EditApplication from "./Pages/Dashboard/UserApplication/EditApplication.jsx";
import MyReviews from "./Pages/Dashboard/MyReviews/MyReviews.jsx";

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
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
      {
        path: "scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/all-scholarship/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "user-dashboard",
        element: <UserHome></UserHome>,
      },
      {
        path: "my-application",
        element: <UserApplication></UserApplication>,
      },
      {
        path: "edit/:id",
        element:<EditApplication></EditApplication>
      },
      {
        path: "my-reviews",
        element:<MyReviews></MyReviews>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
