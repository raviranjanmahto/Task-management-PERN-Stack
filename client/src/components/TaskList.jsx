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

function TaskList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const { data, isLoading } = useGetTaskQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const isNonMediumScreens = useMediaQuery("(min-width: 900px)");

  const handleDeleteClick = taskId => {
    setTaskToDeleteId(taskId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteTask(taskToDeleteId);

    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Container
      maxWidth='md'
      sx={{
        display: "grid",
        // gridTemplateColumns: "repeat(2,1fr)",
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
              <Button onClick={handleDeleteConfirm} color='secondary'>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
}

export default TaskList;
