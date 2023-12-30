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
  TablePagination,
  Select, MenuItem,
  FormControl, InputLabel,
  FormHelperText
} from "@mui/material";
import { ClassCard } from "../sections/classes/class-card";
import { ClassesSearch } from "../sections/classes/classes-search";
import Layout from "../layouts/dashboard/layout";
import useSWR from "swr";
import { Helmet } from "react-helmet";
import Spinner from ".././components/spinner";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import FormDialog from "../components/FormDialog";
import { applyPagination } from "../utils/apply-pagination";
import { useAllClasses } from "../hooks/useAllClasses";

const useClasses = (data, page, rowsPerPage, keyword, sort) => {
  //console.log(data);
  keyword = keyword.trim().toLowerCase();
  if (keyword) {
    const data2 = data.filter((user) => user.className.toLowerCase().includes(keyword))
    return useMemo(() => {
      console.log(data2);
      return applyPagination(data2, page, rowsPerPage);
    }, [page, rowsPerPage, data, keyword]);
  }
  return useMemo(() => {
    console.log(data);
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data, keyword]);

};

const Page = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const [visible, setVisible] = useState('normal');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState(0);
  const { dt, isLoading, error } = useAllClasses();

  console.log(dt)

  const data = useClasses(
    sort == 1 ?
      [...dt].sort((a, b) => {
        console.log(a.className)
        return a.className > b.className ? -1 : 1
      })
    : sort == 2 ?
    [...dt].sort((a, b) => {
      return a.className < b.className ? -1 : 1
    })
    : sort == 3 ?
    [...dt].sort((a, b) => {
      return b.members.length - a.members.length
    })
    : sort == 4 ?
    [...dt].sort((a, b) => {
      return a.members.length - b.members.length
    })
    : dt, page, rowsPerPage, searchKeyword);
  console.log(data)

  const onPageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const onRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);


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
    { name: 'className', label: 'Class name (required)', type: 'text', inputType: '' },
    { name: 'members', label: 'Class member(s)', type: 'email', inputType: 'textBox' },
    { name: 'teachers', label: 'Class teacher(s)', type: 'email', inputType: 'textBox' }
  ]

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenModal = () => {
    setDialogOpen(true);
  };

  const handleCloseModal = () => {
    setDialogOpen(false);
  };

  const handleItemChange = (kw) => {
    if (!kw) {
      setVisible(false)
      setRowsPerPage(4);
      setPage(0)
    }
    else {
      console.log(kw);
      setRowsPerPage(1000);
      setPage(0)
      setVisible(true)
    }
    setSort(0)

    setSearchKeyword(kw);

  };

  const handleSortChange = (e) => {
    const mode = e.target.value;
    setSort(mode)
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
                    {/* <Button
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
                    </Button> */}
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
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid xs={9}>
                  <ClassesSearch handleItemChange={handleItemChange} />
                </Grid>
                <Grid xs={3}>

                  <FormControl
                    sx={{
                      width: 200,
                      mt: "7%"

                    }}>
                    <InputLabel id="simple-select-label">No Sorting</InputLabel>
                    <Select
                      sx={{
                        width: 250,
                        height: 50,

                      }}
                      value={sort}
                      onChange={handleSortChange}
                    >
                      <MenuItem value={0}>No Sorting</MenuItem>
                      <MenuItem value={1}>Decreasing Name</MenuItem>
                      <MenuItem value={2}>Increasing Name</MenuItem>
                      <MenuItem value={3}>Decreasing Members</MenuItem>
                      <MenuItem value={4}>Increasing Members</MenuItem>
                    </Select>
                    <FormHelperText>Select a mode</FormHelperText>
                  </FormControl></Grid>
              </Grid>

              <Grid container spacing={3}>
                {data?.map((classObject) => (
                  <Grid xs={12} md={6} key={classObject._id}>
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
                {/* <Pagination count={3} size="small" /> */}
                <TablePagination
                  disabled={rowsPerPage == 1000}
                  component="div"
                  count={!searchKeyword ? dt?.length : data?.length}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange
                  }
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[4, 5, 10, 25, 1000]}
                />
              </Box>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Page;
