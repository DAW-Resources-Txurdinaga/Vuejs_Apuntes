### Llamadas asíncronas con Axios


**Axios** es una biblioteca basada en Promesas diseñada para facilitar las solicitudes HTTP desde el navegador o Node.js. Se utiliza ampliamente en aplicaciones web para interactuar con APIs, gestionar datos externos y manejar procesos como autenticación, carga de archivos y más.

----------

#### Principales características de Axios

1.  **Basado en Promesas:**
    
    -   Utiliza el estándar de Promesas, lo que permite usar `async/await` para una sintaxis más limpia y comprensible.
2.  **Compatible con navegadores y Node.js:**
    
    -   Funciona tanto en el cliente como en el servidor, permitiendo un uso versátil.
3.  **Transformación automática de datos:**
    
    -   Convierte los datos enviados y recibidos en formato JSON automáticamente.
4.  **Interceptores de solicitudes y respuestas:**
    
    -   Permite interceptar solicitudes o respuestas para añadir lógica personalizada (e.g., manejo de errores global o configuración de tokens).
5.  **Soporte para operaciones avanzadas:**
    
    -   Cancelación de solicitudes.
    -   Envío de datos con múltiples partes (form-data).
    -   Manejo de redirecciones, tiempos de espera y reintentos.
6.  **Configuración predeterminada personalizable:**
    
    -   Puedes establecer configuraciones globales (como la URL base o cabeceras) para evitar repeticiones.

----------

#### Instalación de Axios

Si no tienes Axios instalado, puedes añadirlo a tu proyecto con npm o yarn:

```bash
    npm install axios
```

 o con yarn
```bash
    yarn add axios
```

#### Uso básico

```js
    import axios from 'axios';
    
    // Realizar una solicitud GET
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response.data); // Datos de la API
      })
      .catch(error => {
        console.error(error.message); // Manejo de errores
      });
```

