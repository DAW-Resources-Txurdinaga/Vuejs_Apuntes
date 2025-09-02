# 2.5 Manejo de Eventos

El manejo de eventos en Vue.js permite responder a las interacciones del usuario de manera declarativa. Vue proporciona la directiva `v-on` (o su atajo `@`) para escuchar eventos del DOM y ejecutar código JavaScript cuando ocurren.

## Conceptos Básicos

### Sintaxis Básica

```html
<template>
  <div>
    <!-- Usando v-on -->
    <button v-on:click="contador++">Contador: {{ contador }}</button>
    
    <!-- Usando el atajo @ -->
    <button @click="contador = 0">Reiniciar</button>
    
    <!-- Llamando a un método -->
    <button @click="saludar">Saludar</button>
    
    <!-- Con argumentos -->
    <button @click="saludarConNombre('Juan')">Saludar a Juan</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contador = ref(0);
const nombre = ref('Visitante');

function saludar() {
  alert(`¡Hola, ${nombre.value}!`);}

function saludarConNombre(nombre) {
  alert(`¡Hola, ${nombre}!`);
}
</script>
```

## Modificadores de Eventos

Vue proporciona modificadores de eventos para tareas comunes:

### 1. Modificadores de Evento

```html
<!-- El evento submit ya no recargará la página -->
<form @submit.prevent="enviarFormulario">
  <button type="submit">Enviar</button>
</form>

<!-- Detiene la propagación del evento -->
<div @click="alerta('div')">
  <button @click.stop="alerta('botón')">Haz clic</button>
</div>

<!-- El evento solo se activará una vez -->
<button @click.once="hacerAlgo">Solo una vez</button>

<!-- El evento solo se activará con el botón izquierdo -->
<button @click.left="izquierdo">Izquierdo</button>
```

### 2. Modificadores de Teclado

```html
<!-- Solo se activa con Enter -->
<input @keyup.enter="enviar" placeholder="Presiona Enter">

<!-- Con teclas específicas -->
<input 
  @keyup.enter="enviar"
  @keyup.esc="cancelar"
  @keyup.space="espacio"
  placeholder="Prueba Enter, Esc o Espacio"
>

<!-- Con códigos de tecla -->
<input @keyup.page-down="siguientePagina">

<!-- Combinación de teclas -->
<input @keyup.ctrl.enter="enviar" placeholder="Ctrl+Enter para enviar">
```

### 3. Modificadores del Ratón

```html
<button 
  @click.right.prevent="menuContextual"
  @click.middle="accionBotonMedio"
>
  Haz clic derecho o con la rueda
</button>
```

## Objeto de Evento Nativo

Puedes acceder al evento nativo del DOM usando la variable especial `$event` o usando una función flecha:

```html
<template>
  <div>
    <!-- Usando $event -->
    <button @click="mostrarMensaje('Hola', $event)">Saludar 1</button>
    
    <!-- Usando función flecha -->
    <button @click="(event) => mostrarMensaje('Hola', event)">Saludar 2</button>
    
    <!-- Con argumentos personalizados -->
    <button @click="(e) => enviarFormulario('usuario123', e)">
      Enviar formulario
    </button>
  </div>
</template>

<script setup>
function mostrarMensaje(mensaje, event) {
  console.log(event.target.tagName); // Muestra "BUTTON"
  alert(mensaje);
}

function enviarFormulario(usuarioId, event) {
  console.log(`Enviando formulario para el usuario: ${usuarioId}`);
  // Lógica para enviar el formulario
}
</script>
```

## Ejemplo Práctico: Juego de Memoria

Vamos a crear un juego de memoria que demuestre el manejo de eventos en Vue:

