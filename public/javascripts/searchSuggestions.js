var html=""
function findMatches(wordToMatch,players) {
        return players.filter(player=>{
            // here we need to figure out if the city or state matches what was searched
            const regex= new RegExp(wordToMatch,'gi');
            // return player.full_name.match(regex) || player.name.match(regex);
            return (player.full_name.match(regex) || player.name.match(regex));
        })
    }
    let resultsCount=0;
function displayMatches() {
    const matchArray=findMatches(this.value,players);
        html=matchArray.map(player=>{
    if(this.value=="") return;

    const regex = new RegExp(this.value, 'gi');
    const playerFullName=player.full_name.replace(regex,`<span class="hl">${this.value}</span>`);
    const playerName=player.name.replace(regex,`<span class="hl">${this.value}</span>`);
    let playerPhoto=player.photo;
    
    if(player.photo==null)  playerPhoto="images/default-picture.png";

        // <a class="search__suggestion__link" href="/">${player.id}<img class="player__img" src="https://www.espncricinfo.com/inline/content/image/1220600.html"></img><p class="player__name"><span>MS</span> Dhoni </p> <p class="player__fullName"> Mahendra Singh Dhoni </p>  </a>
        return`
        <a class="search__suggestion__link" href="players/${player.id}"> <img class="player__img" src="${playerPhoto}"></img><p class="player__name">${playerName}</p> <p class="player__fullName">${playerFullName} , ${player.country}</p></a>
            `  
    }).join('');

    if(html=="")
    {
        // console.log("No result found");
        searchInput.style.borderRadius="24px";
    }
    else{
        
        searchInput.style.borderBottomLeftRadius=0;
        searchInput.style.borderBottomRightRadius=0;
    }    
    suggestions.innerHTML=html;

}

const searchInput = document.querySelector('#search__input');
const suggestions = document.querySelector('#suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// Show suggestions when click in suggestion form 
document.querySelector('.search').addEventListener("click",(event)=>{
    // console.log("show");
    event.stopPropagation();
    if(!suggestions.classList.contains("enable"))suggestions.classList.add("enable")
    if(suggestions.classList.contains("disable"))suggestions.classList.remove("disable")
    if(html=="")
    {
        // console.log("No result found");
        searchInput.style.borderRadius="24px";
    }
    else{   
        searchInput.style.borderBottomLeftRadius=0;
        searchInput.style.borderBottomRightRadius=0;
    }

})        

// Hide Suggestion when click other than suggestion form  
document.body.addEventListener("click",()=>{
    // console.log("hide");
    if(!suggestions.classList.contains("disable"))suggestions.classList.add("disable")
    if(suggestions.classList.contains("enable"))suggestions.classList.remove("enable")
    searchInput.style.borderRadius="24px";
})