import React from 'react';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import Note from './Note';

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

const ADD_NOTE = gql`
  mutation AddNote($title: String!, $text: String!) {
    addNote(title: $title, text: $text) {
      id
      title
      text
      date
    }
  }
`;

const AddNote = props => {
  const [addNote] = useMutation(ADD_NOTE, {
    update(
      cache,
      {
        data: { addNote }
      }
    ) {
      const { notes } = cache.readQuery({ query: QUERY_NOTES });

      cache.writeQuery({
        query: QUERY_NOTES,
        data: { notes: notes.concat([addNote]) }
      });
    }
  });

  const onSubmitAdd = (title, text) => {
    addNote({ variables: { title, text } });
    props.history.push('/');
  };

  return <Note onSubmit={onSubmitAdd} />;
};

export default AddNote;
