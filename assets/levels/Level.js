
// You can write more code here



/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Sprite} */
		this.bgBuildings2;
		/** @type {Phaser.GameObjects.Image} */
		this.bgBuildings1;
		/** @type {Phaser.GameObjects.Sprite} */
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
		
		// moonBg
		this.add.image(323, 69, "moonBg");
		
		// chimneyBg
		this.add.image(318, 880, "chimneyBg");
		
		// player
		const player = this.add.sprite(317, 260, "player");
		
		// enemy
		this.add.image(209, 753, "enemy");
		
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
	}

	floatingSanta(){

		this.player.scaleX = 1;
		this.player.scaleY = 1;
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
