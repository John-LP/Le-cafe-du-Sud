document.addEventListener("DOMContentLoaded", function () {
  let soft = document.querySelector(".soft");
  let alcool = document.querySelector(".alcool");
  let produit = document.querySelector(".nom");
  let type = document.querySelector(".type");
  let degres = document.querySelector(".degres");
  let achat = document.querySelector(".achat");
  let vente = document.querySelector(".vente");
  let stock = document.querySelector(".ajoutStock");
  let addButton = document.querySelector(".boutonValider");
  let LSsoft = [];
  let LSalcool = [];

  let LSsoftString = localStorage.getItem("LSsoft");
  if (LSsoftString) {
    LSsoft = JSON.parse(LSsoftString);
    renderStock(LSsoft);
  }

  let LSalcoolString = localStorage.getItem("LSalcool");
  if (LSalcoolString) {
    LSalcool = JSON.parse(LSalcoolString);
    renderStock(LSalcool);
  }

  addButton.addEventListener("click", function () {
    if (type.value == "soft") {
      let taxe = 0.055;
      let prixAchatHt = achat.value;
      let prixVenteHt = vente.value;
      let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
      let prixTtc = parseFloat(
        parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)
      ).toFixed(2);
      let liste = document.createElement("div");
      liste.classList.add("liste");
      liste.innerHTML = `<p class="nomProduit">${produit.value} <input class="modifyStock" type="number" value="${stock.value}"></input></p>
            <select class="details">
                <option>TTC : ${prixTtc}€</option>
                <option>Achat HT : ${prixAchatHt}€</option>
                <option>Vente HT : ${prixVenteHt}€</option>
                <option>Marge HT : ${margeHt}€</option>
            </select>`;
      let suppr = document.createElement("button");
      suppr.innerText = "X";
      suppr.style.color = "#A52A2A";
      suppr.addEventListener("click", function () {
        liste.remove();
      });
      let updateButton = document.createElement("button");
      updateButton.innerText = "Modifier";
      updateButton.addEventListener("click", function () {});
      liste.appendChild(updateButton);
      liste.appendChild(suppr);
      soft.appendChild(liste);
      LSsoft.push(`
        Produit : ${produit.value}
        Stock : ${stock.value}
        Achat HT : ${prixAchatHt}€
        Vente HT : ${prixVenteHt}€
        Marge HT : ${margeHt}€
        TTC : ${prixTtc}€`);
      let LSsoftString = JSON.stringify(LSsoft);
      localStorage.setItem("LSsoft", LSsoftString);
    } else {
      taxe = 0.2;
      let prixAchatHt = achat.value;
      let prixVenteHt = vente.value;
      let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
      let prixTtc = parseFloat(
        parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)
      ).toFixed(2);
      let liste = document.createElement("div");
      liste.classList.add("liste");
      liste.innerHTML = `<p class="nomProduit">${produit.value} <input class="modifyStock" type="number" value="${stock.value}"></input></p>
            <select class="details">
                <option>TTC : ${prixTtc}€</option>
                <option>Achat HT : ${prixAchatHt}€</option>
                <option>Vente HT : ${prixVenteHt}€</option>
                <option>Marge HT : ${margeHt}€</option>
                <option>Degré d'alcool : ${degres.value}%</option>
            </select>`;
      let suppr = document.createElement("button");
      suppr.innerText = "X";
      suppr.style.color = "#A52A2A";
      suppr.addEventListener("click", function () {
        liste.remove();
      });
      let updateButton = document.createElement("button");
      updateButton.innerText = "Modifier";
      updateButton.addEventListener("click", function () {});
      liste.appendChild(updateButton);
      liste.appendChild(suppr);
      alcool.appendChild(liste);

      LSalcool.push(`
        Produit : ${produit.value}
        Stock : ${stock.value}
        Prix d'achat HT : ${prixAchatHt}€
        Prix de vente HT : ${prixVenteHt}€
        Marge HT : ${margeHt}€
        TTC : ${prixTtc}€
        Degré d'alcool : ${degres}%`);
    }
    save();
    let nomProduits = document.querySelectorAll(".nomProduit");
    nomProduits.forEach(function (nomProduit) {
      if (stock.value <= 5) {
        nomProduit.style.color = "#A52A2A";
      } else {
        nomProduit.style.color = "green";
      }
    });
  });

  function save() {
    localStorage.setItem("LSsoft", JSON.stringify(LSsoft));
    localStorage.setItem("LSalcool", JSON.stringify(LSalcool));
  }

  function renderStock(stockData) {
    stockData.forEach(function (item) {
      if (type.value == "soft") {
        liste.innerHTML += `<div class="liste"><p class="nomProduit">${item.produit}<input class="modifyStock" type="number" value="${stock.value}"></p>
        <select class="details">
        <option>TTC : ${item.prixTtc}€</option>
        <option>Achat HT : ${item.prixAchatHt}€</option>
        <option>Vente HT : ${item.prixVenteHt}€</option>
        <option>Marge HT : ${item.margeHt}€</option>
        </select></div>`;
      } else {
        liste.innerHTML += `<div class="liste"><p class="nomProduit">${
          item.produit
        } <input class="modifyStock" type="number" value="${stock.value}"></p>
        <select class="details">
        <option>TTC : ${item.prixTtc}€</option>
        <option>Achat HT : ${item.prixAchatHt}€</option>
        <option>Vente HT : ${item.prixVenteHt}€</option>
        <option>Marge HT : ${item.margeHt}€</option>
        <option>Degré d'alcool : ${item.degres || ""}%</option>
        </select></div>`;
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  let soft = document.querySelector(".soft");
  let alcool = document.querySelector(".alcool");
  let produit = document.querySelector(".nom");
  let type = document.querySelector(".type");
  let degres = document.querySelector(".degres");
  let achat = document.querySelector(".achat");
  let vente = document.querySelector(".vente");
  let stock = document.querySelector(".ajoutStock");
  let addButton = document.querySelector(".boutonValider");
  let LSsoft = [];
  let LSalcool = [];

  let LSsoftString = localStorage.getItem("LSsoft");
  if (LSsoftString) {
    LSsoft = JSON.parse(LSsoftString);
    renderStock(LSsoft);
  }

  let LSalcoolString = localStorage.getItem("LSalcool");
  if (LSalcoolString) {
    LSalcool = JSON.parse(LSalcoolString);
    renderStock(LSalcool);
  }

  addButton.addEventListener("click", function () {
    if (type.value == "soft") {
      let taxe = 0.055;
      let prixAchatHt = achat.value;
      let prixVenteHt = vente.value;
      let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
      let prixTtc = parseFloat(
        parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)
      ).toFixed(2);
      let liste = document.createElement("div");
      liste.classList.add("liste");
      liste.innerHTML = `<p class="nomProduit">${produit.value} <input class="modifyStock" type="number" value="${stock.value}"></input></p>
            <select class="details">
                <option>TTC : ${prixTtc}€</option>
                <option>Achat HT : ${prixAchatHt}€</option>
                <option>Vente HT : ${prixVenteHt}€</option>
                <option>Marge HT : ${margeHt}€</option>
            </select>`;
      let suppr = document.createElement("button");
      suppr.innerText = "X";
      suppr.style.color = "#A52A2A";
      suppr.addEventListener("click", function () {
        liste.remove();
      });
      let updateButton = document.createElement("button");
      updateButton.innerText = "Modifier";
      updateButton.addEventListener("click", function () {});
      liste.appendChild(updateButton);
      liste.appendChild(suppr);
      soft.appendChild(liste);
      LSsoft.push(`
        Produit : ${produit.value}
        Stock : ${stock.value}
        Achat HT : ${prixAchatHt}€
        Vente HT : ${prixVenteHt}€
        Marge HT : ${margeHt}€
        TTC : ${prixTtc}€`);
      let LSsoftString = JSON.stringify(LSsoft);
      localStorage.setItem("LSsoft", LSsoftString);
    } else {
      taxe = 0.2;
      let prixAchatHt = achat.value;
      let prixVenteHt = vente.value;
      let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
      let prixTtc = parseFloat(
        parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)
      ).toFixed(2);
      let liste = document.createElement("div");
      liste.classList.add("liste");
      liste.innerHTML = `<p class="nomProduit">${produit.value} <input class="modifyStock" type="number" value="${stock.value}"></input></p>
            <select class="details">
                <option>TTC : ${prixTtc}€</option>
                <option>Achat HT : ${prixAchatHt}€</option>
                <option>Vente HT : ${prixVenteHt}€</option>
                <option>Marge HT : ${margeHt}€</option>
                <option>Degré d'alcool : ${degres.value}%</option>
            </select>`;
      let suppr = document.createElement("button");
      suppr.innerText = "X";
      suppr.style.color = "#A52A2A";
      suppr.addEventListener("click", function () {
        liste.remove();
      });
      let updateButton = document.createElement("button");
      updateButton.innerText = "Modifier";
      updateButton.addEventListener("click", function () {});
      liste.appendChild(updateButton);
      liste.appendChild(suppr);
      alcool.appendChild(liste);

      LSalcool.push(`
        Produit : ${produit.value}
        Stock : ${stock.value}
        Prix d'achat HT : ${prixAchatHt}€
        Prix de vente HT : ${prixVenteHt}€
        Marge HT : ${margeHt}€
        TTC : ${prixTtc}€
        Degré d'alcool : ${degres}%`);
    }
    save();
    let nomProduits = document.querySelectorAll(".nomProduit");
    nomProduits.forEach(function (nomProduit) {
      if (stock.value <= 5) {
        nomProduit.style.color = "#A52A2A";
      } else {
        nomProduit.style.color = "green";
      }
    });
  });

  function save() {
    localStorage.setItem("LSsoft", JSON.stringify(LSsoft));
    localStorage.setItem("LSalcool", JSON.stringify(LSalcool));
  }

  function renderStock(stockData) {
    stockData.forEach(function (item) {
      if (type.value == "soft") {
        liste.innerHTML += `<div class="liste"><p class="nomProduit">${item.produit}<input class="modifyStock" type="number" value="${stock.value}"></p>
        <select class="details">
        <option>TTC : ${item.prixTtc}€</option>
        <option>Achat HT : ${item.prixAchatHt}€</option>
        <option>Vente HT : ${item.prixVenteHt}€</option>
        <option>Marge HT : ${item.margeHt}€</option>
        </select></div>`;
      } else {
        liste.innerHTML += `<div class="liste"><p class="nomProduit">${
          item.produit
        } <input class="modifyStock" type="number" value="${stock.value}"></p>
        <select class="details">
        <option>TTC : ${item.prixTtc}€</option>
        <option>Achat HT : ${item.prixAchatHt}€</option>
        <option>Vente HT : ${item.prixVenteHt}€</option>
        <option>Marge HT : ${item.margeHt}€</option>
        <option>Degré d'alcool : ${item.degres || ""}%</option>
        </select></div>`;
      }
    });
  }
});
