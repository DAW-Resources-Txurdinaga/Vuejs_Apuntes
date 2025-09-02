# 3.2 Comunicación entre Componentes

En aplicaciones Vue, los componentes necesitan comunicarse entre sí. Aquí veremos los diferentes patrones de comunicación.

## 1. Props (Padre → Hijo)

Los props permiten pasar datos de un componente padre a un componente hijo.

**Componente Padre (ParentComponent.vue):**
```vue
<template>
  <div>
    <h1>Lista de Tareas</h1>
    <task-list :tareas="tareas" @tarea-completada="marcarComoCompletada" />
  </div>
</template>

<script>
import { ref } from 'vue';
import TaskList from './TaskList.vue';

export default {
  components: { TaskList },
  setup() {
    const tareas = ref([
      { id: 1, texto: 'Aprender Vue', completada: false },
      { id: 2, texto: 'Hacer la compra', completada: true },
      { id: 3, texto: 'Hacer ejercicio', completada: false }
    ]);

    function marcarComoCompletada(id) {
      const tarea = tareas.value.find(t => t.id === id);
      if (tarea) {
        tarea.completada = !tarea.completada;
      }
    }

    return { tareas, marcarComoCompletada };
  }
};
</script>
```

**Componente Hijo (TaskList.vue):**
```vue
<template>
  <ul>
    <li v-for="tarea in tareas" :key="tarea.id" 
        :class="{ 'completada': tarea.completada }"
        @click="toggleTarea(tarea.id)">
      {{ tarea.texto }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tareas: {
      type: Array,
      required: true
    }
  },
  emits: ['tarea-completada'],
  setup(props, { emit }) {
    function toggleTarea(id) {
      emit('tarea-completada', id);
    }

    return { toggleTarea };
  }
};
</script>

<style scoped>
.completada {
  text-decoration: line-through;
  opacity: 0.7;
}
</style>
```

## 2. Eventos Personalizados (Hijo → Padre)

Los eventos personalizados permiten que los componentes hijos se comuniquen con sus padres.

## 3. Provide/Inject (Comunicación Profunda)

Útil para pasar datos a componentes profundamente anidados sin usar props en cada nivel.

**Componente Ancestro (App.vue):**
```vue
<template>
  <div>
    <h1>Aplicación de Tareas</h1>
    <task-manager />
  </div>
</template>

<script>
import { provide, ref } from 'vue';
import TaskManager from './TaskManager.vue';

export default {
  components: { TaskManager },
  setup() {
    const tareas = ref([]);
    
    function agregarTarea(texto) {
      tareas.value.push({
        id: Date.now(),
        texto,
        completada: false
      });
    }
    
    // Proveer datos a componentes descendientes
    provide('tareas', tareas);
    provide('agregarTarea', agregarTarea);
    
    return { tareas };
  }
};
</script>
```

**Componente Descendiente (TaskList.vue):**
```vue
<template>
  <div>
    <ul>
      <task-item 
        v-for="tarea in tareas" 
        :key="tarea.id" 
        :tarea="tarea"
      />
    </ul>
  </div>
</template>

<script>
import { inject } from 'vue';
import TaskItem from './TaskItem.vue';

export default {
  components: { TaskItem },
  setup() {
    const tareas = inject('tareas');
    return { tareas };
  }
};
</script>
```

## 4. Comunicación entre Componentes Hermanos

### Usando un Event Bus (Patrón de diseño)

```javascript
// eventBus.js
import { createApp } from 'vue';
export const eventBus = createApp({});
```

**Componente Emisor:**
```vue
<template>
  <button @click="enviarMensaje">Enviar Mensaje</button>
</template>

<script>
import { eventBus } from '../eventBus';

export default {
  setup() {
    function enviarMensaje() {
      eventBus.config.globalProperties.$emit('mensaje', '¡Hola desde el componente emisor!');
    }
    
    return { enviarMensaje };
  }
};
</script>
```

**Componente Receptor:**
```vue
<template>
  <div>
    <p>Mensaje recibido: {{ mensaje }}</p>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { eventBus } from '../eventBus';

export default {
  setup() {
    const mensaje = ref('');
    
    function actualizarMensaje(msg) {
      mensaje.value = msg;
    }
    
    onMounted(() => {
      eventBus.config.globalProperties.$on('mensaje', actualizarMensaje);
    });
    
    onUnmounted(() => {
      eventBus.config.globalProperties.$off('mensaje', actualizarMensaje);
    });
    
    return { mensaje };
  }
};
</script>

## Ejercicio Práctico: Aplicación de Tareas con Comunicación entre Componentes

Crea una aplicación de tareas con los siguientes componentes, utilizando solo props y eventos personalizados para la comunicación:

### Estructura de Componentes:
```
TodoApp (padre)
├── AddTodo (hijo)
├── TodoFilter (hijo)
└── TodoList (hijo)
    └── TodoItem (nieto)
