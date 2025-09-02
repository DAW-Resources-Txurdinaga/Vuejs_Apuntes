# 4.3 Navegación Avanzada con Vue Router

## Guards de Navegación

Los guards de navegación permiten controlar el acceso a las rutas y realizar acciones antes o después de la navegación.

### Guard Global

Se ejecuta antes de cada navegación:

```javascript
// router/index.js
router.beforeEach((to, from, next) => {
  // to: Ruta a la que se quiere navegar
  // from: Ruta de la que se viene
  // next: Función para continuar con la navegación
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
```

### Guard de Ruta

Se define en la configuración de la ruta:

```javascript
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next('/login');
      }
    }
  }
];
```

### Guards en el Componente

Se definen dentro del componente:

```javascript
export default {
  beforeRouteEnter(to, from, next) {
    // Se llama antes de que la ruta que renderiza este componente sea confirmada.
    // NO tiene acceso a `this` porque el componente no ha sido creado aún.
    next(vm => {
      // Acceso a la instancia del componente a través de `vm`
      vm.loadUserData();
    });
  },
  
  beforeRouteUpdate(to, from) {
    // Se llama cuando la ruta cambia pero el componente se reutiliza
    // Por ejemplo, cuando cambian los parámetros dinámicos
    this.userData = null;
    this.fetchUserData(to.params.id);
  },
  
  beforeRouteLeave(to, from, next) {
    // Se llama cuando la ruta que renderiza este componente está a punto de ser abandonada
    if (this.unsavedChanges) {
      if (confirm('¿Tienes cambios sin guardar. ¿Seguro que quieres salir?')) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
```

## Lazy Loading de Rutas

Para mejorar el rendimiento, carga los componentes solo cuando sean necesarios:

```javascript
const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    // Agrupa componentes en el mismo chunk
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue')
  }
];
```

## Scroll Behavior

Controla el comportamiento del scroll al navegar:

```javascript
const router = createRouter({
  // ...
  scrollBehavior(to, from, savedPosition) {
    // Retorna la posición deseada
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0 };
    }
  },
});
```

## Transiciones

Agrega animaciones a las transiciones entre rutas:

```vue
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

## Siguiente paso

Ahora que conoces la navegación avanzada, puedes revisar el [ejercicio práctico](ejercicio-practico.md) para aplicar estos conceptos.
