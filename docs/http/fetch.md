# 4.2 Uso de la API Fetch

La API Fetch es la forma nativa de realizar peticiones HTTP en JavaScript moderno. Es compatible con todos los navegadores actuales y no requiere dependencias adicionales.

## Petición GET básica

```vue
<template>
  <div class="http-demo">
    <h2>Lista de Usuarios (Fetch)</h2>
    <button @click="fetchUsers" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Cargar Usuarios' }}
    </button>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <ul v-else-if="users.length > 0" class="user-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        <img :src="user.avatar" :alt="user.first_name" class="avatar">
        <div class="user-info">
          <h3>{{ user.first_name }} {{ user.last_name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </li>
    </ul>
    
    <p v-else-if="!loading" class="no-data">
      No hay usuarios para mostrar. Haz clic en el botón para cargarlos.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('https://reqres.in/api/users?delay=1')
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    const data = await response.json()
    users.value = data.data
  } catch (err) {
    console.error('Error al cargar usuarios:', err)
    error.value = 'No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Estilos para el componente */
</style>
```

## Ventajas de usar Fetch

- **Nativo**: No requiere dependencias adicionales
- **Promesas**: Usa promesas para un manejo asíncrono más limpio
- **Flexible**: Permite un control detallado de las peticiones
- **Streaming**: Soporta la lectura de streams de datos

## Desventajas

- **Sin soporte en navegadores antiguos**: Necesita polyfill para IE11 y versiones anteriores
- **Sin cancelación nativa**: No tiene soporte integrado para cancelar peticiones
- **Manejo de errores manual**: Requiere verificación manual de códigos de estado HTTP

## Uso con async/await

```javascript
async function getData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error en la petición:', error)
    throw error
  }
}
```

## Envío de datos (POST, PUT, DELETE)

```javascript
async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error al enviar datos:', error)
    throw error
  }
}
```

## Cabeceras personalizadas

```javascript
const response = await fetch(url, {
  headers: {
    'Authorization': 'Bearer tu-token',
    'X-Custom-Header': 'valor-personalizado'
  }
})
```

## Control de caché

```javascript
// Ignorar caché
const response = await fetch(url, {
  cache: 'no-store'
})

// Usar caché si está disponible
const response = await fetch(url, {
  cache: 'force-cache'
})
```

## Siguientes pasos

Ahora que has aprendido a usar la API Fetch, en la siguiente sección exploraremos cómo usar Axios, que ofrece características adicionales y un manejo de errores más robusto.

[Ir a la siguiente sección: Uso de Axios](./axios.md)
