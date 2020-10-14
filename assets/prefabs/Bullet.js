
// You can write more code here

/* START OF COMPILED CODE */

class Bullet extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		// laserGift
		const laserGift = scene.add.sprite(0, 0, "laserGift");
		this.add(laserGift);
		
		// bornImage
		const bornImage = scene.add.image(0, 0, "laserGift");
		bornImage.alpha = 0.3;
		bornImage.alphaTopLeft = 0.3;
		bornImage.alphaTopRight = 0.3;
		bornImage.alphaBottomLeft = 0.3;
		bornImage.alphaBottomRight = 0.3;
		this.add(bornImage);
		
		this.laserGift = laserGift;
		this.bornImage = bornImage;
		
		/* START-USER-CTR-CODE */
	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateBullet, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	// Write your code here.
	start() {
		
		if(typeof this.scene !== 'undefined'){
			
			this.bullet = this.scene.sound.add('shoot');
	
			const arcade = this.scene.physics;
			arcade.add.existing(this);
			const body = this.body;
			body.setSize(this.width, this.height);
			body.velocity.y =800;
			this.bulletBornAnim();
			this.scale = 0.5;
	
			this.forceVelocityTimer = this.scene.time.addEvent({
				delay: 50,                // ms
				callback: this.growAnim,
				//args: [],
				callbackScope: this,
				loop: false
			});
	
			this.updateTimer = this.scene.time.addEvent({
				delay: 10,       // ms
				callback: this.customUpdate,
				//args: [],
				callbackScope: this,
				loop: true
			});
		}
	
		
	}

	customUpdate(){
		
	
		if(this.y>=980){
		
			this.updateTimer.remove();	
			this.destroy();
				
		}

	
	}

	bulletBornAnim(){
		
		if(typeof this !=='undefined'){
			this.bullet.play();
			this.shootingTween = this.scene.tweens.add({
			targets: this.bornImage,
			scaleX: '2',
			scaleY: '1',
			duration: 50,
			
			yoyo: true,
			loop: false,
			
		});
		}
		
	
	}

	updateBullet(time, delta) {		
	
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
