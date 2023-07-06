import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocData } from "../service/action";
import AccountDetails from "./AccountDetails";
import Navbar from "./Navbar";
import Users from "./Users";

const HomeContent = () => {
  const goto = useNavigate();

  const [docdata, setDocdata] = useState(undefined);

  useEffect(() => {
    getDocData()
      .then((res) => {
        setDocdata(res);
        console.log("res******", res);
      })
      .catch((err) => goto("/signin"));
  }, [goto]);

  const [content, setContent] = useState("DASHBOARD");

  const setContenttype = (type) => {
    setContent(type);
  };
  return (
    <>
      <Navbar setContenttype={setContenttype} />
      {content === "DASHBOARD" && (
        <div>{docdata && <AccountDetails docdata={docdata} />}</div>
      )}
      {content === "USERS" && (
        <div>{docdata && <Users docdata={docdata} />}</div>
      )}
    </>
  );
};

export default HomeContent;
