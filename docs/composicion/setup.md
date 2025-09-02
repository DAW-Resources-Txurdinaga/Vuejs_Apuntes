# 🛠️ La función `setup()` en Vue 3

La función `setup()` es el punto de entrada para la Composition API en Vue 3. Es donde declaras las propiedades reactivas, métodos computados, observadores y hooks del ciclo de vida de tu componente.

## Conceptos Básicos

### Estructura Básica

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Contador: {{ count }}</p>
    <button @click="increment">Incrementar</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  // La función setup() se ejecuta antes de que el componente sea creado
  // No tienes acceso a `this` aquí
  setup() {
    // Estado reactivo
    const count = ref(0)
    const title = ref('Mi Componente')

    // Métodos
    function increment() {
      count.value++
    }


    // Todo lo que devuelvas estará disponible en la plantilla
    return {
      title,
      count,
      increment
    }
  }
}
</script>
```

## Acceso a `props` y `context`

La función `setup` recibe dos argumentos:

1. `props`: Las propiedades del componente (reactivas)
2. `context`: Contiene attrs, slots y emit

```vue
<template>
  <div>
    <h1>{{ greeting }}, {{ user.name }}!</h1>
    <slot></slot>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  
  setup(props, context) {
    // Usar toRefs para mantener la reactividad al desestructurar props
    const { user } = toRefs(props)
    
    // Acceder a slots
    const slots = context.slots
    
    // Acceder a atributos no declarados
    const attrs = context.attrs
    
    // Método para emitir eventos
    const emit = context.emit
    
    const greeting = ref('Hola')
    
    // Expuesto al template
    return {
      greeting,
      user
    }
  }
}
</script>
```

## `<script setup>` - Sintaxis más concisa

Vue 3.2+ introduce la sintaxis `<script setup>`, que es azúcar sintáctico para usar la Composition API de manera más concisa:

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Contador: {{ count }}</p>
    <button @click="increment">Incrementar</button>
    <p>Doble: {{ doubleCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estado reactivo
const count = ref(0)
const title = ref('Mi Componente con <script setup>')

// Propiedad computada
const doubleCount = computed(() => count.value * 2)


// Método
function increment() {
  count.value++
}

// Hook del ciclo de vida
onMounted(() => {
  console.log('Componente montado')
})

// Todo lo declarado en el ámbito superior está disponible en la plantilla
// No es necesario usar return
</script>
```

## Definición de props y emits

Con `<script setup>`, usa `defineProps` y `defineEmits`:

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="notify">Notificar</button>
  </div>
</template>

<script setup>
// Definir props
const props = defineProps({
  title: {
    type: String,
    default: 'Título predeterminado'
  },
  message: {
    type: String,
    required: true
  }
})

// Definir eventos que el componente puede emitir
const emit = defineEmits(['notify', 'update'])


function notify() {
  // Emitir evento con datos
  emit('notify', { message: '¡Notificación!' })
  
  // También puedes emitir sin datos
  emit('update')
}
</script>
```

## Acceso a la instancia del componente

En algunos casos raros, podrías necesitar acceder a la instancia del componente. Puedes hacerlo con `getCurrentInstance`:

```vue
<script setup>
import { getCurrentInstance, onMounted } from 'vue'

// Obtener la instancia del componente actual
const instance = getCurrentInstance()

onMounted(() => {
  // Acceder al contexto
  console.log(instance.proxy.$el) // Elemento raíz del componente
  console.log(instance.ctx) // Contexto de renderizado
})
</script>
```

## Ejemplo Práctico: Formulario de Tareas

```vue
<template>
  <div class="task-form">
    <h2>Añadir Nueva Tarea</h2>
    <form @submit.prevent="addTask">
      <div class="form-group">
        <label for="task-title">Título:</label>
        <input 
          id="task-title" 
          v-model="newTask.title" 
          required
          placeholder="Título de la tarea"
        >
      </div>
      
      <div class="form-group">
        <label for="task-description">Descripción:</label>
        <textarea 
          id="task-description" 
          v-model="newTask.description"
          placeholder="Descripción detallada..."
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="newTask.completed">
          Completada
        </label>
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Guardando...' : 'Guardar Tarea' }}
        </button>
        <button type="button" @click="resetForm" class="secondary">
          Limpiar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Estado del formulario
const newTask = reactive({
  title: '',
  description: '',
  completed: false,
  priority: 'medium'
})

// Estado de envío
const isSubmitting = ref(false)


// Propiedad computada para validación
const isFormValid = computed(() => {
  return newTask.title.trim().length > 0
})

// Método para limpiar el formulario
function resetForm() {
  newTask.title = ''
  newTask.description = ''
  newTask.completed = false
  newTask.priority = 'medium'
}

// Método para enviar el formulario
function addTask() {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  // Simular una llamada a una API
  setTimeout(() => {
    // Emitir evento con la nueva tarea
    emit('task-added', { ...newTask, id: Date.now() })
    
    // Resetear el formulario
    resetForm()
    isSubmitting.value = false
    
    // Mostrar notificación
    alert('¡Tarea agregada correctamente!')
  }, 1000)
}

// Definir eventos que emite el componente
const emit = defineEmits(['task-added'])
</script>

<style scoped>
.task-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"] {
  background-color: #42b983;
  color: white;
}

button[type="submit"]:hover {
  background-color: #3aa876;
}

button[type="submit"]:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

button.secondary {
  background-color: #f0f0f0;
  color: #333;
}

button.secondary:hover {
  background-color: #e0e0e0;
}

/* Estilos para la prioridad */
.priority-selector {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.priority-option {
  flex: 1;
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.priority-option:hover {
  background-color: #f5f5f5;
}

.priority-option input[type="radio"] {
  display: none;
}

.priority-option input[type="radio"]:checked + span {
  font-weight: bold;
  color: #42b983;
}
</style>
```

## Próximos pasos

Ahora que has aprendido sobre la función `setup()` y la sintaxis `<script setup>`, estás listo para profundizar en los detalles de la reactividad en Vue 3 con `ref` y `reactive`.

[👉 Siguiente: Ref y Reactive](../composicion/ref-reactive.md)
