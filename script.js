// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const allBtns = document.querySelectorAll('.tab-btn');
    allBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab and activate button
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
    
    // Initialize carousel when carousel tab is opened
    if (tabName === 'carousel') {
        setTimeout(() => {
            updateCarousel();
        }, 100);
    }
}

// Weather API functionality
async function fetchWeather() {
    const cityInput = document.querySelector('.city-input');
    const city = cityInput.value.trim();
    const weatherInfo = document.getElementById('weatherInfo');
    const btn = event.target;
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    btn.innerHTML = '<span class="loading"></span> Loading...';
    btn.disabled = true;

    try {
        // Using OpenWeatherMap API (you can replace with any weather API)
        const API_KEY = 'demo'; // For demo purposes
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        // Since we don't have a real API key, let's simulate weather data
        const weatherData = {
            main: {
                temp: Math.round(Math.random() * 30 + 5),
                feels_like: Math.round(Math.random() * 30 + 5),
                humidity: Math.round(Math.random() * 50 + 30),
                pressure: Math.round(Math.random() * 50 + 1000)
            },
            weather: [
                {
                    description: ['sunny', 'cloudy', 'partly cloudy', 'rainy', 'clear'][Math.floor(Math.random() * 5)]
                }
            ],
            wind: {
                speed: Math.round(Math.random() * 10 + 2)
            }
        };

        displayWeather(weatherData, city);
    } catch (error) {
        console.error('Weather fetch error:', error);
        // Fallback to demo data
        const demoData = {
            main: {
                temp: 22,
                feels_like: 25,
                humidity: 65,
                pressure: 1013
            },
            weather: [{ description: 'partly cloudy' }],
            wind: { speed: 5 }
        };
        displayWeather(demoData, city);
    } finally {
        btn.innerHTML = 'Get Weather';
        btn.disabled = false;
    }
}

function displayWeather(data, city) {
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = `${data.weather[0].description} in ${city}`;
    document.getElementById('feelsLike').textContent = `${data.main.feels_like}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    
    document.getElementById('weatherInfo').classList.add('active');
}

// Quiz functionality
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correct: 0
    },
    {
        question: "Which CSS property is used for changing the text color?",
        answers: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "What is the correct JavaScript syntax for changing the content of an HTML element?",
        answers: ["document.getElementById('demo').innerHTML = 'Hello World!'", "document.getElement('demo').innerHTML = 'Hello World!'", "#demo.innerHTML = 'Hello World!'", "document.getElementById('demo').value = 'Hello World!'"],
        correct: 0
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: ["class", "style", "styles", "font"],
        correct: 1
    },
    {
        question: "What does CSS stand for?",
        answers: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

function displayQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const question = quizQuestions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.textContent = answer;
        answerDiv.onclick = () => selectAnswer(index);
        answersContainer.appendChild(answerDiv);
    });
    
    document.getElementById('nextBtn').style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const answers = document.querySelectorAll('.answer');
    const correctIndex = quizQuestions[currentQuestion].correct;
    
    answers.forEach((answer, index) => {
        answer.onclick = null; // Disable further clicks
        if (index === correctIndex) {
            answer.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            answer.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === correctIndex) {
        score++;
    }
    
    document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    displayQuestion();
}

function showQuizResult() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('finalScore').textContent = `${score}/${quizQuestions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    displayQuestion();
}

// Carousel functionality
let currentSlide = 0;
const totalSlides = 5;

function initCarousel() {
    const navContainer = document.getElementById('carouselNav');
    navContainer.innerHTML = ''; // Clear existing dots
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        navContainer.appendChild(dot);
    }
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
}

function updateCarousel() {
    const slides = document.getElementById('carouselSlides');
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayQuestion();
    initCarousel();
    
    // Load default weather
    setTimeout(() => {
        fetchWeather();
    }, 1000);
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', function(event) {
    // Only handle keyboard navigation when carousel tab is active
    const carouselTab = document.getElementById('carousel-tab');
    if (carouselTab.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            previousSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    }
});