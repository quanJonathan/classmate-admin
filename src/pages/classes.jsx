import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { ClassCard } from "../sections/classes/class-card";
import { ClassesSearch } from "../sections/classes/classes-search";
import Layout from "../layouts/dashboard/layout";
import useSWR from "swr";
import { Helmet } from "react-helmet";
import Spinner from ".././components/spinner";
import axios from "axios";
import { useState } from "react";
import FormDialog from "../components/FormDialog";

const Page = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR("http://localhost:3001/class/all", fetcher);

  if (error) return <div>{error}</div>;
  console.log(data);

  const submitUrl = "http://localhost:3001/class/addClass";

  const defaultValue = {
    className: "",
    // email, không nhất thiết phải tồn tại
    // Nếu không tồn tại thì sẽ tự động xóa bên backend
    members: [],

    // Như trên
    teachers: [], // email
  };

  const fields = [
    {name: 'className', label: 'Class name (required)', type: 'text', inputType: ''},
    {name: 'members', label: 'Class member(s)', type: 'email', inputType:'textBox'},
    {name: 'teachers', label: 'Class teacher(s)', type: 'email', inputType: 'textBox'}
  ]

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenModal = () => {
    setDialogOpen(true);
  };

  const handleCloseModal = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Helmet>Classes</Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <FormDialog
            defaultValue={defaultValue}
            isOpen={isDialogOpen}
            handleClose={handleCloseModal}
            postUrl={submitUrl}
            fields={fields}
          />
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Classes</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Button
                      color="inherit"
                      startIcon={
                        <SvgIcon fontSize="small">
                          <ArrowUpOnSquareIcon />
                        </SvgIcon>
                      }
                    >
                      Import
                    </Button>
                    <Button
                      color="inherit"
                      startIcon={
                        <SvgIcon fontSize="small">
                          <ArrowDownOnSquareIcon />
                        </SvgIcon>
                      }
                    >
                      Export
                    </Button>
                  </Stack>
                </Stack>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={handleOpenModal}
                  >
                    Add
                  </Button>
                </div>
              </Stack>
              <ClassesSearch />
              <Grid container spacing={3}>
                {data.map((classObject) => (
                  <Grid xs={12} md={6} lg={4} key={classObject.classID}>
                    <ClassCard classObject={classObject} />
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination count={3} size="small" />
              </Box>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Page;
