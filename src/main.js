import {Character} from './character.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Equipment} from './equipment.js';
import {Item} from './item.js';
import * as deck from './deck.js';
import {combatStart} from './combat.js';


$(document).ready(function(){
  //Navigation
  $(".goCave").click(function(event) {
    event.preventDefault();
    $("#forest").hide();
    $("#crypt").hide();
    $("#cave").show();
  });

  $("#forestNarration").click(function() {
    $("#forestNarration").hide();
  });

  $(".goForest").click(function() {
    $("#cave").hide();
    $("#forest").show();
  });

  $("#caveNarration").click(function() {
      $(".combatWindow").show();
      $("#caveNarration").hide();
      //propogate enemies
      setTimeout(() => { combatStart(deck.giantRat)},1000);
  });

  $(".goCrypt").click(function() {
    $("#cave").hide();
    $("#crypt").show();
  });

  $("#cryptNarration").click(function() {
    $("#cryptNarration").hide();
  });


  //choose enemy's target
  function doAction(character, target) {
    let randomAction; //randomize action
    let randomSpell; //randomize spell choice
    let damage = false;

    while (damage === false) {
      randomAction = Math.floor(Math.random()*2);
      randomSpell = Math.floor(Math.random()* character.spells.length);
      switch (randomSpell) { //set as number for testing; should be randomAction
        case 0: //Attack Section
        damage = character.attack(target);
        //html output 'Enemy Attacks'
        break;
        case 1: //Spell Section
        damage = character.cast(character.spells[randomSpell], target);
        //html output 'Enemy Cast "Spell"'
        break;
        case 2: //Item Section IN CONSTRUCTION

        break;
      }
    }
  }
});
