
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
		
		this.killEnemySound = this.scene.sound.add('killEnemy');
		this.enemyLife = 5;
		this.finalLife = 5;
		this.isDeath =  false;
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		
		const body = this.body;
		body.setSize(80, 145);
		body.setDrag(1, 0);
		body.gravity.set(0, 600);
		body.setBounce(0.2, 0.2);

		arcade.add.overlap(this, this.scene.santaBullets, this.shotByBullet, null, this);
		//arcade.add.collider(this, this.scene.chimeneas);

		this.shotTimer = this.scene.time.addEvent({
			delay: Math.random()*(2000 - 4000)+4000,              // ms
			callback: this.shoot,
			//args: [],
			callbackScope: this,
			loop: true
		});
		
		this.createShield();
	}

	createShield(){
		this.enemyShield = new EnemyShield(this.scene, this.x, this.y);
		this.enemyShield.enemyUser = this;
		this.scene.add.existing(this.enemyShield);

	}


	shotByBullet(player,bullet){

		this.growAnim = this.scene.tweens.add({
			targets: this,
			scaleX: '+=0.05',
			duration: 50,
			yoyo: true,
			loop: false,
		});

		if(!this.isDeath){

		
		this.enemyLife--;
		
	
		bullet.destroy();
		this.enemyShield.hit();

		if(this.enemyLife <= 30){

			this.enemyShield.setColor(0xa88e35,0.7);
		}
	
		if(this.enemyLife <= 15){

			this.enemyShield.setColor(0xa25612,0.6);
		}
	
		if(this.enemyLife <= 5){

			this.enemyShield.setColor(0x601e05,0.2);
		}

		if(this.enemyLife <= 0){

			this.finalLife--;
			if(this.finalLife<=0){

				this.scene.enemies.remove(this);
				this.body.angularVelocity=0.5; //muere el enemigo
				this.isDeath = true;
				//this.rotation=0.5;
				this.fall();
			}
			this.enemyShield.beginReload();
			
		}
	}

	}

	fall(){
		
		this.growAnim = this.scene.tweens.add({
			targets: this,
			y: '-=40',
			scaleX: '1.1',
			scaleY: '1.1',
			rotation: '+=2',
			duration: 100,
			ease: 'Quadratic.Out',
		//	yoyo: true,
			loop: false,
		});
		
		this.killEnemySound.play();
	}

	killenemy(){
		this.enemyShield.removeShield();
		this.shotTimer.remove();
		this.destroy();
	}
	
	shoot(){
		
		this.enemyBullet = new EnemyBullet(this.scene, this.x-29, this.y);
		this.scene.enemyBullets.add(this.enemyBullet);
		this.scene.add.existing(this.enemyBullet);
		
	}

	updateEnemy(){
		if(this.y>960){
			this.enemyShield.removeShield();
				this.shotTimer.remove();
				this.destroy();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
