import React,{useEffect,useState} from 'react'
import {updateData} from '../../../redux/action/userAction'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const UserProfile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const state = useSelector((state)=>{
      return state.users;
    })
    const dispatch = useDispatch();
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(true)
    const signedInUser = JSON.parse(localStorage.getItem('user')); 
    useEffect(()=>{
       fetch(`https://vast-river-59602.herokuapp.com/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
         
            setProfile(result)
       })
    },[userid])


    const followUser = ()=>{
        fetch('https://vast-river-59602.herokuapp.com/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            const followers = data.followers;
            const following = data.following;
            dispatch(updateData(following,followers))
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('https://vast-river-59602.herokuapp.com/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
          const followers = data.followers;
          const following = data.following;
          dispatch(updateData(following,followers))
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }
   return (
       <>
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={userProfile.user.pic} alt=""
                   />
               </div>
               <div>
                   <h4>{userProfile.user.name}</h4>
                   <h5>{userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length} posts</h6>
                       <h6>{userProfile.user.followers.length} followers</h6>
                       <h6>{userProfile.user.following.length} following</h6>
                   </div>
                   {!signedInUser.following.includes(userid)?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    }
                   
                  

               </div>
           </div>
     
           <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
       
       
       : <h2 style={{textAlign:"center"}}>loading...!</h2>}
       
       </>
   )
}


export default UserProfile;