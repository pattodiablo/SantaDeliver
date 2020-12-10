
// You can write more code here



/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Sprite} */
		this.bgBuildings2;
		/** @type {Phaser.GameObjects.Image} */
		this.bgBuildings1;
		/** @type {Phaser.GameObjects.Text} */
		this.giftsNumber;
		/** @type {SantaPlayer} */
		this.player;
		/** @type {Phaser.GameObjects.Text} */
		this.lifes;
		/** @type {Phaser.GameObjects.Text} */
		this.gameOverText;
		/** @type {Phaser.GameObjects.Image} */
		this.playAgainBtn;
		
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
		this.add.image(324, 69, "moonBg");
		
		// panel
		this.add.image(120, 51, "panel");
		
		// giftsNumber
		const giftsNumber = this.add.text(111, 30, "", {});
		giftsNumber.text = "000";
		giftsNumber.setStyle({"fontFamily":"arial","fontSize":"46px","fontStyle":"bold"});
		
		// text_1_1
		const text_1_1 = this.add.text(89, 12, "", {});
		text_1_1.text = "Gifts delivered";
		text_1_1.setStyle({"fontFamily":"arial","fontSize":"18px","fontStyle":"bold"});
		
		// giftIcon
		this.add.image(51, 47, "giftIcon");
		
		// player
		const player = new SantaPlayer(this, 319, -140);
		this.add.existing(player);
		
		// panel_1
		const panel_1 = this.add.image(530, 51, "panel");
		panel_1.flipX = true;
		
		// heart
		this.add.image(504, 50, "heart");
		
		// lifes
		const lifes = this.add.text(549, 26, "", {});
		lifes.text = "x 10";
		lifes.setStyle({"fontFamily":"Arial","fontSize":"36px","fontStyle":"bold"});
		
		// gameOverText
		const gameOverText = this.add.text(203, 328, "", {});
		gameOverText.text = "GAME OVER";
		gameOverText.setStyle({"fontFamily":"Arial","fontSize":"36px","fontStyle":"bold"});
		
		// playAgainBtn
		const playAgainBtn = this.add.image(316, 463, "playAgainBtn");
		
		this.bgBuildings2 = bgBuildings2;
		this.bgBuildings1 = bgBuildings1;
		this.giftsNumber = giftsNumber;
		this.player = player;
		this.lifes = lifes;
		this.gameOverText = gameOverText;
		this.playAgainBtn = playAgainBtn;
	}
	
	/* START-USER-CODE */

	// Write your code here.
	create(){

		
		this._create();
		this.canMove = false;
		this.firstimeMove = false;
		this.gameOverText.visible=false;
		this.playAgainBtn.visible=false;
		this.playAgainBtn.setInteractive();
		this.playAgainBtn.on('pointerdown', function(){

			this.registry.destroy(); // destroy registry
			this.events.off();// disable all active events
			this.scene.restart();// restart current scene
			
  		},this);


	
		this.input.on('pointerdown',this.mouseClickDown,this);
		this.input.on('pointerup',this.mouseClickUp,this);
	
		this.floatingSanta();
		
		this.enemyBullets = this.physics.add.group();
		this.santaBullets = this.physics.add.group();
		this.enemies = this.physics.add.group();
		this.chimeneas = this.physics.add.group();
		this.portals = this.physics.add.group();
		this.hearts = this.physics.add.group();
		
		this.chimeneyCount = 0;

		

		this.createHeartTimer = this.time.addEvent({
			delay: 5000,                // ms
			callback: this.crearHeart,
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

	crearHeart(){

		var randX = Math.random()*(40 + 600) + 40;
		const createEnable = Math.random() >= 0.5;
		if(createEnable){
			
			const santaHeart = new SantaHeart(this, randX, 990);
			this.hearts.add(santaHeart);
			this.add.existing(santaHeart);
		}
		
	}

	updateChimneyCount(pos){

		this.chimeneyCount = pos;
	}
	crearChimeneas(){

		const fixer = 80;
		if(this.chimeneas.getLength()<4){

				switch(this.chimeneyCount){
					case 0:
						
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
						this.chimeneyCount++;
						break;
					default:
						break;
				}
				
				this.randomX = Math.random()*(this.minPos -this.maxpos)+this.maxpos;
				
									
				const chimney = new Chimney(this, this.randomX, this.game.config.height/0.8);
				chimney.chimneyPos = this.chimeneyCount-1;
				this.add.existing(chimney);
				this.chimeneas.add(chimney);

				const enemy = new Enemy(this, chimney.x, chimney.y-400);
				this.enemies.add(enemy);
				this.add.existing(enemy);
		
		}
		

	}

	createChimeys(){
		this.createChimneyTimer = this.time.addEvent({
			delay: 1000,                // ms
			callback: this.crearChimeneas,
			//args: [],
			callbackScope: this,
			loop: true
		});
	}

	mouseClickDown(){
		this.firstimeMove = true;
		if(this.firstimeMove){
			this.createChimeys();
		}
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

		if(!this.player.isKilled){
		var flag = false;

		this.shootingTween = this.tweens.add({
			targets: this.player,
			scaleX: '+=0.03',
			scaleY: '+=0.03',
			duration: 125,
			repeat: -1,
			yoyo: true,
			loop: false,
		
			
		});

		var shotFlag=true;

		this.shootingTween.on('repeat', function(){
			if(!this.player.isKilled){
			flag = !flag;
			if(flag){
				this.santaFire();
			
			}
			
		}
				
			
			
		}, this)
	}
	}

	santaFire(){
		const bullet = new Bullet(this, this.player.x, this.player.y+100);
		this.add.existing(bullet);
		this.santaBullets.add(bullet);
	}

	floatingSanta(){
		if(!this.player.isKilled){
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
	}
	
	
	update(){
	
		console.log(this.player.y);
		this.lifes.text =  'x ' + this.player.santaLife;

		this.myInput = this.input.activePointer;

		if(this.myInput.isDown && !this.player.isKilled && this.player.canControl && this.canMove){
			
			this.player.x += (this.myInput.x - this.player.x)/5;
			this.player.y += (this.myInput.y - this.oldy)/15;
		
		}

	//	console.log(this.player.canControl);

		if(this.player.canControl & !this.firstimeMove){
			
			this.player.y = 300;
			this.player.x = 330;
		}

		if(this.player.x >= this.game.config.width-this.player.width/2){

			this.player.x=this.game.config.width-this.player.width/2;
		}

		if(this.player.x <= this.player.width/2){

			this.player.x=this.player.width/2;
		}

		if(!this.player.isKilled){
		
			if(this.player.y<30 && this.canMove){
				this.player.y = 30;
			}

		
			if(this.player.y>=this.game.config.height/2){
				this.player.y = this.game.config.height/2;
			}

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
