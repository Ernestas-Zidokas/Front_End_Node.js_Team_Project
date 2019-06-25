function login() {
  let email = document.getElementById('loginEmail').value;
  let pass = document.getElementById('loginPassword').value;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  })
    .then(res => {
      localStorage.setItem('website-x-auth-token', res.headers.get('x-auth'));
      return res.json();
    })
    .then(data => {
      if (email == '') {
        let txt = 'Empty email field!';
        showError(txt);
      } else if (pass == '') {
        let txt = 'Empty password field!';
        showError(txt);
      } else if (data == 'No user with this email') {
        let txt = 'No user with this email!';
        showError(txt);
      } else if (data == 'incorrect password') {
        let txt = 'Incorrect password or email!';
        showError(txt);
      } else {
        location.replace('http://localhost:8080/instaFeed.html');
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function showError(txt) {
  let output = document.getElementById('registerOutput');
  output.textContent = '';
  let span = document.createElement('span');
  span.textContent = txt;
  output.appendChild(span);
}
