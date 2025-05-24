import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useCheckLogin } from '@components/Queries/Authentication.js';
import { UserReducerContext, UserContextActionType } from '@components/Contexts/UserContext.js';
import { IconProxy } from '@components/Customization/IconProxy.js';
import { useQueuedAlert } from '@components/Contexts/QueuedAlertContext.js';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [_open, setOpen] = useState(false);
  const navigate = useNavigate();
  const disptachUserContext = useContext(UserReducerContext);
  const { state } = useLocation();
  const alertMgr = useQueuedAlert();
  const { mutateAsync: sendLoginCredential, isPending } = useCheckLogin({
    onSuccess: (respData) => {
      if(respData?.success){
        disptachUserContext!({
          type: UserContextActionType.SET,
          data: respData.data,
          onChanged: () => {
            navigate("/", { replace: true });
          }
        });
      } else {
        alertMgr.pushAlert("error", respData?.error?.message);
      }
    },
    onError: (error) => {
      alertMgr.pushAlert("error", error.message);
    }
  });

  useEffect(() => {
    const { error_code, error_message } = state || {};
    if(error_code || error_message){
      alertMgr.pushAlert("error", `${(error_code? `(${error_code}) `: "")}${(error_message? error_message: "")}`);
    }
  }, [state]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <IconProxy iconName="Invisible" /> : <IconProxy iconName="Visible" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />            
            <Button
              fullWidth
              variant="contained"
              onClick={async () => {
                if(validateInputs()) {
                  const email = document.getElementById('email') as HTMLInputElement;
                  const password = document.getElementById('password') as HTMLInputElement;
                  await sendLoginCredential({
                    Id: email.value,
                    Password: password.value
                  });
                }
              }}
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isPending}
      >
        <CircularProgress color="inherit" />
        <Typography sx={{ml: 1}}>Loading</Typography>
      </Backdrop>
    </>
  );
}

export default Login;