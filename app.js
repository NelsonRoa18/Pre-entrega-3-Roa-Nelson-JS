
// const especialistas = ['Medico Clinico', 'Traumatologo', 'Psicologo', 'Dermatologo', 'Ginecologo'];
// localStorage.setItem('Especialistas', JSON.stringify(especialistas));

let especialistas = JSON.parse(localStorage.getItem('Especialistas'));

/// EXISTEN DOS MEDIOS PARA GUARDAR EN STORAGE


// const pacientes = [];

// agregarPaciente(pacientes, 'Pepe', 'Mujica', 22);
// agregarPaciente(pacientes, 'Jose', 'Pepito', 24);
// agregarPaciente(pacientes, 'Roberto', 'Peperola', 25);
// agregarPaciente(pacientes, 'Anacleto', 'Rojas', 15);
// agregarPaciente(pacientes, 'Jeperta', 'Gagata', 18);
// agregarPaciente(pacientes, 'Pepe', 'Mujica', 22);
// agregarPaciente(pacientes, 'Jose', 'Pepito', 24);
// agregarPaciente(pacientes, 'Roberto', 'Peperola', 25);
// agregarPaciente(pacientes, 'Pepe', 'Mujica', 22);
// agregarPaciente(pacientes, 'Roberto', 'Peperola', 25);

// const pacientesJSON = JSON.stringify(pacientes);

// localStorage.setItem('Pacientes', pacientesJSON);

// let pacientes = [];

let pacientes = JSON.parse(localStorage.getItem('Pacientes'));

let turnos = [];


//let turnos = [];

// let turnos = JSON.parse(localStorage.getItem('Turnos'));


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

const selectEspecialistas = document.getElementById('especialista');

const btnReservarTurno = document.getElementById('btn__turno');

const buscarTurnosDelEspecialista = document.getElementById('especialista__a__filtrar');

function salir() {

    divBotones.classList.remove('col-md-3');
    divBotones.classList.add('col-md-12');

    btnadministrador.classList.add('btn', 'btn-primary');
    btnpaciente.classList.add('btn', 'btn-primary');

    btnadministrador.classList.remove('hide');
    btnpaciente.classList.remove('hide');

    tabla.classList.add('hide');


    divBotones.classList.remove('col-md-3');
    divBotones.classList.add('col-md-12');

    divInputPacientes.classList.add('hide');

    tituloBienvenidaAdministrador.classList.add('hide');

    tituloBienvenidaPaciente.classList.add('hide');

    let preguntaUsuario = document.getElementById('pregunta__a__usuario');
    preguntaUsuario.classList.remove('hide');


}

function muestraTablaYBoton() {

    divBotones.classList.remove('col-md-12');
    divBotones.classList.add('col-md-3');

    tabla.classList.remove('hide');

    preguntaUsuario.classList.add('hide');

    tituloBienvenidaAdministrador.classList.remove('hide');


}

function muestraInputYBoton() {

    divBotones.classList.remove('col-md-12');
    divBotones.classList.add('col-md-3');

    preguntaUsuario.classList.add('hide');

    tituloBienvenidaAdministrador.classList.add('hide');

    tituloBienvenidaPaciente.classList.remove('hide');

    divInputPacientes.classList.remove('hide');


}

function muestraFormPacientes() {

    formPaciente.classList.remove('hide');

}

function ocultaBoton() {

    btnpaciente.classList.remove('btn', 'btn-primary');
    btnpaciente.classList.add('hide');

    btnadministrador.classList.remove('btn', 'btn-primary');
    btnadministrador.classList.add('hide');

}

function cargarEspecialistas(array, id) {

    let selectEspecialistas = document.getElementById(id);

    array.forEach((element, index) => {
        let option = document.createElement('option');

        option.value = index + 1;
        option.text = element;

        selectEspecialistas.add(option);

    });

}

function reservarTurno(e) {

    const valor = selectEspecialistas.options[selectEspecialistas.selectedIndex].value;
    const nombreInput = document.getElementById('nombre__input').value;
    const apellidoInput = document.getElementById('apellido__input').value;
    const edadInput = document.getElementById('edad__input').value;

    e.preventDefault();

    //este metodo no me sirve para lo que necesito hacer ahora tengo que cambiarlo

    const paciente = new Paciente(nombreInput, apellidoInput, edadInput);


    function agregarTurno(paciente, especialista, consultorio) {

        const turno = new Turno(paciente, especialista, consultorio);

        turnos.push(turno);
        //localStorage.setItem('Turnos', JSON.stringify(turnos));

    }

    consultorio = getRandomIntInclusive(1, 6);

    function validarCampos() {

        nombreInput !== '' && apellidoInput !== '' && edadInput !== '' && agregarTurno(paciente, especialistas[valor - 1], consultorio);

    }
    validarCampos();
    cargarTurnosEnLocalStorage ();
    limpiarFormulario(formPaciente);
}


function llenarTabla(array, id) {

    const bodyTabla = document.getElementById(id);
    bodyTabla.innerHTML = ' ';

    array.forEach((turno, index) => {
        bodyTabla.innerHTML = bodyTabla.innerHTML +
            `<tr>
                <th>${index + 1}</th>
                <td>${turno.paciente.nombre}</td>
                <td>${turno.especialista}</td>
                <td>${turno.consultorio}</td>
            </tr>
            `

    });

    
};


function filtrar() {


    let valor = buscarTurnosDelEspecialista.options[buscarTurnosDelEspecialista.selectedIndex].value;


    const resultadoDelFiltradoDeTurnos = turnos.filter((turno) => turno.especialista.includes(especialistas[valor-1]));
    
    /// verifico que el array nuevo no este vacio
    if (resultadoDelFiltradoDeTurnos.length === 0) {
        console.log('Este especialista no tiene turnos');
        alert('Este especialista no tiene turnos');
    } else {

        resultadoDelFiltradoDeTurnos.forEach(turno => {
            llenarTabla(resultadoDelFiltradoDeTurnos, 'turnos__filtrados')

        });

    }
    
};

function limpiarFormulario(formulario) {
    selectEspecialistas.selectedIndex = 0;
    formulario.reset(); ///me resetea el contenido del formulario - limpiar los campos
};

// Me genera un numero aleatorio entre 1 y 6 
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};


function traerTurnos () {

    turnosLocalStorage = JSON.parse(localStorage.getItem('Turnos'));
    console.log(turnosLocalStorage);

    turnosLocalStorage.length !== 0 && llenarTabla(turnosLocalStorage, 'turnos');

    turnos = turnosLocalStorage;

}

function cargarTurnosEnLocalStorage () {

    const turnosJSON = JSON.stringify(turnos);
    localStorage.setItem('Turnos', turnosJSON);

}


btnadministrador.addEventListener("click", muestraTablaYBoton);
btnadministrador.addEventListener("click", cargarEspecialistas(especialistas, 'especialista__a__filtrar'));
btnadministrador.addEventListener("click", ocultaBoton);
btnadministrador.addEventListener("click", traerTurnos);


btnpaciente.addEventListener("click", muestraInputYBoton);
btnpaciente.addEventListener("click", ocultaBoton);

btnpaciente.addEventListener("click", cargarEspecialistas(especialistas, 'especialista'));

selectEspecialistas.addEventListener("change", muestraFormPacientes);

formPaciente.addEventListener("submit", reservarTurno);
buscarTurnosDelEspecialista.addEventListener("change", filtrar);

btnsalir.addEventListener("click", salir);




