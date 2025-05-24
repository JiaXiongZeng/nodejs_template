import { useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useSecondaryAppBar, SecAppBarMiddleBlock } from '@components/Customization/SecondaryAppBar.js';
import { MultipleSelectAutoComplete } from '@components/Customization/MultipleSelectAutoComplete.js';
import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';
import { IconProxy } from '@components/Customization/IconProxy.js';
import { NumberInput } from '@components/Customization/NumberInput.js'

interface Fruit {
  optionName: string,
  isOthers?: boolean
};

const initialOptions: Fruit[] = [
  { optionName: 'Apple' },
  { optionName: 'Banana' },
  { optionName: 'Cherry' },
];

const testOptoins = [
  { id: 1, desc: "Hello World" },
  { id: 2, desc: "Hi there~" },
  { id: 3, desc: "Test", others: false }
]

export const SettingsManage = () => {
  const refAutoComplete = useRef<HTMLDivElement>(null);
  const { SecondaryAppBar } = useSecondaryAppBar();

  return (
      <Box sx={{ mt: -3, pb: 7 }}>
        <SecondaryAppBar title="Settings">
          {(_ctxt) => (
            <>
              <SecAppBarMiddleBlock>
                <SearchInputAutoComplete
                    open = {false}
                    options={[]}
                    placeholder="Settings terms"
                />
              </SecAppBarMiddleBlock>
            </>
          )}
        </SecondaryAppBar>
        <Box sx={{ pt: '3em' }}>
          <Accordion variant="outlined" defaultExpanded disableGutters 
            sx={theme => ({
              ml: -1,
              '& .MuiAccordionSummary-content': {
                justifyContent:"start",
                [theme.breakpoints.down('sm')]: {
                  justifyContent:"center"
                }
              }              
            })}>
              <AccordionSummary
                expandIcon={<IconProxy iconName="Expand" />}
                sx={{
                  backgroundColor: theme => theme.palette.primary.main,
                  color: '#fff',
                  fontWeight: 1.5
                }}>
                  <Typography variant="subtitle1">Chat Room Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="form">
                  {/* Section 1 */}                  
                  <Grid container spacing={1}>
                    <Grid size={12}>
                      <Typography variant="subtitle1" gutterBottom >
                        Topics
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <MultipleSelectAutoComplete 
                        inputRef={refAutoComplete} 
                        initialOptions={initialOptions} 
                        othersSuffix=" *"
                        fullWidth
                        inputLabel='Prefer ones'
                        inputPlaceholder='Items...'
                        nameKey="optionName" 
                        isOthersFlagKey="isOthers" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <MultipleSelectAutoComplete 
                          inputRef={refAutoComplete} 
                          initialOptions={testOptoins} 
                          //othersSuffix=" (Custom)"
                          othersSx={{
                            backgroundColor: theme => theme.palette.error.light,
                          }}
                          fullWidth
                          inputLabel='Forbidden ones'
                          inputPlaceholder='Items...'
                          nameKey="desc" 
                          isOthersFlagKey="others" />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  {/* Section 2 */}                  
                  <Grid container spacing={1}>
                    <Grid size={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Action Rules
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Confirm before join chat room" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Automatically backup chatting records" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Save records locally" />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  {/* Section 3 */}
                  <Grid container spacing={1}>
                    <Grid size={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Room Creation
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <NumberInput min={1} max={105} defaultValue={50} inputPlaceholder="Max People" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Is Private" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <TextField size="small" type="password" label="Default password" />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  {/* Section 4 */}
                  <Grid container spacing={1}>
                    <Grid size={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Multimedia
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Upload files" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Post links" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Share from" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Share to" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Screenshot" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Copy & paste" />
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>              
          </Accordion>
          <Accordion variant="outlined" defaultExpanded disableGutters
            sx={theme => ({
              ml: -1,
              '& .MuiAccordionSummary-content': {
                justifyContent:"start",
                [theme.breakpoints.down('sm')]: {
                  justifyContent:"center"
                }
              }              
            })}>
              <AccordionSummary
                expandIcon={<IconProxy iconName="Expand" />}
                sx={{
                  backgroundColor: theme => theme.palette.primary.main,
                  color: '#fff',
                  fontWeight: 1.5
                }}>
                  <Typography variant="subtitle1">User Profiles</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="form">
                  {/* Section 1 */}                  
                  <Grid container spacing={1}>
                    <Grid size={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Privacy
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Show introduction" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Show email" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Show phone" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Show blog" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Show interesting" />
                    </Grid>
                  </Grid>                  
                </Box>
              </AccordionDetails>
          </Accordion>
        </Box>
      </Box>   
  )
}