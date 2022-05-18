var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 320,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 300 },
    debug: false
    }
    },
    scene: {
    preload: preload,
    create: create,
    update: update
    }
    };
     
    var player;
    var stars;
    var bombs;
    var platforms;
    var cursors;
    var score = 0;
    var gameOver = false;
    var scoreText;
    //extra disparar
    var bullets;
    var lastFired = 0;
    var cursors;
    var fire;
     
    var game = new Phaser.Game(config);
     
    function preload ()
    {
    this.load.image('sky', 'assets/bgIceLevel1.bmp');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform1', 'assets/plataforma1.png');
    this.load.image('platform2', 'assets/plataforma2.png');
    this.load.image('star', 'assets/fish1.png');
    this.load.image('bomb', 'assets/16bit-sand-dollar.png');
    this.load.spritesheet('ping', 'assets/ping.png', { frameWidth: 32, frameHeight: 48 });
    
    // els dichosos audios
    this.load.audio('ding', 'assets/audio/ding.mp3');
    this.load.audio('jump', 'assets/audio/jump.mp3');
    this.load.audio('bgm1', ['assets/audio/bgm1.mp3', 'bgm1.ogg']);
    this.load.audio('crash', 'assets/audio/crash.mp3');
    
    }
     
    function create ()
    
    {
    
    //audios com a youtube
    this.dingSnd = this.sound.add('ding');
    this.jumpSnd = this.sound.add('jump');
    this.crashSnd = this.sound.add('crash');
    
    // Un fons senzill per al nostre joc
    this.add.image(480, 160, 'sky');
     
    // El grup de plataformes conté el terra i els 2 ressalts sobre els quals podem saltar
    platforms = this.physics.add.staticGroup();
     
    // Aquí creem el terreny.
    // Cal escalar-lo per a que s'adapti a l'amplada del joc (l'sprite original té una mida de 400x32)
    platforms.create(480, 315, 'ground');
     
    // Ara crearem algunes plataformes
    platforms.create(280, 180, 'platform1');
    platforms.create(780, 160, 'platform1');
    platforms.create(550, 200, 'platform2');
    
    // El jugador i la seva configuració
    player = this.physics.add.sprite(50, 220, 'ping');
     
    // Propietats de la física del jugador. Afegeix un petit rebot al jugador en caure.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
     
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
    cursors = this.input.keyboard.createCursorKeys();
     
    // Algunes estrelles per recollir, 12 en total, separades uniformement a 70 píxels al llarg de l'eix X
    stars = this.physics.add.group({
    key: 'star',
    repeat: 13,
    setXY: { x: 12, y: 0, stepX: 70 }
    });
     
    stars.children.iterate(function (child) {
     
    // Cada estrella fa un rebot lleugerament diferent
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
     
    });
     
    bombs = this.physics.add.group();
     
    // La puntuació
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
     
    // Xoca el jugador i les estrelles amb les plataformes
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
     
    // Comprova si el jugador col·lisiona amb alguna de les estrelles, si crida ho fa, a la funció collectStar
    this.physics.add.overlap(player, stars, collectStar, null, this);
     
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    }
     
    function update ()
    {
    if (gameOver)
    {
    return;
    }
     
    if (cursors.left.isDown)
    {
    player.setVelocityX(-160);
     
    player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
    player.setVelocityX(160);
     
    player.anims.play('right', true);
    }
    else
    {
    player.setVelocityX(0);
     
    player.anims.play('turn');
    }
     
    if (cursors.up.isDown && player.body.touching.down)
    {
    player.setVelocityY(-330);
    }
    }
     
    function collectStar (player, star)
    {
    star.disableBody(true, true);
     
    // Afegeix i actualitza la puntuació
    score += 10;
    scoreText.setText('Score: ' + score);
     
    if (stars.countActive(true) === 0)
    {
    // Un nou lot d’estrelles per a col·leccionar
    stars.children.iterate(function (child) {
     
    child.enableBody(true, child.x, 0, true, true);
     
    });
     
    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
     
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
     
    }
    }
     
    function hitBomb (player, bomb)
    {
    this.physics.pause();
     
    player.setTint(0xff0000);
     
    player.anims.play('turn');
     
    gameOver = true;
    }