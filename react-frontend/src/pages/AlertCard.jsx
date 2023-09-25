
export default function AlertCard({alert}) {
  return (
    <div className="col-md-4">
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{alert.alertName}</h5>
                    {/* <a className="btn btn-light" href={`/alerts/${alert._id}`}>View</a> */}

                </div>
                <p className="card-text">{alert.alertDescription}</p>
                <p className="small">Status: <strong>{alert.status}</strong></p>

            </div>
        </div>
    </div>
    );
}
