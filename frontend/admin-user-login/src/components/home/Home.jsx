import { useEffect, useState } from "react";
import HomeContent from "./HomeContent";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "./LoadingDialog";

export default function Home() {
  const authtoken = localStorage.getItem("authtoken");

  const [token, setToken] = useState("");

  const goto = useNavigate();

  useEffect(() => {
    setToken(authtoken);
    if (authtoken) {
      console.log("token*******", token);
    }

    if (!authtoken) {
      goto("/signin");
    }
  }, [authtoken, goto, token]);

  return (
    <>
      <HomeContent />
    </>
  );
}
