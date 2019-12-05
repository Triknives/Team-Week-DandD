import {Character} from './character.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Equipment} from './equipment.js';
import {Item} from './item.js';
import * as deck from './deck.js';

const player = deck.brawler;
let enemyArray;

export function combatStart(enemies) {
  enemyArray = enemies; //enemy array changes depending on location or combat specs?
  console.log("combat function started");
  $('.enemySide').html(''); //clears enemy slots


  for (let i = 0; i < enemyArray.length; i++) { //populates enemies
    console.log("forLoopEnemies");
    $('.enemySide').append(`
      <div class="enemy${i+1}">
      <div id="health0">
      </div>
      <div class="healthBackground">
      <div id="en1Health"class='healthProgress'>
      <p class="barTitle">Health</p>
      </div>
      </div>
      <input type="radio" class="target" name="target" value="${i}">en1<br>
      1
      </div>
      `)
    }

    let deadCount = 0;

    setTimeout(() => {
    while (deadCount < enemyArray.length && player.health.value > 0) {
      console.log("while loop");
      deadCount = 0;

      (async function fight() {
        console.log("async started");
        let attackReturn = await playerAttack(); //players turn
        console.log("player attack supposedy happened");
        if (attackReturn === true) {
          for (let j = 0; j < enemyArray.length; j++) { //enemies turn
            if (enemyArray[j].health.value < 1) {
              console.log("enemy dead if");
              deadCount += 1;
            } else {
              console.log("enemy attack");
              setTimeout(enemyArray[j].attack(player), 3000);
            }
          }//end of enemies turn
        }
      })();
    }

    //win eval
    if (player.health.value > 0) {
      alert("you win!")
    } else {
      console.log("you lose :( ")
    }
  },3000);


  }

  function playerAttack(){
    console.log("player attack function");
    $('#attackSubmit').click(function() {
      let target = enemyArray[parseInt($("input[name=target]:checked").val())];
      let damage = player.attack(target);
      return true;
    });
  }
