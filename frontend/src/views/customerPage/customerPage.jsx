import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "./api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function CustomerPage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [idSelected,setIdSelected]=useState(null)
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setIdSelected(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    async function fetch() {
      axios
        .getCustomers()
        .then((res) => {
          let data = res.data;
          let temp = [];
          data.map((d) => {
            temp.push({
              id: d._id,
              name: d.name,
              adress: d.adress,
              number: d.mobile,
            });
          });
          setRows(temp);
        })
        .catch((err) => {});
    }
    fetch();
  }, []);

  const handleDelete = () => {
    setOpen(false)
    axios
      .delete(idSelected)
      .then((res) => {
        if (res.data.success === true) {
          setRows(current =>
            current.filter(obj => {
              return obj.id !== idSelected;
            }),
          );
          <Alert severity="success">
            <AlertTitle>Delete</AlertTitle>
            Your Customer was deleted
          </Alert>;
        }
      })
      .catch((err) => {});
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 50,
      editable: true,
    },
    {
      field: "adress",
      headerName: "Adress",
      flex: 0.3,
      minWidth: 50,
      editable: true,
    },
    {
      field: "number",
      headerName: "Number",
      type: "number",
      flex: 0.3,
      minWidth: 50,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="flex justify-between w-100">
            <div
              className="pointer"
              onClick={(event) => {
                navigate(`/edit/${cellValues.id}`);
              }}
            >
              Edit
            </div>
            <div
              className="pointer"
              onClick={() => {
                handleClickOpen(cellValues.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container">
      <div className="title">Customers</div>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add Customer
        </Button>
      </div>
      <Box sx={{ height: 400, width: "70%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>


       <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this customer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={()=>{handleDelete()}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
