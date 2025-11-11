const API_URL = "http://localhost:3000/usuarios";
const form = document.getElementById("formUsuario");
const tabla = document.querySelector("#tablaUsuarios tbody");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const idInput = document.getElementById("id");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");

// ====== Cargar Usuarios ======
async function cargarUsuarios() {
  const res = await fetch(API_URL);
  const usuarios = await res.json();
  tabla.innerHTML = "";
  usuarios.forEach(u => {
    const fila = `
      <tr>
        <td>${u.id}</td>
        <td>${u.nombre}</td>
        <td>${u.correo}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarUsuario(${u.id}, '${u.nombre}', '${u.correo}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${u.id})">Eliminar</button>
        </td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

// ====== Crear o Actualizar Usuario ======
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = idInput.value;
  const datos = { nombre: nombreInput.value, correo: correoInput.value };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
  }

  form.reset();
  idInput.value = "";
  btnCancelar.style.display = "none";
  btnGuardar.textContent = "Guardar";
  cargarUsuarios();
});

// ====== Editar Usuario ======
function editarUsuario(id, nombre, correo) {
  idInput.value = id;
  nombreInput.value = nombre;
  correoInput.value = correo;
  btnGuardar.textContent = "Actualizar";
  btnCancelar.style.display = "inline-block";
}

// ====== Cancelar edición ======
btnCancelar.addEventListener("click", () => {
  form.reset();
  idInput.value = "";
  btnGuardar.textContent = "Guardar";
  btnCancelar.style.display = "none";
});

// ====== Eliminar Usuario ======
async function eliminarUsuario(id) {
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarUsuarios();
  }
}

// ====== Inicializar ======
cargarUsuarios();

