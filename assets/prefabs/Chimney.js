
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
		
		this.growingSound = this.scene.sound.add('growing');
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		const body = this.body;
		this.isObstructed = true;
		this.portaCreated =  false;
		this.chimneyLife = 5;
		this.isDestroyed = false;
		body.immovable = true;
		this.firstGrow = true
		body.setSize(this.width, this.height-54);
		
		arcade.add.collider(this, this.scene.enemies, this.updateObstruction,null,this);


		this.growTimer = this.scene.time.addEvent({
			delay: Math.random()*(5000 - 10000)+10000,                // ms
			callback: this.growAnim,
			//args: [],
			callbackScope: this,
			loop: true
		});
		
		
		this.checkObstruct = this.scene.time.addEvent({
			delay: 100,                // ms
			callback: this.checkEnemy,
			//args: [],
			callbackScope: this,
			loop: true
		});
		
	}

	checkEnemy(){
	
		if(this.isObstructed != true){
			if(!this.portaCreated){
				
				this.portal = new Portal(this.scene, this.x, this.y-this.width*3);
				this.scene.portals.add(this.portal);
				this.scene.add.existing(this.portal);
				this.portal.currentChimney = this;
				this.portaCreated = true;
			}
			
		}
		this.isObstructed = false;
	}

	updateObstruction(){
		
		this.isObstructed = true;
	}

	growAnim(){
		this.growingSound.play();
console.log(this.y);
		if(this.y>=900){
		this.growTween = this.scene.tweens.add({
			targets: this,
			y: '-=20',
			duration: 2000,
			ease: 'Bounce.easeOut',
			loop: false,
		});
	}else{
		console.log('ya llegue');
	}
		
	}

	updateActions(){

		if(this.y>1920 && !this.isDestroyed){
			
			this.portal.destroy();
			this.growTimer.remove();
			
			this.scene.chimeneyCount = this.chimneyPos
			console.log(this.scene.chimeneyCount);
			this.destroy();
			this.isDestroyed = true;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
