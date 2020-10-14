
// You can write more code here

/* START OF COMPILED CODE */

class Debree extends Phaser.GameObjects.Image {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "debree", frame);
		
		/* START-USER-CTR-CODE */
		this.start();
	
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){

		this.setScale(Math.random()*4);
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		this.alpha = 0.5;
		const body = this.body;
		this.rotation=Math.random();
		const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		//this.body.velocity.x = Math.random( )*60*plusOrMinus;
		this.body.angularVelocity = Math.random( )*360*plusOrMinus;
		body.setSize(this.width, this.height);
		body.velocity.y = 500;

		this.updateTimer = this.scene.time.addEvent({
			delay: 10,       // ms
			callback: this.customUpdate,
			//args: [],
			callbackScope: this,
			loop: true
		});
	}

	customUpdate(){
		
		if(this.y>=960){
		
			this.updateTimer.remove();	
			this.destroy();
				
		}

	
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
