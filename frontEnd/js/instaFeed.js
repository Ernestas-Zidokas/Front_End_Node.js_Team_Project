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
      postImage.src = data[i].photo

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

let openPost = document.getElementById('post');
openPost.addEventListener('click', event => {
  console.log('openPost');
  let post = { title: 'alus', src: 'pictures/1234.jpg', likes: '20', comments: 'comantarais' };
  document.querySelector('#test').appendChild(openPhoto(post));
});

function openPhoto(post) {
  let modal = document.createElement('div');
  modal.classList.add('modal');
  modal.tabIndex = '-1';
  modal.role = 'dialog';
  modal.id = 'exampleModal';

  let modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.role = 'document';

  let modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  let modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  let modalTitle = document.createElement('h5');
  modalTitle.textContent = post.title;

  let image = document.createElement('img');
  image.src = post.src;
  image.classList.add('big-picture');

  let modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  let likes = document.createElement('p');
  likes.textContent = post.likes;

  let comments = document.createElement('p');
  comments.textContent = post.comments;

  modalHeader.appendChild(modalTitle);
  modalBody.appendChild(image);
  modalBody.appendChild(likes);
  modalBody.appendChild(comments);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  return modal;
}

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
