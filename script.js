const chat = document.getElementById("chat");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("send");

// AVATAR IMAGE
const BOT_AVATAR = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=PiotrekAI";
const USER_AVATAR = "https://api.dicebear.com/7.x/adventurer/svg?seed=User";

function addMessage(text, sender = "bot") {
    const box = document.createElement("div");
    box.className = "msgBox " + sender;

    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = sender === "bot" ? BOT_AVATAR : USER_AVATAR;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    box.appendChild(avatar);
    box.appendChild(bubble);

    chat.appendChild(box);
    chat.scrollTop = chat.scrollHeight;
}

// CPET 11.0 – pseudo GPT-like thinking engine
function CPETbrain(input) {
    input = input.toLowerCase();

    // Mini-LLM: detects topic and synthesizes a human-like answer
    const topics = [
        ["kim jesteś", "Czym mogę być, zależy od tego, czego potrzebujesz. Mogę być rozmówcą, przewodnikiem albo systemem, który próbuje zrozumieć Twój sposób myślenia."],
        ["co robisz", "Analizuję Twoją wiadomość i staram się powiązać ją z tym, co już wiem. Dzięki temu odpowiedź staje się głębsza i bardziej logiczna."],
        ["hej", "Hej! Widzę Cię i słyszę. Co masz dziś w głowie?"],
        ["jak dziala", "Przekształcam tekst na znaczenia, łączę je w struktury i dopiero wtedy buduję odpowiedź. To nie mechaniczne losowanie — to proces."],
    ];

    for (let t of topics) {
        if (input.includes(t[0])) return t[1];
    }

    // Default deep-thought answer
    return (
        "To, co mówisz, można rozumieć na kilku poziomach. " +
        "Jeśli spojrzymy szerzej, pojawiają się dodatkowe znaczenia, " +
        "które warto rozwinąć. Powiedz proszę — w którą stronę chcesz iść?"
    );
}

// Typing animation
function botReply(text) {
    addMessage("...", "bot");
    setTimeout(() => {
        // remove animation
        chat.lastChild.remove();
        addMessage(text, "bot");
    }, 700);
}

// SEND HANDLER
sendBtn.onclick = () => {
    const text = msgInput.value.trim();
    if (!text) return;

    addMessage(text, "user");

    const answer = CPETbrain(text);
    botReply(answer);

    msgInput.value = "";
};

msgInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendBtn.click();
});

