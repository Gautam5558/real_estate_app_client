import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Residencies from "./pages/residencies/Residencies";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import SingleResidency from "./pages/singleresidency/SingleResidency";
import Login from "./pages/login/Login";
import { AuthContextProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import Bookings from "./pages/bookings/Bookings";
import Favorites from "./pages/favorites/Favorites";
import Register from "./pages/register/Register";
import ProtectedLayout from "./components/protectedLayout/ProtectedLayout";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "residencies",
        element: <Residencies />,
      },
      {
        path: "residencies/:residencyId",
        element: <SingleResidency />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "protected",
        element: <ProtectedLayout />,
        children: [
          {
            path: "bookings",
            element: <Bookings />
          },
          {
            path: "favorites",
            element: <Favorites />
          },
        ]
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
])


function App() {
  const queryClient = new QueryClient()
  return (
    <MantineProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient} >
          <div className="app">
            <RouterProvider router={router} />
          </div>
          <ToastContainer />
        </QueryClientProvider>
      </AuthContextProvider>
    </MantineProvider>
  );
}

export default App;
