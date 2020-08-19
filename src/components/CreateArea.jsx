import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';

function CreateArea(props) {

  const [isExpended, setExpanded] = useState(false)
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
     
    });
  }

  // This will trigger submit note
  function submitNote(event) {
    event.preventDefault();

    if(note.title === ""){
      window.alert("Please Enter Title")
    } else {
      //Add note on the list
      props.onAdd(note);
      //This will save note in the database
      saveNoteDB();
    }
    // Set Note empty after submitting the note.
    setNote({
      title: "",
      content: ""
    })
    
  };

  //RESTful API that will save note data in the database
  async function saveNoteDB(){
    const data = {
      titl: note.title,
      cont: note.content
    }
    // console.log(data);

  
    // Client Send the reequest to Server localhost:5000 as a JSON object
    const rawResponse = await fetch('https://notes-keeper-server.herokuapp.com/notes', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }, 
       body: JSON.stringify(data)
  });
   // Client get the response from Server, upon successful user will get successsful message on the console.
  const content = await rawResponse.json();
  console.log(content)
    
  };
  // This function will expand the text area
  function expand(){
    setExpanded(true);
  };



  return (
    <div>
      <form className="create-note">
        
        {isExpended ?
          <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          
          /> 
        : null}

        <textarea id="myTextArea"
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note . . ."
          rows= {isExpended ? "3" : "1"}
         
        />
        
        {isExpended ?
          <button onClick={submitNote} > <AddIcon /></button>
        : null}

      </form>
    </div>
  );
}

export default CreateArea;