```html
<template>
  <div class="juego-memoria">
    <h1>Juego de Memoria</h1>
    
    <div class="controles">
      <button @click="iniciarJuego">
        {{ juegoIniciado ? 'Reiniciar' : 'Comenzar' }} Juego
      </button>
      <div class="puntuacion">
        <span>Pares encontrados: {{ paresEncontrados }}/{{ totalPares }}</span>
        <span>Intentos: {{ intentos }}</span>
      </div>
    </div>
    
    <div class="tablero" :class="{ 'juego-activo': juegoIniciado }">
      <div 
        v-for="(carta, index) in cartas" 
        :key="index"
        class="carta"
        :class="{ 
          'volteada': carta.volteada, 
          'encontrada': carta.encontrada 
        }"
        @click="voltearCarta(index)"
      >
        <div class="cara frontal">?</div>
        <div class="cara trasera">
          {{ carta.valor }}
        </div>
      </div>
    </div>
    
    <div v-if="juegoTerminado" class="mensaje-final">
      <h2>¡Has ganado! 🎉</h2>
      <p>Completaste el juego en {{ intentos }} intentos.</p>
      <button @click="iniciarJuego">Jugar de nuevo</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Estado del juego
const juegoIniciado = ref(false);
const juegoTerminado = ref(false);
const cartas = ref([]);
const intentos = ref(0);
const cartasVolteadas = ref([]);
const paresEncontrados = ref(0);

// Constantes
const totalPares = 8; // Número de pares en el juego
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮'];

// Propiedades computadas
const cartasRestantes = computed(() => {
  return cartas.value.filter(c => !c.encontrada).length;
});

// Inicializar el juego
function inicializarJuego() {
  // Crear pares de cartas
  const valores = [];
  const emojisAleatorios = [...emojis].sort(() => 0.5 - Math.random()).slice(0, totalPares);
  
  // Duplicar los emojis para hacer pares
  emojisAleatorios.forEach(emoji => {
    valores.push({ valor: emoji, id: Math.random() });
    valores.push({ valor: emoji, id: Math.random() });
  });
  
  // Barajar las cartas
  return valores.sort(() => 0.5 - Math.random());
}

// Iniciar o reiniciar el juego
function iniciarJuego() {
  const valoresCartas = inicializarJuego();
  
  cartas.value = valoresCartas.map(carta => ({
    ...carta,
    volteada: false,
    encontrada: false
  }));
  
  juegoIniciado.value = true;
  juegoTerminado.value = false;
  intentos.value = 0;
  paresEncontrados.value = 0;
  cartasVolteadas.value = [];
  
  // Voltear todas las cartas al inicio por 2 segundos
  cartas.value.forEach(carta => {
    carta.volteada = true;
  });
  
  setTimeout(() => {
    cartas.value.forEach(carta => {
      carta.volteada = false;
    });
  }, 2000);
}

// Voltear una carta
function voltearCarta(index) {
  const carta = cartas.value[index];
  
  // No hacer nada si la carta ya está volteada o encontrada
  if (carta.volteada || carta.encontrada || cartasVolteadas.value.length >= 2) {
    return;
  }
  
  // Voltear la carta
  carta.volteada = true;
  cartasVolteadas.value.push(index);
  
  // Si hay dos cartas volteadas, verificar si hacen par
  if (cartasVolteadas.value.length === 2) {
    intentos.value++;
    const [primera, segunda] = cartasVolteadas.value;
    
    if (cartas.value[primera].valor === cartas.value[segunda].valor) {
      // Encontraron un par
      cartas.value[primera].encontrada = true;
      cartas.value[segunda].encontrada = true;
      cartasVolteadas.value = [];
      paresEncontrados.value++;
      
      // Verificar si el juego ha terminado
      if (paresEncontrados.value === totalPares) {
        juegoTerminado.value = true;
      }
    } else {
      // No son iguales, voltear de nuevo después de un tiempo
      setTimeout(() => {
        cartas.value[primera].volteada = false;
        cartas.value[segunda].volteada = false;
        cartasVolteadas.value = [];
      }, 1000);
    }
  }
}

// Iniciar el juego al cargar el componente
onMounted(() => {
  // Opcional: Iniciar automáticamente
  // iniciarJuego();
});
</script>

<style scoped>
.juego-memoria {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

.controles {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #369f6b;
}

.puntuacion {
  display: flex;
  gap: 20px;
  font-size: 1.1em;
}

.tablero {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.3s;
}

.tablero.juego-activo {
  opacity: 1;
  pointer-events: auto;
}

.carta {
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
}

.carta .cara {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  border-radius: 8px;
  transition: transform 0.5s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.carta .frontal {
  background-color: #42b983;
  color: white;
  transform: rotateY(0deg);
}

.carta .trasera {
  background-color: white;
  transform: rotateY(180deg);
}

.carta.volteada .frontal {
  transform: rotateY(180deg);
}

.carta.volteada .trasera {
  transform: rotateY(0deg);
}

.carta.encontrada {
  opacity: 0.5;
  cursor: default;
}

.mensaje-final {
  margin-top: 30px;
  padding: 20px;
  background-color: #e8f5e9;
  border-radius: 8px;
  animation: aparecer 0.5s ease-out;
}

@keyframes aparecer {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 600px) {
  .tablero {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .carta .cara {
    font-size: 2em;
  }
  
  .controles {
    flex-direction: column;
  }
}
</style>
```

## Preguntas de Repaso

1. ¿Cuál es la diferencia entre `v-on:click` y `@click`?
2. ¿Para qué sirve el modificador `.prevent` en un evento de formulario?
3. ¿Cómo evitarías que un evento se propague a elementos padres?
4. ¿Qué es el objeto `$event` en Vue y cuándo es útil?
5. ¿Cómo manejarías la combinación de teclas como Ctrl+Clic?

## Recursos Adicionales

- [Documentación oficial de Manejo de Eventos](https://vuejs.org/guide/essentials/event-handling.html)
- [Guía de Modificadores de Eventos](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers)
- [Eventos de Teclado en Vue](https://vuejs.org/guide/essentials/event-handling.html#key-modifiers)

## Siguiente paso

Ahora que has aprendido sobre el manejo de eventos, el siguiente paso es explorar el ciclo de vida de los componentes en Vue.

[Siguiente: Ciclo de Vida de la Instancia →](ciclo-vida.md)
