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

  function generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  const ajouterModal = document.querySelector("#ajouterModal");
  if (ajouterModal) {
    function ouvrirModal() {
      const modal = new bootstrap.Modal(ajouterModal);
      modal.show();
    }
    const boutonAjouter = document.querySelector(".ajouter");
    boutonAjouter.addEventListener("click", ouvrirModal);
  }

  let LSsoftString = localStorage.getItem("LSsoft");
  if (LSsoftString) {
    LSsoft = JSON.parse(LSsoftString);
    renderStock(LSsoft, soft);
  }
  let LSalcoolString = localStorage.getItem("LSalcool");
  if (LSalcoolString) {
    LSalcool = JSON.parse(LSalcoolString);
    renderStock(LSalcool, alcool);
  }
  addButton.addEventListener("click", function () {
    const uniqueId = generateUniqueId();
    if (type.value == "soft") {
      let taxe = 0.055;
      let prixAchatHt = achat.value;
      let prixVenteHt = vente.value;
      let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
      let prixTtc = parseFloat(
        parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)
      ).toFixed(2);
      const softData = {
        id: uniqueId,
        produit: produit.value,
        stock: stock.value,
        prixAchatHt: prixAchatHt,
        prixVenteHt: prixVenteHt,
        margeHt: margeHt,
        prixTtc: prixTtc,
      };
      LSsoft.push(softData);
      let LSsoftString = JSON.stringify(LSsoft);
      localStorage.setItem("LSsoft", LSsoftString);
      renderStock([softData], soft);
    } else {
      let taxe = 0.2;
      let prixAchatHt = achat.value;
      let prixVenteHt = vente.value;
      let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
      let prixTtc = parseFloat(
        parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)
      ).toFixed(2);
      const alcoolData = {
        id: uniqueId,
        produit: produit.value,
        stock: stock.value,
        prixAchatHt: prixAchatHt,
        prixVenteHt: prixVenteHt,
        margeHt: margeHt,
        prixTtc: prixTtc,
        degres: degres.value,
      };
      LSalcool.push(alcoolData);
      let LSalcoolString = JSON.stringify(LSalcool);
      localStorage.setItem("LSalcool", LSalcoolString);
      renderStock([alcoolData], alcool);
    }
  });
  function renderStock(stockData, container) {
    stockData.forEach(function (item) {
      let liste = document.createElement("div");
      liste.classList.add("liste");
      liste.style.fontFamily = "'Croissant One', cursive";
      let inputNumber = document.createElement("input");
      inputNumber.classList.add("modifyStock");
      inputNumber.type = "number";
      inputNumber.value = item.stock;
      inputNumber.addEventListener("change", function () {
        let value = parseFloat(inputNumber.value);
        if (value <= 5) {
          inputNumber.style.color = "#A52A2A";
        } else {
          inputNumber.style.color = "green";
        }
        if (value < 0) {
          inputNumber.value = 0;
        }
      });
      liste.innerHTML = `<p class="nomProduit">${item.produit}</p>
            <select class="details">
                <option>TTC : ${item.prixTtc}€</option>
                <option>Achat HT : ${item.prixAchatHt}€</option>
                <option>Vente HT : ${item.prixVenteHt}€</option>
                <option>Marge HT : ${item.margeHt}€</option>
                ${
                  item.degres
                    ? `<option>Degré d'alcool : ${item.degres}%</option>`
                    : ""
                }</select>`;
      if ((type.value = "alcool")) {
        liste.appendChild(inputNumber);
        let updateButton = document.createElement("button");
        updateButton.classList.add("updateButton");
        updateButton.innerText = "Modifier";
        updateButton.addEventListener("click", function () {});
        liste.setAttribute("data-id", item.id);
        let suppr = document.createElement("button");
        suppr.innerText = "X";
        suppr.style.color = "#A52A2A";
        suppr.setAttribute("data-id", item.id);
        suppr.addEventListener("click", function () {
          let itemId = suppr.dataset.id;
          if (type.value === "soft") {
            LSsoft = LSsoft.filter((softItem) => softItem.id !== itemId);
            localStorage.setItem("LSsoft", JSON.stringify(LSsoft));
          } else {
            LSalcool = LSalcool.filter(
              (alcoolItem) => alcoolItem.id !== itemId
            );
            localStorage.setItem("LSalcool", JSON.stringify(LSalcool));
          }
          liste.remove();
        });
        liste.appendChild(updateButton);
        liste.appendChild(suppr);
      } else {
        liste.appendChild(inputNumber);
        let updateButton = document.createElement("button");
        updateButton.classList.add("updateButton");
        updateButton.innerText = "Modifier";
        updateButton.addEventListener("click", function () {});
        liste.setAttribute("data-id", item.id);
        let suppr = document.createElement("button");
        suppr.innerText = "X";
        suppr.style.color = "#A52A2A";
        suppr.setAttribute("data-id", item.id);
        suppr.addEventListener("click", function () {
          let itemId = suppr.dataset.id;
          if (type.value === "soft") {
            LSsoft = LSsoft.filter((softItem) => softItem.id !== itemId);
            localStorage.setItem("LSsoft", JSON.stringify(LSsoft));
          } else {
            LSalcool = LSalcool.filter(
              (alcoolItem) => alcoolItem.id !== itemId
            );
            localStorage.setItem("LSalcool", JSON.stringify(LSalcool));
          }
          liste.remove();
        });
        liste.appendChild(suppr);
      }
      container.appendChild(liste);
    });
  }
});
