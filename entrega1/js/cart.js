let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){

}

function updateSubtotal(){
  let productCountHTML = document.getElementById("articleCount").value;

  subtotal = Math.round(productCountHTML * productUnitCost * 100) / 100
  let subtotalToShow = productCurrency + ` ` + subtotal;

  document.getElementById("articleSubtotal").innerHTML = subtotalToShow;
  document.getElementById("productCostSubtotal").innerHTML = subtotalToShow;


}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(articles){
  let htmlContentToAppend = "";
  let htmlContentToAppendImage = "";
  let article = articles[0];

  productUnitCost = article.unitCost;
  productCurrency = article.currency;
  subtotal = article.count * article.unitCost;
  htmlContentToAppend += `<img src="` + article.src + `" alt="` + article.name + `" class="img-thumbnail">`

  document.getElementById("articleImage").innerHTML = htmlContentToAppend;
  document.getElementById("articleName").innerHTML = article.name;
  document.getElementById("articleCount").value = article.count;
  document.getElementById("articleUnitPrice").innerHTML = productCurrency + ` ` + productUnitCost;
  document.getElementById("articleSubtotal").innerHTML = productCurrency + ` ` + subtotal;
  document.getElementById("productCostSubtotal").innerHTML = productCurrency + ` ` + subtotal;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  document.getElementById("articleCount").addEventListener("change", function(){
      updateSubtotal();
  });

  getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
      articles = resultObj.data.articles;
      showArticles(articles);
    }

  });



});
