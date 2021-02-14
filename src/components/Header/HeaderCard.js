import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'black',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content} >
        <Typography className={classes.title}>BOOK STORIES</Typography>
      </CardContent>
    </Card>
  );
}
