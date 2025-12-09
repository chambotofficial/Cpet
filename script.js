// Pobieramy elementy — teraz id="output" istnieje!
const output = document.getElementById("output");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

// Skraca wiadomość do max 120 znaków
function extractMeaning(text) {
    text = text.trim();
    if (text.length > 120) text = text.slice(0, 120) + "...";
    return text;
}

// Szablony odpowiedzi
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
    "Gdy czytam \"{USER}\", widzę punkt wyjścia do głębszej refleksji. Mogę to rozwinąć na kilka sposobów — wybierz, w którą stronę chcesz pójść.",
    "To, co mówisz – \"{USER}\" – można analizować na kilku poziomach. Jeśli spojrzymy szerzej, pojawiają się dodatkowe znaczenia warte rozwinięcia. Który aspekt najbardziej Cię interesuje?",
  "Zatrzymałem się na Twojej myśli: \"{USER}\". Widać, że to ważny kierunek rozmowy. Możemy przyjrzeć się temu z różnych perspektyw – praktycznej, emocjonalnej lub logicznej. Która Cię ciekawi?",
  "Kiedy piszesz \"{USER}\", widać w tym potencjał do głębszej analizy. Wolisz ujęcie bardziej systemowe czy przykład na szybko?",
  "Twoja wiadomość – \"{USER}\" – jest dobrym punktem wyjścia. Rozbijmy to na elementy i zobaczmy, co z tego wynika. Od czego zaczynamy?",
  "Odbieram z \"{USER}\", że poruszasz temat o kilku warstwach. Mogę pomóc to uporządkować, jeśli chcesz.",
  "\"{USER}\" – to brzmi jak wątek, który warto rozłożyć na czynniki. W którą stronę chcesz pójść: praktyki czy definicje?",
  "Myśl \"{USER}\" nie jest jednowarstwowa. Proponuję zarysować ramy i przejść do konkretów. Zgadzasz się?",
  "Widząc \"{USER}\", sugeruję krótką mapę zagadnienia: kontekst, cele, granice. Chcesz ją?",
  "To ciekawe: \"{USER}\". Spróbujmy wydzielić rdzeń tematu i to, co tylko go otacza.",
  "Gdy czytam \"{USER}\", widzę miejsce na definicję, przykład i wniosek. Który element najpierw?",
  "Ujęcie \"{USER}\" można uporządkować: co, dlaczego, jak. Od którego bloku startujemy?",
  "W \"{USER}\" widać napięcie między intuicją a strukturą. Chcesz, żebym nadał temu ramy?",
  "Sygnał \"{USER}\" sugeruje temat wielopoziomowy. Proponuję zacząć od krótkiej definicji.",
  "To \"{USER}\" ma kilka interpretacji zależnie od kontekstu. Wybierz jeden, a wejdziemy głębiej.",
  "Wokół \"{USER}\" możemy zbudować prostą architekturę: pojęcia, relacje, przykłady.",
  "Czytając \"{USER}\", proponuję podejście minimalne: tyle złożoności, ile trzeba, by było jasne.",
  "W \"{USER}\" ważne jest oddzielenie opisu od wyjaśnienia. Chcesz krótki schemat?",
  "Na bazie \"{USER}\" da się narysować mapę pojęć. Zaczynamy od rdzenia czy od peryferii?",
  "\"{USER}\" wymaga wyznaczenia granic sensowności. Zrobimy to wspólnie?",
  "Wrażenie po \"{USER}\": przyda się kompas – co jest celem, a co tylko tłem?",
  "Podchodząc do \"{USER}\", zaproponuję trzy kroki: nazwać, powiązać, ocenić.",
  "W kontekście \"{USER}\" dobrze działa zasada: najpierw minimalna definicja, potem rozszerzenia.",
  "Czy \"{USER}\" dotyczy bardziej pojęć, czy działania? To ułatwi wybór ścieżki.",
  "Słowo kluczowe z \"{USER}\" warto osadzić w prostym schemacie: definicja → przykład → wniosek.",
  "Dla \"{USER}\" mogę przygotować zwięzłą definicję i krótki zestaw pytań kontrolnych. Chcesz?",
  "Z \"{USER}\" zrobimy dwie warstwy: opis i interpretacja. Którą najpierw?",
  "Proponuję potraktować \"{USER}\" jak problem do rozpakowania: co w nim najważniejsze?",
  "Wokół \"{USER}\" da się wyznaczyć granice zastosowalności. Spróbować?",
  "\"{USER}\" domaga się separacji elementów. Wskaż, który najbardziej Cię interesuje.",
  "Słysząc \"{USER}\", proponuję krótki bilans: sens, ryzyko, możliwości.",
  "Przy \"{USER}\" sprawdza się reguła: najpierw ramy, potem detale. Zaczynamy od ram?",
  "Zbudujmy wokół \"{USER}\" logiczną ścieżkę. Krok pierwszy: nazwać bez nadinterpretacji.",
  "W \"{USER}\" warto użyć metajęzyka, by uniknąć zbędnej dosłowności. To ok?",
  "Czy \"{USER}\" ma dla Ciebie wymiar praktyczny, czy bardziej teoretyczny? Dostosuję podejście.",
  "Proponuję bieg przez trzy pytania wokół \"{USER}\": co to jest, po co, w jakich granicach.",
  "\"{USER}\" możemy rozstrzygnąć na poziomie definicji, albo pójść w przykłady. Wybierz.",
  "Najprościej: z \"{USER}\" robimy szkic definicji i testujemy go na przykładzie.",
  "W \"{USER}\" pomaga rozróżnić normę od heurystyki. Zarysować to teraz?",
  "Podejdźmy do \"{USER}\" jak do mapy: rdzeń, sąsiednie pojęcia, granice.",
  "Jeśli \"{USER}\" ma być jasne, skrócę język i pozostawię tylko rzeczy konieczne.",
  "Zacznijmy od definicji \"{USER}\", a potem przejdziemy do praktyki.",
  "Do \"{USER}\" zastosuję minimalny zestaw kategorii, żeby było przejrzyście.",
  "Z \"{USER}\" da się zrobić sensowny wniosek, jeśli nazwiemy warunki brzegowe.",
  "\"{USER}\" warto oprzeć na wspólnych mianownikach, aby porównanie miało sens.",
  "Dla \"{USER}\" przygotuję neutralne ramy, bez zbędnych szczegółów.",
  "Czy chcesz, abym potraktował \"{USER}\" bardziej opisowo czy wyjaśniająco?",
  "Przy \"{USER}\" zadam kilka pytań pomocniczych, żeby wyostrzyć kierunek.",
  "\"{USER}\": zróbmy krótką definicję i sprawdźmy, czy pasuje do Twojego kontekstu.",
  "Weźmy \"{USER}\" i przejdźmy przez prosty schemat argumentu: przesłanki → wniosek.",
  "Zaproponuję ramę dla \"{USER}\", dzięki której unikniemy chaosu interpretacyjnego.",
  "Dla \"{USER}\" mogę przygotować listę najczęstszych nieporozumień i jak ich uniknąć.",
  "Wokół \"{USER}\" dobrze działa przejrzysta narracja: jeden wątek naraz.",
  "\"{USER}\" możemy ująć w kategoriach: opis, przykład, wniosek. Od czego zaczynamy?",
  "Z \"{USER}\" zrobimy mini‑mapę: co jest centralne, co poboczne.",
  "Proponuję w \"{USER}\" jedno zdanie definicji i dwie konsekwencje. Brzmi ok?",
  "W \"{USER}\" ważne są granice: powiedz, czego nie chcesz w tej rozmowie.",
  "Dla \"{USER}\" warto ustalić cel: informacja, klarowność, decyzja. Co wybierasz?",
  "Na bazie \"{USER}\" przygotuję odpowiedź neutralną, żeby nie narzucać kontekstu.",
  "\"{USER}\" sygnalizuje obszar, który wymaga porządku. Mogę to zrobić.",
  "Ujęcie \"{USER}\" bez presji na szczegóły: najpierw struktura, potem doprecyzowanie.",
  "Jeśli \"{USER}\" jest szerokie, zacznijmy od jednego wątku, który Cię najbardziej obchodzi.",
  "\"{USER}\": proponuję separację poziomów, żeby nie mieszać porządków.",
  "Z \"{USER}\" przejdziemy w rytm: definicja → zakres → przykłady → wniosek.",
  "Wokół \"{USER}\" zachowam hedging, żeby uniknąć nadmiernych uogólnień.",
  "Przy \"{USER}\" użyję języka precyzyjnego i skromnego. To podejście pomaga.",
  "Ustawmy \"{USER}\" w prostych słowach, bez zbędnych ornamentów.",
  "Znaczenie \"{USER}\" zależy od kontekstu. Chcesz, żebym go zdefiniował?",
  "Powiedz, czy \"{USER}\" oczekuje definicji czy krótkiego przewodnika.",
  "W \"{USER}\" zostawię miejsce na korektę, jeśli coś będzie nieczytelne.",
  "Zadbam, by \"{USER}\" brzmiało jasno, nawet jeśli temat jest złożony.",
  "\"{USER}\" możemy zamknąć w jednym akapicie, a resztę rozwinąć, jeśli chcesz.",
  "Podstawowe pytanie do \"{USER}\": co jest tu najważniejsze dla Ciebie?",
  "Z \"{USER}\" odrzucę ozdobniki i zostawię sens. To dobry start.",
  "Jeśli \"{USER}\" to sygnał, zbuduję wokół niego ramę sensu.",
  "Wezmę \"{USER}\" i dostosuję ton: neutralnie, klarownie, bez presji.",
  "W \"{USER}\" przyda się porządek. Mogę go wprowadzić krok po kroku.",
  "Zobaczmy \"{USER}\" w trzech zdaniach: kontekst, sedno, konsekwencje.",
  "\"{USER}\" wymaga jednego wyboru: definicja czy przykład. Wybierz.",
  "Przy \"{USER}\" zajmę się językiem: precyzyjnie, bez nadmiaru.",
  "Z \"{USER}\" mogę zrobić krótką checklistę, żeby uporządkować myślenie.",
  "Jeśli \"{USER}\" ma warstwy, przejdźmy od rdzenia do obrzeży.",
  "\"{USER}\" zostawię z otwartą furtką na korektę — to bezpieczne.",
  "Dla \"{USER}\" przyjmę założenie minimalizmu: tylko rzeczy potrzebne.",
  "\"{USER}\" jest dobrym miejscem, by zacząć klarowną rozmowę.",
  "W odpowiedzi na \"{USER}\" zadbam o spójność i spokojny rytm.",
  "Z \"{USER}\" ułożę wniosek bez kategoryczności — neutralnie i jasno.",
  "Przy \"{USER}\" działam etapami: najpierw zdefiniować, potem rozwinąć.",
  "To, co piszesz – \"{USER}\" – można utrzymać w przejrzystej formie. Chcesz?",
  "\"{USER}\" nadaje się na krótką definicję plus dwa zdania kontekstu.",
  "Wyłapuję z \"{USER}\" sedno. Mogę je nazwać i zostawić pole do rozmowy.",
  "Zaproponuję odpowiedź na \"{USER}\" tak, by była uniwersalna i czytelna.",
  "Twoje \"{USER}\" potraktuję jak materiał do spokojnej, rzeczowej odpowiedzi.",
  "\"{USER}\" nie wymaga pośpiechu. Zróbmy to przejrzyście i bez presji.",
  "Uporządkuję \"{USER}\" i zaproponuję kierunek. Potem zdecydujesz, czy idziemy dalej.",
  "Wezmę \"{USER}\" i odpowiem w stylu: jasno, neutralnie, bez zbędnych ozdobników.",
  "\"{USER}\" rozwinę na tyle, by było zrozumiałe, ale nie przeładowane.",
  "Zadbam, żeby \"{USER}\" miało sensowną strukturę: początek, środek, koniec.",
  "Przy \"{USER}\" skupię się na tym, co dodaje wartość — resztę pominę.",
  "\"{USER}\" wprowadzę delikatnie, tak by nie zgubić kontekstu.",
  "W odpowiedzi na \"{USER}\" użyję języka spokojnego i precyzyjnego.",
  "Z \"{USER}\" zrobimy prosty plan: nazwać rzecz, wskazać granice, zakończyć wnioskiem.",
  "To \"{USER}\" potraktuję jako zaproszenie do jasnej, neutralnej odpowiedzi.",
  "Zadbam, by odpowiedź na \"{USER}\" była zwięzła, ale sensowna.",
  "\"{USER}\" oprę o podstawowe kategorie, które ułatwią zrozumienie.",
  "Jeśli \"{USER}\" jest szerokie, wyznaczę bezpieczne granice odpowiedzi.",
  "Zapisuję Twój wątek: \"{USER}\". Zacznijmy od prostych ram, żeby nie zgubić sensu. Pasuje?",
  "W \"{USER}\" widzę kilka warstw. Najpierw rdzeń, potem konteksty poboczne. Zaczynamy?",
  "\"{USER}\" sugeruje temat, który warto odciążyć z nadmiaru detali. Ułożyć to klarownie?",
  "Czytając \"{USER}\", proponuję krótki szkic: co to jest, po co, w jakich granicach.",
  "To \"{USER}\" możemy uporządkować bez zbędnych ornamentów. Zgoda na minimalizm?",
  "Przyjmijmy dla \"{USER}\" spokojny ton i przejrzyste kroki. Od definicji zaczynamy?",
  "Wokół \"{USER}\" zarysuję ramę, żeby unikać chaosu. Który element najpierw?",
  "\"{USER}\" wymaga jednego wyboru: definicja czy przykład. Wybierz kierunek.",
  "W \"{USER}\" zaproponuję podział: opis, motywacja, konsekwencje. Ok?",
  "Jeśli \"{USER}\" jest szerokie, wskaż najważniejszy aspekt — tam skieruję odpowiedź.",
  "Ujmijmy \"{USER}\" w prostych pojęciach. Zrobić wersję krótką, czy średnią?",
  "W odpowiedzi na \"{USER}\" użyję hedgingu, aby nie przeszacować wniosków.",
  "Zdefiniuję \"{USER}\" neutralnie i dodam dwie konsekwencje dla jasności.",
  "Czy „{USER}” traktować bardziej praktycznie, czy teoretycznie? Dostosuję narrację.",
  "Z \"{USER}\" zbuduję most między intuicją a strukturą. Zaczynamy od rdzenia.",
  "To, co piszesz — \"{USER}\" — domaga się krótkiej mapy. Chcesz ją?",
  "\"{USER}\" wyczyszczę z niejasności i zostawię tylko sensowne elementy.",
  "Skupmy się w \"{USER}\" na tym, co daje wartość. Resztę odłóżmy.",
  "Zaproponuję spokojną odpowiedź na \"{USER}\": jasno, bez presji na domknięcie.",
  "\"{USER}\" może mieć różne odczytania. Wybierz kontekst, a ja go utrzymam.",
  "Wokół \"{USER}\" ułożę przejrzysty porządek: najpierw definicja, potem przykłady.",
  "Znaczenie \"{USER}\" zależy od celu rozmowy. Jaki masz cel?",
  "Odpowiem na \"{USER}\" neutralnie, zostawiając przestrzeń na korektę.",
  "\"{USER}\" warto zamknąć w jednym akapicie i rozszerzyć na życzenie.",
  "W \"{USER}\" oddzielę opis od oceny. To poprawia czytelność.",
  "Postawię dla \"{USER}\" klarowne granice, żeby nie rozlewać interpretacji.",
  "W odpowiedzi na \"{USER}\" utrzymam rytm: teza, wsparcie, wniosek.",
  "\"{USER}\" zasługuje na spokojny język i rozsądne proporcje. Tak zrobię.",
  "Z „{USER}” zdejmę ciężar i zostawię przejrzysty szkic tematu.",
  "Przy \"{USER}\" użyję minimalizmu definicyjnego. To zwiększa jasność.",
  "Zaproponuję do „{USER}” prostą check‑listę: rdzeń, zakres, ryzyka.",
  "Wokół \"{USER}\" zachowam równowagę: bez kategoryczności, z jasnym sensem.",
  "To „{USER}” potraktuję jak materiał do krótkiej, rzeczowej odpowiedzi.",
  "Dla \"{USER}\" przyjmę spokojny ton i precyzyjne słownictwo. To pomaga.",
  "Jeśli \"{USER}\" jest nieostre, doprecyzuję bez nadinterpretacji.",
  "W \"{USER}\" zastosuję metajęzyk, by uniknąć niepotrzebnej dosłowności.",
  "Odpowiedź na \"{USER}\" zbuduję na wspólnych mianownikach — będzie przenośna.",
  "Z \"{USER}\" przejdę po prostu: definicja → przykład → wniosek.",
  "\"{USER}\" oprę o minimalne kategorie, aby nie mnożyć bytów.",
  "Ułożę \"{USER}\" w formie: co, dlaczego, jak — prosto i jasno.",
  "\"{USER}\" nie wymaga ozdobników. Zostawię tylko elementy ważne.",
  "Wokół \"{USER}\" zadam 2–3 pytania pomocnicze dla ostrości kierunku.",
  "Przy \"{USER}\" dopasuję tempo: krótko, konkretnie, bez dygresji.",
  "Wyznaczę granice \"{USER}\", żeby wniosek był stabilny i uczciwy.",
  "Z \"{USER}\" zrobimy porządek w kilku krokach. Zacznę od rdzenia.",
  "Dla \"{USER}\" zachowam język neutralny i sprawiedliwy wobec kontekstu.",
  "Jeśli \"{USER}\" ma wiele warstw, przejdziemy od środka na zewnątrz.",
  "\"{USER}\" najpierw nazwę, potem powiążę, na końcu podsumuję.",
  "W odpowiedzi na \"{USER}\" zostawię przestrzeń na Twoją korektę.",
  "To \"{USER}\" zamknę w jednym sensownym akapicie — gotów?",
  "Zadbam, by „{USER}” było zrozumiałe nawet przy złożonym tle.",
  "Wokół \"{USER}\" nie będę forsował szczegółów — tylko to, co potrzebne.",
  "Dla \"{USER}\" ułożę krótką listę konsekwencji i ryzyk.",
  "W „{USER}” uniknę dysonansu: spójny ton, jasne zdania.",
  "\"{USER}\" postawię na prostej osi: problem – ujęcie – wniosek.",
  "Z „{USER}” zrobię odpowiedź, która nie zamyka rozmowy, tylko ją porządkuje.",
  "W „{USER}” użyję hedgingu: „w tym sensie”, „często”, „zwykle”.",
  "Na „{USER}” odpowiem bez sugestii kierunku, chyba że poprosisz.",
  "To „{USER}” potraktuję jako punkt wyjścia — bez arbitralnych skrótów.",
  "\"{USER}\" rozwinę tylko do sensownego progu — potem zapytam o preferencje.",
  "Wokół \"{USER}\" utrzymam spokojny rytm i przejrzystość argumentu.",
  "Jeśli \"{USER}\" wymaga decyzji, wskażę opcje bez presji.",
  "W „{USER}” podkreślę, co jest centralne, by uniknąć rozproszenia.",
  "Odpowiedź na „{USER}” będzie przenośna między kontekstami — celowo.",
  "Z „{USER}” zrobimy krótki szkic i dopasujemy głębokość dalej.",
  "Wokół „{USER}” uniknę kategorycznych sądów — utrzymam neutralność.",
  "Dla „{USER}” zastosuję prosty, klarowny język — żadnych zagmatwań.",
  "To „{USER}” jest materiałem na jasną, spokojną odpowiedź. Tę dostarczę.",
  "W odpowiedzi na „{USER}” podtrzymam komensuratywność — sensowne porównania.",
  "Z „{USER}” nie zrobię dygresji — zostanę przy sednie sprawy.",
  "Jeśli „{USER}” wymaga ram, narysuję je krótko i czytelnie.",
  "W „{USER}” wyznaczę jasny początek i koniec, żeby uniknąć chaosu.",
  "Na „{USER}” odpowiem strukturalnie: spójne akapity, jasne przejścia.",
  "To „{USER}” ułożę tak, by każda linia dodawała wartość — zero powtórzeń.",
  "\"{USER}\" dostanie odpowiedź odporna na kontekst — to celowy zabieg.",
  "Przy „{USER}” nie zakładam więcej niż trzeba. To zabezpiecza interpretację.",
  "Z „{USER}” zrobię neutralną wypowiedź, którą łatwo rozwinąć dalej.",
  "Wokół „{USER}” uniknę żargonu. Prostota i precyzja wygrywają.",
  "Dla „{USER}” przygotuję wersję podstawową i rozszerzoną — wybierzesz.",
  "To „{USER}” może być osadzone w prostej ramie. Chcesz ją teraz?"


];

// Generuje odpowiedź bota
function generateResponse(userMsg) {
    const cleaned = extractMeaning(userMsg);
    const template = SMART_TEMPLATES[Math.floor(Math.random() * SMART_TEMPLATES.length)];
    return template.replace("{USER}", cleaned);
}

// Dodaje wiadomość do czatu (z emoji zamiast obrazków)
function addMessage(sender, text) {
    const bubble = document.createElement("div");
    bubble.className = "msg " + sender;

    const avatarText = sender === "user" ? "👤" : "🤖";

    bubble.innerHTML = `
        <div class="avatar">${avatarText}</div>
        <div class="bubble">${text}</div>
    `;

    output.appendChild(bubble);
    output.scrollTop = output.scrollHeight;
}

// Obsługa przycisku
button.addEventListener("click", () => {
    const txt = input.value.trim();
    if (txt === "") return;

    addMessage("user", txt);
    const reply = generateResponse(txt);
    addMessage("bot", reply);

    input.value = "";
});

// Obsługa Enter
input.addEventListener("keypress", e => {
    if (e.key === "Enter") button.click();
});
