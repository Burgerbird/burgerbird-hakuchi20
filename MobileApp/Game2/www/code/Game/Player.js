import MultiKey from "./multi-keys.js";

export default class Player {
    constructor(scene, x, y, moveSpeed) {
        this.scene = scene;
        this.moveSpeed = moveSpeed;
        this.MAX_SPEED_BACKWARDS = this.moveSpeed * 0.75
        this.ACCELERATION = this.moveSpeed / 130
        this.ACCELERATION_BACKWARDS = this.ACCELERATION * 0.75

        // shape of player done with Physics Editor
        var shapes = scene.cache.json.get('shapes');
        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.matter.add.sprite(0, 0, "player", 0,{shape: shapes.burger2});
        // Add body to player
        const { width: w, height: h } = this.sprite;
        const mainBody = this.sprite.body;
        this.sprite.x = w/2;
        this.sprite.y = h/2;

        this.compoundBody = mainBody;
        this.sprite
            .setScale(1)
            .setPosition(x, y)
            .setDensity(0.001)
            .setFriction(0.9)
            .setBounce(0);
        this.isTouching = { left: false, right: false, ground: false };

        // Before matter's update, reset our record of what surfaces the player is touching.
        scene.matter.world.on("beforeupdate", this.resetTouching, this);

        // Detect Keys
        const { LEFT, RIGHT, A, D} = Phaser.Input.Keyboard.KeyCodes;
        scene.leftInput = new MultiKey(scene, [LEFT, A]);
        scene.rightInput = new MultiKey(scene, [RIGHT, D]);

        // Events to do when scene is updated
        this.scene.events.on("update", this.update, this);
        this.destroyed = false;
        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);

        this.tLeft=0;
        this.tRight=0;
    }

    resetTouching() {
        this.isTouching.left = false;
        this.isTouching.right = false;
    }

    // Put player static so it doesnt move
    freeze() {
        this.sprite.setStatic(true);
    }

    update(){
        if (this.destroyed) return;

        const burgerBody = this.compoundBody ;
        const isRightKeyDown = this.scene.rightInput.isDown();
        const isLeftKeyDown = this.scene.leftInput.isDown();

        // Only needed if thers other sprites other than the player
        if (isRightKeyDown || this.tRight) {
            let newSpeed = burgerBody.angularSpeed <= 0 ? this.moveSpeed / 10 :burgerBody.angularSpeed + this.ACCELERATION
            if (newSpeed > this.moveSpeed) newSpeed = this.moveSpeed
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(burgerBody, newSpeed);
            this.sprite.setFlipX(false);

        } else if (isLeftKeyDown || this.tLeft) {
            let newSpeed = burgerBody.angularSpeed <= 0  ? this.MAX_SPEED_BACKWARDS / 10  : burgerBody.angularSpeed + this.ACCELERATION_BACKWARDS
            if (newSpeed > this.MAX_SPEED_BACKWARDS) newSpeed = this.MAX_SPEED_BACKWARDS
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(burgerBody, -newSpeed)
            this.sprite.setFlipX(true);
        }
    }

    // Destroy Everything of the Player
    destroy() {
        this.destroyed = true;

        // Event listeners
        this.scene.events.off("update", this.update, this);
        this.scene.events.off("shutdown", this.destroy, this);
        this.scene.events.off("destroy", this.destroy, this);
        if (this.scene.matter.world) {
            this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
        }

        this.sprite.destroy();
    }
}