$(document).ready(() => {
  if (sessionStorage.getItem("toastMessage")) {
    $.toast({
      heading: "Success",
      text: sessionStorage.getItem("toastMessage"),
      icon: "success",
    });

    sessionStorage.removeItem("toastMessage");
  }

  if (Cookies.get("email")) {
  } else {
    //   alert("login first");
    window.location.href = "admin-login.html";
  }
  $(".logout-admin").click(() => {
    sessionStorage.setItem("toastMessage", "Logout Succesful");

    Cookies.remove("email");
    window.location.href = "index.html";
  });

  const retrive = async () => {
    try {
      let response = await fetch("https://quotequill.onrender.com/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // alert("data sent");
      const temp = await response.json();
      // console.log(temp.data[0]);

      $(".total").append(` <h3>${temp.data.length}</h3>`);

      temp.data.map((user, index) => {
        $(".tbody").append(`<tr>
          <th scope="row">${index + 1}</th>
          <td>${user.fname}</td>
          <td>${user.lname}</td>
          <td>${user.email}</td>
          <td>${user.last_login}</td>
          <td>${user.status}</td>
          <td><div class="action">
          <svg xmlns="http://www.w3.org/2000/svg" id = ${
            user._id
          } height="20" width="17.5" class="delete-icon" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff3300" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          
          <svg xmlns="http://www.w3.org/2000/svg" class = "edit-icon" height="20" width="25" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg></div></td>
        </tr>`);
      });

      $(".delete-icon").click(async function (event) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            var id = $(event.currentTarget).attr("id");
            console.log("id", id);

            const remove = async () => {
              try {
                let response = await fetch(
                  "https://quotequill.onrender.com/remove-user",
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id,
                    }),
                  }
                );

                const temp = await response.json();
                console.log(temp);

                Swal.fire("Removed!", "", "success");
                window.location.reload();
              } catch (error) {
                console.log(error);
              }
            };

            remove();

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      });

      // $(".data").append(temp.data[0].fname);
    } catch (error) {
      console.log(error);
    }
  };

  retrive();
});
