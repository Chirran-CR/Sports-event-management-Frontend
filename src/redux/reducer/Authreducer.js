let initialState={
    isLoggedIn:false,
}
const  Authreducer=(state=initialState,action)=>{
     switch(action.type){
       case "login":
        localStorage.setItem("designation",action.payload);
             return{
                  isLoggedIn:true
             }
       case "logout":
           localStorage.removeItem("designation");
           return{
               isLoggedIn:false
           }
        default:
            return state;
     }
}

export default Authreducer;