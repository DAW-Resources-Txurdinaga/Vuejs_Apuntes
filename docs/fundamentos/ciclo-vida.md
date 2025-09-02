# Ciclo de Vida de una Instancia Vue

El ciclo de vida de una instancia Vue es un concepto fundamental que todo desarrollador debe comprender para crear aplicaciones robustas y eficientes. Este ciclo define una serie de etapas por las que pasa cada componente Vue, desde su creación hasta su destrucción.

## Hooks del Ciclo de Vida

Vue proporciona una serie de "hooks" (ganchos) que nos permiten ejecutar código en momentos específicos del ciclo de vida del componente. Los hooks más importantes son:

### 1. Creación
- **beforeCreate**: Se ejecuta justo después de inicializar la instancia, antes de la inyección de reactividad.
- **created**: Se llama después de que la instancia ha sido creada. En este punto, las propiedades reactivas, computed properties, métodos y watchers ya están configurados.

### 2. Montaje en el DOM
- **beforeMount**: Se ejecuta justo antes de que el componente se monte en el DOM.
- **mounted**: Se llama después de que el componente ha sido montado en el DOM. En este punto, puedes acceder al DOM a través de `this.$el`.

### 3. Actualización
- **beforeUpdate**: Se ejecuta cuando los datos cambian, antes de que el DOM sea actualizado.
- **updated**: Se llama después de que el DOM ha sido actualizado en respuesta a cambios en los datos.

### 4. Desmontaje
- **beforeUnmount**: Se ejecuta justo antes de que el componente sea desmontado.
- **unmounted**: Se llama después de que el componente ha sido desmontado.

## Diagrama del Ciclo de Vida

```
Nuevo componente Vue
      │
      ▼
┌─────────────┐
│ beforeCreate │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   created   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ beforeMount │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   mounted   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Datos actuales? │───Sí──► beforeUpdate ─► updated
└─────────────────┘   │
       No             │
       │             ▼
       │       ┌─────────────┐
       │       │  updated    │
       │       └─────────────┘
       │             │
       ▼             ▼
┌─────────────┐     │
│ beforeUnmount│◄────┘
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  unmounted  │
└─────────────┘
```

## Ejemplo Práctico

```javascript
export default {
  data() {
    return {
      mensaje: 'Hola Vue!'
    }
  },
  beforeCreate() {
    console.log('Antes de crear la instancia');
    // this.mensaje no está disponible aún
  },
  created() {
    console.log('Instancia creada');
    // this.mensaje está disponible
  },
  beforeMount() {
    console.log('Antes de montar el componente');
  },
  mounted() {
    console.log('Componente montado en el DOM');
    // Acceso al DOM con this.$el
  },
  beforeUpdate() {
    console.log('Antes de actualizar el DOM');
  },
  updated() {
    console.log('DOM actualizado');
  },
  beforeUnmount() {
    console.log('Antes de desmontar el componente');
  },
  unmounted() {
    console.log('Componente desmontado');
  }
}
```

## Cuándo Usar Cada Hook

- **created**: Ideal para realizar peticiones AJAX o configuraciones iniciales que no requieran acceso al DOM.
- **mounted**: Perfecto para operaciones que necesitan acceso al DOM o para inicializar bibliotecas de terceros.
- **updated**: Útil para operaciones que deben realizarse después de que el DOM se ha actualizado en respuesta a cambios en los datos.
- **beforeUnmount**: Ideal para limpiar temporizadores, cancelar peticiones o limpiar suscripciones a eventos.

## Consejos de Rendimiento

1. Evita realizar operaciones síncronas pesadas en `created` o `mounted` que puedan bloquear el hilo principal.
2. Usa `nextTick` si necesitas esperar a que Vue termine de actualizar el DOM después de un cambio de datos.
3. Siempre limpia los event listeners y timers en `beforeUnmount` para evitar fugas de memoria.

## Ejercicio Práctico

Crea un componente que:
1. Muestre un contador que se incrementa cada segundo
2. Registre en consola cada etapa del ciclo de vida
3. Permita pausar/reanudar el contador
4. Se limpie correctamente cuando sea desmontado

```vue
<template>
  <div>
    <h2>Contador: {{ contador }}</h2>
    <button @click="alternarPausa">
      {{ pausado ? 'Reanudar' : 'Pausar' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contador: 0,
      intervalo: null,
      pausado: false
    }
  },
  created() {
    console.log('Componente creado');
  },
  mounted() {
    console.log('Componente montado');
    this.iniciarContador();
  },
  beforeUnmount() {
    console.log('Antes de desmontar');
    this.limpiarContador();
  },
  methods: {
    iniciarContador() {
      this.intervalo = setInterval(() => {
        if (!this.pausado) {
          this.contador++;
        }
      }, 1000);
    },
    limpiarContador() {
      if (this.intervalo) {
        clearInterval(this.intervalo);
        this.intervalo = null;
      }
    },
    alternarPausa() {
      this.pausado = !this.pausado;
    }
  }
}
</script>
```

## Preguntas Frecuentes

**¿Cuál es la diferencia entre `created` y `mounted`?**
- `created` se llama cuando la instancia ha sido creada pero aún no se ha montado en el DOM.
- `mounted` se llama después de que el componente ha sido insertado en el DOM.

**¿Cuándo debo usar `beforeUnmount`?**
Usa `beforeUnmount` para limpiar cualquier recurso que pueda causar fugas de memoria, como:
- Temporizadores con `setTimeout` o `setInterval`
- Suscripciones a eventos globales
- Conexiones WebSocket
- Cualquier otro recurso que necesite ser liberado

**¿Puedo usar async/await en los hooks del ciclo de vida?**
Sí, pero ten en cuenta que el ciclo de vida continuará ejecutándose sin esperar a que se resuelva la promesa. Si necesitas esperar a que se complete una operación asíncrona, considera usar `onMounted` de la Composition API o manejar la lógica asíncrona de otra manera.

## Siguiente paso

Ahora que has aprendido sobre el ciclo de vida de los componentes en Vue, el siguiente paso es revisar la hoja de referencia rápida que resume los conceptos fundamentales de Vue que hemos cubierto hasta ahora.

[Siguiente: Hoja de Referencia Rápida →](cheat-sheet.md)
