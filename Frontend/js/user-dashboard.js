$(document).ready(() => {
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
                <div class="quote_like_count">
                   ${post.likeCount}
                  </div>
              </div>
              <div class="post-right">
                <div class="name">${post.first_name}</div>
              </div>
            </div>
          </div>
        </div>
      `);

        if (post.isLiked) {
          $(`#${post._id}`).css("background-color", "red");
        }
      });

      $(".like").click(async function (event) {
        // console.log("clicked");

        // console.log(postIsLiked);

        const postId = $(event.currentTarget).attr("id");

        // temp.data.map((value) => {
        //   if (value._id == postId) {
        //     if (value.isLiked == true) postIsLiked = true;
        //   }
        // });

        const likeThis = async () => {
          try {
            let response = await fetch("https://quotequill.onrender.com/like", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: postId,
                email: Cookies.get("email"),
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
            // console.log(error);
          }
        };

        likeThis();
      });
    } catch (error) {
      // console.log(error);
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
        let first_name = "Ankit R.";
        let email = Cookies.get("email");

        let response = await fetch("https://quotequill.onrender.com/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            message,
            date,
            isLiked,
            first_name,
            email,
          }),
        });

        //   alert("data sent");
        const temp = await response.json();
        // console.log(temp);

        if (temp.success) {
          alert(temp.message);
          //   $(".guest-login-btn").prop("disabled", false);
          //   displayPost();
          $("#post-modal").modal("hide");

          // $.toast({
          //   heading: "Success",
          //   text: "Aa",
          //   icon: "success",
          // });

          // sessionStorage.setItem("toastMessage", "Posted");
          // window.location.reload();

          window.location.href = "user-dashboard.html";
        } else {
          alert(temp.message);
        }
      } catch (error) {
        // console.log(error);
      }
    };

    post();
  });
});
