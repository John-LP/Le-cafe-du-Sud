let ajouter = document.querySelector(".ajouter");
let soft = document.querySelector(".soft");
let alcool = document.querySelector(".alcool");
let modal = document.querySelector(".modal-body");
let produit =  document.querySelector(".nom");
let type = document.querySelector(".type");
let degres =  document.querySelector(".degres");
let achat = document.querySelector(".achat");
let vente =  document.querySelector(".vente");
let displayTVA = document.querySelector(".displayTVA");
let stock = document.querySelector(".ajoutStock");
let addButton = document.querySelector(".boutonValider");
let LSsoft = [];
let LSalcool = [];

addButton.addEventListener("click", function() {
    if (type.value == "soft") {
        taxe = 0.055;
        let prixAchatHt = achat.value;
        let prixVenteHt = vente.value;
        let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
        let prixTtc = parseFloat(parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)).toFixed(2);
        soft.innerHTML = `<p> 
        ${produit.value} : ${stock.value}. 
        Prix de vente TTC : ${prixTtc}€
        Marge HT : ${margeHt}€
        </p>`
        displayTVA.innerHTML = `<p> TVA = 5.5%</p>`
    } else {
        taxe = 0.2;
        let prixAchatHt = achat.value;
        let prixVenteHt = vente.value;
        let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
        let prixTtc = parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe);
        alcool.innerHTML = `<p> 
        ${produit.value} : ${stock.value}. <br/>
        Prix de vente TTC : ${prixTtc}€ <br/>
        Marge HT : ${margeHt}€ <br/>
        </p>`
        displayTVA.innerHTML = `<p> TVA = 20%</p>`
    }
})


// let produit = {
//     achat: data.get("achat"),
//     vente: data.get("vente"),
//     taxe: data.get("taxe"),
// }