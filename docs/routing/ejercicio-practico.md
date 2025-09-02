# 4.4 Ejercicio Práctico: Blog con Vue Router

En este ejercicio, crearás un blog simple utilizando Vue Router. El blog tendrá las siguientes características:

## Requisitos

1. **Páginas requeridas**:

    - Inicio: Muestra una lista de publicaciones recientes
    - Detalle de publicación: Muestra una publicación completa
    - Perfil de usuario: Muestra información del autor
    - Crear publicación: Formulario para nueva publicación (protegido)
    - Página 404: Para rutas no encontradas

2. **Características**:

    - Navegación entre páginas
    - Rutas con parámetros dinámicos
    - Rutas anidadas
    - Protección de rutas
    - Carga perezosa de componentes
    - Transiciones entre rutas

## Estructura del Proyecto

```
src/
  components/
    NavBar.vue
    PostList.vue
    PostItem.vue
  views/
    HomeView.vue
    PostView.vue
    UserView.vue
    CreatePostView.vue
    LoginView.vue
    NotFoundView.vue
  router/
    index.js
  App.vue
  main.js
```

## Instrucciones Paso a Paso

### 1. Configuración Inicial

1. Crea un nuevo proyecto Vue con Vite:
   ```bash
   npm create vite@latest vue-blog -- --template vue
   cd vue-blog
   npm install vue-router@4
   ```

2. Crea la estructura de carpetas mostrada arriba.

### 2. Configura el Router

En `router/index.js`:

```javascript
import { createRouter, createWebHistory } from 'vue-router';

// Vistas
const HomeView = () => import('@/views/HomeView.vue');
const PostView = () => import('@/views/PostView.vue');
const UserView = () => import('@/views/UserView.vue');
const CreatePostView = () => import('@/views/CreatePostView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    props: true
  },
  {
    path: '/user/:username',
    name: 'user',
    component: UserView,
    props: true
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePostView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

// Guard de navegación global
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
```

### 3. Crea los Componentes

#### NavBar.vue
```vue
<template>
  <nav>
    <router-link to="/" class="logo">Mi Blog</router-link>
    <div class="nav-links">
      <router-link to="/">Inicio</router-link>
      <router-link v-if="isAuthenticated" to="/create">Nuevo Post</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Iniciar Sesión</router-link>
      <button v-else @click="logout" class="logout-btn">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter();
    const isAuthenticated = computed(() => localStorage.getItem('isAuthenticated'));
    
    const logout = () => {
      localStorage.removeItem('isAuthenticated');
      router.push('/login');
    };
    
    return { isAuthenticated, logout };
  }
};
</script>

<style scoped>
/* Estilos para la barra de navegación */
</style>
```

### 4. Crea las Vistas

#### HomeView.vue
```vue
<template>
  <div class="home">
    <h1>Últimas Publicaciones</h1>
    <PostList :posts="posts" />
  </div>
</template>

<script>
import { ref } from 'vue';
import PostList from '@/components/PostList.vue';

export default {
  name: 'HomeView',
  components: { PostList },
  setup() {
    // Datos de ejemplo
    const posts = ref([
      { id: 1, title: 'Mi primer post', excerpt: 'Contenido de ejemplo...', author: 'usuario1' },
      { id: 2, title: 'Segundo post', excerpt: 'Más contenido...', author: 'usuario2' }
    ]);
    
    return { posts };
  }
};
</script>
```

### 5. Implementa la Autenticación

En `LoginView.vue`:
```vue
<template>
  <div class="login">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Usuario" required>
      <input v-model="password" type="password" placeholder="Contraseña" required>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const route = useRoute();
    
    const handleLogin = () => {
      // Validación simple
      if (username.value && password.value) {
        localStorage.setItem('isAuthenticated', 'true');
        const redirect = route.query.redirect || '/';
        router.push(redirect);
      } else {
        alert('Por favor ingresa usuario y contraseña');
      }
    };
    
    return { username, password, handleLogin };
  }
};
</script>
```

## Ejercicios Adicionales

1. **Mejora la autenticación**:
   
    - Implementa autenticación real con una API
    - Añade manejo de tokens JWT
    - Implementa renovación de tokens

2. **Añade más características**:
   
    - Sistema de comentarios
    - Búsqueda de publicaciones
    - Categorías y etiquetas
    - Paginación de resultados

3. **Mejora la experiencia de usuario**:
   
    - Añade carga esquelética (skeleton loading)
    - Implementa manejo de errores
    - Añade notificaciones

## Preguntas de Repaso

1. ¿Cómo manejarías la protección de rutas en una aplicación real?
2. ¿Cuál es la ventaja de usar lazy loading en las rutas?
3. ¿Cómo implementarías un sistema de roles y permisos?
4. ¿Qué estrategias usarías para manejar el estado global de la aplicación?

## Recursos Adicionales

- [Documentación Oficial de Vue Router](https://router.vuejs.org/)
- [Patrones de Navegación Comunes](https://router.vuejs.org/guide/essentials/navigation.html)
- [Autenticación con Vue Router](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards)

## Siguiente paso

¡Felicidades por completar el ejercicio de enrutamiento! Ahora que has practicado con las características principales de Vue Router, estás listo para explorar la gestión de estado con Pinia.

[→ Siguiente: Introducción a Pinia](../pinia/introduccion.md)
