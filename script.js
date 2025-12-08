//
// CPET 9.0 — Chain-of-Thought Simulator
// Styl: GPT-4, logiczny, analityczny, poważny
// Kluczowa funkcja: wewnętrzne myślenie przed każdą odpowiedzią
//

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// PAMIĘĆ
let memory = {
    lastUserInput: "",
    lastIntent: "",
    conversation: []
};

// ----------------------------
//  ANALIZA INTENCJI
// ----------------------------
function analyzeIntent(text) {
    text = text.toLowerCase();

    if (text.includes("kim jesteś") || text.includes("kto ty"))
        return "identity";

    if (text.includes("co robisz") || text.includes("co porabiasz"))
        return "activity";

    if (text.includes("dlaczego") || text.startsWith("czemu"))
        return "why";

    if (text.includes("co to jest"))
        return "definition";

    if (text.includes("jak działa"))
        return "explain";

    if (text.includes("?"))
        return "generalQuestion";

    return "generalMessage";
}


// ----------------------------
//  MODUŁY ODPOWIEDZI (finalne, skrócone jak GPT-4)
// ----------------------------
const FinalModules = {

    identity(thought) {
        return "Jestem CPET — system analityczny zaprojektowany do logicznej rozmowy. " + thought.summary;
    },

    activity(thought) {
        return "Analizuję twoją wiadomość i dobieram odpowiedź w oparciu o kontekst i strukturę rozmowy. " + thought.summary;
    },

    why(thought) {
        return "Przyczyna wynika z kilku nakładających się czynników — mogę rozwinąć to szerzej. " + thought.summary;
    },

    explain(thought) {
        return "Mechanizm działania można ująć jako sekwencję analizy, interpretacji i reakcji systemu. " + thought.summary;
    },

    definition(thought) {
        return "Można to rozumieć jako pojęcie opisujące określone zjawisko lub mechanizm. " + thought.summary;
    },

    generalQuestion(thought) {
        return "To interesujące pytanie, które można ująć na kilka sposobów. " + thought.summary;
    },

    generalMessage(thought) {
        return "Rozumiem. Jeśli chcesz, możemy rozwinąć ten wątek. " + thought.summary;
    }
};


// ----------------------------
//  MEGA FUNKCJA: CHAIN OF THOUGHT
//  CPET 9.0 najpierw *myśli wewnętrznie*
// ----------------------------
function generateChainOfThought(userInput, intent) {

    // wewnętrzny dialog – ukryty
    const hiddenThoughts = [
        "Analizuję strukturę zdania i szukam ukrytej intencji.",
        "Sprawdzam, czy użytkownik oczekuje faktów, interpretacji czy relacji osobistej.",
        "Porównuję wiadomość z wcześniejszym kontekstem rozmowy.",
        "Buduję kilka możliwych odpowiedzi i wybieram najbardziej spójną.",
        "Patrzę, jaki poziom szczegółowości będzie najbardziej trafny.",
        "Starannie dobieram ton — neutralny, analityczny, poważny."
    ];

    // wybór 2–4 myśli
    let thoughts = [];
    const count = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < count; i++) {
        thoughts.push(pick(hiddenThoughts));
    }

    // podsumowanie — to jest używane w finalnej odpowiedzi
    const summary = pick([
        "Starałem się ująć to w sposób możliwie klarowny.",
        "Ująłem to w formie najbardziej logicznej odpowiedzi.",
        "Dostosowałem wyjaśnienie do twojego stylu pytania.",
        "Zsyntetyzowałem najważniejsze elementy odpowiedzi."
    ]);

    return {
        internal: thoughts,   // ukryty chain of thought
        summary: summary      // to wchodzi do odpowiedzi końcowej
    };
}


// ----------------------------
//  GŁÓWNA FUNKCJA ODPOWIEDZI
// ----------------------------
function CPETreply(userInput) {

    memory.lastUserInput = userInput;
    memory.conversation.push(userInput);

    const intent = analyzeIntent(userInput);

    // 1. Najpierw CPET tworzy ukrytą analizę
    const thought = generateChainOfThought(userInput, intent);

    // 2. Potem generuje elegancką, skróconą odpowiedź GPT-4
    return FinalModules[intent](thought);
}
