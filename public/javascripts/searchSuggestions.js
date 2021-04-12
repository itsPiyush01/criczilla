var html=""
var matchArray=[];
function getMatches(wordToMatch) {
    console.log("GetMatch: "+wordToMatch);
    
    var xhr = new XMLHttpRequest();
    var data = {
        wordToMatch: wordToMatch
    };
    xhr.open('POST', '/searchSuggestionQuery');
    xhr.onload = function(data) {
        // console.log('loaded', this.responseText);
        matchArray=JSON.parse(xhr.response);
        // execute here once again after fetching the data
        displayMatches(wordToMatch);

    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

}    

function displayMatches(wordToMatch) {
    html=matchArray.map(player=>{
    if(wordToMatch=="") return;
    const regex = new RegExp(wordToMatch, 'gi');
    let playerFullName="";
    let playerName="";

    if(player.full_name!=null) playerFullName=player.full_name.replace(regex,`<span class="hl">${wordToMatch}</span>`);
    
    if(player.name!=null) playerName=player.name.replace(regex,`<span class="hl">${wordToMatch}</span>`);
    
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
//  Every Time user type something this function will execute 
searchInput.addEventListener('keyup', (function() {
    let wordToMatch=this.value; 

    // execute with 600ms delay
    delay(function(){
        if(wordToMatch.length>=3)getMatches(wordToMatch);
    }, 600 );
    
    // immediately this function will execute (no delay execution)
    displayMatches(wordToMatch);
    console.log("DisplayMatch: "+wordToMatch);


}));


var delay = (function(){
    var timer = 0;
    return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
   };
  })();

  
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