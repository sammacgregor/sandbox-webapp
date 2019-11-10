import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SprintModal from '../Sprint/SprintModal';
import DeleteBoardModal from './DeleteBoardModal';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    float:"right"
  },
  input: {
    display: 'none',
  },
}));
export default function BoardOptions(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Grid container spacing={3} justify="flex-end">
          <Grid item>
            <SprintModal board={props.board} addSprint={props.addSprint} className={classes.button} />

          </Grid>
          <Grid item>
            <DeleteBoardModal deleteBoard={props.deleteBoard} className={classes.button} />

          </Grid>
        </Grid>

      </div>

    </div>
  );
}
