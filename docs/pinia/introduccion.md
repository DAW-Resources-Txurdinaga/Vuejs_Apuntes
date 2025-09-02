# Gestión de Estado con Pinia

## Introducción a Pinia

Pinia es la solución oficial de Vue para la gestión de estado. Es una biblioteca de gestión de estado que ofrece una API más simple y tipada que Vuex, el sistema de gestión de estado anterior de Vue.

### ¿Por qué usar Pinia?

- **Tipado mejorado**: Soporte de TypeScript de primera clase
- **API más simple**: Menos código repetitivo
- **Módulos por defecto**: No necesita módulos anidados
- **DevTools**: Integración con Vue DevTools
- **Composable API**: Diseñado para trabajar con la Composition API
- **Ligero**: Muy pequeño en tamaño

### Instalación

Para instalar Pinia en tu proyecto Vue 3, ejecuta:

```bash
npm install pinia
# o con yarn
# yarn add pinia
# o con pnpm
# pnpm add pinia
```

### Configuración básica

En tu archivo principal (generalmente `main.js` o `main.ts`):

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
```

¡Ahora estás listo para comenzar a usar Pinia en tu aplicación Vue 3! En las siguientes secciones, exploraremos cómo crear y usar stores, actions, getters y más.

## Siguiente paso

Ahora que tienes una introducción a Pinia, el siguiente paso es aprender sobre [Stores en Pinia](./stores.md), donde aprenderás a crear y utilizar stores para gestionar el estado de tu aplicación.
