import React from 'react'
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import {Button } from '@material-ui/core';
function StaffScreen() {
  return (
    <Link to="/addambulance" style={{ textDecoration: 'none', marginLeft: '10px' }}>
      <Button variant="contained" startIcon={<AddIcon />} color="primary">
        Add Ambulance
      </Button>
    </Link>
  )
}

export default StaffScreen