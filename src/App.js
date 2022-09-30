import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes, useParams } from "react-router-dom";
import TicketListPage from "./pages/TicketList";
import TicketViewPage from "./pages/TicketView";
import TicketCreatePage from "./pages/TicketCreate";
import Example from "./components/Example/Example";

function App() {
  // console.log(userRequests);
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Example />} />
        <Route path={"/ticket/user-request/:id"} element={<TicketViewPage />} />
        <Route path={"/ticket"} element={<TicketListPage />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/ticket/create"} element={<TicketCreatePage />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
