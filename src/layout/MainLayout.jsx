import React from 'react';
import {createStyles} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
  }
});

const MainLayout = ({children, classes}) => {
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};


export default withStyles(styles)(MainLayout);