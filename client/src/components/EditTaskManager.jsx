import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetATaskQuery, usePutTaskMutation } from "../state/api";
import { useDispatch } from "react-redux";
import { setALert } from "../state/globalSlice";

function EditTaskManager() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, refetch } = useGetATaskQuery(id);
  const [onSave, { isLoading }] = usePutTaskMutation();
  const dispatch = useDispatch();

  const handleSave = async event => {
    event.preventDefault();
    try {
      const { title, description, completed } = event.target.elements;

      const result = await onSave({
        title: title.value,
        description: description.value,
        completed: completed.checked,
        id,
      });

      if (result.error) {
        // Handle error if the mutation was unsuccessful
        dispatch(
          setALert({
            alertMessage: result.error.data.message,
            alertSeverity: "error",
          })
        );
      } else {
        // Handle success if the mutation was successful
        dispatch(
          setALert({
            alertMessage: "Task updated successfully",
            alertSeverity: "success",
          })
        );
        navigate("/");
        refetch();
      }
    } catch (error) {
      // Handle any unexpected errors
      dispatch(
        setALert({
          alertMessage: "An error occurred while updating the task.",
          alertSeverity: "error",
        })
      );
    }
  };

  return (
    <Container maxWidth='sm' sx={{ padding: "2rem" }}>
      {data === undefined ? (
        <Grid container justifyContent='center'>
          <CircularProgress />
        </Grid>
      ) : (
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Title'
                variant='outlined'
                defaultValue={data && data.task.title}
                name='title'
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Description'
                variant='outlined'
                multiline
                rows={4}
                defaultValue={data && data.task.description}
                name='description'
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='completed'
                    defaultChecked={data && data.task.completed}
                  />
                }
                label='Completed'
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant='outlined'
                color='secondary'
                fullWidth
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disabled={isLoading}
              >
                {!isLoading ? "Save" : "Saving..."}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
}

export default EditTaskManager;
