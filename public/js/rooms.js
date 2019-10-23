function getAllHotels() {
  $.ajax({
    url: "http://localhost:3000/hotels",
    type: "get",
    success: function(response) {
      const result = response.data;

      if (typeof result === "string") {
        const output = `<tr><td>No Hotel <span class="text-danger">Found</span></td></tr>`;
        $(".collections").html(output);
      } else {
        let output = "";
        result.forEach(hotel => {
          let rating = "";

          for (let i = 0; i < hotel.rating; i++) {
            rating += `<i class="fas fa-star"></i>`;
          }
          output += `<tr><td>${hotel.name}</td>
          <td>${hotel.website}</td>
          <td>${hotel.city}</td>
          <td>${hotel.state}</td>
          <td>${rating}</td>
          <td>${hotel.price}</td>
          <td></td>
          <td>
              <a href="#" onclick="getOne(${hotel.id})" data-toggle="modal"
              data-target="#myUpdateModal">
              <i class="fas fa-edit text-success mr-3 ml-3"></i>
              </a>

              <a href="#" onclick="deleteOne(${hotel.id})">
              <i class="fas fa-trash text-danger"></i>
              </a>
              <a href="#" onclick="getDetails(${hotel.id})">
              <i class="fas fa-info-circle ml-3"></i>
              </a>
          </td><tr>`;
        });
        $(".collections").html(output);
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}

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

window.onload = getAllHotels();
window.onload = getAllHotelsFrontPage();

function updateHotel(id) {
  const updatedHotel = {
    name: $(".modal-name").val(),
    website: $(".modal-website").val(),
    city: $(".modal-city").val(),
    state: $(".modal-state").val(),
    rating: $(".modal-rating").val(),
    price: $(".modal-price").val()
  };

  //update hotel
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "patch",
    data: updatedHotel,
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function() {
      getAllHotels();
      window.location.reload();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getOne(id) {
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "get",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function(response) {
      const { name, website, city, state, rating, price } = response.data[0];

      // show the old data to the user
      $(".modal-name").val(name);
      $(".modal-website").val(website);
      $(".modal-city").val(city);
      $(".modal-state").val(state);
      $(".modal-rating").val(rating);
      $(".modal-price").val(price);

      $(".update").on("click", e => {
        e.preventDefault();
        $("#myUpdateModal").hide();
        updateHotel(id);
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function deleteOne(id) {
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "delete",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function() {
      getAllHotels();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getDetails(id) {
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "get",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function(response) {
      const {
        id,
        name,
        website,
        city,
        state,
        price,
        rating
      } = response.data[0];
      // $('.collections').html = response.data
      let ratings = "";

      for (let i = 0; i < rating; i++) {
        ratings += `<i class="fas fa-star"></i>`;
      }
      const output = `<td>${name}</td>
      <td>${website}</td>
      <td>${city}</td>
      <td>${state}</td>
      <td>${rating}</td>
      <td>${price}</td>
      <td></td>
      <td>
          <a href="#" onclick="updateHotel(${id})">
          <i class="fas fa-edit blue"></i>
          </a>

          :

          <a href="#" onclick="deleteOne(${id})">
          <i class="fas fa-trash red"></i>
          </a>
      </td>`;

      $(".collections").html(output);
      $(".update").on("click", e => {
        e.preventDefault();
        $(".create-hotel").show();
        // here
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function create() {
  const name = $(".name").val();
  const website = $(".website").val();
  const city = $(".city").val();
  const state = $(".state").val();
  const rating = $(".rating").val();
  const price = $(".price").val();

  if (name === "") {
    return alert("please fill in the name");
  }
  if (website === "") {
    return alert("please fill in the website");
  }
  if (city === "") {
    return alert("please fill in the city");
  }
  if (state === "") {
    return alert("please fill in the state");
  }
  if (rating === "") {
    return alert("please fill in the rating");
  }

  if (isNaN(rating) || rating > 5) {
    return alert("please you can only add numbers from 1 - 5");
  }
  if (price === "") {
    return alert("please fill in the price");
  }
  if (isNaN(price)) {
    return alert("please you can only add numbers");
  }

  let newHotel = {
    name,
    website,
    city,
    state,
    rating,
    price
  };

  // post call
  $.ajax({
    url: "http://localhost:3000/hotels",
    type: "post",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    data: newHotel,
    success: function() {
      $("#myModal").hide();

      const message = $(".display").show();

      function messageMe() {
        return message;
      }

      setTimeout(() => {
        messageMe();
      }, 3000);

      getAllHotels();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

$(".create").on("click", e => {
  e.preventDefault();
  create();
});

function deleteAll() {
  $.ajax({
    url: `http://localhost:3000/hotels`,
    type: "delete",
    success: function(response) {
      getAllHotels();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

$(".delete-all").on("click", e => {
  if (confirm("Are You Sure You Want To Delete All Hotels")) {
    deleteAll();
  } else {
    getAllHotels();
  }
});

function getDetails(id) {
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "get",
    success: function(response) {
      const {
        id,
        name,
        website,
        city,
        state,
        price,
        rating
      } = response.data[0];
      // $('.collections').html = response.data
      let ratings = "";

      for (let i = 0; i < rating; i++) {
        ratings += `<i class="fas fa-star"></i>`;
      }
      const output = `<tr><td><i class="fas fa-arrow-circle-left mr-1" onclick="getAllHotels()"></i>${name}</td>
      <td>${website}</td>
      <td>${city}</td>
      <td>${state}</td>
      <td>${ratings}</td>
      <td>${price}</td>
      <td></td>
      <td>
          <a href="#" onclick="getOne(${id})" data-toggle="modal"
          data-target="#myUpdateModal">
          <i class="fas fa-edit text-success mr-3 ml-4"></i>
          </a>

          <a href="#" onclick="deleteOne(${id})">
          <i class="fas fa-trash text-danger"></i>
          </a>
      </td><tr>`;
      $(".collections").html(output);
    },
    error: function(error) {
      console.log(error);
    }
  });
}
