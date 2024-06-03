$(document).ready(() => {
  // console.log("profile started");

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

  const fetch_posts = async () => {
    try {
      const response = await fetch("https://quotequill.onrender.com/fetchUserAllPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Cookies.get("email"),
        }),
      });

      let temp = await response.json();
      // console.log(temp.data[0].posts);

      if (temp.data.length != 0) {
        const data = temp.data[0].posts;
        // console.log(data);

        // $("#user_name").append(data[0].first_name);
        $("#post_count").append(data.length);
        // console.log(data.length);
      } else {
        $("#post_count").append("0");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  fetch_posts();

  const getUserDetails = async () => {
    try {
      const response = await fetch("https://quotequill.onrender.com/userDetails/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Cookies.get("email"),
        }),
      });

      let temp = await response.json();
      // console.log(temp.data);

      $("#user_name").text(temp.data.fname);
      $("#like_count").text(temp.data.likeCount);
    } catch (error) {
      // console.log(error);
    }
  };

  getUserDetails();
});
