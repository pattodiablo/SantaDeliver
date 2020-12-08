
// You can write more code here

/* START OF COMPILED CODE */

class EnemyBullet extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "enemyBullet", frame);
		
		/* START-USER-CTR-CODE */
			//this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
			this.start();
			this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateBullet, this);

		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){
		
		if(typeof this.scene !== 'undefined'){
		this.bullet = this.scene.sound.add('enemyShot');
		
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		const body = this.body;
		body.setSize(this.width, this.height);
	
		this.bulletBornAnim();

		this.updateTimer = this.scene.time.addEvent({
			delay: 10,       // ms
			callback: this.customUpdate,
			//args: [],
			callbackScope: this,
			loop: true
		});
		}
	}

	bulletBornAnim(){
		if(typeof this.scene !=='undefined'){

			this.shootingTween = this.scene.tweens.add({
				targets: this,
				scaleX: '2',
				scaleY: '1.1',
				alpha:'0.5',
				duration: 120,
				yoyo: true,
				loop: true,
				
			});

			this.shootingTween.on('complete', function(){
				this.bullet.play();
				if(typeof this.body !== 'undefined'){
				this.body.velocity.y =-800;
				}
			}, this)
				
		}
	}

	customUpdate(){
		
		if(this.y<=-100){
		
			this.updateTimer.remove();	
			this.destroy();
				
		}

	
	}

	updateBullet(){
	
			
		
	}

	


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
