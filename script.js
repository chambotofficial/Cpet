const output = document.getElementById("output");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

// Funkcja skracająca wiadomość użytkownika do 1 sensownego fragmentu
function extractMeaning(text) {
    text = text.trim();
    if (text.length > 120) text = text.slice(0, 120) + "...";
    return text;
}

// SZABLONY ODPOWIEDZI – CPET wplata tekst użytkownika w inteligentny sposób
const SMART_TEMPLATES = [
    "To, co mówisz — \"{USER}\" — można analizować na kilku poziomach. Jeśli spojrzymy szerzej, pojawiają się dodatkowe znaczenia warte rozwinięcia. Który aspekt najbardziej Cię interesuje?",
    "Zatrzymałem się na Twojej myśli: \"{USER}\". To interesujące, bo prowadzi do szerszego kontekstu, o którym często się zapomina. Chcesz zgłębić ten temat dalej?",
    "Kiedy piszesz \"{USER}\", widzę w tym ważny kierunek rozmowy. Możemy przyjrzeć się temu z różnych perspektyw — praktycznej, emocjonalnej lub logicznej. Która Cię ciekawi?",
    "Twoja wiadomość — \"{USER}\" — jest dobrym punktem wyjścia. Jeśli rozbijemy to na mniejsze elementy, możemy dojść do ciekawych wniosków. W którą stronę chcesz iść?",
    "Odbieram z tego, co napisałeś (\"{USER}\"), że poruszasz temat, który może mieć głębsze znaczenie. Mogę Ci pomóc to uporządkować i przeanalizować, jeśli chcesz.",
    "\"{USER}\" — to brzmi jak pytanie, które dotyka szerszego obrazu. Możemy wejść w to głębiej i poszukać różnych interpretacji. Dasz znać, w jakim kierunku?",
    "Zastanowiłem się nad Twoją myślą: \"{USER}\". Takie rzeczy rzadko są jednoznaczne, dlatego warto spojrzeć z dystansu. Chcesz żebym rozwinął ten wątek?",
    "Widząc, że piszesz \"{USER}\", mam wrażenie, że chcesz dojść do czegoś konkretnego. Spróbuję pomóc — powiedz tylko, co jest dla Ciebie najważniejsze w tym temacie.",
    "To ciekawe, że wspominasz \"{USER}\". Wbrew pozorom ten temat ma wiele warstw i można go omówić na różne sposoby. Wolisz analizę logiczną czy bardziej luźną rozmowę?",
    "Gdy czytam \"{USER}\", widzę punkt wyjścia do głębszej refleksji. Mogę to rozwinąć na kilka sposobów — wybierz, w którą stronę chcesz pójść."
];

// Funkcja generująca odpowiedź
function generateResponse(userMsg) {
    const cleaned = extractMeaning(userMsg);
    const template = SMART_TEMPLATES[Math.floor(Math.random() * SMART_TEMPLATES.length)];
    return template.replace("{USER}", cleaned);
}

// Funkcja dodająca wiadomości do okna rozmowy
function addMessage(sender, text, avatar) {
    const bubble = document.createElement("div");
    bubble.className = "msg " + sender;

    bubble.innerHTML = `
        <img src="${avatar}" class="avatar">
        <div class="bubble">${text}</div>
    `;

    output.appendChild(bubble);
    output.scrollTop = output.scrollHeight;
}

button.addEventListener("click", () => {
    const txt = input.value.trim();
    if (txt === "") return;

    addMessage("user", txt, "user.png");
    const reply = generateResponse(txt);
    addMessage("bot", reply, "bot.png");

    input.value = "";
});

input.addEventListener("keypress", e => {
    if (e.key === "Enter") button.click();
});

