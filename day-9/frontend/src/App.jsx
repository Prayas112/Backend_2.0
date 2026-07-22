
import { useEffect, useState } from 'react';
import axios from 'axios'
const App = () => {

  const [notes, setnotes] = useState([{}]);
  const [update, setupdate] = useState(null);
  const [description, setdescription] = useState("");
  
  

 

  function fetchnotes(){
    axios.get("https://project-timw.onrender.com/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }
 
  useEffect(()=>{
    fetchnotes()
  },[])

  function handlesubmit(e){
     e.preventDefault()
     const {title, description} = e.target.elements
     console.log(title.value, description.value);

     axios
       .post("https://project-timw.onrender.com/api/notes", {
         title: title.value,
         description: description.value,
       })
       .then((res) => {
         console.log(res.data);

         fetchnotes();
       });
     

  }
 
  function handledeletenote(noteid){
    axios
      .delete("https://project-timw.onrender.com/api/notes/" + noteid)
      .then((res) => {
        console.log(res.data);
        fetchnotes();
      });

  }
  
function handleupdatenote(noteid){
  axios
    .patch("https://project-timw.onrender.com/api/notes/" + noteid, {
      description: description,
    })
    .then((res) => {
      console.log(res.data);
      setupdate(null);
      setdescription("");
      fetchnotes();
    });
}
    

 
   
  return (
    <div>
      
      <form className='forms' onSubmit={handlesubmit}>
        <input name="title" type="text" placeholder="enter title" />
        <input name="description" type="text" placeholder="enter description" />
        <button>create</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button className='btn1'
                onClick={() => {
                  handledeletenote(note._id);
                }}
              >
                delete
              </button>
              <button className='btn2'
                onClick={() => {
                  setupdate(note._id);
                  setdescription(note.description);
                }}
              >
                update
              </button>
              {update === note._id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleupdatenote(note._id);
                  }}
                >
               <input type="text"
               value={description}
               onChange={(e)=> setdescription(e.target.value)} />
               <button className='btn3' type='submit'>save</button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default App
