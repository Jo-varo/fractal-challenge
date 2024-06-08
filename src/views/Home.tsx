import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: 'center', margin: '.25rem 0 1rem' }}
      >
        Pages
      </Typography>
      <Box
        display="flex"
        gap="1rem"
        flexDirection="column"
        maxWidth="200px"
        margin="0 auto"
      >
        <Button
          component={Link}
          to="/my-orders"
          color="primary"
          variant="contained"
        >
          My orders
        </Button>
        <Button
          component={Link}
          to="/add-order"
          color="secondary"
          variant="contained"
        >
          Manage orders
        </Button>
      </Box>
    </>
  );
}
