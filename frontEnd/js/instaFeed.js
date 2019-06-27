window.addEventListener('load', () => {
  fetch('http://localhost:3000/api/getLastTenPosts', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth': window.localStorage.getItem('website-x-auth-token'),
    },
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      createInstaFeed(data);
      return data;
    })
    .catch(err => {
      console.log(err);
    });
});


function createInstaFeed(data) {
  let instaFeed = document.getElementById('post');
  instaFeed.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    let singlePost = document.createElement('p');
    let postHeader = document.createElement('h4');
    let postTitle = document.createElement('span');
    let postCreator = document.createElement('span');
    let postImage = document.createElement('img');
    let postInfo = document.createElement('div');
    let postLikes = document.createElement('span');
    let postComments = document.createElement('span');
    let line = document.createElement('div');
    line.className = 'line';

    singlePost.className = 'singlePost';
    postHeader.className = 'postHeader';
    postImage.className = 'postImage';
    postTitle.className = 'postTitle';
    postCreator.className = 'postCreator';
    postInfo.className = 'postInfo';
    postLikes.className = 'likesAndComments';
    postComments.className = 'likesAndComments';

    postTitle.textContent = data[i].title;
    postCreator.textContent = data[i].creator.name;
    postImage.src = data[i].photo;
    postImage.dataset.target = '#exampleModal';
    postImage.dataset.toggle = 'modal';

    postHeader.appendChild(postTitle);
    postHeader.appendChild(postCreator);

    singlePost.appendChild(postHeader);
    singlePost.appendChild(postImage);

    postInfo.appendChild(postLikes);
    postLikes.textContent = '♥️ ' + data[i].likesCount;

    postInfo.appendChild(postComments);
    postComments.textContent = '💬' + '12';

    singlePost.appendChild(postInfo);

    instaFeed.appendChild(singlePost);

    instaFeed.appendChild(line);

    postCreator.addEventListener('click', event => {
      console.log('Post creator: ' + data[i].creator);
    });
    postImage.addEventListener('click', event => {
      document.querySelector('#test').appendChild(openPhoto(data[i]));
    });
    postLikes.addEventListener('click', event => {
      console.log('Like skaicius ' + data[i].likesCount);
    });
    postComments.addEventListener('click', event => {
      console.log('kolkas negaunu duomenu susijusiu su komentarais');
    });
  }
}

function openPhoto(post) {
  document.querySelector('#test').innerHTML = '';
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
  console.log(post.photo);
  image.src = post.photo;
  image.classList.add('big-picture');

  let modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  let likes = document.createElement('div');
  likes.addEventListener('click', setLikesCount => {
    likes.innerHTML = ' ';
    fetch(`http://localhost:3000/api/setLikesCount/${post._id}`, {
      method: 'PUT',
      headers: {
        'x-auth': window.localStorage.getItem('website-x-auth-token'),
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        likes.textContent = '♥️ ' + (post.likesCount + data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  likes.setAttribute('style', 'padding-right:433 px; margin-bottom: 20px;');
  console.log(post.likesCount);
  if (post.likesCount != null) {
    likes.textContent = `♥️ ${post.likesCount}`;
  } else {
    likes.textContent = `♥️ 0`;
  }

  modalHeader.appendChild(modalTitle);
  modalBody.appendChild(image);
  modalBody.appendChild(likes);
  modalBody.appendChild(renderComments(post));

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);

  //Creating comment input zygis arnas
  let modalCommentInput = document.createElement("div");
  let modalInput = document.createElement("input");
  let modalButton = document.createElement("button");
  modalButton.innerHTML = "Post";
  modalInput.className = "modalInput";
  modalInput.placeholder = "Add a comment...";
  modalButton.className = "modalButton";
  modalCommentInput.appendChild(modalInput);
  modalCommentInput.appendChild(modalButton);
  modalButton.addEventListener("click", event => {
    fetch('http://localhost:3000/api/createComments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth': window.localStorage.getItem('website-x-auth-token'),
    },
    body: JSON.stringify({
      text: modalInput.value,
      postID: post._id,
    }),
  })
    .then(res => {
      return res.json();
    })
    .then(item => {
                                
    })
    .catch(err => {
      console.log(err);
    });
});
  modalBody.appendChild(modalCommentInput);




  modal.appendChild(modalDialog);
  return modal;
}

function renderComments(data) {
  let commentsList = document.createElement('div');
  fetch(`http://localhost:3000/api/getPostCommentsById/${data._id}`, {
    method: 'GET',
    headers: {
      'x-auth': window.localStorage.getItem('website-x-auth-token'),
    },
  })
    .then(res => {
      return res.json();
    })
    .then(arrayOfObjects => {
      commentsList.setAttribute('style', 'display:flex; flex-direction: column;');
      arrayOfObjects.forEach(object => {
        let comment = document.createElement('div');
        comment.setAttribute('style', 'display:flex; flex-direction: row;');

        let commentText = document.createElement('p');
        commentText.setAttribute('style', 'margin-left: 10px; text-align: justify;');
        commentText.textContent = object.text;

        let commentCreator = document.createElement('a');
        commentCreator.href = object.creator;
        commentCreator.textContent = data.creator.name            

        comment.appendChild(commentCreator);
        comment.appendChild(commentText);
        commentsList.appendChild(comment);
      });
    })
    .catch(err => {
      console.log(err);
    });

  return commentsList;
}

let modal = document.getElementById('myModal');
let btn = document.getElementById('addPost');
let span = document.getElementsByClassName('close')[0];
btn.onclick = function() {
  modal.style.display = 'block';
};
span.onclick = function() {
  modal.style.display = 'none';
};
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
    .then(item => {
      console.log(item);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

