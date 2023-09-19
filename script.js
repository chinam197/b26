//Tạo element
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var currentTimes;
var progressBarWidth = progressBar.clientWidth;
var initialClientX;
var value;
var isDrag=false;
var currentValue = 0;
var time = progressBar.querySelector(".time");

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    // -> Lấy offsetX -> tính phần trăm theo chiều rộng
    value = (e.offsetX * 100) / progressBarWidth;

    progress.style.width = `${value}%`;

    document.addEventListener("mousemove", handleDrag);
    initialClientX = e.clientX;
    currentValue = value;
    handleInput(value);
  }
});

progressSpan.addEventListener("mousedown", function (e) {
 var newmusic = audio.currentTime;
 console.log(newmusic); 
 isDrag = false;
  document.addEventListener("mousemove", handleDrag);
  initialClientX = e.clientX;
   e.stopPropagation();
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  currentValue = value;
  handleChange(value);
});

var handleDrag = function (e) {
 
  var moveWidth = e.clientX - initialClientX;
  value = (moveWidth * 100) / progressBarWidth + currentValue;

  if (value < 0) {
    value = 0;
  }

  if (value > 100) {
    value = 100;
  }

  progress.style.width = `${value}%`;

  handleInput(value);
};

//Nhận giá trị khi kéo, khi bấm chuột xuống

//1. Nhả chuột
var handleChange = function (value) {
  //   console.log(value);
};

//2. Bấm chuột xuống, kéo


var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".player .play-btn");
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;

var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60); //Lấy được phút

  seconds = Math.floor(seconds - mins * 60); // Tính số giây còn lại

  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
//Lăng nghe sự kiện loadeddata -> Khi nào file audio tải xong
audio.addEventListener("loadeddata", function () {
  durationEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    // this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    // this.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  if(!isDrag){
    currentTimeEl.innerText = getTime(audio.currentTime);
  var value = (audio.currentTime * 100) / audio.duration;
  progress.style.width = `${value}%`;
  }
  
});

audio.addEventListener("play", function () {
  playBtn.innerHTML = pauseIcon;
});

audio.addEventListener("pause", function () {
  playBtn.innerHTML = playIcon;
});

var handleInput = function (value) {
  
     currentTimes = value/100 *audio.duration;
  audio.currentTime = currentTimes;
  currentTimeEl.innerText = getTime(currentTimes);
  time.innerText = getTime(currentTimes);
};

progressBar.addEventListener("mousemove",function(e){
    var  newValue = (e.offsetX * 100) / progressBarWidth;
  var timeValue = newValue/100 *audio.duration;
  time.classList.add("time-on");
  time.innerText = getTime(timeValue);
  time.style.left=`${newValue}%`
})
document.addEventListener("mouseout",function(e){
    time.classList.remove("time-on");
   });
progressSpan.addEventListener("mousemove",function(e){
  e.stopPropagation();
   time.classList.remove("time-on");
});
audio.addEventListener("ended",function(){
  audio.duration = 0;
  audio.pause();
  progress.style.width = 0;
})