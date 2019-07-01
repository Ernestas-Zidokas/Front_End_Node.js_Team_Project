window.addEventListener('load', () => {
    fetch('Reikia url su user id', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem('website-x-auth-token'),
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        createUserProfile(data);
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  });
  

  function createUserProfile(data) {
    //   let userProfile = document.getElementById('user')
    let userPhoto = document.createElement('div');
    let photo = document.createElement('img');
    let userInfo = document.createElement('div');
    let userName = document.createElement('h1');
    let userDescription = document.createElement('p');

    userPhoto.className = 'profile-photo';
    userInfo.className = 'user-info';
    userName.className = 'profile-user-name';
    userDescription.className = 'about-name';

    userName.textContent = data.name;
    userDescription.textContent = data.description;
  }