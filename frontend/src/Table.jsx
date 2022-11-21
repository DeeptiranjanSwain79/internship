import React, { useEffect } from 'react';//eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllUsers, register, deleteUser } from "./actions/userActions";
import "./Table.css";
import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import { useState } from 'react';

const Table = () => {
  const dispatch = useDispatch();

  const { error, users } = useSelector(
    (state) => state.allUsers
  );

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [totalSales, setTotalSales] = useState();

  const createUserToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const deleteUserHandler = id => {
    dispatch(deleteUser(id));
    window.location.reload();
  }

  const createUserHandler = () => {
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("totalSales", totalSales);
    console.log(myForm)
    dispatch(register(myForm))

    setOpen(false);
    window.location.reload();
  }

  useEffect(() => {
    if (error) {
      // console.log(error);
      dispatch(clearErrors);
    }
    dispatch(getAllUsers());
  }, [dispatch, error]);

  return (
    <div>
      <table id='table' align='center' border='5' width='100%'>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Total Sales</th>
          <th>Action</th>
        </tr>

        {users && users.map(user => (
          <tr className='table-rows'>
            <td className='rows-data'>{user._id}</td>
            <td className='rows-data'>{user.name}</td>
            <td className='rows-data'>{user.phone}</td>
            <td className='rows-data'>{user.email}</td>
            <td className='rows-data'>{user.totalSales}</td>
            <td className='rows-data'>
              <Link className='btn btn-primary m-2' to={`/user/${user._id}`}>Update</Link>
              <button className='btn btn-danger m-2' onClick={() => deleteUserHandler(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      <button onClick={createUserToggle} className='create-user-btn btn btn-primary container m-4'>Register User</button>
      <Link to={'/dashboard'} className='create-user-btn btn btn-success container m-4'>Go to Dashboard</Link>


      <Dialog
        aria-labelledby='simple-dialog-title'
        open={open}
        onClose={createUserToggle}
      >
        <DialogTitle>Register User</DialogTitle>
        <DialogContent className='submitDialog'>
          <input className='m-1 rounded-4 p-2' placeholder='Name' type="text" value={name} onChange={e => setName(e.target.value)} /><br />
          <input className='m-1 rounded-4 p-2' placeholder='E-mail ID' type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
          <input className='m-1 rounded-4 p-2' placeholder='Phone Number' type="number" value={phone} onChange={e => setPhone(e.target.value)} /><br />
          <input className='m-1 rounded-4 p-2' placeholder='Sales Value' type="number" value={totalSales} onChange={e => setTotalSales(e.target.value)} /><br />

          <DialogActions>
            <Button color="secondary" onClick={createUserToggle} >Cancel</Button>
            <Button color="primary" onClick={createUserHandler}>Submit</Button>
          </DialogActions>
        </DialogContent>

      </Dialog>

    </div>
  )
}

export default Table
