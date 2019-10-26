import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 0, 
  },
});

export default function LetterAvatars() {
  const classes = useStyles();

    return (
      <Avatar className={classes.avatar}>{this.props.label}</Avatar>
  );
}