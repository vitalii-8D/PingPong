import Phaser from 'phaser'

import Game from "./sceens/Game";
import TitleScreen from "./sceens/TitleScreen";
import GameBackground from "./sceens/GameBackground";

import SceneKeys from "./js/SceneKeys";

const config = {
   width: 800,
   height: 500,
   backgroundColor: '#13b50b',
   type: Phaser.AUTO,
   physics: {
      default: 'arcade',
      arcade: {
         gravity: {y: 0},
         debug: true
      }
   }
}

const game = new Phaser.Game(config)

game.scene.add(SceneKeys.TitleScreen, TitleScreen)
game.scene.add(SceneKeys.GameBackground, GameBackground)
game.scene.add(SceneKeys.Game, Game)
game.scene.start(SceneKeys.Game)
