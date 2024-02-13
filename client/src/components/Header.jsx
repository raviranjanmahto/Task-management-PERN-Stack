import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link component from React Router

function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component={Link}
          to={"/"}
          sx={{ flexGrow: 1, color: "#fff", textDecoration: "none" }}
        >
          Task Management
        </Typography>
        <Button color='inherit' component={Link} to='/add-task'>
          Create Task
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
