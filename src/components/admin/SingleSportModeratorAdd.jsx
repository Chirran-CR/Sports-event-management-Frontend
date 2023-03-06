import React,{useState} from 'react'

const SingleSportModeratorAdd = (props) => {
    const [enteredMail,setEnteredMail]=useState("");
    const [name,setName]=useState("");
    const [psd,setPsd]=useState("");
//  props.handleAddModerator("this","is");
function handleSubmit(e){
    e.preventDefault();
    props.handleAddModerator(name,enteredMail,psd);
}
  return (
    <div>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
             <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder='emailId' value={enteredMail} onChange={(e)=>setEnteredMail(e.target.value)}/>
            <input type="password" placeholder='Password' vlaue={psd} onChange={(e)=>setPsd(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default SingleSportModeratorAdd