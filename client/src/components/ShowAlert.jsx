import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../state/globalSlice";

const ShowAlert = () => {
  const { alertMessage, alertSeverity, alertOpen } = useSelector(
    state => state.global
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearAlert());
  };

  return (
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={alertSeverity} onClose={handleClose}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default ShowAlert;
