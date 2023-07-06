import { useEffect, useState } from "react";
import Signin from "./components/auth/Signin";
import Home from "./components/home/Home";

function App() {
  const authtoken = localStorage.getItem("authtoken");

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(authtoken);
  }, [authtoken]);

  return (
    <div className="App">
      {!token && <Signin />}
      {token && <Home />}
    </div>
  );
}

export default App;
