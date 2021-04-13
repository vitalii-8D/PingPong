import Phaser from 'phaser'
import WebFontFile from "../js/WebFontFile";

import SceneKeys from "../js/SceneKeys";

class Game extends Phaser.Scene {
   /** @type{Phaser.Types.Input.Keyboard.CursorKeys} */
   cursor

   init() {
      this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)

      this.leftScore = 0
      this.rightScore = 0
   }

   preload() {
      const fonts = new WebFontFile(this.load, 'Press Start 2P')
      this.load.addFile(fonts)
   }

   create() {
      this.scene.run(SceneKeys.GameBackground)
      // Set bounds edges
      this.physics.world.setBounds(-100, 0, 1000, 500)

      this.ball = this.add.circle(400, 250, 10, 0xffffff, 1)
      this.physics.add.existing(this.ball)
      this.ball.body.setBounce(1, 1)

      this.ball.body.setCollideWorldBounds(true, 1, 1)

      this.resetBall()

      this.paddleLeft = this.add.rectangle(40, 250, 20, 100, 0xffffff, 1)
      this.physics.add.existing(this.paddleLeft, true)

      this.paddleRight = this.add.rectangle(760, 250, 20, 100, 0xffffff, 1)
      this.physics.add.existing(this.paddleRight, true)

      this.physics.add.collider(this.paddleLeft, this.ball)
      this.physics.add.collider(this.paddleRight, this.ball)

      this.leftScoreLabel = this.add.text(300, 125, '0', {
         fontSize: 48, fontFamily: '"Press Start 2P"'
      })
         .setOrigin(0.5, 0.5)
      this.rightScoreLabel = this.add.text(500, 375, '0', {
         fontSize: 48, fontFamily: '"Press Start 2P"'
      })
         .setOrigin(0.5, 0.5)

      this.cursor = this.input.keyboard.createCursorKeys()
   }

   update() {
      this.handlePlayerInput()

      this.handlePaddleBounds()

      this.checkScore()

      this.updateAI()
   }

   handleBallPaddleCollide() {

   }

   handlePlayerInput(){
      if (this.cursor.up.isDown) {
         this.paddleLeft.y -= 8
         this.paddleLeft.body.updateFromGameObject()
      } else if (this.cursor.down.isDown) {
         this.paddleLeft.y += 8
         this.paddleLeft.body.updateFromGameObject()
      } /*else if (this.cursor.left.isDown) {
         this.paddleLeft.x -= 8
         this.paddleLeft.body.updateFromGameObject()
      } else if (this.cursor.right.isDown) {
         this.paddleLeft.x += 8
         this.paddleLeft.body.updateFromGameObject()
      }*/
   }

   handlePaddleBounds() {
      if (this.paddleLeft.y < 0 + this.paddleLeft.height / 2) {
         this.paddleLeft.y = this.paddleLeft.height / 2
         this.paddleLeft.body.updateFromGameObject()
      } else if (this.paddleLeft.y > 500 - this.paddleLeft.height / 2) {
         this.paddleLeft.y = 500 - this.paddleLeft.height / 2
         this.paddleLeft.body.updateFromGameObject()
      }
      if (this.paddleRight.y < 0 + this.paddleRight.height / 2) {
         this.paddleRight.y = this.paddleRight.height / 2
         this.paddleRight.body.updateFromGameObject()
      } else if (this.paddleLeft.y > 500 - this.paddleRight.height / 2) {
         this.paddleRight.y = 500 - this.paddleRight.height / 2
         this.paddleRight.body.updateFromGameObject()
      }
   }

   updateAI() {
      const diff = this.ball.y - this.paddleRight.y
      if (Math.abs(diff) < 20 || this.ball.body.x < 400 || this.ball.body.velocity.x < 0) return false;
      const rightPaddleSpeed = 1.8;
      if (diff < 0) {
         // ball is above the paddle
         this.paddleRightVelocity.y = -rightPaddleSpeed
         if (this.paddleRightVelocity.y < -10) {
            this.paddleRightVelocity.y = -10
         }
      } else if (diff > 0) {
         // ball is below the paddle
         this.paddleRightVelocity.y = rightPaddleSpeed
         if (this.paddleRightVelocity.y > 10) {
            this.paddleRightVelocity.y = 10
         }
      }

      this.paddleRight.y += this.paddleRightVelocity.y;
      this.paddleRight.body.updateFromGameObject()
   }

   checkScore() {
      if (this.ball.x < -20) {
         // scored on the left side
         this.resetBall()
         this.incrementRightScore()
      } else if (this.ball.x > 820) {
         // scored on the right ball
         this.resetBall()
         this.incrementLeftScore()
      }
   }

   incrementLeftScore() {
      this.leftScore++
      this.leftScoreLabel.text = this.leftScore
   }
   incrementRightScore() {
      this.rightScore++
      this.rightScoreLabel.text = this.rightScore
   }

   resetBall() {
      this.ball.setPosition(400, 250)
      const angle = Math.random() < 0.5 ? Phaser.Math.Between(-70, 70) : Phaser.Math.Between(200, 340)
      const vec = this.physics.velocityFromAngle(angle, 200)

      this.ball.body.setVelocity(vec.x, vec.y)
   }
}

export default Game
