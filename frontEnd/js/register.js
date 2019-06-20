function registerUser() {
  let name = document.getElementById('registerName').value
  let email = document.getElementById('registerEmail').value
  let pass = document.getElementById('registerPassword').value
  let rpass = document.getElementById('registerRPassword').value
  let description = document.getElementById('registerDescription').value


  if (name == "") {
    alert("Name field is empty")
    return
  }
  if (email == "") {
    alert("Email field is empty")
    return
  }
  if (pass == "") {
    alert("Password field is empty")
    return
  }
  if (rpass == "") {
    alert("Repeat password field is empty")
    return
  }
  if (description == "") {
    alert("Description field is empty")
  }
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
        name: name,
        email: email,
        password: pass,
        passwordAgain: rpass,
        description: description
      })
    });

    const content = await rawResponse.json();
    console.log(content);

    if (content._id) {                                                          //ka sitas daro?
      location.replace("http://localhost:8080/login.html")
    } else {
      alert(content)
    }
  })();
}
