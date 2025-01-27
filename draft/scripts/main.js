document.addEventListener("DOMContentLoaded", function () {
	const isMobile = window.matchMedia("(max-width: 1024px)").matches;
	const threshold = isMobile ? 0.2 : 0.3; // Lower threshold for mobile devices

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			}
		});
	}, { threshold: threshold });

	document.querySelectorAll('.fade-in').forEach(element => {
		observer.observe(element);
	});

	// Custom cursor logic
	const customCursor = document.getElementById('custom-cursor');
	let mouseX = 0, mouseY = 0;
	let cursorVisible = false;

	if (!isMobile) {
		document.addEventListener('mousemove', (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			if (!cursorVisible) {
				customCursor.style.display = 'block';
				cursorVisible = true;
			}
		});

		document.addEventListener('mouseleave', () => {
			customCursor.style.display = 'none';
			cursorVisible = false;
		});

		document.addEventListener('mouseenter', () => {
			if (!cursorVisible) {
				customCursor.style.display = 'block';
				cursorVisible = true;
			}
		});

		function updateCursor() {
			customCursor.style.left = `${mouseX}px`;
			customCursor.style.top = `${mouseY}px`;
			requestAnimationFrame(updateCursor);
		}

		requestAnimationFrame(updateCursor);
	}
});
