class gameScene01 extends Phaser.Scene {

    constructor ()
    {
        super('gameScene01');
    }
    
    preload ()
    {
    	console.log("Escena de Juego 01 cargada");
    }

	 // Funció init per establir valors a 0 i false
	init(){
		this.score = 0;	  
	}

    create ()
    {
        //audios     
		this.dingSnd = this.sound.add('ding');
		this.jumpSnd = this.sound.add('jump');
		this.crashSnd = this.sound.add('crash');
        this.music = this.sound.add ('bgm1');

		// fons
		this.add.image(480, 160, 'sky');
		
		//plataformes base
		this.platforms = this.physics.add.staticGroup();

		//terreny
		this.platforms.create(480, 315, 'ground');
		 
		//plataformes
		this.platforms.create(280, 180, 'platform1');
		this.platforms.create(780, 160, 'platform1');
		this.platforms.create(550, 200, 'platform2');

		//sprite
		this.player = this.physics.add.sprite(50, 220, 'ping');
		 
		//rebot sprite
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		 
		//animacions sprite
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('ping', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		 
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'ping', frame: 4 } ],
			frameRate: 20
		});
		 
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('ping', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});
		 
		// Events d'entrada amb el teclat
		this.cursors = this.input.keyboard.createCursorKeys();
		 
		// creacio de peixos
		this.stars = this.physics.add.group({
			key: 'star',
			repeat: 13,
			setXY: { x: 12, y: 0, stepX: 70 }
		//	set: {(Phaser.Math.FloatBetween(0.4, 0.8))};
		});
		 
		this.stars.children.iterate(function (child) {
		 
			// Cada peix fa un rebot lleugerament diferent
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		 
		});
		 
		this.bombs = this.physics.add.group();
		 
		// La puntuació
		this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
		 
		// Xoca el jugador i les estrelles amb les plataformes
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.stars, this.platforms);
		this.physics.add.collider(this.bombs, this.platforms);
		 
		// Comprova si el jugador col·lisiona amb alguna de les estrelles, si crida ho fa, a la funció collectStar
		this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
		 
		this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
		
		/*-----un intent de neu que fa que em peti tot igual que l'audio aaaagh
		var particles = scene.add.particles("snow");

		particles.createEmitter({
			frame: 'blue',
			x: { min: 0, max: 800 },
			y: 0,
			lifespan: 2000,
			speedY: { min: 200, max: 400 },
			scale: { start: 0.4, end: 0 },
			quantity: 4,
			blendMode: 'ADD'
			});

			*/
		
    }

    update ()
    {

    	
		if (this.gameOver)
		{
			return;
		}
		 
		//moviment sprite
		if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-160);
			 
			this.player.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160);
			 
			this.player.anims.play('right', true);
		}
		else
		{
			this.player.setVelocityX(0);
			 
			this.player.anims.play('turn');
		}
		 
		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-330);
		}
		
	}
		 
	//recollir peixets
	collectStar (player, star)
	{
		star.disableBody(true, true);
		 
		// Afegeix i actualitza la puntuació
		this.score += 10;
		this.scoreText.setText('score:' + this.score);
		 
		//passar al seguent nivell quan has pillat tots els peixos
		if (this.stars.countActive(true) === 0)
		{	
			this.scene.start('gameScene02');
			sprite.setData('score', 'score');
		}
		}


    }

	
	//Tocar bomba
    hitBomb (player, bomb)
	{
		this.physics.pause();
		this.cameras.main.flash();
		player.setTint(0xff0000);
		player.anims.play('turn');
	}
    