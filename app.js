const inputTarea = document.getElementById("nueva-tarea");
const botonAgregar = document.getElementById("agregar-tarea");
const listaTareas = document.getElementById("lista-tareas");

class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.completa = false;
    }

    completar() {
        this.completa = !this.completa;
    }

    editar(nuevoNombre) {
        this.nombre = nuevoNombre;
    }
}

class GestorDeTareas {
    constructor() {
        this.tareas =
            JSON.parse(localStorage.getItem("tareas")) || [];

        this.render();
    }

    guardar() {
        localStorage.setItem(
            "tareas",
            JSON.stringify(this.tareas)
        );
    }

    agregarTarea(nombre) {

        const tarea = new Tarea(nombre);

        this.tareas.push(tarea);

        this.guardar();

        this.render();
    }

    eliminarTarea(index) {

        this.tareas.splice(index, 1);

        this.guardar();

        this.render();
    }

    editarTarea(index) {

        const nuevoTexto = prompt(
            "Editar tarea:",
            this.tareas[index].nombre
        );

        if (nuevoTexto) {

            this.tareas[index].editar(nuevoTexto);

            this.guardar();

            this.render();
        }
    }

    completarTarea(index) {

        this.tareas[index].completa =
            !this.tareas[index].completa;

        this.guardar();

        this.render();
    }

    render() {

        listaTareas.innerHTML = "";

        this.tareas.forEach((tarea, index) => {

            const li =
                document.createElement("li");

            li.innerHTML = `
                ${tarea.nombre}
                <button class="completar">✓</button>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            `;

            if (tarea.completa) {
                li.style.textDecoration =
                    "line-through";

                li.style.color = "green";
            }

            li.querySelector(".completar")
                .addEventListener("click", () => {

                this.completarTarea(index);

            });

            li.querySelector(".editar")
                .addEventListener("click", () => {

                this.editarTarea(index);

            });

            li.querySelector(".eliminar")
                .addEventListener("click", () => {

                this.eliminarTarea(index);

            });

            listaTareas.appendChild(li);

        });

    }
}

const gestor = new GestorDeTareas();

botonAgregar.addEventListener("click", () => {

    const texto = inputTarea.value;

    if (texto === "") {

        alert("Por favor escribe una tarea.");

        return;
    }

    gestor.agregarTarea(texto);

    inputTarea.value = "";

});