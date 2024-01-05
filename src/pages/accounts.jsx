import { useCallback, useEffect, useMemo, useState } from "react";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ShieldExclamationIcon from "@heroicons/react/24/solid/ShieldExclamationIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { toast } from "react-toastify";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, keyframes } from "@mui/material";
import { useSelection } from "../hooks/use-selection";
import { CustomersTable as AccountsTable } from "../sections/customer/customers-table";
import { AccountsSearch } from "../sections/customer/customers-search";
import { applyPagination } from "../utils/apply-pagination";
import Layout from "../layouts/dashboard/layout";
import useSWR from "swr";
import Spinner from "../components/spinner";
import axios, { HttpStatusCode } from "axios";
import { useUsers } from "../hooks/useAccounts";
import Grid from '@mui/material/Grid'; // Grid version 1
import AccountFormDialog from "../components/AccountFormDialog";
import { userStateEnum } from "../sections/customer/userState.enum";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import ExcelUploadButton from "../components/UploadExcelButton";

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  
     return (
      promiseInProgress && 
      <Spinner/>
    );  
  };


const now = new Date();

// const data = [
//   {
//     id: "5e887ac47eed253091be10cb",
//     address: {
//       city: "Cleveland",
//       country: "USA",
//       state: "Ohio",
//       street: "2849 Fulton Street",
//     },
//     avatar: "/assets/avatars/avatar-carson-darrin.png",
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     email: "carson.darrin@devias.io",
//     name: "Carson Darrin",
//     phone: "304-428-3097",
//   },
//   {
//     id: "5e887b209c28ac3dd97f6db5",
//     address: {
//       city: "Atlanta",
//       country: "USA",
//       state: "Georgia",
//       street: "1865  Pleasant Hill Road",
//     },
//     avatar: "/assets/avatars/avatar-fran-perez.png",
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     email: "fran.perez@devias.io",
//     name: "Fran Perez",
//     phone: "712-351-5711",
//   },
//   {
//     id: "5e887b7602bdbc4dbb234b27",
//     address: {
//       city: "North Canton",
//       country: "USA",
//       state: "Ohio",
//       street: "4894  Lakeland Park Drive",
//     },
//     avatar: "/assets/avatars/avatar-jie-yan-song.png",
//     createdAt: subDays(subHours(now, 4), 2).getTime(),
//     email: "jie.yan.song@devias.io",
//     name: "Jie Yan Song",
//     phone: "770-635-2682",
//   },
//   {
//     id: "5e86809283e28b96d2d38537",
//     address: {
//       city: "Madrid",
//       country: "Spain",
//       name: "Anika Visser",
//       street: "4158  Hedge Street",
//     },
//     avatar: "/assets/avatars/avatar-anika-visser.png",
//     createdAt: subDays(subHours(now, 11), 2).getTime(),
//     email: "anika.visser@devias.io",
//     name: "Anika Visser",
//     phone: "908-691-3242",
//   },
//   {
//     id: "5e86805e2bafd54f66cc95c3",
//     address: {
//       city: "San Diego",
//       country: "USA",
//       state: "California",
//       street: "75247",
//     },
//     avatar: "/assets/avatars/avatar-miron-vitold.png",
//     createdAt: subDays(subHours(now, 7), 3).getTime(),
//     email: "miron.vitold@devias.io",
//     name: "Miron Vitold",
//     phone: "972-333-4106",
//   },
//   {
//     id: "5e887a1fbefd7938eea9c981",
//     address: {
//       city: "Berkeley",
//       country: "USA",
//       state: "California",
//       street: "317 Angus Road",
//     },
//     avatar: "/assets/avatars/avatar-penjani-inyene.png",
//     createdAt: subDays(subHours(now, 5), 4).getTime(),
//     email: "penjani.inyene@devias.io",
//     name: "Penjani Inyene",
//     phone: "858-602-3409",
//   },
//   {
//     id: "5e887d0b3d090c1b8f162003",
//     address: {
//       city: "Carson City",
//       country: "USA",
//       state: "Nevada",
//       street: "2188  Armbrester Drive",
//     },
//     avatar: "/assets/avatars/avatar-omar-darboe.png",
//     createdAt: subDays(subHours(now, 15), 4).getTime(),
//     email: "omar.darobe@devias.io",
//     name: "Omar Darobe",
//     phone: "415-907-2647",
//   },
//   {
//     id: "5e88792be2d4cfb4bf0971d9",
//     address: {
//       city: "Los Angeles",
//       country: "USA",
//       state: "California",
//       street: "1798  Hickory Ridge Drive",
//     },
//     avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
//     createdAt: subDays(subHours(now, 2), 5).getTime(),
//     email: "siegbert.gottfried@devias.io",
//     name: "Siegbert Gottfried",
//     phone: "702-661-1654",
//   },
//   {
//     id: "5e8877da9a65442b11551975",
//     address: {
//       city: "Murray",
//       country: "USA",
//       state: "Utah",
//       street: "3934  Wildrose Lane",
//     },
//     avatar: "/assets/avatars/avatar-iulia-albu.png",
//     createdAt: subDays(subHours(now, 8), 6).getTime(),
//     email: "iulia.albu@devias.io",
//     name: "Iulia Albu",
//     phone: "313-812-8947",
//   },
//   {
//     id: "5e8680e60cba5019c5ca6fda",
//     address: {
//       city: "Salt Lake City",
//       country: "USA",
//       state: "Utah",
//       street: "368 Lamberts Branch Road",
//     },
//     avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
//     createdAt: subDays(subHours(now, 1), 9).getTime(),
//     email: "nasimiyu.danai@devias.io",
//     name: "Nasimiyu Danai",
//     phone: "801-301-7894",
//   },
// ];

