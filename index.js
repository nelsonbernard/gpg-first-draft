const menu = document.getElementById('dropdown-menu');
const ul = document.querySelector('nav ul');
const platformDropButton = document.getElementById('dropbtn');
const platformDropContent = document.getElementById('platform-content')
const pul = document.querySelector('nav ul li ul');
const gameGrid = document.getElementById('game-grid');
const platformName = document.getElementById('platform-name');
const platformLinks = document.getElementsByClassName('platform-link');

menu.addEventListener('click', () => {
    ul.classList.toggle('show');
});

platformDropButton.addEventListener('click', () => {
    console.log('Platform dropdown clicked!');
    platformDropContent.classList.toggle('show');
})

// function addEvents(){
//     for(var i = 0; i < platformLinks.length; i++){
//         platformLinks[i].addEventListener('click', () => {
//             getConsoles(platformLinks[i].getAttribute('id'));
//         })
//     }
// }

function getConsoles(consoleid, consoleName){
    
    platformDropContent.classList.toggle('show');
    platformName.innerHTML = consoleName.toString();

    axios.post('http://www.nelsonbernard.com/gpgapp/phpscripts/gamesbyconsole.php', {
        consoleid: consoleid
    })
    .then(function(res) { console.log(res);
        removeAllChildNodes(gameGrid);
        res.data.result.map(game => {
            var divFeature = document.createElement('div');
            divFeature.setAttribute('class', 'feature');

            var divGameCard = document.createElement('div');
            divGameCard.setAttribute('class', 'game-card');
            
            var img = document.createElement('img');
            img.setAttribute('class', 'game-pic')
            img.setAttribute('src', 'http://www.nelsonbernard.com/gpgapp/images/' + consoleid + '/' + game.image);
            divGameCard.appendChild(img);

            var divGameInfo = document.createElement('div');
            divGameInfo.setAttribute('class', 'game-info');

            var title = document.createElement('div');
            title.setAttribute('class', 'title');
            title.innerText = game.name;

            divGameInfo.appendChild(title);

            divFeature.appendChild(divGameCard);
            divFeature.appendChild(divGameInfo);
            
            return document.getElementById('game-grid').appendChild(divFeature);
        });})
    .catch(err => console.error(err));
}

function getConsoleList(){
    axios.post('http://www.nelsonbernard.com/gpgapp/phpscripts/consolelist.php')
    .then(response => {
        response.data.result.map(platform => {
            var ul = document.getElementById("platform-content");
            // var li = document.createElement('li');
            var link = document.createElement('a');
            link.setAttribute('class', 'platform-link');
            link.setAttribute('href', '#');
            link.appendChild(document.createTextNode(platform.name));
            // li.appendChild(document.createTextNode(platform.name));
            link.setAttribute("id", platform.consoleid);

            link.addEventListener('click', () => {
                console.log(platform.consoleid);
                getConsoles(link.getAttribute('id'), platform.name);
            });

            ul.appendChild(link);
        });

        console.log(response);
    })
}

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

getConsoleList();
// getConsoles('super-nintendo', 'Super Nintendo');