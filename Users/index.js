
let listadoempleados = [];

const objempleado = {
id:'',
nombre:'',
apellido:'',
email:''

}

let editando =false;

const formulario= document.querySelector('#formulario');
const nombreImput=document.querySelector('#nombre');
const apellidoImput=document.querySelector('#apellido');
const emailImput=document.querySelector('#email');
const btnAgregar=document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarformulario);

function validarformulario(e){
e.preventDefault();

if(nombreImput.value === ''|| apellidoImput.value === '' || emailImput.value === '' ){
    alert('todos los campos son obligatorios');
    return;
}

if(editando){
    editarEmpleado();
    editando = false;
} else{
    objempleado.id = Date.now();
    objempleado.nombre = nombreImput.value;
    objempleado.apellido = apellidoImput.value;
    objempleado.email = emailImput.value;

    agregarEmpleado();
}

}


function agregarEmpleado(){
listadoempleados.push({...objempleado});
mostrarEmpleados();
/* */ 
formulario.reset();
limpiarAgregar();

}

function limpiarAgregar(){
    objempleado.id= '';
    objempleado.nombre= '';
    objempleado.apellido = '';
    objempleado.email='';
    
    }


function mostrarEmpleados(){
LimpiarHtml();

const divEmpleados = document.querySelector('.div-empleados');

listadoempleados.forEach(empleado => { 
    const{id, nombre, apellido, email} = empleado;

    const parrafo = document.createElement('p');
    parrafo.textContent = `${id} - ${nombre} - ${apellido} - ${email} - `;
    parrafo.dataset.id = id;

    const editarBoton = document.createElement('button');
    editarBoton.onclick = () => cargarEmpleado(empleado);
    editarBoton.textContent = 'Editar';
    editarBoton.classList.add('btn', 'btn-Editar');
    parrafo.append(editarBoton);
    

    const eliminarBoton = document.createElement('button');
    eliminarBoton.onclick = () => EliminarEmpleado(id);
    eliminarBoton.textContent = 'Eliminar';
    eliminarBoton.classList.add('btn', 'btn-Eliminar');
    parrafo.append(eliminarBoton);
    

const hr = document.createElement('hr');
divEmpleados.appendChild(parrafo);
divEmpleados.appendChild(hr);


});

}


function cargarEmpleado(empleado){
const {id,nombre, apellido, email} = empleado;

nombreImput.value= nombre;
apellidoImput.value = apellido;
emailImput.value = email;

objempleado.id=id;

formulario.querySelector('button[type="submit"]').textContent='Actualizar';

editando = true;

}

function editarEmpleado(){
objempleado.nombre = nombreImput.value;
objempleado.apellido = apellidoImput.value;
objempleado.email = emailImput.value;


listadoempleados.map(empleado =>  {

    if(empleado.id === objempleado.id){
        empleado.id = objempleado.id;
        empleado.nombre = objempleado,nombre;
        empleado.apellido = objempleado.apellido;
        empleado.email = objempleado.email;
    }

} );

LimpiarHtml();
mostrarEmpleados();
formulario.reset();
formulario.querySelector('button[type="submit"]').textContent='Agregar';
editando = false;

}

function EliminarEmpleado(id){
    listadoempleados = listadoempleados.filter(empleado => empleado.id !== id);
    LimpiarHtml();
    mostrarEmpleados();
    }


function LimpiarHtml(){
const divEmpleados = document.querySelector('.div-empleados');
while(divEmpleados.firstChild){
    divEmpleados.removeChild(divEmpleados.firstChild);
}




}

