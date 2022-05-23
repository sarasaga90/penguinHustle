var loadingScene = new Phaser.Scene('Loading');
 
loadingScene.preload = function(){

	this.load.image ('loading', 'assets/startButton.png');
 
	var progressBar = this.add.graphics();
	var progressBox = this.add.graphics();
	 
	progressBox.fillStyle(0x222222, 0.8);
	progressBox.fillRect(240, 270, 320, 50);
	 
	var width = this.cameras.main.width;
	var height = this.cameras.main.height;
	var loadingText = this.make.text({
		x: width / 2,
		y: height / 2 - 50,
		text: 'Cargando...',
		style: {
			font: '20px monospace',
			fill: '#ffffff'
		}
	});
	 
	loadingText.setOrigin(0.5, 0.5);
	 
	var percentText = this.make.text({
		x: width / 2,
		y: height / 2 - 5,
		text: '0%',
		style: {
			font: '18px monospace',
			fill: '#ffffff'
		}
	});
	 
	percentText.setOrigin(0.5, 0.5);
	 
	var assetText = this.make.text({
		x: width / 2,
		y: height / 2 + 50,
		text: '',
		style: {
			font: '18px monospace',
			fill: '#ffffff'
		}
	});
	 
	assetText.setOrigin(0.5, 0.5);
	 
	this.load.on('progress', function (value) {
		percentText.setText(parseInt(value * 100) + '%');
		progressBar.clear();
		progressBar.fillStyle(0xffffff, 1);
		progressBar.fillRect(250, 280, 300 * value, 30);
	});
	 
	this.load.on('fileprogress', function (file) {
		assetText.setText('Loading asset: ' + file.src);
	});
	 
	this.load.on('complete', function () {
		progressBar.destroy();
		progressBox.destroy();
		loadingText.destroy();
		percentText.destroy();
		assetText.destroy();
	});


	/* --------------------- CARREGA D'ASSETS DEL VIDEOJOC ---------------------------------------------- */

	//imatges
	this.load.image('sky', 'assets/bgIceLevel1.bmp');
	this.load.image('ground', 'assets/ground.png');
	this.load.image('platform1', 'assets/plataforma1.png');
	this.load.image('platform2', 'assets/plataforma2.png');
	this.load.image('fish', 'assets/fish1.png');
	this.load.image('bomb', 'assets/16bit-sand-dollar.png');
	this.load.image('homebg', 'assets/homeBg.bmp');
	this.load.image('gameoverBg', 'assets/gameoverBg.png');
	this.load.image('startButton', 'assets/startButton.png');

	//particula neu
	this.load.image('snow', 'assets/snow.png');

	//spritesheet
	this.load.spritesheet('ping', 'assets/ping.png', { frameWidth: 32, frameHeight: 48 });

	// audios
	this.load.audio('ding', 'assets/audio/ding.mp3');
	this.load.audio('jump', 'assets/audio/jump.mp3');
	this.load.audio('bgm1', ['assets/audio/bgm1.mp3', 'bgm1.ogg']);
	this.load.audio('bgm2', 'assets/audio/bgm2.mp3');
	this.load.audio('crash', 'assets/audio/crash.mp3');

};
 
loadingScene.create = function(){
 
 	var pantalla_load = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'loading').setInteractive();

	pantalla_load.on('pointerdown', function(){

		this.scene.start('Home');

	}, this);

 
};