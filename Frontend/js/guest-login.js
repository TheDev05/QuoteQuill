$(document).ready(() => {
  console.log("object");

  $("#email").attr("value", Cookies.get("email"));

  const submit = async () => {
    try {
      let email = $("#email").val();
      let password = $("#password").val();

      let response = await fetch("http://127.0.0.1:3000/guest-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      //   alert("data sent");
      const temp = await response.json();
      console.log(temp);

      if (temp.success) {
        alert(temp.message);
        Cookies.set("email", email);
        console.log(Cookies.get("email"));
        $(".guest-login-btn").prop("disabled", false);
        window.location.href = "user-dashboard.html";
      } else {
        alert(temp.message);
      }
    } catch (error) {
      console.log(error);
    }

    $(".guest-login-btn").prop("disabled", false);
  };

  $("#myForm").submit(function (e) {
    $(".guest-login-btn").prop("disabled", true);
    e.preventDefault(true);
    submit();
  });
});
