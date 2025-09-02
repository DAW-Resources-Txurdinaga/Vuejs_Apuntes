# Curso de Vue 3 - Desarrollo de Aplicaciones Web

**Bienvenidos al curso de Vue 3** - El framework progresivo de JavaScript para construir interfaces de usuario modernas y reactivas.

## Objetivos del Curso

- **Conceptos fundamentales** de Vue 3 y su ecosistema
- Desarrollo de **componentes reutilizables** y mantenibles
- **Gestión de estado** con Pinia (el estándar para Vue 3)
- **Enrutamiento** con Vue Router para SPAs
- Consumo de **APIs REST/GraphQL**
- **Buenas prácticas** y patrones de desarrollo profesional

## Nivel del Curso

Este material está diseñado para estudiantes de **Desarrollo de Aplicaciones Web** con conocimientos previos en:

- HTML5 y CSS3
- JavaScript (ES6+)
- Conceptos básicos de programación orientada a objetos
- Experiencia previa con algún framework JS es útil pero no requerida

## Estructura del Curso

### 1. Fundamentos de Vue 3
- Reactividad y el sistema de instancias
- Sintaxis de plantillas y directivas básicas
- Propiedades computadas y watchers
- Clases y estilos dinámicos

### 2. Componentes y Composición
- Creación y comunicación entre componentes
- Props y eventos personalizados
- Slots y componentes dinámicos
- Composition API avanzada

### 3. Estado y Gestión de Datos
- Gestión de estado con Pinia
- Patrones de gestión de estado
- Consumo de APIs REST/GraphQL
- Manejo de errores y carga de datos

### 4. Proyecto Final
- Estructura de una aplicación Vue 3
- Enrutamiento avanzado
- Autenticación y autorización
- Despliegue y optimización

## Requisitos Técnicos

Para seguir este curso necesitarás:

- Node.js 16+ y npm/yarn
- Un editor de código (VS Code recomendado)
- Vue DevTools (extensión del navegador)
- Conocimientos básicos de línea de comandos

## Cómo Empezar

1. Instala [Node.js](https://nodejs.org/) (incluye npm)
2. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```
3. Crea un proyecto Vue 3 con Vite:
   ```bash
   npm create vue@latest mi-proyecto-vue
   cd mi-proyecto-vue
   npm install
   npm run dev
   ```

## Recursos Adicionales

- [Documentación Oficial de Vue 3](https://vuejs.org/)
- [Vue Mastery (cursos en video)](https://www.vuemastery.com/)
- [Vue.js en GitHub](https://github.com/vuejs/core)
- [Comunidad Vue en Discord](https://vue.land/)
- [Awesome Vue (recursos)](https://github.com/vuejs/awesome-vue)

## Sobre el Curso

Este material ha sido desarrollado para el módulo de **Desarrollo de Aplicaciones Web** con el objetivo de proporcionar una guía completa y práctica para el desarrollo de aplicaciones modernas con Vue 3.

### Metodología

- Aprendizaje basado en proyectos
- Ejemplos prácticos y código real
- Ejercicios progresivos
- Buenas prácticas de la industria

### Evaluación

- Ejercicios prácticos semanales
- Proyecto final integrador
- Participación en foros y actividades

---

<div class="cta-buttons">
  <a href="/fundamentos/introduccion" class="button primary">Comenzar Curso</a>
  <a href="/proyecto/ejercicios" class="button secondary">Ver Ejercicios</a>
</div>

<style>
.cta-buttons {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-buttons .button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cta-buttons .primary {
  background-color: #42b983;
  color: white;
  border: 2px solid #42b983;
}

.cta-buttons .primary:hover {
  background-color: #3aa876;
  border-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.cta-buttons .secondary {
  background-color: transparent;
  color: #2c3e50;
  border: 2px solid #2c3e50;
}

.cta-buttons .secondary:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.1);
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
  }
  
  .cta-buttons .button {
    width: 100%;
  }
}
</style>