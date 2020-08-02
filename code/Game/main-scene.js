import Player from "./Player.js"
const width=window.innerWidth;
const coinPosAux=[[[300,355],[340,355],[700,345]],[[300,225],[340,255],[1000,200],[960,200],[1040,200],[1550,200]],[[326,145],[366,178],[1350,240],[1390,240],[1430,240],[2440,120],[2640,120],[3370,320]],[[350,160],[614,12],[1214,109],[1309,172],[1444,107],[1581,171],[1679,100],[1779,172],[2559,427]],[[915,360],[1115,360],[1995,140],[2025,140],[2055,140],[2330,200],[2525,200]],[[527,355],[660,229],[1014,51],[1638,44],[1894,44],[2397,243],[2807,43]],[[237,347],[354,203],[573,40],[1205,314],[1483,331],[1641,326],[1850,301],[2611,294]],[[156,83],[327,146],[436,219],[685,210],[958,85],[1357,151],[1844,293],[2212,235],[2627,228],[2824,228]],[[692,308],[895,308],[1088,908],[1285,308],[1492,308],[1691,308],[1888,308],[2085,308],[2287,308]],[[246,343],[366,195],[807,148],[978,306],[1326,387],[1578,523],[1725,439],[1960,330],[2337,411],[2553,573],[2919,481]],[[333,462],[772,462],[1051,412],[1600,427],[2226,106],[2349,195],[2455,300],[2673,364],[3019,361],[3211,357],[3429,357],[3646,480]],[[284,54],[692,54],[920,42],[1174,122],[1342,244],[1756,178],[2010,278],[2322,416],[2570,150],[2960,114],[3400,114]],[[181,370],[318,521],[536,521],[717,337],[1061,242],[1276,334],[1490,434],[1617,364],[1975,250],[2396,448],[2875,392],[3100,267],[3665,226]],[[1122,412],[1530,402],[1915,402],[2140,181],[2560,181],[2779,351],[3105,471],[463,483],[3594,487]],[[220,457],[688,450],[930,444],[1285,459],[1776,448],[2142,444],[2224,403],[2431,163],[2727,163],[2985,387],[3315,385],[3678,381]],[[570,440],[600,440],[630,440],[1455,420],[1645,420],[2325,550],[3400,430],[3600,430]],[[590,425],[790,425],[1985,105],[2015,105],[2045,105],[3360,225],[3390,225]],[[1050,230],[1080,230],[1110,230],[1590,560],[1790,560],[2970,189],[3000,189],[3030,189],[3485,485],[3684,485]],[[595,345],[800,345],[1280,250],[1310,250],[1935,495],[3000,366],[3200,366]],[[1056,237],[1870,540],[1910,540],[1950,540],[2570,430],[2600,430],[2630,430]],[[1075,522],[1110,522],[1920,450],[2130,450],[3640,260],[3680,260],[3720,260]]]
const endYPosAux=[335,190,373,85,170,45,300,270,25,425,425,120,330,485,375,380,300,430,550,432,300];
const playerPosAux=[[100,360],[100,150],[100,40],[100,340],[100,50],[100,70],[100,300],[100,100],[100,300],[100,350],[100,350],[100,50],[100,300],[100,250],[100,400],[100,250],[100,250],[100,450],[100,300],[100,175],[100,200]];

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
        this.mapKey="map"+this.levelKey;
        // Create map
        var map = this.make.tilemap({key: this.mapKey});
        var tileset = map.addTilesetImage("Tiles",this.tiles[0]);
        var tileset2 = map.addTilesetImage("Curves",this.tiles[1]);
        var groundLayer = map.createDynamicLayer("Camada de Tiles 1", [tileset,tileset2], 0, 0);

        this.score = 0;

        if(this.levelKey==="1"){
            this.add.image(this.endY+918,535,"cake");
        }


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
                let sound=this.sound.add('coinSound',{
                    delay: 0,
                    volume: 0.5
                });
                sound.play();
                this.scoreText.setText("Score: "+this.score);
                gameObjectB.destroy();
            }
            else if(gameObjectB==this.end){
                let sound=this.sound.add('nextLevel',{
                    delay: 0,
                    volume: 0.5
                });
                sound.play();
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
                        if(!level || oLevel>level) {
                            localStorage.setItem("levels", this.levelKey);
                        }
                        //this.scene.start("MainMenu");
                        let nextLevel = parseInt(this.levelKey)+1;
                        this.scene.stop();
                        if(nextLevel<=21){
                            this.scene.start("Game",{coinPos:coinPosAux[parseInt(this.levelKey)],endY:endYPosAux[parseInt(this.levelKey)],playerPos:playerPosAux[parseInt(this.levelKey)],tiles:["Tiles","Tiles2"],level:nextLevel.toString()});
                        }
                        else{
                            this.scene.start("MainMenu");
                        }
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