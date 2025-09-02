# 3.1 Creación de Componentes en Vue 3

Los componentes son los bloques de construcción fundamentales de las aplicaciones Vue. Permiten dividir la interfaz de usuario en piezas independientes y reutilizables.

## Opciones de la API

### Componente con Options API

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="increment">Contador: {{ count }}</button>
  </div>
</template>

<script>
export default {
  // Datos reactivos
  data() {
    return {
      count: 0,
      title: 'Mi Componente',
      message: '¡Hola desde Vue 3!'
    }
  },
  // Métodos
  methods: {
    increment() {
      this.count++
    }
  },
  // Propiedades computadas
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  // Hooks del ciclo de vida
  mounted() {
    console.log('Componente montado')
  }
}
</script>

<style scoped>
/* Estilos con alcance al componente */
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
```

## Componente con Composition API

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="increment">Contador: {{ count }}</button>
    <p>Doble: {{ doubleCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estado reactivo
const count = ref(0)
const title = ref('Mi Componente con Composition API')
const message = '¡Hola desde Vue 3 Composition API!'

// Propiedad computada
const doubleCount = computed(() => count.value * 2)

// Método
function increment() {
  count.value++
}

// Hook del ciclo de vida
onMounted(() => {
  console.log('Componente montado')
})
</script>

<style scoped>
/* Estilos con alcance al componente */
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #3aa876;
}
</style>
```

## Componentes de un Solo Archivo (SFC)

Los archivos `.vue` permiten encapsular la plantilla, lógica y estilos de un componente en un solo archivo:

```
mi-componente/
├── MiComponente.vue    // Componente principal
└── components/
    └── BotonPersonalizado.vue  // Componente hijo
```

## Registro de Componentes

### Registro Global

```javascript
import { createApp } from 'vue'
import MiComponente from './components/MiComponente.vue'

const app = createApp({})
app.component('mi-componente', MiComponente)
```

### Registro Local

```vue
<script>
import BotonPersonalizado from './BotonPersonalizado.vue'

export default {
  components: {
    BotonPersonalizado
  }
}
</script>
```

## Componentes Dinámicos (Intercambio entre componentes)

A veces necesitamos cambiar entre diferentes componentes en la misma ubicación de la pantalla. Vue nos permite hacer esto fácilmente con el componente especial `<component>` y la directiva `:is`.

### Ejemplo Básico:

```vue
<template>
  <div>
    <!-- Botones para cambiar el componente mostrado -->
    <button @click="mostrar = 'Inicio'">Inicio</button>
    <button @click="mostrar = 'Perfil'">Perfil</button>
    
    <!-- El componente que se muestra depende del valor de 'mostrar' -->
    <component :is="mostrar"></component>
  </div>
</template>

<script setup>
import Inicio from './Inicio.vue'
import Perfil from './Perfil.vue'
import { ref } from 'vue'

const mostrar = ref('Inicio')
</script>
```

## Carga Diferida de Componentes (Lazy Loading)

Para mejorar el rendimiento, podemos cargar componentes solo cuando sean necesarios. Esto es especialmente útil para componentes grandes que no se necesitan de inmediato.

### Carga Diferida Básica:

```vue
<template>
  <div>
    <button @click="mostrar = true">Mostrar Galería</button>
    <GaleriaDeFotos v-if="mostrar" />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

const mostrar = ref(false)

// El componente GaleriaDeFotos solo se cargará cuando sea necesario
const GaleriaDeFotos = defineAsyncComponent(() => 
  import('./GaleriaDeFotos.vue')
)
</script>
```

### Beneficios de la Carga Diferida:
- Mejora el tiempo de carga inicial de la aplicación
- Reduce el tamaño del paquete inicial
- Carga los componentes solo cuando el usuario los necesita

## Siguiente paso

Ahora que has aprendido a crear componentes en Vue 3, es importante entender cómo estos componentes pueden comunicarse entre sí. En la siguiente sección exploraremos los diferentes métodos de comunicación entre componentes.

[→ Siguiente: Comunicación entre Componentes](comunicacion.md)

