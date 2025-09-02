# 4.3 Uso de Axios en Vue 3

Axios es una biblioteca de cliente HTTP basada en promesas que simplifica el manejo de peticiones HTTP en aplicaciones JavaScript. Es especialmente útil en aplicaciones Vue 3 por su integración sencilla y características avanzadas.

## Instalación

Para instalar Axios en tu proyecto:

```bash
npm install axios
# o
yarn add axios
```

## Configuración básica

Crea un archivo de configuración para Axios (por ejemplo, `src/utils/api.js`):

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api
```

## Ejemplo de componente con Axios

```vue
<template>
  <div class="http-demo">
    <h2>Lista de Usuarios (Axios)</h2>
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
import api from '@/utils/api'

const users = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get('/users')
    users.value = response.data.data
  } catch (err) {
    console.error('Error al cargar usuarios:', err)
    error.value = 'No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}
</script>
```

## Métodos HTTP

### GET
```javascript
// Obtener un recurso
const response = await api.get('/users')

// Con parámetros
const response = await api.get('/users', {
  params: {
    page: 1,
    limit: 10
  }
})
```

### POST
```javascript
// Crear un recurso
const response = await api.post('/users', {
  name: 'Nuevo Usuario',
  email: 'usuario@ejemplo.com'
})
```

### PUT/PATCH
```javascript
// Actualizar un recurso (PUT reemplaza, PATCH actualiza parcialmente)
const response = await api.put(`/users/${userId}`, {
  name: 'Nombre Actualizado'
})
```

### DELETE
```javascript
// Eliminar un recurso
await api.delete(`/users/${userId}`)
```

## Interceptores

Los interceptores permiten ejecutar código antes de que una petición sea enviada o después de que se reciba una respuesta.

### Interceptor de petición
```javascript
api.interceptors.request.use(
  (config) => {
    // Haz algo antes de enviar la petición
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
```

### Interceptor de respuesta
```javascript
api.interceptors.response.use(
  (response) => {
    // Cualquier código de estado dentro del rango 2xx causa la ejecución de esta función
    return response
  },
  (error) => {
    // Cualquier código de estado fuera del rango 2xx causa la ejecución de esta función
    if (error.response.status === 401) {
      // Redirigir a la página de login
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
```

## Cancelación de peticiones

```javascript
import { CancelToken } from 'axios'

// Crear un token de cancelación
const source = CancelToken.source()

// Realizar la petición
api.get('/users', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Petición cancelada:', thrown.message)
  } else {
    // Manejar error
  }
})

// Cancelar la petición
source.cancel('Operación cancelada por el usuario')
```

## Siguientes pasos

En la siguiente sección, exploraremos Alova, una solución ligera para manejar peticiones HTTP con características avanzadas como caché y gestión de estado.

[Ir a la siguiente sección: Uso de Alova](./alova.md)
