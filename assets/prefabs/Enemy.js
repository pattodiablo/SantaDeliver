
// You can write more code here

/* START OF COMPILED CODE */

class Enemy extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "enemy", frame);
		
		/* START-USER-CTR-CODE */
		
	this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
	this.updateEvent = 	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateEnemy, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */
	start(){
		
		const arcade = this.scene.physics;
	
		

		arcade.add.existing(this);
		
		const body = this.body;
		body.setSize(80, 145);
		body.setDrag(1, 0);
		body.gravity.set(0, 600);
		body.setBounce(0.2, 0.2);

		arcade.add.overlap(this, this.scene.santaBullets, this.shotByBullet, null, this);
		arcade.add.collider(this, this.scene.chimeneas);

		this.shotTimer = this.scene.time.addEvent({
			delay: Math.random()*(2000 - 4000)+4000,                // ms
			callback: this.shoot,
			//args: [],
			callbackScope: this,
			loop: true
		});
		

	}

	shotByBullet(player,bullet){
		bullet.destroy();
	}
	
	shoot(){
		this.enemyBullet = new EnemyBullet(this.scene, this.x-29, this.y);
		this.scene.add.existing(this.enemyBullet);
		this.scene.enemyBullets.add(this.enemyBullet);
		
	}

	updateEnemy(){
	
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
