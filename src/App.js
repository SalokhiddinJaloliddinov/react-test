import React from "react";
import "./App.css";
import TicketList from "./components/TicketList/TicketList";
import { Login } from "./components/Login/Login";
import TicketView from "./components/TicketView/TicketView";
import TicketCreate from "./components/TicketCreate/TicketCreate";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "./redux/slices/tickets";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import { Route, Routes, useParams } from "react-router-dom";
import nookies from "nookies";

function App() {
  // console.log(userRequests);
  const dispatch = useDispatch();
  const { userRequests } = useSelector((state) => state.tickets);
  React.useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);
  const params = useParams();
  console.log(params);
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/ticket/user-request/:id"} element={<TicketView />} />
          <Route
            path={"/ticket"}
            element={<TicketList userRequest={userRequests} />}
          />
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/ticket/create"} element={<TicketCreate />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  // Set
  nookies.set(ctx, "fromGetInitialProps", "value", {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { cookies };
}
