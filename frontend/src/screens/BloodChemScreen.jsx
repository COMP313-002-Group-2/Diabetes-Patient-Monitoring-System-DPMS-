import React from 'react';
import AWS from 'aws-sdk';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  faEdit,
  faTrashAlt,
  faFileAlt,
  faArrowLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { BLOODCHEM_QUERY } from '../graphql/queries';
import { DELETE_BLOODCHEM } from '../graphql/mutation';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BloodChemScreen = () => {
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [deleteBloodchem] = useMutation(DELETE_BLOODCHEM, {
    refetchQueries: [{ query: BLOODCHEM_QUERY, variables: { patientId } }],
  });

  const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.REACT_APP_AWS_REGION;
  const awsBucketName = process.env.REACT_APP_AWS_BUCKET_NAME;

  const getS3FileUrl = (documentId) => {
    const s3BucketUrl = process.env.REACT_APP_AWS_BUCKET_URL;
    return `${s3BucketUrl}${documentId}`;
  };

  // Use the patientId to fetch the blood chemistry data
  const {
    loading: bloodchemLoading,
    error: bloodchemError,
    data: bloodchemData,
  } = useQuery(BLOODCHEM_QUERY, {
    variables: { patientId: patientId },
    skip: !patientId, // Skip this query if patientId is not available
  });

  if (bloodchemError) {
    console.error('Error loading blood chemistry data:', bloodchemError);
    return <div>Error loading blood chemistry data.</div>;
  }

  // Show a loading message until the query is completed
  if (bloodchemLoading) return <div>Loading...</div>;

  // Extract bloodchem data from the query result
  const bloodchemdata = bloodchemData?.getBloodChemByPatientId || [];
  // const PatientId =
  //   bloodchemdata.length > 0 ? bloodchemdata[0].patientId : null;

  //Format the date
  const formatDate = (timestamp) => {
    if (!timestamp || isNaN(Number(timestamp))) {
      return 'Invalid date';
    }
    return format(new Date(Number(timestamp)), 'yyyy-MM-dd');
  };

  const handleBackClick = () => {
    navigate('/patient/lablandingpage');
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      try {
        // Find the record to get the documentId
        const recordToDelete = bloodchemdata.find(
          (record) => record._id === _id
        );
        if (recordToDelete) {
          const documentId = recordToDelete.documentId;

          // AWS S3 configuration
          AWS.config.update({
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey,
            region: awsRegion,
          });

          const s3 = new AWS.S3();

          // Parameters for S3 deleteObject
          var deleteParams = {
            Bucket: awsBucketName,
            Key: documentId,
          };

          // Delete the file from S3
          s3.deleteObject(deleteParams, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log('File deleted from S3:', data); // successful response
          });
        }

        // delete the record from your database
        await deleteBloodchem({ variables: { _id } });
        // Show success notification
        toast.success('Record successfully deleted!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error('Error deleting bloodchem data', error);
        toast.error('Error occurred while deleting the record.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const renderActionButtons = (id) => (
    <>
      <Button
        variant='warning'
        size='sm'
        className='action-button'
        onClick={() => navigate(`/editbloodchem/${id}`)}
      >
        <FontAwesomeIcon icon={faEdit} /> Edit
      </Button>
      <Button
        variant='danger'
        size='sm'
        className='action-button'
        onClick={() => handleDelete(id)}
      >
        <FontAwesomeIcon icon={faTrashAlt} /> Delete
      </Button>
    </>
  );

  return (
    <Container>
      <div className='mb-3'>
        <Button
          variant='secondary'
          size='sm'
          className='action-button'
          onClick={handleBackClick}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Button>
        <Button
          variant='success'
          size='sm'
          className='action-button'
          onClick={() => navigate(`/addbloodchem`)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Record
        </Button>
      </div>
      <h2 className='text-center my-4'>Blood Chemistry Lab Result Overview</h2>
      <Table
        striped
        bordered
        hover
        className='align-items-center'
        size='sm'
        style={{ fontSize: '0.8em' }}
      >
        <thead>
          <tr>
            <th>Lab Date</th>
            <th>Glucose</th>
            <th>ALT (SGPT)</th>
            <th>AST (SGOT)</th>
            <th>Uric Acid</th>
            <th>Bun</th>
            <th>Cholesterol</th>
            <th>Triglycerides</th>
            <th>HDL Cholesterol</th>
            <th>ALDL</th>
            <th>VLDL</th>
            <th>Creatinine (Blood)</th>
            <th>eGFR</th>
            <th>View Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bloodchemdata.map((record) => {
            return (
              <tr key={record._id}>
                <td className='text-center'>{formatDate(record.labDate)}</td>
                <td className='text-center'>{record.glucose}</td>
                <td className='text-center'>{record.altSGPT}</td>
                <td className='text-center'>{record.astSGOT}</td>
                <td className='text-center'>{record.uricAcid}</td>
                <td className='text-center'>{record.bun}</td>
                <td className='text-center'>{record.cholesterol}</td>
                <td className='text-center'>{record.triglycerides}</td>
                <td className='text-center'>{record.hdlCholesterol}</td>
                <td className='text-center'>{record.aLDL}</td>
                <td className='text-center'>{record.vLDL}</td>
                <td className='text-center'>{record.creatinine}</td>
                <td className='text-center'>{record.eGFR}</td>
                <td className='text-center'>
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={() => {
                      const fileUrl = getS3FileUrl(record.documentId);
                      window.open(fileUrl, '_blank');
                    }}
                  >
                    <FontAwesomeIcon icon={faFileAlt} /> View
                  </Button>
                </td>
                <td className='text-center'>
                  {renderActionButtons(record._id)}
                </td>
              </tr>
            );
          })}
          <ToastContainer />
        </tbody>
      </Table>
    </Container>
  );
};

export default BloodChemScreen;
