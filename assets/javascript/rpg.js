 
$(document).ready(function(){

var hero;
var nemesis;
var charoptions = ["chihiro", "haku", "yubaba", "noface", "boh"];
var charstrength = {};
var nemesisSel = [];
 
//var resetChar = $("#selectChar").find(`[value='${hero}']`);//$("#selectChar").find(".char");


function getStrength(){
  for (i=0; i<charoptions.length; i++){
    var strength = Math.floor((Math.random() * 50) + 1);
    console.log(strength);
    var key = charoptions[i];
    console.log(key);
    charstrength[key] = strength;
  }
};

function reset(){
  getStrength();
  console.log(Object.keys(charstrength));
  console.log(Object.values(charstrength));
  $("#selectChar").find(`[value='${hero}']`).show();
  for (i=0; i<nemesisSel.length; i++){
    $("#selectChar").find(`[value='${nemesisSel[i]}']`).show();
  }
  hero=undefined;
  nemesis=undefined;
  $("#characters").html('<h2>Characters</h2>'+
  '<p>click on the character you want to play</p>');
  //$("#selectChar").append(resetChar);
  $("#hero").html("");
  $("#archnemesis").html("");
  $("#battlefield").hide();
  nemesisSel = [];
  //$("#battlefield").html('<h2>Battlefield</h2>');
  //when the game is reset the attack button no longer works
};


function playBtn(idword, id){
      var Btn = $("<button>")
      Btn.addClass("playagain");
      Btn.attr("id", idword);
      Btn.text(idword);
      $(id).append(Btn);
};

getStrength();
console.log(Object.keys(charstrength));
console.log(Object.values(charstrength));


 $(".char").on("click", function() {
  
    //determine if it is the first char selected
    //this about adding another else statement to handle extra clicks
    if (hero === undefined){
      hero = this.value;
      $("#hero").append('<h2>Hero</h2><div style= "background-color: #75d7ea;" class="play"><img class="charimg" src="images/'
        +hero+'.jpg" alt="this is a character"> <p class="points">points:'+
        ' <div id="heropnts" class="points">150</div> </p></div>');

      //$("#selectChar").find(`[value='${hero}']`).remove();
      $("#selectChar").find(`[value='${hero}']`).hide();

      $("#characters").html('<div id="enemies"> <h2>Enemies</h2>' +
        '<p>pick a nemesis to battle to the death</p> </div>');
    }
    else if (nemesis === undefined){
      //if it is not the first char selected it is the nemesis

      nemesis = this.value;
      nemesisSel.push(nemesis);
      console.log(nemesisSel + "length " + nemesisSel.length);
      $("#archnemesis").html('<h2>Nemesis</h2><div style= "background-color: #b70303;" class="play"><img class="charimg"' +
       'src="images/'+nemesis+'.jpg" alt="this is a character">' +
       ' <p class="points">points: <div id="nemesispnts" class="points">150</div> </p></div>');

      $("#selectChar").find(`[value='${nemesis}']`).hide();

      $("#battlefield").show();
      $("#attack").show();
    }
    else{
      console.log("you already chose");
    }
});


//on choosing play again attack button is not functioning properly
$("#attack").on("click", function() {

  //this should have some effect on the number of points held by the user and the nemesis
  //the strength of user's attack should grow with each attack while the enemy's remains
  //the same
  //use jquery to update the points on the images
  //maybe add sounds to this?????

  var heropower = charstrength[hero]; // if you have save the value of a key to a variable
  //and want to use it to get the value in an object use obectname[variable] the .key method 
  //does not work here
  var nemesispower = charstrength[nemesis];
  console.log(charstrength[hero]);
  console.log(hero);
  
  var heropnts = $("#heropnts").text(); //or .html()
  heropnts -= nemesispower;
  var nemesispnts = $("#nemesispnts").text(); //or .html()
  nemesispnts -= heropower;
 

  console.log("hero = " + heropnts);
  console.log("nemesis = " + nemesispnts);

  //increase the strength of hero
  charstrength[hero] = heropower + Math.floor((Math.random() * 10) + 1);

  //once the point are updated use jquery to update them in the html
  $("#heropnts").text(heropnts); 
  //or  $("#heropnts").html(heropnts); 
  $("#nemesispnts").text(nemesispnts);

  //$("#battlefield").append("<p>ATTACK!</p>");

  if(heropnts<=0){
    $("#attack").hide();
    $("#battlefield").append('<div id="gameOver"><h2>game over!</h2><p>Play Again?</p></div>');
    playBtn("yes", "#gameOver");
    $("#yes").on("click", function (){
        $("#gameOver").remove();
        reset();
    })
    playBtn("no", "#gameOver");
    $("#no").on("click", function (){
        $("#battlefield").html("<h1>Goodbye</h1>");
    })
       
  }
  //check for a win in this function maybe?
  else if(nemesispnts<=0){
    if(nemesisSel.length >= 4){
    $("#battlefield").append('<div id="playAgain"><p>Play Again?</p></div>');      
      playBtn("yes", "#playAgain");
      $("#yes").on("click", function (){
          $("#playAgain").remove();
          reset();
      })
      playBtn("no", "#playAgain");
      $("#no").on("click", function (){
          $("#playAgain").html("<h1>Goodbye</h1>");
      })
    }
    $("#archnemesis").html("");
    $("#archnemesis").append('<br><br><br><p>you defeated</p><p>your nemesis!</p>' + '<p>pick a new one.</p>');
    $("#heropnts").text(150);
    nemesis = undefined;
  }
  else{
    console.log("i dont know");
  }

});

});