function UpdateHotelModal(props){
    const {show} = props 
    
    return(
        <div style={{display:show=== true?"":"none",color:"red", backgroundColor:"white"}}>
            Update Flight Modal
        </div>
    )
}

export default UpdateHotelModal