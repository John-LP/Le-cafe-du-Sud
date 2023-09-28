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
    if (type.value == "soft") {
      let taxe = 0.055;
      let prixAchatHt = achat.value;
      let prixVenteHt = vente.value;
      let margeHt = parseFloat(prixVenteHt) - parseFloat(prixAchatHt);
      let prixTtc = parseFloat(
        parseFloat(prixVenteHt) + parseFloat(prixVenteHt) * parseFloat(taxe)
      ).toFixed(2);

      const softData = {
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

    let nomProduits = document.querySelectorAll(".nomProduit");
    nomProduits.forEach(function (nomProduit) {
      if (stock.value <= 5) {
        nomProduit.style.color = "#A52A2A";
      } else {
        nomProduit.style.color = "green";
      }
    });
  });

  function renderStock(stockData, container) {
    stockData.forEach(function (item) {
      let liste = document.createElement("div");
      liste.classList.add("liste");
      liste.innerHTML = `<p class="nomProduit">${
        item.produit
      } <input class="modifyStock" type="number" value="${
        item.stock
      }"></input></p>
            <select class="details">
                <option>TTC : ${item.prixTtc}€</option>
                <option>Achat HT : ${item.prixAchatHt}€</option>
                <option>Vente HT : ${item.prixVenteHt}€</option>
                <option>Marge HT : ${item.margeHt}€</option>
                ${
                  item.degres
                    ? `<option>Degré d'alcool : ${item.degres}%</option>`
                    : ""
                }
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
      container.appendChild(liste);
    });
  }
});
