document.addEventListener("DOMContentLoaded", () => {
  main(); // Llamada a la función main una vez que el DOM esté cargado
});

function main() {
  //Variables
  const selectBrand = document.querySelector("#select-brand");
  const selectMinPrice = document.querySelector("#select-min-price");
  const selectMaxPrice = document.querySelector("#select-max-price");
  const selectProcessor = document.querySelector("#select-processor");
  const selectScreenSize = document.querySelector("#select-screen-size");
  const selectScreenResolution = document.querySelector("#select-screen-resolution");
  const selectRam = document.querySelector("#select-ram");

  const resultsGrid = document.querySelector("#results");

  const filterData = {
    brand: "",
    processor: "",
    screenSize: "",
    screenResolution: "",
    RAM: "",
    minPrice: "",
    maxPrice: "",
  };

  //Functions
  registerEventListeners();

  function registerEventListeners() {
    // Escucha los cambios en el elemento selectBrand
    selectBrand.addEventListener("change", (e) => {
      // Actualiza la propiedad "brand" del objeto "filterData" con el valor seleccionado por el usuario
      filterData.brand = e.target.value;
      filterNotebooks();
    });

    selectMinPrice.addEventListener("change", (e) => {
      filterData.minPrice = e.target.value;
      filterNotebooks();
    });

    selectMaxPrice.addEventListener("change", (e) => {
      filterData.maxPrice = e.target.value;
      filterNotebooks();
    });

    selectProcessor.addEventListener("change", (e) => {
      filterData.processor = e.target.value;
      filterNotebooks();
    });

    selectScreenSize.addEventListener("change", (e) => {
      filterData.screenSize = Number(e.target.value);
      filterNotebooks();
    });

    selectScreenResolution.addEventListener("change", (e) => {
      filterData.screenResolution = e.target.value;
      filterNotebooks();
    });

    selectRam.addEventListener("change", (e) => {
      filterData.RAM = e.target.value;
      filterNotebooks();
    });
  }

  showNotebooks(notebooks);

  function showNotebooks(notebooks) {
    clearHTML(); //eliminamos el HTML previo

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

  //eliminar todos los elementos hijos del contenedor resultsGrid
  function clearHTML() {
    // Mientras exista un primer hijo en el contenedor resultsGrid
    while (resultsGrid.firstChild) {
      // Remover el primer hijo del contenedor resultsGrid
      resultsGrid.removeChild(resultsGrid.firstChild);
    }
  }

  function filterNotebooks() {
    const filteredNotebooks = notebooks
      .filter(filterByBrand)
      .filter(filterByMinPrice)
      .filter(filterByMaxPrice)
      .filter(filterByProcessor)
      .filter(filterByScreenSize)
      .filter(filterByScreenResolution)
      .filter(filterByRAM);

    if (filteredNotebooks.length > 0) {
      showNotebooks(filteredNotebooks);
    } else {
      noResults();
    }
  }

  function filterByBrand(notebook) {
    if (filterData.brand !== "") {
      return notebook.brand === filterData.brand;
    }

    return notebook;
  }

  function filterByMinPrice(notebook) {
    if (filterData.minPrice !== "") {
      return notebook.price >= filterData.minPrice;
    }

    return notebook;
  }

  function filterByMaxPrice(notebook) {
    if (filterData.maxPrice !== "") {
      return notebook.price <= filterData.maxPrice;
    }

    return notebook;
  }

  function filterByProcessor(notebook) {
    if (filterData.processor !== "") {
      return notebook.processor === filterData.processor;
    }

    return notebook;
  }

  function filterByScreenSize(notebook) {
    if (filterData.screenSize !== "") {
      return notebook.screenSize === filterData.screenSize;
    }

    return notebook;
  }

  function filterByScreenResolution(notebook) {
    if (filterData.screenResolution !== "") {
      return notebook.screenResolution === filterData.screenResolution;
    }

    return notebook;
  }

  function filterByRAM(notebook) {
    if (filterData.RAM !== "") {
      return notebook.RAM === filterData.RAM;
    }

    return notebook;
  }

  function noResults() {
    clearHTML();
    const noResultsMessage = document.createElement("DIV");

    const mainText = document.createElement("P");
    mainText.textContent = "No hay notebooks que cumplan con los parámetros solicitados :c";
    mainText.classList.add("no-results-main-text");

    const secondaryText = document.createElement("P");
    secondaryText.textContent = "¡Intenta con otros parámetros de búsqueda!";

    noResultsMessage.appendChild(mainText);
    noResultsMessage.appendChild(secondaryText);

    resultsGrid.appendChild(noResultsMessage);
  }
}
