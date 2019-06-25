let openPost = document.getElementById('post');
openPost.addEventListener('click', event => {
  let post = { title: 'alus', src: 'pictures/1234.jpg' };
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
  modalHeader.classList.add('big-picture');

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(image);
  modalContent.appendChild(modalHeader);
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
