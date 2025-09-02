# 🔄 Ciclo de Vida en Vue 3

El ciclo de vida de un componente Vue 3 describe todos los eventos que ocurren desde su creación hasta su destrucción. Comprender estos eventos es crucial para ejecutar código en el momento adecuado, como realizar peticiones a una API, limpiar suscripciones o manipular el DOM.

## Tabla de Hooks del Ciclo de Vida

| Hook de la Composition API | Hook de Options API | Descripción |
|---------------------------|-------------------|-------------|
| `onBeforeMount` | `beforeMount` | Se ejecuta antes de que el componente se monte en el DOM |
| `onMounted` | `mounted` | Se ejecuta después de que el componente se ha montado |
| `onBeforeUpdate` | `beforeUpdate` | Se ejecuta cuando los datos cambian, antes de que el componente se actualice |
| `onUpdated` | `updated` | Se ejecuta después de que el componente se ha actualizado |
| `onBeforeUnmount` | `beforeUnmount` | Se ejecuta antes de que el componente se desmonte |
| `onUnmounted` | `unmounted` | Se ejecuta después de que el componente se ha desmontado |
| `onErrorCaptured` | `errorCaptured` | Se ejecuta cuando se captura un error en cualquier componente hijo |
| `onActivated` | `activated` | Se ejecuta cuando un componente dentro de `<keep-alive>` se activa |
| `onDeactivated` | `deactivated` | Se ejecuta cuando un componente dentro de `<keep-alive>` se desactiva |
| `onRenderTracked` | - | Se ejecuta cuando una dependencia reactiva es rastreada |
| `onRenderTriggered` | - | Se ejecuta cuando una dependencia reactiva desencadena una nueva renderización |
| `onServerPrefetch` | `serverPrefetch` | Específico para SSR, se ejecuta durante la renderización del lado del servidor |

## Uso Básico con Composition API

```vue
<template>
  <div class="lifecycle-demo">
    <h2>Demo del Ciclo de Vida</h2>
    <p>Contador: {{ count }}</p>
    <button @click="increment">Incrementar</button>
    <div ref="messageEl" class="message">Mensaje inicial</div>
    
    <div v-if="showChild">
      <ChildComponent :count="count" />
    </div>
    <button @click="toggleChild">
      {{ showChild ? 'Ocultar' : 'Mostrar' }} componente hijo
    </button>
  </div>
</template>

<script setup>
import { 
  ref, 
  onBeforeMount, 
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'
import ChildComponent from './ChildComponent.vue'

// Estado reactivo
const count = ref(0)
const messageEl = ref(null)
const showChild = ref(true)
const error = ref(null)

// Métodos
function increment() {
  count.value++
  
  // Simular un error cuando el contador llega a 5
  if (count.value === 5) {
    try {
      // Esto lanzará un error que será capturado por errorCaptured
      nonExistentFunction()
    } catch (e) {
      error.value = e.message
    }
  }
}

function toggleChild() {
  showChild.value = !showChild.value
}

// Hooks del ciclo de vida
onBeforeMount(() => {
  console.log('1. onBeforeMount')
  // El componente está a punto de montarse
  // El DOM aún no está disponible
  console.log('Elemento del mensaje:', messageEl.value) // null
})

onMounted(() => {
  console.log('2. onMounted')
  // El componente está montado
  // El DOM está disponible
  console.log('Elemento del mensaje:', messageEl.value) // <div>Mensaje inicial</div>
  
  // Ejemplo: Configurar un temporizador
  const timer = setInterval(() => {
    console.log('Temporizador activo')
  }, 1000)
  
  // Limpieza en onUnmounted
  onUnmounted(() => {
    console.log('Limpieza del temporizador')
    clearInterval(timer)
  })
})

onBeforeUpdate(() => {
  console.log('3. onBeforeUpdate')
  // Se ejecuta cuando los datos reactivos cambian,
  // antes de que el componente se vuelva a renderizar
  console.log('Contador a punto de actualizarse a:', count.value)
})

onUpdated(() => {
  console.log('4. onUpdated')
  // Se ejecuta después de que el componente se ha actualizado
  // y el DOM se ha vuelto a renderizar
  console.log('Contador actualizado a:', count.value)
  
  // Puedes acceder al DOM actualizado aquí
  if (messageEl.value) {
    messageEl.value.textContent = `El contador es ${count.value}`
  }
})

onBeforeUnmount(() => {
  console.log('5. onBeforeUnmount')
  // El componente está a punto de desmontarse
  // Aún está completamente funcional
})

onUnmounted(() => {
  console.log('6. onUnmounted')
  // El componente se ha desmontado
  // Todas las directivas están desvinculadas
  // Los listeners de eventos son eliminados
  // Las instancias de componentes hijos también están desmontadas
})

onErrorCaptured((err, instance, info) => {
  console.error('Error capturado:', err)
  console.log('Instancia del componente:', instance)
  console.log('Información del error:', info)
  
  // Podemos mostrar un mensaje de error en la interfaz
  error.value = `Error: ${err.message}`
  
  // Si retornamos false, el error no se propagará
  return true
})

// Hooks de depuración (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  onRenderTracked((event) => {
    console.log('Dependencia rastreada:', event)
  })
  
  onRenderTriggered((event) => {
    console.log('Dependencia que desencadenó la actualización:', event)
  })
}
</script>

<style scoped>
.lifecycle-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3aa876;
}

.message {
  margin: 15px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-left: 4px solid #42b983;
  font-family: monospace;
}

.error {
  color: #e74c3c;
  background-color: #fde8e7;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  border-left: 4px solid #e74c3c;
}
</style>
```

