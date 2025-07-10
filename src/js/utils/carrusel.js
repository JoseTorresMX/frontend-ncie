// js/carousel.js (o el nombre que le des a tu archivo JS)

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider .prev');
    const nextBtn = document.querySelector('.slider .next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let autoSlideInterval;

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Quitar 'active' de todos los slides y dots
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        // Añadir 'active' al slide y dot actual
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dotsContainer.children[index]) {
            dotsContainer.children[index].classList.add('active');
        }
    }

    // Navegación con botones
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Navegación con puntos
    if (dotsContainer) {
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const index = parseInt(e.target.dataset.index);
                currentIndex = index;
                showSlide(currentIndex);
                // Reiniciar autoslide al hacer clic en un dot
                startAutoSlide();
            }
        });
    }

    // Autoplay (opcional)
    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Limpiar cualquier intervalo anterior
        autoSlideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    // Inicialización: Mostrar el primer slide al cargar la página
    if (slides.length > 0) {
        showSlide(currentIndex);
        startAutoSlide(); // Iniciar autoplay
    }
});