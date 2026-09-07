/* ===================================================================
   Nutrisyon Notes
   Flashcard data + interaction logic (vanilla JS, no dependencies).
=================================================================== */

// ---------------------------------------------------------------
// 1. Data
// ---------------------------------------------------------------

const CATEGORIES = [
  { id: "all", label: "All cards" },
  { id: "history", label: "Historical Milestones" },
  { id: "legislation", label: "Legislation & Policy" },
  { id: "maternal", label: "Maternal & Infant Health" },
];

const CARDS = [
  // ---------------- Historical Milestones ----------------
  { category: "history", front: "1577: Early hospitals", back: "Fr. Juan Clemente opened a dispensary for indigents that grew into San Juan de Dios Hospital; San Lazaro Hospital followed, dedicated to contagious diseases." },
  { category: "history", front: "1806: Board of Vaccinators", back: "A Board of Vaccinators was created, later evolving into the office of medicos titulares, or local health officers." },
  { category: "history", front: "1872: First medical school", back: "The University of Santo Tomas founded the first medical school in the Philippines." },
  { category: "history", front: "1876: Carriedo waterworks", back: "The Carriedo waterworks began supplying piped water to residents of Manila." },
  { category: "history", front: "1879: Midwifery school", back: "A dedicated school for midwifery was established." },
  { category: "history", front: "1884: Koniger on beriberi", back: "Koniger documented an epidemic of beriberi in Manila that had struck the city in 1882–1883." },
  { category: "history", front: "1898: Board of Health formed", back: "The American-era Board of Health took on epidemic control, infectious disease, beriberi, and sanitation." },
  { category: "history", front: "1904: 'Taon' in infants", back: "Manuel Guerrero described an infantile-beriberi-like illness called taon, taol, or suba, echoing earlier work by Japanese researcher Hirota; Jose Albert confirmed the link in 1910." },
  { category: "history", front: "1905–1910: Research institutions", back: "The Bureau of Science (1905), the UP College of Medicine (1907), and the Philippine General Hospital (1910) together became the country's centers for scientific and medical research." },
  { category: "history", front: "1910 Breakthrough", back: "Beriberi was officially associated with eating white polished rice." },
  { category: "history", front: "1911: Proof among the Scouts", back: "A simple change in diet was shown to eradicate beriberi among Philippine Scouts, demonstrating the rice connection in practice." },
  { category: "history", front: "1912: Tiqui-tiqui extract", back: "Vedder, Chamberlain, Quintos, and Guerrero discovered tiqui-tiqui, a rice-bran extract, as a specific treatment for beriberi." },
  { category: "history", front: "1916: Filipinization of public health", back: "Leadership in public health began shifting from Americans to Filipinos, with Rockefeller Foundation fellows sent abroad to build local expertise." },
  { category: "history", front: "1936: Nutrition research begins", back: "Studies on food composition and height-or-weight standards emerged, alongside Bureau of Health programs on maternal and child health, nutrition, sanitation, and leprosy control." },
  { category: "history", front: "1936: Department of Health and Welfare", back: "Dr. Jose Fabella became first Secretary of the new Department of Health and Welfare during the Commonwealth period, which also expanded leprosaria, rehabilitated PGH, and drilled artesian wells." },
  { category: "history", front: "1939: Nutrition as a college major", back: "The University of the Philippines offered Food and Nutrition as a major field of study, though World War II broke out before any student could graduate." },
  { category: "history", front: "1942–1946: Occupation years", back: "Public health work was largely paralyzed under the Japanese Occupation; the Bureau of Health focused on emergencies and controlling malaria." },
  { category: "history", front: "1943: Wartime food research", back: "A Board of Nutritional Research was created to study non-traditional food sources during the shortages of the occupation." },
  { category: "history", front: "1947: PAN and the Institute of Nutrition", back: "Dr. Presentacion Perez founded the Philippine Association of Nutrition (PAN); Dr. Juan Salcedo Jr. led the new Institute of Nutrition, later renamed the Food and Nutrition Research Institute (FNRI)." },
  { category: "history", front: "1948: Bataan Rice Enrichment Project", back: "A clinical survey by Salcedo and colleagues, published in Bataan, launched the Bataan Rice Enrichment Project — a landmark in public health both locally and internationally." },
  { category: "history", front: "1955: Dietetic Association founded", back: "The Dietetic Association of the Philippines was organized; it is known today as the Nutritionist-Dietitians Association of the Philippines (NDAP)." },
  { category: "history", front: "1959: A private push for nutrition", back: "Dr. Juan Salcedo founded the Nutrition Foundation of the Philippines, the first private nutrition organization, pioneering local nutrition committees at every level of government." },
  { category: "history", front: "1960–1961: Coordinating and measuring", back: "The National Coordinating Council on Food and Nutrition formed under Dr. Coronado Pascual, and FNRC, UPLB, and PWU jointly published the country's first Food Composition Table." },
  { category: "history", front: "1967–1969: A national program takes shape", back: "A National Nutrition Program office opened under the DOH, soon renamed the National Nutrition Service." },
  { category: "history", front: "1971: First national nutrition plan", back: "The first four-year Philippine Food and Nutrition Program (1971–1974) was formulated." },
  { category: "history", front: "1974: NCP and NNC established", back: "The Nutrition Center of the Philippines (NCP) was founded, and the National Nutrition Council (NNC) was created under Presidential Decree 491, with Dr. Florentino Solon as its first Executive Director." },
  { category: "history", front: "1983: CODHEND and ICON organized", back: "The Council of Deans and Heads of Nutrition and Dietetics (CODHEND) began overseeing the BS Nutrition and Dietetics program, while the Inter-Organization Committee on Nutrition (ICON) united PAN, NDAP, and PSND under NNC's guidance." },
  { category: "history", front: "1986–1988: NNC changes address", back: "Executive Order 234 expanded NNC's member agencies and moved it under the DSWD; two years later it returned to the Department of Agriculture, which took over its chairmanship." },
  { category: "history", front: "1987: A private foundation for delivery", back: "The Nutrition Center of the Philippines, a private foundation supporting nutrition training and materials, was established under Dr. Florentino Solon." },
  { category: "history", front: "2005: NNC moves to the DOH", back: "The National Nutrition Council was transferred from the Department of Agriculture to the Department of Health, where it remains." },

  // ---------------- Legislation & Policy ----------------
  { category: "legislation", front: "Republic Act No. 8172", back: "ASIN Law - Mandated salt iodization nationwide to prevent Iodine Deficiency Disorders." },
  { category: "legislation", front: "Presidential Decree 1569", back: "Strengthened the Barangay Nutrition Program by mandating one Barangay Nutrition Scholar (BNS) per barangay." },
  { category: "legislation", front: "1914: Free tiki-tiki for mothers", back: "A law required the free distribution of tiquitiqui (tiki-tiki) to indigent mothers." },
  { category: "legislation", front: "Republic Act No. 832", back: "The Rice Enrichment Law." },
  { category: "legislation", front: "Republic Act No. 1082", back: "Strengthened health and dental services delivered to rural areas." },
  { category: "legislation", front: "Republic Act No. 2674", back: "The original Dietetics Law of 1960, professionalizing the practice of dietetics before being superseded by PD 1286 in 1977." },
  { category: "legislation", front: "Presidential Decree 1286", back: "The Nutrition and Dietetics Decree of 1977, requiring hospitals and health units to hire licensed nutritionist-dietitians; later repealed by RA 10862." },
  { category: "legislation", front: "Republic Act No. 6111", back: "The Philippine Medical Care Act of 1969." },
  { category: "legislation", front: "Republic Act No. 3720", back: "The Food, Drugs, and Devices and Cosmetics Act." },
  { category: "legislation", front: "Administrative Order No. 88-A", back: "Set regulatory guidelines governing the use of food additives." },
  { category: "legislation", front: "Administrative Order No. 88-B", back: "Set the rules for labeling prepackaged products distributed in the Philippines." },
  { category: "legislation", front: "NMIC Administrative Order No. 6", back: "Laid out rules and regulations governing meat inspection in the Philippines." },
  { category: "legislation", front: "Presidential Decree No. 7", back: "Regulated the orderly marketing of livestock and animal products." },
  { category: "legislation", front: "Presidential Decree No. 491", back: "The Nutrition Act of the Philippines - declared nutrition a government priority, created the National Nutrition Council, and designated July as Nutrition Month." },
  { category: "legislation", front: "Presidential Decree No. 825", back: "Set penalties for improper garbage disposal and other unsanitary practices." },
  { category: "legislation", front: "Presidential Decree No. 856", back: "The Code on Sanitation of the Philippines." },
  { category: "legislation", front: "Presidential Decree No. 1511", back: "Formulated a Philippine environmental policy recognizing every citizen's right to a healthful environment." },
  { category: "legislation", front: "Presidential Decree No. 1211", back: "Regulated the milling of rice in line with the government's nutrition program." },
  { category: "legislation", front: "Republic Act No. 8191", back: "Prescribed measures for the prevention and control of diabetes mellitus in the Philippines." },
  { category: "legislation", front: "Republic Act No. 10862", back: "Regulates the practice of nutrition and dietetics in the Philippines, repealing the 1977 decree PD 1286." },
  { category: "legislation", front: "Republic Act No. 7394", back: "The Consumer Act of the Philippines, protecting consumer interests and general welfare." },
  { category: "legislation", front: "Republic Act No. 8435", back: "The Agriculture and Fisheries Modernization Act of 1997." },
  { category: "legislation", front: "Republic Act No. 8976", back: "The Food Fortification Law, requiring a review every five years of which foods should be fortified and with what nutrients." },
  { category: "legislation", front: "Letter of Instruction No. 441", back: "Directed local governments (now the DILG) to set up functional nutrition committees in every region, province, city, municipality, and barangay." },
  { category: "legislation", front: "Republic Act No. 7160", back: "The Local Government Code of 1991, which made LGUs responsible for nutrition action planning and the delivery of nutrition services." },

  // ---------------- Maternal & Infant Health ----------------
  { category: "maternal", front: "Executive Order No. 51", back: "The Philippine Milk Code - protects and promotes breastfeeding while strictly regulating the marketing of infant formula and breastmilk substitutes." },
  { category: "maternal", front: "Republic Act No. 7600", back: "Required rooming-in and breastfeeding practices in government and private health institutions, keeping mother and baby together right after delivery." },
  { category: "maternal", front: "Republic Act No. 10028", back: "The Expanded Breastfeeding Promotion Act of 2009, building on RA 7600 with incentives for rooming-in and breastfeeding-friendly institutions." },
  { category: "maternal", front: "Republic Act No. 11148", back: "Kalusugan at Nutrition ng Mag-Nanay Act, better known as the First 1,000 Days Law, covering nutrition from pregnancy through a child's second birthday." },
  { category: "maternal", front: "Presidential Decree No. 996", back: "Made basic immunization compulsory for infants and children under eight years old." },
  { category: "maternal", front: "1904: Infantile beriberi identified", back: "Manuel Guerrero described a wasting illness in infants, echoing Japanese researcher Hirota's earlier findings; Jose Albert confirmed it as infantile beriberi in 1910." },
];