## Explicación de los Hooks Principales

### 1. `onBeforeMount` y `onMounted`

- **`onBeforeMount`**: Se ejecuta después de que el componente ha sido inicializado pero antes de que se monte en el DOM. Es útil para realizar configuraciones iniciales que no requieran acceso al DOM.

- **`onMounted`**: Se ejecuta después de que el componente se ha montado en el DOM. Es el lugar ideal para realizar peticiones a APIs, configurar suscripciones o interactuar con el DOM.

### 2. `onBeforeUpdate` y `onUpdated`

- **`onBeforeUpdate`**: Se ejecuta cuando los datos reactivos cambian, pero antes de que el componente se vuelva a renderizar. Útil para acceder al estado anterior del DOM.

- **`onUpdated`**: Se ejecuta después de que el componente se ha actualizado y el DOM se ha vuelto a renderizar. Ten cuidado con las modificaciones al estado aquí para evitar bucles infinitos.

### 3. `onBeforeUnmount` y `onUnmounted`

- **`onBeforeUnmount`**: Se ejecuta justo antes de que el componente se desmonte. El componente sigue estando completamente funcional.

- **`onUnmounted`**: Se ejecuta después de que el componente se ha desmontado. Es el lugar ideal para limpiar temporizadores, cancelar peticiones o eliminar listeners de eventos globales.

### 4. `onErrorCaptured`

Captura errores de cualquier componente hijo. Puedes usarlo para mostrar una interfaz de error o registrar el error en un servicio de monitoreo.

## Ejemplo con Componente Hijo

```vue
<!-- ChildComponent.vue -->
<template>
  <div class="child-component">
    <h3>Componente Hijo</h3>
    <p>Contador del padre: {{ props.count }}</p>
    <p>Contador local: {{ localCount }}</p>
    <button @click="increment">Incrementar Local</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    required: true
  }
})


const localCount = ref(0)


function increment() {
  localCount.value++
}

onMounted(() => {
  console.log('Componente Hijo: Montado')
  
  // Ejemplo de suscripción a un evento global
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  console.log('Componente Hijo: Desmontado')
  // Importante: Limpiar el event listener
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  console.log('Ventana redimensionada')
}
</script>

<style scoped>
.child-component {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f9f9f9;
}

h3 {
  margin-top: 0;
  color: #42b983;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

button:hover {
  background-color: #2980b9;
}
</style>
```

## Buenas Prácticas

1. **Limpieza de recursos**: Siempre limpia los temporizadores, suscripciones y event listeners en `onUnmounted`.

2. **Evita efectos secundarios en el renderizado**: No realices operaciones costosas o con efectos secundarios durante el renderizado. Usa `onMounted` o `onUpdated` en su lugar.

3. **Manejo de errores**: Usa `onErrorCaptured` para manejar errores de manera elegante.

4. **Evita actualizaciones en `onUpdated`**: Ten cuidado al modificar el estado en `onUpdated` para evitar bucles infinitos.

5. **Uso de `nextTick`**: Si necesitas esperar al siguiente ciclo de actualización del DOM, usa `nextTick`.

## Conclusión

El ciclo de vida de los componentes es fundamental para entender cuándo y cómo interactuar con el DOM, realizar peticiones asíncronas y limpiar recursos. La Composition API de Vue 3 proporciona una forma más modular y organizada de trabajar con estos hooks en comparación con la Options API.

Recuerda que un uso correcto de estos hooks puede mejorar significativamente el rendimiento y la estabilidad de tu aplicación.
