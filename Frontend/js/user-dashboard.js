$(document).ready(() => {
  // console.log("active");

  // if (!Cookies.get("email")) {
  //   alert("Login first");
  //   window.location.href = "index.html";
  // }

  $("#logout").click(() => {
    sessionStorage.setItem("toastMessage", "Logout Succesful");

    Cookies.remove("email");
    Cookies.remove("authToken");
    window.location.href = "index.html";
  });

  const displayPost = async () => {
    try {
      let response = await fetch("https://quotequill.onrender.com/displayPost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      //   alert("data sent");
      const temp = await response.json();
      // console.log(temp.data);

      temp.data.reverse();
      // console.log(temp.data[3]._id);

      temp.data.map((post) => {
        $(".quotes").append(`
          <div class="col-md-4">
          <div class="left-post">
            <div class="post-title">
              <h4>
                <i class="fa fa-quote-left fa-3x fa-pull-left"></i> ${post.title}
              </h4>
            </div>
            <div class="post-desc" id="textToCopy">
            ${post.message}
            </div>
            <div class="post-bottom">
              <div class="bottom-left">
                <div class="like" id=${post._id}>
                  <i class="fa fa-heart"></i>
                </div>
                <div class="copy" id="copyButton">
                  <i class="copy-icon fa fa-copy fa-1x"></i>
                </div>
              </div>
              <div class="post-right">
                <div class="name">${post.name}</div>
              </div>
            </div>
          </div>
        </div>
      `);

        if (post.isLiked == true) {
          $(`#${post._id}`).css("color", "red");
        }
      });

      $(".like").click(async function (event) {
        // console.log("clicked");

        const postId = $(event.currentTarget).attr("id");
        let postIsLiked = false;

        temp.data.map((value) => {
          if (value._id == postId) {
            if (value.isLiked == true) postIsLiked = true;
          }
        });

        const likeThis = async () => {
          try {
            let response = await fetch("https://quotequill.onrender.com/like", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                postIsLiked,
                id: postId,
              }),
              credentials: "include",
            });

            // alert("liked");
            const temp = await response.json();
            // console.log(temp);

            if (temp.success) {
              // alert(temp.message);
            } else {
              alert(temp.message);
            }

            location.reload();
          } catch (error) {
            console.log(error);
          }
        };

        likeThis();
      });
    } catch (error) {
      console.log(error);
    }
  };

  displayPost();

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
          credentials: "include",
        });

        //   alert("data sent");
        const temp = await response.json();
        console.log(temp);

        if (temp.success) {
          alert(temp.message);
          //   $(".guest-login-btn").prop("disabled", false);
          //   displayPost();
          sessionStorage.setItem("toastMessage", "Posted");
          window.location.href = "user-dashboard.html";
        } else {
          alert(temp.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    post();
  });
});
