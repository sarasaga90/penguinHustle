var gameoverScene = new Phaser.Scene('gameoverScene');
 
gameoverScene.create = function(){

	var bg = this.add.sprite(0, 0, 'gameoverBg').setInteractive();
	bg.setOrigin(0, 0);

	var gameW = this.sys.game.config.width;
	var gameH = this.sys.game.config.height;

	bg.on('pointerdown', function(){
		this.scene.start('gameScene02');
	}, this);
}