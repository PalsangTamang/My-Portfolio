// ========================================
// PALSANG'S CAFE - MAIN JAVASCRIPT
// ========================================

// ================= MENU DATA =================
const menuData = [
  { name: "Milk Coffee", price: 80, category: "coffee", img: "cofee/Milk Coffee Health B.png", badge: "Popular" },
  { name: "Black Tea", price: 50, category: "tea", img: "tea/white cup of tea. 17.png", badge: "" },
  { name: "Chocolate Cake", price: 230, category: "dessert", img: "deserts/The BEST Chocolate C.png", badge: "Best Seller" },
  { name: "Momo", price: 280, category: "khaja", img: "khaja/Nepali-Momo-Recipe-Gloria-Apara-Nomadicchica.com-4-e1583334843281.jpg", badge: "Signature" },
  { name: "Keema Noodles", price: 150, category: "khaja", img: "khaja/keema noodles.png", badge: "" },
  { name: "Choumin", price: 140, category: "khaja", img: "khaja/chaumin.png", badge: "" },
  { name: "Chicken Khana", price: 250, category: "khana", img: "khana/Authentic Thakali kh.png", badge: "Thakali Set" },
  { name: "Mottun Khana", price: 300, category: "khana", img: "khana/Thakali Khana Set.png", badge: "" },
  { name: "Buff Khana", price: 280, category: "khana", img: "khana/The Homely Flavours .png", badge: "" },
  { name: "Tuborg", price: 300, category: "beer", img: "beer/Buy Tuborg Beer onli.png", badge: "" },
  { name: "Gorkha Strong", price: 275, category: "beer", img: "beer/Gorkha Premium Beer .png", badge: "Local Favorite" },
  { name: "Nepal Ice", price: 200, category: "beer", img: "beer/CG Nepal Ice Premium.png", badge: "" },
  { name: "Sprite", price: 80, category: "soft", img: "softdrinks/20-facts-about-sprite-1695406210.jpg", badge: "" },
  { name: "Coke", price: 90, category: "soft", img: "softdrinks/oar2.jpg", badge: "" },
  { name: "Fanta", price: 80, category: "soft", img: "softdrinks/d30mylt-f3e22640-138e-4233-91ec-b7b49d37380b.jpg", badge: "" },
  { name: "Mango Juice", price: 75, category: "soft", img: "softdrinks/OIP.webp", badge: "Fresh" },
  { name: "Whiskey", price: 600, category: "hard", img: "harddrinks/OIP.webp", badge: "Premium" }
];

let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// ================= TESTIMONIALS DATA =================
const testimonialsData = [
  { name: "Suman Thapa", text: "The best coffee I've ever had in Kathmandu! The ambiance is amazing and the staff is very friendly. Highly recommended!", rating: 5, avatar: "👨" },
  { name: "Priya Sharma", text: "Palsang's Cafe is my go-to place for momo and coffee. The quality is consistent and the service is excellent!", rating: 5, avatar: "👩" },
  { name: "Rajesh KC", text: "Beautiful cafe with great vibes. Their Thakali Khana set is authentic and delicious. Will visit again!", rating: 4, avatar: "👨" },
  { name: "Anjali Gurung", text: "Love the cozy atmosphere! Perfect for working or catching up with friends. Their chocolate cake is to die for!", rating: 5, avatar: "👩" }
];

// ================= LOADER =================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 800);
    }
  }, 2000);
  
  animateCounters();
  renderMenu();
  updateCartDisplay();
  updateCartCount();
  initTestimonials();
  initLightbox();
  initScrollReveal();
  initCustomCursor();
});

// ================= CUSTOM CURSOR =================
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  
  if (!cursor || !follower) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
  });
  
  document.querySelectorAll('a, button, .menu-card, .filter-tab').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      follower.style.transform = 'scale(1.5)';
      follower.style.borderColor = 'var(--primary)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      follower.style.transform = 'scale(1)';
    });
  });
}

// ================= RENDER MENU =================
function renderMenu() {
  const container = document.getElementById('menuGrid');
  if (!container) return;
  
  const filtered = currentFilter === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === currentFilter);
  
  container.innerHTML = filtered.map((item, index) => `
    <div class="menu-card" data-aos="fade-up" data-aos-delay="${index * 50}">
      <div class="menu-card-img">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='https://placehold.co/400x300?text=${encodeURIComponent(item.name)}'">
        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card-content">
        <h3 class="menu-card-title">${item.name}</h3>
        <div class="menu-card-price">
          Rs.${item.price} <small>per item</small>
        </div>
        <button class="menu-card-btn" onclick="addToCart('${item.name}', ${item.price})">
          <i class="fas fa-plus-circle"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// ================= FILTER MENU =================
function filterMenu(type) {
  currentFilter = type;
  renderMenu();
  
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-filter') === type) {
      tab.classList.add('active');
    }
  });
}

// Initialize filter buttons
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    filterMenu(tab.getAttribute('data-filter'));
  });
});

// ================= ADD TO CART =================
function addToCart(name, price) {
  cartItems.push({ name, price, id: Date.now() });
  saveCart();
  showNotification(`${name} added to cart!`, 'success');
  updateCartCount();
  
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.style.animation = 'pulseGlow 0.5s';
    setTimeout(() => cartBtn.style.animation = '', 500);
  }
}

// ================= REMOVE FROM CART =================
function removeFromCart(index) {
  const removedItem = cartItems[index];
  cartItems.splice(index, 1);
  saveCart();
  showNotification(`${removedItem.name} removed`, 'info');
  updateCartCount();
}

// ================= UPDATE CART DISPLAY =================
function updateCartDisplay() {
  const container = document.getElementById('cartItemsList');
  const totalSpan = document.getElementById('cartTotal');
  
  if (!container) return;
  
  if (cartItems.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:50px 20px;">
        <i class="fas fa-shopping-bag" style="font-size:60px; color:#ddd;"></i>
        <p style="margin-top:15px; color:#999;">Your cart is empty</p>
        <button class="btn-primary" style="margin-top:20px; padding:10px 25px;" onclick="toggleCart()">Continue Shopping</button>
      </div>
    `;
    totalSpan.innerText = '0';
    return;
  }
  
  let total = 0;
  container.innerHTML = cartItems.map((item, idx) => {
    total += item.price;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Rs. ${item.price}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${idx})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  }).join('');
  
  totalSpan.innerText = total;
}

