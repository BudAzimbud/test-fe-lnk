import {
  Box,
  Button,
  Grid,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { IFormEmail } from "../constant/email.constant";
import { createEmailSend, deleteEmailSend, editEmailSend } from "../helper/services";

type PropsFormModal = {
  open: boolean;
  onClose: () => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function FormModal({ open, onClose }: PropsFormModal) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<IFormEmail>();
  const isEdit = watch("id");

  const [snakBarDelete, setSnackBarDelete] = React.useState(false);
  const handleDelete = () => {
    deleteEmailSend(watch("id")).then((res) => {
      setSnackBarDelete(true);
      onClose();
    });
  };

  const onSubmit = (data: IFormEmail) => {
    if(data.id){
      editEmailSend(data).then((res) => {
        onClose();
        setSnackbarOpen(true);
      });
    }else{
      createEmailSend(data).then((res) => {
        onClose();
        setSnackbarOpen(true);
      });
    }

  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={3} container>
              <Grid item xs={12}>
                {isEdit ? (
                  <h2 id="modal-modal-title">Update Email</h2>
                ) : (
                  <h2 id="modal-modal-title">Create New Email</h2>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: "This field is required",
                  })}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  fullWidth
                  size="small"
                  label={"Email"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("date", {
                    required: "This field is required",
                  })}
                  error={!!errors.date?.message}
                  helperText={errors.date?.message}
                  fullWidth
                  size="small"
                  type="date"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("description", {
                    required: "This field is required",
                  })}
                  error={!!errors.description?.message}
                  helperText={errors.description?.message}
                  fullWidth
                  size="small"
                  label={"Description"}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                {watch("id") && (
                  <Button onClick={handleDelete} variant="outlined" color="error">
                    Delete
                  </Button>
                )}
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={
          isEdit
            ? "Sucessfully update email send"
            : "Sucessfully create new email send"
        }
      />
      <Snackbar
        open={snakBarDelete}
        autoHideDuration={6000}
        onClose={() => setSnackBarDelete(false)}
        message="Already deleted"
      />
    </>
  );
}

export default FormModal;
