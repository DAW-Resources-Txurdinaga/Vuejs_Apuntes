# 1.1 Introducción a Vue.js

## ¿Qué es Vue.js?

Vue (pronunciado /vjuː/, como view) es un framework progresivo para construir interfaces de usuario. A diferencia de otros frameworks monolíticos, Vue está diseñado desde cero para ser adoptable de forma incremental.

## Características principales

- **Reactivo**: Actualiza automáticamente la vista cuando cambian los datos
- **Componentes**: Permite crear elementos HTML personalizados y reutilizables
- **Fácil de aprender**: Sintaxis sencilla basada en HTML y JavaScript
- **Flexible**: Se puede integrar progresivamente en proyectos existentes

## Ejemplo básico

### Opción 1: Como archivo HTML estándar

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mi Primera App Vue</title>
  <!-- Importar Vue 3 desde CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h1>{{ mensaje }}</h1>
    <button @click="cambiarMensaje">Cambiar mensaje</button>
  </div>

  <script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const mensaje = ref('¡Hola Vue 3!')
      
      function cambiarMensaje() {
        mensaje.value = '¡Mensaje cambiado!'
      }
      
      return {
        mensaje,
        cambiarMensaje
      }
    }
  }).mount('#app')
  </script>
</body>
</html>
```

### Opción 2: Como Componente de un Solo Archivo (SFC) de Vue

```vue
<template>
  <div>
    <h1>{{ mensaje }}</h1>
    <button @click="cambiarMensaje">Cambiar mensaje</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const mensaje = ref('¡Hola Vue 3!')
    
    function cambiarMensaje() {
      mensaje.value = '¡Mensaje cambiado!'
    }
    
    return {
      mensaje,
      cambiarMensaje
    }
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### Cómo probar cada opción:

#### Para la Opción 1 (HTML estándar):
1. Copia todo el código de la Opción 1
2. Guárdalo como `index.html`
3. Ábrelo directamente en tu navegador

#### Para la Opción 2 (SFC):

1. **En Vue Playground**:

    - Ve a [Vue Playground](https://play.vuejs.org/)
    - Reemplaza el contenido de `App.vue` con el código de la Opción 2

2. **En StackBlitz**:

    - Crea un nuevo proyecto Vue en [StackBlitz](https://stackblitz.com/edit/vue-afbpxwxy?file=src%2FApp.vue)
    - Reemplaza el contenido de `App.vue` con el código de la Opción 2

3. **En un proyecto local**:

    - Crea un archivo `MiComponente.vue` con el código de la Opción 2
    - Asegúrate de tener configurado Vue CLI o Vite con soporte para archivos `.vue`

## Ejercicio práctico: Tu primera aplicación Vue

En este ejercicio, crearás tu primera aplicación Vue desde cero. Sigue estos pasos detallados:

### Objetivos
- Crear un archivo HTML básico con Vue 3
- Entender la estructura básica de una aplicación Vue
- Experimentar con la reactividad de Vue

### Pasos a seguir

1. **Prepara tu entorno de trabajo**

    - Abre tu editor de código favorito (VS Code, Sublime Text, etc.)
    - Crea una nueva carpeta para este proyecto

2. **Crea un nuevo archivo**

    - Crea un archivo llamado `hola-vue.html`
    - Copia y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Primera App Vue</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        #app {
            text-align: center;
            margin-top: 50px;
        }
        button {
            background-color: #42b983;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #3aa876;
        }
    </style>
</head>
<body>
    <!-- Contenedor principal de la aplicación -->
    <div id="app">
        <h1>{{ mensaje }}</h1>
        <button @click="cambiarMensaje">
            {{ textoBoton }}
        </button>
    </div>

    <!-- Incluye Vue 3 desde CDN -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    
    <script>
    // Código JavaScript de la aplicación
    const { createApp, ref } = Vue;

    // Crea la aplicación Vue
    const app = createApp({
        // setup() es donde definimos la lógica del componente
        setup() {
            // Variables reactivas
            const mensaje = ref('¡Hola Vue 3!');
            const textoBoton = ref('Haz clic para cambiar el mensaje');
            
            // Función que se ejecuta al hacer clic en el botón
            function cambiarMensaje() {
                mensaje.value = '¡Has cambiado el mensaje con éxito!';
                textoBoton.value = '¡Mensaje cambiado!';
            }
            
            // Exponemos las variables y funciones al template
            return {
                mensaje,
                textoBoton,
                cambiarMensaje
            };
        }
    });

    // Monta la aplicación en el elemento con id="app"
    app.mount('#app');
    </script>
</body>
</html>
```

1. **Guarda y abre el archivo**

    - Guarda el archivo con el nombre `hola-vue.html`
    - Abre el archivo en tu navegador web (puedes hacer doble clic en él)

### ¿Qué deberías ver?

- Un título que dice "¡Hola Vue 3!"
- Un botón verde que dice "Haz clic para cambiar el mensaje"
- Al hacer clic en el botón, el texto del título y el botón cambiarán

### Experimenta y aprende

Una vez que hayas visto la aplicación en acción, intenta hacer los siguientes cambios:

1. **Modifica el mensaje inicial**:

    - Cambia el texto de `'¡Hola Vue 3!'` por otro mensaje
    - Recarga la página para ver los cambios

2. **Personaliza el botón**:

    - Cambia el color de fondo del botón modificando el valor de `background-color` en el CSS
    - Ajusta el tamaño del texto o el padding

3. **Añade un contador**:

    - Agrega una variable `contador` usando `const contador = ref(0)`
    - Crea un botón que incremente el contador cada vez que se haga clic
    - Muestra el valor del contador en la página usando `{{ contador }}`

4. **Añade un campo de entrada**:

    - Agrega un `<input v-model="nombre">` al HTML
    - Crea una variable `nombre` en el `setup()`
    - Muestra un mensaje personalizado que incluya el nombre ingresado

## Preguntas de repaso

1. ¿Qué significa que Vue sea un framework "progresivo"?
2. ¿Qué ventaja tiene que Vue use una sintaxis basada en HTML?
3. En el ejemplo mostrado, ¿qué ocurre cuando haces clic en el botón "Cambiar mensaje"?
4. ¿Qué función cumple el método `mount('#app')` en el código de ejemplo?

## Recursos adicionales

- [Documentación oficial de Vue 3](https://v3.vuejs.org/)
- [Vue Mastery - Curso gratuito](https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/)

[Siguiente: Tu primera aplicación →](primer-ejemplo.md)
