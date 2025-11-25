interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
// ========== DOM ELEMENTS ==========
const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
const bookNowBtn = document.querySelector('#hero button') as HTMLButtonElement | null;
const addToCartButtons = document.querySelectorAll<HTMLButtonElement>('.bg-pink-600');
// ========== INIT ==========
function init() {
  setupSmoothScrolling();
  setupBookNowButton();
  setupContactForm();
  setupAddToCart();
  console.log('HibaBeauty interactive script loaded ✨');
}
// ========== SMOOTH SCROLLING ==========
function setupSmoothScrolling(): void {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}
// ========== BOOK NOW BUTTON ==========
function setupBookNowButton(): void {
  if (!bookNowBtn) return;
  bookNowBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
}
// ========== CONTACT FORM ==========
function setupContactForm(): void {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data: ContactFormData = {
      name: (formData.get('name') as string).trim(),
      email: (formData.get('email') as string).trim(),
      message: (formData.get('message') as string).trim()
    };
    // Validation
    if (!data.name || !data.email || !data.message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      showToast('Please enter a valid email.', 'error');
      return;
    }

    showToast('Thank you! Your message has been sent. We’ll contact you soon 💖', 'success');
    contactForm.reset();
  });
}
// ========== ADD TO CART ==========
let cartCount = 0;

function setupAddToCart(): void {
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('div');
      const productName = productCard?.querySelector('h3')?.textContent || 'Product';

      cartCount++;
      updateCartUI();
      showToast(`"${productName}" added to your cart! 🛍️`, 'success');

      // Visual feedback
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.disabled = true;
      button.classList.replace('bg-pink-600', 'bg-green-500');

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.replace('bg-green-500', 'bg-pink-600');
      }, 2000);
    });
  });
}

function updateCartUI(): void {
  console.log(`Cart items: ${cartCount}`);
}
// ========== TOAST NOTIFICATION ==========
function showToast(message: string, type: 'success' | 'error'): void {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium shadow-lg z-50 transition-opacity ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
// ========== START APP ==========
document.addEventListener('DOMContentLoaded', init);