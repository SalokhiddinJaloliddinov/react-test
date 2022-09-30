import React from "react";
import TicketList from "../../components/TicketList/TicketList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../redux/slices/tickets";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

function TicketListPage(props) {
  const user = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const { userRequests } = useSelector((state) => state.tickets);
  React.useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);
  const params = useParams();
  console.log(params);
  return (
    <MainLayout>
      <TicketList userRequest={userRequests} />
    </MainLayout>
  );
}

export default TicketListPage;
