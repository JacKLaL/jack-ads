var ads = [{
  src: "https://cdn.glitch.me/f2107488-2632-43cc-b97d-2787f27b7285/Outro.mp4?v=1663602984523",
  timeRq: 5,
  watchedTimes: 0,
  maxWatchView: 100,
  whoWatch: []
}]

let dc = (eq)=>{return document.getElementById(eq)};
dc("ad").style = `overflow: hidden; max-width: ${window.innerWidth}; max-height: ${window.innerHeight}`
let randomAdId = Math.floor(Math.random() * ads.length);
localStorage.setItem("Video-End", false);
dc("ad").src = ads[randomAdId].src;
let isReady = false;
let timePass = 0;
let notEnd = true;

setInterval(()=>{
  if(!isReady || notEnd){
    dc("ad").play();
  } else {
    if(dc("ad")){
      dc("ad").remove();
    }
  }
});

document.getElementsByClassName("ad-btn")[0].onclick = (()=>{
  if(!isReady) return;
  myHandler();
})

setInterval(()=>{
  if(timePass+1 < ads[randomAdId].timeRq){
    timePass++;
    document.getElementsByClassName("ad-btn")[0].innerHTML = "Omitir en... " + (ads[randomAdId].timeRq-timePass);
  } else {
    isReady = true;
    document.getElementsByClassName("ad-btn")[0].classList.add("can");
    document.getElementsByClassName("ad-btn")[0].innerHTML = `
    Omitir Anuncio 
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-skip-end-fill" viewBox="0 0 16 16" style="margin: 0px">
      <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"></path>
    </svg>`;
  }
}, 1000);

document.getElementById('ad').addEventListener('ended', myHandler);
function myHandler() {
  localStorage.setItem("Video-End", true);
  notEnd = false;
}

window.detectEnd = ()=>{
  if(localStorage["Video-End"]){
    if(localStorage["Video-End"] == "true"){
      localStorage.setItem("Video-End", false);
      document.getElementsByClassName("jack-ads-container")[0].style.display = "none";
    }
  }
}
