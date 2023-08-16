const apiUrl = "https://opentdb.com/api.php?amount=10&category=9";

// Función para obtener las preguntas desde la API
async function getQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Procesar y mostrar las preguntas
        const questionsContainer = document.getElementById("questions-container");
        questionsContainer.innerHTML = ''; // Limpiar preguntas anteriores
        data.results.forEach(question => {
            const questionElement = document.createElement("div");
            questionElement.innerHTML = `
                <h3>${question.question}</h3>
                <p>Category: ${question.category}</p>
                <p>Type: ${question.type}</p>
                <p>Difficulty: ${question.difficulty}</p>
                <hr>
            `;
            questionsContainer.appendChild(questionElement);
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

// Agregar evento al botón para obtener y mostrar las preguntas al presionar
const fetchButton = document.getElementById("fetch-questions");
fetchButton.addEventListener("click", getQuestions);