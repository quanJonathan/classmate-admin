import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "../../src/sections/settings/settings-notifications";
import { SettingsPassword } from "../../src/sections/settings/settings-password";
import Layout from "../layouts/dashboard/layout";
import { Helmet } from "react-helmet";

const Page = () => (
  <>
    <Helmet>
      <title>Settings</title>
    </Helmet>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Settings</Typography>
          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

export default Page;
