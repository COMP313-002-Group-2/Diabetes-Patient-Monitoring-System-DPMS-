import { useState, useContext, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, gql } from "@apollo/client";
import accountContext from "../context/accountContext";

// ADD_ALERT
const ADD_ALERT = gql`
    mutation AddAlert(
        $alertName: String!
        $alertDescription: String!
        $patientId: String!
        $status: String!
    ) {
        addAlert(
            alertName: $alertName
            alertDescription: $alertDescription
            status: $status
            patientId: $patientId
        ) {
            _id
            alertName
            alertDescription
            status
            user {
                _id
                name
                email
                userType
            }
        }
    }

`;

export default function AddAlertModal(props) {
    const { userId } = useContext(accountContext);
    const [alertName, setAlertName] = useState("");
    const [alertDescription, setAlertDescription] = useState("");
    const [patientId, setPatientId] = useState(userId);
    const [status, setStatus] = useState("ACTIVE");
    const [submit, setSubmit] = useState(false)
    const [errMsg, setErrMsg] = useState("")


    const [addAlert] = useMutation(ADD_ALERT, {
        variables: {
            alertName: alertName,
            alertDescription: alertDescription,
            status: status,
            patientId: patientId
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
    };

    useEffect(()=>{
        if(submit){
            setErrMsg("");
            addAlert()
            .then(()=>{
                setAlertName('');
                setAlertDescription('');
                setPatientId(userId);
                setStatus('ACTIVE');
                

            }).catch(() =>{
                setErrMsg("Error")
                setAlertName('');
                setAlertDescription('');
                setPatientId(userId);
                setStatus('ACTIVE');
                setSubmit(false)
            })

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submit])



  return (
    <>
    <h1>Click the button below to raise an alert</h1>
    
    <p>Alerts are sent directly to nurses and should be used for emergencies only</p>
    {(
        <>{errMsg}
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addAlertModal"
            >
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>New Alert</div>
                    </div>
                    </button>
                    
                    <div
                        className="modal fade"     
                        id="addAlertModal"
                        aria-labelledby="addAlertModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addAlertModalLabel">
                                        New Alert
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={onSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label">Alert Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="alertName"
                                                        value={alertName}
                                                        onChange={(e) => setAlertName(e.target.value)}
                                                    />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Alert Description</label>
                                                        <textarea
                                                            className="form-control"
                                                            id="alertDescription"
                                                            value={alertDescription}
                                                            onChange={(e) => setAlertDescription(e.target.value)}
                                                        ></textarea>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Status</label>
                                                            <select
                                                                id="status"
                                                                className="form-select"
                                                                value={status}
                                                                onChange={(e) => setStatus(e.target.value)}
                                                            >
                                                                <option value="ACTIVE">ACTIVE</option>
                                                                <option value="INACTIVE">INACTIVE</option>
                                                            </select>
                                                        </div>                                

                                                     <button
                                                         type="submit"
                                                         className="btn btn-primary"
                                                         data-bs-dismiss="modal"
                                                     >
                                                         Submit
                                                     </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                </>
                                            
  )
}
