import React from 'react'
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import {Button } from '@material-ui/core';
function StaffScreen() {
  return (
    <div>
    <Link to="/addambulance" style={{ textDecoration: 'none', marginLeft: '10px' }}>
      <Button variant="contained" startIcon={<AddIcon />} color="primary">
        Add Ambulance
      </Button>
    </Link>
    <Link to="/addambulancerequest" style={{ textDecoration: 'none', marginLeft: '10px' }}>
      <Button variant="contained" startIcon={<AddIcon />} color="primary">
        Create Ambulance Request
      </Button>
    </Link>
    </div>
  )
}

export default StaffScreen