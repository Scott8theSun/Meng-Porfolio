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
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.2 }); 

document.querySelectorAll(".reveal").forEach((section) => {
    observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("activate-chatbot");
    const chatbot = document.getElementById("chatbot");
    const closeChatbot = document.getElementById("close-chatbot");
    const messageInput = document.getElementById("chatbot-input");
    const sendMessage = document.getElementById("send-message");
    const messagesContainer = document.getElementById("chatbot-messages");

    // Toggle chatbot visibility
    chatbotToggle.addEventListener("click", function () {
        chatbot.classList.add("show");  
        chatbot.classList.remove("hidden");
    });

    closeChatbot.addEventListener("click", function () {
        chatbot.classList.remove("show");  
        setTimeout(() => chatbot.classList.add("hidden"), 300); 
    });


    // Predefined chatbot responses
    function getChatbotResponse(input) {
        const message = input.toLowerCase();

        if (message.includes("hello") || message.includes("hi")) 
            return "Hi there! How can I assist you today? 😊";
        
        if (message.includes("help")) 
            return "Try asking me: 'Tell me a joke', 'What can you do?', or 'Who made you?'.";
        
        if (message.includes("joke")) {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐞",
                "Why did the developer go broke? Because he used up all his cache. 💸",
                "Why do Java developers wear glasses? Because they don't C#! 🤓"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        
        if (message.includes("what can you do")) 
            return "I can respond to 'hello', 'help', tell jokes, and talk about my creator! Try asking 'Who made you?'.";
        
        if (message.includes("who made you")) 
            return "I was built by Meng Vue, a talented developer who's passionate about web design and programming! 😎";
        
        if (message.includes("who are you") || message.includes("what are you")) 
            return "I am Meng's Intern. What can I do for you?";
        
        return "I'm not sure how to respond to that. I'm just an Intern. Say 'help' to see what I can do.";
    }

    // Handle sending messages
    sendMessage.addEventListener("click", function () {
        const userMessage = messageInput.value.trim();
        if (userMessage === "") return;

        // Display user message
        const userMsgElement = document.createElement("p");
        userMsgElement.innerHTML = `<strong>You:</strong> ${userMessage}`;
        messagesContainer.appendChild(userMsgElement);

    
        // Clear input
        messageInput.value = "";

        // Create Typing Indicator
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("typing-indicator");
        typingIndicator.innerHTML = "<span></span><span></span><span></span>";
        messagesContainer.appendChild(typingIndicator);

        // Auto-scroll to the latest message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Delay chatbot response by 1.2 seconds
        setTimeout(() => {
            // Remove typing indicator
            messagesContainer.removeChild(typingIndicator);

            // Get chatbot response
            const botResponse = getChatbotResponse(userMessage);
            const botMsgElement = document.createElement("p");
            botMsgElement.innerHTML = `<strong>Meng's Intern:</strong> ${botResponse}`;
            messagesContainer.appendChild(botMsgElement);

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1200);
    });

    // Allow pressing Enter to send messages
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage.click();
        }
    });
});

// Theme Toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌓';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
}

// Particle Background
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#0984e3' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#0984e3',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

// Enhanced Scroll Animations
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-bar')) {
                const progress = entry.target.querySelector('.skill-progress');
                const targetWidth = entry.target.dataset.progress;
                progress.style.width = targetWidth;
            }
        }
    });
}, scrollObserverOptions);

document.querySelectorAll('.reveal, .skill-bar').forEach(el => scrollObserver.observe(el));

// Typing Animation for Introduction
const introText = document.querySelector('.section__text__p1');
const text = introText.textContent;
introText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        introText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when section is visible
const introObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter();
            introObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

introObserver.observe(document.querySelector('#profile'));
