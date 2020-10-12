
// You can write more code here

/* START OF COMPILED CODE */

class Chimney extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "chimney", frame);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.updateEvent = 	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateActions, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){

		const arcade = this.scene.physics;
		arcade.add.existing(this);
		const body = this.body;
		body.immovable = true;
		body.setSize(this.width, this.height-54);
		
		
		this.growTimer = this.scene.time.addEvent({
			delay: Math.random()*(5000 - 10000)+10000,                // ms
			callback: this.growAnim,
			//args: [],
			callbackScope: this,
			loop: true
		});
		
		
	}

	growAnim(){

		this.growAnim = this.scene.tweens.add({
			targets: this,
			y: '-=20',
			duration: 2000,
			ease: 'Bounce.easeOut',
			loop: false,
		});
		
		
	}

	updateActions(){
		if(this.y<=this.scene.game.config.height/3){
		//	this.growTimer.stop();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
