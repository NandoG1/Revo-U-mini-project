document.addEventListener('DOMContentLoaded', function() {
			const hamburger = document.querySelector('.hamburger');
			const navMenu = document.querySelector('.nav-menu');
			const navLinks = document.querySelectorAll('.nav-link');
			const pages = document.querySelectorAll('.page');

			hamburger.addEventListener('click', function() {
				hamburger.classList.toggle('active');
				navMenu.classList.toggle('active');
			});

			navLinks.forEach(link => {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					

					navLinks.forEach(l => l.classList.remove('active'));
					pages.forEach(p => p.classList.remove('active'));
					
					this.classList.add('active');
					
					const targetPage = this.getAttribute('data-page');
					const targetElement = document.getElementById(targetPage);
					if (targetElement) {
						targetElement.classList.add('active');
					}
					
					hamburger.classList.remove('active');
					navMenu.classList.remove('active');
					
					window.scrollTo({
						top: 0,
						behavior: 'smooth'
					});
				});
			});

			window.scrollToSection = function(sectionId) {
				navLinks.forEach(l => l.classList.remove('active'));
				pages.forEach(p => p.classList.remove('active'));
				
				const targetLink = document.querySelector(`[data-page="${sectionId}"]`);
				if (targetLink) {
					targetLink.classList.add('active');
				}
				
				const targetPage = document.getElementById(sectionId);
				if (targetPage) {
					targetPage.classList.add('active');
				}
				
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			};

			let userNameStorage = null;
			
			function updateUserName() {
				const userName = userNameStorage || 'Harfi';
				const userNameElement = document.getElementById('userName');
				if (userNameElement) {
					userNameElement.textContent = userName;
				}
			}


			function updateCurrentTime() {
				const now = new Date();
				const options = {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					timeZoneName: 'short'
				};
				
				const timeString = now.toLocaleDateString('en-US', options);
				const currentTimeElement = document.getElementById('currentTime');
				if (currentTimeElement) {
					currentTimeElement.textContent = timeString;
				}
			}

			updateCurrentTime();
			setInterval(updateCurrentTime, 1000);

			const messageForm = document.getElementById('messageForm');
			const submittedDataDiv = document.getElementById('submittedData');

			function validateForm() {
				let isValid = true;
				
				document.querySelectorAll('.error-message').forEach(error => {
					error.textContent = '';
				});

				const nama = document.getElementById('nama').value.trim();
				if (!nama) {
					document.getElementById('namaError').textContent = 'Nama harus diisi';
					isValid = false;
				} else if (nama.length < 2) {
					document.getElementById('namaError').textContent = 'Nama minimal 2 karakter';
					isValid = false;
				} else if (!/^[a-zA-Z\s]+$/.test(nama)) {
					document.getElementById('namaError').textContent = 'Nama hanya boleh berisi huruf dan spasi';
					isValid = false;
				}

				const tanggalLahir = document.getElementById('tanggalLahir').value;
				if (!tanggalLahir) {
					document.getElementById('tanggalLahirError').textContent = 'Tanggal lahir harus diisi';
					isValid = false;
				} else {
					const birthDate = new Date(tanggalLahir);
					const today = new Date();
					const age = today.getFullYear() - birthDate.getFullYear();
					
					if (birthDate > today) {
						document.getElementById('tanggalLahirError').textContent = 'Tanggal lahir tidak boleh di masa depan';
						isValid = false;
					} else if (age > 100) {
						document.getElementById('tanggalLahirError').textContent = 'Umur tidak boleh lebih dari 100 tahun';
						isValid = false;
					}
				}

				const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
				if (!jenisKelamin) {
					document.getElementById('jenisKelaminError').textContent = 'Jenis kelamin harus dipilih';
					isValid = false;
				}

				const pesan = document.getElementById('pesan').value.trim();
				if (!pesan) {
					document.getElementById('pesanError').textContent = 'Pesan harus diisi';
					isValid = false;
				} else if (pesan.length < 10) {
					document.getElementById('pesanError').textContent = 'Pesan minimal 10 karakter';
					isValid = false;
				} else if (pesan.length > 500) {
					document.getElementById('pesanError').textContent = 'Pesan maksimal 500 karakter';
					isValid = false;
				}

				return isValid;
			}

			function displaySubmittedData(formData) {
				document.getElementById('displayNama').textContent = formData.nama;
				document.getElementById('displayTanggalLahir').textContent = formData.tanggalLahir;
				document.getElementById('displayJenisKelamin').textContent = formData.jenisKelamin;
				document.getElementById('displayPesan').textContent = formData.pesan;
				
				submittedDataDiv.style.display = 'block';
				submittedDataDiv.scrollIntoView({ behavior: 'smooth' });
			}

			if (messageForm) {
				messageForm.addEventListener('submit', function(e) {
					e.preventDefault();
					
					if (validateForm()) {
						const formData = {
							nama: document.getElementById('nama').value.trim(),
							tanggalLahir: document.getElementById('tanggalLahir').value,
							jenisKelamin: document.querySelector('input[name="jenisKelamin"]:checked').value,
							pesan: document.getElementById('pesan').value.trim()
						};
						
						displaySubmittedData(formData);
					}
				});
			}

			const namaInput = document.getElementById('nama');
			if (namaInput) {
				namaInput.addEventListener('input', function() {
					const nama = this.value.trim();
					const errorElement = document.getElementById('namaError');
					
					if (nama && nama.length >= 2 && /^[a-zA-Z\s]+$/.test(nama)) {
						errorElement.textContent = '';
						this.style.borderColor = '#10b981';
					} else if (nama) {
						this.style.borderColor = '#ef4444';
					} else {
						this.style.borderColor = '#e2e8f0';
					}
				});
			}

			const pesanInput = document.getElementById('pesan');
			if (pesanInput) {
				pesanInput.addEventListener('input', function() {
					const pesan = this.value.trim();
					const errorElement = document.getElementById('pesanError');
					
					if (pesan && pesan.length >= 10 && pesan.length <= 500) {
						errorElement.textContent = '';
						this.style.borderColor = '#10b981';
					} else if (pesan) {
						this.style.borderColor = '#ef4444';
					} else {
						this.style.borderColor = '#e2e8f0';
					}
				});
			}

			function isElementInViewport(el) {
				const rect = el.getBoundingClientRect();
				return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					rect.right <= (window.innerWidth || document.documentElement.clientWidth)
				);
			}

			function handleScrollAnimations() {
				const elements = document.querySelectorAll('.hq-card, .service-card, .vm-card, .team-card, .portfolio-card');
				
				elements.forEach(element => {
					if (isElementInViewport(element)) {
						element.style.opacity = '1';
						element.style.transform = 'translateY(0)';
					}
				});
			}

			const animatedElements = document.querySelectorAll('.hq-card, .service-card, .vm-card, .team-card, .portfolio-card');
			animatedElements.forEach(element => {
				element.style.opacity = '0';
				element.style.transform = 'translateY(30px)';
				element.style.transition = 'all 0.6s ease-out';
			});

			window.addEventListener('scroll', handleScrollAnimations);
			handleScrollAnimations(); 

			let lastScrollTop = 0;
			const navbar = document.querySelector('.navbar');

			window.addEventListener('scroll', function() {
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				
				if (scrollTop > lastScrollTop && scrollTop > 100) {
					if (navbar) navbar.style.transform = 'translateY(-100%)';
				} else {
					if (navbar) navbar.style.transform = 'translateY(0)';
				}
				
				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
			});

			function addLoadingAnimation() {
				const cards = document.querySelectorAll('.hq-card, .service-card, .portfolio-card, .team-card');
				
				cards.forEach((card, index) => {
					setTimeout(() => {
						card.classList.add('fade-in');
					}, index * 100);
				});
			}

			setTimeout(addLoadingAnimation, 500);

			function typeWriter(element, text, speed = 100) {
				let i = 0;
				element.innerHTML = '';
				
				function type() {
					if (i < text.length) {
						element.innerHTML += text.charAt(i);
						i++;
						setTimeout(type, speed);
					}
				}
				
				type();
			}

			setTimeout(() => {
				const heroTitle = document.querySelector('.hero-title');
				if (heroTitle) {
					const originalText = heroTitle.textContent;
					typeWriter(heroTitle, originalText, 50);
				}
			}, 1000);

			window.addEventListener('scroll', function() {
				const scrolled = window.pageYOffset;
				const parallaxElements = document.querySelectorAll('.float-element');
				
				parallaxElements.forEach((element, index) => {
					const speed = 0.5 + (index * 0.2);
					const yPos = -(scrolled * speed);
					element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
				});
			});

			navLinks.forEach(link => {
				link.addEventListener('mouseenter', function() {
					this.style.transform = 'translateY(-2px)';
				});
				
				link.addEventListener('mouseleave', function() {
					this.style.transform = 'translateY(0)';
				});
			});

			function addRippleEffect(button) {
				button.addEventListener('click', function(e) {
					const ripple = document.createElement('span');
					const rect = this.getBoundingClientRect();
					const size = 60;
					const x = e.clientX - rect.left - size / 2;
					const y = e.clientY - rect.top - size / 2;
					
					ripple.style.width = ripple.style.height = size + 'px';
					ripple.style.left = x + 'px';
					ripple.style.top = y + 'px';
					ripple.classList.add('ripple');
					
					this.appendChild(ripple);
					
					setTimeout(() => {
						ripple.remove();
					}, 600);
				});
			}

			document.querySelectorAll('.cta-button, .submit-btn').forEach(addRippleEffect);

			function animateCounter(element, target, duration = 2000) {
				let start = 0;
				const increment = target / (duration / 16);
				
				const timer = setInterval(() => {
					start += increment;
					element.textContent = Math.floor(start);
					
					if (start >= target) {
						element.textContent = target;
						clearInterval(timer);
					}
				}, 16);
			}

			function initCounters() {
				const statNumbers = document.querySelectorAll('.stat-number');
				const companyStatNumbers = document.querySelectorAll('.stat h3');
				
				statNumbers.forEach(stat => {
					const target = parseInt(stat.textContent);
					if (!isNaN(target)) {
						const observer = new IntersectionObserver((entries) => {
							entries.forEach(entry => {
								if (entry.isIntersecting) {
									animateCounter(stat, target);
									observer.unobserve(entry.target);
								}
							});
						});
						observer.observe(stat);
					}
				});

				companyStatNumbers.forEach(stat => {
					const text = stat.textContent;
					const target = parseInt(text.replace(/\D/g, ''));
					if (!isNaN(target)) {
						const observer = new IntersectionObserver((entries) => {
							entries.forEach(entry => {
								if (entry.isIntersecting) {
									animateCounter(stat, target);
									setTimeout(() => {
										stat.textContent = text;
									}, 2000);
									observer.unobserve(entry.target);
								}
							});
						});
						observer.observe(stat);
					}
				});
			}

			initCounters();

			document.querySelectorAll('a[href^="#"]').forEach(anchor => {
				anchor.addEventListener('click', function(e) {
					e.preventDefault();
					const target = document.querySelector(this.getAttribute('href'));
					if (target) {
						target.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}
				});
			});

			const style = document.createElement('style');
			style.textContent = `
				.ripple {
					position: absolute;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.6);
					transform: scale(0);
					animation: ripple-animation 0.6s linear;
					pointer-events: none;
				}
				
				@keyframes ripple-animation {
					to {
						transform: scale(4);
						opacity: 0;
					}
				}
				
				.fade-in {
					opacity: 1 !important;
					transform: translateY(0) !important;
				}
				
				button {
					position: relative;
					overflow: hidden;
				}
			`;
			document.head.appendChild(style);

			function addEntranceAnimations() {
				const elements = document.querySelectorAll('.hero-content, .hero-visual, .section-title, .about-content, .about-image');
				
				elements.forEach((element, index) => {
					element.style.opacity = '0';
					element.style.transform = 'translateY(50px)';
					element.style.transition = 'all 0.8s ease-out';
					
					setTimeout(() => {
						element.style.opacity = '1';
						element.style.transform = 'translateY(0)';
					}, index * 200);
				});
			}

			setTimeout(addEntranceAnimations, 500);

			function createParticles() {
				const heroSection = document.querySelector('.hero-section');
				if (!heroSection) return;

				for (let i = 0; i < 20; i++) {
					const particle = document.createElement('div');
					particle.style.cssText = `
						position: absolute;
						width: ${Math.random() * 6 + 2}px;
						height: ${Math.random() * 6 + 2}px;
						background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
						border-radius: 50%;
						left: ${Math.random() * 100}%;
						top: ${Math.random() * 100}%;
						animation: float ${Math.random() * 10 + 10}s infinite linear;
						pointer-events: none;
						z-index: 1;
					`;
					heroSection.appendChild(particle);
				}
			}

			const floatingStyle = document.createElement('style');
			floatingStyle.textContent = `
				@keyframes float {
					0% {
						transform: translateY(0px) rotate(0deg);
						opacity: 1;
					}
					50% {
						transform: translateY(-100px) rotate(180deg);
						opacity: 0.5;
					}
					100% {
						transform: translateY(-200px) rotate(360deg);
						opacity: 0;
					}
				}
			`;
			document.head.appendChild(floatingStyle);

			createParticles();

			document.addEventListener('click', function(e) {
				if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
					hamburger.classList.remove('active');
					navMenu.classList.remove('active');
				}
			});


			function lazyLoadImages() {
				const images = document.querySelectorAll('img[data-src]');
				const imageObserver = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const img = entry.target;
							img.src = img.dataset.src;
							img.classList.remove('lazy');
							imageObserver.unobserve(img);
						}
					});
				});

				images.forEach(img => imageObserver.observe(img));
			}

			lazyLoadImages();

			console.log('Harfi Corporation website loaded successfully!');
		});