
// You can write more code here



/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Sprite} */
		this.bgBuildings2;
		/** @type {Phaser.GameObjects.Image} */
		this.bgBuildings1;
		/** @type {SantaPlayer} */
		this.player;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		
		/* END-USER-CTR-CODE */
	}
	
	_create() {
		
		// background
		const background = this.add.image(0, 0, "background");
		background.setOrigin(0, 0);
		
		// bgBuildings2
		const bgBuildings2 = this.add.sprite(0, 818, "bgBuildings2");
		
		// bgBuildings1
		const bgBuildings1 = this.add.image(640, 863, "bgBuildings1");
		
		// citylights
		this.add.image(320, 923, "citylights");
		
		// moonBg
		this.add.image(323, 69, "moonBg");
		
		// player
		const player = new SantaPlayer(this, 484, 383);
		this.add.existing(player);
		
		this.bgBuildings2 = bgBuildings2;
		this.bgBuildings1 = bgBuildings1;
		this.player = player;
	}
	
	/* START-USER-CODE */

	// Write your code here.
	create(){

		this._create();
		this.canMove = false;
		
		
		this.input.on('pointerdown',this.mouseClickDown,this);
		this.input.on('pointerup',this.mouseClickUp,this);
		this.player.x = this.input.x;
		this.player.y = this.input.y;
		this.floatingSanta();
		
		this.enemyBullets = this.physics.add.group();
		this.santaBullets = this.physics.add.group();
		this.enemies = this.physics.add.group();
		this.chimeneas = this.physics.add.group();

		this.chimeneyCount = 0;

		this.createChimneyTimer = this.time.addEvent({
			delay: 1000,                // ms
			callback: this.crearChimeneas,
			//args: [],
			callbackScope: this,
			loop: true
		});


		var particles = this.add.particles('flake');

		var emitter = particles.createEmitter({
			x: this.game.config.width/2,
			y: -300,
			angle: { min: 180, max: 360 },
			speed: 200,
			gravityY: 50,
			lifespan: 160000,
			quantity: 1,
			alpha: 0.2,
			scale: { start: 0.5, end: 1 },
			blendMode: 'ADD'
		});
		
	}

	crearChimeneas(){

		const fixer = 80;
		if(this.chimeneas.getLength()<4){

				switch(this.chimeneyCount){
					case 0:
						console.log('estoy aqui');
						this.minPos = 150-fixer;
						this.maxpos = 170-fixer;
						this.chimeneyCount++;
						break;
					case 1:
						this.minPos = 310-fixer;
						this.maxpos = 330-fixer;
						this.chimeneyCount++;
						break;
					case 2:
						this.minPos = 470-fixer;
						this.maxpos = 490-fixer;
						this.chimeneyCount++;
						break;
					case 3:
						this.minPos = 630-fixer;
						this.maxpos = 650-fixer;
						this.chimeneyCount = 0;
						break;
					default:
						break;
				}
				
				this.randomX = Math.random()*(this.minPos -this.maxpos)+this.maxpos;
				console.log(this.randomX);
									
				const chimney = new Chimney(this, this.randomX, this.game.config.height*1.3);
				this.add.existing(chimney);
				this.chimeneas.add(chimney);

				const enemy = new Enemy(this, chimney.x, chimney.y-400);
				this.enemies.add(enemy);
				this.add.existing(enemy);
		
		}
		

	}

	mouseClickDown(){
		
		this.canMove=true;
		this.oldx = this.myInput.x;
		this.oldy = this.myInput.y;
		
		if(typeof this.floatingTween != 'undefined'){
			this.floatingTween.stop();
		}
		this.shootingSanta();

	}

	

	mouseClickUp(){
		this.canMove=false;
		this.floatingSanta();
		this.shootingTween.stop();
	}

	shootingSanta(){

		this.shootingTween = this.tweens.add({
			targets: this.player,
			scaleX: '+=0.03',
			scaleY: '+=0.03',
			duration: 125,
			repeat: -1,
			yoyo: true,
			loop: true,
			
		});
		this.shootingTween.on('repeat', function(){
			this.santaFire();
		}, this)
		
	}

	santaFire(){
		const bullet = new Bullet(this, this.player.x, this.player.y+100);
		this.add.existing(bullet);
		this.santaBullets.add(bullet);
	}

	floatingSanta(){

		this.player.scaleX = 0.8;
		this.player.scaleY = 0.8;
		this.floatingTween = this.tweens.add({
			targets: this.player,
			y: '-=34',
			ease: 'Sine.easeInOut',
			repeat: -1,
			yoyo: true,
			loop: true,
			
		});
		
	}
	
	
	update(){

		this.myInput = this.input.activePointer;

		if(this.myInput.isDown){
		
			this.player.x += (this.myInput.x - this.player.x)/5;
			this.player.y += (this.myInput.y - this.oldy)/15;
		
		}

		if(this.player.x >= this.game.config.width-this.player.width/2){

			this.player.x=this.game.config.width-this.player.width/2;
		}

		if(this.player.x <= this.player.width/2){

			this.player.x=this.player.width/2;
		}

		
		if(this.player.y<30){
			this.player.y = 30;
		}

		if(this.player.y>=this.game.config.height/2){
			this.player.y = this.game.config.height/2;
		}
		
		this.bgBuildings2.x+=0.2;
		this.bgBuildings1.x-=0.1;
		
		if(this.bgBuildings2.x >= this.game.config.width){
				this.bgBuildings2.x = 0;
		}
		
		if(this.bgBuildings1.x <= 0 ){
				this.bgBuildings1.x = this.game.config.width;
		} 
		
		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
