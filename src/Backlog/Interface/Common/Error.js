import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function error() {
    return (
        <div style={{ 'marginTop': "100px" }}>
        <Typography variant="h5" style={{textAlign:"center" }}>Whoops....</Typography>

        <p style={{textAlign:"center"}}>
            Beep boop. We could not find the board you are looking for!
        </p>
    </div>
    )
}
