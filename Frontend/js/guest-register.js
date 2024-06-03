$(document).ready(() => {
  // console.log("object");

  const submit = async () => {
    try {
      let fname = $("#firstName").val();
      let lname = $("#lastName").val();
      let email = $("#email").val();
      let password = $("#password").val();

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

      //   alert("data sent");
      const temp = await response.json();
      // console.log(temp);

      if (temp.success) {
        alert(temp.message);
        Cookies.set("email-trial", email);
        $(".register_btn").prop("disabled", false);
        window.location.href = "guest-login.html";
      } else {
        alert(temp.message);
      }
    } catch (error) {
      // console.log(error);
    }

    $(".register_btn").prop("disabled", false);
  };

  $("#myForm").submit(function (e) {
    e.preventDefault(true);
    $(".register_btn").prop("disabled", true);
    submit();
  });
});
