
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
		arcade.add.overlap(this, this.scene.enemyBullets, this.shotByBullet, null, this);
		this.scale = 0.8;

	}

	shotByBullet(player,bullet){
		bullet.destroy();
	}

	updateActions(){


	}
	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
