# 7.2 Ejercicios Prácticos

## Ejercicio 1: Lista de Tareas Mejorada

**Objetivo**: Crear una aplicación de lista de tareas con las siguientes características:

1. Agregar nuevas tareas
2. Marcar tareas como completadas
3. Filtrar tareas (todas, activas, completadas)
4. Editar tareas existentes
5. Eliminar tareas
6. Persistencia en localStorage

**Requisitos Técnicos**:
- Usar la Composition API
- Implementar un store de Pinia
- Usar componentes reutilizables
- Diseño responsivo

**Pasos Sugeridos**:
1. Configura un nuevo proyecto con Vite + Vue 3
2. Crea los componentes necesarios
3. Implementa la lógica del store
4. Añade los estilos necesarios

## Ejercicio 2: Búsqueda de Usuarios con API

**Objetivo**: Crear una aplicación que permita buscar usuarios de GitHub y ver sus perfiles.

**Características**:
- Campo de búsqueda por nombre de usuario
- Lista de resultados con avatar y nombre de usuario
- Vista detallada al hacer clic en un usuario
- Loading states y manejo de errores

**API a utilizar**:
```
GET https://api.github.com/search/users?q={query}
GET https://api.github.com/users/{username}
```

**Bonus**:
- Paginación de resultados
- Cache de búsquedas
- Historial de búsquedas recientes

## Ejercicio 3: Tienda en Línea

**Objetivo**: Desarrollar un catálogo de productos con carrito de compras.

**Requisitos**:
1. Lista de productos con imágenes
2. Filtrado por categorías
3. Búsqueda de productos
4. Carrito de compras funcional
5. Formulario de checkout (simulado)

**Estructura de Datos Ejemplo**:
```javascript
const productos = [
  {
    id: 1,
    nombre: 'Laptop Gamer',
    precio: 1200,
    categoria: 'tecnologia',
    imagen: 'laptop.jpg',
    descripcion: 'Potente laptop para gaming'
  },
  // más productos...
];
```

## Ejercicio 4: Panel de Administración

Crea un panel de administración con las siguientes secciones:

1. **Dashboard**:

    - Estadísticas generales
    - Gráficos con Chart.js
    - Actividad reciente

2. **Gestión de Usuarios**:
   
    - Lista de usuarios
    - Crear/editar/eliminar usuarios
    - Filtros y búsqueda

3. **Gestión de Contenido**:
   
    - CRUD de artículos
    - Subida de imágenes
    - Editor de texto enriquecido (usando Tiptap o similar)

**Tecnologías Recomendadas**

- Vue Router para la navegación
- Pinia para el estado global
- Axios para peticiones HTTP
- Vuetify o PrimeVue para componentes UI


## Ejercicio 5: Juego de Memoria

Implementa un juego de memoria con las siguientes características:

1. Tablero de cartas (ej: 4x4, 6x6)
2. Voltear cartas por turnos
3. Encontrar parejas iguales
4. Contador de movimientos
5. Temporizador
6. Mejores puntuaciones (guardadas en localStorage)

**Extras**:
- Diferentes niveles de dificultad
- Efectos de sonido
- Animaciones al voltear cartas
- Modo multijugador

## Proyecto Final: Aplicación de Notas

Desarrolla una aplicación completa de toma de notas con las siguientes características:

### Backend (simulado con JSON Server o similar):
- Autenticación de usuarios
- CRUD de notas
- Categorías/etiquetas
- Búsqueda y filtrado

### Frontend:
1. **Autenticación**:
   - Registro e inicio de sesión
   - Recuperación de contraseña
   - Perfil de usuario

2. **Notas**:
   - Lista de notas con vista previa
   - Editor de notas enriquecido
   - Organización por carpetas/etiquetas
   - Búsqueda y filtros
   - Exportar/importar notas

3. **Configuración**:
   - Tema claro/oscuro
   - Tipografía
   - Notificaciones

### Tecnologías a Utilizar:
- Vue 3 + Composition API
- Vue Router
- Pinia para gestión de estado
- Vuetify/Quasar para UI
- Axios para peticiones HTTP
- Markdown para el formato de notas
- IndexedDB para almacenamiento offline

## Evaluación de Proyectos

Cada proyecto será evaluado según los siguientes criterios:

1. **Funcionalidad** (40%):
   - Cumplimiento de requisitos
   - Corrección de errores
   - Rendimiento

2. **Código** (30%):
   - Estructura y organización
   - Legibilidad
   - Buenas prácticas
   - Manejo de errores

3. **UI/UX** (20%):
   - Diseño atractivo
   - Usabilidad
   - Responsive design

4. **Documentación** (10%):
   - README.md
   - Comentarios en el código
   - Guía de instalación

## Recursos Adicionales

1. [Vue 3 Documentation](https://v3.vuejs.org/)
2. [Pinia Documentation](https://pinia.vuejs.org/)
3. [Vue Router](https://router.vuejs.org/)
4. [VueUse](https://vueuse.org/) - Colección de utilidades para Vue 3
5. [Vite](https://vitejs.dev/) - Herramienta de construcción

## Entregables

Para cada ejercicio, entrega:
1. Código fuente en un repositorio Git
2. Instrucciones de instalación y ejecución
3. Capturas de pantalla o demo en vivo (opcional)

## Preguntas Frecuentes

### ¿Cómo manejo el estado global en mi aplicación?
Usa Pinia para la gestión del estado global. Crea stores lógicos (ej: `useAuthStore`, `useNotesStore`) y úsalos en tus componentes.

### ¿Cuál es la mejor forma de hacer peticiones HTTP?
Puedes usar Axios o la Fetch API nativa. Crea un servicio o composable que maneje todas las llamadas a la API.

### ¿Cómo implemento la autenticación?
1. Crea un store de autenticación con Pinia
2. Usa JWT para manejar sesiones
3. Protege rutas con guards del router
4. Almacena el token en cookies seguras

### ¿Cómo mejoro el rendimiento de mi aplicación?
- Usa `v-once` para contenido estático
- Implementa lazy loading para rutas
- Usa `v-memo` para listas grandes
- Aprovecha la composición para reutilizar lógica
