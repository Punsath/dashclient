import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { AboutUs } from "../pages/about-us/AboutUs";
import { Home } from "../pages/home/Home";
import { News } from "../pages/news/News";
import { SiteMap } from "../pages/services/SiteMap";
import { ContactUs } from "../pages/contact-us/ContactUs";
import { Wildlife } from "../pages/main-event/Wildlife";

import Dashboard from '../pages/Admin/Dashboard'
import AdminHome from '../pages/Admin/AdminHome'
import NewsAdmin from '../pages/Admin/NewsAdmin'

import AddEmployee from '../pages/Admin/AddNews'
import EditEmployee from '../pages/Admin/EditNews'
import Start from '../pages/Admin/Start'

import Login from '../pages/Admin/Login'
import { GeneralTipsAndTricks } from "../pages/products/GeneralTipsAndTricks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/products",
        element: <GeneralTipsAndTricks />,
      },
      {
        path: "/services",
        element: <SiteMap />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/main-events",
        element: <Wildlife />,
      },
      
    
     
    
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "adminhome", element: <AdminHome/> },
      { path: "employee", element: <NewsAdmin /> },

      { path: "add_employee", element: <AddEmployee /> },
      { path: "edit_employee/:id", element: <EditEmployee /> },
    ],
  },
  {
    path: "/start",
    element: <Start />,
  },

  {
    path: "/adminlogin",
    element: <Login />,
  },



]);

export default router;
