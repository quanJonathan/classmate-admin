import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  SvgIcon,
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import { useSelection } from '../../hooks/use-selection';
import { ClockIcon } from '@mui/x-date-pickers';
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import NoSymbolIcon from "@heroicons/react/24/solid/NoSymbolIcon";
import ShieldExclamationIcon from "@heroicons/react/24/solid/ShieldExclamationIcon";
import { userStateEnum } from './userState.enum';
import { useState } from 'react';
import AccountEditFormDialog from '../../components/AccountEditFormDialog';
import axios, { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    accId,
    accEmail,
    onPageChange = () => { },
    onRowsPerPageChange,
    onDeselectAll,
    onSelectAll,
    onSelectOne,
    onDeselectOne,
    selected,
    page = 0,
    rowsPerPage = 0,
    handleBan = () => {},
  } = props;

  const [visible, setVisible] = useState(false);


  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    name = name.toUpperCase()
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  //console.log(`count=${count}`);
  //console.log(items);

  const selectedSome = (selected?.length > 0) && (selected?.length < items?.length);
  const selectedAll = (items?.length > 0) && (selected?.length === items?.length);

  const editUrl = "http://localhost:3001/user/update";

  let defaultValue = {
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

  const [isEditModalOpen, setEditModalOpen] = useState(-1);
  const handleOpenEditModal = (id) => {
    setEditModalOpen(id);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        console.log("select all " + items?.length);
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Student ID
                </TableCell>
                <TableCell>
                  Signed Up
                </TableCell>
                <TableCell>
                  Edit
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, index) => {
                //console.log(customer._id)
                //console.log(selected)
                const isSelected = selected.includes(customer?._id);
                const createdAt = format(new Date(customer?.createdDate), 'dd/MM/yyyy HH:mm:ss');
                //const createdAt = customer?.createdDate;

                return (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer._id);
                          } else {
                            onDeselectOne?.(customer._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar {...stringAvatar(customer ? `${customer.lastName} ${customer.firstName}` : 'Default Name2')}
                        // size="large"
                        // edge="end"
                        // aria-label="account of current user"
                        // aria-controls={menuId}
                        // aria-haspopup="true"
                        // onClick={handleProfileMenuOpen}
                        // color="inherit"
                        >
                          {/* <AccountCircle sx={{ width: "40px", height: "40px" }} /> */}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {/* {customer.name} */}
                          {customer.firstName + " " + customer.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.studentId}
                    </TableCell>

                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell id={customer._id}
                    >
                      <Button
                        color="inherit"
                        id={customer._id}

                        startIcon={
                          <SvgIcon fontSize="small">
                            < PencilSquareIcon />
                          </SvgIcon>
                        }
                        onClick={() => handleOpenEditModal(customer._id)}
                      >


                      </Button>
                      <AccountEditFormDialog
                       id={customer._id}
                        defaultValue={customer}
                        isOpen={isEditModalOpen}
                        handleClose={handleCloseEditModal}
                        postUrl={editUrl}
                        fields={fields}
                      />
                    </TableCell>
                    <TableCell
                    >
                      <Button disableRipple
                        id={customer._id}
                        color="inherit"
                        startIcon={
                          <SvgIcon fontSize="small">
                            {customer.state === userStateEnum.activated ? <CheckIcon /> : customer.state === userStateEnum.notActivated ? <XMarkIcon /> : <NoSymbolIcon />}
                          </SvgIcon>
                        }
                        onClick={() => handleBan(customer._id, customer.state)}
                      >
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography textAlign='center' visibility={selected?.length > 0 ? 'visible' : 'hidden'} variant='body2' marginLeft='2%' fontWeight='600'>Selecting {selected?.length} accounts</Typography>
        {visible && <Typography textAlign='center' variant='body2' marginLeft='2%' fontWeight='600'>Showing {selected?.length} results</Typography>}
        <TablePagination
          disabled={rowsPerPage == 1000}
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={
            onRowsPerPageChange
          }
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 1000]}
        />
      </Stack>

    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
