# 2.3 Condicionales y Bucles

## Directiva v-if, v-else-if, v-else

Las directivas condicionales permiten renderizar elementos basados en una condición.

### Uso básico:

```html
<div v-if="puntuacion >= 90">
  ¡Excelente!
</div>
<div v-else-if="puntuacion >= 70">
  Bien hecho
</div>
<div v-else>
  Sigue practicando
</div>
```

### v-if vs v-show

- `v-if`: Renderiza condicionalmente el elemento (lo añade/elimina del DOM)
- `v-show`: Siempre renderiza el elemento, pero usa CSS para mostrarlo/ocultarlo

```html
<div v-if="mostrar">Usando v-if</div>
<div v-show="mostrar">Usando v-show</div>
```

## Directiva v-for

Permite iterar sobre arrays u objetos.

### Iterando sobre arrays:

```html
<ul>
  <li v-for="(tarea, index) in tareas" :key="tarea.id">
    {{ index + 1 }}. {{ tarea.texto }}
  </li>
</ul>
```

### Iterando sobre objetos:

```html
<ul>
  <li v-for="(valor, clave) in usuario" :key="clave">
    {{ clave }}: {{ valor }}
  </li>
</ul>
```

## Ejercicio Práctico: Lista de Tareas Avanzada

En este ejercicio, crearemos una lista de tareas avanzada que incluye:
- Filtrado de tareas (Todas, Pendientes, Completadas)
- Edición en línea de tareas
- Persistencia en localStorage
- Contadores de tareas
- Interfaz intuitiva

### Estructura del Código

1. **HTML (Template)**

```html
<div id="app">
  <h1>Lista de Tareas Avanzada</h1>
  
  <!-- Formulario para agregar tareas -->
  <div class="form-group">
    <input 
      v-model="nuevaTarea" 
      @keyup.enter="agregarTarea"
      placeholder="Nueva tarea..."
    >
    <button @click="agregarTarea">Agregar</button>
  </div>
  
  <!-- Filtros -->
  <div class="filtros">
    <button 
      v-for="filtro in filtros" 
      :key="filtro"
      @click="filtroActual = filtro"
      :class="{ 'activo': filtro === filtroActual }"
    >
      {{ filtro }}
    </button>
  </div>
  
  <!-- Lista de tareas -->
  <ul class="lista-tareas">
    <li 
      v-for="tarea in tareasFiltradas" 
      :key="tarea.id"
      :class="{ 'completada': tarea.completada }"
    >
      <input 
        type="checkbox" 
        v-model="tarea.completada"
        @change="actualizarTarea(tarea)"
      >
      <span @dblclick="editarTarea(tarea)">
        {{ tarea.texto }}
      </span>
      <div class="acciones-tarea">
        <button class="btn-editar" @click="editarTarea(tarea)">
          ✏️
        </button>
        <button class="btn-eliminar" @click="eliminarTarea(tarea.id)">
          🗑️
        </button>
      </div>
      
      <!-- Input de edición (se muestra al hacer doble clic) -->
      <input 
        v-if="tarea.editando"
        v-model="tarea.texto"
        @blur="guardarEdicion(tarea)"
        @keyup.enter="guardarEdicion(tarea)"
        @keyup.esc="cancelarEdicion(tarea)"
        v-focus
        class="input-edicion"
      >
    </li>
  </ul>
  
  <!-- Contadores -->
  <div class="contadores">
    <p>Total: {{ tareas.length }}</p>
    <p>Completadas: {{ tareasCompletadas }}</p>
    <p>Pendientes: {{ tareasPendientes }}</p>
  </div>
  
  <!-- Mensaje cuando no hay tareas -->
  <p v-if="tareas.length === 0" class="sin-tareas">
    No hay tareas. ¡Agrega una para comenzar!
  </p>
</div>
```

2. **JavaScript (Vue 3 Composition API)**

```javascript
const { createApp, ref, computed, onMounted } = Vue;

// Directiva personalizada para enfocar el input de edición
const focus = {
  mounted: (el) => el.focus()
};

createApp({
  directives: { focus },
  
  setup() {
    const nuevaTarea = ref('');
    const tareas = ref(JSON.parse(localStorage.getItem('tareas')) || []);
    const filtroActual = ref('Todas');
    const tareasAntesDeEditar = {};
    
    const filtros = ['Todas', 'Pendientes', 'Completadas'];
    
    // Cargar tareas guardadas al iniciar
    onMounted(() => {
      const tareasGuardadas = localStorage.getItem('tareas');
      if (tareasGuardadas) {
        tareas.value = JSON.parse(tareasGuardadas);
      }
    });
    
    // Computadas
    const tareasCompletadas = computed(() => 
      tareas.value.filter(t => t.completada).length
    );
    
    const tareasPendientes = computed(() => 
      tareas.value.length - tareasCompletadas.value
    );
    
    const tareasFiltradas = computed(() => {
      switch (filtroActual.value) {
        case 'Pendientes':
          return tareas.value.filter(t => !t.completada);
        case 'Completadas':
          return tareas.value.filter(t => t.completada);
        default:
          return tareas.value;
      }
    });
    
    // Métodos
    function agregarTarea() {
      if (nuevaTarea.value.trim() === '') return;
      
      const tarea = {
        id: Date.now(),
        texto: nuevaTarea.value.trim(),
        completada: false,
        editando: false
      };
      
      tareas.value.push(tarea);
      nuevaTarea.value = '';
      guardarTareas();
    }
    
    function eliminarTarea(id) {
      if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        tareas.value = tareas.value.filter(t => t.id !== id);
        guardarTareas();
      }
    }
    
    function editarTarea(tarea) {
      tareasAntesDeEditar[tarea.id] = tarea.texto;
      tarea.editando = true;
    }
    
    function guardarEdicion(tarea) {
      if (tarea.texto.trim() === '') {
        tarea.texto = tareasAntesDeEditar[tarea.id] || '';
      }
      tarea.editando = false;
      guardarTareas();
    }
    
    function cancelarEdicion(tarea) {
      tarea.texto = tareasAntesDeEditar[tarea.id] || tarea.texto;
      tarea.editando = false;
    }
    
    function actualizarTarea(tarea) {
      guardarTareas();
    }
    
    function guardarTareas() {
      localStorage.setItem('tareas', JSON.stringify(tareas.value));
    }
    
    return {
      nuevaTarea,
      tareas,
      tareasFiltradas,
      tareasCompletadas,
      tareasPendientes,
      filtros,
      filtroActual,
      agregarTarea,
      eliminarTarea,
      editarTarea,
      guardarEdicion,
      cancelarEdicion,
      actualizarTarea
    };
  }
}).mount('#app');
```

