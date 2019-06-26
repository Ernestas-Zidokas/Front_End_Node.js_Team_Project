let openPost = document.getElementById('post');
openPost.addEventListener('click', event => {
  console.log('openPost');
  let post = {
    title: 'alus',
    src: 'pictures/1234.jpg',
    likes: 20,
    comments: [
      {
        text:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        postID: '12345654',
        creator: 'somebody',
      },
      {
        text:
          'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.',
        postID: '1234222',
        creator: 'somebody1',
      },
      {
        text:
          'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        postID: '12345333',
        creator: 'somebody2',
      },
    ],
  };
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

  let likes = document.createElement('div');
  likes.setAttribute('style', 'padding-right: 322px; margin-bottom: 20px;');
  likes.textContent = `${post.likes} People Likes That`;

  modalHeader.appendChild(modalTitle);
  modalBody.appendChild(image);
  modalBody.appendChild(likes);
  modalBody.appendChild(renderComments(post.comments));

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  return modal;
}

function renderComments(arrayOfObjects) {
  let commentsList = document.createElement('div');
  commentsList.setAttribute('style', 'display:flex; flex-direction: column;');
  arrayOfObjects.forEach(object => {
    let comment = document.createElement('div');
    comment.setAttribute('style', 'display:flex; flex-direction: row;');

    let commentText = document.createElement('p');
    commentText.setAttribute('style', 'margin-left: 10px; text-align: justify;');
    commentText.textContent = object.text;

    let commentCreator = document.createElement('a');
    commentCreator.href = object.creator;
    commentCreator.innerHTML = object.creator;

    comment.appendChild(commentCreator);
    comment.appendChild(commentText);
    commentsList.appendChild(comment);
  });
  return commentsList;
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
