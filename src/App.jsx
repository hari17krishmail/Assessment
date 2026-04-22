import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/Protectedroute";
import LoginPage from "./pages/Loginpage";
import ProductListPage from "./pages/Productlistpage";
import ProfilePage from "./pages/Profilepage";
import "./App.css";
import Resizehook from "./hooks/Resizehook";
import Header from "./components/Header";

const AppLayout = ({ children }) => {
  const widthResize = Resizehook();
  return (
    <div className="app-layout">
      {widthResize > 991 ? <></> : <Header />}
      <Sidebar />
      <main
        className={
          widthResize > 991 ? "app-main mobilewidth" : "app-main mobileunwidth"
        }
      >
        {children}
      </main>
    </div>
  );
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProductListPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/products" : "/"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