// ---------------------------------------------------------------
// 2. State
// ---------------------------------------------------------------

const state = {
  activeCategory: "all",
  deck: [],
  index: 0,
  flipped: false,
};

// ---------------------------------------------------------------
// 3. DOM references
// ---------------------------------------------------------------

const el = {
  tabs: document.getElementById("categoryTabs"),
  themeToggle: document.getElementById("themeToggle"),
  flashcard: document.getElementById("flashcard"),
  frontCategoryLabel: document.getElementById("frontCategoryLabel"),
  frontText: document.getElementById("frontText"),
  backText: document.getElementById("backText"),
  progressLabel: document.getElementById("progressLabel"),
  progressFill: document.getElementById("progressFill"),
  progressMarker: document.getElementById("progressMarker"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  shuffleBtn: document.getElementById("shuffleBtn"),
};

const categoryLabelById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

// ---------------------------------------------------------------
// 4. Deck building
// ---------------------------------------------------------------

function buildDeck(categoryId) {
  if (categoryId === "all") return CARDS.slice();
  return CARDS.filter((c) => c.category === categoryId);
}

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------------------------------------------------------------
// 5. Rendering
// ---------------------------------------------------------------

function renderTabs() {
  el.tabs.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab";
    btn.textContent = cat.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(cat.id === state.activeCategory));
    btn.addEventListener("click", () => selectCategory(cat.id));
    el.tabs.appendChild(btn);
  });
}

