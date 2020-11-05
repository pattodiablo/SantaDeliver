
// You can write more code here

/* START OF COMPILED CODE */

class SantaHeart extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "animations", frame !== undefined && frame !== null ? frame : "heartLife0000");
		
		/* START-USER-CTR-CODE */
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		
		
	
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){
	
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		this.body.velocity.y=-60;

		this.play("HeartBeat");

		this.growAnim = this.scene.tweens.add({
			targets: this,
			x: '-=20',
			
			duration: 2000,
			
			yoyo: true,
			loop: true,
			repeat: -1
		});

		this.updateTimer = this.scene.time.addEvent({
			delay: 10,       // ms
			callback: this.customUpdate,
			//args: [],
			callbackScope: this,
			loop: true
		});


	}

	customUpdate(){
		
		if(this.y<=-100){
		
			this.updateTimer.remove();
			this.destroy();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
