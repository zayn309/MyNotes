import React,{useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import SearchBar from '../components/SearchBar'

const NotesListPage = () => {
    let [notes,setNotes] = useState([])
    const [searchWord, setSearchWord] = useState('')

    useEffect(() =>{
        getNotes();
    },[])
    
    const UpdateSearchWord = (Word)=>{
        setSearchWord(Word);
    }

    let getNotes = async() => {
        let respose = await fetch("/api/notes/");
        let data = await respose.json();
        setNotes(data);
    }
    
    const filterNotes = (note)=> {
        if (!searchWord){
            return true;
        }
        else{
            return note.body.toLowerCase().includes(searchWord.toLowerCase());
        }
        
    }

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <SearchBar placeHolder="Search" UpdateSearchWord = {UpdateSearchWord} />

                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className='notes-list'>
                {notes.filter(filterNotes).map((note,index) => {
                    return <ListItem key={index} note={note} />
                })}
            </div>
            <AddButton/>

        </div>
    )
}

export default NotesListPage
