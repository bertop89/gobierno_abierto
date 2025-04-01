document.addEventListener("DOMContentLoaded", () => {
    const votacionesContainer = document.getElementById("votaciones");
    const searchInput = document.getElementById("search");
    const loadingMessage = document.getElementById("loading-message");

    // Cargar datos desde múltiples archivos JSON
    fetch('./data/index.json')
        .then(response => response.json())
        .then(files => {
            const promises = files.map(file =>
                fetch(`./data/${file}`).then(res => res.json())
            );
            return Promise.all(promises);
        })
        .then(data => {
            loadingMessage.style.display = "none"; // Ocultar mensaje de carga
            renderVotaciones(data);
        })
        .catch(error => {
            loadingMessage.textContent = "Error al cargar las votaciones.";
            console.error(error);
        });

    // Renderizar las votaciones
    function renderVotaciones(votaciones) {
        votacionesContainer.innerHTML = "";
        votaciones.forEach((votacion, index) => {
            const votacionCard = document.createElement("div");
            votacionCard.className = "votacion";

            // Formatear la fecha
            const fechaParts = votacion.informacion.fecha.split('/');
            const fecha = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const totalVotes = votacion.totales.afavor + votacion.totales.enContra + votacion.totales.abstenciones;
            const totalVotesBar = votacion.totales.afavor + votacion.totales.enContra; // Nuevo total solo para la barra
            
            // Porcentajes para los números mostrados (incluyen abstenciones)
            const siPercentage = (votacion.totales.afavor / totalVotes) * 100;
            const noPercentage = (votacion.totales.enContra / totalVotes) * 100;
            const abstencionPercentage = (votacion.totales.abstenciones / totalVotes) * 100;
            
            // Porcentajes para la barra (solo Sí y No)
            const siPercentageBar = (votacion.totales.afavor / totalVotesBar) * 100;
            const noPercentageBar = (votacion.totales.enContra / totalVotesBar) * 100;

            votacionCard.innerHTML = `
                <div class="votacion-content">
                    <div class="votacion-info">
                        <p class="fecha">${fechaFormateada}</p>
                        <h2>${votacion.informacion.titulo}</h2>
                        <p class="expediente-texto">${votacion.informacion.textoExpediente}</p>
                    </div>
                    <div class="votacion-resultados">
                        <h3>Resultados de la votación</h3>
                        <div class="resultados-detalle">
                            <div class="voto-linea">
                                <span class="voto-texto"><span class="voto-indicator voto-si"></span>Sí: ${votacion.totales.afavor}</span>
                                <span class="voto-porcentaje">(${Math.round(siPercentage)}%)</span>
                            </div>
                            <div class="voto-linea">
                                <span class="voto-texto"><span class="voto-indicator voto-no"></span>No: ${votacion.totales.enContra}</span>
                                <span class="voto-porcentaje">(${Math.round(noPercentage)}%)</span>
                            </div>
                            <div class="voto-linea">
                                <span class="voto-texto"><span class="voto-indicator voto-abstencion"></span>Abstenciones: ${votacion.totales.abstenciones}</span>
                                <span class="voto-porcentaje">(${Math.round(abstencionPercentage)}%)</span>
                            </div>
                        </div>
                        <div class="barra-resultados">
                            <div class="barra-si" style="width: ${siPercentageBar}%;"></div>
                            <div class="barra-no" style="width: ${noPercentageBar}%;"></div>
                        </div>
                        <div class="total-votos">
                            Total de votos: ${totalVotes}
                        </div>
                    </div>
                </div>
            `;

            // Simplified click handler
            votacionCard.onclick = () => {
                localStorage.setItem("selectedVotacion", JSON.stringify(votacion));
                window.location.href = "detalle.html";
            };

            votacionesContainer.appendChild(votacionCard);
        });
    }

    // Filtrar votaciones
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        fetch('./data/index.json')
            .then(response => response.json())
            .then(files => {
                const promises = files.map(file =>
                    fetch(`./data/${file}`).then(res => res.json())
                );
                return Promise.all(promises);
            })
            .then(data => {
                const filtered = data.filter(votacion =>
                    votacion.informacion.titulo.toLowerCase().includes(query) ||
                    votacion.informacion.textoExpediente.toLowerCase().includes(query)
                );
                renderVotaciones(filtered);
            });
    });
});
