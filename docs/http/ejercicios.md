# 4.5 Ejercicios Prácticos de Peticiones HTTP

En esta sección, pondrás en práctica los conceptos aprendidos sobre peticiones HTTP en Vue 3. Los ejercicios están diseñados para que apliques los diferentes métodos de realizar peticiones HTTP que hemos visto.

## Ejercicio 1: Lista de Tareas con API Fetch

**Objetivo**: Crear una aplicación de lista de tareas que utilice la API Fetch para gestionar las tareas.

### Requisitos:
1. Crea un componente `TaskList.vue` que muestre una lista de tareas
2. Usa la API Fetch para realizar las siguientes operaciones:
   - Obtener todas las tareas (GET)
   - Agregar una nueva tarea (POST)
   - Marcar una tarea como completada (PATCH)
   - Eliminar una tarea (DELETE)
3. Muestra un indicador de carga durante las peticiones
4. Maneja los errores apropiadamente

### API a utilizar:
```
GET    /todos          - Obtener todas las tareas
POST   /todos          - Crear una nueva tarea
PATCH  /todos/:id      - Actualizar una tarea
DELETE /todos/:id      - Eliminar una tarea
```

### Ejemplo de estructura de tarea:
```json
{
  "id": 1,
  "title": "Aprender Vue 3",
  "completed": false,
  "createdAt": "2023-10-01T10:00:00Z"
}
```

---

## Ejercicio 2: Búsqueda en Tiempo Real con Axios

**Objetivo**: Crear un buscador que realice peticiones a medida que el usuario escribe.

### Requisitos:
1. Crea un componente `UserSearch.vue`
2. Implementa un campo de búsqueda que realice peticiones a medida que el usuario escribe
3. Usa Axios para realizar las peticiones
4. Implementa cancelación de peticiones para evitar condiciones de carrera
5. Muestra los resultados de la búsqueda en una lista
6. Agrega debounce (retraso) a las peticiones (300ms)

### API a utilizar:
```
GET /users?q=:query
```

### Ejemplo de respuesta:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://i.pravatar.cc/150?img=1"
  }
]
```

---

## Ejercicio 3: Gestor de Productos con Alova

**Objetivo**: Crear un CRUD de productos utilizando Alova.

### Requisitos:
1. Crea un componente `ProductManager.vue`
2. Implementa las siguientes funcionalidades:
   - Lista de productos con paginación
   - Formulario para agregar/editar productos
   - Botones para editar y eliminar productos
3. Utiliza Alova para:
   - Cachear las peticiones GET por 5 minutos
   - Gestionar el estado de carga y errores
   - Implementar actualización optimista de la interfaz

### API a utilizar:
```
GET    /products       - Lista de productos (con paginación)
POST   /products       - Crear producto
GET    /products/:id   - Obtener un producto
PUT    /products/:id   - Actualizar producto
DELETE /products/:id   - Eliminar producto
```

### Ejemplo de estructura de producto:
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Potente laptop para desarrolladores",
  "price": 1299.99,
  "stock": 15,
  "category": "Electrónica"
}
```

---

## Ejercicio 4: Autenticación con Interceptores

**Objetivo**: Implementar un sistema de autenticación con manejo de tokens.

### Requisitos:
1. Crea un componente `Auth.vue` con formularios de login/registro
2. Implementa la lógica de autenticación:
   - Almacenar el token JWT en localStorage
   - Redirigir al login cuando el token expire
   - Mostrar el perfil del usuario autenticado
3. Crea un servicio de API que:
   - Añada automáticamente el token a las peticiones
   - Maneje la renovación del token cuando expire
   - Redirija al login cuando la autenticación falle

### Endpoints de la API:
```
POST   /auth/register    - Registrar nuevo usuario
POST   /auth/login       - Iniciar sesión
GET    /auth/me          - Obtener perfil del usuario
POST   /auth/refresh     - Renovar token
```

---

## Soluciones y Consejos

### Consejos generales:
1. Siempre maneja los estados de carga y error
2. Usa try/catch para capturar errores en las peticiones
3. Considera crear servicios separados para las llamadas a la API
4. Usa TypeScript para un mejor autocompletado y detección de errores

### Recursos adicionales:
- [Documentación de la API Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [Documentación de Axios](https://axios-http.com/)
- [Documentación de Alova](https://alova.js.org/)
- [Ejemplos de código en GitHub](https://github.com/tu-usuario/vue-http-ejercicios)

## Siguientes pasos

¡Felicidades por completar los ejercicios de peticiones HTTP! Ahora que has practicado con diferentes métodos para realizar peticiones en Vue 3, estás listo para explorar más características avanzadas de Vue.

[Ir a la siguiente sección: Enrutamiento con Vue Router](../routing/introduccion.md)
