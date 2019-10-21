$(() => {
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
      return alert(
        "please fill in the firstname properly with atleast 3 characters"
      );
    }
    if (!/^[a-zA-Z0-9]{3,}/.test(lastname)) {
      return alert(
        "please fill in the lastname properly with atleast 3 characters"
      );
    }
    if (
      !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/.test(
        email.toLowerCase()
      )
    ) {
      return alert("please fill in a valid email");
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,35}$/.test(password)) {
      return alert("The password must contain not less than 6 characters");
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
      data: newUser
    });
  });

  $(".log-in").on("click", e => {
    e.preventDefault();

    const email = $(".email").val();
    const password = $(".password").val();

    if (
      !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/.test(
        email.toLowerCase()
      )
    ) {
      return alert("please fill in a valid email");
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,35}$/.test(password)) {
      return alert("The password must contain not less than 6 characters");
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
        if (res.status === "success") {
          User.isLoggedIn = true;
          User.token = res.data.token;
          redirectToHome();
        }

        alert(res.error.message);
      },
      error: function(error) {
        alert(error.statusText);
      }
    });
  });
});

function redirectToHome() {
  window.location.replace("../home");
}



