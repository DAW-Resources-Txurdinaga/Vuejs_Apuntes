# 📝 Sintaxis de Plantillas en Vue 3

La sintaxis de plantillas de Vue es una extensión del HTML que te permite vincular de forma declarativa el DOM renderizado con los datos de la instancia de Vue. Todas las plantillas de Vue son HTML válido que puede ser analizado por navegadores y analizadores HTML compatibles con las especificaciones.

## Interpolación de Texto

La forma más básica de vinculación de datos es la interpolación de texto usando la sintaxis de doble llave (también conocida como "Mustache"):

```html
<span>Mensaje: {{ msg }}</span>
```

## Directivas

Las directivas son atributos especiales con el prefijo `v-`. Proporcionan efectos secundarios en el DOM cuando cambia el valor de su expresión.

### v-bind

Vincula dinámicamente uno o más atributos o propiedades de un componente:

```html
<div v-bind:id="dynamicId"></div>
<!-- Forma abreviada -->
<div :id="dynamicId"></div>
```

### v-model

Crea un enlace bidireccional en un elemento de formulario o un componente:

```html
<input v-model="message" placeholder="Edítame">
<p>El mensaje es: {{ message }}</p>
```

### v-if, v-else-if, v-else

Renderiza condicionalmente un elemento basado en la veracidad del valor de la expresión:

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else>
  Ni A ni B
</div>
```

### v-for

Renderiza el elemento o bloque de plantilla múltiples veces según el origen de los datos:

```html
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</ul>
```

### v-on

Adjunta un detector de eventos al elemento:

```html
<button v-on:click="increment">Incrementar</button>
<!-- Forma abreviada -->
<button @click="increment">Incrementar</button>
```

## Atributos Dinámicos

Puedes usar una expresión de JavaScript en un argumento de directiva encerrándolo en corchetes:

```html
<button :[key]="value"></button>
```

## Expresiones JavaScript

Dentro de todas las vinculaciones de datos, Vue.js admite expresiones JavaScript completas:

```html
{{ number + 1 }}
{{ ok ? 'SÍ' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="'list-' + id"></div>
```

## Directivas Personalizadas

Puedes registrar directivas personalizadas para manipular directamente el DOM:

```javascript
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  }
})
```

```html
<p v-highlight="'red'">¡Este texto se resaltará en rojo!</p>
```

## Componentes Dinámicos

Puedes alternar dinámicamente entre componentes usando el elemento `<component>` con el atributo `is`:

```html
<component :is="currentComponent"></component>
```

## Próximos pasos

Ahora que has aprendido sobre la sintaxis de plantillas de Vue, en la siguiente sección profundizaremos en el sistema de reactividad de Vue 3.

[👉 Siguiente: Reactividad en Vue 3](./reactividad.md)
