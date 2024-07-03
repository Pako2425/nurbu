const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

const game = new Phaser.Game(config);

function preload() {
    this.load.image('car', 'assets/honda-civic-4th.png');
    this.load.image('track', 'assets/nur.png');
}

let car;
let cursors;

let keyA;
let keyS;
let keyD;
let keyW;

let acceleration = 50;
let brakeForce = 100;
let velocity = 0;
let xVelocity = 0;
let yVelocity = 0;
let maxSpeed = 300;
let maxRSpeed = 50;
let turnSpeed = 300;
let maxTurningAngle = 30.0;
let currentTurningAngle = 0.0;
let dTurningAngle = 0.5;

function create() {
    let track = this.add.image(0, 0, 'track');
    car = this.physics.add.sprite(400, 300, 'car');
    car.setScale(0.2);
    car.setDrag(100);

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
    //this.cameras.main.startFollow(car);

}

function update() {
    let gasPedal = false;
    let brakePedal = false;
    let turnLeft = false;
    let turnRight = false;

    if(keyW.isDown) {
        gasPedal = true;
        brakePedal = false;
    }
    else if(keyS.isDown) {
        gasPedal = false;
        brakePedal = true;
    }
    else {
        gasPedal = false;
        brakePedal = false;
    }

    if(keyA.isDown) {
        turnLeft = true;
        turnRight = false;
    }
    else if(keyD.isDown) {
        turnLeft = false;
        turnRight = true;
    }
    else {
        turnLeft = false;
        turnRight = false;
    }

    if(gasPedal) {
        accelerate();
    }
    else if(brakePedal) {
        slowDown();
    }
    else {
        drag();
    }
    
    turning(turnLeft, turnRight);





/*
    if (isMoving) {
        if (keyA.isDown && car.body.speed > 0) {
            car.setAngularVelocity(-turnSpeed); // Skręcanie w lewo
        } else if (keyD.isDown && car.body.speed > 0) {
            car.setAngularVelocity(turnSpeed); // Skręcanie w prawo
        } else {
            car.setAngularVelocity(0); // Zatrzymaj skręcanie, gdy nie ma wciśniętych klawiszy
        }
    } else {
        car.setAngularVelocity(0); // Zatrzymaj skręcanie, gdy samochód jest zatrzymany
    }
*/
}

function accelerate() {
    if(car.body.speed < maxSpeed) {
        car.setAcceleration(acceleration * Math.cos(car.rotation), acceleration * Math.sin(car.rotation));
    }
    else {
        car.setAcceleration(0, 0);
        car.setVelocity = maxSpeed;
    }
}

function slowDown() {
    if(car.body.speed > 0) {
        car.setAcceleration(-brakeForce * Math.cos(car.rotation), -brakeForce * Math.sin(car.rotation));
    }
    else {
        car.setVelocity(0);
    }
}

function drag() {
    car.setAcceleration(0, 0);
}

function turning(turnLeft, turnRight) {
    if(turnLeft) {
        if(currentTurningAngle < maxTurningAngle) {
            currentTurningAngle = currentTurningAngle + dTurningAngle;
        }
        else {
            currentTurningAngle = maxTurningAngle;
        }
    }
    else if(turnRight) {
        if(currentTurningAngle > -maxTurningAngle) {
            currentTurningAngle = currentTurningAngle - dTurningAngle;
        }
        else {
            currentTurningAngle = -maxTurningAngle;
        }
    }
    else {
        if(currentTurningAngle > 0) {
            currentTurningAngle = currentTurningAngle - dTurningAngle;
        }
        else if(currentTurningAngle < 0) {
            currentTurningAngle = currentTurningAngle + dTurningAngle;
        }
        else {
            currentTurningAngle = 0;
        }
    }
    console.log(currentTurningAngle);
}

function limitSpeed() {
    if (car.body.speed > maxSpeed) {
        car.setVelocity(maxSpeed * Math.cos(car.rotation), maxSpeed * Math.sin(car.rotation));
    }
}

function updateCar() {
    let a = 0;
}