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


//mano creteElements funkcija
function createElements(data) {
  let ul = document.getElementById("list")
  ul.innerHTML = ""
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li")


    li.textContent = data[i].title
    let span = document.createElement("span")
    span.classList.add("badge", "badge-danger", "badge-pill")
    span.innerHTML = '<ion-icon name="close"></ion-icon>'
    li.appendChild(span)
    ul.appendChild(li)

    //bandysiu kurti done undone
    let doneBtn = document.createElement("span")  //buvo button
    data[i].checked ? doneBtn.textContent = '✔️' : doneBtn.textContent = '❌'
    li.appendChild(doneBtn)
    doneBtn.addEventListener("click", event => {
      console.log(data[i]._id)
      if (data[i].checked) {
        console.log("seleted false")
        doneBtn.textContent = '❌'
        data[i].checked = false
      } else {
        console.log("selected true")
        doneBtn.textContent = '✔️'
        data[i].checked = true
      }
      fetch(`http://localhost:3000/api/toDoItem/${data[i]._id}`, {
         method: 'PUT',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'x-auth': token
         }
       }).then(res => {
         return res.json()
       })
       .then(data => {
         console.log(data);
       })
       .catch((err) => {
         console.log(err)
       })
    })
  }
}
