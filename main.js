l_score=0;
l_wristX = 0;
r_wristX = 0;
l_wristY = 0;
r_wristY = 0;
r_score=0;
sound="";
sound2="";
var slider;
function setup(){
    canvas=createCanvas(500,500);
    // if you click on the canvas if will start playing the song
    canvas.mousePressed(play1);
    canvas.position(300,175);
    video=createCapture(VIDEO);
    video.hide();
    pose_net=ml5.poseNet(video,model_is_ready);
    pose_net.on("pose",got_results);
    slider=createSlider(0, 1, 0.5, 0.01);
    slider.position(0,155);
}
function got_results(results,error){
    if(error){
        console.log(error);
    }
    else{
        if(results.length > 0){
            if (results[0].pose.rightWrist.confidence > results[0].pose.leftWrist.confidence){
                console.log("1");
                sound2.stop();
                sound.play();
                sound.setVolume(slider.value());
                sound.rate(1);
                document.getElementById("song_name").innerHTML="Song Name: Harry Pottter";
            }
            if (results[0].pose.rightWrist.confidence < results[0].pose.leftWrist.confidence){
                console.log("2");
                sound.stop();
                sound2.play();
                sound2.setVolume(slider.value());
                sound2.rate(1);
                document.getElementById("song_name").innerHTML="Song Name: Peter Pan";
            }
            console.log(results);
            r_wristX = results[0].pose.rightWrist.x;
            r_wristY = results[0].pose.rightWrist.y;
            l_wristX = results[0].pose.leftWrist.x;
            l_wristY = results[0].pose.leftWrist.y;
            r_score=results[0].pose.keypoints[10].score;
            l_score=results[0].pose.keypoints[9].score;
            console.log(r_wristX+" , "+l_wristX+" , "+r_wristY+" , "+r_score);
        }
    }
}
function model_is_ready(){
    console.log("posenet is ready");
}
function preload(){
    sound=loadSound("music.mp3");
    sound2=loadSound("music2.mp3");
}
function draw(){
    image(video,0,0,500,500);
    fill("red");
    stroke("blue");
    circle(l_wristX, l_wristY, 40);
    fill("green");
    stroke("orange");
    circle(r_wristX, r_wristY, 40);

}

function play1(){
    sound.stop();
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}