// ================= UPDATE CART COUNT =================
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cartItems.length;
    cartCount.style.animation = 'pulseGlow 0.5s';
    setTimeout(() => cartCount.style.animation = '', 500);
  }
}

// ================= SAVE CART =================
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartDisplay();
}

// ================= CLEAR CART =================
function clearCart() {
  if (cartItems.length === 0) {
    showNotification('Cart is already empty!', 'warning');
    return;
  }
  cartItems = [];
  saveCart();
  showNotification('Cart cleared successfully!', 'success');
  updateCartCount();
}

// ================= TOGGLE CART =================
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  drawer.classList.toggle('active');
}

// ================= PAY WITH ESEWA =================
function payWithEsewa() {
  if (cartItems.length === 0) {
    showNotification('Cart is empty! Add items first.', 'error');
    return;
  }
  const total = cartItems.reduce((sum, i) => sum + i.price, 0);
  alert(`✅ Redirecting to eSewa for payment of Rs.${total}...\n(Demo Mode - Integration Ready)`);
}

// ================= NOTIFICATION =================
function showNotification(msg, type = 'success') {
  const colors = {
    success: '#27ae60',
    error: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db'
  };
  
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };
  
  const notif = document.createElement('div');
  notif.innerHTML = `<i class="fas ${icons[type]}"></i> ${msg}`;
  notif.style.cssText = `
    position: fixed; bottom: 100px; right: 30px;
    background: ${colors[type]}; color: white; padding: 14px 25px;
    border-radius: 12px; z-index: 9999; font-weight: 500;
    animation: slideInRight 0.3s ease-out, fadeOut 3s ease-out 2.5s forwards;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

// ================= COUNTER ANIMATION =================
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 80;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// ================= TESTIMONIALS SLIDER =================
let currentTestimonial = 0;
let testimonialInterval;

function initTestimonials() {
  renderTestimonials();
  startTestimonialAutoSlide();
  
  document.getElementById('prevTestimonial')?.addEventListener('click', () => {
    stopTestimonialAutoSlide();
    currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
    renderTestimonials();
    startTestimonialAutoSlide();
  });
  
  document.getElementById('nextTestimonial')?.addEventListener('click', () => {
    stopTestimonialAutoSlide();
    currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
    renderTestimonials();
    startTestimonialAutoSlide();
  });
}

function renderTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  
  if (!track) return;
  
  track.innerHTML = testimonialsData.map(testimonial => `
    <div class="testimonial-card">
      <div class="testimonial-avatar">
        ${testimonial.avatar}
      </div>
      <p class="testimonial-text">"${testimonial.text}"</p>
      <h4 class="testimonial-name">${testimonial.name}</h4>
      <div class="testimonial-rating">
        ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
      </div>
    </div>
  `).join('');
  
  track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  
  if (dotsContainer) {
    dotsContainer.innerHTML = testimonialsData.map((_, i) => `
      <span class="dot ${i === currentTestimonial ? 'active' : ''}" onclick="goToTestimonial(${i})"></span>
    `).join('');
  }
}

function goToTestimonial(index) {
  stopTestimonialAutoSlide();
  currentTestimonial = index;
  renderTestimonials();
  startTestimonialAutoSlide();
}

function startTestimonialAutoSlide() {
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
    renderTestimonials();
  }, 5000);
}

function stopTestimonialAutoSlide() {
  if (testimonialInterval) clearInterval(testimonialInterval);
}

// Make goToTestimonial global
window.goToTestimonial = goToTestimonial;

// ================= SCROLL REVEAL =================
function initScrollReveal() {
  const fadeElements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// ================= LIGHTBOX =================
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');
  
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
}

// ================= SCROLL PROGRESS & NAVBAR =================
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById('progress');
  if (progressBar) progressBar.style.width = scrolled + '%';
  
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ================= DARK MODE =================
const darkBtn = document.getElementById('darkModeBtn');
const isDark = localStorage.getItem('darkMode') === 'true';

if (isDark) {
  document.body.classList.add('dark');
  darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDarkNow = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDarkNow);
  darkBtn.innerHTML = isDarkNow ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ================= LANGUAGE TOGGLE =================
let isNepali = false;
document.getElementById('langBtn').addEventListener('click', () => {
  isNepali = !isNepali;
  showNotification(isNepali ? '🇳🇵 नेपाली भाषामा स्वागत छ!' : '🇬🇧 Welcome to English mode!', 'info');
});

// ================= RESERVATION FORM =================
document.getElementById('reserveForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('🎉 Reservation Submitted Successfully! We\'ll contact you soon.');
  e.target.reset();
});

// ================= SCROLL TO MENU =================
function scrollToMenu() {
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// ================= MOBILE MENU TOGGLE =================
document.getElementById('menuToggle')?.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  }
});

// ================= SMOOTH SCROLL FOR NAV LINKS =================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Make functions global
window.filterMenu = filterMenu;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.toggleCart = toggleCart;
window.payWithEsewa = payWithEsewa;
window.scrollToMenu = scrollToMenu;