```

### TodoApp.vue (Componente Principal)

```vue
<template>
  <div class="todo-app">
    <h1>Lista de Tareas</h1>
    <add-todo @add-todo="addTodo" />
    <todo-filter :filter="currentFilter" @update:filter="setFilter" />
    <todo-list 
      :todos="filteredTodos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo" 
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import AddTodo from './AddTodo.vue';
import TodoList from './TodoList.vue';
import TodoFilter from './TodoFilter.vue';

export default {
  components: { AddTodo, TodoList, TodoFilter },
  setup() {
    const todos = ref([
      { id: 1, text: 'Aprender Vue', completed: false },
      { id: 2, text: 'Hacer la compra', completed: true },
      { id: 3, text: 'Hacer ejercicio', completed: false }
    ]);
    
    const currentFilter = ref('all');
    
    const filteredTodos = computed(() => {
      switch (currentFilter.value) {
        case 'active':
          return todos.value.filter(todo => !todo.completed);
        case 'completed':
          return todos.value.filter(todo => todo.completed);
        default:
          return todos.value;
      }
    });
    
    function addTodo(text) {
      todos.value.push({
        id: Date.now(),
        text,
        completed: false
      });
    }
    
    function toggleTodo(id) {
      const todo = todos.value.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
    
    function deleteTodo(id) {
      todos.value = todos.value.filter(todo => todo.id !== id);
    }
    
    function setFilter(filter) {
      currentFilter.value = filter;
    }
    
    return {
      filteredTodos,
      currentFilter,
      addTodo,
      toggleTodo,
      deleteTodo,
      setFilter
    };
  }
};
</script>
```

### AddTodo.vue

```vue
<template>
  <form @submit.prevent="handleSubmit" class="add-todo">
    <input 
      type="text" 
      v-model="newTodo" 
      placeholder="Nueva tarea..."
      required
    >
    <button type="submit">Agregar</button>
  </form>
</template>

<script>
export default {
  emits: ['add-todo'],
  setup(props, { emit }) {
    const newTodo = ref('');
    
    function handleSubmit() {
      emit('add-todo', newTodo.value);
      newTodo.value = '';
    }
    
    return {
      newTodo,
      handleSubmit
    };
  }
};
</script>
```

### TodoList.vue

```vue
<template>
  <ul class="todo-list">
    <todo-item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle-todo', todo.id)"
      @delete="$emit('delete-todo', todo.id)"
    />
  </ul>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoItem },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-todo', 'delete-todo']
};
</script>
```

### TodoItem.vue

```vue
<template>
  <li class="todo-item">
    <input 
      type="checkbox" 
      :checked="todo.completed"
      @change="$emit('toggle')"
    >
    <span :class="{ 'completed': todo.completed }">
      {{ todo.text }}
    </span>
    <button @click="$emit('delete')" class="delete-btn">×</button>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle', 'delete']
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.7;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.delete-btn {
  margin-left: auto;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
```

### TodoFilter.vue

```vue
<template>
  <div class="todo-filter">
    <button 
      v-for="option in options" 
      :key="option.value"
      @click="$emit('update:filter', option.value)"
      :class="{ active: option.value === modelValue }"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:filter'],
  setup() {
    const options = [
      { value: 'all', label: 'Todas' },
      { value: 'active', label: 'Pendientes' },
      { value: 'completed', label: 'Completadas' }
    ];
    
    return { options };
  }
};
</script>

<style scoped>
.todo-filter {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}
</style>
```

## Preguntas de Repaso

1. ¿Cómo se pasan los datos de un componente padre a un componente hijo?
2. ¿Cómo puede un componente hijo comunicarse con su componente padre?
3. ¿Qué es el "prop drilling" y cómo podrías evitarlo en una aplicación más grande?
4. ¿Cuándo sería apropiado usar provide/inject en lugar de pasar props?

## Siguiente paso

Ahora que has aprendido los diferentes métodos de comunicación entre componentes en Vue, es momento de explorar cómo implementar la navegación entre diferentes vistas en tu aplicación.

[→ Siguiente: Enrutamiento en Vue](../routing/introduccion.md)
