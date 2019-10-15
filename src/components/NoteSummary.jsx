import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 10,
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    '&:hover': {
      backgroundColor: '#fff6d1'
    }
  },
  title: {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  date: {
    fontStyle: 'italic',
    fontSize: 12
  }
}));

const NoteSummary = props => {
  const classes = useStyles();

  const {
    note: { id, title, date, text },
    history
  } = props;

  return (
    <Container
      className={classes.container}
      onClick={() => history.push(`/edit/${id}`)}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.date}>{moment(date).format('LLL')}</div>
      <div className={classes.text}>{text}</div>
      <Divider />
    </Container>
  );
};

export default withRouter(NoteSummary);
