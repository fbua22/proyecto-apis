const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const cotizacionesBody = document.getElementById('cotizaciones-body');

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const searchTerm = searchInput.value.trim();

      // Realiza una solicitud a la API para buscar la moneda
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${searchTerm}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => {
          cotizacionesBody.innerHTML = '';

          if (data[searchTerm]) {
            const row = document.createElement('tr');

            const monedaCell = document.createElement('td');
            monedaCell.textContent = searchTerm;
            row.appendChild(monedaCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = data[searchTerm].usd;
            row.appendChild(precioCell);

            cotizacionesBody.appendChild(row);
          } else {
            const noResultsRow = document.createElement('tr');
            const noResultsCell = document.createElement('td');
            noResultsCell.setAttribute('colspan', '2');
            noResultsCell.textContent = 'No se encontraron resultados';
            noResultsRow.appendChild(noResultsCell);
            cotizacionesBody.appendChild(noResultsRow);
          }
        })
        .catch(error => {
          console.error('Error al buscar las cotizaciones:', error);
        });
    });

    const app= new App();