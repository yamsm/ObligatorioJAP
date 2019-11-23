let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let PERCENTAGE_SYMBOL = '%';
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
  let subtotalToShow = productCurrency + ` ` + subtotal;
  let shippingPercentageToShow = Math.round((shippingPercentage * 100)) + PERCENTAGE_SYMBOL;
  let shippingTotal = Math.round(subtotal * shippingPercentage * 100) / 100;
  total = subtotal + shippingTotal;
  let shippingTotalToShow = productCurrency + ` ` + shippingTotal;
  let totalCostToShow = productCurrency + ` ` + total;

  document.getElementById("productCostSubtotal").innerHTML = subtotalToShow;
  document.getElementById("porcentajeEnvio").innerHTML = shippingPercentageToShow;
  document.getElementById("costoEnvio").innerHTML = shippingTotalToShow;
  document.getElementById("totalCost").innerHTML = totalCostToShow;
}

function updateSubtotal(){
  let productCountHTML = document.getElementById("articleCount").value;

  subtotal = Math.round(productCountHTML * productUnitCost * 100) / 100;
  let subtotalToShow = productCurrency + ` ` + subtotal;

  document.getElementById("articleSubtotal").innerHTML = subtotalToShow;
  document.getElementById("productCostSubtotal").innerHTML = subtotalToShow;
}

function showPaymentTypeNotSelected(){
  let validacionFormaDePago = document.getElementById("validacionFormaDePago");
  validacionFormaDePago.classList.add('d-block');
}

function hidePaymentTypeNotSelected(){
  let validacionFormaDePago = document.getElementById("validacionFormaDePago");
  validacionFormaDePago.classList.remove('d-block');
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

  updateTotalCosts()
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  document.getElementById("articleCount").addEventListener("change", function(){
      updateSubtotal();
      updateTotalCosts()
  });

  getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
      articles = resultObj.data.articles;
      showArticles(articles);
    }
  });

  document.getElementById("premiumradio").addEventListener("change", function(){
      shippingPercentage = 0.15;
      updateTotalCosts();
  });

  document.getElementById("expressradio").addEventListener("change", function(){
      shippingPercentage = 0.07;
      updateTotalCosts();
  });

  document.getElementById("standardradio").addEventListener("change", function(){
      shippingPercentage = 0.05;
      updateTotalCosts();
  });

  document.getElementById("creditCardPaymentRadio").addEventListener("change", function(){
    paymentTypeSelected = CREDIT_CARD_PAYMENT;
  });

  document.getElementById("bankingRadio").addEventListener("change", function(){
      paymentTypeSelected = BANKING_PAYMENT;
  });

  var cartForm = document.getElementById("cartForm");

  cartForm.addEventListener("submit", function(e){

    let infoMissing = false;
    let creditCardNumberInput = document.getElementById("creditCardNumber");
    let creditCardSecurityCodeInput = document.getElementById("creditCardSecurityCode");
    let dueDateInput = document.getElementById("dueDate");
    let bankAccountNumberInput = document.getElementById("bankAccountNumber");
    creditCardNumberInput.classList.remove('is-invalid');
    creditCardSecurityCodeInput.classList.remove('is-invalid');
    dueDate.classList.remove('is-invalid');
    bankAccountNumberInput.classList.remove('is-invalid');
    hidePaymentTypeNotSelected();

    if (paymentTypeSelected===false)
    {
      showPaymentTypeNotSelected();
      infoMissing = true;
    }
    if (paymentTypeSelected === BANKING_PAYMENT){
      if (bankAccountNumberInput.value === ""){
        showPaymentTypeNotSelected();
        bankAccountNumberInput.classList.add('is-invalid');
        infoMissing = true;
      }
    }
    if (paymentTypeSelected === CREDIT_CARD_PAYMENT){
      if(creditCardNumberInput.value === ""){
        showPaymentTypeNotSelected();
        creditCardNumberInput.classList.add('is-invalid');
        infoMissing = true;
      }
      if(creditCardSecurityCodeInput.value === ""){
        showPaymentTypeNotSelected();
        creditCardSecurityCodeInput.classList.add('is-invalid');
        infoMissing = true;
      }
      if(dueDateInput.value === ""){
        showPaymentTypeNotSelected();
        dueDateInput.classList.add('is-invalid');
        infoMissing = true;
      }
    }

    if(!infoMissing)
    {
        getJSONData(CART_BUY_URL).then(function(resultObj){
            let msgToShowHTML = document.getElementById("resultSpan");
            let msgToShow = "";
            if (resultObj.status === 'ok')
            {
                msgToShow = resultObj.data.msg;
            }
            else if (resultObj.status === 'error')
            {
                msgToShow = ERROR_MSG;
            }

            bootbox.alert(msgToShow, null);
        });
    }

     if (e.preventDefault) e.preventDefault();
           return false;
  });
});
