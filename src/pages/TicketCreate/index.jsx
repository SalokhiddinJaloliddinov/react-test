import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import TicketCreate from "../../components/TicketCreate/TicketCreate";

function TicketCreatePage(props) {
  return (
    <MainLayout>
      <TicketCreate />
    </MainLayout>
  );
}

export default TicketCreatePage;
