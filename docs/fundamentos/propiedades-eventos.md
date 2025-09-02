# 2.3 Propiedades Computadas y Manejo de Eventos

## Propiedades Computadas

Las propiedades computadas son valores que se calculan automáticamente basados en otras propiedades reactivas. Son ideales para realizar operaciones complejas o filtrar datos.

### Ejemplo Básico

```html
<template>
  <div>
    <p>Nombre completo: {{ nombreCompleto }}</p>
    <p>Nombre en mayúsculas: {{ nombreEnMayusculas }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const nombre = ref('Ana');
const apellido = ref('García');

// Propiedad computada
const nombreCompleto = computed(() => {
  return `${nombre.value} ${apellido.value}`;
});

// Otra propiedad computada
const nombreEnMayusculas = computed(() => {
  return nombreCompleto.value.toUpperCase();
});
</script>
```

### Características importantes:

1. **Caché automático**: Las propiedades computadas se almacenan en caché y solo se vuelven a calcular cuando sus dependencias cambian.
2. **Reactividad**: Son reactivas, lo que significa que la interfaz se actualiza automáticamente cuando cambian sus dependencias.
3. **Solo lectura**: Por defecto, las propiedades computadas son de solo lectura. Para crear una propiedad computada escribible, puedes proporcionar un getter y un setter.

### Propiedades computadas vs Métodos

| Característica | Propiedad Computada | Método |
|----------------|---------------------|--------|
| Caché | Sí, se almacena el resultado | No, se ejecuta cada vez |
| Uso en plantilla | Sin paréntesis | Con paréntesis |
| Reactividad | Reactiva a sus dependencias | Se ejecuta en cada renderizado |

## Manejo de Eventos

Vue proporciona la directiva `v-on` (o `@` como atajo) para escuchar eventos del DOM.

### Eventos Básicos

```html
<template>
  <div>
    <button @click="contador++">Incrementar ({{ contador }})</button>
    <button @click="saludar">Saludar</button>
    <button @dblclick="contador = 0">Reiniciar (doble clic)</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contador = ref(0);
const mensaje = ref('¡Hola Vue!');

function saludar() {
  alert(mensaje.value);
}
</script>
```

### Modificadores de Eventos

Vue proporciona modificadores de eventos para tareas comunes:

```html
<template>
  <div>
    <!-- El evento submit ya no recargará la página -->
    <form @submit.prevent="enviarFormulario">
      <input type="text" v-model="usuario">
      <button type="submit">Enviar</button>
    </form>

    <!-- Solo se activa con la tecla Enter -->
    <input @keyup.enter="buscar" placeholder="Presiona Enter">

    <!-- Solo se activa con Ctrl + clic -->
    <div @click.ctrl="accionCtrlClic">Haz Ctrl + clic aquí</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const usuario = ref('');

function enviarFormulario() {
  alert(`Formulario enviado: ${usuario.value}`);
}

function buscar() {
  alert(`Buscando: ${usuario.value}`);
}

function accionCtrlClic() {
  alert('¡Control + Clic detectado!');
}
</script>
```

### Objeto de Evento Nativo

Puedes acceder al evento nativo del DOM usando la variable especial `$event` o usando una función flecha:

```html
<template>
  <div>
    <!-- Usando $event -->
    <button @click="mostrarMensaje('Hola', $event)">Saludar 1</button>
    
    <!-- Usando función flecha -->
    <button @click="(event) => mostrarMensaje('Hola', event)">Saludar 2</button>
  </div>
</template>

<script setup>
function mostrarMensaje(mensaje, event) {
  console.log(event.target.tagName); // Muestra "BUTTON"
  alert(mensaje);
}
</script>
```

## Ejercicio Práctico: Lista de Tareas

Vamos a crear una lista de tareas que combine propiedades computadas y manejo de eventos:

