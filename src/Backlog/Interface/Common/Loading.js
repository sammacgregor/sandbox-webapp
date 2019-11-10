import React from 'react';
import Typography from '@material-ui/core/Typography';
import LoadingBar from './LoadingBar';





export default function loading() {
    // const classes = useStyles();

    return (
        <div>
            <Typography variant="h6" style={{ textAlign: "center", marginBottom: '20px' }}>Loading ...</Typography>
            
            <LoadingBar />

        </div>
    )
}
