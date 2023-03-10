import React,{useEffect, useState} from 'react'

const SingleSportModeratorAdd = (props) => {
    const [enteredMail,setEnteredMail]=useState("");
    const [name,setName]=useState("");
    const [psd,setPsd]=useState("");
    const [showUpdateBtn,setShowUpdateBtn]=useState(false);
    const [oldEmail,setOldEmail]=useState("");  

//  props.handleAddModerator("this","is");
    useEffect(()=>{
      console.log("Val of singleEvent inside useEffect of singleSportModeratorAdd is:",props.singleEvent);
      props?.singleEvent?.moderators?.map((modObj)=>{
          if(modObj.sport == props?.clickedSport){
            setEnteredMail(modObj.moderatorDetails.email);
            setName(modObj.moderatorDetails.name);
            setPsd(modObj.moderatorDetails.password);
            setShowUpdateBtn(true);
            setOldEmail(modObj.moderatorDetails.email);
          }
      })
    },[])
    function handleSubmit(e){
        e.preventDefault();
        props.handleAddModerator(name,enteredMail,psd);
    }
    function handleUpdate(){
      props.handleUpdateModerator(name,enteredMail,psd,oldEmail);
    }
    function handleRemove(){
      props.handleRemoveModerator(name,enteredMail,psd);
    }
    return (
      <div>
          <form onSubmit={(e)=>{handleSubmit(e)}}>
              <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
              <input type="text" placeholder='emailId' value={enteredMail} onChange={(e)=>setEnteredMail(e.target.value)}/>
              <input type="password" placeholder='Password' vlaue={psd} onChange={(e)=>setPsd(e.target.value)}/>
             {showUpdateBtn? (<><button type="button" onClick={()=>{handleUpdate()}}>Update</button>
                              <button type="button" onClick={()=>{handleRemove()}}>Remove</button></>
             ):<button type="submit">Add</button>}  
          </form>
      </div>
    )
}

export default SingleSportModeratorAdd