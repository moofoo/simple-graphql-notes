let notes = [];

let id = 1;

const resolvers = {
  Query: {
    notes: () => notes,
    note: (root, { id }) => {
      return notes.find(note => note.id === id);
    }
  },
  Mutation: {
    addNote(root, { text, title }) {
      const newNote = {
        id,
        text,
        title,
        date: new Date().toString()
      };

      notes.push(newNote);

      id++;

      return newNote;
    },
    updateNote(root, { id, text, title }) {
      let updatedNote = {};
      notes = notes.map(note => {
        if (note.id !== id) {
          return note;
        }

        updatedNote = {
          ...note,
          text,
          title,
          date: new Date().toString()
        };

        return updatedNote;
      });

      return updatedNote;
    },

    removeNote(root, { id }) {
      const removedNote = notes.filter(note => note.id === id);

      notes = notes.filter(note => note.id !== id);

      return removedNote;
    }
  }
};

module.exports = resolvers;
