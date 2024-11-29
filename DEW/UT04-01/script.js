document.addEventListener("DOMContentLoaded", () => 
{
    const contraseñaInput = document.getElementById("contraseña");
    const mostrarContraCheckbox = document.getElementById("mostrar-contraseña");
    const tituloInput = document.getElementById("titulo");
    const descripcionInput = document.getElementById("descripcion");
    const contadorTitulo = document.getElementById("contador-titulo");
    const contadorDescripcion = document.getElementById("contador-descripcion");

    mostrarContraCheckbox.addEventListener("change", () => {
        contraseñaInput.type = mostrarContraCheckbox.checked ? "text" : "password";
    });
    tituloInput.addEventListener("input", () => {
        contadorTitulo.textContent = `${tituloInput.value.length} / 15`;
    });
    descripcionInput.addEventListener("input", () => {
        contadorDescripcion.textContent = `${descripcionInput.value.length} / 120`;
    });
});
