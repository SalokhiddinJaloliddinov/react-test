import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import TicketView from "../../components/TicketView/TicketView";

function TicketViewPage(props) {
  return (
    <MainLayout>
      <TicketView />
    </MainLayout>
  );
}

export default TicketViewPage;
