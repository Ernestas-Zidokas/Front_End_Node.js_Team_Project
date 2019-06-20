function login() {
  let email = document.getElementById('loginEmail').value;
  let pass = document.getElementById('loginPassword').value;

  fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    }).then(res => {
      localStorage.setItem('website-x-auth-token', res.headers.get('x-auth'))
      return res.json()
    })
    .then(data => {
      console.log(data)
      if (data == 'No user with this email'){
        alert('No user with this email')
      } else if (data == 'incorrect password') {
        alert('incorrect password')
      } else {
        location.replace("http://localhost:8080/instaFeed.html")
      }
    })
    .catch((err) => {
      console.log(err)
    })

}
