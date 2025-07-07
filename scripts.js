document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes de Materialize
  M.AutoInit();
  
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 120,
    disable: window.innerWidth < 768
  });
  
  // Inicializar el carrusel con autoplay
  var carousel = document.querySelectorAll('.carousel');
  var carouselInstances = M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true,
    duration: 200,
    dist: -50
  });
  
  // Autoplay para el carrusel
  if (carouselInstances.length > 0) {
    setInterval(function() {
      carouselInstances[0].next();
    }, 5000);
    
    // Pausar carrusel al interactuar
    carousel[0].addEventListener('mouseenter', function() {
      carouselInstances[0].pause();
    });
    
    carousel[0].addEventListener('mouseleave', function() {
      carouselInstances[0].next();
    });
  }
  
  // Inicializar tabs
  var tabs = document.querySelectorAll('.tabs');
  M.Tabs.init(tabs, {
    swipeable: true,
    responsiveThreshold: 992
  });
  
  // Inicializar menú móvil
  var sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);
  
  // Inicializar acordeón
  var collapsible = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsible, {
    accordion: false
  });
  
  // Inicializar parallax
  var parallax = document.querySelectorAll('.parallax');
  M.Parallax.init(parallax);
  
  // Inicializar select
  var selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
  
  // Validación de formulario de contacto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validación simple
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      
      if (nombre && email && mensaje) {
        M.toast({
          html: 'Gracias por tu mensaje. Nos pondremos en contacto pronto.',
          classes: 'green',
          displayLength: 4000,
          ariaLabel: 'Mensaje enviado con éxito'
        });
        contactForm.reset();
        
        // Enfoque accesible después del envío
        setTimeout(() => {
          document.querySelector('h1').focus();
        }, 100);
      } else {
        M.toast({
          html: 'Por favor completa todos los campos.',
          classes: 'red',
          displayLength: 4000,
          ariaLabel: 'Error en el formulario'
        });
        
        // Enfocar el primer campo con error
        if (!nombre) {
          document.getElementById('nombre').focus();
        } else if (!email) {
          document.getElementById('email').focus();
        } else {
          document.getElementById('mensaje').focus();
        }
      }
    });
  }
  
  // Validación de formulario de admisión
  const admisionForm = document.getElementById('admision-form');
  if (admisionForm) {
    admisionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validación de archivos
      const fileInput = document.getElementById('documentos-admision');
      if (fileInput.files.length > 0) {
        const fileSize = fileInput.files[0].size / 1024 / 1024; // MB
        if (fileSize > 5) {
          M.toast({
            html: 'El archivo no debe exceder 5MB',
            classes: 'red',
            displayLength: 4000
          });
          return;
        }
      }
      
      // Si pasa validación
      M.toast({
        html: 'Solicitud enviada con éxito. Revisa tu correo para más instrucciones.',
        classes: 'green',
        displayLength: 5000,
        ariaLabel: 'Solicitud de admisión enviada'
      });
      admisionForm.reset();
    });
  }
  
  // Filtrado de profesores
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
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
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }
  
  // Service Worker para offline
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('ServiceWorker registrado con éxito: ', registration.scope);
        })
        .catch(err => {
          console.log('Error al registrar ServiceWorker: ', err);
        });
    });
  }
  
  // Mejorar accesibilidad para usuarios de teclado
  document.addEventListener('keyup', function(e) {
    // Saltar al contenido principal con tecla 'S'
    if (e.key === 'S' || e.key === 's') {
      document.querySelector('.skip-link').focus();
    }
  });
  
  // Actualizar año del copyright
  document.querySelector('.footer-copyright .container').firstChild.textContent = 
    `© ${new Date().getFullYear()} Facultad de Ciencias Sociales`;
});