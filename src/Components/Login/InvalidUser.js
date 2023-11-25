import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { invalidUserModal } from "../../store/action/login";

export default function DeleteAlert(props) {
  const { openInvalidUserAlert } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(invalidUserModal(false));
  };
  return (
    <div>
      <Dialog
        open={openInvalidUserAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Email or Password mismatch...!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}