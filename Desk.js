status = "";
desk = "";
objects = [];
function preload()
{
    desk = loadImage("desk.png")
}
function setup()
{
    canvas = createCanvas(700 , 500)
    canvas.center()
    cocossd_model = ml5.objectDetector('cocossd' , modelLoaded)
}
function modelLoaded()
{
    console.log("THE MODEL HAS BEEN LOADED")
    status = true;
    cocossd_model.detect(desk , gotResults)
}
function gotResults(error , results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results)
        objects = results
    }
}
function draw()
{
    image(desk , 0 , 0 , 700 , 500)
    if(status != "")
    {
        for(i=0;i < objects.length;i++)
        {
            document.getElementById("status_result").innerHTML = "Objects Detected";
            percentage = floor(objects[i].confidence * 100)
            fill("red")
            text(objects[i].label + " " + percentage + "%" , objects[i].x , objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
        }
    }
} 