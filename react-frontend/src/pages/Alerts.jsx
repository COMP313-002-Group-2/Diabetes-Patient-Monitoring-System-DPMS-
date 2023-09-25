import { useQuery, gql } from "@apollo/client";
import {useState, useEffect} from "react";
//import { GET_ALERTS } from "../queries/alertQueries";
import AlertCard from "./AlertCard";
import Button from "react-bootstrap/Button";

//putting this here because I was getting an error with the import statement
const GET_ALERTS = gql`
{
    getAlerts {
        _id
        alertName
        alertDescription
        status 
    }
}
`;


export default function Alerts() {

    const [alertList, setAlertList] = useState([]);
    const [message, setMessage] = useState("");
    const [refresh, setRefresh] = useState(true);

    

    const { loading, error, data } = useQuery(GET_ALERTS,{
        pollInterval: 5000,
        skip: !refresh,
        fetchPolicy: "network-only"
    });

    useEffect(()=>{
        if(loading){
            setMessage("loading...")

        }
        else if(data){
            setAlertList(data.getAlerts)
            setRefresh(false);
            setMessage("");
        }else if(error){
            setMessage("Error:")
        }      

    }, [loading,data, error]);

    function updateRecord(){
        setRefresh(true);

    }


  return (
    <>
      <Button variant="info" onClick={updateRecord}>
        Refresh
      </Button>
    <p>{message}</p>
        {alertList.length > 0 ? (
            <div className="row mt-4">
                {alertList.map((item) => (
                    <AlertCard key={item._id} alert={item} />
                ))}
            </div>
        ) : (
            <p> No Alerts </p>

        )}
    </>
    );
}
