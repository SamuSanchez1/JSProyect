// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);
    //Para ir elimiando de 1 a uno
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritobtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarCarrito();
    });
   
    

    
}

function agregarCurso(e){
    e.preventDefault();
if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccioando = e.target.parentElement.parentElement
   leerDatosCurso(cursoSeleccioando);
}

}
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
      const cursoId = e.target.getAttribute('data-id');
      articulosCarrito = articulosCarrito.filter (curso => curso.id !==cursoId);
      console.log(articulosCarrito);
      carritoHTML();//Para mostar de nuevo
    }
}    


function leerDatosCurso(curso){
//    console.log(curso);
   const infoCurso= {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
   }

//Revisar si ya existe (el some recorre el array y cuando el curso.id sea igual al curso seleccionado)
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
if(existe){
    //el map crea un nuevo arreglo con la cantidad actualizada
  const cursos = articulosCarrito.map(curso =>{
    if(curso.id === infoCurso.id){
        curso.cantidad++;
        return curso; //objeto actualizado
    }else{
        return curso; // no duplicados
    }
  });
  articulosCarrito = [...cursos];
}else{
       //agregar elementos al array de carrito
    articulosCarrito = [...articulosCarrito , infoCurso];
}
   console.log(articulosCarrito);
   carritoHTML();
}

//Muestra el carrito en el html

function carritoHTML(){

    //Vamos a limpiar el html ya que el array va cogiendo posicion 1, posicion 1 y 2 y asi sucesivamente
    limpiarCarrito();
    articulosCarrito.forEach((curso) => {
        const{imagen,titulo,precio,cantidad,id} = curso
      const row = document.createElement('tr');
      row.innerHTML = `
      <td> <img src="${imagen}" width = "100"> </td>
      <td> ${titulo} </td>
      <td> ${precio} </td>
      <td> ${cantidad} </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
      `;
//Agrega el html del carrito en el tbody
contenedorCarrito.appendChild(row);

    })
}
//Elimia los cursos del tbody

function limpiarCarrito(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}


