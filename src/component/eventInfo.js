import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../services/auth.service';
// import {withRouter} from 'react-router-dom'

function EventInfo(){
    const navigate=useNavigate();
    const { id } = useParams();
    const [eventValues,setValues]=useState({
        eventId:"",
        eventName:"",
        eventDescription:"",
        organizerName:"",
        organizerEmail:"",
        venue:"",
        noOfPeopleEstimated:"",
        fromDateTime:new Date(),
        toDateTime:new Date(),
        registerFlag:false,
        upcomingFlag:false,
        organizedFlag:false,
        image:""
    });

    useEffect(()=>{
        console.log(id);
        fetch("http://"+process.env.REACT_APP_API_URL + 'eventInfo/'+id,{
            method:"get",   
        }).then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data);
            if(data.message==="Success"){
                console.log(data);
                setValues(eventValues=>({...eventValues,
                        eventId:id,
                        eventName:data.event.eventName,
                        eventDescription:data.event.eventDescription,
                        venue:data.event.venue,
                        noOfPeopleEstimated:data.event.noOfPeopleEstimated,
                        organizerEmail:data.event.organizerEmail,
                        organizerName:data.event.organizerName,
                        image:data.event.image,
                        toDateTime:new Date(data.event.toDateTime),
                        fromDateTime:new Date(data.event.fromDateTime)}));
                        // console.log(eventValues.toDateTime);
            }
            if(data.event.organizerEmail===authService.getCurrentUser().email){
                setValues(eventValues=>({...eventValues,organizedFlag:true}));
            }
            else{
                setValues(eventValues=>({...eventValues,organizedFlag:false}));
            }
            const date=new Date();
            console.log(date,data.event.fromDateTime);
            if(new Date(data.event.fromDateTime)>date){
                setValues(eventValues=>({...eventValues,upcomingFlag:true}));
            }
            else{
                console.log("HI");
                setValues(eventValues=>({...eventValues,upcomingFlag:false}));
            }
            if(!authService.getToken()){
                setValues(eventValues=>({...eventValues,registerFlag:false}));
                console.log("h1");
            }
            else{
                const currentUser=authService.getCurrentUser();
                console.log(currentUser);
                fetch("http://"+process.env.REACT_APP_API_URL+"registeredEvents",
                {
                    method:"POST",
                    body:JSON.stringify({email:currentUser.email}),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      }
                }).then(data=>{return data.json()})
                .then(data=>{
                    console.log(data);

                    if(data.registeredEventsIds.length>0 &&  data.registeredEventsIds.includes(id)){
                        console.log("h2");
                        setValues(eventValues=>({...eventValues,registerFlag:true}));
                    }else{
                        console.log("h3");
                        setValues(eventValues=>({...eventValues,registerFlag:false}));
                    }
                })
                .catch(err=>console.log(err));
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    const deleteEvent=()=>{
        if(!authService.getCurrentUser()){
            navigate("/login");
        }
        fetch("http://"+process.env.REACT_APP_API_URL + "eventDelete",
            {
                method:"POST",
                body:JSON.stringify({id:eventValues.eventId,email:authService.getCurrentUser().email}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }
            })
            .then(res=>{return res.json()})
            .then(data=>{
                console.log(data);
                alert("Deleted Successfully");
                navigate("/events");
            })
            .catch(err=>console.log(err));
    }

    const registerEvent=()=>{
        if(!authService.getCurrentUser()){
            navigate("/login");
        }
        console.log(authService.getCurrentUser().email);
        fetch("http://"+process.env.REACT_APP_API_URL + "registerEvent",{
            method:"POST",
            body:JSON.stringify({eventId:id,email:authService.getCurrentUser().email}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }).then(res=> {return res.json()})
        .then(data=>{
            console.log(data);
            setValues({...eventValues,registerFlag:true});
        })
        .catch(err=>console.log(err));
    }
    const deRegisterEvent=()=>{
        if(!authService.getCurrentUser()){
            navigate("/login");
        }
        console.log(authService.getCurrentUser().email);
        fetch("http://"+process.env.REACT_APP_API_URL + "deRegisterEvent",{
            method:"POST",
            body:JSON.stringify({eventId:id,email:authService.getCurrentUser().email}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }).then(res=> {return res.json()})
        .then(data=>{
            console.log(data);
            setValues({...eventValues,registerFlag:false});
        })
        .catch(err=>console.log(err));
    }
    
    return(
        <div className='container'>
                
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

            {eventValues.organizedFlag?
            
            <>
                {eventValues.upcomingFlag?
                
                    <>
                        
                        <button style={{margin:"5px"}} className="btn btn-primary" onClick={deleteEvent}>Delete</button>
                    </>
                :
                
                    <>

                    </>
                }
            </>

            :

            <>
                {eventValues.upcomingFlag?
                <>
                    {!eventValues.registerFlag ?
                        <button style={{margin:"5px"}} className="btn btn-primary" onClick={registerEvent}>Register</button>
                    :
                        <button style={{margin:"5px"}} className="btn btn-primary" onClick={deRegisterEvent}>DeRegister</button>
                    }
                </>
            :
                <>
                    {eventValues.registerFlag ?
                            <button style={{margin:"5px"}} className="btn btn-primary" type='disabled'>Registered</button>
                    :
                            <button style={{margin:"5px"}} className="btn btn-primary" type='disabled'>Not Registered</button>
                    }
                </>
            }
            </>
            }
            

            
        </div>
    );
}

export default EventInfo;