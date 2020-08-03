const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 720;
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;
const width=window.innerWidth;
const height=window.innerHeight;

export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: 'MainMenu'});
    }
    create(){
        this.levelUnlocked = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.buttons = [];
        this.texts = [];
        this.containers = [];
        this.levels();

        for(let i=0;i<21;i++){
            this.buttons.push(this.add.image(0,0,'button').setScale(0.5));
        }
        for(let i=0;i<21;i++){
            let x =i+1;
            x = x.toString();
            let str = "Level "+x;
            this.texts.push(this.add.text(-20, -10, str,{font:" Times"}));
        }

        if(height>width){
            var heightEach = DEFAULT_HEIGHT/8;
            var ogY = 20;

            var widthEach = DEFAULT_WIDTH/6;
            var ogX= 70;

        }
        else {
            var heightEach = DEFAULT_HEIGHT / 8;
            var ogY = heightEach;

            var widthEach = DEFAULT_WIDTH / 4;
            var ogX = widthEach;
        }

        let c=this.add.container(ogX,ogY, [this.buttons[0], this.texts[0]])
            .setSize(95,25)
            .on('pointerup',() => {
                let map =
                this.scene.start("Game", {map: "map1",coinPos:[[300,355],[340,355],[700,345]],playerPos:[100,360],endY: 335, tiles:["Tiles","Tiles2"],level:"1"});});

        this.containers.push(c);

        c=this.add.container(ogX,ogY+heightEach, [this.buttons[1], this.texts[1]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map2",coinPos:[[300,225],[340,255],[1000,200],[960,200],[1040,200],[1550,200]],endY: 190,playerPos:[100,150], tiles:["Tiles","Tiles2"],level:"2"});});
        this.containers.push(c);

        c=this.add.container(ogX,ogY+heightEach*2, [this.buttons[2], this.texts[2]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map3",coinPos:[[326,145],[366,178],[1350,240],[1390,240],[1430,240],[2440,120],[2640,120],[3370,320]],endY: 373,playerPos:[100,40], tiles:["Tiles","Tiles2"],level:"3"});});
        this.containers.push(c);

        c=this.add.container(ogX,ogY+heightEach*3, [this.buttons[3], this.texts[3]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map4",coinPos:[[350,160],[614,12],[1214,109],[1309,172],[1444,107],[1581,171],[1679,100],[1779,172],[2559,427]],endY: 85,playerPos:[100,340], tiles:["Tiles","Tiles2"],level:"4"});});
        this.containers.push(c);

        c=this.add.container(ogX,ogY+heightEach*4, [this.buttons[4], this.texts[4]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map5",coinPos:[[915,360],[1115,360],[1995,140],[2025,140],[2055,140],[2330,200],[2525,200]],endY: 170,playerPos:[100,50], tiles:["Tiles","Tiles2"],level:"5"});});
        this.containers.push(c);

        c=this.add.container(ogX,ogY+heightEach*5, [this.buttons[5], this.texts[5]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map6",coinPos:[[527,355],[660,229],[1014,51],[1638,44],[1894,44],[2397,243],[2807,43]],endY: 45,playerPos:[100,70], tiles:["Tiles","Tiles2"],level:"6"});});
        this.containers.push(c);

        c=this.add.container(ogX,ogY+heightEach*6, [this.buttons[6], this.texts[6]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map7",coinPos:[[237,347],[354,203],[573,40],[1205,314],[1483,331],[1641,326],[1850,301],[2611,294]],endY: 300,playerPos:[100,300], tiles:["Tiles","Tiles2"],level:"7"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach,ogY, [this.buttons[7], this.texts[7]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map8",coinPos:[[156,83],[327,146],[436,219],[685,210],[958,85],[1357,151],[1844,293],[2212,235],[2627,228],[2824,228]],endY: 270,playerPos:[100,100], tiles:["Tiles","Tiles2"],level:"8"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach,ogY+heightEach, [this.buttons[8], this.texts[8]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map9",coinPos:[[692,308],[895,308],[1088,908],[1285,308],[1492,308],[1691,308],[1888,308],[2085,308],[2287,308]],endY: 25,playerPos:[100,300], tiles:["Tiles","Tiles2"],level:"9"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach,ogY+heightEach*2, [this.buttons[9], this.texts[9]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map10",coinPos:[[246,343],[366,195],[807,148],[978,306],[1326,387],[1578,523],[1725,439],[1960,330],[2337,411],[2553,573],[2919,481]],endY: 425,playerPos:[100,350], tiles:["Tiles","Tiles2"],level:"10"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach,ogY+heightEach*3, [this.buttons[10], this.texts[10]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map11",coinPos:[[333,462],[772,462],[1051,412],[1600,427],[2226,106],[2349,195],[2455,300],[2673,364],[3019,361],[3211,357],[3429,357],[3646,480]],endY: 425,playerPos:[100,350], tiles:["Tiles","Tiles2"],level:"11"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach,ogY+heightEach*4, [this.buttons[11], this.texts[11]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map12",coinPos:[[284,54],[692,54],[920,42],[1174,122],[1342,244],[1756,178],[2010,278],[2322,416],[2570,150],[2960,114],[3400,114]],endY: 120,playerPos:[100,50], tiles:["Tiles","Tiles2"],level:"12"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach,ogY+heightEach*5, [this.buttons[12], this.texts[12]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map13",coinPos:[[181,370],[318,521],[536,521],[717,337],[1061,242],[1276,334],[1490,434],[1617,364],[1975,250],[2396,448],[2875,392],[3100,267],[3665,226]],endY: 330,playerPos:[100,300], tiles:["Tiles","Tiles2"],level:"13"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach,ogY+heightEach*6, [this.buttons[13], this.texts[13]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map14",coinPos:[[1122,412],[1530,402],[1915,402],[2140,181],[2560,181],[2779,351],[3105,471],[463,483],[3594,487]],endY: 485,playerPos:[100,250], tiles:["Tiles","Tiles2"],level:"14"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach*2,ogY, [this.buttons[14], this.texts[14]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map15",coinPos:[[220,457],[688,450],[930,444],[1285,459],[1776,448],[2142,444],[2224,403],[2431,163],[2727,163],[2985,387],[3315,385],[3678,381]],endY: 375,playerPos:[100,400], tiles:["Tiles","Tiles2"],level:"15"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach*2,ogY+heightEach, [this.buttons[15], this.texts[15]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map16",coinPos:[[570,440],[600,440],[630,440],[1455,420],[1645,420],[2325,550],[3400,430],[3600,430]],endY: 380,playerPos:[100,250], tiles:["Tiles","Tiles2"],level:"16"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach*2,ogY+heightEach*2, [this.buttons[16], this.texts[16]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map17",coinPos:[[590,425],[790,425],[1985,105],[2015,105],[2045,105],[3360,225],[3390,225]],endY: 300,playerPos:[100,250], tiles:["Tiles","Tiles2"],level:"17"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach*2,ogY+heightEach*3, [this.buttons[17], this.texts[17]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map18",coinPos:[[1050,230],[1080,230],[1110,230],[1590,560],[1790,560],[2970,189],[3000,189],[3030,189],[3485,485],[3684,485]],endY: 430,playerPos:[100,450], tiles:["Tiles","Tiles2"],level:"18"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach*2,ogY+heightEach*4, [this.buttons[18], this.texts[18]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map19",coinPos:[[595,345],[800,345],[1280,250],[1310,250],[1935,495],[3000,366],[3200,366]],endY: 550,playerPos:[100,300], tiles:["Tiles","Tiles2"],level:"19"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach*2,ogY+heightEach*5, [this.buttons[19], this.texts[19]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map20",coinPos:[[1056,237],[1870,540],[1910,540],[1950,540],[2570,430],[2600,430],[2630,430]],endY: 432,playerPos:[100,175], tiles:["Tiles","Tiles2"],level:"20"});});
        this.containers.push(c);

        c=this.add.container(ogX+widthEach*2,ogY+heightEach*6, [this.buttons[20], this.texts[20]])
            .setSize(95,25)
            .on('pointerup',() => {
                this.scene.start("Game",{map: "map21",coinPos:[[1075,522],[1110,522],[1920,450],[2130,450],[3640,260],[3680,260],[3720,260]],endY: 300,playerPos:[100,200], tiles:["Tiles","Tiles2"],level:"21"});});
        this.containers.push(c);

        for(let i=0;i<21;i++){
            if(this.levelUnlocked[i]==1){
                this.containers[i].setInteractive({useHandCursor:true}, Phaser.Geom.Rectangle.Contains);
            }
        }


    }

    levels() {
        let x = localStorage.getItem("levels");
        if (x) {
            x = parseInt(x);
            for (let i = 0; i <= x; i++) {
                this.levelUnlocked[i] = 1;
            }
        } 
    }
}