import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import {FaSearch} from'react-icons/fa'

import SparePartBuy from "./SparePartBuy"
import SelectedSparePart from "./SelectedSpareParts"
import { useDispatch,useSelector } from 'react-redux'
import { getSpareParts} from '../../store/store slices/InventorySice'
import {React , useEffect, useState } from "react"
import SparePartsInventory from "./SparePartsInventory"
const SelectSparePartsFromInventry = () => {
    const dispatch = useDispatch()
    const {spareParts , isLoading, error}= useSelector((state)=>state.inventory)
    const [showAlert, setShowAlert]= useState(true)
    const [selectedSpareParts,setSelectedSpareParts]=useState([])
    useEffect(() =>{
        dispatch(getSpareParts());
        const timeId = setTimeout(() => {
            // After 3 seconds set the showAlert value to false
            setShowAlert(false)
           
          }, 5000)
      
          return () => {
            clearTimeout(timeId)
          }
      
       
    
      },[dispatch])
      console.log(selectedSpareParts)
    let renderedSpareParts = isLoading ? <img className="loading" src="/images/giphy.gif" /> : spareParts.map(sparePart=>  <SparePartsInventory key={sparePart.id} sparepart={sparePart} setSelectedSpareParts={setSelectedSpareParts} selectedSpareParts={selectedSpareParts}/>)
    let renderedSelectedSpareParts = selectedSpareParts.map((part)=><SelectedSparePart part={part} />)
    return (
        <div className="select_spareparts">
            <div className="first_row">
            <Row>
                <Col><span className="title">INVENTORT SPARE PARTS</span></Col>
                <Col>
                    <div className='search_div'>
                        <input className="search"  type='search'  placeholder="Search Spare Parts"/>
                        <div className='icon'><FaSearch /></div>
                    </div>
                </Col>
            </Row>
            </div>
            <div className="tables-row">
             <Row>
               
                <Col md={12} lg={6}>
                    <div className='table_div'>
                        <div className="title">SPARE PARTS LIST</div>
                        <table>
                        <thead>
                            <tr>
                                <th> PART NAME</th>
                                <th > QUAN-<br/> TITY</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                       {renderedSpareParts}
                        </table>
                    </div>
                </Col>
                <Col md={12} lg={6}>
                <div className='table_div'>
                        <div className="title">SELECTED PARTS</div>
                        <table>
                        <thead>
                            <tr>
                                <th> PART NAME</th>
                                <th> QUAN-<br/> TITY</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        {renderedSelectedSpareParts}
                        </table>
                    </div>
                </Col>
             </Row>
            </div>
            <div className="end_row">
            <Row>
               
                <Col>
                 <Link to='/workshop/owner/buyspareparts'>BUY FROM ANOTHER BUSINESS</Link>
                </Col>
                <Col>
                 <Link to=''><button>Add Spare Parts</button></Link>
                </Col>
                

            </Row>
            </div>
        
        </div>
    )
}

export default SelectSparePartsFromInventry
