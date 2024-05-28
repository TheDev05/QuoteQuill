$(document).ready(() => {
  if (Cookies.get("email")) {
    // alert("user is already login, logout first");
    window.location.href = "admin-dashboard.html";
  }
  const admin_submit = async () => {
    try {
      let email = $("#email").val();
      let password = $("#password").val();

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
        alert(temp.message);
        Cookies.set("email", email);
        $(".admin-login-btn").prop("disabled", false);
        sessionStorage.setItem("toastMessage", temp.message);

        window.location.href = "admin-dashboard.html";
      } else {
        alert(temp.message);
      }
    } catch (error) {
      console.log(error);
    }

    $(".admin-login-btn").prop("disabled", false);
  };

  $("#myForm").admin_submit(function (e) {
    $(".admin-login-btn").prop("disabled", true);
    e.preventDefault(true);
    admin_submit();
  });
});
