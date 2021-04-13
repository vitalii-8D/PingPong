import Phaser from 'phaser'

export default class GameBackground extends Phaser.Scene {
   preload() {

   }
   create(){
      /*this.add.arc(400, 250, 80, 0, 360, false, 0xffffff, 1)
      this.add.arc(400, 250, 77, 0, 360, false, 0x13b50b, 1)*/
      this.add.line(400, 250,
         0, 0,
         0, 500,
         0xffffff, 1)
         .setLineWidth(3)
      this.add.circle(400, 250, 80)
         .setStrokeStyle(5, 0xffffff)
   }
}
