$(document).ready(function () {
  if (Cookies.get("email")) {
  } else {
    // alert("login first");
    window.location.href = "guest-login.html";
  }
  $("#myForm").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: "required",
      contact: "required",
      address1: "required",
      landmark: "required",
      city: "required",
    },

    messages: {
      contact: "Please enter your contact",
      email: "Please enter your Email",
      password: "Please enter your password",
      address1: "Please enter your address",
      landmark: "Please enter your landmark",
      city: "Please enter your city",
    },
  });

  $(".logout").click(() => {
    Cookies.remove("email");
    window.location.href = "guest-login.html";
  });

  $("#email").attr("value", Cookies.get("email"));

  const submit = async () => {
    try {
      const email = $("#email").val();
      const password = $("#password").val();
      const address1 = $("#address").val();
      const landmark = $("landmark").val();
      const city = $("city").val();
      const contact = $("contact").val();

      let response = await fetch("https://quotequill.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          address: address1,
          landmark,
          city,
          contact,
        }),
      });
      alert("data sent");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  $("#myForm").submit(function (e) {
    e.preventDefault(true);
    submit();
  });
});
