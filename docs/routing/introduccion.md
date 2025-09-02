# 4.1 Introducción a Vue Router

Vue Router es la biblioteca oficial de enrutamiento para Vue.js. Permite crear aplicaciones de una sola página (SPA) con múltiples vistas y navegación entre ellas sin recargar la página.

## ¿Qué es Vue Router?

Vue Router es un enrutador oficial de Vue.js que permite:
- Crear una experiencia de navegación fluida
- Mantener el estado de la aplicación entre cambios de vista
- Implementar navegación adelante/atrás del navegador
- Proteger rutas con autenticación
- Cargar componentes de forma dinámica

## Conceptos Clave

- **Rutas**: Mapean URLs a componentes
- **Vistas**: Componentes que se muestran según la ruta
- **Navegación**: Movimiento entre diferentes rutas
- **Parámetros**: Datos pasados a través de la URL
- **Anidación**: Jerarquía de rutas

## Instalación

Para instalar Vue Router en tu proyecto:

```bash
npm install vue-router@4
# o con yarn
yarn add vue-router@4
```

## Configuración Básica

1. Crea un archivo `router/index.js` en tu proyecto:

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // Carga perezosa del componente
    component: () => import('../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
```

2. Registra el router en `main.js`:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

## Componentes Básicos

Vue Router proporciona dos componentes principales:

1. **`<router-link>`**: Para la navegación entre rutas
   ```vue
   <router-link to="/">Inicio</router-link>
   <router-link :to="{ name: 'about' }">Acerca de</router-link>
   ```

2. **`<router-view>`**: Muestra el componente correspondiente a la ruta actual
   ```vue
   <template>
     <div id="app">
       <nav>
         <router-link to="/">Inicio</router-link> |
         <router-link to="/about">Acerca de</router-link>
       </nav>
       <router-view />
     </div>
   </template>
   ```

## Siguiente paso

Ahora que tienes configurado Vue Router, puedes aprender sobre [rutas básicas y navegación](./rutas-basicas.md).
