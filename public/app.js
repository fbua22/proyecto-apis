
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const cotizacionesBody = document.getElementById('cotizaciones-body');

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const searchTerm = searchInput.value.trim();

      // Realiza una solicitud a la API para buscar la moneda
      fetch(`/cotizaciones?moneda=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          cotizacionesBody.innerHTML = '';

          if (data.length === 0) {
            const noResultsRow = document.createElement('tr');
            const noResultsCell = document.createElement('td');
            noResultsCell.setAttribute('colspan', '2');
            noResultsCell.textContent = 'No se encontraron resultados';
            noResultsRow.appendChild(noResultsCell);
            cotizacionesBody.appendChild(noResultsRow);
          } else {
            data.forEach(cotizacion => {
              const row = document.createElement('tr');

              const monedaCell = document.createElement('td');
              monedaCell.textContent = cotizacion.moneda;
              row.appendChild(monedaCell);

              const precioCell = document.createElement('td');
              precioCell.textContent = cotizacion.precio;
              row.appendChild(precioCell);

              cotizacionesBody.appendChild(row);
            });
          }
        })
        .catch(error => {
          console.error('Error al buscar las cotizaciones:', error);
        });
    });