3. **CSS (Estilos)**

```css
/* Estilos generales */
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  box-sizing: border-box;
}

/* Títulos */
h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Formulario */
.form-group {
  margin: 1.5rem 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

input[type="text"] {
  flex: 1;
  min-width: 200px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  white-space: nowrap;
}

button:hover {
  background: #3aa876;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Filtros */
.filtros {
  margin: 1.5rem 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.filtros button {
  background: #f0f0f0;
  color: #333;
  padding: 8px 15px;
  margin: 5px;
}

.filtros button.activo {
  background: #42b983;
  color: white;
  font-weight: 600;
}

/* Lista de tareas */
.lista-tareas {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-tareas li {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin: 10px 0;
  background: #ffffff;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-left: 4px solid #42b983;
}

.lista-tareas li:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.lista-tareas li.completada {
  opacity: 0.8;
  border-left-color: #95a5a6;
}

.lista-tareas li.completada span {
  text-decoration: line-through;
  color: #7f8c8d;
}

.lista-tareas input[type="checkbox"] {
  margin-right: 12px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.lista-tareas span {
  flex: 1;
  margin: 0 15px;
  cursor: pointer;
  word-break: break-word;
  padding: 5px 0;
}

/* Botones de acción */
.acciones-tarea {
  display: flex;
  gap: 8px;
}

.btn-eliminar {
  background-color: #e74c3c !important;
  padding: 6px 10px !important;
  border-radius: 4px;
}

.btn-eliminar:hover {
  background-color: #c0392b !important;
}

.btn-editar {
  background-color: #3498db !important;
  padding: 6px 10px !important;
  border-radius: 4px;
}

.btn-editar:hover {
  background-color: #2980b9 !important;
}

/* Contadores */
.contadores {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.95rem;
  flex-wrap: wrap;
  gap: 10px;
}

.contadores p {
  margin: 0;
  padding: 5px 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  min-width: 120px;
  text-align: center;
}

/* Mensaje sin tareas */
.sin-tareas {
  color: #7f8c8d;
  font-style: italic;
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 6px;
  margin: 2rem 0;
}

/* Input de edición */
.input-edicion {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #42b983;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 10px;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

/* Efecto para el modo edición */
[contenteditable="true"],
input[type="text"]:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .form-group {
    flex-direction: column;
  }
  
  button, input[type="text"] {
    width: 100%;
  }
  
  .contadores {
    flex-direction: column;
    gap: 10px;
  }
  
  .contadores p {
    width: 100%;
    box-sizing: border-box;
  }
  
  .lista-tareas li {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .acciones-tarea {
    margin-left: auto;
  }
}
```

### Cómo usar la aplicación

1. **Agregar tareas**: Escribe en el campo de texto y presiona Enter o haz clic en "Agregar".
2. **Marcar como completada**: Usa el checkbox al lado de cada tarea.
3. **Editar tarea**: Haz doble clic en el texto de la tarea o haz clic en el botón de editar (✏️).
4. **Eliminar tarea**: Haz clic en el botón de eliminar (🗑️).
5. **Filtrar tareas**: Usa los botones de filtro para ver todas las tareas, solo las pendientes o solo las completadas.

### Características implementadas

- **Persistencia de datos**: Las tareas se guardan automáticamente en el localStorage del navegador.
- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla.
- **Interfaz intuitiva**: Retroalimentación visual al interactuar con los elementos.
- **Accesibilidad**: Controles accesibles y fáciles de usar.

### Posibles mejoras

1. **Validación de entrada**: Evitar tareas duplicadas o vacías.
2. **Categorías de tareas**: Agrupar tareas por categorías.
3. **Fechas de vencimiento**: Añadir fechas límite a las tareas.
4. **Búsqueda**: Añadir un campo de búsqueda para encontrar tareas específicas.
5. **Ordenamiento**: Permitir ordenar las tareas por diferentes criterios (fecha, completadas, etc.).

¡Ahora tienes una aplicación de lista de tareas completa y funcional construida con Vue 3 y la Composition API! Puedes personalizar los estilos y agregar más funcionalidades según tus necesidades.

## Siguiente paso

En la siguiente sección, exploraremos las propiedades computadas en Vue, que nos permiten realizar cálculos complejos sobre nuestros datos reactivos de manera eficiente.

[Siguiente: Propiedades Computadas →](propiedades-computadas.md)
