window.addEventListener('load', event => {
  let userId = window.location.search.substring().split('?')[1];
  getUser(userId);
  getPosts(userId);
});

const getUser = userId => {
  fetch(`http://localhost:3000/api/getUser/${userId}`, {
    method: 'GET',
    headers: {
      'x-auth': window.localStorage.getItem('website-x-auth-token'),
    },
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      createUserProfile(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const getPosts = userId => {
  fetch(`http://localhost:3000/api/getPostsByCreator/${userId}`, {
    method: 'GET',
    headers: {
      'x-auth': window.localStorage.getItem('website-x-auth-token'),
    },
  })
    .then(res => res.json())
    .then(data => {
      createUserGallery(data);
    })
    .catch(err => {
      console.log(err);
    });
};

function createUserProfile(data) {
  let userProfile = document.createElement('div');
  let userPhoto = document.createElement('div');
  let photo = document.createElement('img');
  let userInfo = document.createElement('div');
  let userName = document.createElement('h1');
  let userDescription = document.createElement('p');

  userProfile.className = 'profile';
  userPhoto.className = 'profile-photo';
  photo.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLlAihMWo4rBQiln8Fhh-lXTTIJz_GKV_fvmRNa7oV1_I_dEZ';
  userInfo.className = 'user-info';
  userName.className = 'profile-user-name';
  userDescription.className = 'about-user';

  userName.textContent = data[0].name;
  userDescription.textContent = data[0].description;

  userPhoto.appendChild(photo);
  userProfile.appendChild(userPhoto);
  userInfo.appendChild(userName);
  userInfo.appendChild(userDescription);
  userProfile.appendChild(userInfo);
  document.querySelector('.container').appendChild(userProfile);
}

function createUserGallery(data){
    data.forEach(posts => {
      let postItem = document.createElement('div');
      let postPhoto = document.createElement('img');
      let photoInfo = document.createElement('div');
      let photoList = document.createElement('ul');
      let photoLikes = document.createElement('li');
      let photoComments = document.createElement('li');

      postItem.className = 'gallery-item';
      postPhoto.className = 'gallery-image square';
      photoInfo.className = 'gallery-item-info';
      photoLikes.className = 'gallery-item-likes';
      photoComments.className = 'gallery-item-comments';

      photoLikes.textContent = posts.likesCount;
      postPhoto.src = posts.photo;

      postItem.appendChild(postPhoto);
      document.querySelector('.gallery').appendChild(postItem);
      photoList.appendChild(photoLikes);
      photoList.appendChild(photoComments);
      photoInfo.appendChild(photoList);
      postItem.appendChild(photoInfo);
      document.querySelector('.gallery').appendChild(postItem);
    });
}

