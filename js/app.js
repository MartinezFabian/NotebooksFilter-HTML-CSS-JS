document.addEventListener("DOMContentLoaded", () => {
  main(); // Llamada a la función main una vez que el DOM esté cargado
});

function main() {
  //Variables
  const resultsGrid = document.querySelector("#results");

  //Functions
  showNotebooks();

  function showNotebooks() {
    notebooks.forEach((notebook) => {
      const { brand, processor, screenSize, screenResolution, RAM, price } = notebook;

      resultsGrid.insertAdjacentHTML(
        "beforeend",
        `<div class="notebook">
          <h3 class="notebook__name">${brand} ${processor} ${RAM}</h3>
          <p class="notebook__brand">Marca: ${brand}</p>
          <p class="notebook__processor">Procesador: ${processor}</p>
          <p class="notebook__screen-resolution">Resolución: ${screenResolution}</p>
          <p class="notebook__screen-size">Tamaño de pantalla: ${screenSize}”</p>
          <p class="notebook__ram">RAM: ${RAM}</p>
          <p class="notebook__price">Precio: ${price} US$</p>
        </div>`
      );
    });
  }
}
