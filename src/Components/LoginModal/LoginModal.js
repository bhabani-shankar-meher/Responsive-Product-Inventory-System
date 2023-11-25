import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { loginUserModal } from "../../store/action/login";

export default function LoginModal(props) {
    const navigate = useNavigate();
    const { openLoginAlert } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(loginUserModal(false));
    };
    const handleLogin = () => {
        navigate("/login", { replace: true });
        handleClose();
    };
    const handleSignup = () => {
        navigate("/signup", { replace: true });
        handleClose();
    };
    return (
        <div>
            <Dialog
                open={openLoginAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Looks like you are not logged in."}
                    {"To perform edit and delete operation you need to Login."}
                </DialogTitle>
                <DialogActions style={{ justifyContent: "flex-start" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}>Login</Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleSignup}>SignUp</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
