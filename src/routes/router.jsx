import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from '../pages/Admin/Dashboard'
import AdminHome from '../pages/Admin/AdminHome'
import NewsAdmin from '../pages/Admin/NewsAdmin'
import AddEmployee from '../pages/Admin/AddNews'
import EditEmployee from '../pages/Admin/EditNews'
import Start from '../pages/Admin/Start'
import Login from '../pages/Admin/Login'

import PetBottles from '../pages/PetBottles/PetBottles'
import AddPetBottle from '../pages/PetBottles/AddPetBottle'
import EditPetBottle from '../pages/PetBottles/EditPetBottle'

import HotspotMapping from '../pages/HotspotMapping/HotspotMapping'
import AddHotspot from '../pages/HotspotMapping/AddHotspot'
import EditHotspot from '../pages/HotspotMapping/EditHotspot'

import WasteCollection from '../pages/WasteCollection/WasteCollection'
import AddWasteCollection from '../pages/WasteCollection/AddWasteCollection'
import EditWasteCollection from '../pages/WasteCollection/EditWasteCollection'

import RiverInterception from '../pages/RiverInterception/RiverInterception'
import AddRiverInterception from '../pages/RiverInterception/AddRiverInterception'
import EditRiverInterception from '../pages/RiverInterception/EditRiverInterception'


const router = createBrowserRouter([

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "adminhome", element: <AdminHome/> },
      { path: "employee", element: <NewsAdmin /> },
      { path: "add_employee", element: <AddEmployee /> },
      { path: "edit_employee/:id", element: <EditEmployee /> },

      { path: "pet_bottles", element: <PetBottles /> },
      { path: "add_bottles", element: <AddPetBottle /> },
      { path: "edit_bottles/:id", element: <EditPetBottle /> },

      { path: "hotspot_mapping", element: <HotspotMapping /> },
      { path: "add_hotspot", element: <AddHotspot /> },
      { path: "edit_hotspot/:id", element: <EditHotspot /> },

      { path: "waste_collection", element: <WasteCollection /> },
      { path: "addwaste_collection", element: <AddWasteCollection /> },
      { path: "editwaste_collection/:id", element: <EditWasteCollection /> },

      { path: "river_interception", element: <RiverInterception /> },
      { path: "addriver_interception", element: <AddRiverInterception /> },
      { path: "editriver_interception/:id", element: <EditRiverInterception /> },
    ],
  },
  {
    path: "/start",
    element: <Start />,
  },

  {
    path: "/",
    element: <Login />,
  },



]);

export default router;
