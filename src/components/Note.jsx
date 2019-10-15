import React, { useState } from 'react';
import {
  Button,
  Container,
  TextareaAutosize,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    marginTop: 15
  }
}));

const Note = ({ note, action, onSubmit }) => {
  const classes = useStyles();

  const [title, setTitle] = useState(note ? note.title : '');
  const [text, setText] = useState(note ? note.text : '');

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
      </div>
    </Container>
  );
};

export default Note;
