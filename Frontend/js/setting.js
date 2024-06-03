$(document).ready(() => {
  // console.log("ready");

  // Cookies.set("email", "ankit23@gmail.com");
  // console.log(Cookies.get("email"));

  if (!Cookies.get("email")) {
    // alert("Login first");
    window.location.href = "index.html";
  }

  $("#logout").click(() => {
    sessionStorage.setItem("toastMessage", "Logout Succesful");

    Cookies.remove("email");
    Cookies.remove("authToken");
    window.location.href = "index.html";
  });

  const getUserDetails = async () => {
    try {
      const response = await fetch(
        "https://quotequill.onrender.com/userDetails/fetch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: Cookies.get("email"),
          }),
        }
      );

      let temp = await response.json();
      // console.log(temp.data);

      $("#email").val(temp.data.email);
      $("#password").val(temp.data.password);
      $("#fname").val(temp.data.fname);
      $("#lname").val(temp.data.lname);
      $("#bio").val(temp.data.bio);
      $("#address").val(temp.data.address);
      $("#state").val(temp.data.state);
      $("#city").val(temp.data.city);
      $("#zip").val(temp.data.zip);
    } catch (error) {
      // console.log(error);
    }

    $("#submitUpdate").click(() => {
      // console.log("submit clicked");

      const updateUserDetails = async () => {
        try {
          const response = await fetch(
            "https://quotequill.onrender.com/userDetails/update",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: $("#email").val(),
                password: $("#password").val(),
                fname: $("#fname").val(),
                lname: $("#lname").val(),
                bio: $("#bio").val(),
                address: $("#address").val(),
                state: $("#state").val(),
                city: $("#city").val(),
                zip: $("#zip").val(),
              }),
            }
          );

          let temp = await response.json();
          // console.log(temp);

          alert("updated");
        } catch (error) {
          // console.log(error);
        }
      };

      updateUserDetails();
    });
  };

  getUserDetails();
});
