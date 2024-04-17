import * as React from 'react';
import { useNavigate } from "react-router-dom";
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // Save user registration data to localStorage
    localStorage.setItem('userData', JSON.stringify({
      email: data.get('email'),
      password: data.get('password')
    }));

    // Redirect to login page after successful registration
    navigate('/login');
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: {xs:"0", md:"4.5em"},
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
            Create an account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3,p:"1em" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#c3c3c3",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#c3c3c3",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                                sx={{
                "& .MuiInputLabel-root": {
                  color: "#c3c3c3",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                                sx={{
                "& .MuiInputLabel-root": {
                  color: "#c3c3c3",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
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
              </Grid>
              <Grid item xs={12}>
              <FormControlLabel
  sx={{ color: "#c9c9c9", "& .MuiTypography-root": { fontSize: "0.9rem" } }}
  control={<Checkbox value="allowExtraEmails" sx={{ color: "#c3c3c3" }} />}
  label="I want to receive inspiration, marketing promotions and updates via email."
/>

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}