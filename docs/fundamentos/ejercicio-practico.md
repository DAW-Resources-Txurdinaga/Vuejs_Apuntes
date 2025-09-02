# 2.8 Ejercicio Práctico: Catálogo de Películas

¡Llegó el momento de poner en práctica todo lo aprendido en la sección de Fundamentos! En este ejercicio, crearás un catálogo de películas interactivo que incluirá:

- Lista de películas con sus detalles
- Búsqueda por título y filtrado por género
- Sistema de calificación con estrellas
- Vista de películas favoritas
- Persistencia local de los datos

## Requisitos del Ejercicio

1. **Estructura básica**: Crea una aplicación Vue 3 con los siguientes elementos:

    - Barra de búsqueda por título
    - Filtros por género
    - Tarjetas de películas con imagen, título, año y calificación
    - Sistema de calificación con estrellas
    - Sección de favoritos

2. **Funcionalidades requeridas**:

    - Buscar películas por título
    - Filtrar por género
    - Calificar películas
    - Marcar/desmarcar como favorita
    - Ver detalles de la película
    - Persistencia en localStorage

## Código Inicial

Crea un archivo `index.html` con el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Películas - Vue 3</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background-color: #f5f5f5;
        }
        .search-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .search-input {
            width: 70%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-right: 10px;
        }
        .filters {
            margin: 15px 0;
        }
        .filter-btn {
            margin-right: 10px;
            padding: 5px 15px;
            cursor: pointer;
            background: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 15px;
            transition: all 0.3s;
        }
        .filter-btn.active, .filter-btn:hover {
            background-color: #42b983;
            color: white;
            border-color: #42b983;
        }
        .movies-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .movie-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .movie-card:hover {
            transform: translateY(-5px);
        }
        .movie-poster {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }
        .movie-info {
            padding: 15px;
        }
        .movie-title {
            font-size: 1.1em;
            margin: 0 0 5px 0;
        }
        .movie-year {
            color: #666;
            font-size: 0.9em;
            margin: 0 0 10px 0;
        }
        .star-rating {
            color: #ffc107;
            margin-bottom: 10px;
        }
        .favorite-btn {
            background: none;
            border: none;
            font-size: 1.2em;
            cursor: pointer;
            color: #ddd;
        }
        .favorite-btn.active {
            color: #ff4081;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Catálogo de Películas</h1>
        
        <!-- Barra de búsqueda -->
        <div class="search-container">
            <input 
                type="text" 
                v-model="searchQuery" 
                class="search-input" 
                placeholder="Buscar películas..."
                @input="filterMovies"
            >
            
            <!-- Filtros por género -->
            <div class="filters">
                <button 
                    v-for="genre in genres" 
                    :key="genre"
                    @click="toggleGenre(genre)"
                    :class="['filter-btn', { active: selectedGenres.includes(genre) }]"
                >
                    {{ genre }}
                </button>
            </div>
        </div>
        
        <!-- Sección de favoritos -->
        <div v-if="favorites.length > 0">
            <h2>Tus Películas Favoritas</h2>
            <div class="movies-grid">
                <div 
                    v-for="movie in favorites" 
                    :key="movie.id" 
                    class="movie-card"
                >
                    <img :src="movie.poster" :alt="movie.title" class="movie-poster">
                    <div class="movie-info">
                        <h3 class="movie-title">{{ movie.title }}</h3>
                        <p class="movie-year">{{ movie.year }}</p>
                        <div class="star-rating">
                            <span v-for="i in 5" :key="i">
                                {{ i <= movie.rating ? '★' : '☆' }}
                            </span>
                        </div>
                        <button 
                            class="favorite-btn active"
                            @click="toggleFavorite(movie)"
                        >
                            ❤️
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Lista de películas -->
        <h2>Películas</h2>
        <div class="movies-grid">
            <div 
                v-for="movie in filteredMovies" 
                :key="movie.id" 
                class="movie-card"
            >
                <img :src="movie.poster" :alt="movie.title" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">{{ movie.title }}</h3>
                    <p class="movie-year">{{ movie.year }}</p>
                    <div class="star-rating">
                        <span 
                            v-for="i in 5" 
                            :key="i"
                            @click="rateMovie(movie, i)"
                            style="cursor: pointer;"
                        >
                            {{ i <= movie.rating ? '★' : '☆' }}
                        </span>
                    </div>
                    <button 
                        class="favorite-btn"
                        :class="{ active: isFavorite(movie) }"
                        @click="toggleFavorite(movie)"
                    >
                        {{ isFavorite(movie) ? '❤️' : '🤍' }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
    const { createApp, ref, computed, onMounted, watch } = Vue;
    
    // Datos iniciales de películas
    const initialMovies = [
        {
            id: 1,
            title: 'El Padrino',
            year: 1972,
            genre: ['Drama', 'Crimen'],
            rating: 0,
            poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJkNWUtNzViYTliMDk5MmYxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
        },
        {
            id: 2,
            title: 'El Caballero Oscuro',
            year: 2008,
            genre: ['Acción', 'Crimen', 'Drama'],
            rating: 0,
            poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
        },
        {
            id: 3,
            title: 'Parásitos',
            year: 2019,
            genre: ['Drama', 'Suspenso'],
            rating: 0,
            poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LThmNjMtYTNkZDBjMzQ3ZTI0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
        },
        {
            id: 4,
            title: 'Origen',
            year: 2010,
            genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
            rating: 0,
            poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
        },
        {
            id: 5,
            title: 'El viaje de Chihiro',
            year: 2001,
            genre: ['Animación', 'Aventura', 'Fantasía'],
            rating: 0,
            poster: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
        }
    ];
    
    createApp({
        setup() {
            const movies = ref([...initialMovies]);
            const favorites = ref([]);
            const searchQuery = ref('');
            const selectedGenres = ref([]);
            
            // Obtener géneros únicos
            const genres = computed(() => {
                const allGenres = [];
                movies.value.forEach(movie => {
                    movie.genre.forEach(g => {
                        if (!allGenres.includes(g)) {
                            allGenres.push(g);
                        }
                    });
                });
                return allGenres.sort();
            });
            
            // Obtener datos guardados al cargar
            onMounted(() => {
                const savedMovies = localStorage.getItem('movies');
                const savedFavorites = localStorage.getItem('favorites');
                
                if (savedMovies) {
                    movies.value = JSON.parse(savedMovies);
                }
                
                if (savedFavorites) {
                    favorites.value = JSON.parse(savedFavorites);
                }
            });
            
            // Guardar datos en localStorage
            const saveData = () => {
                localStorage.setItem('movies', JSON.stringify(movies.value));
                localStorage.setItem('favorites', JSON.stringify(favorites.value));
            };
            
            // Filtrar películas por búsqueda y género
            const filteredMovies = computed(() => {
                return movies.value.filter(movie => {
                    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
                    const matchesGenre = selectedGenres.value.length === 0 || 
                                      movie.genre.some(genre => selectedGenres.value.includes(genre));
                    
                    return matchesSearch && matchesGenre;
                });
            });
            
            // Calificar película
            const rateMovie = (movie, rating) => {
                movie.rating = rating;
                saveData();
            };
            
            // Alternar favorito
            const toggleFavorite = (movie) => {
                const index = favorites.value.findIndex(fav => fav.id === movie.id);
                if (index === -1) {
                    favorites.value.push(movie);
                } else {
                    favorites.value.splice(index, 1);
                }
                saveData();
            };
            
            // Verificar si una película es favorita
            const isFavorite = (movie) => {
                return favorites.value.some(fav => fav.id === movie.id);
            };
            
            // Alternar filtro de género
            const toggleGenre = (genre) => {
                const index = selectedGenres.value.indexOf(genre);
                if (index === -1) {
                    selectedGenres.value.push(genre);
                } else {
                    selectedGenres.value.splice(index, 1);
                }
            };
            
            return {
                movies,
                favorites,
                searchQuery,
                selectedGenres,
                genres,
                filteredMovies,
                rateMovie,
                toggleFavorite,
                isFavorite,
                toggleGenre
            };
        }
    })
    .mount('#app');
    </script>
</body>
</html>
```

## Instrucciones para el Ejercicio

1. **Configuración Inicial**:

    - Crea un nuevo archivo llamado `index.html` y copia el código proporcionado.
    - Abre el archivo en tu navegador para ver la aplicación en acción.

2. **Tareas a Realizar**:

    - Familiarízate con el código y entiende cómo funciona cada parte.
    - Prueba todas las funcionalidades: buscar, filtrar por género, calificar y marcar como favoritas.
    - Verifica que las calificaciones y favoritos persisten al recargar la página.

3. **Mejoras Sugeridas (Opcional)**:

    - Añade un modal para ver más detalles de cada película.
    - Implementa un sistema de reseñas con comentarios.
    - Añade la opción de ordenar películas por año, calificación o título.
    - Implementa un sistema de autenticación para usuarios.
    - Añade la posibilidad de crear listas personalizadas de películas.

## Conceptos Aplicados

En este ejercicio has utilizado:

- **Interpolación y Directivas**: 

    - `{{ }}` para mostrar datos
    - `v-for` para iterar sobre arrays
    - `v-if` y `v-else` para renderizado condicional
    - `v-model` para two-way binding

- **Manejo de Eventos**:

    - `@click` para interacciones de clic
    - `@input` para capturar entradas de texto
    - `@mouseover` para efectos de hover

- **Propiedades Computadas**: 

    - Para filtrar películas según búsqueda
    - Para obtener lista de géneros únicos

- **Ciclo de Vida**:

    - `onMounted` para cargar datos del localStorage al iniciar

- **Two-way Binding**:
 
    - Con `v-model` para sincronizar la barra de búsqueda

- **Clases Dinámicas**:
  
    - Para resaltar películas favoritas
    - Para mostrar géneros seleccionados

- **Manejo de Arrays**:
  
    - `filter` para filtrar elementos
   - `some` para verificar condiciones
   - `includes` para búsqueda en arrays

## Solución

Si te quedas atascado o quieres comparar tu solución con una implementación de referencia, aquí tienes el código completo de la solución:

[Enlace a la solución completa](#) (opcional: puedes crear un repositorio con la solución final)

## Siguiente paso

¡Felicidades! Has creado un catálogo de películas interactivo que demuestra un dominio sólido de los conceptos fundamentales de Vue 3. En la siguiente sección encontrarás una hoja de referencia rápida con un resumen de todo lo aprendido.

[Siguiente: Hoja de Referencia Rápida →](cheat-sheet.md)
