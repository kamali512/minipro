import './App.css';
import axios from 'axios';
import {useState, useEffect} from "react"
function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
   const loadUsers = async()=>{
    const response = await axios.get("https://reqres.in/api/users?page=2");
    setUsers(response.data.data)
   }
   loadUsers()
  }, [])
  const onSuggestion = (text) => {
    setText(text);
    setSuggestions([]);
  }
  const onChangeHandler = (text) =>{
    let matches = []
    if (text.length > 0) {
      matches = users.filter(user =>{
        const regex = new RegExp(`${text}`,"gi");
        return user.email.match(regex)
      })
    }
    console.log(matches);
    setSuggestions(matches)
    setText(text)
  }
  return (
    <div className="container">
     <input type="text" className='col-md-12' style={{marginTop:"10px"}}
     onChange={e => onChangeHandler(e.target.value)}
     value={text}
     onBlur={()=>{
      setTimeout(()=>{
        setSuggestions([])
      }, 100);
     }}/>
     {suggestions && suggestions.map((suggestion, i)=>
     <div key={i} className="col-md-12 suggestion justify-content-md-center"
     onClick={()=>onSuggestion(suggestion.email)}
     >{suggestion.email}</div>
     )}
    </div>
  );
}

export default App;
