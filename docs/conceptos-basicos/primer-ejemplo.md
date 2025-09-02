# 1.2 Tu primera aplicación Vue

En este ejemplo práctico, crearemos una aplicación de lista de tareas simple para entender los conceptos básicos de Vue.

## Estructura del proyecto

```
mi-primera-app/
├── index.html
└── app.js
```

## Paso 1: Configuración inicial

Crea un archivo `index.html` con el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Primera App Vue</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        .completada {
            text-decoration: line-through;
            color: #888;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Lista de Tareas</h1>
        
        <!-- Formulario para agregar tareas -->
        <div class="formulario">
            <input 
                v-model="nuevaTarea" 
                @keyup.enter="agregarTarea"
                placeholder="Escribe una tarea y presiona Enter"
            >
            <button @click="agregarTarea">Agregar</button>
        </div>
        
        <!-- Lista de tareas -->
        <ul>
            <li v-for="(tarea, index) in tareas" :key="index" 
                :class="{'completada': tarea.completada}"
                @click="tarea.completada = !tarea.completada">
                {{ tarea.texto }}
                <button @click.stop="eliminarTarea(index)">Eliminar</button>
            </li>
        </ul>
        
        <!-- Contador de tareas -->
        <p v-if="tareas.length > 0">
            Tareas completadas: {{ tareasCompletadas.length }} de {{ tareas.length }}
        </p>
        <p v-else>
            No hay tareas. ¡Agrega una para comenzar!
        </p>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

## Paso 2: Lógica de la aplicación

Crea un archivo `app.js` con el siguiente código:

```javascript
const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const nuevaTarea = ref('');
    const tareas = ref([
      { texto: 'Aprender Vue.js', completada: false },
      { texto: 'Hacer la compra', completada: true },
      { texto: 'Llamar al médico', completada: false }
    ]);

    const tareasCompletadas = computed(() => {
      return tareas.value.filter(t => t.completada);
    });

    function agregarTarea() {
      if (nuevaTarea.value.trim() === '') return;
      
      tareas.value.push({
        texto: nuevaTarea.value,
        completada: false
      });
      
      nuevaTarea.value = ''; // Limpiar el input
    }

    function eliminarTarea(index) {
      tareas.value.splice(index, 1);
    }

    return {
      nuevaTarea,
      tareas,
      tareasCompletadas,
      agregarTarea,
      eliminarTarea
    };
  }
}).mount('#app');
```

## Conceptos aprendidos en este ejemplo

1. **Directivas de Vue**:

    - `v-model`: Para enlazar datos bidireccionalmente
    - `v-for`: Para iterar sobre arrays
    - `v-if`/`v-else`: Para renderizado condicional
    - `@click`: Para manejar eventos de clic

2. **Reactividad**:

    - Uso de `ref` para crear variables reactivas
    - Uso de `computed` para propiedades calculadas

3. **Métodos**:

    - Funciones para manipular el estado de la aplicación

## Ejercicios para practicar

1. Añade un botón para marcar todas las tareas como completadas

2. Implementa la funcionalidad para editar una tarea existente

3. Añade la opción de filtrar tareas (todas, completadas, pendientes)

4. Guarda las tareas en el `localStorage` para que persistan al recargar la página

## Solución de problemas

Si algo no funciona:
1. Asegúrate de que Vue 3 esté cargado correctamente

2. Revisa la consola del navegador (F12) en busca de errores

3. Verifica que los nombres de las variables coincidan exactamente

En la siguiente sección profundizaremos en las directivas de Vue y cómo usarlas efectivamente.

[Siguiente: Interpolación y Directivas →](../fundamentos/interpolacion.md)
