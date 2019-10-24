$(() => {
  let output = "";
  const User = {
    isLoggedIn: false,
    token: ""
  };

  $(".sign-up").on("click", e => {
    e.preventDefault();

    const firstname = $(".firstname").val();
    const lastname = $(".lastname").val();
    const email = $(".email").val();
    const password = $(".password").val();

    if (!/^[a-zA-Z0-9]{3,}/.test(firstname)) {
      output = `<p class="text-center">please fill in the firstname properly with atleast 3 characters  <i class="fas fa-times"></i></p>`;

      $(".error").html(output);
      $(".error").show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}/.test(lastname)) {
      output = `<p class="text-center">please fill in the lastname properly with atleast 3 characters  <i class="fas fa-times"></i></p>`;

      $(".error").html(output);
      $(".error").show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (
      !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/.test(email)
    ) {
      output = `<p class="text-center">please fill in a valid email  <i class="fas fa-times"></i></p>`;

      $(".error").html(output);
      $(".error").show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,35}$/.test(password)) {
      output = `<p class="text-center">The password must contain not less than 6 characters  <i class="fas fa-times"></i></p>`;

      $(".error").html(output);
      $(".error").show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }

    const newUser = {
      firstname,
      lastname,
      email,
      password
    };

    $.ajax({
      url: "http://localhost:3000/user/signup",
      type: "post",
      data: newUser,
      success: function(res) {
        $(".success").show();
        if (res.status === "success") {
          setTimeout(() => {
            $(".success").hide();
          }, 2000);
          setTimeout(() => {
            window.location.replace("../login");
          }, 2000);
        }
      }
    });
  });

  $(".log-in").on("click", e => {
    e.preventDefault();

    const email = $(".email")
      .val()
      .toLowerCase();
    const password = $(".password").val();

    if (
      !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/.test(email)
    ) {
      output = `
          <p class="text-center">please fill in a valid email  <i class="fas fa-times"></i></p>
       `;

      $(".error").html(output);
      $(".error").show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,35}$/.test(password)) {
      output = `<p class="text-center">The password must contain not less than 6 characters  <i class="fas fa-times"></i></p>>`;

      $(".error").html(output);
      $(".error").show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }

    const newUser = {
      email,
      password
    };

    $.ajax({
      url: "http://localhost:3000/user/login",
      type: "post",
      data: newUser,
      success: function(res) {
        // return login();
        output = `<p class="text-center">You have log in successfully  <i class="fas fa-user-check"></i></p>`;

        $(".success").html(output);
        $(".success").show();
        setTimeout(() => {
          $(".success").hide();
        }, 3000);
        if (res.status === "success") {
          setTimeout(() => {
            $(".success").hide();
          }, 2000);
          User.isLoggedIn = true;
          User.token = res.data.token;
          localStorage.setItem("isLoggedIn", User.isLoggedIn);
          localStorage.setItem("token", User.token);
          localStorage.setItem("firstname", res.data.first_name);
          localStorage.setItem("lastname", res.data.last_name);
          localStorage.setItem("id", res.data.id);

          if (res.data.is_admin) {
            window.location.replace("../admin.html");
          } else {
            window.location.replace("../hotel.html");
          }
        }
      },
      error: function(err) {
        console.log(err);
        output = `<p class="text-center">Incorrect password  <i class="fas fa-user-times"></i></p>`;

        $(".error").html(output);
        $(".error").show();
        setTimeout(() => {
          $(".error").hide();
        }, 3000);
        return;
      }
    });
  });
});

$(".logout").on("click", e => {
  e.preventDefault();
  localStorage.clear();
  window.location.replace("/");
});

function success() {
  return $(".success").show();
}

function error() {
  return $(".error").show();
}
