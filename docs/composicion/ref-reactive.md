# 🔄 `ref` y `reactive` en Vue 3

En Vue 3, `ref` y `reactive` son las dos funciones principales para crear datos reactivos. Ambas permiten rastrear cambios en los datos y actualizar la interfaz de usuario de manera reactiva, pero tienen diferencias clave en su uso y comportamiento.

## `ref` - Referencia Reactiva

`ref` crea una referencia reactiva a un valor. Es útil para valores primitivos (números, strings, booleanos) u objetos.

### Uso Básico

```javascript
import { ref } from 'vue'

// Crear una referencia reactiva
const count = ref(0)
const name = ref('Juan')

// Acceder al valor
console.log(count.value) // 0
console.log(name.value)  // 'Juan'

// Modificar el valor
count.value++
name.value = 'Carlos'
```

### En Plantillas

En las plantillas, Vue desempaqueta automáticamente las referencias, por lo que no necesitas usar `.value`:

```vue
<template>
  <div>
    <p>Contador: {{ count }}</p>
    <button @click="increment">Incrementar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>
```

## `reactive` - Objeto Reactivo

`reactive` crea un objeto reactivo. A diferencia de `ref`, no es necesario usar `.value` para acceder a sus propiedades.

### Uso Básico

```javascript
import { reactive } from 'vue'

// Crear un objeto reactivo
const state = reactive({
  count: 0,
  name: 'Juan',
  todos: []
})

// Acceder a las propiedades
console.log(state.count) // 0
console.log(state.name)  // 'Juan'


// Modificar las propiedades
state.count++
state.name = 'Carlos'
state.todos.push({ id: 1, text: 'Aprender Vue 3' })
```

### En Plantillas

```vue
<template>
  <div>
    <p>Contador: {{ state.count }}</p>
    <p>Nombre: {{ state.name }}</p>
    <ul>
      <li v-for="todo in state.todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
    <button @click="increment">Incrementar</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Juan',
  todos: []
})

function increment() {
  state.count++
  state.todos.push({ id: Date.now(), text: `Tarea ${state.count}` })
}
</script>
```

## `ref` vs `reactive` - ¿Cuándo usar cada uno?

### Usa `ref` cuando:
- Necesitas una variable reactiva simple (números, strings, booleanos)
- Necesitas reasignar valores completamente (como reemplazar un objeto entero)
- Estás trabajando con valores primitivos
- Necesitas pasar la referencia a través de la composición de funciones

### Usa `reactive` cuando:
- Tienes un grupo lógico de propiedades que siempre se usan juntas
- Estás trabajando con un objeto que no cambiará su referencia
- Prefieres la sintaxis sin `.value`

## Convertir entre `ref` y `reactive`

### `reactive` a `ref`

```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'Juan'
})

// Convertir propiedades reactivas a refs individuales
const { count, name } = toRefs(state)

// Ahora count y name son refs que están sincronizados con state
```

### `ref` a `reactive`

```javascript
import { ref, reactive } from 'vue'

const count = ref(0)
const name = ref('Juan')

// Crear un objeto reactivo a partir de refs
const state = reactive({
  count,
  name
})

// Los cambios en state.count actualizarán count.value y viceversa
```

## Desestructuración Reactiva

Cuando desestructuras un objeto reactivo, pierdes la reactividad. Para mantenerla, usa `toRefs` o `toRef`:

```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'Juan'
})

// ❌ Mal - pierde reactividad
const { count, name } = state

// ✅ Bien - mantiene la reactividad
const { count, name } = toRefs(state)


// O para una sola propiedad
const count = toRef(state, 'count')
```

## Ejemplo Práctico: Lista de Tareas

```vue
<template>
  <div class="todo-app">
    <h1>Lista de Tareas</h1>
    
    <!-- Formulario para añadir tareas -->
    <div class="add-todo">
      <input 
        v-model="newTodoText" 
        @keyup.enter="addTodo" 
        placeholder="Nueva tarea..."
      >
      <button @click="addTodo">Añadir</button>
    </div>
    
    <!-- Filtros -->
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter"
        :class="{ active: currentFilter === filter }"
        @click="currentFilter = filter"
      >
        {{ filter }}
      </button>
    </div>
    
    <!-- Lista de tareas -->
    <ul class="todo-list">
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
        >
        <span class="todo-text">{{ todo.text }}</span>
        <button 
          class="delete-btn" 
          @click="removeTodo(todo.id)"
        >
          Eliminar
        </button>
      </li>
    </ul>
    
    <!-- Contador de tareas -->
    <div class="todo-stats">
      <span>{{ activeTodosCount }} tareas pendientes</span>
      <button 
        v-if="hasCompletedTodos" 
        @click="clearCompleted"
        class="clear-btn"
      >
        Limpiar completadas
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Estado reactivo con reactive (objeto)
const todoState = reactive({
  todos: [],
  filters: ['Todas', 'Activas', 'Completadas'],
  currentFilter: 'Todas'
})

// Ref para el input de nueva tarea
const newTodoText = ref('')


// Propiedades computadas
const filteredTodos = computed(() => {
  switch (todoState.currentFilter) {
    case 'Activas':
      return todoState.todos.filter(todo => !todo.completed)
    case 'Completadas':
      return todoState.todos.filter(todo => todo.completed)
    default:
      return todoState.todos
  }
})

const activeTodosCount = computed(() => 
  todoState.todos.filter(todo => !todo.completed).length
)

const hasCompletedTodos = computed(() => 
  todoState.todos.some(todo => todo.completed)
)

// Métodos
function addTodo() {
  if (newTodoText.value.trim()) {
    todoState.todos.push({
      id: Date.now(),
      text: newTodoText.value.trim(),
      completed: false,
      createdAt: new Date()
    })
    newTodoText.value = ''
  }
}

function removeTodo(id) {
  const index = todoState.todos.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todoState.todos.splice(index, 1)
  }
}

function clearCompleted() {
  todoState.todos = todoState.todos.filter(todo => !todo.completed)
}

// Cargar tareas guardadas al montar el componente
onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todoState.todos = JSON.parse(savedTodos)
  }
})

// Guardar tareas cuando cambian
watch(() => [...todoState.todos], (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })
</script>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3aa876;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filters button {
  background-color: #f0f0f0;
  color: #333;
}

.filters button.active {
  background-color: #42b983;
  color: white;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  border: 1px solid #eee;
  margin-bottom: 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.todo-list li:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.todo-list li.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.todo-text {
  flex: 1;
  margin: 0 10px;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #ff5252;
}

.todo-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 14px;
}

.clear-btn {
  background-color: #f0f0f0;
  color: #666;
  padding: 5px 10px;
  font-size: 12px;
}

.clear-btn:hover {
  background-color: #e0e0e0;
}
</style>
```

## Próximos pasos

Ahora que has aprendido sobre `ref` y `reactive`, estás listo para explorar las propiedades computadas y los observadores en Vue 3.

[👉 Siguiente: Computed y Watch](./computed-watch.md)
