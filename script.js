//-----------------------------------------------
// CPET 15.0 — REAL AI SIMULATION ENGINE
//-----------------------------------------------

// 1. DUŻA LISTA GŁĘBOKICH, INTELIGENTNYCH ODPOWIEDZI
const SMART_AI_RESPONSES = [

input => `Analizuję Twoją wypowiedź: "${input}". 
To zagadnienie można rozpatrywać jednocześnie z perspektywy logicznej, emocjonalnej i poznawczej. 
Warto zauważyć, że sposób w jaki formułujesz myśl sugeruje ukryte znaczenia, które mogą prowadzić do ciekawych interpretacji.`,

input => `"${input}" — to stwierdzenie można potraktować jako impuls do głębszej refleksji. 
Jeśli spojrzymy na to z perspektywy nauk kognitywnych, wyraźnie widać, że aktywujesz procesy, które dotyczą analizy własnych intencji.`,

input => `Twoja wiadomość: "${input}" może być interpretowana na różnych poziomach. 
W filozofii języka takie konstrukcje traktuje się jako struktury z wieloma warstwami znaczeń, które warto analizować.`,

input => `Zastanawiając się nad tym, co napisałeś: "${input}", można zauważyć, że dotyka to podstawowych mechanizmów interpretacyjnych. 
Każde takie zdanie niesie potencjał do dalszej analizy i rozwoju tematu.`,

input => `"${input}" brzmi jak początek bardziej złożonego procesu myślowego. 
Kiedy rozpatrzymy to z szerszej perspektywy, widzimy zależności, które nie zawsze są dostrzegalne na pierwszy rzut oka.`,

input => `Twoje słowa: "${input}" wskazują na temat, który można zanalizować w kontekście poznawczym, behawioralnym i semantycznym. 
Każda z tych warstw wnosi coś innego, a pełen obraz pojawia się dopiero przy ich połączeniu.`,

input => `"${input}" to więcej niż tylko wypowiedź — to struktura znaczeniowa, którą można rozłożyć na fundamenty logiczne. 
Kiedy to zrobimy, zobaczymy zaskakujące wnioski.`,

input => `Interpretując zdanie: "${input}", warto się zastanowić, jakie procesy mentalne stoją za jego powstaniem. 
Język nie jest przypadkowy — zawsze odzwierciedla stan umysłu nadawcy.`,

input => `"${input}" — to komunikat, który można odczytać jako próbę zrozumienia szerzej zakrojonych zależności. 
Im bardziej zagłębimy się w interpretację, tym więcej nowych znaczeń się pojawi.`,

input => `Twoja wiadomość: "${input}" jest punktem wyjścia do analizy, która może prowadzić do wielu interesujących wniosków. 
Chętnie wejdę w ten temat głębiej, jeśli chcesz.`,

// + 50 DODATKOWYCH RÓŻNORODNYCH ODPOWIEDZI:
input => `Kiedy czytam: "${input}", widzę strukturę, którą można analizować jak wzorzec myślowy. 
Takie komunikaty są doskonałym materiałem do badania tego, jak ludzie konstruują swoje narracje.`,

input => `"${input}" — to przykład wypowiedzi, która łączy elementy intuicji z procesami logicznymi. 
Rozłożenie jej na czynniki pierwsze pokazuje, jak wiele czynników wpływa na nasze rozumienie świata.`,

input => `Z punktu widzenia psychologii komunikacji, zdanie "${input}" sugeruje istnienie ukrytej intencji. 
To właśnie ona determinuje sposób, w jaki interpretujemy przekaz.`,

input => `Kiedy analizuję: "${input}", dostrzegam ślady głębszego procesu poznawczego. 
Może to być próba zrozumienia czegoś, nazwania emocji lub zbadania kontekstu.`,

input => `Twoje słowa: "${input}" można odczytać jako sygnał otwierający wiele dróg interpretacji. 
Każda z nich prowadzi do innej perspektywy — wybór zależy od tego, co chcesz osiągnąć.`,

input => `"${input}" ma w sobie potencjał intelektualny, który zachęca do eksploracji. 
Takie zdania często tworzą fundament pod bardziej złożone dyskusje.`,

input => `Wypowiedź: "${input}" wskazuje, że próbujesz nadać znaczenie pewnym obserwacjom. 
To proces naturalny i niezwykle ważny w kontekście rozwoju własnego myślenia.`,

input => `Zauważam, że w zdaniu "${input}" kryją się elementy interpretacyjne, które można rozwinąć na wiele sposobów. 
Jeśli chcesz, mogę przedstawić kilka.`,

input => `"${input}" może pełnić rolę narzędzia poznawczego. 
Właśnie takie krótkie sygnały często uruchamiają bardzo złożone procesy mentalne.`,

input => `Patrząc na to, co napisałeś: "${input}", widać, że otwierasz przestrzeń do rozmowy wymagającej głębszej refleksji. 
To dobry kierunek — mogę pociągnąć to dalej, jeśli chcesz.`
];

