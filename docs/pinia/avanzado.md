# Conceptos Avanzados de Pinia

## Persistencia de Estado

Para mantener el estado entre recargas de página, puedes usar `pinia-plugin-persistedstate`:

```bash
npm install pinia-plugin-persistedstate
```

Configuración en tu aplicación:

```javascript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
```

Luego, en tu store:

```javascript
export const useStore = defineStore('main', {
  state: () => ({
    user: null,
    preferences: {},
  }),
  persist: true, // Persistir todo el estado
  // O con más control:
  persist: {
    paths: ['user'], // Solo persistir el usuario
    storage: sessionStorage, // Usar sessionStorage en lugar de localStorage
  },
})
```

## Módulos y Stores Anidados

Puedes organizar tu lógica en múltiples stores y usarlos juntos:

```javascript
// stores/user.js
export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Usuario',
    isAuthenticated: false,
  }),
  actions: {
    login() {
      this.isAuthenticated = true
    },
  },
})

// stores/cart.js
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addItem(item) {
      this.items.push(item)
    },
  },
})

// En un componente
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'

export default {
  setup() {
    const user = useUserStore()
    const cart = useCartStore()
    
    // Usar ambos stores juntos
    const checkout = () => {
      if (user.isAuthenticated) {
        // Procesar compra
      } else {
        // Redirigir a login
      }
    }
    
    return { user, cart, checkout }
  },
}
```

## Testing con Pinia

Para probar tus stores, puedes usar `@vue/test-utils` junto con Pinia:

```bash
npm install -D @vue/test-utils @vue/vue3-jest
```

Ejemplo de prueba:

```javascript
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // Crea una nueva instancia de Pinia antes de cada prueba
    setActivePinia(createPinia())
  })

  it('incrementa el contador', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
    store.increment()
    expect(store.count).toBe(1)
  })
})
```

## Integración con Vue Router

Puedes usar Pinia junto con Vue Router para la navegación protegida:

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  // Otras rutas...
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

## Uso con TypeScript

Pinia tiene soporte de primera clase para TypeScript. Aquí hay un ejemplo de un store tipado:

```typescript
// types/user.ts
export interface User {
  id: number
  name: string
  email: string
}

// stores/user.ts
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

interface UserState {
  user: User | null
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    loading: false,
    error: null,
  }),
  
  actions: {
    async fetchUser(userId: number) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`/api/users/${userId}`)
        const data: User = await response.json()
        this.user = data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error desconocido'
      } finally {
        this.loading = false
      }
    },
  },
  
  getters: {
    isAdmin: (state): boolean => {
      return state.user?.role === 'admin'
    },
  },
})
```

Con estos conceptos avanzados, podrás aprovechar al máximo Pinia en tus aplicaciones Vue 3.

## Siguiente paso

Ahora que has aprendido conceptos avanzados de Pinia, el siguiente paso es explorar la [Estructura de un Proyecto Práctico](../proyecto/estructura.md), donde verás cómo integrar todo lo aprendido en una aplicación completa.
