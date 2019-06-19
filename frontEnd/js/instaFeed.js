let token;

window.addEventListener('load', () => {
  if (!localStorage.getItem('website-x-auth-token')) {
    location.replace("http://localhost:8080/login.html")
  } else {
    token = localStorage.getItem('website-x-auth-token')
  }
  getAllItems()
});

function createItem() {
  let title = document.getElementById('newItem').value
  if (!title) {
    alert("Cant create empty item")
    return
  }

  fetch('http://localhost:3000/api/toDoItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': token
      },
      body: JSON.stringify({
        title
      })
    }).then(res => {
      return res.json()
    })
    .then(data => {
      getAllItems()
    })
    .catch((err) => {
      console.log(err)
    })
}

function getAllItems() {
  fetch('http://localhost:3000/api/toDoItem', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': token
      }
    }).then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      createElements(data)
    })
    .catch((err) => {
      console.log(err)
    })
}

function createElements(data) {
  let ul = document.getElementById("list")
  ul.innerHTML = ''
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
    if (data[i].checked) li.classList.add('list-group-item-success')
    li.textContent = data[i].title
    let span = document.createElement('span')
    span.classList.add('badge', 'badge-danger', 'badge-pill')
    span.innerHTML = '<ion-icon name="close"></ion-icon>'
    li.appendChild(span)
    ul.appendChild(li)
  }
}