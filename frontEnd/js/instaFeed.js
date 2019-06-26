//window.addEventListener('load', () => {
  // if (!localStorage.getItem('website-x-auth-token')) {
  //   location.replace("http://localhost:8080/login.html")
  // } else {
  //    let token = localStorage.getItem('website-x-auth-token')
  // }
  // getAllItems()
//});

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
window.addEventListener('load', () => {
  createInstaFeed()
});



fetch('http://localhost:3000/api/getLastTenPosts', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data)
    createInstaFeed(data)
    return data

  })
  .catch((err) => {
    console.log(err)
  })

  function createInstaFeed(data) {
    let instaFeed = document.getElementById("post")
    instaFeed.innerHTML = ""
    //let image = document.getElementById("image")
    //singlePost.innerHTML = "hhhhhhhhhhhhhhhh"
    for (let i = 0; i < data.length; i++) {
      let singlePost = document.createElement("p")
      let postHeader = document.createElement("h4")
      let postCreator = document.createElement("span")
      let postTitle = document.createElement("span")
      let postImage = document.createElement("img")
      let postInfo = document.createElement("div")
      let postLikes = document.createElement("span")
      let postComments = document.createElement("span")
      let postNewestComment = document.createElement("div")

      singlePost.className = "singlePost"
      postHeader.className = "postHeader"
      postCreator.className = "postCreator"
      postTitle.className = "postTitle"
      postInfo.className = "postInfo"
      postLikes.className = "likesAndComments"
      postComments.className = "likesAndComments"
      postNewestComment.className = "postNewestComment"

      postCreator.textContent = data[i].creator
      postTitle.textContent = data[i].title
      postImage.src = "https://images.unsplash.com/photo-1468413253725-0d5181091126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

      postHeader.appendChild(postCreator)
      postHeader.appendChild(postTitle)

      singlePost.appendChild(postHeader)
      singlePost.appendChild(postImage)

      postInfo.appendChild(postLikes)
      postLikes.textContent = "♥️ " + data[i].likesCount

      postInfo.appendChild(postComments)
      postComments.textContent = "💬" +  "12"

      singlePost.appendChild(postInfo)
      singlePost.appendChild(postNewestComment)
      postNewestComment.textContent = data[i].creator + " - " + data[i].date + " - " + data[i].title

      instaFeed.appendChild(singlePost)

      postCreator.addEventListener("click", event => {
        console.log("Post creator: " + data[i].creator)
      })
      postImage.addEventListener("click", event => {
        console.log("Post title: " + data[i].title)
      })
      postLikes.addEventListener("click", event => {
        console.log("Like skaicius " + data[i].likesCount)
      })
      postComments.addEventListener("click", event => {
        console.log("kolkas negaunu duomenu susijusiu su komentarais")
      })
    }
  }
