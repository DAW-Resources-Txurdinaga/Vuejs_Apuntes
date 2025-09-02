# 4.4 Uso de Alova en Vue 3

Alova es una solución ligera de solicitud de datos para Vue, React y Svelte que proporciona una experiencia de desarrollo fluida con funciones avanzadas como caché, gestión de estado y cancelación de peticiones.

## Instalación

```bash
npm install alova
```

## Configuración básica

Crea un archivo de configuración (por ejemplo, `src/utils/alova.js`):

```javascript
import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'

export const alovaInstance = createAlova({
  baseURL: 'https://api.example.com',
  requestAdapter: GlobalFetch(),
  statesHook: VueHook,
  
  // Configuración global de encabezados
  headers: {
    'Content-Type': 'application/json',
  },
  
  // Tiempo de espera predeterminado
  timeout: 10000,
  
  // Interceptores de petición
  beforeRequest(method) {
    const token = localStorage.getItem('auth_token')
    if (token) {
      method.config.headers.Authorization = `Bearer ${token}`
    }
  },
  
  // Interceptores de respuesta
  responded: {
    onSuccess: async (response, method) => {
      const data = await response.json()
      if (response.status >= 200 && response.status < 300) {
        return data
      }
      throw new Error(data.message || 'Error en la petición')
    },
    onError: (err, method) => {
      console.error('Error en la petición:', err)
      throw err
    }
  }
})

export default alovaInstance
```

## Uso básico con Composable

```vue
<template>
  <div>
    <h2>Lista de Productos (Alova)</h2>
    <button @click="fetchProducts" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Cargar Productos' }}
    </button>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <ul v-else-if="products.length > 0" class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <span class="price">${{ product.price }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRequest } from 'alova'
import { alovaInstance } from '@/utils/alova'

const products = ref([])
const loading = ref(false)
const error = ref(null)

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await alovaInstance.Get('/products')
    products.value = response
  } catch (err) {
    error.value = err.message || 'Error al cargar los productos'
  } finally {
    loading.value = false
  }
}
</script>
```

## Características avanzadas

### 1. Cache de peticiones

```javascript
// Usar caché con tiempo de expiración
const { data, loading, error } = useRequest(
  alovaInstance.Get('/products', {
    localCache: {
      expire: 5 * 60 * 1000, // 5 minutos
      mode: 'restore'
    }
  })
)
```

### 2. Peticiones POST/PUT/DELETE

```javascript
// Crear un nuevo producto
const { send: createProduct } = useRequest(
  (productData) => alovaInstance.Post('/products', productData),
  { immediate: false }
)

// Uso
const handleSubmit = async () => {
  try {
    const newProduct = await createProduct({
      title: 'Nuevo Producto',
      price: 99.99,
      description: 'Descripción del producto'
    })
    console.log('Producto creado:', newProduct)
  } catch (err) {
    console.error('Error al crear el producto:', err)
  }
}
```

### 3. Paginación

```vue
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>
    <button 
      @click="prevPage" 
      :disabled="!hasPrevPage || loading"
    >
      Anterior
    </button>
    <span>Página {{ currentPage }}</span>
    <button 
      @click="nextPage" 
      :disabled="!hasNextPage || loading"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePagination } from 'alova'
import { alovaInstance } from '@/utils/alova'

const pageSize = 10
const currentPage = ref(1)

const {
  loading,
  data: list,
  page: { total },
  pageCount,
  isLastPage,
  isFirstPage,
  hasNextPage,
  hasPrevPage,
  next,
  prev,
  go
} = usePagination(
  (page, pageSize) => alovaInstance.Get(`/items?page=${page}&size=${pageSize}`),
  {
    initialPage: 1,
    initialPageSize: pageSize,
    initialData: []
  }
)

const nextPage = () => next()
const prevPage = () => prev()
</script>
```

## Ventajas de usar Alova

1. **Integración con Vue 3**: Diseñado específicamente para trabajar con la Composition API de Vue 3.
2. **Caché inteligente**: Reduce peticiones innecesarias con un sistema de caché potente.
3. **Gestión de estado**: Mantiene el estado de las peticiones de forma reactiva.
4. **Ligero**: Tamaño reducido en comparación con otras soluciones.
5. **Tipado TypeScript**: Excelente soporte para TypeScript.
6. **Cancelación de peticiones**: Fácil cancelación de peticiones en curso.
7. **Reintentos automáticos**: Configuración sencilla de reintentos para peticiones fallidas.

## Conclusión

Alova es una excelente opción para aplicaciones Vue 3 que requieren un manejo avanzado de peticiones HTTP con características como caché, paginación y gestión de estado integradas. Su diseño modular y su integración con la Composition API de Vue lo convierten en una herramienta poderosa para el desarrollo de aplicaciones modernas.

Para más información, consulta la [documentación oficial de Alova](https://alova.js.org/).

## Siguientes pasos

Ahora que has aprendido a usar Alova, en la siguiente sección encontrarás ejercicios prácticos para poner en práctica lo aprendido sobre peticiones HTTP en Vue 3.

[Ir a la siguiente sección: Ejercicios Prácticos](./ejercicios.md)

