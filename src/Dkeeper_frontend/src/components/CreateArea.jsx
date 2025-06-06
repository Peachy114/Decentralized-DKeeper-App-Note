import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea({ addNotes }) {
  const [isClick, setIsClick] = useState(false);

  const [notes, setNote] = useState({
    title: "",
    content: "",
  });

  function Open() {
    setIsClick(true);
  }

  function titleTextChange(event) {
    const { name, value } = event.target;

    setNote((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleClick(event) {
    event.preventDefault();
    if (notes.title === "" && notes.content === "") return;
    if (notes.title !== "" && notes.content === "") return;

    const newNote  = {
      ...notes,
      id: Date.now(),
    };

    //setAddNote((prevValue) => [...prevValue, addId]);
    addNotes(newNote);
    setNote({
      title: "",
      content: "",
    });
    setIsClick(false);
  }

  return (
    <div>
      <form className="create-note">
        {isClick && (
          <input
            onChange={titleTextChange}
            value={notes.title}
            name="title"
            placeholder="Title"
          />
        )}
        <textarea
          onClick={Open}
          onChange={titleTextChange}
          value={notes.content}
          name="content"
          placeholder="Take a note..."
          rows={isClick ? 3 : 1}
        />
        <Zoom in={isClick}>
          <Fab onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
