import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const AccountsSearch = ({handleItemChange}) => {
  const handleInputChange = (e) => {
    const keyword = e.target.value;

    handleItemChange(keyword);
  };
  return (
  <Card sx={{ p: 2, width: {md: "200%"}}}>
    <OutlinedInput
      defaultValue=""
      onChange={handleInputChange}
      fullWidth
      placeholder="Search customer"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
    />
  </Card>
)};
