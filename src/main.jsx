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
import EditReview from "./Pages/Dashboard/MyReviews/EditReview.jsx";
import ManageUsers from "./Pages/Dashboard/ManageUsers/ManageUsers.jsx";
import ManageScholarship from "./Pages/Dashboard/ManageScholarship/ManageScholarship.jsx";
import EditScholarship from "./Pages/Dashboard/EditScholarship/EditScholarship.jsx";
import AddScholarship from "./Pages/Dashboard/AddScholarship/AddScholarship.jsx";
import ManageappliedScholarship from "./Pages/Dashboard/ManageAppliedScholarship/ManageappliedScholarship.jsx";
import AllReviews from "./Pages/Dashboard/AllReviews/AllReviews.jsx";
import AdminHome from "./Pages/Dashboard/UserHome/AdminHome.jsx";
import ModeratorHome from "./Pages/Dashboard/UserHome/ModeratorHome.jsx";
import AddScholarshipAdmin from "./Pages/Dashboard/AddScholarship/AddScholarshipAdmin.jsx";
import ManageAppliedScholarshipAdmin from "./Pages/Dashboard/ManageAppliedScholarship/ManageAppliedScholarshipAdmin.jsx";
import ManageScholarshipAdmin from "./Pages/Dashboard/ManageScholarship/ManageScholarshipAdmin.jsx";
import EditScholarshipAdmin from "./Pages/Dashboard/EditScholarship/EditScholarshipAdmin.jsx";
import AllReviewsAdmin from "./Pages/Dashboard/AllReviews/AllReviewsAdmin.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import ModeratorRoute from "./Routes/ModeratorRoute.jsx";

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
          fetch(`https://grant-genius-server.vercel.app/all-scholarship/${params.id}`),
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
        element: <PrivateRoute><UserHome></UserHome></PrivateRoute>,
      },
      {
        path: "admin-dashboard",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
      },
      {
        path: "moderator-dashboard",
        element: <ModeratorRoute><ModeratorHome></ModeratorHome></ModeratorRoute>,
      },
      {
        path: "my-application",
        element: <PrivateRoute><UserApplication></UserApplication></PrivateRoute>,
      },
      {
        path: "edit/:id",
        element:<EditApplication></EditApplication>
      },
      {
        path: "my-reviews",
        element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: "review-edit/:id",
        element: <EditReview></EditReview>
      },
      {
        path: "users",
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "manage-scholarship",
        element:<ModeratorRoute><ManageScholarship></ManageScholarship></ModeratorRoute>
      },
      {
        path: "manage-scholarship-admin",
        element:<AdminRoute><ManageScholarshipAdmin></ManageScholarshipAdmin></AdminRoute>
      },
      {
        path: "edit-scholarship/:id",
        element: <EditScholarship></EditScholarship>
      },
      {
        path: "edit-scholarship-admin/:id",
        element: <EditScholarshipAdmin></EditScholarshipAdmin>
      },
      {
        path: "add-scholarship",
        element: <ModeratorRoute><AddScholarship></AddScholarship></ModeratorRoute>
      },
      {
        path: "add-scholarship-admin",
        element: <AdminRoute><AddScholarshipAdmin></AddScholarshipAdmin></AdminRoute>
      },
      {
        path:"manage-applied-scholarship",
        element: <ModeratorRoute><ManageappliedScholarship></ManageappliedScholarship></ModeratorRoute>
      },
      {
        path:"manage-applied-scholarship-admin",
        element: <AdminRoute><ManageAppliedScholarshipAdmin></ManageAppliedScholarshipAdmin></AdminRoute>
      },
      {
        path: "all-reviews",
        element: <ModeratorRoute><AllReviews></AllReviews></ModeratorRoute>
      },
      {
        path: "all-reviews-admin",
        element: <AdminRoute><AllReviewsAdmin></AllReviewsAdmin></AdminRoute>
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
