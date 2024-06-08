import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <Box maxWidth={800} margin="0 auto" padding="2rem 0">
      <Typography component="h1" variant="h4">
        Page not found
      </Typography>
      <Typography component="p" variant="body1">
        Go to another page
      </Typography>
      <Button
        component={Link}
        to="/"
        color="secondary"
        variant="outlined"
        sx={{ margin: '1rem 0' }}
      >
        Go to home page
      </Button>
    </Box>
  );
}
