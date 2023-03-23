import "./App.css";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Button variant="contained">
        <a
          href={"/create-booking"}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Create Booking
        </a>
      </Button>
      <Button variant="contained">
        <a
          href={"/check-booking"}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Check Booking
        </a>
      </Button>
    </div>
  );
}

export default App;
