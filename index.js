const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    //physics: {
    //  default: 'arcade',
    //  arcade: {
    //    debug: false
    //  }
    //},
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

let player;
let car;
let keyA;
let keyS;
let keyD;
let keyW;

function create() {
    let track = this.add.image(0, 0, 'track');
    //car = this.add.sprite(400, 300, 'car');
    //car.setScale(0.2);

    honda = {
        acceleration: 200,
        brakeForce: 100,
        maxSpeed: 300,
        maxRSpeed: 50,
        turnSpeed: 300,
        maxTurningAngle: 30.0,
        currentTurningAngle: 0.0,
        dTurningAngle: 0.5,
        axleBase: 2.5
    }

    player = {
        sprite: this.add.sprite(400, 300, 'car'),
        car: null,
        xpos: 0,
        ypos: 0,
        prevXpos: 0,
        prevYpos: 0,
        xAcc: 0,
        yAcc: 0,
        xVelocity: 0,
        yVelocity: 0,
        speed: 0,
        rotation: 0
    }

    player.sprite.setScale(0.2);
    player.car = honda;

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
    //this.cameras.main.startFollow(car);

}

function update(time, delta) {
    const dt = delta / 1000;

    player.xpos = player.xpos + player.xVelocity*dt;
    player.ypos = player.ypos + player.yVelocity*dt;
    player.xAcc = player.xpos - 
    player.yAcc = 
    player.sprite.x = player.xpos;
    player.sprite.y = player.ypos;
    player.speed = Math.sqrt((player.xVelocity*player.xVelocity) + (player.yVelocity*player.yVelocity));
    
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
        accelerate(player, dt);
    }
    
    else if(brakePedal) {
        slowDown(player, dt);
    }
    console.log(player.speed);
    /*
    else {
        drag();
    }
    
    //turning(turnLeft, turnRight);

    //carRotation(car.body.speed, currentTurningAngle, axleBase);

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
   //console.log(player.xpos);
}

function accelerate(player, dt) {
    if(player.speed < player.car.maxSpeed) {
        player.xVelocity += player.car.acceleration * Math.cos(player.rotation) * dt;
        player.yVelocity += player.car.acceleration * Math.sin(player.rotation) * dt;
    }
    else {
        player.xVelocity = player.xVelocity;
        player.yVelocity = player.yVelocity;
    }
}

function slowDown(player, dt) {
    if(player.speed > 0) {
        player.xVelocity -= player.car.brakeForce * Math.cos(player.rotation) * dt;
        player.yVelocity -= player.car.brakeForce * Math.sin(player.rotation) * dt;
        //(-brakeForce * Math.cos(car.rotation), -brakeForce * Math.sin(car.rotation));
    }
    else {
        player.xVelocity = 0;
        player.yVelocity = 0;
    }
}

/*
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
    console.log(car.body.velocity);
}

function carRotation(carSpeed, turningAngle, axleBase) {
    let dAngularVelocity = carSpeed * Math.tan(turningAngle*Math.PI / 180) / axleBase;
    car.setAngularVelocity(-dAngularVelocity);
}

function updateCar() {
    let a = 0;
}
    */