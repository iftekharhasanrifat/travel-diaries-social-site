import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updatePic} from '../../../redux/action/userAction'

const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const [image,setImage] = useState("")
    const state = useSelector((state)=>{
      return state.users;
    })
    const dispatch = useDispatch();
    useEffect(()=>{
       fetch('https://vast-river-59602.herokuapp.com/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","travel-diaries")
        data.append("cloud_name","pulokc")
        fetch("https://api.cloudinary.com/v1_1/pulokc/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('https://vast-river-59602.herokuapp.com/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               const pic = result.pic;
               dispatch(updatePic(pic))
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image,state,dispatch])
    const updatePhoto = (file)=>{
        setImage(file)
    }
   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"}alt=""
                   />
                 
               </div>
               <div>
                   <h4 style={{fontWeight:"bold"}}>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state?.followers?.length:"0"} followers</h6>
                       <h6>{state?state?.following?.length:"0"} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="create_btn">
            <i class="small material-icons">
            add_a_photo</i>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
   )
}


export default Profile