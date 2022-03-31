import React ,{useState, useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import {getaddress} from '../../store/store slices/addreseSlice'
import {grageOwnerRegister} from '../../store/store slices/auth'
import { useDispatch,useSelector } from 'react-redux'

const Owner_register = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const {create,isLoading,error}= useSelector((state)=>state.auth)
    const {addressList}= useSelector((state)=>state.address)
   
    const [formData, setFormData] = useState({
        workshopname:'',
        workshopAddress:'',
        name: '',
        phone:'',
        email: '',
        password: '',
        confirm_password:'',
        area_id:'',
        country_id:'',
        title:'',
     

    })
    
    useEffect(() =>{
        dispatch(getaddress())
      
    
      },[dispatch])
                        

    const {workshopname,workshopAddress, name,phone , email, password, confirm_password, area_id,country_id,title  }=formData
  
    const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit= async e => {
        e.preventDefault()
        if(password !== confirm_password){
            alert('password do not match')
        }
        
        else{
            console.log(formData)
            console.log( grageOwnerRegister)
           e.preventDefault()
           dispatch( grageOwnerRegister(formData))
          
        }
    }

    let  countries = addressList.map((country=> {
         return <option key={country.id} value={country.id} >{country.name}</option>
         
    }))
    let  selectedcountry = country_id !== '' &&  addressList.find(country => country.id == country_id)
    let renderedareas = selectedcountry && selectedcountry.cities.map((city)=>city.areas.map((area)=><option key={area.id} value={area.id} >{area.name}</option>))
    
    return(
        <>
        {isLoading ?   <img className='login' src="/images/giphy.gif" /> :
        
        <div className='login owner_register'>
          
            <div className='owner_or_employee active'>
                        <img src="/images/cycle one/service_icons/icon_2.png" />
                        <div className="inline-block"> Garage Owner </div>
             </div>

            <form onSubmit={e=>onSubmit(e)}>
           
            <div className="title">Workshop Info</div>
            {error&& <div className='msg-error'>{ Object.values(error)}</div> }
            <div className='main_input'>
               <label>Workshop Name</label>
               <input onChange={e=>onChange(e)} required type='text' name="workshopname" value={workshopname} placeholder='Jessica Hayes'/>
                <div className='mark'><FcCheckmark /></div> 
               
           </div>
           <div className='main_input'>
               <label>Workshop Title</label>
               <input onChange={e=>onChange(e)} required type='text' name="title" value={title} placeholder='Jessica Hayes'/>
                <div className='mark'><FcCheckmark /></div> 
               
           </div>

           
           <div className="title">Workshop Address</div>
             
          <div className='address-id'>
                <select name='country_id' value={country_id} onChange={e=>onChange(e)}>
                <option hidden >Country</option>
                    {countries}
                </select>
          </div>
          <div className='address-id'>
                <select name='area_id' value={area_id} onChange={e=>onChange(e)}>
                <option hidden >Area</option>
                    {renderedareas}
                </select>
           </div>
          
           
           <div className="title">Login Info</div>
           <div className='main_input'>
               <label>Owner Name</label>
               <input onChange={e=>onChange(e)} required type='text' placeholder='Jessica Hayes'  name="name" value={name} />
                <div className='mark'><FcCheckmark /></div> 
               
           </div>

           <div className='main_input'>
               <label>Phone Number</label>
               <input className='phone-code' onChange={e=>onChange(e)} required    maxLength="3"  placeholder='20' 
               value={ country_id !== '' ?  addressList.find(country => country.id == country_id).phone_code:'' }  
               name="code"  />
             
               <input className='phone-number' onChange={e=>onChange(e)} required type='tel' placeholder='1111111111'  name="phone" value={phone} />
                <div className='mark'><FcCheckmark /></div> 
               
           </div>

           <div className='main_input'>
               <label>Email</label>
               <input onChange={e=>onChange(e)} required type='email' placeholder='handel@example.com'  name="email" value={email} />
                <div className='mark'><FcCheckmark /></div> 
               
           </div>

           <div className='main_input'>
               <label>Password</label>
               <input onChange={e=>onChange(e)} required type='password' placeholder='Type your password'  name="password" value={password}  />
                <div className='mark'><FcCheckmark /></div> 
               
           </div>

           <div className='main_input'>
               <label>Confirm Password</label>
               <input onChange={e=>onChange(e)} required type='password' placeholder='Type your password'  name="confirm_password" value={confirm_password} />
               <div className='mark'><FcCheckmark /></div> 
               

           </div>
            
            


            <div className="action">
                    <div className='agree_privacy'>By logging in, you agree to our
                    <div><span className='blue'>Terms of Service </span> &amp; <span className='blue'>Privacy Policy</span></div>
                    </div>
                     
                        
                         <input className='dark_button' type='submit' value='Signup'/> 
                    
                    
                    <div className='sign_up'>Don't Have Account ! <Link to='/login_process/owner_login'><span className='blue'>LOGIN</span></Link> </div>
                 </div>
                 </form>     
                { create && navigate('/login_process/confirmation')}
         </div>
}
        </>
    )
}

export default  Owner_register