function registerUser() {
  let name = document.getElementById('registerName').value
  let email = document.getElementById('registerEmail').value
  let pass = document.getElementById('registerPassword').value
  let rpass = document.getElementById('registerRPassword').value
  let description = document.getElementById('registerDescription').value


  if (name == "") {
    let txt = "Name field is empty!"
    showError(txt)
    return
  }
  if (email == "") {
    let txt = "Email field is empty!"
    showError(txt)
    return
  }
  if (pass == "") {
    let txt = "Password field is empty!"
    showError(txt)
    return
  }
  if (rpass == "") {
    let txt = "Repeat password field is empty!"
    showError(txt)
    return
  }
  if (description == "") {
    let txt = "Description field is empty!"
    showError(txt)
  }
  if (pass != rpass) {
    let txt = "Passwords do not match!"
    showError(txt)
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

function showError(txt) {
  let output = document.getElementById("registerOutput")
  output.textContent = ""
  let span = document.createElement("span")
  span.textContent = (txt)
  output.appendChild(span)
}
