import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="#aa9f99" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/AliNikseresht/chatmate-messenger">
        nikweb.1
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      setError('User not registered. Please sign up.');
      return;
    }

    const userData = JSON.parse(userDataString);
    const { email, password } = userData;

    // Check if login credentials match
    if (data.get('email') === email && data.get('password') === password) {
      // Redirect to home page after successful login
      navigate('/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "5em",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 150.56%)",
            p:"0.5em",
            borderRadius:'0.7em'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'transparent', }}>
            <FingerprintIcon sx={{fontSize:"3rem"}}/>
          </Avatar>
          <Typography component="h1" variant="h5" color="#c3c3c3">
          Log in to your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, p:"1em" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#c3c3c3",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
              InputProps={{
                style: {
                  color:"#c9c9c9"
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#c3c3c3",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
              InputProps={{
                style: {
                  color:"#c9c9c9"
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" sx={{color:"#c3c3c3"}} />}
              label="Remember me"
              sx={{borderRadius:"0.7em", color:"#c3c3c3"}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: "40px",
                textTransform: "capitalize",
                borderRadius: "0.7em",
                px: "2em",
                bgcolor: "#006DA4",
                mt: 3, mb: 2,
                "&:hover": {
                  bgcolor: "#004D74",
                },
                color: "#fff",
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2" sx={{fontSize:{xs:"0.7rem", sm:'1rem'}}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2" sx={{fontSize:{xs:"0.7rem", sm:'1rem'}}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {error && (
  <Typography variant="body2" color="error" align="center">
    {error}
  </Typography>
)}

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}