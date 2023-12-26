import {
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Accounts from "./pages/accounts";
import { AuthLayout } from "./layouts/auth/AuthLayout";
import Index from "./pages";
import SignIn from "./pages/auth/sign-in";
import Error from "./pages/404";
import Classes from "./pages/classes";
import Settings from "./pages/settings";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { createTheme } from "./theme";
import { createEmotionCache } from "./utils/create-emotion-cache";
import { AuthConsumer, AuthProvider } from "./contexts/auth-context";
import { useNProgress } from "./hooks/use-nprogress";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CacheProvider } from "@emotion/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "./layouts/dashboard/layout";
import 'simplebar-react/dist/simplebar.min.css';
import ClassEdit from "./pages/class_edit";
import 'react-toastify/dist/ReactToastify.css';


const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <Helmet>
          <title>CLASSMATE ADMIN</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Helmet>
      </HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer theme="colored" position="top-center"></ToastContainer>

          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Index />} />
        <Route path="*" element={<Error />} />
        <Route path="/classes" element={<Classes/>}/>
        <Route path="/classes/edit/:id" element={<ClassEdit/>} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/auth">
        <Route path="login" element={<SignIn />} />
      </Route>
    </Route>
  )
);
