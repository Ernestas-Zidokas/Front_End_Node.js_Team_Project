window.addEventListener('load', () => {
  // if (!localStorage.getItem('website-x-auth-token')) {
  //   location.replace("http://localhost:8080/login.html")
  // } else {
  //    let token = localStorage.getItem('website-x-auth-token')
  // }
  // getAllItems()
});

// function createItem() {
//   let title = document.getElementById('newItem').value
//   if (!title) {
//     alert("Cant create empty item")
//     return
//   }

//   fetch('http://localhost:3000/api/toDoItem', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-auth': token
//       },
//       body: JSON.stringify({
//         title
//       })
//     }).then(res => {
//       return res.json()
//     })
//     .then(data => {
//       getAllItems()
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.getElementById('addPost');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

document.querySelector('#createPost').addEventListener('click', () => {
  let postTitle = document.querySelector('#postTitle').value;
  let photo = document.querySelector('#avatar');

  let data = new FormData();
  data.append('avatar', photo.files[0]);
  data.append('title', postTitle);

  fetch('http://localhost:3000/api/createPost', {
    method: 'POST',
    headers: {
      'x-auth': window.localStorage.getItem('website-x-auth-token'),
    },
    body: data,
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});
