var homeScene = new Phaser.Scene('Home');
 
homeScene.create = function(){

	var bg = this.add.sprite(0, 0, 'homebg').setInteractive();
	bg.setOrigin(0, 0);

   //música que no sona...
   this.menu_music = this.sound.add('bgm1');
   this.menu_music.play;

	var gameW = this.sys.game.config.width;
	var gameH = this.sys.game.config.height;

	var text = this.add.text(gameW/2, gameH/2, 'jueguito plataformero - Sara Sánchez, IOC M6 EAF5', {
		font: '20px Arial',
		fill: '#0993ab'
	});
	text.setOrigin(0.5, 0.5);
	text.depth = 1;

	var text = this.add.text(480, 230, 'recull totes les sardines i que no et pillin les estrelles de mar!', {
		font: '20px Arial',
		fill: '#0993ab'
	});
	text.setOrigin(0.5, 0.1);
		text.depth = 1;

	bg.on('pointerdown', function(){
		this.scene.start('gameScene01');
	}, this);

	
}