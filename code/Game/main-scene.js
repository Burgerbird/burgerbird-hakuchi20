import Player from "./Player.js"
const width=window.innerWidth;
const length=window.innerHeight;

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'Game'});
    }

    init(data){
        this.mapKey = data.map;
        this.coinPos = data.coinPos;
        this.endY = data.endY;
        this.tiles = data.tiles;
        this.levelKey = data.level;
        this.playerPos = data.playerPos;
    }

    create() {
        // Create map
        var map = this.make.tilemap({key: this.mapKey});
        var tileset = map.addTilesetImage("Tiles",this.tiles[0]);
        var tileset2 = map.addTilesetImage("Curves",this.tiles[1]);
        var groundLayer = map.createDynamicLayer("Camada de Tiles 1", [tileset,tileset2], 0, 0);

        this.score = 0;


        // Set collision
        groundLayer.setCollisionByProperty({collides: true});

        // Create Player
        this.player = new Player(this, this.playerPos[0], this.playerPos[1], 2)
        this.player.sprite.body.velocity.x  = 0;

        //coins
        this.coins = [];
        this.createCoins(this.coinPos.length,this.coinPos);

        //end
        this.end = this.matter.add.image(map.width*10-30,this.endY,"fries").setScale(2).setStatic(true);

        // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
        // haven't mapped out custom collision shapes in Tiled so each colliding tile will get a default
        this.matter.world.convertTilemapLayer(groundLayer);

        //texts
        if(this.levelKey=="1") {
            var tut = this.matter.add.image(100, 200, "tut");
            tut.setStatic(true);
        }
        this.scoreText = this.add.text(715, 10, "Score: 0",{font:" Verdana"}).setScrollFactor(0);

        //Debug (delete this before finish)
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;
        this.input.keyboard.on("keydown_E", event => {
            this.matter.world.drawDebug = !this.matter.world.drawDebug;
            this.matter.world.debugGraphic.clear();
        });

        this.matter.world.setBounds(0, -500, map.width*10, map.height*10+500);

        // cameras to follow player
        this.cameras.main.setBounds(0, -500, map.widthInPixels, map.heightInPixels+500);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

        //Colisions
        this.matterCollision.addOnCollideStart({
            objectA: this.player.sprite,
            callback: this.onPlayerCollide,
            context: this
        });

        this.input.on('pointerdown',function (pointer){
            let x = pointer.x;
            if(x<=width/2){
                this.scene.player.tLeft=1;
            }
            else{
                this.scene.player.tRight=1;
            }
        });
        this.input.on('pointerup',function (pointer) {
            this.scene.player.tLeft=0;
            this.scene.player.tRight=0;
        });

    }

    createCoins(x,pos){
        var shapes = this.cache.json.get('shapes');
        for (let i=0;i<x;i++){
            let donut=this.matter.add.sprite(pos[i][0],pos[i][1],'donut',{shape:shapes.donut});
            donut.setScale(0.5).setStatic(true).setBounce(0);
            this.coins.push(donut);
        }
    }

    onPlayerCollide({ gameObjectB }) {
        //Detects if the player collides with a tile
        if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)){
            if (this.coins.includes(gameObjectB)){
                this.score+=1;
                this.scoreText.setText("Score: "+this.score);
                gameObjectB.destroy();
            }
            else if(gameObjectB==this.end){
                this.player.freeze();
                const cam = this.cameras.main;
                cam.fade(250, 0, 0, 0);
                cam.once("camerafadeoutcomplete", () => this.scene.restart());
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        let level = localStorage.getItem("levels");
                        level = parseInt(level);
                        let oLevel = parseInt(this.levelKey);
                        if(oLevel>level) {
                            localStorage.setItem("levels", this.levelKey);
                        }
                        this.scene.start("MainMenu");
                        this.scene.stop();
                    }
                });
            }
            return;
        }

        const tile = gameObjectB;

        // Check the tile property set in Tiled
        // change player movespeed if its climbing or going down hill
        if(tile.properties.isDown) {
            if (this.player.moveSpeed <10) {
                this.player.moveSpeed += 1;
            }
        }
        else if(tile.properties.isUp) {
            if (this.player.moveSpeed > 5) {
                this.player.moveSpeed -= 1;
            }
        }

    }

}