# Vue 3 Cheat Sheet - Referencia Rápida

## Directivas Básicas

### Interpolación
```vue
<template>
  <p>{{ mensaje }}</p>
  <p v-text="'Hola ' + nombre"></p>
  <p v-html="htmlContent"></p>
</template>
```

### Condicionales
```vue
<template>
  <div v-if="esVisible">Visible</div>
  <div v-else-if="otraCondicion">Otra condición</div>
  <div v-else>Por defecto</div>
  
  <div v-show="esVisible">Alternativa a v-if</div>
</template>
```

### Bucles
```vue
<template>
  <!-- Iterar array -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }} - {{ item.nombre }}
    </li>
  </ul>
  
  <!-- Iterar objeto -->
  <div v-for="(valor, clave) in objeto" :key="clave">
    {{ clave }}: {{ valor }}
  </div>
</template>
```

### Enlaces de datos
```vue
<template>
  <!-- v-bind o : -->
  <a :href="url">Enlace</a>
  <img :src="imagenUrl" :alt="textoAlternativo">
  
  <!-- v-model -->
  <input v-model="texto" placeholder="Escribe algo">
  <input type="checkbox" v-model="estaSeleccionado">
  <select v-model="seleccionado">
    <option v-for="opcion in opciones" :key="opcion">
      {{ opcion }}
    </option>
  </select>
</template>
```

## Composition API

### Reactividad Básica
```vue
<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

// Variables reactivas
const contador = ref(0)
const estado = reactive({
  nombre: 'Juan',
  edad: 30
})

// Propiedades computadas
const nombreCompleto = computed(() => {
  return `${estado.nombre} Pérez`
})

// Watchers
watch(contador, (nuevoValor, viejoValor) => {
  console.log(`El contador cambió de ${viejoValor} a ${nuevoValor}`)
})

// WatchEffect
disparar cuando cualquier dependencia reactiva cambia
watchEffect(() => {
  console.log(`El contador es: ${contador.value}`)
})
</script>
```

### Ciclo de Vida
```vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Componente montado')
  // Inicializar librerías, hacer peticiones, etc.
})

onUpdated(() => {
  console.log('Componente actualizado')
})

onUnmounted(() => {
  console.log('Componente desmontado')
  // Limpiar listeners, intervalos, etc.
})
</script>
```

## Manejo de Eventos
```vue
<template>
  <button @click="incrementar">Incrementar</button>
  <input @keyup.enter="enviarFormulario">
  <form @submit.prevent="enviarFormulario">
    <button type="submit">Enviar</button>
  </form>
  
  <!-- Manejadores de eventos con argumentos -->
  <button @click="(event) => saludar('Hola', $event)">Saludar</button>
</template>

<script setup>
function incrementar() {
  contador.value++
}

function enviarFormulario() {
  // Lógica del formulario
}

function saludar(mensaje, event) {
  console.log(mensaje, event.target)
}
</script>
```

## Referencias de Plantilla (refs)
```vue
<template>
  <input ref="inputRef" type="text">
  <button @click="enfocarInput">Enfocar input</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)

onMounted(() => {
  // inputRef.value contiene la referencia al elemento del DOM
  console.log(inputRef.value) // <input type="text">
})

function enfocarInput() {
  inputRef.value.focus()
}
</script>
```

## Directivas Personalizadas
```vue
<template>
  <p v-resaltar="'amarillo'">Texto resaltado</p>
  <button v-pin="200">Botón fijo</button>
</template>

<script setup>
// Directiva global (main.js o similar)
const app = createApp(App)

// Directiva de resaltado
app.directive('resaltar', {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
    el.style.padding = '5px'
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value
  }
})

// Directiva de fijado
app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    el.style.top = binding.value + 'px'
  }
})
</script>
```

## Props y Emits
```vue
<!-- Componente Hijo -->
<template>
  <div>
    <h2>{{ titulo }}</h2>
    <button @click="notificar">Notificar al padre</button>
  </div>
</template>

<script setup>
const props = defineProps({
  titulo: {
    type: String,
    required: true,
    default: 'Título por defecto'
  },
  valorInicial: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['actualizado'])

function notificar() {
  emit('actualizado', 'Datos del hijo')
}
</script>

<!-- Componente Padre -->
<template>
  <Hijo 
    titulo="Mi Componente" 
    :valor-inicial="contador"
    @actualizado="manejarActualizacion"
  />
</template>
```

## Proporcionar/Inyectar
```vue
<!-- Componente Padre -->
<script setup>
import { provide, ref } from 'vue'

const tema = ref('claro')

provide('tema', tema)
</script>

<!-- Componente Hijo -->
<template>
  <div :class="tema">
    <!-- Contenido -->
  </div>
</template>

<script setup>
import { inject } from 'vue'

const tema = inject('tema', 'claro')
</script>
```

## Slots
```vue
<!-- Componente BaseLayout -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- Uso -->
<BaseLayout>
  <template #header>
    <h1>Título de la página</h1>
  </template>
  
  <p>Contenido principal</p>
  
  <template #footer>
    <p>Pie de página</p>
  </template>
</BaseLayout>
```

