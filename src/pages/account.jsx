import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Stack, Typography } from '@mui/material';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => (
  <>
    <Helmet>
      <title>Account | Devias Kit</title>
    </Helmet>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 3, md: 0 }}
            >
              <AccountProfile />
              <AccountProfileDetails />
            </Stack>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
