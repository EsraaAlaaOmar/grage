import React,{useState} from 'react'
import{createPackage} from '../../store/store slices/packagesSlice'
import { FcCheckmark } from "react-icons/fc";
import {AiOutlineClose} from "react-icons/ai"
import { useDispatch,useSelector } from 'react-redux'
//formik
import { Formik, Field, Form } from 'formik';
// yup validation
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom'
import Cookies from "universal-cookie";
const cookies = new Cookies();

const AddEditePackage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
      // yup validation
      let schema = yup.object().shape({
   
        title:yup.string().required('Package title is required'),
        price: yup.number().typeError('Price must be a number').required('Price  is required'),
        description:yup.string().required('Package title is required'),
        
       });
 
       // end  yup 
    const [showAlert, setShowAlert]= useState(true)
    const [img,setImg] =useState('')
    const imgChange=e=>setImg( e.target.files[0])
    const {created, isLoading, error}= useSelector((state)=>state.packages)
    const onSubmit= async data => {
        dispatch(createPackage( {...data, image:img}));
        setShowAlert(true)
        const timeId = setTimeout(() => {
         // After 3 seconds set the showAlert value to false
         setShowAlert(false)
       
       }, 5000)
   
       return () => {
         clearTimeout(timeId)
       }
   
      
    }
    return (
        <>
         
        {isLoading ? <img className='loading-img' src="/images/giphy.gif" /> :

        <div className='add_edite'>
               <Formik
             initialValues={{
                workshop_id:cookies.get("workshop").id,
                title: '',
                price: '',
                description:'',
             
                
               
               
              }}
              validationSchema={schema}
              onSubmit ={(values)=>{
                onSubmit(values);
             
               
             
              }}
             
            
           >
            {({errors, touched,  handleSubmit})=> (
            <form className='form-validator' onSubmit={e=> {e.preventDefault(); handleSubmit()}}>
                <div className='upload'
                    onClick={()=> document.getElementById("my_file").click()}>

                        <img src='/images/cycle one/img.png'/>
                        <span>UPLOAD PHOTOS</span>
                     </div>
                     {img =='' ? <div className='img-notselected'>You dont select an Image </div> : <div className='img-selected'>Image Selected</div>}
                 
                <input type="file" id="my_file" style={{display: "none"}} onChange={e=>imgChange(e)}  required/>

                <div className={`${errors.title  && touched.title &&'input-error'}`}>
                     
                     <Field type='text' placeholder='PACKAGE TITLE'  name="title" autoComplete="off"/>
                     {touched.title && <div className='mark'>{errors.title  ? <span className='validation-error'><AiOutlineClose /></span>: <FcCheckmark />}</div>} 
                     {errors.title && touched.title && <div className='error-text'> {errors.title}</div> }
                </div>
                <div className={`${errors.price  && touched.price &&'input-error'}`}>
                     
                     <Field type='text' placeholder='PRICE'  name="price" autoComplete="off"/>
                     {touched.price && <div className='mark'>{errors.price  ? <span className='validation-error'><AiOutlineClose /></span>: <FcCheckmark />}</div>} 
                     {errors.price && touched.price && <div className='error-text'> {errors.price}</div> }
                </div>

                <div className={`${errors.description  && touched.description &&'input-error'}`}>
                     
                     <Field type='text' placeholder='Description'  name="description" autoComplete="off"/>
                     {touched.description && <div className='mark'>{errors.description  ? <span className='validation-error'><AiOutlineClose /></span>: <FcCheckmark />}</div>} 
                     {errors.description && touched.description && <div className='error-text'> {errors.description}</div> }
                </div>
                
               
                <br/>
                {showAlert && error && <div className='msg-error'>{ Object.values(error)}</div> }

                <input className='btn' type='submit' value='SAVE DETAILS' />
            </form>
            )}
            </Formik >
            {created && navigate('/workshop/owner/maintnance')} 

          
        </div>
        }</>
    )
}

export default AddEditePackage
