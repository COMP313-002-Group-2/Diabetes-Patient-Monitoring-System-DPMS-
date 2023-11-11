import React from 'react'

function AdminScreen() {
  return (
    <div>
     <a href='/admin/users'><button className='btn btn-primary'>User List</button></a>
      {" "}
     <a href='/admin/add'><button className='btn btn-primary'>Add a User</button></a>
    </div>
  )
}

export default AdminScreen