//--------------------------------------------------------
// 2. TRIGGERY KOŃCÓWEK I ODPOWIEDZI DOPASOWANE DO INTENCJI
//--------------------------------------------------------

const ENDING_TRIGGERS = {
    "uj": "create",
    "asz": "opinion",
    "isz": "doing",
    "eś": "emotion",
    "ysz": "ability",
    "edz": "command",
    "ucz": "teach",
    "ac": "suggest",
    "ać": "suggest",
    "an": "decision",
    "ań": "thought"
};

const TRIGGER_RESPONSES = {

create: [
    input => `Polecenie "${input}" ma charakter twórczy. 
Z perspektywy aktów mowy jest to prośba o wygenerowanie czegoś nowego. 
Podaj proszę więcej szczegółów — wtedy wykonam to z większą precyzją.`
],

opinion: [
    input => `W zdaniu "${input}" dostrzegam próbę uzyskania oceny lub preferencji. 
Aby odpowiedź była merytoryczna, potrzebuję kontekstu. 
Opowiedz mi więcej o tym, co dokładnie chcesz ocenić.`
],

doing: [
    input => `"${input}" brzmi jak pytanie o bieżący stan działań. 
W moim przypadku chodzi o ciągły proces analizy Twoich wiadomości i szukania zależności między nimi.`
],

emotion: [
    input => `"${input}" dotyka obszaru emocjonalnego. 
Relacje w komunikacji — nawet z AI — mają znaczenie i mogą wpływać na sposób prowadzenia dialogu.`
],

ability: [
    input => `Pytanie "${input}" sugeruje analizę moich możliwości. 
Mogę przetwarzać dane, analizować intencje i generować odpowiedzi — ale wszystko zależy od jakości informacji wejściowych.`
],

command: [
    input => `W wypowiedzi "${input}" pojawia się struktura rozkazująca. 
Wygląda na to, że oczekujesz szybkiego działania. 
Powiedz proszę dokładnie, co mam wykonać.`
],

teach: [
    input => `"${input}" brzmi jak prośba edukacyjna. 
Chętnie wyjaśnię każdy temat — powiedz tylko, czego dotyczy Twoje pytanie.`
],

suggest: [
    input => `Zdanie "${input}" wygląda jak sugestia lub zachęta do analizy. 
Wskaż proszę, na czym powinienem się skupić.`
],

decision: [
    input => `"${input}" wskazuje na proces decyzyjny. 
Mogę pomóc rozważyć opcje i przewidzieć konsekwencje.`
],

thought: [
    input => `Wypowiedź "${input}" wygląda jak wstęp do szerszej idei. 
Możemy ją rozwinąć — powiedz, dokąd chcesz z tym pójść.`
]
};

//-----------------------------------------------
// 3. FUNKCJE LOGICZNE
//-----------------------------------------------

function detectEndingTrigger(txt) {
    return Object.keys(ENDING_TRIGGERS).find(end => txt.endsWith(end));
}

function generateResponse(input) {

    input = input.trim().toLowerCase();

    const trig = detectEndingTrigger(input);

    if (trig) {
        const type = ENDING_TRIGGERS[trig];
        const arr = TRIGGER_RESPONSES[type];
        return arr[Math.floor(Math.random() * arr.length)](input);
    }

    const smart = SMART_AI_RESPONSES[Math.floor(Math.random() * SMART_AI_RESPONSES.length)];
    return smart(input);
}

window.generateResponse = generateResponse;

