let message = "";
$(".success").hide();
$(".error").hide();
$(".create-error").hide();
function getAllHotels() {
  //get all hotels
  $.ajax({
    url: "http://localhost:3000/allhotels",
    type: "get",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function(response) {
      const result = response.data;

      if (result.length === 0) {
        const output = `<tr><td class="text-white">No Hotel <span class="text-danger">Found</span></td></tr>`;
        $(".collections").html(output);
      } else {
        let output = "";
        result.forEach(hotel => {
          let rating = "";

          for (let i = 0; i < hotel.rating; i++) {
            rating += `<i class="fas fa-star"></i>`;
          }

          output += `<tr class="text-white"><td>${hotel.name}</td>
            <td>${hotel.website}</td>
            <td>${hotel.city}</td>
            <td>${hotel.state}</td>
            <td class="text-success">${rating}</td>
            <td>${hotel.price}</td>
            <td>${hotel.created_by}</td>
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
    }
  });
}

window.onload = getAllHotels();

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
    success: async function(res) {
      getAllHotels();
      message = `
      <p class="text-center">${res.message}<i class="fas fa-check"></i></p>
   `;

      await $("#myUpdateModal").modal("hide");
      $(".success")
        .html(message)
        .show();
      setTimeout(() => {
        $(".success").hide();
      }, 3000);
    },
    error: function(error) {
      console.log(error);
      message = `
      <p class="text-center">${error.responseJSON.error.message}<i class="fas fa-times"></i></p>
   `;

      $(".error")
        .html(message)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
  });
}

function getOne(id) {
  //get a hotel before updating
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
        // $("#myUpdateModal").hide();
        updateHotel(id);
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function deleteOne(id) {
  //delete a hotel
  $.ajax({
    url: `http://localhost:3000/hotel/${id}`,
    type: "delete",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function(res) {
      getAllHotels();
      message = `<p class="text-center">${res.data}<i class="fas fa-check"></i></p>`;

      $(".success")
        .html(message)
        .show();
      setTimeout(() => {
        $(".success").hide();
      }, 3000);
      return;
    },
    error: function(error) {
      console.log(error);
      message = `<p class="text-center">${error.error}<i class="fas fa-check"></i></p>`;

      $(".success")
        .html(message)
        .show();
      setTimeout(() => {
        $(".success").hide();
      }, 3000);
      return;
    }
  });
}

function create() {
  //create a hotel
  const name = $(".name").val();
  const website = $(".website").val();
  const city = $(".city").val();
  const state = $(".state").val();
  const rating = $(".rating").val();
  const price = $(".price").val();

  if (name === "") {
    message = `
    <p class="text-center">name has to be filled<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }
  if (website === "") {
    message = `
    <p class="text-center">website has to be filled<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }
  if (city === "") {
    message = `
    <p class="text-center">city has to be filled<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }
  if (state === "") {
    message = `
    <p class="text-center">state has to be filled<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }
  if (rating === "") {
    message = `
    <p class="text-center">rating has to be filled<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }

  if (isNaN(rating) || rating > 5) {
    message = `
    <p class="text-center">rating has to be filled with only number from 1 - 5<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }
  if (price === "") {
    message = `
    <p class="text-center">price has to be filled<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }
  if (isNaN(price)) {
    message = `
    <p class="text-center">price has to be filled with only numbers<i class="fas fa-times"></i></p>
 `;

    $(".create-error")
      .html(message)
      .show();
    setTimeout(() => {
      $(".create-error").hide();
    }, 3000);
    return;
  }

  //create a new hotel
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
    data: newHotel,
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function(res) {
      getAllHotels();
      $("#myModal").modal("hide");
      output = `
      <p class="text-center">${res.message}<i class="fas fa-check"></i></p>
   `;

      $(".success")
        .html(output)
        .show();
      setTimeout(() => {
        $(".success").hide();
      }, 3000);
    },
    error: function(error) {
      console.log(error);
      output = `
      <p class="text-center">${error.error.message}<i class="fas fa-times"></i></p>
   `;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
    }
  });
}

$(".create").on("click", e => {
  e.preventDefault();
  create();
});

function deleteAll() {
  //delete all hotel
  $.ajax({
    url: `http://localhost:3000/hotels`,
    type: "delete",
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function(res) {
      getAllHotels();
      output = `
      <p class="text-center">${res.data}<i class="fas fa-check"></i></p>
   `;

      $(".success")
        .html(output)
        .show();
      setTimeout(() => {
        $(".success").hide();
      }, 3000);
    },
    error: function(error) {
      console.log(error);
      output = `
      <p class="text-center">${error.error.message}<i class="fas fa-times"></i></p>
   `;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
    }
  });
}

$(".delete-all").on("click", e => {
  if (confirm("Are You Sure You Want To Delete All Hotels")) {
    deleteAll();
  } else {
    getAllHotels();
    output = `
      <p class="text-center">Hotels not deleted<i class="fas fa-check"></i></p>
   `;

    $(".success")
      .html(output)
      .show();
    setTimeout(() => {
      $(".success").hide();
    }, 3000);
    return;
  }
});

function getDetails(id) {
  //get a hotel
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
        rating,
        created_by
      } = response.data[0];

      let ratings = "";

      for (let i = 0; i < rating; i++) {
        ratings += `<i class="fas fa-star"></i>`;
      }
      const output = `<tr class="text-white"><td><i class="fas fa-arrow-circle-left mr-1" onclick="getAllHotels()"></i>${name}</td>
        <td>${website}</td>
        <td>${city}</td>
        <td>${state}</td>
        <td class="text-success">${ratings}</td>
        <td>${price}</td>
        <td>${created_by}</td>
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
      output = `
      <p class="text-center">${error.error}<i class="fas fa-times"></i></p>
   `;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
  });
}
