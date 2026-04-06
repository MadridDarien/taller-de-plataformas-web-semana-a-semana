document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const campos = [
        { id: "nombre", tipo: "texto" },
        { id: "correo", tipo: "correo" },
        { id: "destino", tipo: "texto" },
        { id: "dias", tipo: "numero" },
        { id: "pasajeros", tipo: "numero" },
        { id: "mensaje", tipo: "texto" }
    ];

    let estado = document.getElementById("estado");
    estado.textContent = "";
    estado.className = "estado";

    let hayError = false;

    // Limpiar clases antes de validar
    campos.forEach(campo => {
        let elemento = document.getElementById(campo.id);
        elemento.classList.remove("campo-error", "campo-ok");
    });

    // Validación general
    campos.forEach(campo => {
        let elemento = document.getElementById(campo.id);
        let valor = elemento.value.trim();
        let valido = true;

        // Campo vacío
        if (!valor) {
            valido = false;
        }

        // Validación de correo
        if (valido && campo.tipo === "correo") {
            let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formatoCorreo.test(valor)) {
                valido = false;
            }
        }

        // Validación de números
        if (valido && campo.tipo === "numero") {
            if (isNaN(valor) || Number(valor) <= 0) {
                valido = false;
            }
        }

        // Aplicar clases según resultado
        if (!valido) {
            elemento.classList.add("campo-error");
            hayError = true;
        } else {
            elemento.classList.add("campo-ok");
        }
    });

    if (hayError) {
        estado.textContent = "Por favor, corrija los campos marcados.";
        estado.classList.add("error");
        return;
    }

    estado.textContent = "Enviando solicitud...";
    estado.classList.add("exito");

    new Promise((resolve, reject) => {
        setTimeout(() => {
            let exito = Math.random() > 0.5;

            if (exito) {
                resolve("Solicitud de viaje enviada correctamente.");
            } else {
                reject("Error al procesar la solicitud.");
            }
        }, 2000);
    })
    .then((mensaje) => {
        estado.textContent = mensaje;
        estado.className = "estado exito";
    })
    .catch((error) => {
        estado.textContent = error;
        estado.className = "estado error";
    });
});