function renderCard() {
  const card = state.deck[state.index];

  if (!card) {
    el.frontCategoryLabel.textContent = "";
    el.frontText.textContent = "No cards in this deck yet.";
    el.backText.textContent = "";
    updateProgress();
    return;
  }

  el.frontCategoryLabel.textContent = categoryLabelById[card.category] || "Card";
  // The data still calls these fields "front"/"back", but on screen the
  // meaning is shown first and the code/label is what flipping reveals.
  el.frontText.textContent = card.back;
  el.backText.textContent = card.front;

  el.flashcard.setAttribute("aria-pressed", String(state.flipped));

  updateProgress();
  updateNavButtons();
}

function updateProgress() {
  const total = state.deck.length;
  const current = total ? state.index + 1 : 0;
  el.progressLabel.textContent = `Card ${current} of ${total}`;

  const pct = total > 1 ? (state.index / (total - 1)) * 100 : total === 1 ? 100 : 0;
  el.progressFill.style.width = `${pct}%`;
  el.progressMarker.style.left = `${pct}%`;
}

function updateNavButtons() {
  const total = state.deck.length;
  el.prevBtn.disabled = total === 0;
  el.nextBtn.disabled = total === 0;
  el.shuffleBtn.disabled = total < 2;
}

// ---------------------------------------------------------------
// 6. Interactions
// ---------------------------------------------------------------

