status = "";
objects=[];

var img;


function preload()
{
   img = loadImage("sports.jpg")
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    canvas.parent("canvas")
   
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);    

}
function modelLoaded()
{
    console.log('Model Loaded!');       
    objectDetector.detect(img, gotResults);
    document.getElementById('status').innerHTML = "Status : Detecting objects"; 
    

}
function gotResults(error, results)
{
    setTimeout(
        function(){
            if(error)
   {
      console.log(error); 
   }else{
       status = true; 
       console.log(results);
       objects = results;                        
   }
        },5000);

   
}
function draw()
{
    image(img, 0, 0, 380, 380);    
    if(status != "")
    {
    if(objects != null)
    {
      for(i=0; i <= objects.length; i++)
       {        
        r = random(255);
        g = random(255);
        b = random(255);
        textSize(18);
        document.getElementById('body').style.opacity = "1";        
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y+15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       } 
    }
    }        
}