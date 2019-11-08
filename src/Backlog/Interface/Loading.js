import React from 'react';
import Typography from '@material-ui/core/Typography';
import LoadingBar from '../Interface/LoadingBar';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
      },
    loadingBar: {
      marginTop: theme.spacing(2)
    }
  }));

export default function loading() {
    // const classes = useStyles();

    return (
        <div style={{ 'marginTop': "100px" }}>
            <Typography variant="h5" style={{ textAlign: "center", marginBottom: '20px' }}>Loading ...</Typography>
            
            <LoadingBar />

        </div>
    )
}
