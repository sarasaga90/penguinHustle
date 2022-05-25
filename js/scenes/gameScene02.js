class gameScene02 extends Phaser.Scene {

    constructor ()
    {
        super('gameScene02');
    }
    
    preload ()
    {
		//no acabo d'entendre aquesta linia d'aqui avall...? per a què és?
    	console.log("Escena de Juego 02 cargada");
    }

    init(data){

        this.score = data.score;
        this.isLevelComplete = false;
		this.gameClear = false;

  
      }

    create ()
    {

//cabriola perque funcioni la musica
    	this.music_scene2 =  this.sound.add('bgm2', {
			volume: 0.5,
			loop: true
		});

		if (!this.sound.locked)
		{
			// already unlocked so play
			this.music_scene2.play();
		}
		else
		{
			// wait for 'unlocked' to fire and then play
			this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
				this.music_scene2.play();
			})
		}

		this.dingSnd = this.sound.add('ding');
		this.jumpSnd = this.sound.add('jump');
		this.crashSnd = this.sound.add('crash');

        //Marcador en pantalla + Level complet
        console.log(this.score + ' ' + this.isLevelComplete);

		// fons
		this.add.image(480, 160, 'sky');
		
		//plataformes base
		this.platforms = this.physics.add.staticGroup();

		//particula neu? no sembla funcionar així, desactivat
		//this.particle = this.particleadd("snow");

		//terreny
		this.platforms.create(480, 315, 'ground');
		 
		//plataformes
		this.platforms.create(250, 170, 'platform1');
		this.platforms.create(180, 190, 'platform2');
		this.platforms.create(540, 160, 'platform2');

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
		this.fishes = this.physics.add.group({
			key: 'fish',
			repeat: 13,
			setXY: { x: 12, y: 0, stepX: 70 }
		});
		 
		this.fishes.children.iterate(function (child) {
		 
			// Cada peix fa un rebot lleugerament diferent
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		 
		});
		 
		this.bombs = this.physics.add.group();
		 
		// La puntuació
        scoreText = this.add.text(16, 16, 'oeixets: ' + this.score, { fontSize: '32px', fill: '#000' });
		 
		// collide sprite i peixos amb les plataformes
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.fishes, this.platforms);
		this.physics.add.collider(this.bombs, this.platforms);
		 
		// colisions del sprite amb els peixos
		this.physics.add.overlap(this.player, this.fishes, this.collectFish, null, this);
		
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

     /*  console.log(this.score);

		  //Level complet
        if(this.isLevelComplete)
        {
            this.music_scene2.stop();
            this.scene.start('homeScene');
        }
        //gameOver
        if (gameOver)
        {
          this.music_scene2.stop();
          this.scene.start('gameoverScene');
        }
		 */

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
			this.jumpSnd.play();
		}
		
	}
		 
	//recollir peixets
	collectFish (player, fish)
	{
		this.dingSnd.play();

		fish.disableBody(true, true);

		//so, aquesta es la línia que em peta sempre tot, el play. Desactivat de moment
	//	dingSnd.play();
		 
		// Afegeix i actualitza la puntuació
		this.score += 1;
		this.scoreText.setText('peixets: ' + this.score);
		 
		//guanyar el joc al arribar a 100 peixos
		if (this.score.countActive(true) === 10)
		{	
			this.music_scene2.stop();
			this.gameClear = true;
		}



    }


	//Tocar bomba
    hitBomb (player, bomb)
	{
		this.physics.pause();
		this.cameras.main.flash();
		player.setTint(0xff0000);
		player.anims.play('turn');
        this.gameOver = true;

	}
	
    
}