import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


export default
function promiseNoData(p){
    if (!p.promise && !p.data && !p.error){return <div>no data</div>}
    if (p.promise && !p.data && !p.error) {return (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
        </Stack>
    );}
    if (p.promise && !p.data && p.error) {return <div>{p.error}</div>}
    if (p.promise && p.data && !p.error) {return false}
}