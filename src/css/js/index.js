const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

const BASE_URL = 'https://api.github.com';

inputSearch.addEventListener('keyup', (e) => {
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        getUserProfile();
    }
});

async function getUserProfile() {
    const userName = inputSearch.value;

    if (userName) {
        profileResults.innerHTML = '<p class="loading">Carregando...</p>';

        try{
        const response = await fetch(`${BASE_URL}/users/${userName}`);

        if (!response.ok) {
            profileResults.innerHTML = '';
            alert('Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.');
            return;
        }
        const data = await response.json();
        console.log(data); 

        profileResults.innerHTML = '<div class="profile-card">' +
            `<img src="${data.avatar_url}" alt="${data.name || data.login}'s avatar" class="profile-avatar">` +
            `<div class="profile-info">` +
            `<h2>${data.name || data.login}</h2>` +
            `<p>${data.bio || 'Sem biografia disponível.'}</p>` +
            `<p><strong>Repositórios públicos:</strong> ${data.public_repos}</p>` +
            `<p><strong>Seguidores:</strong> ${data.followers}</p>` +
            `<p><strong>Seguindo:</strong> ${data.following}</p>` +
            `</div>` +
            '</div>';

        }
            catch(error){
                profileResults.innerHTML = '';
                console.error('Erro ao processar os dados do usuário:', error);
                alert('Ocorreu um erro ao processar os dados do usuário. Por favor, tente novamente mais tarde.');
            }

    } else {
        alert('Por favor, digite um nome de usuário do GitHub.');
    }
}

btnSearch.addEventListener('click', () => {
    getUserProfile();
});

