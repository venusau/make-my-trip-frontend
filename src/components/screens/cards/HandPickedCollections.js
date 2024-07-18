function HandPickedCollections(){
    return(
        <>
       <div style={{ backgroundColor: "#f4f4f4", padding: "60px 0" }}>
  <div className="container">
    <h2 className="text-center mb-5" style={{color: "#000", fontWeight: 'bold', fontSize: '28px'}}>Handpicked Collections for You</h2>
    <div className="row">
      {[
        {
          title: "Luxury Stays",
          description: "Experience opulence at its finest",
          image: "https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)"
        },
        {
          title: "Budget Stays",
          description: "Comfortable stays at affordable prices",
          image: "https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)"
        },
        {
          title: "Homestays",
          description: "Experience local hospitality",
          image: "https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)"
        },
        {
            title: "Weekend Escapes Near You",
            description: "Discover hidden gems just a stone's throw away",
            image: "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg?im=Resize=(400,462)"
        }
      ].map((item, index) => (
        <div key={index} className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100 transition-all" 
               style={{
                 overflow: 'hidden',
                 transition: 'all 0.3s ease',
                 cursor: 'pointer'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-10px)';
                 e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
               }}>
            <div style={{overflow: 'hidden', height: '200px'}}>
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div className="card-body text-center d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title" style={{fontWeight: 'bold', color: '#008cff', fontSize: '20px'}}>{item.title}</h5>
                <p className="card-text" style={{fontSize: '14px', color: '#4a4a4a'}}>{item.description}</p>
              </div>
              <a href="#" className="btn btn-outline-primary mt-3" 
                 style={{
                   borderRadius: '25px',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={(e) => {
                   e.target.style.backgroundColor = '#008cff';
                   e.target.style.color = 'white';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.backgroundColor = 'transparent';
                   e.target.style.color = '#008cff';
                 }}>
                View Details <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</>
    )
}

export default HandPickedCollections