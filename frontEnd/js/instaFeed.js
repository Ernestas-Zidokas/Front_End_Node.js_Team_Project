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
