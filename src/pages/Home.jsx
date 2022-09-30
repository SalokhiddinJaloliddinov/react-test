import React from "react";
import Dashboard from "../components/Dashboard";
import MainLayout from "../components/Layout/MainLayout";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/login";
import { Navigate } from "react-router-dom";

function Home(props) {
  const isAuth = useSelector(selectIsAuth);
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default Home;
