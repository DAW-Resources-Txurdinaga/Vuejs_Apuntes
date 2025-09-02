# 4.2 Rutas Básicas y Navegación

## Rutas Básicas

Una ruta básica en Vue Router se define como un objeto con las siguientes propiedades:

```javascript
const routes = [
  {
    path: '/',              // Ruta en la URL
    name: 'home',           // Nombre opcional para referenciar la ruta
    component: HomeView,    // Componente a renderizar
    meta: {                // Metadatos opcionales
      requiresAuth: true
    },
    props: true           // Pasar parámetros de ruta como props
  },
  // Otras rutas...
];
```

## Navegación con `<router-link>`

El componente `<router-link>` se utiliza para crear enlaces de navegación:

```vue
<!-- Navegación básica -->
<router-link to="/about">Acerca de</router-link>

<!-- Usando el nombre de la ruta -->
<router-link :to="{ name: 'user', params: { id: 123 }}">Usuario 123</router-link>
<!-- Con clases personalizadas -->
<router-link 
  to="/contact"
  class="nav-link"
  active-class="active-link"
  exact-active-class="exact-active-link"
>
  Contacto
</router-link>
```

## Navegación Programática

Puedes navegar mediante código usando el objeto `router`:

```javascript
// En métodos de opciones
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about');
      // O usando el nombre de la ruta
      // this.$router.push({ name: 'about' });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};

// En setup() (Composition API)
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    const goToAbout = () => {
      router.push('/about');
    };
    
    return { goToAbout };
  }
};
```

## Rutas con Parámetros

### Definición de rutas con parámetros

```javascript
const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
    props: true // Pasa los parámetros como props al componente
  },
  {
    path: '/user/:username/post/:postId',
    name: 'post',
    component: PostView
  }
];
```

### Acceso a los parámetros

```vue
<template>
  <div>
    <h1>Perfil de {{ $route.params.username }}</h1>
    <!-- O usando Composition API -->
    <p>ID de usuario: {{ userId }}</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'UserView',
  props: {
    // Si usas props: true en la ruta
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const userId = computed(() => route.params.id);
    
    return { userId };
  }
};
</script>
```

## Rutas Anidadas

Las rutas anidadas permiten crear jerarquías de componentes:

```javascript
const routes = [
  {
    path: '/settings',
    component: SettingsLayout,
    children: [
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'account',
        component: UserAccount
      },
      {
        path: 'privacy',
        component: PrivacySettings
      },
      // Ruta vacía que coincide con /settings
      { path: '', redirect: 'profile' }
    ]
  }
];
```

En el componente `SettingsLayout.vue`:

```vue
<template>
  <div class="settings-layout">
    <nav>
      <router-link to="/settings/profile">Perfil</router-link>
      <router-link to="/settings/account">Cuenta</router-link>
      <router-link to="/settings/privacy">Privacidad</router-link>
    </nav>
    <div class="settings-content">
      <router-view />
    </div>
  </div>
</template>
```

## Siguiente paso

Ahora que conoces las rutas básicas, puedes aprender sobre [navegación avanzada](navegacion-avanzada.md).
