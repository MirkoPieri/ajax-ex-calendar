$(document).ready(function() {

var meseIndex = 01;
var database = moment("2018" + -meseIndex + "-01");
myfunction();



$(".title .avanti").click(function() {
  meseIndex += 1;
  $(".general .list").text(" ");
  if (meseIndex > 12) {
    $(".general").hide();
    alert("Dati non disponibili per l'anno successivo");
    meseIndex -= 1;
  }
    $(".general").show();
    myfunction();
});

$(".title .indietro").click(function() {
  meseIndex -= 1;
  $(".general .list").text(" ");
  if (meseIndex < 1) {
    $(".general").hide();
    alert("Dati non disponibili per l'anno precedente");
    meseIndex += 1;
  }
    $(".general").show();
    myfunction();
});

function myfunction(a) {
  var database = moment("2018" + -meseIndex + "-01");
  var giorniMese = database.daysInMonth();

  // mi salvo il valore dell'anno selezionato
  var anno = database.format("YYYY");
  // mese indicizzato a 0 perche array parte da 0 e non da 1
  var mese = parseInt(database.format("M")) - 1;
  // mese per titolo
  $(".gennaio").text(database.format("MMMM YYYY"));

  for (var i = 1; i <= giorniMese; i++) {
    var giorni = moment([anno, mese, i]).format("dddd DD MMMM");

    var source   = document.getElementById("template").innerHTML;
    var template = Handlebars.compile(source);

    var context = {giorno: giorni, holidays: moment([anno, mese, i]).format("YYYY-MM-DD")};
    var html = template(context);
    $(".list").append(html);
  }

  $.ajax (
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays",
      data: {"year": anno, "month": mese},
      method: "GET",
      success: function(data) {
        var festa = data.response;

        for (var i = 0; i < festa.length; i++) {
          var objfesta = festa[i];
          console.log(objfesta.name, objfesta.date);

          var liFest = $("li[dateref='" + objfesta.date + "']");

          if (liFest) {
            liFest.append(" - ", objfesta.name);
            liFest.addClass("red");
          }
        }
      },
      error: function (richiesta,stato,errore) {
        alert("problemma sul server", errore);
      }

    }
  );
}




});
