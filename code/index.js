import MainScene from "./Game/main-scene.js";
import MainMenu from "./Menus/MainMenu.js";
import Preloader from "./Menus/Preloader.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#000c1f",

    // Scenes of the game
    scene: [Preloader,MainMenu,MainScene],

    // Load up Matter and optionally configure it
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 2 },
            debug: true, // put false before finish
            enableSleep: true
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin, // The plugin class
                key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    }

};

const game= new Phaser.Game(config);