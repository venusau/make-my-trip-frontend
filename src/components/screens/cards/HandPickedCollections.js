function HandPickedCollections(){
    return(
        <>
        <div style={{ backgroundColor: "#f2f2f2", padding: "40px 0" }}>
    <div className="container">
      <h2 className="text-center mb-4" style={{color: "#000", fontWeight: 'bold'}}>Handpicked Collections for You</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title" style={{fontWeight: 'bold'}}>Collection 1</h5>
              <p className="card-text">Explore amazing destinations and deals.</p>
              <a href="#" className="btn btn-outline-primary">View Details</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title" style={{fontWeight: 'bold'}}>Collection 2</h5>
              <p className="card-text">Exclusive offers on luxury stays.</p>
              <a href="#" className="btn btn-outline-primary">View Details</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title" style={{fontWeight: 'bold'}}>Collection 3</h5>
              <p className="card-text">Discover budget-friendly travel options.</p>
              <a href="#" className="btn btn-outline-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}

export default HandPickedCollections