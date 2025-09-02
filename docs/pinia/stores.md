# Creación y Uso de Stores en Pinia

## ¿Qué es un Store?

En Pinia, un store es una entidad que contiene estado y lógica de negocio. A diferencia de Vuex, no necesitas mutaciones, solo acciones.

## Creando tu primer Store

1. Crea un archivo para el store, por ejemplo `stores/counter.js`:

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // Estado reactivo
  state: () => ({
    count: 0,
    name: 'Contador',
  }),
  
  // Getters (computadas)
  getters: {
    doubleCount: (state) => state.count * 2,
    // Getters que usan otros getters
    greeting: (state) => {
      return `Hola, ${state.name}. El contador es ${state.count}`
    },
  },
  
  // Acciones (métodos)
  actions: {
    increment() {
      this.count++
    },
    async fetchData() {
      try {
        const response = await fetch('https://api.example.com/data')
        const data = await response.json()
        // Actualizar el estado
        this.data = data
        return data
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    },
  },
})
```

## Usando el Store en un Componente

```vue
<template>
  <div>
    <h1>{{ store.name }}</h1>
    <p>Contador: {{ store.count }}</p>
    <p>Doble: {{ store.doubleCount }}</p>
    <p>{{ store.greeting }}</p>
    
    <button @click="store.increment()">Incrementar</button>
    <button @click="store.$reset()">Reiniciar</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// Acceder al estado
console.log(store.count) // 0

// Llamar a una acción
store.increment()

// Acciones asíncronas
const data = await store.fetchData()
</script>
```

## Desestructuración Reactiva

Para mantener la reactividad al desestructurar, usa `storeToRefs`:

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
// Esto mantendrá la reactividad
const { count, name } = storeToRefs(store)
// Las acciones pueden ser desestructuradas directamente
const { increment } = store
</script>
```

## Resetear el estado

Puedes resetear el estado a sus valores iniciales en cualquier momento:

```javascript
const store = useStore()
store.$reset()
```

## Suscripción a cambios

Puedes suscribirte a los cambios en el estado:

```javascript
store.$subscribe((mutation, state) => {
  // Se ejecuta después de cada cambio
  console.log('Cambio detectado:', mutation, state)
})
```

Con estos conceptos básicos, ya puedes empezar a gestionar el estado de tu aplicación Vue con Pinia de manera efectiva.

## Siguiente paso

Ahora que has aprendido los conceptos básicos de los stores en Pinia, el siguiente paso es explorar [Conceptos Avanzados de Pinia](./avanzado.md), donde aprenderás sobre persistencia de estado, testing, integración con Vue Router y más.
