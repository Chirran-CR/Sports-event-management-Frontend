import React,{useState,useEffect} from 'react'
import "./Dashboard.css";
import {connect} from "react-redux";
import { getDataFroAdminMiddlewareFn } from '../../redux/middleware/getDataForAdminMIddleware';
import SingleSportModeratorAdd from './SingleSportModeratorAdd';
import axios from "axios";
import { API_URL } from '../../App';

const Dashboard = (props) => {
//   const [eventData,setEventData]=useState([]);
const [totalData,setTotalData]=useState({
	events:"",
	teachers:"",
	participants:"",
	moderators:""
})
const [allEventData,setAllEventData]=useState([]);
const [singleEvent,setSingleEvent]=useState({});
const [singleSportClick,setSingleSportClick]=useState([{}]);//either to show the input form or not
const [clickedSport,setClickedSport]=useState("");//used to add moderator received from parent
  useEffect(()=>{
	
	// const recv=props.getAdminData();
	// console.log("Recv is;",recv);
	(async function (){
		const eventResp=await axios.get(`${API_URL}/event`)
		let allEvents=eventResp.data.allEventsDetails;
        const studentResp=await axios.get(`${API_URL}/student/get`);
		const teacherResp=await axios.get(`${API_URL}/teacher/get`);
		const moderatorResp=await axios.get(`${API_URL}/moderator/get`);
		setTotalData({
			events:allEvents.length,
			participants:studentResp.data.studentDetails.length,
			teachers:teacherResp.data.teachersDetails.length,
			moderators:moderatorResp.data.moderatorDetails.length,
		})
		setAllEventData([...allEvents]);
	})()
		
	// setEventData([...props.adminReducer.allEvents]);
	// setAllEventData([...props.adminReducer.allEvents])
},[])
// console.log("Val of adminDataFromUseEffect in Dashboard is:",props.adminReducer.allEvents);
//   console.log("Val of eventData in Dashboard is:",eventData);
//   let allEventData=props.adminReducer.allEvents;
  console.log("Val of allEventData is:",allEventData);
 function handleSinleEvent(sv){
	console.log("Clicked event is:",sv);
	setSingleEvent({...sv});
 }
 function handleSportClick(idx,sp){
	let indexPresent=false;
	console.log("idx is:",idx);

	setSingleSportClick(singleSportClick?.map((s)=>{
		if(s?.idx==idx){
			s.val=!s.val;
			indexPresent=true;
		}
		return s;
	}))
	if(!indexPresent){
		setSingleSportClick([...singleSportClick,{idx:idx,sport:sp,val:true}])
	}
 }
 async function handleAddModerator(name,email,psd){
		console.log("email is:",email);
		const modifiedEvent=singleEvent.moderators.push({
			sport:clickedSport,
			moderatorDetails:{
				name:name,
				email:email,
				password:psd,
			}
		})
		setSingleSportClick(singleSportClick?.map((sObject)=>{
			if(sObject?.sport==clickedSport){
			sObject.val=!sObject.val;
			}
		}))
		setTotalData({...totalData,moderators:Number(totalData.moderators)+1})
		//    setSingleEvent()
		const updatedAllEventData=allEventData.map((evObj)=>{
			if(evObj.TeacherEmail == singleEvent.TeacherEmail && evObj._id == singleEvent._id){
				evObj.moderators=[...singleEvent.moderators]
			}
			return evObj;
		})
		const sendModeratorEventToBackendResp=await axios.post(`${API_URL}/event/addmoderator`,singleEvent);
		console.log("Val of sendModeratorEventToBackendResp.data is:",sendModeratorEventToBackendResp.data);
		const addModeratorRes=await axios.post(`${API_URL}/moderator/add`,{name:name,email:email,password:psd,singleEvent:singleEvent,sport:clickedSport});
		console.log("Val of addModeratorRes is:",addModeratorRes);
		const addModeratorToUserDB=await axios.post(`${API_URL}/user/add`,{name:name,email:email,designation:"moderator"});
		console.log("Val of addModeratorToUserDB is:",addModeratorToUserDB);

		setAllEventData([...updatedAllEventData]);
		console.log("Val of modified event is:",singleEvent);
		console.log("val of allEvent data is:",allEventData);
 }
 async function handleUpdateModerator(name,email,psd,oldEmail){
	const addModeratorRes=await axios.post(`${API_URL}/moderator/update`,{name:name,email:email,oldEmail:oldEmail,password:psd,singleEvent:singleEvent,sport:clickedSport});
    if(addModeratorRes.data.errorPresent){
		alert("Moderator is already assigned to another sport");
		console.log("Error msg is:",addModeratorRes.data.message);
	}else{
		setSingleEvent({...singleEvent,moderators:singleEvent.moderators.map((scoreObj)=>{
			if(scoreObj.sport==clickedSport){
				scoreObj.moderatorDetails={name:name,email:email,password:psd}
			}
			return scoreObj;
		})})
		const tempSingleEvent={...singleEvent,moderators:singleEvent.moderators.map((scoreObj)=>{
			if(scoreObj.sport==clickedSport){
				scoreObj.moderatorDetails={name:name,email:email,password:psd}
			}
			return scoreObj;
		})};
		console.log("Val of tempSingleEvent inside dashboard of admin:",tempSingleEvent);

		setSingleSportClick(singleSportClick?.map((sObject)=>{
			if(sObject?.sport==clickedSport){
			sObject.val=!sObject.val;
			}
		}))
		// setTotalData({...totalData,moderators:Number(totalData.moderators)+1})
		
		const updatedAllEventData=allEventData.map((evObj)=>{
			if(evObj.TeacherEmail == singleEvent.TeacherEmail && evObj._id == singleEvent._id){
				// evObj.moderators=[...singleEvent.moderators]
				evObj.moderators=[...evObj.moderators.map((modObj)=>{
					if(modObj.sport==clickedSport){
						modObj.moderatorDetails={name:name,email:email,password:psd}
					}
					return modObj;
				})];
			}
			return evObj;
		})
		const sendModeratorEventToBackendResp=await axios.post(`${API_URL}/event/updatemoderator`,{singleEvent:tempSingleEvent});
		console.log("Val of sendModeratorEventToBackendResp.data is:",sendModeratorEventToBackendResp.data);
		console.log("Val of addModeratorRes is:",addModeratorRes);
		//remove the old moderator from user database first then add the new moderator into user db---------
		const removeModeratorFromUserDb=await axios.post(`${API_URL}/user/remove`,{email:oldEmail});
		console.log("Val of removeModeratorFromUserDb is:",removeModeratorFromUserDb);
		const addModeratorToUserDB=await axios.post(`${API_URL}/user/add`,{name:name,email:email,designation:"moderator"});
		console.log("Val of addModeratorToUserDB is:",addModeratorToUserDB);
	
		setAllEventData([...updatedAllEventData]);
		console.log("Val of modified event is:",singleEvent);
		console.log("val of allEvent data is:",allEventData);
	}
}
async function handleRemoveModerator(name,email,psd){
	console.log("handleRemoveModerator is called..");
	//todo- remove from moderator db,user db,and from that event's moderators:moderatorDetails
	const moderatorRes=await axios.post(`${API_URL}/moderator/remove`,{email:email});
	if(moderatorRes.data.errorPresent){
		alert("Moderator is not assigned to any sport")
		console.log("Error in handleRemoveModerator and error is:",moderatorRes.data.message);
	}else{
		const removeFromUserDBRes=await axios.post(`${API_URL}/user/remove`,{email:email});
		console.log("Moderator removed from user db and res is:",removeFromUserDBRes);
	}
	//todo-delete the moderator from event db
	const tempSingleEvent={...singleEvent,moderators:singleEvent.moderators.filter((scoreObj)=>{
		if(scoreObj.sport==clickedSport){
			return false;
		}
		return true;
	})};
	const removeModeratorFromEventDBRes=await axios.post(`${API_URL}/event/removemoderator`,{singleEvent:tempSingleEvent});
	console.log("Val of removeModeratorFromEventDBRes is:",removeModeratorFromEventDBRes);
	
	//todo- all the other update for frontend
	setSingleEvent({...singleEvent,moderators:singleEvent.moderators.filter((scoreObj)=>{
		if(scoreObj.sport==clickedSport){
			return false;
		}
		return true;
	})})
	setSingleSportClick(singleSportClick?.map((sObject)=>{
		if(sObject?.sport==clickedSport){
		sObject.val=!sObject.val;
		}
	}))
	setTotalData({...totalData,moderators:Number(totalData.moderators)-1})
	const updatedAllEventData=allEventData.map((evObj)=>{
		if(evObj.TeacherEmail == singleEvent.TeacherEmail && evObj._id == singleEvent._id ){
			// evObj.moderators=[...singleEvent.moderators]
			evObj.moderators=[...evObj.moderators.filter((modObj)=>{
				if(modObj.sport==clickedSport){
					return false;
				}
				return true;
			})];
		}
		return evObj;
	})
	setAllEventData([...updatedAllEventData]);

}
  return (
    <div>
        {/* <!-- SIDEBAR --> */}
	<section id="sidebar">
		{/* <a href="#" class="brand">
			<i class='bx bxs-smile'></i>
			<span class="text">AdminHub</span>
		</a> */}
		<ul class="side-menu top">
			<li class="active">
				<a href="#" style={{textDecoration:"none"}}>
					{/* <i class='bx bxs-dashboard' ></i> */}
                    <i class='bx bxs-calendar-heart bx-spin'></i>
					<span class="text">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="#" style={{textDecoration:"none"}}>
					<i class='bx bxs-shopping-bag-alt' ></i>
					<span class="text">Events</span>
				</a>
			</li>
			<li>
				<a href="#" style={{textDecoration:"none"}}>
					<i class='bx bxs-user-badge' ></i>
					<span class="text">Teachers</span>
				</a>
			</li>
			<li>
				<a href="#" style={{textDecoration:"none"}}>
					<i class='bx bxs-user-plus' ></i>
					<span class="text">Participants</span>
				</a>
			</li>
			<li>
				<a href="#" style={{textDecoration:"none"}}>
					<i class='bx bxs-group' ></i>
					<span class="text">Moderator</span>
				</a>
			</li>
		</ul>
		{/* <ul class="side-menu">
			<li>
				<a href="#">
					<i class='bx bxs-cog' ></i>
					<span class="text">Settings</span>
				</a>
			</li>
			<li>
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul> */}
	</section>
	{/* <!-- SIDEBAR --> */}



	{/* <!-- CONTENT --> */}
	<section id="content">
		{/* <!-- NAVBAR --> */}
		{/* <nav style={{paddingTop:"6.5rem"}}>
			<i class='bx bx-menu' ></i>
			<a href="#" class="nav-link">Categories</a>
			<form action="#">
				<div class="form-input">
					<input type="search" placeholder="Search..."/>
					<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
				</div>
			</form>
			<input type="checkbox" id="switch-mode" hidden/>
			<label for="switch-mode" class="switch-mode"></label>
			<a href="#" class="notification">
				<i class='bx bxs-bell' ></i>
				<span class="num">8</span>
			</a>
			<a href="#" class="profile">
				<img src="img/people.png"/>
			</a>
		</nav> */}
		{/* <!-- NAVBAR --> */}

		{/* <!-- MAIN --> */}
		<main style={{paddingTop:"5rem"}}>
			{/* <div class="head-title">
				{/* <div class="left">
					<h1>Dashboard</h1>
					<ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li>
					</ul>
				</div> 
				<a href="#" class="btn-download" >
					<i class='bx bxs-cloud-download' ></i>
					<span class="text">Download PDF</span>
				</a>
			</div> */}

			<ul class="box-info">
				<li>
					<i className='bx bxs-calendar-check' ></i>
					<span className="text">
						<h3 style={{color:"white"}}>{totalData.events}</h3>
						<p style={{color:"white"}}>Events</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-group' ></i>
					<span class="text">
						<h3 style={{color:"white"}}>{totalData.participants}</h3>
						<p style={{color:"white"}}>Participants</p>
					</span>
				</li>
				<li>
                    <i class='bx bxs-group' ></i>
					<span class="text">
						<h3 style={{color:"white"}}>{totalData.teachers}</h3>
						<p style={{color:"white"}}>Teachers</p>
					</span>
				</li>
                <li>
                    <i class='bx bxs-group' ></i>
					<span class="text">
						<h3 style={{color:"white"}}>{totalData.moderators}</h3>
						<p style={{color:"white"}}>Moderators</p>
					</span>
				</li>
			</ul>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>All Events</h3>
						<i class='bx bx-search' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<table>
						<thead>
							<tr>
								<th>Event Name</th>
								<th>Hosting Clg</th>
								<th>Uploaded By</th>
								<th>Available Sport</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
						    {allEventData.length>0 ? (allEventData.map((sv,idx)=>{
								let statusCheck=sv.moderators.length == sv.sportsCategory.length ? "completed":"pending"; 
								return(
									<tr key={idx} onClick={()=>{handleSinleEvent(sv)}}>
										<td>
											<img src={`${API_URL}/images/eventPics/${sv.eventBanner}`} />
											<p>{sv.eventName}</p>
										</td>
										<td>{sv.hostingCollege}</td>
										<td>{sv.TeacherEmail}</td>
										<td>{sv.sportsCategory.map((sport)=>{
											return <>{sport}&#44;&nbsp;</>
										})}</td>
										<td><span class={`status ${statusCheck}`} >{statusCheck}</span></td>
									</tr>
								)
							})) :<></>}	
							{/* <tr>
								<td>
									<img src="img/people.png"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status completed">Completed</span></td>
							</tr>
							<tr>
								<td>
									<img src="img/people.png"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									<img src="img/people.png"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status process">Process</span></td>
							</tr>
							<tr>
								<td>
									<img src="img/people.png"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									<img src="img/people.png"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status completed">Completed</span></td>
							</tr> */}
						</tbody>
					</table>
				</div>
				<div class="todo">
					<div class="head">
						<h3>Moderators</h3>
						<i class='bx bx-plus' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<ul class="todo-list">
						{
							singleEvent ? singleEvent?.sportsCategory?.map((s,idx)=>{
							// let statusCheck=singleEvent.moderators.includes(s)? "completed":"not-completed"; 
							let isModPresent = false;
							singleEvent.moderators?.map((modObj)=>{
								if(modObj?.sport == s){ isModPresent=true;}
							})
							let statusCheck=isModPresent? "completed":"not-completed"; 
							return (<>
							<li className={`${statusCheck}`} key={idx} onClick={()=>{setClickedSport(s); handleSportClick(idx,s)}}>
								<p>{s}</p>
								<i class='bx bx-dots-vertical-rounded' ></i>
							</li>
							{singleSportClick?.map((sc,i)=>{ return (sc?.val && sc?.idx==idx ? <SingleSportModeratorAdd classVal={statusCheck} key={idx} handleAddModerator={handleAddModerator} clickedSport={clickedSport} singleEvent={singleEvent} handleRemoveModerator={handleRemoveModerator} handleUpdateModerator={handleUpdateModerator}/>:"")})}
						   </>)
							}):""
						}
						{/* <li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li> */}
					</ul>
				</div>
			</div>
		</main>
		{/* <!-- MAIN --> */}
	</section>
	{/* <!-- CONTENT --> */}
    </div>
  )
}


function mapStateToProps(store) {
	return store;
  }
  const mapDispatchToProps = (dispatch) => {
	return {
	  getAdminData:  () => {dispatch( getDataFroAdminMiddlewareFn());
	  },
	};
  };
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
  