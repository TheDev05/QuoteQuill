$(document).ready(() => {
  // console.log("profile started");

  if (!Cookies.get("email")) {
    alert("Login first");
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

      const data = temp.data[0].posts;
      // console.log(data);

      $("#user_name").append(data[0].first_name);
      $("#post_count").append(data.length);
      // console.log(data.length);

      data.map((post) => {
        $(".quotes").append(`
            <div class="col-md-4">
            <div class="left-post">
              <div class="post-title">
                <h4>
                  <i class="fa fa-quote-left fa-3x fa-pull-left"></i> ${post.title}
                </h4>
              </div>
              <div class="post-desc">
              ${post.message}
              </div>
              <div class="post-bottom">
                <div class="bottom-left">
                  <div class="like">
                    <i class="fa fa-heart"></i>
                  </div>
                  <div class="quote_like_count">
                   2.3k+
                  </div>
                </div>
                <div class="post-right">
                  <div class="quote_delete" id=${post._id}>
                  <i class="fa fa-trash"></i>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        `);
      });

      $(".quote_delete").click(function () {
        // console.log("deleet clicked");
        // console.log($(this).attr("id"));

        const removePost = async () => {
          try {
            let email = data[0].email;
            let id = $(this).attr("id");

            const response = await fetch("https://quotequill.onrender.com/removePost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                id,
              }),
              credentials: "include",
            });

            const temp = await response.json();
            alert(temp.message);
            location.reload();

            // console.log(temp);
          } catch (error) {
            // console.log(error);
          }
        };

        removePost();
      });
    } catch (error) {
      // console.log(error);
    }
  };

  fetch_posts();
});
