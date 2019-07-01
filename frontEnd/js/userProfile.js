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
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};
