import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link, useRouteMatch } from "react-router-dom";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  getAllResearches,
  getAllWorkShops,
  updateResearchStatus,
  updateWorkShopStatus,
} from "../approvalService";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
  },
  title: {
    marginTop: "10px",
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const researchResourceApproval = () => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [data, setData] = useState("");

  useEffect(() => {
    getAllResearches().then((r) => {
      setData(r);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const handleFileClick = (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("data-id");
    const file = e.currentTarget.getAttribute("data-file");
    const filterData = data.filter((i) => i._id === id);
    filterData.map((item) => {
      if (item.file) {
        window.open(item.file, "_blank");
      }
    });
  };

  const setDialogD = async (id) => {
    let d = [];
    for (const item of [...data]) {
      if (item._id === id) {
        await d.push(item);
      }
    }
    setDialogData(d);
  };

  const handleClickOpen = async (e) => {
    setOpen(true);
    const id = e.currentTarget.getAttribute("data-id");
    await setDialogD(id);
  };

  const sendApproveNotification = async (dataId, type) => {
    if (type === "Approved") {
      const data = {
        researchId: dataId,
        type: "Approved",
      };
      await updateResearchStatus(data);
    } else if (type === "Rejected") {
      const data = {
        researchId: dataId,
        type: "Rejected",
      };
      await updateResearchStatus(data);
    }
  };

  const handleApprove = async (e) => {
    const researchId = e.currentTarget.getAttribute("data-id");
    await sendApproveNotification(researchId, "Approved");

    await getAllResearches().then((r) => {
      setData(r);
    });

    handleClose();
  };

  const handleReject = async (e) => {
    const researchId = e.currentTarget.getAttribute("data-id");
    await sendApproveNotification(researchId, "Rejected");

    await getAllResearches().then((r) => {
      setData(r);
    });

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "conferenceName", headerName: "Conference", width: 200 },
    { field: "author", headerName: "Submitted By", width: 200 },
    {
      field: "title",
      headerName: "Title",
      sortable: true,
      width: 200,
    },
    { field: "area", headerName: "Research Area", width: 200 },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
              data-id={params.row.id}
            >
              See more
            </Button>
            {dialogData &&
              dialogData.map((item, index) => (
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  style={{ minWidth: "500px" }}
                  id={index}
                >
                  <DialogTitle id="alert-dialog-title">
                    {item.title}
                  </DialogTitle>
                  <DialogContent style={{ minWidth: "500px" }}>
                    <DialogContentText id="alert-dialog-description">
                      {item.abstract}
                    </DialogContentText>
                    <hr />
                    <div>
                      area: <b>{item.area}</b>
                    </div>
                    <hr />
                    <div>
                      Email: <b>{item.email}</b>
                    </div>
                    <hr />
                    <div>
                      Status: <b>{item.status}</b>
                    </div>
                    <hr />
                    <div>
                      Submitted Date: <b>{item.start}</b>
                    </div>
                    <hr />
                    <div>
                      Resources:{" "}
                      <Button
                        onClick={handleFileClick}
                        data-id={item._id}
                        data-file={item.file ? item.file : null}
                      >
                        {item.file ? <InsertDriveFileIcon /> : "No files found"}
                      </Button>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleApprove}
                      data-id={item._id}
                      color="primary"
                      startIcon={<CheckCircleIcon />}
                      autoFocus
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={handleReject}
                      data-id={item._id}
                      color="secondary"
                      startIcon={<CancelIcon />}
                    >
                      Reject
                    </Button>
                  </DialogActions>
                </Dialog>
              ))}
          </div>
        );
      },
    },
  ];

  let rows = [];
  if (data) {
    rows = data.map((row) => {
      row.conferenceName = row.conference.title;
      return { ...row, id: row._id };
    });
  }

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h5"
        color="default"
        gutterBottom
      >
        Workshops For Approval
      </Typography>

      <div style={{ height: "65vh", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={7} />
      </div>
    </div>
  );
};

export default researchResourceApproval;
