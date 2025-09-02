# 🔍 Propiedades Computadas y Observadores en Vue 3

En la Composition API de Vue 3, las propiedades computadas y los observadores son herramientas poderosas para manejar la lógica reactiva de manera eficiente.

## Propiedades Computadas (`computed`)

Las propiedades computadas son valores que se calculan automáticamente en función de otros datos reactivos. Se almacenan en caché y solo se vuelven a calcular cuando sus dependencias cambian.

### Uso Básico

```vue
<template>
  <div>
    <input v-model="firstName" placeholder="Nombre">
    <input v-model="lastName" placeholder="Apellido">
    <p>Nombre completo: {{ fullName }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')

// Propiedad computada
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`.trim()
})
</script>
```

### Propiedades Computadas con Setter

Las propiedades computadas pueden tener un setter para permitir la modificación:

```javascript
const fullName = computed({
  // Getter
  get() {
    return `${firstName.value} ${lastName.value}`.trim()
  },
  // Setter
  set(newValue) {
    const names = newValue.split(' ')
    firstName.value = names[0] || ''
    lastName.value = names[1] || ''
  }
})

// Ahora puedes hacer:
// fullName.value = 'Ana García'
```

## Watchers (`watch` y `watchEffect`)

### `watch`

Observa fuentes de datos específicas y ejecuta una función cuando cambian.

```vue
<template>
  <div>
    <input v-model="searchQuery" placeholder="Buscar...">
    <p>Resultados de búsqueda: {{ searchResults.length }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const searchResults = ref([])

// Observar cambios en searchQuery
watch(searchQuery, async (newQuery, oldQuery) => {
  if (newQuery === '') {
    searchResults.value = []
    return
  }
  
  try {
    // Simular una llamada a una API
    const response = await fetch(`/api/search?q=${encodeURIComponent(newQuery)}`)
    const data = await response.json()
    searchResults.value = data.results
  } catch (error) {
    console.error('Error en la búsqueda:', error)
    searchResults.value = []
  }
}, { immediate: true }) // Ejecutar inmediatamente al montar
</script>
```

### `watchEffect`

Ejecuta una función que rastrea automáticamente sus dependencias reactivas.

```vue
<template>
  <div>
    <p>Posición del ratón: ({{ x }}, {{ y }})</p>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function updateMousePosition(event) {
  x.value = event.pageX
  y.value = event.pageY
}

// watchEffect se ejecuta inmediatamente y rastrea sus dependencias
const stopWatch = watchEffect(() => {
  console.log(`Posición actual: (${x.value}, ${y.value})`)
  
  // Limpieza: se ejecutará antes de la próxima ejecución o cuando se detenga
  return () => {
    console.log('Limpieza del efecto')
  }
})

// Agregar y limpiar el event listener
onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
  stopWatch() // Detener el watcher cuando el componente se desmonte
})
</script>
```

## Comparación: `watch` vs `watchEffect`

| Característica | `watch` | `watchEffect` |
|---------------|---------|---------------|
| **Ejecución inicial** | Solo con `{ immediate: true }` | Siempre se ejecuta inmediatamente |
| **Dependencias** | Especificadas explícitamente | Detectadas automáticamente |
| **Acceso al valor anterior** | Sí | No |
| **Rendimiento** | Mejor para observar fuentes específicas | Mejor para efectos con múltiples dependencias |
| **Uso típico** | Cuando necesitas reaccionar a cambios específicos | Para efectos secundarios que dependen de múltiples fuentes |

## Ejemplo Avanzado: Búsqueda con Debounce

```vue
<template>
  <div class="search-container">
    <h2>Buscador de Usuarios</h2>
    <input 
      v-model="searchQuery" 
      placeholder="Buscar usuarios..."
      class="search-input"
    >
    
    <div v-if="isLoading" class="loading">Buscando...</div>
    
    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>
    
    <div v-else-if="users.length === 0" class="no-results">
      No se encontraron resultados para "{{ lastQuery }}"
    </div>
    
    <ul v-else class="user-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        <img :src="user.avatar" :alt="user.name" class="avatar">
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p>@{{ user.username }}</p>
          <p>{{ user.email }}</p>
        </div>
      </li>
    </ul>
    
    <div v-if="users.length > 0" class="stats">
      Mostrando {{ users.length }} de {{ totalUsers }} resultados
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

// Estado reactivo
const searchQuery = ref('')
const users = ref([])
const isLoading = ref(false)
const error = ref(null)
const lastQuery = ref('')
const totalUsers = ref(0)

// Computed para determinar si mostrar el mensaje de búsqueda vacía
const showEmptySearch = computed(() => {
  return !isLoading.value && !error.value && lastQuery.value === ''
})

// Función para buscar usuarios (simulando una API)
async function fetchUsers(query) {
  if (!query.trim()) {
    users.value = []
    totalUsers.value = 0
    return
  }
  
  isLoading.value = true
  error.value = null
  lastQuery.value = query
  
  try {
    // En un caso real, esto sería una llamada a tu API
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(query)}`)
    
    if (!response.ok) {
      throw new Error('Error al buscar usuarios')
    }
    
    const data = await response.json()
    
    // Simular un retraso de red
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Formatear los datos
    users.value = data.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      // Usar una imagen de marcador de posición
      avatar: `https://i.pravatar.cc/50?u=${user.email}`
    }))
    
    totalUsers.value = users.value.length
  } catch (err) {
    console.error('Error al buscar usuarios:', err)
    error.value = 'No se pudo cargar la búsqueda. Inténtalo de nuevo.'
    users.value = []
  } finally {
    isLoading.value = false
  }
}

// Debounce para evitar múltiples llamadas a la API
let timeoutId = null

watch(searchQuery, (newQuery) => {
  // Cancelar el timeout anterior
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  // Establecer un nuevo timeout
  timeoutId = setTimeout(() => {
    fetchUsers(newQuery)
  }, 300) // Esperar 300ms después de que el usuario deje de escribir
})

// Limpiar el timeout cuando el componente se desmonte
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.loading, .no-results, .error {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 20px;
}

.error {
  color: #e74c3c;
  background-color: #fde8e7;
  border: 1px solid #f5c6cb;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.user-info h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.user-info p {
  margin: 2px 0;
  font-size: 0.9em;
  color: #666;
}

.user-info p:last-child {
  color: #42b983;
  font-weight: 500;
}

.stats {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 0.9em;
}

/* Efecto de carga */
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.loading {
  animation: pulse 1.5s infinite;
}
</style>
```

## Buenas Prácticas

1. **Usa `computed` para valores derivados**: Mantén tu template limpio moviendo la lógica de transformación a propiedades computadas.

2. **Elige `watch` cuando necesites**:
   - Acceder al valor anterior
   - Observar múltiples fuentes
   - Controlar cuándo se ejecuta el efecto

3. **Elige `watchEffect` cuando**:
   - Necesitas rastrear automáticamente las dependencias
   - El efecto depende de múltiples fuentes
   - No necesitas el valor anterior

4. **Limpia los efectos secundarios**: Siempre limpia los efectos secundarios (como event listeners o timeouts) en la función de limpieza de `watchEffect` o `onUnmounted`.

5. **Usa debouncing para operaciones costosas**: Como se muestra en el ejemplo de búsqueda, usa debouncing para limitar la frecuencia de las operaciones costosas.

## Próximos pasos

Ahora que has aprendido sobre propiedades computadas y observadores en la Composition API, estás listo para explorar cómo compartir estado entre componentes con `provide` e `inject`.

[👉 Siguiente: Provide e Inject](./provide-inject.md)
