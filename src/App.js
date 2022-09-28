import "./App.css";
import TicketList from "./components/TicketList/TicketList";
import { Login } from "./components/Login/Login";
import TicketView from "./components/TicketView/TicketView";
import TicketCreate from "./components/TicketCreate/TicketCreate";

function App() {
  return (
    <div>
      {/*<TicketList />*/}
      {/*<TicketView />*/}
      <TicketCreate />
      {/*<Login />*/}
    </div>
  );
}

export default App;
