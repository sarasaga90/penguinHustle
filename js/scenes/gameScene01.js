class gameScene01 extends Phaser.Scene {

    constructor ()
    {
        super('gameScene01');
    }
    
    preload ()
    {

    	console.log("Escena de Juego 01 cargada.");


    }

    create ()
    {
        //audios com a youtube
        /* NO HAS AFEGIR ELS ASSETS, QUAN ELS AFEGEIXIS, POTS DESCOMENTAR EL CODI */
        /*
		this.dingSnd = this.sound.add('ding');
		this.jumpSnd = this.sound.add('jump');
		this.crashSnd = this.sound.add('crash');
		*/

		// Un fons senzill per al nostre joc
		this.add.image(480, 160, 'sky');
		
		
		// El grup de plataformes conté el terra i els 2 ressalts sobre els quals podem saltar
		this.platforms = this.physics.add.staticGroup();
		 

		// Aquí creem el terreny.
		// Cal escalar-lo per a que s'adapti a l'amplada del joc (l'sprite original té una mida de 400x32)
		this.platforms.create(480, 315, 'ground');
		 
		// Ara crearem algunes plataformes
		this.platforms.create(280, 180, 'platform1');
		this.platforms.create(780, 160, 'platform1');
		this.platforms.create(550, 200, 'platform2');


		// El jugador i la seva configuració
		this.player = this.physics.add.sprite(50, 220, 'ping');
		 
		// Propietats de la física del jugador. Afegeix un petit rebot al jugador en caure.
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		 
		// Les animacions dels nostres jugadors, girant, caminant a l’esquerra i caminant a la dreta.
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
		 
		// Algunes estrelles per recollir, 12 en total, separades uniformement a 70 píxels al llarg de l'eix X
		this.stars = this.physics.add.group({
			key: 'star',
			repeat: 13,
			setXY: { x: 12, y: 0, stepX: 70 }
		});
		 
		this.stars.children.iterate(function (child) {
		 
			// Cada estrella fa un rebot lleugerament diferent
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
		
		
    }

    update ()
    {

    	
		if (this.gameOver)
		{
			return;
		}
		 
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
		 
	collectStar (player, star)
	{
		star.disableBody(true, true);
		 
		// Afegeix i actualitza la puntuació
		this.score += 10;
		this.scoreText.setText('Score: ' + this.score);
		 
		if (this.stars.countActive(true) === 0)
		{
			// Un nou lot d’estrelles per a col·leccionar
			this.stars.children.iterate(function (child) {
			 
			child.enableBody(true, child.x, 0, true, true);
			 
			});
			 
			var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
			 
			var bomb = this.bombs.create(x, 16, 'bomb');
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
			bomb.allowGravity = false;
		}

    }

    hitBomb (player, bomb)
	{
		this.physics.pause();
		 
		player.setTint(0xff0000);
		 
		player.anims.play('turn');
		 
		this.gameOver = true;

	}
    
}