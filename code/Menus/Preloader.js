const width=window.innerWidth;
const height=window.innerHeight;

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({key: 'Preload'});
    }
    preload(){
        //loading screen
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(width/2-320/2, height/2, 320, 50);
        this.loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        this.percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 15,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        this.percentText.setOrigin(0.5, 0.5);
        this.loadingText.setOrigin(0.5, 0.5);
        this.assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 70,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        this.assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            this.scene.percentText.setText(parseInt(value * 100) + '%');
            this.scene.progressBar.clear();
            this.scene.progressBar.fillStyle(0xffffff, 1);
            this.scene.progressBar.fillRect(width/2-320/2+10, height/2+10, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            this.scene.assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            this.scene.progressBar.destroy();
            this.scene.progressBox.destroy();
            this.scene.loadingText.destroy();
            this.scene.percentText.destroy();
            this.scene.assetText.destroy();
        });
        //Game Files
        //images for game
        this.load.image("menu","assets\\menus\\menu_400x200_mountain.png");
        this.load.image("button", "assets\\menus\\button.png");
        this.load.image("fries", "assets\\sprites\\fries.png");
        this.load.image("tut","assets\\maps\\tutorial.png");
        this.load.image("cake","assets\\maps\\cake.png");
        //sounds for game
        this.load.audio("coinSound","assets\\sounds\\SUCCESS PICKUP Collect Chime 01.wav");
        this.load.audio("nextLevel","assets\\sounds\\RETRO Jump Up Bounce Long 03.wav");
        //spriteSheets
        this.load.spritesheet("donut", "assets\\sprites\\donut.png", { frameWidth: 60,
            frameHeight: 60});
        this.load.spritesheet(
            "player", "assets\\sprites\\burger2.png", {
                frameWidth: 43,
                frameHeight: 32,
                margin: 1,
                spacing: 2
            });
        //shape of sprites
        this.load.json('shapes', 'assets\\sprites\\sprite_bodies.json');
        //maps
        //level1
        this.load.tilemapTiledJSON("map1", "assets\\maps\\LevelJson\\level1.json");
        this.load.image("Tiles", "assets\\maps\\Tiles.png");
        //level2
        this.load.tilemapTiledJSON("map2", "assets\\maps\\LevelJson\\level2.json");
        this.load.image("Tiles2", "assets\\maps\\Curves.png");
        //level3
        this.load.tilemapTiledJSON("map3", "assets\\maps\\LevelJson\\level3.json");
        //level4
        this.load.tilemapTiledJSON("map4", "assets\\maps\\LevelJson\\level4.json");
        //level5
        this.load.tilemapTiledJSON("map5", "assets\\maps\\LevelJson\\level5.json");
        //level6
        this.load.tilemapTiledJSON("map6", "assets\\maps\\LevelJson\\level6.json");
        //level7
        this.load.tilemapTiledJSON("map7", "assets\\maps\\LevelJson\\level7.json");
        //level8
        this.load.tilemapTiledJSON("map8", "assets\\maps\\LevelJson\\level8.json");
        //level9
        this.load.tilemapTiledJSON("map9", "assets\\maps\\LevelJson\\level9.json");
        //level10
        this.load.tilemapTiledJSON("map10", "assets\\maps\\LevelJson\\level10.json");
        //level11
        this.load.tilemapTiledJSON("map11", "assets\\maps\\LevelJson\\level11.json");
        //level12
        this.load.tilemapTiledJSON("map12", "assets\\maps\\LevelJson\\level12.json");
        //level13
        this.load.tilemapTiledJSON("map13", "assets\\maps\\LevelJson\\level13.json");
        //level14
        this.load.tilemapTiledJSON("map14", "assets\\maps\\LevelJson\\level14.json");
        //level15
        this.load.tilemapTiledJSON("map15", "assets\\maps\\LevelJson\\level15.json");
        //level16
        this.load.tilemapTiledJSON("map16", "assets\\maps\\LevelJson\\level16.json");
        //level17
        this.load.tilemapTiledJSON("map17", "assets\\maps\\LevelJson\\level17.json");
        //level18
        this.load.tilemapTiledJSON("map18", "assets\\maps\\LevelJson\\level18.json");
        //level19
        this.load.tilemapTiledJSON("map19", "assets\\maps\\LevelJson\\level19.json");
        //level20
        this.load.tilemapTiledJSON("map20", "assets\\maps\\LevelJson\\level20.json");
        //level21
        this.load.tilemapTiledJSON("map21", "assets\\maps\\LevelJson\\level21.json");
    }
    create(){
        this.scene.start("MainMenu");
    }
}