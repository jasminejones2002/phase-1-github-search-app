document.addEventListener('DOMContentLoaded', (e) => {
    const formSearch = document.querySelector('#github-form')
    const searchInput = document.querySelector('#search');
    const results = document.querySelector('#github-container')

    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();

        const search = searchInput.value;

        fetch('https://api.github.com/search/users?q=octocat')
            .then(res => res.json())
            .then(data => {
                displayUsers(data.items);
            })
            .catch(error => {
                console.log('error', error);
            });
    });

  function displayUsers(users) {
    results.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
        <h3>$user.login<h3>
        <img src="${user.avatar_url}" alt="User avatar" width="100">
        <a href="${user.html_url}" target="_blank">Profile</a>
        `;

        userDiv.addEventListener('click', function() {
            const userReposUrl = `https://api.github.com/users/${user.login}/repos`;
      
            fetch(userReposUrl)
              .then(response => response.json())
              .then(data => {
                displayRepos(data);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          });

          results.appendChild(userDiv);
    })
  }

  function displayRepos(repos) {
    results.innerHTML = '';

    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;

        results.appendChild(repoDiv);
    })
  }
})