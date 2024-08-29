/**
 * VIDEO NO. 163 AÑADIR LOCAL STORAGE AL CARRITO DE COMPRAS
 */

//Variables del DOM 
const carrito = document.querySelector("#carrito");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#carrito tbody"); 
//Arreglo de cursos del carrito 
let articulosCarrito = [];


//Llamamos a la funcion que carga todos los evenetListener 
cargarEventListener();

//Funcion que carga todos los eventListener
function cargarEventListener(){
    //EventListener en la lista de curso para llamar la funcion agregarCurso
    listaCursos.addEventListener("click", agregarCurso);
    //Event listener en el carrito para llamar la funcion eliminarCurso
    carrito.addEventListener("click", eliminarCurso);
    //Mostramos los cursos del localStorage cuando el documento este listo
    document.addEventListener("DOMContentLoaded", ()=>{
        //Al arreglo articulosCarrito le reasingamos lo que se contiene en el localStorage
        articulosCarrito = JSON.parse(localStorage.getItem("articulosCarrito") || []);
        //Llamamos a la funcion carritoHTML para que muestre de nuevo el arreglo artiulosCarrito
        carritoHTML();
    })
    
    //EventListener en btnVaciarCarrito
    btnVaciarCarrito.addEventListener("click", ()=>{
        //Vaciamos el arreglo de articulosCarrito 
        articulosCarrito = [];
        //Vaciamos el contenedorCarrito
        contenedorCarrito.textContent = "";
    });
}

//Funcion que garantizar seleccionar un curso en concreto 
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        //Si se hace click en el btn agregarCarrito se crea una constante que va a contener todo el card del curso 
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //Se llama a la funcion leerDatosCurso y se le pasa el curso seleccionado
        leerDatosCurso(cursoSeleccionado);
    }
}

//Funcion que elimina un curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    //Verificamos que se este dando click en borrar-curso
    if(e.target.classList.contains("borrar-curso")){
        //Guardamos el id del curso seleccionado 
        const cursoID = e.target.getAttribute("data-id");

        //Si se da click en borrar curso, eliminamos ese curso del arreglo articulosCarrito 
        articulosCarrito = articulosCarrito.filter((curso) =>{
            return curso.id !== cursoID;
        });
    }
    //Llamamos a la funcion que muestra el html del arreglo articulosCarrito actualizado
    carritoHTML();
}

    //Funcion que lee los datos del curso seleccionado y los guarda en un objeto 
    function leerDatosCurso(cursoSeleccionado){
        //Constante objeto que lee los datos del curso seleccionado
        const infoCurso = {
            //Leemos los datos de titulo, precio e imagen
            titulo: cursoSeleccionado.querySelector("h4").textContent,
            imagen: cursoSeleccionado.querySelector("img").src,
            precio: cursoSeleccionado.querySelector("span").textContent,
            id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
            cantidad: 1
        }
        //Verificamos si en el arreglo ya existe un objeto con el mismo id
        const existe = articulosCarrito.some((curso) =>{
            return curso.id === infoCurso.id;
        });

        //Si el valor de existe es true
        if(existe){
            //Creamos un nuevo arreglo de tipo map
            const cursos = articulosCarrito.map((curso) =>{
                //Si ya existe un curso con el mismo id
                if(curso.id === infoCurso.id){
                    //Aumentamos la cantidad
                    curso.cantidad++;
                    //Regresamos curso a la variable cursos
                    return curso;
                }else{
                    //Si no existe el mismo id regresamos el curso a cursos
                    return curso;
                }
            })
            //Agregamos cursos al arreglo articulosCarrito 
            articulosCarrito.push(cursos);
        }else{
            //Agregamos el objeto inforCurso al arreglo articulosCarrito
            articulosCarrito.push(infoCurso);
        }
        //Llamamos a la funcion que crea un html por cada objeto que haya en el arreglo articulosCarrito
        carritoHTML();
    }

//Funcion que genera el html de cada uno de los objetos que haya en el arreglo articulosCarrito 
function carritoHTML(){
    //Llamamos al funcion que limpia el html 
    limpiarHTML();

    //Recorremos el arreglo
    articulosCarrito.forEach((curso) =>{
        //Por cada objeto que haya en el arreglo de se crea un trow
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="120">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <!--Agregamos boton para eliminar-->
            <td>
                <a href = "#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        //Se agrega cada row como hijo del elemento contenedorCarrito
        contenedorCarrito.appendChild(row);
    });

    //Sincronizamos el arreglo articulosCarrito con el localStorage
    sincronizarLocalStorage();
}

//Funcion que sincroniza el arreglo articulosCarrito en el localStorage
function sincronizarLocalStorage(){
    //Agregamos el arregloArticulos al localStorage
    localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));
}

//Funcion que limpia el html del contenedorCarrito
function limpiarHTML(){
    contenedorCarrito.textContent = "";
}