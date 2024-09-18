// Immediately set the scroll position to home before any content is rendered
window.addEventListener("load", () => {
  const mainContent = document.getElementById("main-content");
  const homeSection = document.getElementById("home");
  const scrollLeft = homeSection.offsetLeft - mainContent.offsetLeft;
  mainContent.scrollLeft = scrollLeft;

  // Enable smooth scrolling after a short delay
  setTimeout(() => {
    mainContent.classList.add("smooth-scroll");
    // Add this line to show the content after a delay
    document.body.classList.add("content-visible");
  }, 100);
});

// Apply stored theme immediately
function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }
}

// Call this function immediately
applyStoredTheme();

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const navLinks = document.querySelectorAll("nav a");
  const themeToggle = document.getElementById("theme-toggle");

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      const scrollLeft = targetSection.offsetLeft - mainContent.offsetLeft;

      // Add 'navigating' class to the body
      document.body.classList.add("navigating");

      // Remove this line: updateActiveLink(link);

      mainContent.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });

      // Update active link after scroll animation
      setTimeout(() => {
        updateActiveLink(link);
        document.body.classList.remove("navigating");
      }, 500); // Adjust this value to match your scroll animation duration

      showContent();
    });
  });

  // Update active link on scroll
  mainContent.addEventListener("scroll", () => {
    const scrollPosition = mainContent.scrollLeft;
    const pageWidth = mainContent.clientWidth;
    const activeIndex = Math.round(scrollPosition / pageWidth);
    updateActiveLink(navLinks[activeIndex]);
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    toggleTheme();
  });

  // Add this function to handle theme toggling and storage
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);

    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");

    // Store the theme preference in localStorage
    localStorage.setItem("theme", newTheme);
  }

  // Add this function to apply the stored theme on page load
  function applyStoredTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
      const icon = themeToggle.querySelector("i");
      icon.classList.toggle("fa-sun", storedTheme === "light");
      icon.classList.toggle("fa-moon", storedTheme === "dark");
    }
  }

  // Call this function when the page loads
  applyStoredTheme();

  function updateActiveLink(activeLink) {
    navLinks.forEach((link) => {
      if (link !== activeLink) {
        link.classList.remove("active");
      }
    });
    activeLink.classList.add("active");
  }

  // Update active link on initial load
  updateActiveLink(document.querySelector('nav a[href="#home"]'));

  // Add this function to show content when navigating
  function showContent() {
    document.body.classList.add("content-visible");
  }
});
