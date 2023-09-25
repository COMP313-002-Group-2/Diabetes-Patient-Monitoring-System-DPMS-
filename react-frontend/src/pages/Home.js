import { useContext, useEffect } from "react";
import accountContext from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import Alerts from "./Alerts";

export default function Home() {

  const { loggedIn, userType, userId } = useContext(accountContext);
  const navigate = useNavigate();


  console.log(
    `Logged in: ${loggedIn}, userType: ${userType}, userId: ${userId}`
  );


  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <>
      {userType === "STAFF" && loggedIn ? (
        <div>
          <h1>Alerts</h1>
          <Alerts />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
