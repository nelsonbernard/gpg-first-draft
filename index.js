const menu = document.getElementById('dropdown-menu');
const ul = document.querySelector('nav ul');

console.log(menu);

menu.addEventListener('click', () => {
    ul.classList.toggle('show');
});

function getConsoles(consoleid){
    axios.post('http://www.nelsonbernard.com/gpgapp/phpscripts/gamesbyconsole.php', {
        consoleid: consoleid
    })
    .then(function(res) {console.log(res); 
        res.data.result.map(game => {
            var divGameCard = document.createElement('div');
            divGameCard.setAttribute('class', 'game-card');
            
            var divGamePic = document.createElement('div');
            divGamePic.setAttribute('class', 'image-box');
            var img = document.createElement('img');
            img.setAttribute('class', 'game-pic')
            img.setAttribute('src', 'http://www.nelsonbernard.com/gpgapp/images/' + consoleid + '/' + game.image);
            divGamePic.appendChild(img);

            var divGameInfo = document.createElement('div');
            divGameInfo.setAttribute('class', 'game-info');
            var divGameTitle = document.createElement('div');
            divGameTitle.setAttribute('class', 'game-title');
            
            divGameCard.appendChild(divGamePic);
            
            // var divGameInfo = document.createElement('div');
            // divGameInfo.setAttribute('class', 'game-info');
            // var divGameTitle = document.createElement('div');
            // divGameTitle.setAttribute('class', 'game-title');
            // divGameTitle.innerText = game.name;
            // divGameInfo.appendChild(divGameTitle);
            
            // divGameCard.appendChild(divGameInfo);
            
            return document.getElementById('game-grid').appendChild(divGameCard);
        });})
    .catch(err => console.error(err));
}

getConsoles('super-nintendo');