import { useEffect, useState } from "react";
import {AiOutlineClose} from "react-icons/ai"
import { FcCheckmark } from "react-icons/fc";
import { Col, Row,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {FaFacebookF } from 'react-icons/fa'
import {BsTwitter, BsGoogle } from 'react-icons/bs'
import {login,clearstate,logOut} from '../../../store/store slices/auth'
import{getUserDetails, clearUserstate} from '../../../store/store slices/detailUser'
import { useDispatch,useSelector } from 'react-redux'
//formik
import { Formik, Field, Form } from 'formik';
// yup validation
import * as yup from 'yup';
import FlashMsg from "../../workshops/components/FlashMsg";

const EmployLogin = () =>{
      // yup validation
      let schema = yup.object().shape({
   
        email: yup.string().email('Enter a Valid Email').required("Email is required"),
        password: yup.string().min(5,'password at least 5 characters').max(10, 'password max 10 characters'),
       
      });

      // end  yup 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userDetails}= useSelector((state)=>state.userDetails)
    const {loggedIn,isLoading,error}= useSelector((state)=>state.auth)
    const [showAlert, setShowAlert]= useState(true)
    const[flashmsg,setFlashmsg] = useState(true)
  useEffect(() =>{  
    dispatch(getUserDetails())
   
    
  },[loggedIn])
  useEffect(() =>{  
     const timeId = setTimeout(() => {
        // After 3 seconds set the showAlert value to false
    
        if(userDetails.is_garage_owner)
        { dispatch(logOut());
          { dispatch(logOut());
            dispatch(clearUserstate());
          
          }
        }
      }, 2000)
  
      return () => {
        clearTimeout(timeId)
      }
   
    
  },[userDetails])
   console.log(userDetails)
    const onSubmit= async data=> {
       
           dispatch( login(data))
           setShowAlert(true)
           const timeId = setTimeout(() => {
            // After 3 seconds set the showAlert value to false
            // setShowAlert(false)
            // setFlashmsg(true)
            // dispatch(clearstate())
          
          }, 5000)
      
          return () => {
            clearTimeout(timeId)
          }
    }

    const setFlashScroll=(value)=>{
      setFlashmsg(value)
      window.scrollTo(0, 0);
  }
  const removeError=(setFieldValue,setFieldTouched, name)=>{
    setFieldValue(name, '', false);
    setFieldTouched(name, false,false)

  }
    return(
        <>
       
         {loggedIn && userDetails.is_employee && navigate('/employ')}
         { loggedIn && userDetails.is_garage_owner && dispatch(logOut())}
         {isLoading ?   <img className='login' src="/images/giphy.gif" /> :
         <div className='login owner_login'>


           <Row className="justify-content-md-center">
               <Col sm={12}md={5}>
                   
               <Link to='/login_process/owner_login'>
                    <div className='owner_or_employee ' onClick={() =>dispatch(clearstate())}>
                        <img src="/images/cycle one/service_icons/icon_2.png" />
                        <div className="inline-block"> Garage Owner </div>
                    </div>
                </Link>
                 
               </Col>
               <Col sm={12} md={5}>
                  <div className='owner_or_employee active'>
                  <img src="/images/cycle one/service_icons/icon_2.png" />
                  <div className="inline-block"> Garage Employee   </div>
                  </div>
                 
               </Col>
           </Row>
          
          
           <Formik
             initialValues={{
                email: '',
                password: '',
                remember:false
               
               
              }}
              validationSchema={schema}
              onSubmit ={(values)=>{
                onSubmit(values);
             
              }}
             
            
           >
            {({errors, touched, setFieldTouched,  handleSubmit,setFieldValue })=> (
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}  autoComplete="off">
                     {/* start flash msgs */}

               {flashmsg&& error && <FlashMsg 
                                    icontype='error-icon' 
                                    img={'/images/msgIcons/error.svg'}
                                    title='Login Error !'
                                    setFlashmsg={setFlashScroll}
                                    p={Object.values(error)}
                                  />
           }

              {flashmsg&&loggedIn && userDetails.is_garage_owner && <FlashMsg 
                                    icontype='error-icon' 
                                    img={'/images/msgIcons/error.svg'}
                                    title='Login Error !'
                                    setFlashmsg={setFlashScroll}
                                    p={"You aren't an Employ"}
                                  />}
               {/* end flash msgs */}

           
                <div className={`main_input ${errors.email  && touched.email &&'input-error'}`} >
                    <label htmlFor='email'>Email</label>
                    <Field type='email' placeholder='handel@example.com'  name="email" autoComplete="off"   />
                       { touched.email && <div className='mark'>{errors.email ?  <span className='validation-error'><AiOutlineClose onClick={()=> removeError(setFieldValue,setFieldTouched,'email')}/></span>: <FcCheckmark />}</div>}
                       {errors.email && touched.email && <><div className='error-text'> {errors.email}</div></> }
                    
                </div>
                
                    <div className={`main_input ${errors.password  && touched.password &&'input-error'}`}>
                        <label htmlFor='password'>Password</label>
                        <Field type='password' placeholder='Type your password'  name="password" autoComplete="off"/>
                        {touched.password && <div className='mark'>{errors.password  ? <span className='validation-error'><AiOutlineClose onClick={()=> removeError(setFieldValue,setFieldTouched,'email')}/></span>: <FcCheckmark />}</div>} 
                        {errors.password && touched.password && <div className='error-text'> {errors.password}</div> }
                        </div>
                        <div className="action">
                        
                        <Link to='/login_process/reset'> <div className='blue forget_password '>Forgot Password !</div></Link>
                            <div>
                                <Field className='checkbox' type="checkbox" name='remember' /> 
                                <span>Remember Me For 7 days</span>
                            </div>
                            <div className='agree_privacy'>By logging in, you agree to our
                            <div><span className='blue'>Terms of Service </span> &amp; <span className='blue'>Privacy Policy</span></div>
                            </div>
                        
                            <input className='dark_button' type='submit' value='Login'/>
                           
                        
                          
                            
                        </div>
           </form>
            )}

           </Formik>
                 
        
         </div>
}
        </>
    )
}
export default EmployLogin