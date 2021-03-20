var html=""
function findMatches(wordToMatch,players,searchLimit) {
        let matchArray=[];
        const regex= new RegExp(wordToMatch,'gi');
        for(let i=0;i<players.length && matchArray.length<searchLimit ;i++)
        {
            let playerFullName=players[i].full_name;
            let playerName=players[i].name;
            if(playerFullName==null)playerFullName="";
            if(playerName==null)playerName="";

            if(matchArray.length<searchLimit &&   (playerFullName.match(regex) || playerName.match(regex))) {matchArray.push(players[i])};      
        }

        return matchArray;
    }
    
let resultsCount=0;
function displayMatches() {
    // console.log(players);
    const matchArray=findMatches(this.value,players,5);// 5 is the search suggestion limit

    // console.log(matchArray);
    html=matchArray.map(player=>{
    if(this.value=="") return;

    const regex = new RegExp(this.value, 'gi');
    let playerFullName="";
    let playerName="";

    if(player.full_name!=null) playerFullName=player.full_name.replace(regex,`<span class="hl">${this.value}</span>`);
    
    if(player.name!=null) playerName=player.name.replace(regex,`<span class="hl">${this.value}</span>`);
    
    let playerPhoto=player.photo;
    
    if(player.photo==null || player.photo=="null"){playerPhoto="images/default-picture.png";}

        // <a class="search__suggestion__link" href="/">${player.id}<img class="player__img" src="https://www.espncricinfo.com/inline/content/image/1220600.html"></img><p class="player__name"><span>MS</span> Dhoni </p> <p class="player__fullName"> Mahendra Singh Dhoni </p>  </a>
        return`
        <a class="search__suggestion__link" href="players/${player._id}"> <img class="player__img" src="${playerPhoto}"></img><p class="player__name">${playerName}</p> <p class="player__fullName">${playerFullName} , ${player.country}</p></a>
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