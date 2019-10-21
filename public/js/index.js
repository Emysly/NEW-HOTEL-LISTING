function getDetails(id) {
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "get",
    timeout: 15000, // adjust the limit. currently its 15 seconds
    success: function(response) {
      const { name, website, city, state, price, rating } = response.data[0];
      // $('.collections').html = response.data
      let ratings = "";

      for (let i = 0; i < rating; i++) {
        ratings += `<i class="fas fa-star"></i>`;
      }
      const output = `<div class="col-md-3 card card-body mt-4 mr-2 display">
        <img src="../img/airbnb.jpg" class="card-img-top mt-3" alt="hotel interior image">
        <div class="card-body">
          <h4 class="card-title">${name}</h4>

          <p class="card-text">from<span class="span-price"> $${price}</span></p>
          <ul class="list-group list-group-flush">
  <li class="list-group-item">Rating: <span>${ratings}</span></li>
  <li class="list-group-item">Website: <span>${website}</span></li>
<li class="list-group-item">Location: <span>${city} ${state}</span></li>

        </ul>
        <button class="btn btn-primary text-white mt-1 update" onclick="getOne(${id})"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-primary delete ml-2 text-danger mt-1" onclick="deleteOne(${id})"><i class="fas fa-times"></i></button>
        </div>
      </div>`;

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
function getAllHotel() {
  $(".create-hotel").hide();

  $.ajax({
    url: "http://localhost:3000/hotels",
    type: "get",
    timeout: 15000, // adjust the limit. currently its 15 seconds
    success: function(response) {
      const result = response.data;
      // $('.collections').html = response.data
      if (typeof result === "string") {
        let output = `<div class="container mt-4 display">
                                    <div class="card card-body">
                                        <p>No Hotel <span class="text-danger">Found</span></p>
                                     </div>

                      </div>`;
        $(".collections").html(output);
        $(".update").on("click", e => {
          e.preventDefault();
          $(".create-hotel").show();
        });
      } else {
        let output = "";
        result.forEach(hotel => {
          let rating = "";

          for (let i = 0; i < hotel.rating; i++) {
            rating += `<i class="fas fa-star"></i>`;
          }
          output += `<div class="col-md-3 card card-body mt-4 mr-2 display" onclick="getDetails(${hotel.id})">
        <img src="../img/airbnb.jpg" class="card-img-top mt-3" alt="hotel interior image">
        <div class="card-body">
          <h4 class="card-title">${hotel.name}</h4>

          <p class="card-text">from<span class="span-price"> $${hotel.price}</span></p>
          <ul class="list-group list-group-flush">
  <li class="list-group-item">Rating: <h6>${rating}</span></h6></li>
        </ul>
        <button class="btn btn-primary text-white mt-1 update" onclick="getOne(${hotel.id})"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-primary delete ml-2 text-danger mt-1" onclick="deleteOne(${hotel.id})"><i class="fas fa-times"></i></button>
        </div>
      </div>`;
        });
        $(".collections").html(output);
        $(".update").on("click", e => {
          e.preventDefault();
          $(".create-hotel").show();
          // here
        });
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getOne(id) {
  $(".collections").hide();
  $(".submit").hide();
  $(".update").show();
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "get",
    timeout: 15000, // adjust the limit. currently its 15 seconds
    success: function(response) {
      const { name, website, city, state, rating, price } = response.data[0];

      // show the old data to the user
      $(".name").val(name);
      $(".website").val(website);
      $(".city").val(city);
      $(".state").val(state);
      $(".rating").val(rating);
      $(".price").val(price);

      $(".update").on("click", e => {
        e.preventDefault();
        updateHotel(id);
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function updateHotel(id) {
  const updatedHotel = {
    name: $(".name").val(),
    website: $(".website").val(),
    city: $(".city").val(),
    state: $(".state").val(),
    rating: $(".rating").val(),
    price: $(".price").val()
  };
  //update hotel
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "patch",
    data: updatedHotel,
    timeout: 15000, // adjust the limit. currently its 15 seconds
    success: function(response) {
      $(".create-hotel").hide();
      const hotel = response.data;

      let rating = "";

      for (let i = 0; i < hotel.rating; i++) {
        rating += `<i class="fas fa-star"></i>`;
      }

      const output = `<div class="col-md-3 card card-body mt-4 mr-2 display">
    <img src="../img/airbnb.jpg" class="card-img-top mt-3" alt="hotel interior image">
    <div class="card-body">
      <h4 class="card-title">${hotel.name}</h4>

      <p class="card-text">from<span class="span-price"> $${hotel.price}</span></p>
      <ul class="list-group list-group-flush">
<li class="list-group-item">Rating: <h6>${rating}</span></h6></li>
    </ul>
    </div>
  </div>`;

      $(".collections")
        .show()
        .html(output);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function deleteOne(id) {
  $(".collections").hide();
  $(".submit").hide();
  $(".update").show();
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "delete",
    timeout: 15000, // adjust the limit. currently its 15 seconds
    success: function(response) {
      console.log(response);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

$(() => {
  $(".create-hotel").hide();

  $(".create").on("click", e => {
    e.preventDefault();
    $(".collections").hide();
    $(".create-hotel").show();

    $(".get-all-hotels").on("click", e => {
      e.preventDefault();
      getAllHotel();
    });
  });

  $(".submit").on("click", e => {
    e.preventDefault();

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

    $(".create-hotel").hide();
    // post call
    $.ajax({
      url: "http://localhost:3000/hotels",
      type: "post",
      data: newHotel,
      timeout: 15000, // adjust the limit. currently its 15 seconds
      success: function(response) {
        const hotel = response.data;

        let rating = "";

        for (let i = 0; i < hotel.rating; i++) {
          rating += `<i class="fas fa-star"></i>`;
        }

        const output = `<div class="col-md-3 card card-body mt-4 mr-2 display">
        <img src="../img/airbnb.jpg" class="card-img-top mt-3" alt="hotel interior image">
        <div class="card-body">
          <h4 class="card-title">${hotel.name}</h4>

          <p class="card-text">from<span class="span-price"> $${hotel.price}</span></p>
          <ul class="list-group list-group-flush">
  <li class="list-group-item">Rating: <span>${ratings}</span></li>
  <li class="list-group-item">Website: <span>${hotel.website}</span></li>
<li class="list-group-item">Location: <span>${hotel.city} ${hotel.state}</span></li>

        </ul>
        <button class="btn btn-primary text-white mt-1 update" onclick="getOne(${id})"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-primary delete ml-2 text-danger mt-1" onclick="deleteOne(${id})"><i class="fas fa-times"></i></button>
        </div>
      </div>`;

        $(".collections")
          .show()
          .html(output);

        $(".create-hotel").trigger("reset");
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $(".get-all-hotels").on("click", e => {
    e.preventDefault();
    getAllHotel();
  });
});
