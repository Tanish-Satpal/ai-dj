song2="";
song3="";
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    song2= loadSound("music2.mp3");
    song3= loadSound("music3.mp3");
}

function setup(){
canvas= createCanvas(600, 500);
canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#000000");


    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        song2.play();
        song3.stop();
        }   

        fill("#FF0000");
    stroke("#000000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song3.stop();
        song3.play();
        song2.stop();
        }   
}



function pause(){
    song2.pause();
    song3.pause();                    
}

function stop(){   
    song2.stop();
    song3.stop();              
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left x="+leftWristX+" left Y="+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right x="+rightWristX+" right Y="+rightWristY);
    }
}
