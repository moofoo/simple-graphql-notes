import React from 'react';

import { useQuery, useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
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

const QUERY_NOTE = gql`
  query Note($id: Int!) {
    note(id: $id) {
      id
      text
      title
      date
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: Int!, $title: String!, $text: String!) {
    updateNote(id: $id, title: $title, text: $text) {
      id
      title
      text
      date
    }
  }
`;

const EditNote = props => {
  let { id } = useParams();

  const { loading, data } = useQuery(QUERY_NOTE, {
    variables: { id: Number(id) }
  });

  const [updateNote] = useMutation(UPDATE_NOTE);

  const onSubmitUpdate = (id, title, text) => {
    updateNote({ variables: { id, title, text } });
    props.history.push('/');
  };

  if (loading) return null;

  return <Note note={data.note} action='edit' onSubmit={onSubmitUpdate} />;
};

export default EditNote;
