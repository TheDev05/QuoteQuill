$(document).ready(() => {
  // Navbar buttons hide accorindg to cookies stored
  const NavCheck = () => {
    console.log("cookies-email", Cookies.get("authToken"));

    if (Cookies.get("authToken")) {
      console.log("email is there, means user is login");
      $("#post-modal").attr("id", "post-modal-false");
      $("#post-modal-false").attr("id", "post-modal");

      // $("#post-modal").css("display", "none");
      $("#login, #register, #sign-text, #sign-bottom").css("display", "none");
      $("#community, #logout, #profile, #post-text, #post-bottom").css(
        "display",
        "block"
      );
    } else {
      console.log("email is not there");
      $("#post-modal-false").attr("id", "post-modal");
      $("#post-modal").attr("id", "post-modal-false");

      $("#login, #register,#sign-text, #sign-bottom").css("display", "block");
      $("#community, #logout, #profile,#post-text, #post-bottom").css(
        "display",
        "none"
      );
    }
  };

  NavCheck();

  // Two post at main page starts
  console.log("Two posts at main page");

  if (sessionStorage.getItem("toastMessage")) {
    $.toast({
      heading: "Success",
      text: sessionStorage.getItem("toastMessage"),
      icon: "success",
    });

    sessionStorage.removeItem("toastMessage");
  }

  // Like and copy to clipboard at home page
  // $("#copyButton").click(function () {
  //   var textToCopy = $("#textToCopy").text();

  //   navigator.clipboard
  //     .writeText(textToCopy)
  //     .then(function () {
  //       alert("Text copied to clipboard");
  //     })
  //     .catch(function (err) {
  //       console.error("Failed to copy text: ", err);
  //     });
  // });

  const displayPost = async () => {
    try {
      let response = await fetch("https://quotequill.onrender.com/displayPost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // alert("data sent");
      const temp = await response.json();
      // console.log(temp.data);

      temp.data.reverse();
      console.log(temp.data[0]);
      console.log(temp.data[1]);

      var newData = temp.data.slice(0, 2);
      console.log("here is the titlr", newData[0].title);

      $(".quote-ad-title1").append(newData[0].title);
      $(".quote-ad-desc1").text(newData[0].message);
      $(".sign-name1").text(newData[0].name);

      $(".quote-ad-title2").append(newData[1].title);
      $(".quote-ad-desc2").text(newData[1].message);
      $(".sign-name2").text(newData[1].name);

      // $(".like").css("background-color", "red");

      // newData.map((post) => {
      //   $(".second-data").append(`
      //         <div class="left-post">
      //         <div class="post-title">
      //         <h4>
      //             <i class="fa fa-quote-left fa-3x fa-pull-left"></i> ${post.title}
      //         </h4>
      //         </div>
      //         <div class="post-desc" id="textToCopy">
      //         ${post.message}
      //         </div>
      //         <div class="post-bottom">
      //         <div class="bottom-left">
      //             <div class="like" id=${post._id}>
      //             <i class="fa fa-heart"></i>
      //             </div>
      //             <div class="copy" id="copyButton">
      //             <i class="copy-icon fa fa-copy fa-1x"></i>
      //             </div>
      //         </div>
      //         <div class="post-right">
      //             <div class="name">${post.name}</div>
      //         </div>
      //         </div>
      //     </div>
      //   `);

      //   if (post.isLiked == true) {
      //     $(`#${post._id}`).css("color", "red");
      //   }
      // });

      // $(".like").click(async function (event) {
      //   // console.log("clicked");

      //   const postId = $(event.currentTarget).attr("id");
      //   let postIsLiked = false;

      //   temp.data.map((value) => {
      //     if (value._id == postId) {
      //       if (value.isLiked == true) postIsLiked = true;
      //     }
      //   });

      //   const likeThis = async () => {
      //     try {
      //       let response = await fetch("http://127.0.0.1:3000/like", {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           postIsLiked,
      //           id: postId,
      //         }),
      //         credentials: "include",
      //       });

      //       if (!response.ok) {
      //         alert("Create an account first!");
      //       }

      //       // alert("liked");
      //       const temp = await response.json();
      //       // console.log("Server response", temp);

      //       if (temp.success) {
      //         // alert(temp.message);
      //       } else {
      //         alert(temp.message);
      //       }

      //       location.reload();
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   };

      //   likeThis();
      // });
    } catch (error) {
      console.log(error);
    }
  };

  displayPost();

  // User-login-started
  console.log("user login");

  // Cookies.set("email", "Aaa");

  console.log(Cookies.get("email"));

  // Logout
  $("#logout").click(() => {
    sessionStorage.setItem("toastMessage", "Logout Succesful");
    Cookies.remove("authToken");
    Cookies.remove("email");
    window.location.href = "index.html";
  });

  // Click on community check for cookie
  $("#community").click(() => {
    if (Cookies.get("authToken")) {
      window.location.href = "user-dashboard.html";
    } else {
      $.toast({
        heading: "Error",
        text: "Login First",
        showHideTransition: "fade",
        icon: "error",
      });
    }
  });

  const user_login_submit = async () => {
    try {
      let email = $("#user-login-email").val();
      let password = $("#user-login-password").val();

      console.log("emails", email, password);

      let response = await fetch("https://quotequill.onrender.com/guest-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      //   alert("data sent");
      const temp = await response.json();
      // console.log("response", temp);

      if (temp.success) {
        $(".guest-login-btn").prop("disabled", false);
        $("#post-modal").modal("hide");

        Cookies.set("email", email);
        console.log("cookies-email", Cookies.get("authToken"));
        console.log("logined");

        sessionStorage.setItem("toastMessage", temp.message);
        NavCheck();

        location.reload();

        window.location.href = "index.html";
      } else {
        $.toast({
          heading: "Error",
          text: temp.message,
          showHideTransition: "fade",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }

    $(".guest-login-btn").prop("disabled", false);
  };

  $("#login-button").click(function (e) {
    let login_email = $("#user-login-email").val();
    let login_password = $("#user-login-password").val();

    if (login_email.length == 0 || login_password.length == 0) {
      $.toast({
        heading: "Error",
        text: "Credentials can't be blank",
        showHideTransition: "fade",
        icon: "error",
      });
    } else {
      console.log(" bt clicked");
      $(".guest-login-btn").prop("disabled", true);
      user_login_submit();
    }

    // e.preventDefault(true);
  });

  // User-register-started
  console.log("user registration");

  const user_registration_submit = async () => {
    try {
      let fname = $("#firstName").val();
      let lname = $("#lastName").val();
      let email = $("#register-email").val();
      let password = $("#register-password").val();

      let response = await fetch("https://quotequill.onrender.com/guest-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      });

      // alert("data sent");
      const temp = await response.json();
      // alert("response");
      console.log(temp);

      if (temp.success) {
        $(".register_btn").prop("disabled", false);
        $("#modal-register").modal("hide");
        $.toast({
          heading: "Success",
          text: temp.message,
          icon: "success",
        });

        Cookies.set("email", email);
        $("#user-login-email").attr("value", Cookies.get("email"));
        $("#post-modal").modal("show");
      } else {
        $.toast({
          heading: "Error",
          text: temp.message,
          showHideTransition: "fade",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }

    $(".register_btn").prop("disabled", false);
  };

  $("#register-button").click(function (e) {
    e.preventDefault(true);
    $(".register_btn").prop("disabled", true);
    user_registration_submit();
  });

  // Admin login starts
  console.log("admin login");

  const admin_submit = async () => {
    try {
      let email = $("#admin_email").val();
      let password = $("#admin_password").val();

      let response = await fetch("https://quotequill.onrender.com/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const temp = await response.json();
      console.log(temp);

      if (temp.success) {
        $(".admin-login-btn").prop("disabled", false);
        $("#modal-admin").modal("hide");

        sessionStorage.setItem("toastMessage", temp.message);

        Cookies.set("email", email);
        window.location.href = "admin-dashboard.html";
      } else {
        $.toast({
          heading: "Error",
          text: temp.message,
          showHideTransition: "fade",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }

    $(".admin-login-btn").prop("disabled", false);
  };

  $("#admin_login").click(function (e) {
    $(".admin-login-btn").prop("disabled", true);
    e.preventDefault(true);
    admin_submit();
  });

  // Two  post advertisemtn on first page
  console.log("2 Posts at Front");

  //   if (!Cookies.get("email")) {
  //     alert("Login first");
  //     window.location.href = "index.html";
  //   }

  //   $("#logout").click(() => {
  //     Cookies.remove("email");
  //     window.location.href = "guest-login.html";
  //   });

  // Post from main page starts
  //   $("#post").click(() => {
  //     console.log("post");
  //     if (Cookies.get("email")) {
  //       $("#post-modal").modal("hide");
  //       console.log("you will mke a post");
  //     }
  //   });

  $("#share").click(() => {
    const post = async () => {
      try {
        const day = Date();
        let title = $("#title").val();
        let message = $("#message").val();
        let date = day.toLocaleString();
        let isLiked = false;
        let name = "DEFAULT";

        let response = await fetch("https://quotequill.onrender.com/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day,
            title,
            message,
            date,
            isLiked,
            name,
          }),
        });

        //   alert("data sent");
        const temp = await response.json();
        console.log(temp);

        if (temp.success) {
          sessionStorage.setItem("toastMessage", "Shared");

          //   $(".guest-login-btn").prop("disabled", false);
          //   displayPost();
          window.location.href = "user-dashboard.html";
        } else {
          $.toast({
            heading: "Error",
            text: temp.message,
            showHideTransition: "fade",
            icon: "error",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    post();
  });
});
