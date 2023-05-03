import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [note, setNote] = useState(null);
  const [modified,setModified] =useState(false)
  
  useEffect(() => { 
    getNote();
  }, []);

  const getNote = async () => {
    if(id === 'new') return;
    const response = await fetch(`/api/notes/${id}`);
    const data = await response.json();
    setNote(data);
  };
  
  const deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    history("/");
  };

  let handleSubmit = () => {
    if (id==='new' && note === null) {
      history("/");
    }
    else{
      if (modified && note.body && id !== 'new') {
        updateNote();
      } 
      else if(modified && !note.body){
        deleteNote()
      }
      else if(id === 'new' && note.body){
        createNote()
      }
      history("/");
    }
  };

  const createNote = async () => {
    console.log(note);
    const createResponse = await fetch(`/api/note/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      
    });
    console.log(createResponse);
    if (createResponse.ok) {
      history("/");
    }
  };
  

  const updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };
  
  return (
    <div className="note">
      
            <div className="note-header">
                <h3>
                    
                    <ArrowLeft onClick={handleSubmit} />

                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
          setModified(true);
        }}
        placeholder="Write note..."
        value={note ? note.body : ""}
      ></textarea>
    </div>
  );
};

export default NotePage;
