var gameoverScene = new Phaser.Scene('gameoverScene');
 
gameoverScene.create = function(){

	/*cabriola perque funcioni la musica PERO NO VA FML
	this.music_gameover =  this.sound.add('gameovermusic', {
		volume: 0.5,
		loop: true
	});

	if (!this.sound.locked)
	{
		// already unlocked so play
		this.music_gameover.play();
	}
	else
	{
		// wait for 'unlocked' to fire and then play
		this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
			this.music_gameover.play();
		})
	}

	this.music_gameover = this.sound.add('gameovermusic'); 
	*/

	var bg = this.add.sprite(0, 0, 'gameoverBg').setInteractive();
	bg.setOrigin(0, 0);

	var gameW = this.sys.game.config.width;
	var gameH = this.sys.game.config.height;

	bg.on('pointerdown', function(){
		this.scene.start('homeScene');
	}, this);
}