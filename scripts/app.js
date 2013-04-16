'use strict';

function get(url, cb) {
  $.ajax({
    url: url,
    type: "GET",
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  }).done( function ( data ) {
    cb(data);
  }).fail( function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
    $(".login").show();
  });
}

function getQuestions(){
  var url = "http://xma-server.herokuapp.com/questions";
  get(url, renderQuestions);
}

function renderQuestions(data){

  // var data = {"questions":[{
  //    "question":"Comment s'appelle une interface (au sens JAVA) en Objectice-C ?",
  //    "choices":["Protocole","Interface","Category"], 
  //    "answer":"Category", "points":5
  //  },{ "question":"Qui est l'auteur de jquery ?",
  //    "choices":["Martin odersky","John Resig","Martin Fowler"], 
  //    "answer":"John Resig", "points":2
  //  }],"rel":{"links":["/answers","/user/:id"]}}

  var template = new t($("#question-tpl").html());
  $("#placeholder").append(template.render(data));
  $("#placeholder li").click(function(){select(this);});
  $("#placeholder button").click(function(){nextAnswer(this);});
  $(".zone").first().addClass("current");
  $(".zone").first().show();
}

function select(e) {
  if ($(e).hasClass("selected")) {
    $(e).removeClass("selected");
  } else {
    $('.selected').removeClass('selected');
    $(e).addClass("selected");
  }
}

var response = [];

function nextAnswer(btn){
  var button = $(btn).text();

  if (button == "Suivante" && !$(".current .selected")) {
    alert("vous n'avez pas répondu a la question");
    return;
  }

  response.push({
    "question":$(".current .question-text").text(),
    "response":$(".current .selected").text()
  });
  if ($(".zone").size() > 1) {
    $(".current").remove();
    $(".zone").first().addClass("current");
  } else {
    $("#placeholder").text("Merci davoir repondu aux questions. Revenez demain pour une autre serie.");
    postAnswers();
  }
}

function postAnswers() {
  var url = "http://xma-server.herokuapp.com/answers";

  $.ajax({
    url: url,
    type: "POST",
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  }).done( function ( score ) {
    showScore(JSON.parse(score));
  }).fail( function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
    showError();
  });
}

function showScore(score) {
  console.log(score);
  // appendScore
}

function showError() {
  // $(".answer-error").show();
}

function getUsers(){
  var url = "http://xma-server.herokuapp.com/users";
  get(url,renderUsers);
  //CryptoJS.MD5("mail@gmail.com").toString(CryptoJS.enc.Hex);
  //renderUsers(data);
}

function renderUsers(data) {
  // var data = {"users":[
  //  {"name":"hello1","points":"500","gravatar":"75da740d43c5780539214f24ce1148a6"},
  //  {"name":"hello2","points":"220","gravatar":"243ed6e0c253e674512d807730c4b08f"},
  //  {"name":"hello3","points":"220","gravatar":"adca2f684619aeca64ae77e343ed0879"},
  //  {"name":"hello4","points":"120","gravatar":"688958fbc93d79c3997fdb2e11b02a32"}],
  //  "rel":{"links":["/users","/user/:id"]}
  // }

  var template = new t($("#user-tpl").html()); 
  $("#placeholder").append(template.render(data));
  $(".zone").first().show();
}


