import { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Container,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { usePostTaskMutation } from "../state/api";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const [createTask, { isSuccess, isUninitialized, error, isError }] =
    usePostTaskMutation({
      title,
      description,
      completed,
    });

  const navigate = useNavigate();

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCompletedChange = event => {
    setCompleted(event.target.checked);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createTask({ title, description, completed });
    setTimeout(() => {
      navigate("/");
    }, 2000);
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
              value={title}
              onChange={handleTitleChange}
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
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={completed}
                  onChange={handleCompletedChange}
                />
              }
              label='Completed'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={!isUninitialized}
            >
              {!isUninitialized ? "Adding Task, Please wait..." : "Add Task"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={isSuccess} autoHideDuration={6000}>
        <Alert severity='success' onClose={() => {}}>
          Task created successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={6000}>
        <Alert severity='error' onClose={() => {}}>
          {error && error?.data?.message}
          {/* Error creating task. Please try again. */}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CreateTask;