const useAccounts = (data, page, rowsPerPage, keyword) => {
  //console.log(data);
  keyword = keyword.trim().toLowerCase();
  if (keyword) {
    const data2 = data.filter((user) => user.lastName.toLowerCase().includes(keyword) || user.firstName.toLowerCase().includes(keyword))
    return useMemo(() => {
      console.log(data2);
      return applyPagination(data2, page, rowsPerPage);
    }, [page, rowsPerPage, data2, keyword]);
  }
  return useMemo(() => {
    //console.log(data);
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data, keyword]);
};

const useAccountIds = (acc) => {
  if (!acc) acc = [];
  //console.log(acc);
  return useMemo(() => {
    //console.log(acc.length);
    return acc.map((acc) => acc._id);
  }, [acc]);
};

const useAccountEmails = (acc) => {
  if (!acc) acc = [];
  //console.log(acc);
  return useMemo(() => {
    //console.log(acc.length);
    return acc.map((acc) => acc.email);
  }, [acc]);
};

const Accounts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchKeyword, setSearchKeyword] = useState('');

  const { users, isLoading, isError } = useUsers();

  const acc = useAccounts(users, page, rowsPerPage, searchKeyword);
  const AccountsIds = useAccountIds(acc);
  const AccountsEmails = useAccountEmails(acc);
  //const AccountsSelection = useSelection(AccountsIds);
  const accSelect = useSelection(AccountsIds);
  const onDeselectAll = accSelect.handleDeselectAll;
  const onDeselectOne = accSelect.handleDeselectOne;
  const onSelectAll = accSelect.handleSelectAll;
  const onSelectOne = accSelect.handleSelectOne;
  const selected = accSelect.selected;

  //console.log(isLoading);
  //console.log(AccountsIds);

  const submitUrl = "http://localhost:3001/user/addAccount";
  const banUrl = "http://localhost:3001/user/ban";
  const removeUrl = "http://localhost:3001/user/remove";

  const defaultValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "",
    provider: "",
    address: "",
    phoneNumber: "",
    photo: "",
    state: null,
    studentId: ''
  };

  const fields = [
    { name: 'className', label: 'Class name (required)', type: 'text', inputType: '' },
    { name: 'members', label: 'Class member(s)', type: 'email', inputType: 'textBox' },
    { name: 'teachers', label: 'Class teacher(s)', type: 'email', inputType: 'textBox' }
  ]

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

    
  const handleRemoveMany = async () => {
    const ids = []
    selected.forEach(element => {
      const found = users.find(user => {return user._id === element})
      //console.log(found)
      ids.push(found._id)
      let id = found._id;
      console.log('Form submitted:', id);
      
      axios.post(removeUrl, {'id': id}).then((res) => {
        if (res.status === HttpStatusCode.Ok)
          toast.success('Remove ' + found.email + ' successfully!')
        else
          toast.error('Cannot remove!')
      })
    });
    console.log(ids);
    onDeselectAll?.()
  };

  const handleBanMany = async () => {
    const ids = []
    selected.forEach(email => {
      const found = users.find(user => {return user._id === email})
      //console.log(found)
      ids.push(found.state)
      let state = found.state;
      console.log('Form submitted:', state);

      let curUser = {
        firstName: "",
        lastName: "",
        email: email,
        password: "",
        roles: "",
        provider: "",
        address: "",
        phoneNumber: "",
        photo: "",
        state: state,
      };
      
      axios.post(banUrl, curUser).then((res) => {
        if (res.status === HttpStatusCode.Ok)
          toast.success((curUser.state === userStateEnum.banned ? 'Unbanned ' : 'Banned ') + (found.email ? found.email : found.studentId) + ' successfully!')
        else
          toast.error('Cannot ban!')
      }).catch((e) => {
        toast.error('Cannot ban! ' + e.message)
  
      })
    });
    console.log(ids);
  };

  const handleBan = async (email, state) => {
    let curUser = {
      firstName: "",
      lastName: "",
      email: email,
      password: "",
      roles: "",
      provider: "",
      address: "",
      phoneNumber: "",
      photo: "",
      state: state,
    };
    console.log('Form submitted:', curUser);
    if (!curUser.email) {
      toast.error('Check for missing infos')
      console.error('Check for missing infos');
      return;
    }
    await axios.post(banUrl, curUser).then((res) => {
      if (res.status === HttpStatusCode.Ok)
        toast.success((curUser.state === userStateEnum.banned ? 'Unbanned ' : 'Banned ') + curUser.email + ' successfully!')
      else
        toast.error('Cannot ban!')
    }).catch((e) => {
      toast.error('Cannot ban! ' + e.message)

    })
  };

  const handleItemChange = (kw) => {
    if (!kw) {
      setRowsPerPage(5);
      setPage(0)
    }
    else {
    console.log(kw);
    setRowsPerPage(1000);
    setPage(0)
    }
    setSearchKeyword(kw);

  };

  const handleUpload = async (data) => {
    // Handle the uploaded data as needed
    // console.log("Uploaded Excel Data:", data);
    if (!data) {
      console.log("wrong")
      toast.error("Wrong file format")
      return;
    }
    data.forEach((row, rowIndex) => {
      console.log(row)
      if (row != null && rowIndex > 1) {
        let formData = {
          firstName: "",
          lastName: "",
          email: row[1],
          password: "",
          roles: "",
          provider: "",
          address: "",
          phoneNumber: "",
          photo: "",
          state: null,
          studentId: row[2]
        };
        console.log(row[2])
        axios.post("http://localhost:3001/user/mapIdWithEmail", formData)
        .then((res) => {
          console.log(res)
          if (res.status === HttpStatusCode.Ok)
            toast.success('Map successfully: ' + row[1] + " to " + row[2]);
          else {
            toast.error('Error')
          }
        })
        .catch((e) => {
          toast.error('Map unsucessfully: ' + row[1] + " to " + row[2])
        });
      }
    });

    // console.log("adding");
    // console.log(students);

    
  };


  return (
    <>
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
          <LoadingIndicator/>
          <AccountFormDialog
            defaultValue={defaultValue}
            isOpen={isModalOpen}
            handleClose={handleCloseModal}
            postUrl={submitUrl}
            fields={fields}
          />
          
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Accounts</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <ExcelUploadButton onUpload={handleUpload}></ExcelUploadButton>
                    
                    {/* <Button
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
                {/* <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </div> */}
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
                <AccountsSearch handleItemChange={handleItemChange}/>
                <Stack direction="row" spacing={1} paddingY='2%'>
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
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        < TrashIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={handleRemoveMany}
                  >
                    Delete
                  </Button>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ShieldExclamationIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={handleBanMany}
                  >
                    Ban/Unban
                  </Button>

                </Stack>
              </Stack>
              <AccountsTable
                count={!searchKeyword ? users?.length : acc?.length}
                items={acc}
                accId={AccountsIds}
                accEmail={AccountsEmails}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onDeselectAll={onDeselectAll}
                onSelectAll={onSelectAll}
                onSelectOne={onSelectOne}
                onDeselectOne={onDeselectOne}
                selected={selected}
                page={page}
                rowsPerPage={rowsPerPage}
                handleBan={handleBan}
              />
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Accounts;
