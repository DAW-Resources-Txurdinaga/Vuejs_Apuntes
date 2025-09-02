# 🔄 Reactividad en Vue 3

La reactividad es uno de los conceptos más poderosos de Vue. Es el sistema que permite a Vue rastrear cambios en los datos y actualizar automáticamente la vista cuando estos cambian.

## Fundamentos de la Reactividad

En Vue 3, la reactividad se ha rediseñado completamente utilizando los Proxies de JavaScript, lo que proporciona un mejor rendimiento y más capacidades.

### `ref()`

`ref` se utiliza para crear una referencia reactiva a un valor primitivo o a un objeto:

```javascript
import { ref } from 'vue'

const count = ref(0)

console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### `reactive()`

`reactive` crea un objeto reactivo. A diferencia de `ref`, no es necesario usar `.value` para acceder a sus propiedades:

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue 3'
})

console.log(state.count) // 0
state.count++
```

## `ref` vs `reactive`

| Característica | `ref` | `reactive` |
|----------------|-------|------------|
| Tipo de datos | Cualquier tipo | Solo objetos |
| Acceso a valores | Requiere `.value` | Acceso directo |
| Reactividad | Reactivo en `.value` | Reactivo en propiedades |
| Reemplazo de objeto | Se puede reemplazar | No se puede reemplazar directamente |

## Desestructuración Reactiva

Al desestructurar un objeto reactivo, se pierde la reactividad. Para mantenerla, usa `toRefs`:

```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue 3'
})

// ❌ Pierde reactividad
const { count, name } = state

// ✅ Mantiene la reactividad
const { count, name } = toRefs(state)
```

## `computed`

Las propiedades computadas te permiten declarar valores que dependen de otros valores de forma reactiva:

```javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

console.log(doubleCount.value) // 0
count.value++
console.log(doubleCount.value) // 2
```

## `watch` y `watchEffect`

### `watch`

Observa una o varias fuentes de datos reactivas y ejecuta una función de devolución de llamada cuando cambian:

```javascript
import { ref, watch } from 'vue'

const count = ref(0)

const name = ref('Vue')

watch(count, (newValue, oldValue) => {
  console.log(`count cambió de ${oldValue} a ${newValue}`)
})

// Observar múltiples fuentes
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count o name cambiaron')
})
```

### `watchEffect`

Ejecuta un efecto que rastrea automáticamente sus dependencias reactivas y las vuelve a ejecutar cuando cambian:

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)

const doubleCount = ref(0)


watchEffect(() => {
  doubleCount.value = count.value * 2
  console.log(`El doble es: ${doubleCount.value}`)
})

count.value++ // Registra: "El doble es: 2"
```

## Reactividad Avanzada

### `shallowRef` y `shallowReactive`

Versiones de `ref` y `reactive` que no realizan un seguimiento profundo de los cambios:

```javascript
import { shallowRef, shallowReactive } from 'vue'

const state = shallowReactive({
  nested: {
    count: 0 // No es reactivo
  }
})

const shallowCount = shallowRef({ count: 0 })
```

### `readonly`

Crea un proxy de solo lectura para un objeto reactivo o ref:

```javascript
import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })
const copy = readonly(original)

// Advertencia: No se puede modificar una propiedad de solo lectura
copy.count++
```

## Próximos pasos

Ahora que entiendes los fundamentos de la reactividad en Vue 3, estás listo para aprender sobre la creación y composición de componentes.

[👉 Siguiente: Creación de Componentes](../componentes/creacion.md)
