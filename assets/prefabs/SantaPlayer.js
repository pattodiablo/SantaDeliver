
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
		this.santaIntro();
		

	}

	santaIntro(){

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

		this.santaLife++;
		if(this.santaLife>=10){
			this.santaLife=10;
		}

		heart.updateTimer.remove()
		heart.destroy();

	}

	killbyEnmy(player,enemy){
		
		this.isKilled = true;
	
		console.log('tuoching enemy')
		
		var timeline = this.scene.tweens.createTimeline();
		timeline.add({
			targets: this,
			scaleY: '1.1',
			scaleX: '1.1',
			yoyo: true,
			
			duration: 500
		});

	
	
	
		timeline.add({
			targets: this,
			y: -500,
			rotation:8,
			duration: 1000
		});
		timeline.play();

		player.body.enable = false;

	//	player.body.gravity.y = 800;

	}

	
	updateActions(){

			this.scene.lifes.text =  'x ' + this.santaLife;
	}
	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
