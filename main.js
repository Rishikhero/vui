status = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 280);
    canvas.center();
}
function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
}

function modelLoaded(){
    console.log(" MODEL LOADED!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function draw(){
    image(video, 0, 0, 480, 280);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED";
            document.getElementById("number_of_objects").innerHTML = "NUMBER OF OBJECTS DETECTED ARE :" + objects.length;

            fill("#008000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#008000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}