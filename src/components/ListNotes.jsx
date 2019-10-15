import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import NoteSummary from './NoteSummary';
import { makeStyles } from '@material-ui/core/styles';

const QUERY_NOTES = gql`
  {
    notes {
      id
      text
      title
      date
    }
  }
`;

const useStyles = makeStyles(() => ({
  todos: {
    marginTop: 65
  }
}));

const TodoList = () => {
  const classes = useStyles();
  const { loading, data } = useQuery(QUERY_NOTES);

  if (loading) return <p>Loading ...</p>;

  return (
    <div className={classes.todos}>
      {data.notes.map(note => (
        <NoteSummary note={note} key={note.id} />
      ))}
    </div>
  );
};

export default TodoList;
