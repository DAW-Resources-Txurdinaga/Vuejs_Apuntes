# 2.1 Interpolación y Directivas Básicas

## Interpolación de Texto

La forma más básica de enlazar datos es usando la sintaxis de interpolación de texto (llamada "Mustache" por las llaves `{{ }}`):

```html
<div id="app">
  <p>Mensaje: {{ mensaje }}</p>
  <p>Resultado: {{ numero * 2 }}</p>
  <p>¿Es mayor de edad? {{ edad >= 18 ? 'Sí' : 'No' }}</p>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    return {
      mensaje: 'Hola Vue!',
      numero: 5,
      edad: 20
    };
  }
}).mount('#app');
</script>
```

## Directiva v-text

Alternativa a la interpolación `{{ }}`:

```html
<p v-text="'Hola ' + nombre"></p>
```

## Directiva v-html

Para insertar HTML sin escapar:

```html
<div v-html="htmlEnBruto"></div>

<script>
// En el setup:
const htmlEnBruto = ref('<span style="color: red">Texto en rojo</span>');
</script>
```

## Directiva v-bind

Para enlazar atributos HTML:

```html
<div v-bind:class="{ activo: esActivo }">
  Contenido dinámico
</div>

<!-- Forma abreviada con : -->
<img :src="urlImagen" :alt="textoAlternativo">
```

## Ejercicio Práctico

Crea un componente que muestre una tarjeta de perfil con:
1. Nombre y apellido interpolados
2. Una imagen con v-bind
3. Una descripción que acepte HTML
4. Un indicador de estado (activo/inactivo)

```html
<div id="app">
  <div class="perfil" :class="{ 'activo': usuario.activo }">
    <img :src="usuario.foto" :alt="'Foto de ' + usuario.nombre">
    <h2>{{ usuario.nombre }} {{ usuario.apellido }}</h2>
    <div v-html="usuario.descripcion"></div>
    <p>Estado: {{ usuario.activo ? 'Activo' : 'Inactivo' }}</p>
  </div>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const usuario = ref({
      nombre: 'Ana',
      apellido: 'García',
      foto: 'https://via.placeholder.com/150',
      descripcion: 'Desarrolladora <strong>frontend</strong> con experiencia en Vue',
      activo: true
    });

    return { usuario };
  }
}).mount('#app');
</script>
```

## Preguntas de Repaso
1. ¿Cuál es la diferencia entre `{{ }}` y `v-text`?
2. ¿Por qué es importante usar `v-html` con precaución?
3. ¿Qué ventaja tiene usar la forma abreviada `:` para `v-bind`?

En la siguiente sección veremos `v-model` para formularios.

[Siguiente: V-bind y V-model →](vbind-vmodel.md)
