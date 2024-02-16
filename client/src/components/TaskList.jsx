import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDeleteTaskMutation, useGetTaskQuery } from "../state/api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setALert } from "../state/globalSlice";

function TaskList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetTaskQuery();
  const [deleteTask, { isLoading: loading }] = useDeleteTaskMutation();
  const isNonMediumScreens = useMediaQuery("(min-width: 900px)");

  const handleDeleteClick = taskId => {
    setTaskToDeleteId(taskId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteTask(taskToDeleteId);

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
            alertMessage: "Task deleted successfully",
            alertSeverity: "success",
          })
        );
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      // Handle any unexpected errors
      dispatch(
        setALert({
          alertMessage: "An error occurred while deleting the task.",
          alertSeverity: "error",
        })
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Container
      maxWidth='md'
      sx={{
        display: "grid",
        gridTemplateColumns: isNonMediumScreens
          ? "repeat(2,1fr)"
          : "repeat(1,1fr)",
        columnGap: 2,
        padding: "2rem",
      }}
    >
      {isLoading ? (
        <Grid container justifyContent='center'>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {data?.tasks?.map(task => (
            <Grid item key={task?.id} xs={12}>
              <Box
                p={2}
                mb={2}
                boxShadow={2}
                borderRadius={2}
                bgcolor='background.paper'
              >
                <div style={{ marginBottom: "1rem" }}>
                  <>
                    <Typography variant='h6'>{task?.title}</Typography>
                    <Typography variant='body1'>{task?.description}</Typography>
                    <Typography
                      variant='body2'
                      color={task?.completed ? "textSecondary" : "primary"}
                    >
                      {task?.completed ? "Completed" : "Incomplete"}
                    </Typography>
                    <IconButton
                      component={Link}
                      to={`/${task?.id}`}
                      color='primary'
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(task?.id)}
                      color='secondary'
                    >
                      <Delete />
                    </IconButton>
                  </>
                </div>
              </Box>
            </Grid>
          ))}

          <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this task?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
              <Button
                onClick={handleDeleteConfirm}
                color='secondary'
                disabled={loading}
              >
                {!loading ? "Delete" : "Deleting..."}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
}

export default TaskList;
