//----------------------------------------------
//  CPET 13.2 — Real Thinking AI (JS Corpus Engine)
//----------------------------------------------

console.log("CPET 13.2 — Real Thinking AI startuje...");

// GLOBAL
let CORPUS = [];

//----------------------------------------------
// 1. Wczytanie pliku corpus.txt
//----------------------------------------------

async function loadCorpus() {
    try {
        const response = await fetch("corpus.txt");
        const text = await response.text();

        const fixed = fixBrokenWikipedia(text);
        CORPUS = smartSplit(fixed);

        console.log("Załadowano zdań:", CORPUS.length);
    } catch (e) {
        console.error("Błąd ładowania korpusu:", e);
    }
}

//----------------------------------------------
// 2. Naprawa uszkodzonych fragmentów Wikipedii
//----------------------------------------------

function fixBrokenWikipedia(text) {
    return text
        .replace(/\(ang\.$/gm, "(ang.)")
        .replace(/\(np\.$/gm, "(np.)")
        .replace(/\(tj\.$/gm, "(tj.)");
}

//----------------------------------------------
// 3. Inteligentny podział na zdania
//----------------------------------------------

function smartSplit(text) {
    const ABBREV = [
        "ang", "np", "itp", "itd", "tj", "tzn", "m.in", "dr", "hab", "prof",
        "fr", "niem", "łac", "zob", "rys", "al", "ur", "zm"
    ];

    let out = [];
    let current = "";

    for (let i = 0; i < text.length; i++) {
        current += text[i];

        if (text[i] === ".") {

            let token = current.trim().split(/\s+/).pop().replace(".", "").toLowerCase();
            if (ABBREV.includes(token)) continue;

            let next = text[i + 1] || "";

            if (next === " " && /[A-ZĄĆĘŁŃÓŚŻŹ]/.test(text[i + 2] || "")) {
                out.push(current.trim());
                current = "";
            } else if (next === "\n" || next === "\"" || next === ")") {
                out.push(current.trim());
                current = "";
            }
        }
    }

    if (current.trim().length > 0) out.push(current.trim());
    return out;
}

//----------------------------------------------
// 4. Normalizacja tekstu
//----------------------------------------------

function normalize(t) {
    return t.toLowerCase()
        .replace(/ą/g, "a")
        .replace(/ć/g, "c")
        .replace(/ę/g, "e")
        .replace(/ł/g, "l")
        .replace(/ń/g, "n")
        .replace(/ó/g, "o")
        .replace(/ś/g, "s")
        .replace(/ż/g, "z")
        .replace(/ź/g, "z")
        .replace(/[^a-z0-9 ]/g, " ")
        .trim();
}

//----------------------------------------------
// 5. Znalezienie najlepszego zdania
//----------------------------------------------

function findBestLine(word) {
    const nword = normalize(word);
    let best = null;
    let bestPos = 1e12;

    for (let line of CORPUS) {
        let nline = normalize(line);
        let pos = nline.indexOf(nword);
        if (pos !== -1 && pos < bestPos) {
            best = line;
            bestPos = pos;
        }
    }

    return best;
}

//----------------------------------------------
// 6. Zwrócenie dwóch pełnych zdań
//----------------------------------------------

function twoSentences(text) {
    let parts = smartSplit(text);

    if (parts.length >= 2)
        return parts[0] + " " + parts[1];

    return parts[0] || text;
}

//----------------------------------------------
// 7. Generowanie odpowiedzi dla użytkownika
//----------------------------------------------

function generateAnswer(msg) {
    let norm = normalize(msg);
    if (!norm) return "Napisz coś więcej 🙂";

    let key = norm.split(" ").pop();
    let found = findBestLine(key);

    if (!found)
        return "To ciekawe. Rozwiń proszę myśl — możemy wejść głębiej w temat.";

    return twoSentences(found);
}

//----------------------------------------------
// 8. Obsługa UI
//----------------------------------------------

document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage("Ty", text);

    let ans = generateAnswer(text);
    addMessage("CPET", ans);

    input.value = "";
});

function addMessage(who, text) {
    const box = document.getElementById("chat");
    let div = document.createElement("div");
    div.className = who === "Ty" ? "msgUser" : "msgAI";
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

//----------------------------------------------
// START
//----------------------------------------------

loadCorpus();
