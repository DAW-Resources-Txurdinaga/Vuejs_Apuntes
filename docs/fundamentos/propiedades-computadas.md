# 2.4 Propiedades Computadas

Las propiedades computadas son valores que se calculan automáticamente basados en otras propiedades reactivas. Son ideales para realizar operaciones complejas o filtrar datos de manera eficiente.

## Conceptos Básicos

### ¿Qué es una propiedad computada?

Una propiedad computada es una función que devuelve un valor basado en otras propiedades reactivas. Vue se encarga automáticamente de rastrear sus dependencias y volver a calcular el valor cuando sea necesario.

### Sintaxis Básica

```html
<template>
  <div>
    <p>Nombre completo: {{ nombreCompleto }}</p>
    <p>Nombre en mayúsculas: {{ nombreEnMayusculas }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const nombre = ref('Ana');
const apellido = ref('García');

// Propiedad computada básica
const nombreCompleto = computed(() => {
  return `${nombre.value} ${apellido.value}`;
});

// Propiedad computada que depende de otra propiedad computada
const nombreEnMayusculas = computed(() => {
  return nombreCompleto.value.toUpperCase();
});
</script>
```

## Características Principales

### 1. Caché Automático

Las propiedades computadas almacenan en caché sus resultados y solo se vuelven a calcular cuando alguna de sus dependencias reactivas cambia.

**Ejemplo de caché:**

```javascript
const ahora = computed(() => {
  // Esta propiedad se recalculará solo cuando se acceda a ella
  // y alguna de sus dependencias haya cambiado
  return new Date().toLocaleTimeString();
});
```

### 2. Propiedades Computadas de Solo Lectura

Por defecto, las propiedades computadas son de solo lectura. Si necesitas una propiedad computada escribible, puedes proporcionar un getter y un setter.

```javascript
const nombreCompleto = computed({
  // getter
  get() {
    return `${nombre.value} ${apellido.value}`;
  },
  // setter
  set(nuevoValor) {
    const [nuevoNombre, ...apellidos] = nuevoValor.split(' ');
    nombre.value = nuevoNombre;
    apellido.value = apellidos.join(' ');
  }
});

// Ahora puedes hacer:
// nombreCompleto.value = 'Carlos Ruiz Zafón';
```

### 3. Buenas Prácticas

1. **Evitar efectos secundarios**: Las propiedades computadas no deben tener efectos secundarios. No hagas peticiones asíncronas ni modifiques el DOM dentro de ellas.

2. **No modificar datos**: No modifiques el estado dentro de una propiedad computada. Usa métodos o watchers para eso.

3. **Mantén la simplicidad**: Si una propiedad computada se vuelve demasiado compleja, considera dividirla en propiedades computadas más pequeñas.

## Ejemplo Práctico: Carrito de Compras

```html
<template>
  <div class="carrito">
    <h2>Carrito de Compras</h2>
    
    <div v-for="item in items" :key="item.id" class="item">
      <span>{{ item.nombre }}</span>
      <input 
        type="number" 
        v-model.number="item.cantidad" 
        min="1"
        @change="actualizarCantidad(item)"
      >
      <span>{{ formatPrecio(item.precio * item.cantidad) }}</span>
      <button @click="eliminarItem(item.id)">🗑️</button>
    </div>
    
    <div class="totales">
      <p>Subtotal: {{ formatPrecio(subtotal) }}</p>
      <p>IVA (21%): {{ formatPrecio(iva) }}</p>
      <p class="total">Total: {{ formatPrecio(total) }}</p>
    </div>
    
    <div v-if="ofertaEspecial" class="oferta">
      🎉 ¡Enhorabuena! Tienes un descuento especial de {{ descuento * 100 }}%
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Datos del carrito
const items = ref([
  { id: 1, nombre: 'Camiseta Vue.js', precio: 24.99, cantidad: 2 },
  { id: 2, nombre: 'Libro de Vue 3', precio: 39.99, cantidad: 1 },
  { id: 3, nombre: 'Taza de café', precio: 12.99, cantidad: 3 },
]);

const ivaPorcentaje = 0.21;

// Propiedades computadas
const subtotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + (item.precio * item.cantidad);
  }, 0);
});

const iva = computed(() => {
  return subtotal.value * ivaPorcentaje;
});

const total = computed(() => {
  return subtotal.value + iva.value - descuentoAplicado.value;
});

const cantidadTotal = computed(() => {
  return items.value.reduce((total, item) => total + item.cantidad, 0);
});

const ofertaEspecial = computed(() => {
  return cantidadTotal.value >= 5;
});

const descuento = computed(() => {
  return ofertaEspecial.value ? 0.15 : 0;
});

const descuentoAplicado = computed(() => {
  return subtotal.value * descuento.value;
});

// Métodos
function formatPrecio(valor) {
  return `$${valor.toFixed(2)}`;
}

function eliminarItem(id) {
  items.value = items.value.filter(item => item.id !== id);
}

function actualizarCantidad(item) {
  if (item.cantidad < 1) {
    item.cantidad = 1;
  }
}
</script>

<style scoped>
.carrito {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.item input {
  width: 60px;
  padding: 5px;
  text-align: center;
}

.totales {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 4px;
}

.total {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}

.oferta {
  margin-top: 15px;
  padding: 10px;
  background-color: #e6f7e6;
  color: #2e7d32;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

button {
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #cc0000;
}
</style>
```

## Preguntas de Repaso

1. ¿Cuál es la principal diferencia entre un método y una propiedad computada?
2. ¿Cuándo se vuelve a calcular una propiedad computada?
3. ¿Por qué es importante que las propiedades computadas no tengan efectos secundarios?
4. ¿Cómo crearías una propiedad computada escribible?
5. ¿Qué ventaja tiene el caché de las propiedades computadas?

## Recursos Adicionales

- [Documentación oficial de Propiedades Computadas](https://vuejs.org/guide/essentials/computed.html)
- [Guía de Reactividad en Profundidad](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Vue Mastery: Propiedades Computadas](https://www.vuemastery.com/courses/vue-3-essentials/computed-properties)

## Siguiente paso

Ahora que has aprendido sobre las propiedades computadas, el siguiente paso es aprender sobre el manejo de eventos en Vue.

[Siguiente: Manejo de Eventos →](eventos.md)
