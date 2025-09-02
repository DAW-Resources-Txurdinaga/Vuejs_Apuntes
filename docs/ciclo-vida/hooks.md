En Vue 3, el ciclo de vida de una instancia es el conjunto de etapas por las que pasa un componente desde su creación hasta su destrucción. Durante este ciclo, Vue ejecuta ciertas funciones en momentos específicos para permitir que el desarrollador ejecute código en diferentes fases del ciclo de vida del componente.

El ciclo de vida de un componente en Vue 3 se basa en hooks (ganchos o funciones) que puedes sobrescribir para ejecutar lógica personalizada. A continuación te explico las principales etapas y hooks del ciclo de vida de una instancia en Vue 3:

### 1. **Creación del Componente**
   Cuando se crea una instancia de Vue, el componente pasa por varias fases de inicialización.

   - **`beforeCreate`**  
     Este hook se ejecuta **antes** de que se inicialicen los datos de la instancia y antes de que se configure el `reactive` (reactividad). Aquí no puedes acceder a `data`, `computed`, o a los métodos.
     
```js     
      beforeCreate() {
            console.log('beforeCreate');
          }
```

   - **`created`**  
     Este hook se ejecuta después de que los datos y eventos hayan sido inicializados, pero **antes de que el DOM** haya sido renderizado. En este momento, puedes acceder a los datos, métodos, y propiedades computadas de la instancia.
     
```js     
     created() {
       console.log('created');
     }
```

### 2. **Montaje del Componente**
   Es cuando la instancia se monta en el DOM. Aquí es donde la interfaz de usuario se empieza a renderizar.

   - **`beforeMount`**  
     Este hook se ejecuta **justo antes de que el componente sea montado en el DOM**. En este punto, el DOM aún no está actualizado, pero el template está preparado.
     
```js     
     beforeMount() {
       console.log('beforeMount');
     }
```

   - **`mounted`**  
     Este hook se ejecuta después de que el componente ha sido **montado** y el DOM ha sido actualizado. Aquí ya puedes interactuar con el DOM, hacer peticiones a servidores, etc.
     
```js     
     mounted() {
       console.log('mounted');
     }
```

### 3. **Actualización del Componente**
   Durante el ciclo de vida de un componente, cuando cambian sus datos reactivos, Vue actualiza el DOM para reflejar esos cambios. Durante este proceso, se activan los siguientes hooks:

   - **`beforeUpdate`**  
     Este hook se ejecuta **antes de que el DOM sea actualizado** debido a un cambio reactivo. Te permite hacer algo antes de que los cambios se reflejen en el DOM.
     
```js
      beforeUpdate() {
        console.log('beforeUpdate');
      }
```

   - **`updated`**  
     Este hook se ejecuta después de que el DOM ha sido actualizado con los cambios reactivos. Aquí puedes hacer alguna lógica que dependa de los cambios en el DOM.
     
```js     
     updated() {
       console.log('updated');
     }
```

### 4. **Destrucción del Componente**
   Cuando una instancia de Vue es destruida, ya sea porque se ha desasociado de la vista o se ha eliminado del DOM, se ejecutan los siguientes hooks.

   - **`beforeUnmount`**  
     Este hook se ejecuta **antes de que el componente sea destruido**. Es útil para limpiar recursos, cancelar suscripciones o eventos antes de que el componente deje de existir.
     
```js     
     beforeUnmount() {
       console.log('beforeUnmount');
     }
```

   - **`unmounted`**  
     Este hook se ejecuta **después de que el componente ha sido destruido** y el DOM ha sido limpiado. Aquí puedes realizar la limpieza final, como desuscribirte de eventos o detener procesos asíncronos.
     
```js     
     unmounted() {
       console.log('unmounted');
     }
```

### Ciclo de Vida Completo en Vue 3 (Resumen)
1. **`beforeCreate`** → Se ejecuta primero.
2. **`created`** → La instancia está lista, pero aún no hay DOM.
3. **`beforeMount`** → Justo antes de que se inserte en el DOM.
4. **`mounted`** → El componente ha sido montado en el DOM.
5. **`beforeUpdate`** → Antes de una actualización reactiva.
6. **`updated`** → Después de la actualización reactiva.
7. **`beforeUnmount`** → Antes de que el componente se destruya.
8. **`unmounted`** → Después de que el componente se destruya.

### 5. **Otros Hooks:**

   - **`errorCaptured`**: Este hook se ejecuta cuando ocurre un error en cualquier componente hijo. Puedes manejar errores de manera global y evitar que se propaguen.
   - **`activated` y `deactivated`**: Estos hooks son utilizados en componentes dentro de un `<keep-alive>`. Se activan cuando el componente es activado o desactivado (no destruido, solo puesto en segundo plano).

### Ejemplo Completo de un Componente Vue 3:

```js
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hola, Vue 3!'
    };
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeUnmount() {
    console.log('beforeUnmount');
  },
  unmounted() {
    console.log('unmounted');
  }
};
</script>
```

Este componente te mostraría los mensajes de consola correspondientes a cada uno de los hooks en el ciclo de vida.


