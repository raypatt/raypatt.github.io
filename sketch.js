let obj_x = 50;
let obj_y = 50
let v1;
function setup() {
  createCanvas(400, 400);
	//angleMode(DEGREES);
  v1 = new Vehicle(100,100, 10, 210);
  angleMode(DEGREES)
}


function draw() {
  background(255);
	stroke(0);
  fill(120);
  v1.move(false, false)
  v1.display()
  rect(50,50,10,10);
	
	
}
class Vehicle { 
	constructor(x, y, size, angle) {
   this.x = x;
   this.y = y;
   this.size = size;
   this.angle = angle;
   this.velocity = 0.5;
  
   this.w1_vel = 0;
   this.w2_vel = 0;
   
   this.wheel_width = 5;
   this.wheel_height = 5; 
   this.sensor_radius = 15;
   this.sensor_separation_angle = 30;
    this.sensor_distance = 20;	
   this.s1 = new Sensor(this.x, this.y, this.angle, this.sensor_separation_angle, this.sensor_distance, this.sensor_radius);
   this.s2 = new Sensor(this.x, this.y, this.angle, this.sensor_separation_angle*-1, this.sensor_distance, this.sensor_radius);
  
   
 }
  move(jitter, go) { 
   //this.angle = this.angle + 1;
    
   
   if (jitter) {
   	this.angle = this.angle + (random() < 0.5 ? -5 : 5);
   } 
  if(go) { 
   	this.x = this.x + this.xVelocity;
   	this.y = this.y + this.yVelocity;
   }
    
  this.xVelocity = cos(this.angle) * this.velocity;
  this.yVelocity = sin(this.angle) * this.velocity; 
  
  this.s1.updateAngle(this.angle);
  this.s2.updateAngle(this.angle); 
  this.w1_vel = this.s2.activation
  this.w2_vel = this.s1.activation
  
  this.angle = this.angle + (this.w1_vel) - (this.w2_vel);
  this.x = this.xVelocity + this.x;
  this.y = this.yVelocity + this.y;
    
    
  
  
  }
  display() {
    //SET UP//
    fill(0,25)
    //BODY//
    circle(this.x, this.y, this.size)
   //SENSORS//
    	//S1//
    		this.s1.display(this.x, this.y);	
    //S2//
    		this.s2.display(this.x, this.y);
    ///WHEELS///
    	//W1
    		let w1_x = this.x + cos(this.angle - 90) * this.size;
    		let w1_y = this.y + sin(this.angle - 90) * this.size;
    		rect(w1_x-this.wheel_width/2, w1_y-this.wheel_height, this.wheel_width, this.wheel_height);
    	//W2
    		let w2_x = this.x + cos(this.angle + 90) * this.size;
    		let w2_y = this.y + sin(this.angle + 90) * this.size;
    		rect(w2_x-this.wheel_width/2, w2_y, this.wheel_width, this.wheel_height);
  }
}

class Sensor { 
  constructor(x, y, angle, sensor_separation_angle, sensor_distance, sensor_radius) { 
    fill(0, 25);
    angleMode(DEGREES)
    this.x = 0; 
    this.y = 0; 
    this.bodyx = x;
    this.bodyy = y;
    this.angle = angle;
    this.sensor_separation_angle = sensor_separation_angle;
    this.sensor_distance = sensor_distance; 
    this.sensor_radius = sensor_radius;
    this.activation = 0; 
  }
  updateAngle(angle) { 
    this.angle = angle;
  }
  display(x,y) {
    push()
    this.contains(obj_x, obj_y, x, y);
    fill(255-this.activation, 255, 255, 100-this.activation);
    this.x = x+cos(this.angle + this.sensor_separation_angle) * this.sensor_distance;
    this.y = y+sin(this.angle + this.sensor_separation_angle) * this.sensor_distance;
  	circle(this.x, this.y, this.sensor_radius);
    pop()
  }
  contains(obj_x, obj_y) { 
    this.distance = dist(obj_x, obj_y, this.x, this.y); 
    if (this.distance < this.sensor_radius) { 
   	 this.activation = this.distance-this.sensor_radius
    }
    
  }
}