import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import useAuthUser from "./hooks/useAuthUser";

import OAuthSuccess from "./pages/OAuthSuccess";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import ProductListing from "./pages/ProductListing";
import CartPage from "./pages/CartPage";
import AddProduct from "./pages/AddProduct";
import EcommerceFrontPage from "./pages/MainPage";


const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/cart" element={<CartPage />} />

      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <Register />
          ) : (
            <Navigate to={isOnboarded ? "/home" : "/profile"} />
          )
        }
      />
      <Route path="/home" element={<EcommerceFrontPage />} />
      <Route
        path="/product"
        element={
          isAuthenticated ?  <ProductListing /> : <Navigate to="/login" replace />
        }
      />
       

       <Route path="/add-product" element={ isAuthenticated? <AddProduct /> : <Navigate to = "/login" replace />} /> 

      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login />
          ) : (
            <Navigate to={isOnboarded ? "/home" : "/profile"} />
          )
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
        }
      />
      
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      
      





 
      

    </Routes>
  );
};

export default App;