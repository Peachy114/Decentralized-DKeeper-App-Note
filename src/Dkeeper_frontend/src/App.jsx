import { Dkeeper_backend } from 'declarations/Dkeeper_backend';
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [addNote, setAddNote] = useState([]);

   function addNotes(newNote) {
    setAddNote(prevNotes => {
      Dkeeper_backend.createNote(newNote.title, newNote.content)
      return [newNote, ...prevNotes];
    });
  };

  useEffect(() => {
    console.log("triggered");
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await Dkeeper_backend.redNotes();
    setAddNote(notesArray)
  };

  function Delete(index) {
    Dkeeper_backend.removeNote(index);
    setAddNote((preValue) => 
      preValue.filter((_, addNote) => addNote !== index));
  };

  return (
    <div>
      <Header />
      <CreateArea addNotes = {addNotes} />

      {/* ++++MAPP THE LIST OF ADDNOTE++++*/}
      {addNote.map((item, index) => (
        <Note
          key={index}
          id={index}
          title={item.title}
          content={item.content}
          delete={() => Delete(index)}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
