import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const navigate = useNavigate();

  // Function to handle login and submit login form
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setIsLoginInProgress(true);
    setIsLoggedIn(false);
    setErrorMessage(false);

    setTimeout(() => {
      if (userName === "jcalan" && password === "12345") {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userName", JSON.stringify(userName));
        navigate("/home");
        setErrorMessage(false);
      } else if (userName === "" || password === "") {
        // Changed the condition here
        setErrorMessage("Please fill in all the details");
        setIsLoggedIn(false);
      } else {
        setErrorMessage("Invalid username or password"); // Changed the error message here
        setIsLoggedIn(false);
      }

      setIsLoginInProgress(false);
    }, 5000);
  };

  if (isLoggedIn) {
    return <Navigate to="/home">Home</Navigate>;
  }

  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmitLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={({ target }) => setUserName(target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* {errorMessage && <p>"Invalid username or password"</p>} */}
      {errorMessage && <p>{errorMessage}</p>}

      {isLoginInProgress && <p>getting you in...</p>}
    </div>
  );
}
