import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene {
   constructor() {
      super();
   }

   preload() {

   }

   create() {
      this.add.text(400, 250, 'Hello World')
         .setOrigin(0.5, 0.5)
   }
}
