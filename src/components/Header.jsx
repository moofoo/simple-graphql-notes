import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
  addButton: {
    position: 'absolute',
    right: 10
  }
}));

const Header = ({ history }) => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>Notes</Typography>
        <Button
          size='small'
          className={classes.addButton}
          onClick={() => history.push('/add')}
          variant='contained'
          color='default'
          startIcon={<AddIcon />}
        >
          Add Note
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
