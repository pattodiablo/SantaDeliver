
// You can write more code here

/* START OF COMPILED CODE */

class SantaPlayer extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "player", frame);
		
		/** @type {Phaser.GameObjects.Sprite} */
		this.santaPlayer;
		
		/* START-USER-CTR-CODE */
	
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.updateEvent = 	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateActions, this);

		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){

		this.hitByBulletSound = this.scene.sound.add('hurt');
		this.gotHeartSound = this.scene.sound.add('gotHeart');
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		this.body.enable = false;
		arcade.add.overlap(this, this.scene.enemyBullets, this.shotByBullet, null, this);
		arcade.add.overlap(this, this.scene.enemies, this.killbyEnmy, null, this);
		arcade.add.overlap(this, this.scene.hearts, this.addHeart, null, this);
		this.scale = 0.8;
		this.isKilled = false;
		this.santaLife = 10;
		this.canControl = false;
		this.visible=true;
		this.santaIntro();
		this.x = 319;
		this.y = -140;
		

	}

	santaIntro(){

		if(typeof this.killAnim!=='undefined'){
			console.log('si entro aqui')
			this.killAnim.stop();
			this.body.enable = true; 
		}
	
		this.growAnim = this.scene.tweens.add({
			targets: this,
			y: '300',
			x: '330',
			duration: 3000,
			yoyo: false,
			loop: false
		});
		

		this.growAnim.on('complete', function(){
			console.log('animcomplete');
			this.canControl = true;
			this.body.enable = true; 
		
		}, this)

	}

	

	shotByBullet(player,bullet){
		this.hitByBulletSound.play();
		this.santaLife--;
		console.log(this.santaLife);
		if(this.santaLife<=0){
			this.killbyEnmy(this,bullet);
		}
		this.growAnim = this.scene.tweens.add({
			targets: this,
			scaleY: '-=0.1',
			scaleX: '-=0.1',
			duration: 100,
			
			yoyo: true,
			loop: false
		});
		
		bullet.destroy();
	}

	addHeart(player,heart){
		this.gotHeartSound.play();
		this.santaLife++;
		if(this.santaLife>=10){
			this.santaLife=10;
		}

		heart.updateTimer.remove()
		heart.destroy();

	}

	killbyEnmy(player,enemy){
		
		this.isKilled = true;
		this.scene.gameOverText.visible = true;
		this.scene.playAgainBtn.visible=true;
		
		console.log('tuoching enemy');
		
		var killAnim = this.scene.tweens.createTimeline();
		killAnim.add({
			targets: this,
			scaleY: '1.1',
			scaleX: '1.1',
			yoyo: true,
			duration: 500
		});

	
		killAnim.add({
			targets: this,
			y: -500,
			rotation:8,
			duration: 2000,
			
		});

		killAnim.add({
			targets: this,
			callback: () => {
				this.visible=false;
			  }
		});

		killAnim.play();

		player.body.enable = false;

	//	player.body.gravity.y = 800;

	}

	
	updateActions(){

			
			
	}
	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
