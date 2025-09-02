// Colapsar automáticamente las secciones no activas
document.addEventListener('DOMContentLoaded', function() {
  // Función para colapsar secciones no activas
  function collapseInactiveSections() {
    // Obtener todas las secciones de navegación
    const sections = document.querySelectorAll('.md-nav__item--section');
    
    sections.forEach(section => {
      // Verificar si la sección está activa
      const isActive = section.classList.contains('md-nav__item--active');
      const hasActiveChild = section.querySelector('.md-nav__item--active');
      
      // Si la sección no está activa ni tiene hijos activos, colapsarla
      if (!isActive && !hasActiveChild) {
        const toggle = section.querySelector('.md-toggle');
        const subnav = section.querySelector('.md-nav');
        
        if (toggle && subnav) {
          toggle.checked = false;
          subnav.style.display = 'none';
        }
      }
    });
  }
  
  // Función para manejar clics en los títulos de las secciones
  function setupSectionToggle() {
    const sectionTitles = document.querySelectorAll('.md-nav__item--section > .md-nav__link');
    
    sectionTitles.forEach(title => {
      title.addEventListener('click', function(e) {
        const section = this.parentElement;
        const toggle = section.querySelector('.md-toggle');
        const subnav = section.querySelector('.md-nav');
        
        if (toggle && subnav) {
          // Alternar el estado
          const isExpanded = toggle.checked;
          
          // Cerrar todas las secciones primero
          document.querySelectorAll('.md-toggle').forEach(t => {
            if (t !== toggle) {
              t.checked = false;
              const nav = t.closest('.md-nav__item--section')?.querySelector('.md-nav');
              if (nav) nav.style.display = 'none';
            }
          });
          
          // Alternar la sección actual
          toggle.checked = !isExpanded;
          subnav.style.display = isExpanded ? 'none' : 'block';
          
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
  }
  
  // Ejecutar después de un pequeño retraso para asegurar que la navegación esté cargada
  setTimeout(() => {
    collapseInactiveSections();
    setupSectionToggle();
  }, 100);
  
  // También ejecutar cuando cambie la ruta (para SPA)
  document.addEventListener('md-navigate', () => {
    setTimeout(() => {
      collapseInactiveSections();
      setupSectionToggle();
    }, 100);
  });
});
