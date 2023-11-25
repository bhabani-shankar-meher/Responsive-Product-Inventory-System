import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteProductAPI, deleteProductModal } from "../../../store/action/getProduct";

export default function DeleteAlert(props) {
  const { openDeleteAlertModal, productDetails } = useSelector(
    (state) => state.getproduct
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(deleteProductModal(false));
  };

  const handleDelete = () => {
    dispatch(deleteProductAPI(productDetails.data.id));
    const data = productDetails.data;
    productDetails.api.updateRowData({ remove: [data] });
    productDetails.api.refreshCells({ force: true });
    dispatch(deleteProductModal(false));
  };
  return (
    <div>
      <Dialog
        open={openDeleteAlertModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete the product?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
