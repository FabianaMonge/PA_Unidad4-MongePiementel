document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes de Materialize
  M.AutoInit();
  
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 120
  });
  
  // Inicializar tabs con swipe
  var tabs = document.querySelectorAll('.tabs');
  M.Tabs.init(tabs, {
    swipeable: true
  });
  
  // Inicializar acordeón
  var collapsible = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsible, {
    accordion: false
  });
  
  // Inicializar carrusel de profesores
  var carousel = document.querySelectorAll('.carousel');
  M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true,
    duration: 200
  });
  
  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Actualizar URL sin recargar
        history.pushState(null, null, this.getAttribute('href'));
      }
    });
  });
  
  // Filtrado de profesores
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Actualizar botones activos
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filtrar tarjetas
      document.querySelectorAll('.profesor-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Manejo de ARIA para tabs
  const updateTabAria = function() {
    document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
      panel.setAttribute('aria-hidden', 'true');
    });
    
    const activeTab = document.querySelector('.tab a.active');
    if (activeTab) {
      const activePanel = document.querySelector(activeTab.getAttribute('href'));
      if (activePanel) {
        activePanel.setAttribute('aria-hidden', 'false');
      }
    }
  };
  
  // Actualizar al cambiar tabs
  document.querySelectorAll('.tabs').forEach(tabs => {
    tabs.addEventListener('click', updateTabAria);
  });
  
  // Inicializar
  updateTabAria();
  
  // Service Worker para offline
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful: ', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
});