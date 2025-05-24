import * as React from "react";
import { useOutletContext } from "react-router";

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

import { CustomizedDialogHandler } from '@components/Customization/CustomizedDialog.js';

export const AddRoom = () => {
  const [chatRoom, setChatRoom] = React.useState({
    name: "",
    description: "",
    isPrivate: false,
    password: "",
    inviteLimit: 10, // Default invite limit
  });

  const refModal = useOutletContext<CustomizedDialogHandler>();

  const inviteLimit = 99;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setChatRoom((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setChatRoom((prev) => ({ ...prev, inviteLimit: newValue as number }));
  };

  const handleSubmit = () => {
    console.log("Chat Room Data:", chatRoom);
    refModal.toggleOpen(false);
  };

  return (
    <>
      <DialogContent sx={{
        overflowX: 'hidden'
      }} >
          <Grid container spacing={1}>
            <TextField
                fullWidth
                label="Chat Room Name"
                name="name"
                value={chatRoom.name}
                onChange={handleChange}
                required
            />
            <TextField
                fullWidth
                label="Description"
                name="description"
                value={chatRoom.description}
                onChange={handleChange}
                multiline
                rows={3}
            />            
            <Stack flexGrow={1} spacing={1} >
              <Grid>
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={chatRoom.isPrivate}
                        onChange={handleChange}
                        name="isPrivate"
                      />
                    }
                    label="Private Room"
                />
                {chatRoom.isPrivate && (
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={chatRoom.password}
                      onChange={handleChange}
                      required
                    />
                )}
              </Grid>
              <Grid>
                <Typography>{`Invitation Limit (${chatRoom.inviteLimit} / ${inviteLimit})`}</Typography>
                <Slider
                    value={chatRoom.inviteLimit}
                    onChange={handleSliderChange}
                    name="inviteLimit"
                    min={0}
                    max={inviteLimit}
                    step={1}
                    valueLabelDisplay="auto" />
              </Grid>              
            </Stack>            
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit} >
            Create
          </Button>
          <Button variant="outlined" color="info" onClick={() => {
            refModal.toggleOpen(false);
          }}>
            Cancel
          </Button>
      </DialogActions>
    </>
  );
}

export default AddRoom;