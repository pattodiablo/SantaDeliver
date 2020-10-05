
// You can write more code here



/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Sprite} */
		this.bgBuildings2;
		/** @type {Phaser.GameObjects.Image} */
		this.bgBuildings1;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	create() {
		
		// background
		const background = this.add.image(0, 0, "background");
		background.setOrigin(0, 0);
		
		// bgBuildings2
		const bgBuildings2 = this.add.sprite(0, 818, "bgBuildings2");
		
		// bgBuildings1
		const bgBuildings1 = this.add.image(640, 863, "bgBuildings1");
		
		// moonBg
		this.add.image(323, 196, "moonBg");
		
		// chimneyBg
		this.add.image(318, 880, "chimneyBg");
		
		this.bgBuildings2 = bgBuildings2;
		this.bgBuildings1 = bgBuildings1;
	}
	
	/* START-USER-CODE */

	// Write your code here.
	update(){
	

		this.bgBuildings2.x+=2;
		this.bgBuildings1.x-=0.2;
		
		if(this.bgBuildings2.x >= this.game.config.width){

			this.bgBuildings2.x = 0;
		}
		

		if(this.bgBuildings1.x <= 0 ){
				this.bgBuildings1.x = this.game.config.width;
			} 
		
		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
