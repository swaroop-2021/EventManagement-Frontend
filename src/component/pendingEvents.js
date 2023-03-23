import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../services/auth.service';
// import {withRouter} from 'react-router-dom'

function PendingEvents(){
    const navigate=useNavigate();
    
    const [pendingEvents,setPendingEvents]=useState([]);
    const [pendingEventsFlag,setPendingEventsFlag]=useState(false);

    useEffect(()=>{
        fetch("http://"+process.env.REACT_APP_API_URL + 'getPendingEvents/',{
            method:"post",   
        }).then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data.data[0].fromDateTime);
            if(data.message==="Success"){
                console.log(data);
                if(data.data.length>0){
                    setPendingEventsFlag(true);
                    console.log(...data.data);
                    data.data[0].fromDateTime=new Date(data.data[0].fromDateTime);
                    data.data[0].toDateTime=new Date(data.data[0].toDateTime);
                    setPendingEvents( [...pendingEvents,...data.data] );
                    
                }
                else{
                    setPendingEventsFlag(false);
                }
            }
        })
    },[]);

    const rejectEvent=(id,email)=>{
        fetch("http://"+process.env.REACT_APP_API_URL + "eventDelete",
            {
                method:"POST",
                body:JSON.stringify({id:id,email:email}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }
            })
            .then(res=>{return res.json()})
            .then(data=>{
                console.log(data);
                alert("Rejected Successfully");
                navigate("/events");
            })
            .catch(err=>console.log(err));
    }

    const acceptEvent=(id,email)=>{
        console.log(authService.getCurrentUser().email);
        fetch("http://"+process.env.REACT_APP_API_URL + "acceptEvent",{
            method:"POST",
            body:JSON.stringify({eventId:id,email:email}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }).then(res=> {return res.json()})
        .then(data=>{
            console.log(data.message);
            if(data.message==="Accepted"){
                alert(data.message);
            }
            else{
                alert(data.error);
            }
        })
        .catch(err=>console.log(err));
    }
    
    return(
        <div className='container'>
            {pendingEventsFlag?  (pendingEvents.map(((eventValues)=>(

                <div>
                    <br />
                    <h1 style={{textAlign:"center"}}>{eventValues.eventName}</h1>
                    
                    <p><h5><strong> Description</strong></h5>{eventValues.eventDescription}</p>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <img style={{maxWidth:"500px",maxHeight:"500px"}} src={`${eventValues.image}`} alt={`${eventValues.eventName}`} />
                    </div>
                    <p><h5><strong>Organized By</strong></h5>{eventValues.organizerName} </p>
                    <p><h5><strong>Venue</strong> </h5>{eventValues.venue}  </p>
                    <p><h5><strong>Date</strong></h5>{eventValues.fromDateTime.getDate()===eventValues.toDateTime.getDate() ? `${eventValues.fromDateTime.getDate()}-${eventValues.fromDateTime.getMonth()}-${eventValues.fromDateTime.getFullYear()}` : `${eventValues.fromDateTime.getDate()}-${eventValues.fromDateTime.getMonth()}-${eventValues.fromDateTime.getFullYear()} To ${eventValues.toDateTime.getDate()}-${eventValues.toDateTime.getMonth()}-${eventValues.toDateTime.getFullYear()}`} </p>
                    <p><h5><strong>Timings</strong></h5> {eventValues.fromDateTime.getHours().toString().length!==2 ? "0"+eventValues.fromDateTime.getHours():eventValues.fromDateTime.getHours()}
                        :{eventValues.fromDateTime.getMinutes().toString().length!==2 ? "0"+eventValues.fromDateTime.getMinutes():eventValues.fromDateTime.getMinutes()}
                        
                        {eventValues.fromDateTime.getHours()>=12 ?"PM":"AM"} {"To "}  
                        
                        {eventValues.toDateTime.getHours().toString().length!==2 ? "0"+eventValues.toDateTime.getHours():eventValues.toDateTime.getHours()}
                        :{eventValues.toDateTime.getMinutes().toString().length!==2 ? "0"+eventValues.toDateTime.getMinutes():eventValues.toDateTime.getMinutes()}
                        
                        {eventValues.toDateTime.getHours()>=12 ?"PM":"AM"}</p>

                    <div style={{display:"flex",justifyContent:"center"}}>
                        <button style={{margin:"5px"}} className="btn btn-primary" onClick={()=>acceptEvent(eventValues._id,eventValues.organizerEmail)}>Accept</button>
                        <button style={{margin:"5px"}} className="btn btn-primary" onClick={()=>rejectEvent(eventValues._id,eventValues.organizerEmail)}>Reject</button>
                    </div>
                </div>
            ))))
                :
                "No Pending Events"
                }
            
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
    );
}

export default PendingEvents;