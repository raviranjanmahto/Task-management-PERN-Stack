import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Container,
  Grid,
} from "@mui/material";
import { usePostTaskMutation } from "../state/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setALert, setFields } from "../state/globalSlice";

function CreateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, description, completed } = useSelector(state => state.global);

  const [createTask, { isLoading }] = usePostTaskMutation();

  const handleChange = event => {
    const { name, value } = event.target;
    dispatch(
      setFields({
        title: name === "title" ? value : undefined,
        description: name === "description" ? value : undefined,
        completed: name === "completed" ? value : false,
      })
    );
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const result = await createTask({ title, description, completed });
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
            alertMessage: "Task created successfully",
            alertSeverity: "success",
          })
        );
        navigate("/");
      }
    } catch (error) {
      // Handle any unexpected errors
      dispatch(
        setALert({
          alertMessage: "An error occurred while creating the task.",
          alertSeverity: "error",
        })
      );
    }
  };

  return (
    <Container maxWidth='sm' sx={{ padding: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Title'
              variant='outlined'
              name='title'
              onChange={handleChange}
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Description'
              variant='outlined'
              multiline
              rows={4}
              name='description'
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name='completed' onChange={handleChange} />}
              label='Completed'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={isLoading}
            >
              {isLoading ? "Adding Task, Please wait..." : "Add Task"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default CreateTask;
