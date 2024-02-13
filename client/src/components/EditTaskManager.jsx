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
import { useGetATaskQuery, usePatchTaskMutation } from "../state/api";
import { useEffect, useState } from "react";

function EditTaskManager() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetATaskQuery(id);
  const [onSave] = usePatchTaskMutation();

  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);

  useEffect(() => {
    if (!isLoading) {
      setTitle(data?.task?.title);
      setDescription(data?.task?.description);
      setCompleted(data?.task?.completed);
    }
  }, [data, isLoading]);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCompletedChange = event => {
    setCompleted(event.target.checked);
  };

  const handleSave = e => {
    e.preventDefault();
    onSave({ title, description, completed, id });
    refetch();
    navigate("/");
  };

  return (
    <Container maxWidth='sm' sx={{ padding: "2rem" }}>
      {title === undefined ? (
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
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
}

export default EditTaskManager;
