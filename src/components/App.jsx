import React, {
	useState,
	useEffect
} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note"
import CreateArea from "./CreateArea";

function App() {

	const [notes, setNotes] = useState([]);

	// Get all notes from the database when page loads
	useEffect(() => {
		getNotes()
	}, []);


	// Get all notes from the database
	function getNotes() {

		fetch(`https://notes-keeper-server.herokuapp.com/notes`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(data => console.log(setNotes(data)));

	};

	// This will add note item to the notes array
	function addNote(newNote) {
		setNotes((prevNotes) => {
			return [...prevNotes, newNote];
		});
	}

	// This will trigger delete button and delete specific note
	function deleteNote(id) {
		setNotes(prevNotes => {
			return prevNotes.filter((noteItem, index) => {
				return index !== id;
			})
		})
	}

	return ( 
		<div>
			<Header />
			<CreateArea 
			onAdd = {addNote}

			/>
			{
				notes.map((noteItem, index) => {
					return <Note
					key = {index}
					id = {index}
					title = {noteItem.title}
					content = {noteItem.content}
					onDelete = {deleteNote}
					/>
				})
			}
	
			<Footer />
		</div>
	)
}

export default App;