/// Lanzo el modal a penas carga la pagina
$(document).ready(function () {
    $('#myModal').modal('toggle')
});





let pacientes = JSON.parse(localStorage.getItem('Pacientes'));

/// Declaro un array vacio para poder guardar los turnos
let turnos = [];

/// Obtengo todos los elementos que usare en el programa
const btnadministrador = document.getElementById('administrador');

const btnpaciente = document.getElementById('paciente');

const btnsalir = document.getElementById('salir')

const divBotones = document.getElementById('botones');

const preguntaUsuario = document.getElementById('pregunta__a__usuario');

const tabla = document.getElementById('div__contenedor__tabla');

const tablaTurnos = document.getElementById('turnos');

const divInputPacientes = document.getElementById('div__input__pacientes');

const tituloBienvenidaAdministrador = document.getElementById('bienvenida__administrador');

const tituloBienvenidaPaciente = document.getElementById('bienvenida__paciente');

const formPaciente = document.getElementById('form__paciente');

const selectEspecialistas = document.getElementById('especialistas');

const btnReservarTurno = document.getElementById('btn__turno');

const buscarTurnosDelEspecialista = document.getElementById('especialista__a__filtrar');





btnadministrador.addEventListener("click", cargarEspecialistas(especialistas, 'especialista__a__filtrar'));
btnadministrador.addEventListener("click", muestraTablaYBoton);
btnadministrador.addEventListener("click", ocultaBoton);


btnadministrador.addEventListener("click", traerTurnos);

btnpaciente.addEventListener("click", muestraInputYBoton);
btnpaciente.addEventListener("click", ocultaBoton);



selectEspecialistas.addEventListener("change", muestraFormPacientes);

formPaciente.addEventListener("submit", reservarTurno);

buscarTurnosDelEspecialista.addEventListener("change", filtrar);

btnsalir.addEventListener("click", salir);


