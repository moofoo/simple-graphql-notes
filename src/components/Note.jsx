import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import {
  Button,
  Container,
  TextareaAutosize,
  TextField
} from '@material-ui/core';
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

const REMOVE_NOTE = gql`
  mutation RemoveNote($id: Int!) {
    removeNote(id: $id) {
      id
      title
      text
      date
    }
  }
`;

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 65
  },
  title: {
    width: 500
  },
  content: {
    width: 500
  },
  button: {
    marginTop: 15,
    marginRight: 15
  }
}));

const Note = ({ note, action, onSubmit, history }) => {
  const classes = useStyles();

  const [title, setTitle] = useState(note ? note.title : '');
  const [text, setText] = useState(note ? note.text : '');

  const [removeNote] = useMutation(REMOVE_NOTE, {
    update(cache) {
      const { notes } = cache.readQuery({ query: QUERY_NOTES });

      cache.writeQuery({
        query: QUERY_NOTES,
        data: { notes: notes.filter(nt => nt.id !== note.id) }
      });
    }
  });

  const onRemoveHandler = () => {
    removeNote({ variables: { id: note.id } });
    history.push('/');
  };

  return (
    <Container className={classes.container}>
      <h2>Title</h2>
      <TextField
        className={classes.title}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <h2>Content</h2>
      <TextareaAutosize
        className={classes.content}
        rowsMax={10}
        rows={10}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div>
        <Button
          className={classes.button}
          variant='contained'
          component='div'
          onClick={() => {
            if (action === 'edit') {
              onSubmit(note.id, title, text);
            } else {
              onSubmit(title, text);
            }
          }}
        >
          {action === 'edit' ? 'Update' : 'Add'}
        </Button>
        {action === 'edit' ? (
          <Button
            className={classes.button}
            variant='contained'
            component='div'
            onClick={onRemoveHandler}
          >
            Remove
          </Button>
        ) : null}
      </div>
    </Container>
  );
};

export default withRouter(Note);
