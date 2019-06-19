function registerUser() {
  let email = document.getElementById('registerEmail').value
  let pass = document.getElementById('registerPassword').value
  let rpass = document.getElementById('registerRPassword').value

  if (pass != rpass) {
    alert("Passwords do not match")
    return
  }

  (async () => {
    const rawResponse = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    });

    const content = await rawResponse.json();

    if (content._id) {
      location.replace("http://localhost:8080/login.html")
    } else {
      alert(content)
    }
  })();
}