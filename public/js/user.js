$(() => {
  let output = "";
  const User = {
    isLoggedIn: false,
    token: ""
  };
  $(".success").hide();
  $(".error").hide();

  $(".sign-up").on("click", e => {
    e.preventDefault();

    const first_name = $(".firstname")
      .val()
      .trim();
    const last_name = $(".lastname")
      .val()
      .trim();
    const email = $(".email")
      .val()
      .trim()
      .toLowerCase();
    const password = $(".password").val();

    if (!/^[a-zA-Z0-9]{3,}/.test(first_name)) {
      output = `<p class="text-center">please fill in the firstname properly with atleast 3 characters  <i class="fas fa-times"></i></p>`;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}/.test(last_name)) {
      output = `<p class="text-center">please fill in the lastname properly with atleast 3 characters  <i class="fas fa-times"></i></p>`;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (
      !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/.test(email)
    ) {
      output = `<p class="text-center">please fill in a valid email  <i class="fas fa-times"></i></p>`;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,35}$/.test(password)) {
      output = `<p class="text-center">The password must contain not less than 6 characters  <i class="fas fa-times"></i></p>`;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }

    const newUser = {
      first_name,
      last_name,
      email,
      password
    };

    $.ajax({
      url: "http://localhost:3000/user/signup",
      type: "post",
      data: newUser,
      success: function(res) {
        output = `<p class="text-center">${res.message}<i class="fas fa-user-check"></i></p>`;

        $(".success")
          .html(output)
          .show();
        setTimeout(() => {
          $(".success").hide();
        }, 2000);
        setTimeout(() => {
          window.location.replace("../login");
        }, 2000);
      },
      error: function(err) {
        console.log(err);
        output = `<p class="text-center">${err.responseJSON.data.message}<i class="fas fa-user-times"></i></p>`;

        $(".error")
          .html(output)
          .show();
        setTimeout(() => {
          $(".error").hide();
        }, 3000);
        return;
      }
    });
  });

  $(".log-in").on("click", e => {
    e.preventDefault();

    const email = $(".email")
      .val()
      .trim()
      .toLowerCase();
    const password = $(".password").val();

    if (
      !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/.test(email)
    ) {
      output = `
          <p class="text-center">please fill in a valid email  <i class="fas fa-times"></i></p>
       `;

      $(".error")
        .html(output)
        .show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,35}$/.test(password)) {
      output = `<p class="text-center">The password must contain not less than 6 characters  <i class="fas fa-times"></i></p>`;

      $(".error")
        .html(output)
        .show();
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
        output = `<p class="text-center">${res.message}<i class="fas fa-user-check"></i></p>`;

        $(".success")
          .html(output)
          .show();
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
      },
      error: function(err) {
        console.log(err);
        output = `<p class="text-center">${err.responseJSON.data.message}<i class="fas fa-user-times"></i></p>`;

        $(".error")
          .html(output)
          .show();
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
