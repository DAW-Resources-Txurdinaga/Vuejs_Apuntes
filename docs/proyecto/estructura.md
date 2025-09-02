# 4.1 Estructura de un Proyecto Vue 3

## Estructura Recomendada

```
mi-proyecto/
├── public/                  # Archivos estáticos que se copian sin procesar
│   ├── favicon.ico
│   └── index.html           # Plantilla HTML principal
│
├── src/
│   ├── assets/             # Recursos estáticos (imágenes, fuentes, etc.)
│   │   └── logo.png
│   │
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/              # Componentes de UI genéricos (botones, tarjetas, etc.)
│   │   └── shared/          # Componentes compartidos entre páginas
│   │
│   ├── composables/        # Composable functions (lógica reutilizable)
│   │   ├── useApi.js       # Lógica para llamadas a API
│   │   └── useAuth.js       # Lógica de autenticación
│   │
│   ├── router/            # Configuración del enrutador
│   │   └── index.js
│   │
│   ├── stores/            # Almacenes Pinia
│   │   ├── index.js         # Configuración principal de Pinia
│   │   ├── auth.store.js    # Store para autenticación
│   │   └── tasks.store.js   # Store para tareas
│   │
│   ├── styles/            # Estilos globales
│   │   ├── _variables.scss  # Variables globales
│   │   └── main.scss        # Estilos principales
│   │
│   ├── utils/             # Utilidades y helpers
│   │   ├── validators.js    # Funciones de validación
│   │   └── formatters.js    # Funciones de formateo
│   │
│   ├── views/             # Componentes de página (rutas)
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   └── DashboardView.vue
│   │
│   ├── App.vue            # Componente raíz
│   ├── main.js             # Punto de entrada de la aplicación
│   └── registerServiceWorker.js  # Configuración de PWA
│
├── .env                   # Variables de entorno
├── .gitignore
├── package.json
└── vite.config.js          # Configuración de Vite
```

## Explicación de Carpetas Clave

### 1. `/public`
- Contiene archivos estáticos que se copian directamente al directorio de compilación
- `index.html` es la plantilla base de la aplicación

### 2. `/src/components`
- **ui/**: Componentes de interfaz de usuario genéricos y reutilizables
  - Ejemplo: `Button.vue`, `Card.vue`, `Modal.vue`
- **shared/**: Componentes compartidos entre páginas
  - Ejemplo: `Layout.vue`, `Header.vue`, `Footer.vue`

### 3. `/src/composables`
- Funciones lógicas reutilizables usando la Composition API
- Ejemplo: `useFormValidation.js`, `usePagination.js`

### 4. `/src/stores`
- Almacenes de Pinia para la gestión del estado global
- Cada archivo representa un dominio lógico de la aplicación

### 5. `/src/views`
- Componentes que representan páginas completas
- Mapeados a rutas en el enrutador

## Estructura de un Componente Vue

```vue
<template>
  <div class="componente">
    <!-- Contenido del componente -->
    <h1>{{ titulo }}</h1>
    <slot></slot>
  </div>
</template>

<script setup>
// Importaciones
import { ref, computed, onMounted } from 'vue';
import { useStore } from '../stores';

// Props
defineProps({
  titulo: {
    type: String,
    required: true
  }
});

// Estado reactivo
const contador = ref(0);
const store = useStore();

// Computadas
const contadorDoble = computed(() => contador.value * 2);

// Métodos
function incrementar() {
  contador.value++;
}

// Hooks del ciclo de vida
onMounted(() => {
  console.log('Componente montado');
});

// Exponer al template
// En <script setup>, todo lo declarado está automáticamente disponible
</script>

<style scoped>
.componente {
  /* Estilos con ámbito local */
}
</style>
```

## Convenciones de Nombrado

1. **Componentes**: PascalCase (ej. `UserProfile.vue`)
2. **Archivos JS/CSS**: kebab-case (ej. `user-service.js`)
3. **Variables y funciones**: camelCase
4. **Constantes**: UPPER_SNAKE_CASE
5. **Almacenes Pinia**: `nombre.tipo.js` (ej. `user.store.js`)

## Ejercicio: Estructurar un Proyecto

Crea una estructura de proyecto para una aplicación de blog con las siguientes características:

1. Página de inicio con lista de publicaciones
2. Páginas de categorías
3. Sistema de comentarios
4. Panel de administración
5. Autenticación de usuarios

```
blog-vue/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes de UI reutilizables
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   └── Modal.vue
│   │   └── shared/       # Componentes compartidos
│   │       ├── Layout.vue
│   │       ├── Header.vue
│   │       └── Footer.vue
│   │
│   ├── composables/     # Lógica reutilizable
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   └── useForm.js
│   │
│   ├── router/          # Configuración del enrutador
│   │   └── index.js
│   │
│   ├── stores/          # Almacenes Pinia
│   │   ├── index.js
│   │   ├── posts.store.js
│   │   ├── categories.store.js
│   │   ├── comments.store.js
│   │   └── auth.store.js
│   │
│   ├── views/           # Vistas/páginas
│   │   ├── public/
│   │   │   ├── HomeView.vue
│   │   │   ├── PostView.vue
│   │   │   └── CategoryView.vue
│   │   └── admin/
│   │       ├── DashboardView.vue
│   │       ├── PostsView.vue
│   │       └── UsersView.vue
│   │
│   ├── App.vue
│   └── main.js
└── ...
```

## Preguntas de Repaso

1. ¿Por qué es importante organizar los componentes en subcarpetas como `ui/` y `shared/`?
2. ¿Cuál es la ventaja de usar la carpeta `composables/`?
3. ¿Por qué separar las vistas públicas de las de administración?
4. ¿Cómo manejarías los estilos globales vs estilos de componente?

En la siguiente sección trabajaremos en ejercicios prácticos para aplicar estos conceptos.
