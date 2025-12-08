// =======================================
// CPET 5.0 — GPT-SIM (Human-like AI)
// By Piotrek 💙
// =======================================

// Losowanie
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// ------------------------------
// 1. WYKRYWANIE KLUCZY I EMOCJI
// ------------------------------

function analyzeTone(text) {
    const t = text.toLowerCase();

    if (t.includes("dlaczego")) return "przyczyna";
    if (t.includes("co to")) return "definicja";
    if (t.includes("jak")) return "instrukcja";
    if (t.endsWith("?")) return "pytanie";
    if (t.includes("nie wiem")) return "niepewność";
    if (t.includes("boję") || t.includes("strach")) return "strach";
    if (t.includes("cieszę") || t.includes("fajnie")) return "pozytywne";
    return "neutralne";
}

// ------------------------------
// 2. BUDOWANIE ODPOWIEDZI GPT-STYLE
// ------------------------------

function mainThought(tone, userMsg) {
    const base = {
        pytanie: [
            `To ciekawe pytanie. Gdy spojrzymy na to szerzej, można zauważyć, że ${smartExplain()}.`,
            `Dobre pytanie — odpowiedź zależy od kilku czynników, ale w uproszczeniu ${shortAnswer()}.`
        ],
        przyczyna: [
            `Powód jest bardziej złożony, niż na pierwszy rzut oka się wydaje. Zwykle ${smartExplain()}.`,
            `To wynika z naturalnej dynamiki procesów — ${shortAnswer()}.`
        ],
        definicja: [
            `Można to opisać jako strukturę zależności, która ${smartExplain()}.`,
            `To pojęcie odnosi się do sposobu, w jaki system organizuje informacje.`
        ],
        instrukcja: [
            `Można to ująć w formie krótkiego procesu: ${stepByStep()}.`,
            `Najprościej rozbić to na kilka etapów — ${stepByStep()}.`
        ],
        niepewność: [
            `Rozumiem, że możesz się tak czuć. W takich sytuacjach warto pamiętać, że ${generalThought()}.`,
            `To całkowicie normalne — wiele osób tak reaguje. Kluczowe jest to, że ${smartExplain()}.`
        ],
        strach: [
            `Strach to naturalna reakcja organizmu. Czasem wynika z tego, że ${smartExplain()}.`,
            `To normalne, że tak się czujesz. Warto spojrzeć na to łagodniej — ${generalThought()}.`
        ],
        pozytywne: [
            `Super, że masz takie podejście! Często właśnie dzięki temu ${generalThought()}.`,
            `Brzmi świetnie! W takich momentach łatwiej zauważyć, że ${smartExplain()}.`
        ],
        neutralne: [
            `Rozumiem. Jeśli spojrzymy na to z dystansu — ${generalThought()}.`,
            `To interesujące spostrzeżenie. Można to też rozumieć tak: ${smartExplain()}.`
        ]
    };

    return pick(base[tone]);
}

function deepContext() {
    return pick([
        "W szerszym ujęciu prowadzi to do ciekawych konsekwencji teoretycznych.",
        "Daje to sporo miejsca do interpretacji, w zależności od perspektywy.",
        "Gdy zestawimy to z innymi zjawiskami, widać pewną spójność."
    ]);
}

function reflection() {
    return pick([
        "Warto o tym pamiętać, bo ułatwia to lepsze zrozumienie tematu.",
        "To pokazuje, że drobne elementy potrafią tworzyć większy obraz.",
        "Czasem takie pytania otwierają drogę do jeszcze ciekawszych wniosków."
    ]);
}

function closing() {
    return pick([
        "Jeśli chcesz, mogę to rozwinąć.",
        "Możemy pójść głębiej w ten temat.",
        "Daj znać, jeśli chcesz to przeanalizować dalej."
    ]);
}

// ------------------------------
// 3. FUNKCJE "PODOBNE DO GPT"
// ------------------------------

function smartExplain() {
    return pick([
        "jest to efekt współdziałania kilku mechanizmów",
        "wynika to z naturalnej struktury procesów poznawczych",
        "łączy się to z dynamiką informacji w systemie"
    ]);
}

function shortAnswer() {
    return pick([
        "chodzi głównie o zależność przyczynowo-skutkową",
        "to naturalna konsekwencja działania systemu"
    ]);
}

function stepByStep() {
    return pick([
        "1) obserwacja, 2) analiza, 3) wniosek",
        "1) rozpoznanie, 2) interpretacja, 3) działanie"
    ]);
}

function generalThought() {
    return pick([
        "można to rozumieć na kilku poziomach",
        "to bardziej złożone, niż wydaje się na pierwszy rzut oka"
    ]);
}

// ------------------------------
// 4. GŁÓWNY MODEL AI
// ------------------------------

function analyze(userMsg) {
    const tone = analyzeTone(userMsg);

    return (
        mainThought(tone, userMsg) +
        " " +
        deepContext() +
        " " +
        reflection() +
        " " +
        closing()
    );
}

// ------------------------------
// 5. FRONTEND
// ------------------------------

document.getElementById("sendBtn").addEventListener("click", sendMsg);
document.getElementById("userInput").addEventListener("keydown", e => {
    if (e.key === "Enter") sendMsg();
});

function sendMsg() {
    const inp = document.getElementById("userInput");
    const msg = inp.value.trim();
    if (!msg) return;

    addMessage("Ty", msg);

    const bot = analyze(msg);
    setTimeout(() => addMessage("CPET 5.0", bot), 200);

    inp.value = "";
}

function addMessage(name, txt) {
    const box = document.getElementById("chatBox");
    const el = document.createElement("div");
    el.innerHTML = `<b>${name}:</b> ${txt}`;
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
}
