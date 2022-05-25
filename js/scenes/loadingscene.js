var loadingScene = new Phaser.Scene('Loading');
 
loadingScene.preload = function(){
 
	var bgBar = this.add.graphics();

	var barW = 960;
	var barH = 30;

	bgBar.setPosition(480, 600);
	bgBar.fillStyle(0xF5F5F5, 1);
	bgBar.fillRect(0, 0, barW, barH);

	var progressBar = this.add.graphics();
	progressBar.setPosition(200, 600);

	var width = this.cameras.main.width;
	var height = this.cameras.main.height;

	var loadingText = this.make.text(
	{
		x: width / 2,
		y: height / 2,
		text: 'LOADING...',
		style:
		{
			font: '20px Arial',
			fill: '#000000'
		}
	});

	loadingText.setPosition(625, 550);

	var percentText = this.make.text(
	{
		x: width / 2,
		y: height / 2,
		text: '0%',
		style:
		{
			font: '20px Arial',
			fill: '#000000'
		}
	});

	percentText.setPosition(200, 600);

	this.load.on('progress', function(value)
	{
		percentText.setText(parseInt(value * 100) + '%');
		progressBar.clear();
		progressBar.fillStyle(0x9AD98D, 1);
		progressBar.fillRect(0, 0, value * barW, barH);

	}, this);


	this.load.on('complete', function () {
            progressBar.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

	this.load.image ('loading', 'assets/startButton.png');


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
	this.load.image('gameclearBg', 'assets/gameclearBg.png');
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
	this.load.audio('gameovermusic', 'sunfish-breath00.mp3');
	
};
 
loadingScene.create = function(){
 
 	var pantalla_load = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'loading').setInteractive();

	pantalla_load.on('pointerdown', function(){

		this.scene.start('Home');

	}, this);

 
};