function selectCategory(categoryId) {
  state.activeCategory = categoryId;
  state.deck = buildDeck(categoryId);
  state.index = 0;
  state.flipped = false;
  renderTabs();
  renderCard();
}

function flipCard() {
  if (!state.deck.length) return;
  state.flipped = !state.flipped;
  el.flashcard.setAttribute("aria-pressed", String(state.flipped));
}

function goNext() {
  if (!state.deck.length) return;
  state.index = (state.index + 1) % state.deck.length;
  state.flipped = false;
  renderCard();
}

function goPrev() {
  if (!state.deck.length) return;
  state.index = (state.index - 1 + state.deck.length) % state.deck.length;
  state.flipped = false;
  renderCard();
}

function shuffleDeck() {
  if (state.deck.length < 2) return;
  const current = state.deck[state.index];
  state.deck = shuffle(state.deck);
  state.index = 0;
  state.flipped = false;
  renderCard();
  // small nudge so shuffling always feels like it did something,
  // even in the unlikely case the shuffle re-picks the same order
  void current;
}

// ---------------------------------------------------------------
// 7. Event bindings
// ---------------------------------------------------------------

el.flashcard.addEventListener("click", flipCard);
el.flashcard.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    flipCard();
  }
});

el.prevBtn.addEventListener("click", goPrev);
el.nextBtn.addEventListener("click", goNext);
el.shuffleBtn.addEventListener("click", shuffleDeck);

document.addEventListener("keydown", (e) => {
  const tag = document.activeElement && document.activeElement.tagName;
  const isTypingContext = tag === "INPUT" || tag === "TEXTAREA";
  if (isTypingContext) return;

  if (e.code === "ArrowRight") {
    e.preventDefault();
    goNext();
  } else if (e.code === "ArrowLeft") {
    e.preventDefault();
    goPrev();
  } else if ((e.code === "Space" || e.code === "Enter") && document.activeElement !== el.flashcard) {
    // Only flip on space/enter globally if focus isn't already on
    // a button (so button activation still works as expected).
    const focusedTag = document.activeElement && document.activeElement.tagName;
    if (focusedTag !== "BUTTON") {
      e.preventDefault();
      flipCard();
    }
  }
});

// ---------------------------------------------------------------
// 8. Dark mode
// ---------------------------------------------------------------
// No storage API is used here (by design, for portability), so the
// choice resets to the system preference on the next visit — swap in
// localStorage yourself if you want it remembered across reloads.

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  el.themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  el.themeToggle.setAttribute("aria-label", theme === "dark" ? "Turn off dark mode" : "Turn on dark mode");
}

function initTheme() {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

el.themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  applyTheme(isDark ? "light" : "dark");
});

// ---------------------------------------------------------------
// 9. Init
// ---------------------------------------------------------------

initTheme();
selectCategory("all");
