import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AccountNav from './AccountNav';
import { Box, Typography } from '@mui/material';

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div">EER Inventory</Typography>
          <Box flexGrow={1}/>
          <AccountNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
