import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const AddPartner = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Typography>
                Add Friends
            </Typography>
            <Button variant="contained">Add</Button>
            <Button variant="contained" 
            onClick={() => {
                navigate('/partner/list', { replace: true });
            }} >Go back</Button>
        </Box>
    );
}

export default AddPartner;