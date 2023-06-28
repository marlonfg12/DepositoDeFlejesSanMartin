const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    dropdowns.forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        otherDropdown.classList.remove('active');
      }
    });
    dropdown.classList.toggle('active');
  });
});


const menuIcon = document.querySelector('.menu-icon');
const menuItems = document.querySelector('.menu');

function toggleMenu() {
  menuIcon.classList.toggle('open');
  menuItems.classList.toggle('open');
}

menuIcon.addEventListener('click', toggleMenu);

document.addEventListener('DOMContentLoaded', function() {
  var galleryContainer = document.getElementById('galleryContainer');
  var paginationContainer = document.getElementById('paginationContainer');

  // Obtener la lista de imágenes en la carpeta "img"
  fetch('./img')
    .then(response => response.text())
    .then(data => {
      // Crear un elemento HTML para cada imagen encontrada
      var parser = new DOMParser();
      var htmlDocument = parser.parseFromString(data, 'text/html');
      var imageElements = htmlDocument.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');

      // Convertir la lista de imágenes en un array
      var images = Array.from(imageElements).map(function(imageElement) {
        return imageElement.getAttribute('href');
      });

      // Definir la cantidad de imágenes por página
      var imagesPerPage = 30;

      // Calcular la cantidad total de páginas
      var totalPages = Math.ceil(images.length / imagesPerPage);

      // Función para mostrar las imágenes de una página específica
      function showImages(page) {
        // Calcular los índices inicial y final
        var startIndex = (page - 1) * imagesPerPage;
        var endIndex = page * imagesPerPage - 1;

        // Limpiar el contenedor de la galería
        galleryContainer.innerHTML = '';

        // Iterar sobre las imágenes y agregarlas al contenedor de la galería
        for (var i = startIndex; i <= endIndex && i < images.length; i++) {
          var imageSrc = images[i];

          var pictureDiv = document.createElement('div');
          pictureDiv.className = 'picture';

          var img = document.createElement('img');
          img.src = imageSrc;
          img.alt = 'Imagen de galería';

          pictureDiv.appendChild(img);
          galleryContainer.appendChild(pictureDiv);
        }

        // Asignar el evento de clic a las imágenes recién agregadas
        assignClickEventToImages();
      }

      // Función para actualizar la paginación
      function updatePagination() {
        paginationContainer.innerHTML = '';

        // Agregar enlaces para cada página
        for (var i = 1; i <= totalPages; i++) {
          var pageLink = document.createElement('a');
          pageLink.href = '#';
          pageLink.textContent = i;

          // Asignar un evento de clic para mostrar las imágenes de la página seleccionada
          pageLink.addEventListener('click', function() {
            // Remover la clase "active" de todos los enlaces de paginación
            var paginationLinks = paginationContainer.querySelectorAll('a');
            paginationLinks.forEach(function(link) {
              link.classList.remove('active');
            });

            // Agregar la clase "active" al enlace de paginación seleccionado
            this.classList.add('active');

            showImages(parseInt(this.textContent));
          });

          paginationContainer.appendChild(pageLink);
        }

        // Agregar la clase "active" al primer enlace de paginación por defecto
        var firstPageLink = paginationContainer.querySelector('a');
        firstPageLink.classList.add('active');
      }

      // Asignar el evento de clic a las imágenes de la galería
      function assignClickEventToImages() {
        var galleryImages = galleryContainer.querySelectorAll('.picture img');
        galleryImages.forEach(function(image) {
          image.addEventListener('click', function() {
            var imageSrc = this.src;
            showImageFullscreen(imageSrc);
          });
        });
      }

      // Mostrar las imágenes de la página inicial (página 1)
      showImages(1);

      // Actualizar la paginación
      updatePagination();
    })
    .catch(error => {
      console.error('Error al obtener la lista de imágenes: ', error);
    });

  // Función para mostrar una imagen en pantalla completa al hacer clic en ella
  function showImageFullscreen(imageSrc) {
    // Crear un contenedor para la imagen en pantalla completa
    var fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'fullscreen-container';

    // Crear la imagen en pantalla completa
    var fullscreenImage = document.createElement('img');
    fullscreenImage.src = imageSrc;
    fullscreenImage.alt = 'Imagen en pantalla completa';

    // Agregar la imagen al contenedor
    fullscreenContainer.appendChild(fullscreenImage);

    // Agregar el contenedor a la página
    document.body.appendChild(fullscreenContainer); 

    // Remover la imagen en pantalla completa al hacer clic en ella
    fullscreenContainer.addEventListener('click', function() {
      document.body.removeChild(fullscreenContainer);
    });
  }
});
