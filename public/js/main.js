function getAllHotelsFrontPage() {
  $.ajax({
    url: "http://localhost:3000/hotels",
    type: "get",
    success: function(response) {
      const result = response.data;

      if (typeof result === "string") {
        const output = `<div class="container mt-4 display">
                                  <div class="card card-body">
                                      <p>No Hotel <span class="text-danger">Found</span></p>
                                   </div>
  
                    </div>`;
        $(".frontcollections").html(output);
      } else {
        let output = "";
        result.forEach(hotel => {
          let rating = "";

          for (let i = 0; i < hotel.rating; i++) {
            rating += `<i class="fas fa-star"></i>`;
          }
          output += `<div class="col-md-3 card card-body mt-4 mr-2 display" onclick="getDetails(${hotel.id})">
          <img src="../img/img_4.jpg" class="card-img-top mt-3" alt="hotel interior image">
          <div class="card-body">
            <h4 class="card-title">${hotel.name}</h4>
  
            <p class="card-text">from<span class="span-price"> $${hotel.price}</span></p>
            <ul class="list-group list-group-flush">
    <li class="list-group-item">Rating: <h6>${rating}</span></h6></li>
    <li class="list-group-item">Created By: <h6>${hotel.created_by}</span></h6></li>
          </ul>
          
          </div>
        </div>`;
        });
        $(".frontcollections").html(output);
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}

window.onload = getAllHotelsFrontPage();
