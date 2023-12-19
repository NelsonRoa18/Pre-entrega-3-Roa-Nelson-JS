/// funcion para traer turnos desde el localstorage a la pagina
function traerTurnos() {

    turnosLocalStorage = JSON.parse(localStorage.getItem('Turnos'));
    console.log(turnosLocalStorage);

    if (turnosLocalStorage === null) {

        return 0;

    } else {
        if (turnos.length == 0 && turnosLocalStorage.length !== 0) {

            turnos = turnosLocalStorage;
            llenarTabla(turnos, 'turnos');

        } else {
            turnosLocalStorage !== null && turnosLocalStorage.length !== 0 && llenarTabla(turnos, 'turnos');
        }
    }




}
/// funcion que carga turnos en el localstorage
function cargarTurnosEnLocalStorage() {

    const turnosJSON = JSON.stringify(turnos);
    localStorage.setItem('Turnos', turnosJSON);

}

/// funcion que carga especialistas en el localstorage
function cargarEspecialistasEnLocalStorage() {
    const especialistas = ['Medico Clinico', 'Traumatologo', 'Psicologo', 'Dermatologo', 'Ginecologo'];

    localStorage.setItem('Especialistas', JSON.stringify(especialistas));
}
/// funcion que me devuelve los especialistas desde el local storage
function traerEspecialistasDelLocalStorage() {

    especialistasLocalStorage = JSON.parse(localStorage.getItem('Especialistas'));

    especialistasLocalStorage.length !== 0 && traerEspecialistasDelLocalStorage;

}

/// funcion para cargar los especialistas en un select para que interactue el usuario
function cargarEspecialistas(array, id) {

    let selectEspecialistas = document.getElementById(id);

    array.forEach((element, index) => {
        let option = document.createElement('option');

        option.value = index + 1;
        option.text = element;

        selectEspecialistas.add(option);

    });


}

/// funcion de los botones salir, oculto y muestro contenido de la pagina
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

    formPaciente.classList.add('hide');


}

/// funcion para mostrar la tabla y botones de administrador
function muestraTablaYBoton() {

    divBotones.classList.remove('col-md-12');
    divBotones.classList.add('col-md-3');

    tabla.classList.remove('hide');

    preguntaUsuario.classList.add('hide');

    tituloBienvenidaAdministrador.classList.remove('hide');


}

/// funcion para mostrar inputs y boton de reservar turno en pacientes
function muestraInputYBoton() {

    divBotones.classList.remove('col-md-12');
    divBotones.classList.add('col-md-3');

    preguntaUsuario.classList.add('hide');

    tituloBienvenidaAdministrador.classList.add('hide');

    tituloBienvenidaPaciente.classList.remove('hide');

    divInputPacientes.classList.remove('hide');

    cargarEspecialistasEnLocalStorage();
}

/// funcion para mostrar el formulario en pacientes
function muestraFormPacientes() {

    let valorSelect = selectEspecialistas.options[selectEspecialistas.selectedIndex].value;

    formPaciente.classList.remove('hide');

    valorSelect == 0 && formPaciente.classList.add('hide');


}

/// funcion que oculta el boton no seleccionado
function ocultaBoton() {

    btnpaciente.classList.remove('btn', 'btn-primary');
    btnpaciente.classList.add('hide');

    btnadministrador.classList.remove('btn', 'btn-primary');
    btnadministrador.classList.add('hide');

}

/// funcion que se encargar de reservar turnos una vez el usuario haya hecho click en el boton correspondiente
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
    cargarTurnosEnLocalStorage();

    limpiarFormulario(formPaciente);

}

/// funcion para llenar tabla de turnos
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

/// funcion para filtrar por especialista medico
function filtrar() {


    let valor = buscarTurnosDelEspecialista.options[buscarTurnosDelEspecialista.selectedIndex].value;


    const resultadoDelFiltradoDeTurnos = turnos.filter((turno) => turno.especialista.includes(especialistas[valor - 1]));

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
/// funcion me resetea el contenido del formulario - limpiar los campos
function limpiarFormulario(formulario) {
    selectEspecialistas.selectedIndex = 0;
    formulario.reset(); 
};

// funcino que Me genera un numero aleatorio entre 1 y 6 
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
