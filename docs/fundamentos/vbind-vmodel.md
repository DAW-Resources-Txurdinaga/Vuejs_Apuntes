# 2.2 v-bind y v-model

## v-bind en profundidad

La directiva `v-bind` (o su forma abreviada `:`) nos permite enlazar dinámicamente atributos HTML o propiedades de componentes.

### Uso básico:

```html
<!-- Sintaxis completa -->
<a v-bind:href="url">Enlace</a>

<!-- Forma abreviada -->
<a :href="url">Enlace</a>
```

### Enlazando clases y estilos:

```html
<!-- Clases dinámicas -->
<div :class="{ activo: esActivo, 'texto-rojo': tieneError }"></div>

<!-- Estilos en línea -->
<div :style="{ color: colorTexto, fontSize: tamanoFuente + 'px' }"></div>
```

## v-model - Enlace bidireccional

`v-model` crea un enlace bidireccional en elementos de formulario.

### Con inputs básicos:

```html
<div id="app">
  <input v-model="mensaje" placeholder="Escribe algo">
  <p>El mensaje es: {{ mensaje }}</p>
  
  <select v-model="seleccionado">
    <option disabled value="">Selecciona una opción</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Seleccionaste: {{ seleccionado }}</p>
  
  <input type="checkbox" id="checkbox" v-model="verificado">
  <label for="checkbox">{{ verificado ? 'Activado' : 'Desactivado' }}</label>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const mensaje = ref('');
    const seleccionado = ref('');
    const verificado = ref(false);
    
    return { mensaje, seleccionado, verificado };
  }
}).mount('#app');
</script>
```

### Modificadores de v-model:

- `.lazy`: Actualiza el valor después del evento `change`
- `.number`: Convierte la entrada a número
- `.trim`: Elimina espacios en blanco al inicio y final

```html
<input v-model.lazy="mensaje">
<input v-model.number="edad" type="number">
<input v-model.trim="nombre">
```

## Ejercicio Práctico: Formulario de Registro

Crea un formulario de registro con validación básica:

1. Nombre (obligatorio, mínimo 3 caracteres)
2. Email (formato válido)
3. Contraseña (mínimo 6 caracteres)
4. Confirmación de contraseña (debe coincidir)
5. Términos y condiciones (checkbox obligatorio)

```html
<div id="app">
  <form @submit.prevent="enviarFormulario">
    <div>
      <label>Nombre:</label>
      <input v-model="formulario.nombre" 
             :class="{ 'error': errores.nombre }">
      <span v-if="errores.nombre" class="error-text">{{ errores.nombre }}</span>
    </div>
    
    <div>
      <label>Email:</label>
      <input v-model="formulario.email" type="email"
             :class="{ 'error': errores.email }">
      <span v-if="errores.email" class="error-text">{{ errores.email }}</span>
    </div>
    
    <div>
      <label>Contraseña:</label>
      <input v-model="formulario.password" type="password"
             :class="{ 'error': errores.password }">
      <span v-if="errores.password" class="error-text">{{ errores.password }}</span>
    </div>
    
    <div>
      <label>Confirmar Contraseña:</label>
      <input v-model="formulario.confirmarPassword" type="password"
             :class="{ 'error': errores.confirmarPassword }">
      <span v-if="errores.confirmarPassword" class="error-text">
        {{ errores.confirmarPassword }}
      </span>
    </div>
    
    <div>
      <label>
        <input type="checkbox" v-model="formulario.terminos">
        Acepto los términos y condiciones
      </label>
      <span v-if="errores.terminos" class="error-text">
        {{ errores.terminos }}
      </span>
    </div>
    
    <button type="submit" :disabled="enviando">
      {{ enviando ? 'Enviando...' : 'Registrarse' }}
    </button>
  </form>
  
  <!-- Vista previa de los datos -->
  <div v-if="enviado" class="datos-enviados">
    <h3>Datos enviados:</h3>
    <pre>{{ JSON.stringify(formulario, null, 2) }}</pre>
  </div>
</div>

<script>
const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const formulario = reactive({
      nombre: '',
      email: '',
      password: '',
      confirmarPassword: '',
      terminos: false
    });
    
    const errores = reactive({});
    const enviando = ref(false);
    const enviado = ref(false);
    
    function validarEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    function validarFormulario() {
      let valido = true;
      
      // Limpiar errores anteriores
      Object.keys(errores).forEach(key => delete errores[key]);
      
      // Validar nombre
      if (formulario.nombre.length < 3) {
        errores.nombre = 'El nombre debe tener al menos 3 caracteres';
        valido = false;
      }
      
      // Validar email
      if (!formulario.email) {
        errores.email = 'El email es obligatorio';
        valido = false;
      } else if (!validarEmail(formulario.email)) {
        errores.email = 'Ingresa un email válido';
        valido = false;
      }
      
      // Validar contraseña
      if (formulario.password.length < 6) {
        errores.password = 'La contraseña debe tener al menos 6 caracteres';
        valido = false;
      }
      
      // Validar confirmación de contraseña
      if (formulario.password !== formulario.confirmarPassword) {
        errores.confirmarPassword = 'Las contraseñas no coinciden';
        valido = false;
      }
      
      // Validar términos y condiciones
      if (!formulario.terminos) {
        errores.terminos = 'Debes aceptar los términos y condiciones';
        valido = false;
      }
      
      return valido;
    }
    
    function enviarFormulario() {
      if (validarFormulario()) {
        enviando.value = true;
        
        // Simular envío al servidor
        setTimeout(() => {
          console.log('Datos enviados:', formulario);
          enviando.value = false;
          enviado.value = true;
        }, 1000);
      }
    }
    
    return { formulario, errores, enviando, enviado, enviarFormulario };
  }
}).mount('#app');
</script>

<style>
.error {
  border-color: #ff3860;
}

.error-text {
  color: #ff3860;
  font-size: 0.8em;
  margin-top: 0.25rem;
  display: block;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.datos-enviados {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```
## Siguiente paso

Ahora que hemos visto cómo trabajar con `v-bind` y `v-model`, en la siguiente sección exploraremos el uso de `v-if` y `v-for` para el renderizado condicional y la creación de listas dinámicas.

[Siguiente: V-if y V-for →](condicionales-bucles.md)