## Transiciones
```vue
<template>
  <button @click="mostrar = !mostrar">Alternar</button>
  
  <transition name="fade">
    <p v-if="mostrar">Texto que aparece/desaparece</p>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

## Directivas de Renderizado Condicional Avanzadas

### v-once
Renderiza el elemento una sola vez, ignorando actualizaciones posteriores:
```vue
<template>
  <div v-once>Este valor nunca cambiará: {{ contador }}</div>
  <div>Este valor sí cambiará: {{ contador }}</div>
</template>
```

### v-memo
Almacena en caché el subárbol del template. Útil para optimizar el rendimiento:
```vue
<template>
  <div v-memo="[dependencia1, dependencia2]">
    <!-- Este contenido solo se volverá a renderizar si dependencia1 o dependencia2 cambian -->
    {{ datosGrandes }}
  </div>
</template>
```

### v-cloak
Útil para evitar parpadeo del contenido no compilado:
```vue
<template>
  <div v-cloak>
    {{ mensaje }}
  </div>
</template>

<style>
[v-cloak] {
  display: none;
}
</style>
```

## Composición de Componentes

### Componente de Ejemplo con Composition API
```vue
<template>
  <div>
    <h2>{{ titulo }}</h2>
    <p>Contador: {{ contador }}</p>
    <button @click="incrementar">Incrementar</button>
    <button @click="decrementar">Decrementar</button>
    <p>Doble: {{ dobleContador }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  titulo: {
    type: String,
    default: 'Contador'
  },
  valorInicial: {
    type: Number,
    default: 0
  }
})

// Estado reactivo
const contador = ref(props.valorInicial)


// Propiedad computada
const dobleContador = computed(() => contador.value * 2)


// Métodos
function incrementar() {
  contador.value++
  emit('incremento', contador.value)
}

function decrementar() {
  contador.value--
  emit('decremento', contador.value)
}

// Hooks de ciclo de vida
onMounted(() => {
  console.log('Componente montado')
})

// Emits
const emit = defineEmits(['incremento', 'decremento'])
</script>

<style scoped>
button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
```

## Buenas Prácticas

1. **Nombrado de componentes**: Usa nombres multi-palabra para evitar conflictos con elementos HTML.
   ```javascript
   // Mal
   export default {
     name: 'Button',
     // ...
   }
   
   // Bien
   export default {
     name: 'BaseButton',
     // ...
   }
   ```

2. **Props detalladas**: Especifica props con validación cuando sea posible.
   ```javascript
   props: {
     status: {
       type: String,
       required: true,
       validator: (value) => {
         return ['success', 'warning', 'danger'].includes(value)
       }
     }
   }
   ```

3. **Claves en v-for**: Siempre usa `:key` con `v-for`.
   ```vue
   <!-- Mal -->
   <li v-for="item in items">{{ item.text }}</li>
   
   <!-- Bien -->
   <li v-for="item in items" :key="item.id">
     {{ item.text }}
   </li>
   ```

4. **Estilos con scope**: Usa `<style scoped>` para estilos específicos del componente.

5. **Manejo de eventos**: Usa kebab-case para nombres de eventos personalizados.
   ```vue
   <!-- Componente hijo -->
   <button @click="$emit('guardar-cambios')">Guardar</button>
   
   <!-- Componente padre -->
   <mi-componente @guardar-cambios="guardarDatos" />
   ```

6. **Composición sobre herencia**: Prefiere la composición con `setup()` o `<script setup>` sobre la herencia de componentes.

7. **Manejo de errores**: Implementa manejo de errores en llamadas asíncronas.
   ```javascript
   async function cargarDatos() {
     try {
       const respuesta = await fetch('https://api.ejemplo.com/datos')
       if (!respuesta.ok) throw new Error('Error al cargar datos')
       datos.value = await respuesta.json()
     } catch (error) {
       console.error('Error:', error)
       estadoError.value = 'No se pudieron cargar los datos'
     }
   }
   ```

8. **Desacoplamiento**: Mantén los componentes pequeños y enfocados en una sola responsabilidad.

9. **Reutilización**: Extrae lógica repetitiva en composables.
   ```javascript
   // useContador.js
   import { ref, computed } from 'vue'
   
   export function useContador(valorInicial = 0) {
     const contador = ref(valorInicial)
     
     const incrementar = () => contador.value++
     const decrementar = () => contador.value--
     const resetear = () => contador.value = valorInicial
     
     const esPar = computed(() => contador.value % 2 === 0)
     
     return {
       contador,
       incrementar,
       decrementar,
       resetear,
       esPar
     }
   }
   ```

10. **Documentación**: Documenta props, eventos y slots en los componentes.

## Siguiente paso

¡Felicidades! Has completado la sección de Fundamentos de Vue 3. Ahora estás listo para avanzar a la siguiente sección, donde aprenderás sobre la creación y uso de componentes en Vue 3.

[Siguiente: Creación y Uso de Componentes →](../componentes/creacion.md)
