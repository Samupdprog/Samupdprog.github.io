const DOM = {
    usuario: document.getElementById("usuario"),
    contraseñaInput: document.getElementById("contraseña"),
    telefono: document.getElementById("telefono"),
    mostrarContraCheckbox: document.getElementById("mostrar-contraseña"),
    codpostal: document.getElementById("codigoPostal"),
    nacimiento: document.getElementById("nacimiento"),
    tituloInput: document.getElementById("titulo"),
    descripcionInput: document.getElementById("descripcion"),
    contadorTitulo: document.getElementById("contador-titulo"),
    contadorDescripcion: document.getElementById("contador-descripcion"),
    aficionesSeleccionadas: document.querySelectorAll('input[name="aficiones"]:checked'), // Seleccionamos todos los checkboxes de aficiones
    hiddenAficiones: document.getElementById("aficiones-seleccionadas")
};

const Error = {
    Usuario: document.getElementById("error-NombreUsuario"),
    Contraseña: document.getElementById("mostrar-contraseña"),
    Telefono: document.getElementById("error-telefono"),
    Checkbox: document.getElementById("error-checkbox"),
    Codpostal: document.getElementById("error-codpostal"),
    DniNie: document.getElementById("error-DniNie"),
    TipoCuenta: document.getElementById("error-CuentaComo"),
    nacimiento: document.getElementById("error-nacimiento")
};

const checkboxesAficiones = document.querySelectorAll('input[name="Aficiones"]');

const ADN = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
//Array Dni y Nie para comprobar

document.addEventListener("DOMContentLoaded", () => {

    // Mostrar contraseña
    DOM.mostrarContraCheckbox.addEventListener("change", () => {
        DOM.contraseñaInput.type = DOM.mostrarContraCheckbox.checked ? "text" : "password";
    });

    // Contador del titulo
    DOM.tituloInput.addEventListener("input", () => {
        DOM.contadorTitulo.textContent = `${DOM.tituloInput.value.length} / 15`;
    });

    // Contador de la descripcion
    DOM.descripcionInput.addEventListener("input", () => {
        DOM.contadorDescripcion.textContent = `${DOM.descripcionInput.value.length} / 120`;
    });

    // Actualizo el DOM para los checkbox de aficiones
    checkboxesAficiones.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const seleccionadas = Array.from(checkboxesAficiones)
                .filter((cb) => cb.checked)
                .map((cb) => cb.value);

            // Actualizamos el valor del input hidden
            DOM.hiddenAficiones.value = seleccionadas.join(",");
        });
    });

    // Validar los campos cuando el usuario los modifique
    form.querySelectorAll("input, select, textarea").forEach(field => {
        field.addEventListener("input", () => {
            let errorSpan = document.getElementById("error-" + field.name);

            // Si el campo es válido, ocultamos el mensaje de error
            if (field.validity.valid) {
                if (errorSpan) {
                    errorSpan.textContent = "";
                }
            } else {
                // Si no es válido, mostramos el mensaje de error correspondiente
                if (errorSpan) {
                    errorSpan.textContent = field.title;
                }
            }
        });
    });
});






const form = document.getElementById("formulario");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evito el envío del formulario

    let valido = true;
    let a = 0;  //Contador de errores
    
    const divValidacionMensajes = document.getElementById("validacion-mensajes");  //<---- Crear contenedor para los mensajes
    divValidacionMensajes.innerHTML = "";

    // Validación de los checkbox de aficiones
    const seleccionadas = Array.from(checkboxesAficiones)
        .filter((cb) => cb.checked);

    if (seleccionadas.length < 2) {
        Error.Checkbox.textContent = "Por favor, selecciona al menos dos aficiones.";
        valido = false;
    } else {
        Error.Checkbox.textContent = "";
    }

    // Recorre todos los campos del formulario
    form.querySelectorAll("input, select, textarea").forEach(function(field) {
        let errorSpan = document.getElementById("error-" + field.name);

        // Verifica si el span de error existe antes de intentar modificarlo
        if (errorSpan) {
            errorSpan.textContent = ""; // Limpiar mensaje de error anterior
        }

        if (!field.validity.valid) {
            // Si el campo no es válido, mostrar el título como error
            if (errorSpan) {
                errorSpan.textContent = field.title;
            }
            valido = false;

            let mensaje = document.createElement("li");  //<---- Crear un <li> para el mensaje
            mensaje.textContent = `${field.name}: ${field.validationMessage}`;  //<---- Mostrar nombre del campo y mensaje de error
            divValidacionMensajes.appendChild(mensaje);
        }
    });

    //DNI o NIE validacion
    const DniNieV = document.getElementById("dni/nie").value
    const NumDniNie = document.getElementById("dni-nie").value

    if (DniNieV === "DNI") 
    {

        let numeros = NumDniNie.slice(0, -1);
        let letra = NumDniNie.slice(-1).toUpperCase();

        let indice = numeros % 23;
        if (ADN[indice] !== letra) 
        {
            Error.DniNie.textContent = "DNI inválido.";
            valido = false;
        }
    }
    else if (DniNieV === "NIE") 
    {

        let letraInicial = NumDniNie[0].toUpperCase();
        let numero = NumDniNie.slice(1, -1);

        if (letraInicial === "X") numero = "0" + numero;
        else if (letraInicial === "Y") numero = "1" + numero;
        else if (letraInicial === "Z") numero = "2" + numero;


        let letraFinal = NumDniNie.slice(-1).toUpperCase();

        let indice = numero % 23;

        if (ADN[indice] !== letraFinal) 
        {
            Error.DniNie.textContent = "NIE inválido.";
            valido = false;
        }
    }
    

    // //Validar el tipo de cuenta
    // const cuentaSeleccionada = document.querySelectorAll('input[name="CuentaComo"]:checked');
    // if (cuentaSeleccionada.length === 0) {
    //     Error.TipoCuenta.textContent = "Por favor, selecciona al menos un tipo de cuenta.";
    //     valido = false;
    //     errores[a] = "Tipo de cuenta";
    //     a += 1;
    // } 
    // else
    // {
    //     Error.TipoCuenta.textContent = "";
    // }


    // //Mostrar errores en el mensaje del alert
    // if (errores.length > 0) {
    //     valido = false
    //     if (errores.length == 2) 
    //     {
    //         let resultado = errores.join(" y ");
    //         alert("Errores en: " + resultado);
    //     }
    //     else
    //     {
    //         let resultado = errores.join(", ");
    //         alert("Errores en: " + resultado);
    //     }
        
    // }
    // Enviar
    if (valido) {
        form.submit();
    }
});
