// Inicialização do AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

// ========================================
// Menu Mobile Toggle
// ========================================
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

// Abrir menu mobile
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

// Fechar menu mobile
menuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// Fechar menu ao clicar em um link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// ========================================
// FAQ Accordion
// ========================================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector("i");

    // Toggle resposta
    answer.classList.toggle("hidden");

    // Rotacionar ícone
    if (answer.classList.contains("hidden")) {
      icon.style.transform = "rotate(0deg)";
    } else {
      icon.style.transform = "rotate(180deg)";
    }
  });
});

// ========================================
// Smooth Scroll para links de navegação
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// Header fixo com efeito ao rolar
// ========================================
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Adicionar shadow ao header quando rolar
  if (currentScroll > 100) {
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
    header.style.backdropFilter = "blur(10px)";
    header.style.background = "rgba(26, 35, 50, 1)";
  } else {
    header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    header.style.background = "rgba(26, 35, 50, 0)";
  }

  lastScroll = currentScroll;
});

// ========================================
// Animação de número contador (estatísticas)
// ========================================
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const animateNumbers = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ""));
        const suffix = text.replace(/[0-9]/g, "");
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= number) {
            stat.textContent = number + suffix;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + suffix;
          }
        }, 30);
      });
      observer.unobserve(entry.target);
    }
  });
};

const statsObserver = new IntersectionObserver(animateNumbers, observerOptions);
const statsSection = document.querySelector(".hero-gradient");
if (statsSection) {
  statsObserver.observe(statsSection);
}
