function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Stops observing once visible
        }
    });
}, { threshold: 0.2 }); // Adjust how much needs to be visible

document.querySelectorAll(".reveal").forEach((section) => {
    observer.observe(section);
});