```html
<template>
  <div class="todo-app">
    <h1>Lista de Tareas</h1>
    
    <!-- Formulario para añadir tareas -->
    <form @submit.prevent="agregarTarea">
      <input 
        v-model="nuevaTarea" 
        @keyup.enter="agregarTarea"
        placeholder="Nueva tarea..."
        required
      >
      <button type="submit">Añadir</button>
    </form>
    
    <!-- Filtros -->
    <div class="filtros">
      <button 
        v-for="filtro in filtros" 
        :key="filtro"
        @click="filtroActual = filtro"
        :class="{ activo: filtroActual === filtro }"
      >
        {{ filtro }}
      </button>
    </div>
    
    <!-- Lista de tareas -->
    <ul v-if="tareasFiltradas.length > 0">
      <li v-for="(tarea, index) in tareasFiltradas" :key="index">
        <input 
          type="checkbox" 
          v-model="tarea.completada"
          @change="actualizarTarea(tarea)"
        >
        <span :class="{ 'completada': tarea.completada }">
          {{ tarea.texto }}
        </span>
        <button @click="eliminarTarea(index)">🗑️</button>
      </li>
    </ul>
    <p v-else>No hay tareas para mostrar</p>
    
    <!-- Contador -->
    <div class="contadores">
      <p>Total: {{ totalTareas }}</p>
      <p>Pendientes: {{ tareasPendientes.length }}</p>
      <p>Completadas: {{ tareasCompletadas.length }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Datos reactivos
const nuevaTarea = ref('');
const tareas = ref([
  { id: 1, texto: 'Aprender Vue 3', completada: true },
  { id: 2, texto: 'Crear una aplicación', completada: false },
  { id: 3, texto: 'Desplegar en producción', completada: false },
]);

const filtroActual = ref('Todas');
const filtros = ['Todas', 'Pendientes', 'Completadas'];

// Propiedades computadas
const tareasPendientes = computed(() => {
  return tareas.value.filter(t => !t.completada);
});

const tareasCompletadas = computed(() => {
  return tareas.value.filter(t => t.completada);
});

const totalTareas = computed(() => tareas.value.length);

const tareasFiltradas = computed(() => {
  if (filtroActual.value === 'Pendientes') {
    return tareasPendientes.value;
  } else if (filtroActual.value === 'Completadas') {
    return tareasCompletadas.value;
  }
  return tareas.value;
});

// Métodos
function agregarTarea() {
  if (nuevaTarea.value.trim() === '') return;
  
  tareas.value.push({
    id: Date.now(),
    texto: nuevaTarea.value.trim(),
    completada: false
  });
  
  nuevaTarea.value = '';
}

function eliminarTarea(index) {
  tareas.value.splice(index, 1);
}

function actualizarTarea(tarea) {
  console.log(`Tarea "${tarea.texto}" actualizada:`, tarea.completada ? 'Completada' : 'Pendiente');
}
</script>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

input[type="text"] {
  padding: 8px;
  width: 60%;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
}

button:hover {
  background-color: #369f6b;
}

.filtros {
  margin: 15px 0;
}

.filtros button {
  background-color: #f0f0f0;
  color: #333;
}

.filtros button.activo {
  background-color: #42b983;
  color: white;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

li span {
  flex-grow: 1;
  margin: 0 10px;
}

li span.completada {
  text-decoration: line-through;
  color: #888;
}

.contadores {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9em;
}
</style>
```

## Preguntas de Repaso

1. ¿Qué ventaja tienen las propiedades computadas sobre los métodos cuando se usan en plantillas?
2. ¿Cómo evitarías que un formulario recargue la página al enviarse?
3. ¿Qué hace el modificador `.prevent` en un evento?
4. ¿Cómo crearías una propiedad computada que dependa de otra propiedad computada?
5. ¿Qué diferencia hay entre `@click="metodo"` y `@click="metodo()"`?

## Recursos Adicionales

- [Documentación de Propiedades Computadas](https://vuejs.org/guide/essentials/computed.html)
- [Guía de Manejo de Eventos](https://vuejs.org/guide/essentials/event-handling.html)
- [Modificadores de Eventos](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers)
