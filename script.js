// ================= CPET 30.0 — GPT-4 Neutral Reasoning Engine =================

// 1. ANALIZA TEMATU UŻYTKOWNIKA
function detectTopic(text) {
    text = text.toLowerCase();

    if (text.includes("dlaczego") || text.includes("czemu")) return "explanation";
    if (text.includes("jak działa") || text.includes("jak to działa")) return "mechanism";
    if (text.includes("co to") || text.includes("wyjaśnij")) return "definition";
    if (text.includes("problem") || text.includes("martwi")) return "emotional";
    if (text.includes("samolot") || text.includes("airbus") || text.includes("boeing")) return "aviation";
    if (text.includes("czy")) return "opinion";

    return "general";
}

// 2. WYCIĄGANIE KLUCZOWYCH SŁÓW (udawanie semantyki)
function extractKeywords(text) {
    let words = text.toLowerCase().split(" ");
    let filtered = words.filter(w => w.length > 3);
    return filtered.slice(0, 5).join(", ");
}

// 3. BUDOWANIE MĄDREGO WYJAŚNIENIA (serce GPT-4 style)
function buildExplanation(topic, text) {
    switch(topic) {

        case "explanation":
            return "To pytanie sugeruje chęć zrozumienia przyczyny danego zjawiska. Najczęściej wymaga to spojrzenia na szerszy kontekst i zależności między elementami.";

        case "mechanism":
            return "Aby zrozumieć mechanizm działania, warto rozłożyć proces na kroki i przeanalizować interakcje między poszczególnymi elementami systemu.";

        case "definition":
            return "Najprościej zacząć od omówienia podstawowych pojęć i ich wzajemnych relacji — to umożliwia precyzyjne zrozumienie zagadnienia.";

        case "emotional":
            return "Twoja wiadomość ma emocjonalny charakter. Takie sytuacje zwykle wynikają z napięcia, niepewności lub potrzeby wsparcia. To zupełnie naturalne.";

        case "aviation":
            return "Lotnictwo to fascynująca dziedzina — łączy fizykę, aerodynamikę i inżynierię. Każdy model ma swoją specyfikę, historię i zastosowanie.";

        case "opinion":
            return "To pytanie wymaga rozważenia różnych perspektyw. Warto ocenić możliwe konsekwencje, motywacje i potencjalne scenariusze.";

        default:
            return "Poruszasz ciekawy temat. Można spojrzeć na niego z wielu stron, analizując zarówno logikę, jak i praktyczne zastosowania.";
    }
}

// 4. ROZSZERZENIE (drugie zdanie GPT-4 style)
function expand(text) {
    return "Jeśli spojrzymy na to z szerszej perspektywy, można dostrzec dodatkowe czynniki wpływające na sposób, w jaki interpretujemy to zagadnienie.";
}

// ================= FINALNY MÓZG CPET =================

function cpetBrain(text) {
    const topic = detectTopic(text);
    const keywords = extractKeywords(text);
    const explanation = buildExplanation(topic, text);
    const expansion = expand(text);

    return (
        `Analizuję Twoją wiadomość dotyczącą: ${keywords}.\n\n` +
        explanation + "\n\n" +
        expansion
    );
}



// ================= UI — INTERFEJS, ANIMACJA, CHAT ==================

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Dodanie dymku
function addMessage(text, who) {
    let msg = document.createElement("div");
    msg.className = "message " + who;
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// Animacja pisania (jak GPT)
function typeMessage(text) {
    return new Promise(resolve => {
        let index = 0;
        let msg = document.createElement("div");
        msg.className = "message bot typing";
        chat.appendChild(msg);

        function type() {
            msg.textContent = text.substring(0, index);
            index++;
            if (index <= text.length) {
                setTimeout(type, 10);
            } else {
                msg.classList.remove("typing");
                resolve();
            }
        }

        type();
        chat.scrollTop = chat.scrollHeight;
    });
}

// Wysyłanie wiadomości
async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const answer = cpetBrain(text);
    await typeMessage(answer);
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});
