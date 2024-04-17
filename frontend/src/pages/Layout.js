import { Outlet, useLocation } from "react-router-dom";
import TopMenuBar from "../components/TopMenuBar";
import { Grid } from '@mui/material';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <Grid container spacing={2}>
      {!isLoginPage && (
        <Grid item xs={12}>
          <TopMenuBar />
        </Grid>
      )}
      <Grid item xs={isLoginPage ? 12 : 10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
