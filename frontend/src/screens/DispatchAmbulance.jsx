import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { makeStyles } from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddIcon from "@material-ui/icons/Add";

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import {
  DirectionsCar,
  LocationOn,
  CheckCircle,
  Warning,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHead: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.light,
  },
  green: {
    color: "green",
  },
  blue: {
    color: "blue",
  },
  red: {
    color: "red",
  },
  orange: {
    color: "orange",
  },
  black: {
    color: "black",
  },
}));
const GET_AMBULANCES = gql`
  {
    ambulances {
      _id
      crewMembers
      location
      status
      eta
    }
  }
`;
const SEND_EMAIL = gql`
  mutation emailOnDispatch($ambId: String!, $rxEmail: String!) {
    emailOnDispatch(ambId: $ambId, rxEmail: $rxEmail) {
      ambId
      rxEmail
    }
  }
`;
const hardcodedAmbulances = [
    {
      _id: "1",
      crewMembers: "Driver 1, EMT 1, Medic 1",
      location: "38 Lyon Heights Rd, Toronto, CA",
      status: "Available",
      eta: 20,
    },
    {
      _id: "2",
      crewMembers: "Driver 2, EMT 2, Medic 2",
      location: "25 Alice Crescent, Toronto, CA",
      status: "On-Route",
      eta: 45,
    },
    {
      _id: "3",
      crewMembers: "Driver 3, EMT 3, Medic 3",
      location: "332 Conlins Road, Toronto, CA",
      status: "Available",
      eta: 1,
    },
    {
      _id: "3",
      crewMembers: "Driver 3, EMT 3, Medic 3",
      location: "8500 Sheppard Ave E, Toronto, CA",
      status: "Available",
      eta: 1,
    },
    {
      _id: "3",
      crewMembers: "Driver 3, EMT 3, Medic 3",
      location: "4331 Lawrence Ave E, Toronto, CA",
      status: "Available",
      eta: 1,
    },]
const DispatchAmbulance = () => {
  const classes = useStyles();
 // const { loading, error, data, refetch } = useQuery(GET_AMBULANCES);
  const [sendEmail] = useMutation(SEND_EMAIL);
  const statusOptions = ["Available", "Unavailable", "On-Route"];
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [dispatchedAmbulances, setDispatchedAmbulances] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const handleDispatch = (ambulance) => {
    const timestamp = Date.now();
    console.log("Dispatching ambulance", ambulance._id, "at", timestamp);
    sendEmail({
      variables: {
        ambId: "23",
        rxEmail: "vimal@gmail.com",
      },
    });
    // Update the status of the ambulance to "En Route"
    ambulance.status = "On-Route";

    // Store the dispatch time and ETA in localStorage
    localStorage.setItem(
      `dispatch_${ambulance._id}`,
      JSON.stringify({ timestamp, eta: ambulance.eta })
    );

    setDispatchedAmbulances([
      ...dispatchedAmbulances,
      { ...ambulance, timestamp },
    ]);

    // Update the remaining time of each dispatched ambulance every second
    const intervalId = setInterval(() => {
      const dispatched = dispatchedAmbulances.find(
        (dispatched) => dispatched._id === ambulance._id
      );
      if (!dispatched) {
        clearInterval(intervalId);
        return;
      }

      const dispatchInfo = JSON.parse(
        localStorage.getItem(`dispatch_${ambulance._id}`)
      );
      const remainingTime = Math.max(
        (dispatchInfo.eta * 60 -
          (Date.now() - Date.parse(dispatchInfo.timestamp)) / 1000) /
          60,
        0
      ).toFixed(0);

      // Update the dispatch status and remaining time in localStorage
      localStorage.setItem(
        `dispatch_${ambulance._id}`,
        JSON.stringify({
          timestamp: dispatchInfo.timestamp,
          eta: dispatchInfo.eta,
          remainingTime,
        })
      );

      if (remainingTime === 0) {
        setShowNotification(true);
        clearInterval(intervalId);
        setDispatchedAmbulances(
          dispatchedAmbulances.filter(
            (dispatched) => dispatched._id !== ambulance._id
          )
        );
        // Update the status of the ambulance to "Reached Destination"
        ambulance.status = "Reached Destination";
        setNotificationMessage(
          `Ambulance ${ambulance._id} has reached its destination!`
        );

        localStorage.removeItem(`dispatch_${ambulance._id}`);

        // Remove the dispatched ambulance record from the table
        const updatedData = hardcodedAmbulances.filter(
          (a) => a._id !== ambulance._id
        );
      }
    }, 1000);

    setNotificationMessage(`Ambulance ${ambulance._id} has been dispatched!`);
    setShowNotification(true);
  };

  const handleTrack = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setShowDetails(true);
  };


  return (
    <div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="ambulance table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>ID</TableCell>
              <TableCell className={classes.tableHead}>Crew Members</TableCell>
              <TableCell className={classes.tableHead}>Location</TableCell>
              <TableCell className={classes.tableHead}>Status</TableCell>
              <TableCell className={classes.tableHead}>ETA</TableCell>
              <TableCell className={classes.tableHead}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hardcodedAmbulances.map((ambulance, index) => {
              const dispatched = dispatchedAmbulances.find(
                (dispatched) => dispatched._id === ambulance._id
              );
              const remainingTime = dispatched
                ? Math.max(
                    (dispatched.eta * 60 -
                      (Date.now() - Date.parse(dispatched.timestamp)) / 1000) /
                      60,
                    0
                  ).toFixed(0)
                : null;
              return (
                <TableRow key={index}>
                  <TableCell>{ambulance._id}</TableCell>
                  <TableCell>{ambulance.crewMembers}</TableCell>
                  <TableCell>
                    {ambulance.status === "Unavailable"
                      ? "Off-Duty"
                      : ambulance.location}
                  </TableCell>
                  <TableCell
                    className={
                      dispatched
                        ? ambulance.status === "Reached Destination"
                          ? classes.black
                          : classes.orange
                        : ambulance.status === "Available"
                        ? classes.green
                        : ambulance.status === "On-Route"
                        ? classes.blue
                        : classes.red
                    }
                  >
                    {dispatched
                      ? ambulance.status === "Reached Destination"
                        ? "Reached Destination"
                        : "On-Route"
                      : ambulance.status}
                  </TableCell>
                  <TableCell>
                    {dispatched ? (
                      <span>{ambulance.eta} minutes</span>
                    ) : (
                      <span>{ambulance.eta} minutes</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Dispatch">
                      <span>
                        <IconButton
                          aria-label="dispatch"
                          disabled={ambulance.status === "Unavailable"}
                          onClick={() =>
                            handleDispatch({
                              ...ambulance,
                              dispatchedAt: new Date().toISOString(),
                            })
                          }
                        >
                          <DirectionsCar />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title="Track">
                      <span>
                        <IconButton
                          aria-label="track"
                          onClick={() => handleTrack(ambulance)}
                        >
                          <LocationOn />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal show={showNotification} onHide={() => setShowNotification(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notificationMessage}</Modal.Body>
      </Modal>

      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ambulance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ID: {selectedAmbulance && selectedAmbulance._id}</p>
          <p>
            Crew Members: {selectedAmbulance && selectedAmbulance.crewMembers}
          </p>
          <p>Location: {selectedAmbulance && selectedAmbulance.location}</p>
          <p>Status: {selectedAmbulance && selectedAmbulance.status}</p>
          <p>ETA: {selectedAmbulance && selectedAmbulance.eta} minutes</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DispatchAmbulance;
