import React, { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

function Note(props){

  const[editable, setEditable] = useState(false);
  // const [title, setTitle] = useState({
  //     heading: props.title,
  //     content: props.content
  // });
  const [title, setTitle] = useState(props.title)
  const[content, setContent] = useState(props.content)
    
  // Refresh the page 
  function refreshPage() {
     window.location.reload(false);
      
  }
    
  function handleClick(){
    // Delete note with specific id.
    props.onDelete(props.id)

      // Delete the specific note from the database and it will refresh the page.
    deleteItem(props.title);
    refreshPage()
  }
    
  // This function will delete specific note with the entered title.
  function deleteItem(title){
    fetch('https://notes-keeper-server.herokuapp.com/notes/' +title, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'https://notesdata.herokuapp.com/',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type' 
      }
    })

  }

  // This function will update specific note titile and content with the entered title.
  async function update(textInput){

    const data = {
      // titl: title.heading,
      // cont: title.content
      titl: title,
      cont: content
    }
    
    const response = await fetch('https://notes-keeper-server.herokuapp.com/notes/' +textInput, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const updateNote = await response.json();
    console.log(updateNote)
          
  };
        
  //Function to make it editable or not
  function changeEditMode(){
    setEditable(true);
  }

  //This function will trigger the edit button and update note with the new value.
  function editDone() { 
    if(title === ""){
      window.alert("Title can't be empty!")
    } else {
      setEditable(false);
      update(props.title);
      refreshPage()
          
      return( 
        <div className = "note">
          {/* <h1>{title.heading}</h1>
          <p>{title.content}</p> */}
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      )
    }  
        
  }

    
  // function handleChange(event) {
  //   const {name, value} = event.target;
    
  //   if(name === "title"){
  //       setTitle({
  //           heading: value,
  //           content: props.content
  //       })
  //   } else if (name === "content"){
  //       setTitle({
  //           heading: props.title,
  //           content: value
  //       })
  //   }
        
  // }

  // Title event Change handler and set the title with entered value
  function handleChangeTitle(event) {
    const {value} = event.target;
        
    setTitle(value)
  }

  // Content event Change handler and set the content with new value
  function handleChangeContent(event) {
    const {value} = event.target;
 
    setContent(value)
        
  }


  return (
    editable ? 
      <div>
        <form className="note"> 
          <input
           name="title"
           type="text"
          onChange={handleChangeTitle}
          // value={props.title}
          defaultValue ={props.title}
          
          />
       
          <textarea
           name="content"
           type ="text"
          onChange={handleChangeContent}
          // value={props.content}
          defaultValue ={props.content}
          rows="3"
          />  
            
          <button onClick={changeEditMode}> <CloseIcon />
          </button>
          
          <button onClick= {editDone}> <DoneIcon />
          </button>
        </form>
      </div>
      :
      <div className = "note">
        {/* <h1>{title.heading}</h1>
        <p>{title.content}</p> */}
        <h1>{title}</h1>
        <p>{content}</p>
        <button onClick={handleClick}> 
          <DeleteIcon /> 
        </button>

        <button onClick= {changeEditMode}> 
          <EditIcon />
          </button>
      </div>
  );

}

export default Note;