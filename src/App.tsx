import { Link, Outlet } from 'react-router-dom';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button } from '@mui/material';

function App() {
  return (
    <Box maxWidth={800} margin="0 auto">
      <Box display="flex" justifyContent="center">
        <Button component={Link} to="/" color="secondary" size="large">
          Go to home page
        </Button>
      </Box>
      <Box padding="1rem 0">
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
