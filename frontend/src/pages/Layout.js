import { Outlet } from "react-router-dom";
import TopMenuBar from "../components/TopMenuBar";
import { Grid } from '@mui/material';

const Layout = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopMenuBar />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
