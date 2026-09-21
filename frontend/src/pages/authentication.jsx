import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Authcontext } from "../contexts/Authcontext";
import { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import backgroundImage from "../utils/authy.jpg";
import LockPersonIcon from "@mui/icons-material/LockPerson";
const defaultTheme = createTheme();

export default function Authentication() {
  let [formState, setFormState] = useState(0);
  let [name, setName] = useState();
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [open, setOpen] = useState(false);
  let [error, setError] = useState();
  let [message, setmessage] = useState();

  const { handleLogin, handleRegister } = useContext(Authcontext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        //login
        let result = await handleLogin(username, password);
        setmessage(result);
        console.log(result);
        setOpen(true);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setmessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
      }
    } catch (error) {
      console.log("Backend response:", error.response?.data);

      setmessage(error.response?.data?.message || "Something went wrong");

      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          position: "relative",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "420px",
            maxWidth: "90%",
            borderRadius: 1,
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            minHeight: "90%",
          }}
        >
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: " #1de9b6",
              }}
            >
              <LockPersonIcon style={{ color: "black" }} />
            </Avatar>
            <br />

            <div>
              <Button
                variant={formState === 0 ? "contained" : ""}
                onClick={() => setFormState(0)}
                color="warning"
              >
                LOGIN
              </Button>

              <Button
                variant={formState === 1 ? "contained" : ""}
                onClick={() => setFormState(1)}
                color="warning"
              >
                SIGNUP
              </Button>
            </div>

            <Box
              component="form"
              noValidate
              sx={{
                mt: 1,
                width: "100%",
              }}
            >
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.3,
                }}
                style={{ backgroundColor: "#1c54b2" }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </ThemeProvider>
  );
}
