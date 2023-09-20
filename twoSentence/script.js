console.log("hello world");

// 0. wait for page to load
window.addEventListener('load', () => {
    console.log("page loaded")
});


// 1. select button
let clickButton = document.getElementById('c_button');

// 2. show function triggered by button click [html]
function show() {
    let image = document.getElementById("image");
        image.src ="assets/security setup.webp";
        //styling #image was crashing my starting page
        //chatgpt suggested adding class to style in css
        image.classList.add("security-image"); 
        document.getElementById("c_button").style.display = "none";
    let camButton = document.getElementById('cam_button');
    camButton.style.display ="flex";
}

let video1 = document.getElementById("video_1"); //video_1 ID
let caption = document.getElementById("caption"); //caption ID

function play() {
    let overlay = document.getElementById('overlay');
        overlay.classList.add("overlay");
    
        video1.src="assets/clip1.mp4"; //add source to vid_one
        video1.classList.add("clipOne");
        document.getElementById('cam_button').style.display = "none";

        document.getElementById('caption').style.display = "flex"; //show caption
        console.log('caption showing');
}


//https://stackoverflow.com/questions/24386354/execute-js-code-after-pressing-the-spacebar
//spacebar to trigger new video
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        video1.src="assets/clip2.mp4";
        document.getElementById('caption').style.display = "none";
        document.getElementById('line2').style.display = "flex";

    }
  }

