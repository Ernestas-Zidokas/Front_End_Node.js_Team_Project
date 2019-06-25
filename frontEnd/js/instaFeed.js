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

let openPost = document.getElementById('post');
openPost.addEventListener('click', event => {
  // let name = document.getElementById('name');
  // let phone = document.getElementById('phone');
  // let object = { name: name.value, phone: phone.value, isEdit: false, isFav: false };
  // addressBook.push(object);
  // console.log(addressBook);

  // clearList();
  // document.getElementById('safeplace').appendChild(render());
  // window.localStorage.setItem('list', JSON.stringify(addressBook));
  // console.log(addressBook);
  console.log('openPost');
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
