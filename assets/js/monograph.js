/**
 * monograph.js
 * Interactive scripts for jme.log analytical monographs
 * High School through Adult accessibility features
 */

document.addEventListener('DOMContentLoaded', () => {
  initModeToggle();
  initChapterStepper();
  initMetricCards();
  initConceptGlossary();
  initCaseTabs();
  initStrategyMatrix();
  initScenarioSimulator();
  initQuiz();
  initCitationLinks();
});

/* Helper to get chapters dynamically from the current monograph container */
function getChapters() {
  const container = document.getElementById('monograph-container');
  if (!container) return [];
  const chapters = Array.from(container.querySelectorAll('.monograph-chapter')).map(ch => ch.id);
  return chapters.length ? chapters : [
    'chap-intro',
    'chap-geography',
    'chap-operating-system',
    'chap-paradox',
    'chap-realignment',
    'chap-grand-strategy',
    'chap-conclusion'
  ];
}

/* --- 1. Mode Switcher (Step-Through vs Continuous) --- */
function initModeToggle() {
  const stepBtn = document.getElementById('mode-step-btn');
  const scrollBtn = document.getElementById('mode-scroll-btn');
  const container = document.getElementById('monograph-container');

  if (!stepBtn || !scrollBtn || !container) return;

  stepBtn.addEventListener('click', () => {
    stepBtn.classList.add('active');
    scrollBtn.classList.remove('active');
    container.classList.add('step-mode');
    
    // Clear any inline styles
    document.querySelectorAll('.monograph-chapter').forEach(ch => {
      ch.style.display = '';
    });

    // Switch to current active chapter
    const activePill = document.querySelector('.chapter-pill.active');
    const chapters = getChapters();
    const targetId = activePill ? activePill.dataset.target : (chapters[0] || 'chap-intro');
    showChapter(targetId);
  });

  scrollBtn.addEventListener('click', () => {
    scrollBtn.classList.add('active');
    stepBtn.classList.remove('active');
    container.classList.remove('step-mode');
    
    // Clear any inline styles
    document.querySelectorAll('.monograph-chapter').forEach(ch => {
      ch.style.display = '';
    });
  });
}

/* --- 2. Chapter Stepper & Navigation --- */
function showChapter(chapterId) {
  const container = document.getElementById('monograph-container');
  const isStepMode = container ? container.classList.contains('step-mode') : true;

  // Update pills
  document.querySelectorAll('.chapter-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.target === chapterId);
  });

  if (isStepMode) {
    document.querySelectorAll('.monograph-chapter').forEach(ch => {
      ch.classList.toggle('active', ch.id === chapterId);
      ch.style.display = '';
    });
    // Scroll smoothly to top of chapter nav
    const navWrapper = document.querySelector('.chapter-nav-wrapper');
    if (navWrapper) {
      navWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Scroll directly to the chapter in continuous mode
    const targetEl = document.getElementById(chapterId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updateStepperButtons(chapterId);
}

// Make showChapter available globally for inline onclick handlers
window.showChapter = showChapter;

function updateStepperButtons(chapterId) {
  const chapters = getChapters();
  const idx = chapters.indexOf(chapterId);
  const prevBtns = document.querySelectorAll('.stepper-prev-btn');
  const nextBtns = document.querySelectorAll('.stepper-next-btn');

  prevBtns.forEach(btn => {
    if (idx > 0) {
      btn.style.display = 'inline-flex';
      btn.dataset.target = chapters[idx - 1];
    } else {
      btn.style.display = 'none';
    }
  });

  nextBtns.forEach(btn => {
    if (idx < chapters.length - 1) {
      btn.style.display = 'inline-flex';
      btn.dataset.target = chapters[idx + 1];
    } else {
      btn.style.display = 'none';
    }
  });
}

function initChapterStepper() {
  // Chapter pills
  document.querySelectorAll('.chapter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      showChapter(pill.dataset.target);
    });
  });

  // Footer Prev/Next buttons
  document.addEventListener('click', (e) => {
    const prevBtn = e.target.closest('.stepper-prev-btn');
    const nextBtn = e.target.closest('.stepper-next-btn');

    if (prevBtn && prevBtn.dataset.target) {
      showChapter(prevBtn.dataset.target);
    }
    if (nextBtn && nextBtn.dataset.target) {
      showChapter(nextBtn.dataset.target);
    }
  });
}

/* --- 3. Key Empirical Metrics Detail Box --- */
const metricDetails = {
  mfg: {
    title: "~50% of Global Manufacturing Production (1945)",
    content: "When World War II ended in 1945, European and Asian industrial centers lay in ruins, leaving the United States producing approximately half of all manufactured goods globally. U.S. GDP had surged from $101B in 1940 to over $228B in 1945, backed by 60%+ of official world monetary gold reserves.",
    source: "Paul Kennedy, The Rise and Fall of the Great Powers (1987); Angus Maddison (2007)."
  },
  interventions: {
    title: "469+ Distinct Overseas Military Interventions (1798–2022)",
    content: "Compiled by the Tufts University Military Intervention Project and Congressional Research Service (CRS Report R42738). Over 55% of all American overseas interventions took place in the post-1945 era, ranging from major wars (Korea, Vietnam, Iraq) to targeted missile strikes and naval blockades.",
    source: "Tufts University MIP Dataset (2023) & Barbara Salazar Torreon, CRS."
  },
  coups: {
    title: "64 Covert Regime-Change Attempts (1947–1989)",
    content: "During the Cold War, Washington executed 64 covert and 6 overt regime changes across the Global South. Driven by anti-communist containment and economic protectionism, key CIA-backed operations occurred in Iran (1953), Guatemala (1954), Cuba (1961), and Chile (1973).",
    source: "Dr. Lindsey A. O'Rourke, Covert Regime Change: America's Secret Cold War (Cornell Univ. Press, 2018)."
  },
  pepfar: {
    title: "25M+ Lives Saved Globally via PEPFAR (2003–Present)",
    content: "The President's Emergency Plan for AIDS Relief (PEPFAR) represents the single largest commitment by any nation to address a single disease. With over $110 billion allocated, it has supported antiretroviral treatment for 20.5 million people, predominantly across Sub-Saharan Africa.",
    source: "U.S. Department of State, PEPFAR Global Impact Factsheet (2024)."
  },

  // Algorithmic Extremism Metrics
  leaders: {
    title: "0 Central Leaders: The Flattened Threat Landscape",
    content: "Unlike 20th-century terrorist organizations that relied on a bureaucratic hierarchy, formal training camps, and central headquarters, algorithmic extremist movements operate as decentralized digital insurgencies. Ideological synchronization occurs organically through digital networks without a single commander issuing orders.",
    source: "Bruce Hoffman, Inside Terrorism (2006); Marc Sageman, Leaderless Jihad (2008)."
  },
  cases: {
    title: "3 Comparative Eras: The Method of Difference",
    content: "To evaluate how the shift from physical organizations to digital platforms altered domestic violence, this research compares three foundational cases: the 1995 Oklahoma City Bombing (hierarchical control), the 2014 Isla Vista Killings (emergent digital lone wolf), and the 2018 Toronto Van Attack (algorithmic sainthood cycle).",
    source: "Jamie Sessions (University of Idaho); Department of Justice Historical Case Records."
  },
  puzzle: {
    title: "4 Dimensions of the 'Radicalization Puzzle'",
    content: "Assesses how modern extremists mobilize by examining four interconnected vectors: Grievances (Aggrieved Entitlement regarding lost hierarchy), Networks (Digital Echo Chambers and filter bubbles), Ideology (The fatalistic Blackpill), and Enabling Environments (Grey-Zone platforms like Incels.is).",
    source: "Radicalization Puzzle Analytical Framework; Ted Gurr (1970); J.M. Berger (2018)."
  },
  poe: {
    title: "Poe's Law: The Defense Mechanism of Weaponized Irony",
    content: "Poe's Law identifies the difficulty of distinguishing sincere extremist intent from internet parody or 'shitposting'. Fringe forums intentionally cloak violent ideation behind layers of memes and hyperbole, paralyzing traditional federal threat assessments that require proof of clear, actionable intent.",
    source: "J.M. Berger, Extremism (MIT Press, 2018); A.M. Gallo (2020)."
  }
};

function initMetricCards() {
  const detailBox = document.getElementById('metric-detail-box');
  const cards = document.querySelectorAll('.metric-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.metric;
      let data = metricDetails[key];
      if (!data && card.dataset.title) {
        data = {
          title: card.dataset.title,
          content: card.dataset.content,
          source: card.dataset.source
        };
      }
      if (!data || !detailBox) return;

      const isAlreadyActive = card.classList.contains('active') && detailBox.classList.contains('show');

      cards.forEach(c => c.classList.remove('active'));

      if (isAlreadyActive) {
        detailBox.classList.remove('show');
      } else {
        card.classList.add('active');
        detailBox.innerHTML = `
          <strong style="color: var(--accent-color); font-size: 1rem;">${data.title}</strong>
          <p style="margin: 0.4rem 0 0.5rem 0; font-size: 0.95rem; line-height: 1.6;">${data.content}</p>
          <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Primary Source:</strong> ${data.source}</div>
        `;
        detailBox.classList.add('show');
      }
    });
  });
}

/* --- 4. Concept Glossary Modal (High School to Adult) --- */
const glossary = {
  hegemony: {
    category: "Core Geopolitical Concept",
    title: "Hegemony (Hegemonic Power)",
    def: "The leadership or dominant influence exercised by one sovereign state over others in the international system, often setting global economic rules, enforcing naval security, and anchoring international currency.",
    why: "In plain English: A hegemon isn't an emperor that conquers everyone, but rather the 'referee and rulemaker' of the global game.",
    analogy: "Analogy: Think of the host of an international airport who provides air traffic control, runway safety, and the official currency accepted at every terminal."
  },
  moat: {
    category: "Geographic Endowment",
    title: "Oceanic Moat",
    def: "The structural defense advantage provided by the Atlantic (3,000 miles) and Pacific (5,000+ miles) oceans, insulating North America from sustained land invasions and Eurasian conflicts.",
    why: "Why it matters: While European and Asian powers spent their treasuries and manpower defending land borders, the U.S. remained invulnerable to invasion post-1812.",
    analogy: "Analogy: Like playing a strategy board game where your castle is on a secluded island with rich gold mines, while everyone else fights on a crowded continent."
  },
  bretton_woods: {
    category: "International Political Economy",
    title: "The Bretton Woods Monetary Framework (1944)",
    def: "A landmark conference of 44 allied nations in New Hampshire that established the modern financial order, creating the International Monetary Fund (IMF), World Bank, and fixing the U.S. dollar to gold ($35/oz) with all other currencies pegged to the dollar.",
    why: "Why it matters: It made the U.S. dollar the world's primary reserve currency, allowing the United States to borrow and trade on uniquely favorable terms ('exorbitant privilege').",
    analogy: "Analogy: Imagine all arcade tickets or poker chips in the entire city being legally required to convert directly through your personal token desk."
  },
  petrodollar: {
    category: "Monetary & Energy Order",
    title: "The Petrodollar System (1974)",
    def: "An agreement between the United States and Saudi Arabia (later extended to OPEC) where crude oil was priced and sold exclusively in U.S. Dollars, in exchange for American military protection.",
    why: "Why it matters: Every country on Earth needs oil; therefore, every country must hold U.S. dollars in reserve, guaranteeing constant global demand for American currency even after the dollar left the gold standard in 1971.",
    analogy: "Analogy: No matter where you live in the world, to buy fuel for your car or factories, you first have to buy American dollars."
  },
  article_5: {
    category: "Security & Alliance Architecture",
    title: "NATO Article 5 (Collective Defense)",
    def: "The core mutual-defense principle of the North Atlantic Treaty: an armed attack against one NATO ally in Europe or North America shall be considered an attack against them all.",
    why: "Why it matters: It created an ironclad deterrent against Soviet/Russian expansion by extending the U.S. nuclear umbrella over European democracies.",
    analogy: "Analogy: The ultimate 'Three Musketeers' clause, 'All for one, and one for all.' Touching a small country triggers the full military wrath of the world's greatest superpower."
  },
  covert_regime_change: {
    category: "Foreign Policy Intervention",
    title: "Covert Regime Change",
    def: "Secret operations conducted by intelligence agencies (such as the CIA) to undermine, destabilize, or overthrow foreign governments without overt military declarations of war.",
    why: "Why it matters: During the Cold War, fear of Soviet expansion or protection of U.S. corporate interests led to 64 covert coup attempts, replacing democracies with military dictatorships in countries like Iran, Guatemala, and Chile.",
    analogy: "Analogy: Sponsoring strikes, bribes, propaganda, and rebel generals in secret rather than sending the army."
  },
  zaibatsu: {
    category: "Institutional Reform",
    title: "Zaibatsu Conglomerates",
    def: "Enormous family-controlled industrial and financial monopolies that dominated Japan's economy before 1945 and heavily drove Imperial Japan's militarization.",
    why: "Why it matters: General MacArthur's occupation administration dismantled these monopolies and broke up land ownership, unleashing democratic competitive enterprise that sparked the post-war Japanese manufacturing boom.",
    analogy: "Analogy: Breaking up giant industrial trusts so ordinary citizens and tenant farmers can own land and start businesses."
  },
  strategic_autonomy: {
    category: "Contemporary Alliance Realignment",
    title: "European Strategic Autonomy",
    def: "The European Union's push to build independent military capabilities, defense manufacturing, and sovereign supply chains, reducing its reliance on U.S. security guarantees.",
    why: "Why it matters: As American foreign policy shifted toward 'America First' and questioned Article 5, European leaders realized they must be prepared to defend themselves without relying on Washington.",
    analogy: "Analogy: A roommate realizing their co-signer might leave the lease at any moment, and urgently saving up an independent emergency fund."
  },
  appellate_body: {
    category: "Trade Governance",
    title: "WTO Appellate Body",
    def: "The highest supreme court of the World Trade Organization (WTO) responsible for ruling on international trade disputes, tariff violations, and economic sanctions.",
    why: "Why it matters: By refusing to appoint new judges, the United States effectively paralyzed the court's ability to issue binding rulings against American tariffs, dismantling the multilateral dispute mechanism.",
    analogy: "Analogy: Leaving a high court with no sitting judges so nobody can issue a final ruling against you."
  },

  // Post 2 Glossary: Algorithmic Extremism
  leaderless_resistance: {
    category: "Tactical Threat Architecture",
    title: "Leaderless Resistance",
    def: "A strategic organizational framework originally popularized by figures like Louis Beam in the 1980s, wherein autonomous individuals or small independent cells execute violent actions toward a common ideological objective without direct operational orders or centralized logistics.",
    why: "Why it matters: By removing headquarters, roster lists, and communication chains, leaderless networks prevent law enforcement from using traditional wiretaps and infiltration to foil plots.",
    analogy: "Analogy: Like an open-source coding repository where contributors build software independently without ever meeting or taking orders from a project manager."
  },
  leader_automated: {
    category: "Algorithmic Radicalization",
    title: "'Leader-Automated' Radicalization",
    def: "The foundational thesis that modern digital extremism is not truly leaderless, but rather 'leader-automated'—where the charismatic human figurehead is replaced by recommendation algorithms that function as a 'virtual commander.'",
    why: "Why it matters: Algorithms autonomously handle target selection (amplifying out-group hostility) and escalation of commitment (guiding users to extremist destinations like the Blackpill) to maximize platform retention.",
    analogy: "Analogy: Instead of a cult leader whispering in your ear at a compound, an AI recommendation engine curates a personalized spiral of grievance and rage directly onto your smartphone screen."
  },
  relative_deprivation: {
    category: "Sociological Conflict Theory",
    title: "Relative Deprivation (Ted Gurr)",
    def: "A foundational theory of political violence asserting that rebellion and aggression emerge from the psychological tension between 'value expectations' (goods and status to which people believe they are entitled) and 'value capabilities' (what they are realistically able to achieve).",
    why: "Why it matters: Radicalization does not require absolute poverty or starvation; it erupts when a group perceives that a rightful, promised status has been denied or taken away.",
    analogy: "Analogy: A driver who is not starving, but boils with road rage because they believe their luxury sports car guarantees them the unconditional right of way."
  },
  aggrieved_entitlement: {
    category: "Social Psychology & Manosphere",
    title: "Aggrieved Entitlement",
    def: "A psychological condition in which members of a historically dominant group feel that privileges and hierarchical status to which they are inherently entitled have been wrongfully stolen by an external out-group (specifically women and feminists).",
    why: "Why it matters: Incel ideology frames romantic isolation not as a personal struggle, but as a systemic injustice—a 'gynocentric conspiracy' stripping men of their natural social and sexual birthright.",
    analogy: "Analogy: Feeling furious that you arrived at a concert with a ticket you assumed was front-row VIP, only to discover general admission seating."
  },
  blackpill: {
    category: "Extremist Ideology",
    title: "The 'Blackpill' Nihilism",
    def: "A fatalistic subcultural dogma asserting that romantic, sexual, and social hierarchy is rigidly predetermined by immutable genetic and physical characteristics, rendering self-improvement futile and presenting violent exit or a 'beta uprising' as the only justifiable reaction.",
    why: "Why it matters: Unlike traditional political insurgencies that seek policy reform or governance, Blackpill nihilism views the social contract as unreformable, eliminating any possibility of political negotiation.",
    analogy: "Analogy: Deciding that because a game is permanently rigged against you, the only rational move left is to overturn the table and set the room on fire."
  },
  radical_filter_bubbles: {
    category: "Platform Architecture",
    title: "Radical Filter Bubbles (Reed et al.)",
    def: "Algorithmic curation systems on mainstream and fringe platforms that isolate users into hyper-personalized information ecosystems, progressively prioritizing and serving more extreme content to maximize engagement and watch time.",
    why: "Why it matters: It creates an invisible, private radicalization pipeline that leaves traditional law enforcement completely blind, as recruitment occurs through mathematical optimization rather than human contact.",
    analogy: "Analogy: Walking into a library to browse and having a robotic librarian quietly replace all moderate books with extremist manifestos tailored to your specific insecurities."
  },
  scattered_attacks: {
    category: "Tactical Violence Modeling",
    title: "'Scattered Attacks' (Malthaner et al.)",
    def: "A pattern of violence produced by decentralized, leaderless movements characterized by low-tech, high-impact, single-attacker strikes against soft civilian targets (such as vehicle rammings or solo shootings).",
    why: "Why it matters: While decentralized actors struggle to execute complex multi-target operations like 9/11, they generate frequent, volatile strikes that are impossible to predict individually yet statistically certain in aggregate.",
    analogy: "Analogy: Trying to prevent random sparks in dry brush versus intercepting an organized military air strike."
  },
  poes_law: {
    category: "Intelligence & Threat Assessment",
    title: "Poe's Law & Irony Masking",
    def: "An internet adage stating that without an explicit indicator of intent, it is impossible to distinguish between genuine extremism and satire; extremist communities intentionally weaponize dark humor and 'shitposting' as operational camouflage.",
    why: "Why it matters: Federal threat-management agencies require evidence of 'credible threat' with clear intent and capability. Memetic irony grants perpetrators plausible deniability until the violent strike occurs.",
    analogy: "Analogy: A suspect walking into a bank with a mask and crowbar, claiming they are merely 'satirizing a heist' right up until they smash open the deposit box."
  },
  validation_loop: {
    category: "Behavioral Gamification",
    title: "The Validation Loop & 'E-bile'",
    def: "A peer-to-peer social reward mechanism in online forums where users gain instant digital prestige (upvotes, badges, replies) for producing hyper-misogynistic rhetoric ('E-bile') and provocative content ('shitposting').",
    why: "Why it matters: It gamifies radicalization, turning violent ideation into the primary currency of belonging and accelerating the transition of passive 'lurkers' into active 'perpetrators.'",
    analogy: "Analogy: An arcade pinball machine that only awards points, flashing lights, and cheers when you fire increasingly hostile and destructive shots."
  },
  prosecutor_model: {
    category: "Federal Counterterrorism Doctrine",
    title: "The 'Prosecutor' Threat Model (A.M. Gallo)",
    def: "The legacy counterterrorism framework employed by the Department of Justice and FBI, designed to dismantle established hierarchical organizations through structural decapitation, leadership indictments, and asset seizures.",
    why: "Why it matters: This model fails against algorithmic extremism because there is no central hierarchy to indict, no leadership to arrest, and no financial infrastructure to freeze.",
    analogy: "Analogy: Trying to disperse morning fog by slapping handcuffs on the air."
  },
  e_bile: {
    category: "Digital Discourse & Subculture",
    title: "E-Bile",
    def: "A term describing extreme, dehumanizing, hyper-misogynistic rhetoric and cyber-hostility disseminated across digital platforms, serving as an ideological bonding mechanism within the Manosphere.",
    why: "Why it matters: It normalizes violent ideation against out-groups (women and feminists), shifting peer norms until violent physical action is perceived as justified retribution.",
    analogy: "Analogy: Toxic chemical runoff that gradually poisons an entire reservoir until normal life cannot survive."
  },
  paradox_of_resilience: {
    category: "Network Theory",
    title: "The Paradox of Resilience",
    def: "The structural reality that while centralized organizations collapse when their leadership is decapitated, decentralized online movements are 'hydra-headed'—platform bans merely trigger migration to less regulated grey-zone platforms where rhetoric becomes more extreme.",
    why: "Why it matters: Platform bans like the 2017 r/incels purge did not end radicalization; they concentrated users into unmoderated enclaves like Incels.is and encrypted Gab forums.",
    analogy: "Analogy: Swatting a dandelion flower: instead of destroying the weed, the blow scatters millions of seeds across the entire lawn."
  },
  method_of_difference: {
    category: "Comparative Methodology",
    title: "Method of Difference (John Stuart Mill)",
    def: "A comparative research design that examines cases sharing similar outcomes (lethal political violence) while varying in key structural attributes (hierarchical vs. algorithmic organization) to isolate causal factors.",
    why: "Why it matters: By comparing Oklahoma City (1995), Isla Vista (2014), and Toronto (2018), researchers isolate how digital decentralization accelerates detection lag and alters threat lethality.",
    analogy: "Analogy: Testing three engines with the same fuel in different vehicle designs to pinpoint how the chassis affects speed."
  },
  stochastic_terrorism: {
    category: "Tactical Threat Architecture",
    title: "Stochastic Terrorism",
    def: "The use of mass communication (or algorithmic amplification) to incite ideologically motivated violence that is statistically predictable in aggregate, yet individually unpredictable in timing, location, and perpetrator.",
    why: "Why it matters: Traditional intelligence cannot predict which specific online user will cross the threshold from reading manifestos to carrying out an attack.",
    analogy: "Analogy: Constantly loading dice and rolling them: you cannot predict which roll will land on snake eyes, but you know with mathematical certainty that snake eyes will eventually appear."
  }
};

function initConceptGlossary() {
  const overlay = document.getElementById('term-modal-overlay');
  const modalCat = document.getElementById('modal-term-category');
  const modalTitle = document.getElementById('modal-term-title');
  const modalDef = document.getElementById('modal-term-def');
  const modalWhy = document.getElementById('modal-term-why');
  const closeBtn = document.getElementById('term-modal-close');

  if (!overlay) return;

  document.querySelectorAll('.term-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const termKey = chip.dataset.term;
      let data = glossary[termKey];
      
      // Allow chip dataset overrides
      if (!data && chip.dataset.title) {
        data = {
          category: chip.dataset.category || "Theoretical Concept",
          title: chip.dataset.title,
          def: chip.dataset.def || "",
          why: chip.dataset.why || "",
          analogy: chip.dataset.analogy || ""
        };
      }
      if (!data) return;

      modalCat.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDef.textContent = data.def;
      modalWhy.innerHTML = `<strong>Why It Matters:</strong> ${data.why}<br><br><span style="color: var(--text-muted);">${data.analogy}</span>`;

      overlay.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
    }
  });
}

/* --- 5. Interactive Tabs (Case Study Explorers) --- */
function initCaseTabs() {
  const containers = document.querySelectorAll('.case-tabs-container');
  if (!containers.length) {
    const tabs = document.querySelectorAll('.case-tab-btn');
    const panes = document.querySelectorAll('.case-tab-content');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetPane = document.getElementById(tab.dataset.tab);
        if (targetPane) targetPane.classList.add('active');
      });
    });
    return;
  }

  containers.forEach(container => {
    const tabs = container.querySelectorAll('.case-tab-btn');
    const panes = container.querySelectorAll('.case-tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPane = document.getElementById(tab.dataset.tab);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  });
}

/* --- 6. Grand Strategy & Threat Framework Matrix Filter --- */
function initStrategyMatrix() {
  const containers = document.querySelectorAll('.matrix-container');

  containers.forEach(container => {
    const filterBtns = container.querySelectorAll('.matrix-filter-btn');
    const rows = container.querySelectorAll('.matrix-row:not(.header)');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter; // 'all', 'liberal', 'realism', 'hierarchical', 'algorithmic'
        
        rows.forEach(row => {
          const colA = row.querySelector('.matrix-col-liberal') || row.querySelector('.matrix-col-hierarchical');
          const colB = row.querySelector('.matrix-col-realism') || row.querySelector('.matrix-col-algorithmic');

          if (filter === 'all') {
            row.style.gridTemplateColumns = '160px 1fr 1fr';
            if (colA) colA.style.display = 'block';
            if (colB) colB.style.display = 'block';
          } else if (filter === 'liberal' || filter === 'hierarchical') {
            row.style.gridTemplateColumns = '160px 1fr';
            if (colA) colA.style.display = 'block';
            if (colB) colB.style.display = 'none';
          } else if (filter === 'realism' || filter === 'algorithmic') {
            row.style.gridTemplateColumns = '160px 1fr';
            if (colA) colA.style.display = 'none';
            if (colB) colB.style.display = 'block';
          }
        });
      });
    });
  });
}

/* --- 7. Scenario Simulator --- */
const scenarios = {
  // Post 1 Scenarios
  nato: {
    title: "Scenario: An adversary threatens a NATO border state",
    liberal: "<strong>Liberal Internationalism:</strong> U.S. invokes Article 5 immediately, reinforces forward deterrence troops, and declares an attack on one is an attack on the whole alliance. The cost of defending Estonia is negligible compared to the cataclysm of European instability.",
    realism: "<strong>Offshore Realism / America First:</strong> U.S. questions whether the ally has paid its 2% of GDP defense benchmark. If 'delinquent,' Washington threatens non-intervention or demands cash compensation, treating alliance guarantees as a paid transaction rather than a moral covenant."
  },
  tariffs: {
    title: "Scenario: An ally (Japan / Germany) runs a large trade surplus with the U.S.",
    liberal: "<strong>Liberal Internationalism:</strong> Surpluses are tolerated as an acceptable trade-off for strategic alliance loyalty, open sea lanes, and global adoption of the U.S. dollar as reserve currency. Friction is resolved via the WTO.",
    realism: "<strong>Offshore Realism / America First:</strong> Trade deficits are seen as evidence of national weakness and 'free-riding.' Invokes Section 232 national security tariffs (e.g. on steel, autos), placing allies in the same adversarial tariff bracket as China."
  },
  commons: {
    title: "Scenario: Securing global maritime choke points (e.g., Strait of Hormuz)",
    liberal: "<strong>Liberal Internationalism:</strong> U.S. Navy patrols choke points as a global public good, ensuring unmolested transit for all peaceful nations, underwriting global trade stability.",
    realism: "<strong>Offshore Realism / America First:</strong> Asks why American taxpayers should fund navy escorts for Chinese oil tankers or European merchant ships without direct reimbursement or bilateral trade concessions."
  },

  // Post 2 Scenarios: Algorithmic Extremism
  ban: {
    title: "Scenario 1: Platform Bans & Moderation Crackdown (e.g., 2017 Reddit Purge)",
    traditional: "<strong>Traditional FBI / DOJ 'Prosecutor' Model:</strong> Assumes that shutting down the primary gathering hub disperses members and extinguishes operational momentum, treating the forum ban like arresting the ringleaders of a physical criminal conspiracy.",
    algorithmic: "<strong>Leader-Automated Reality:</strong> Triggers the 'Paradox of Resilience'. Because the network is hydra-headed, users migrate en masse to unregulated 'grey zone' platforms (Incels.is, Gab), where absence of moderation accelerates the Blackpill echo chamber and increases violent potential."
  },
  irony: {
    title: "Scenario 2: The 'Poe's Law' Dilemma (Weaponized Shitposting vs. Imminent Action)",
    traditional: "<strong>Traditional FBI / DOJ 'Prosecutor' Model:</strong> Threat assessments require demonstrating a 'credible threat' with clear operational intent and capability. Memetic irony, absurd hyperbole, and 'shitposting' are filtered out as legally non-actionable internet noise.",
    algorithmic: "<strong>Leader-Automated Reality:</strong> Ambiguity is intentionally weaponized as operational camouflage. The perpetrator transitions from passive lurker to active mass attacker within the Validation Loop, hiding behind meme culture until the kinetic strike occurs."
  },
  mobilization: {
    title: "Scenario 3: Single-Attacker Soft-Target Mobilization (The Sainthood Cycle)",
    traditional: "<strong>Traditional FBI / DOJ 'Prosecutor' Model:</strong> Searches for a 'chain of custody'—co-conspirators, financial records, intercepted communications, or direct operational orders from an underground command cell (e.g., McVeigh and Nichols).",
    algorithmic: "<strong>Leader-Automated Reality:</strong> The perpetrator acts with zero direct co-conspirators, commanded solely by an internalized collective ideology ('Saint Rodger' mythology). Detection lag reaches maximum; conventional wiretaps and infiltration discover nothing."
  }
};

function initScenarioSimulator() {
  const btns = document.querySelectorAll('.scenario-btn');
  const titleEl = document.getElementById('scenario-title');
  const libBox = document.getElementById('scenario-liberal') || document.getElementById('scenario-traditional');
  const realBox = document.getElementById('scenario-realism') || document.getElementById('scenario-algorithmic');

  if (!btns.length || !titleEl) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = scenarios[btn.dataset.scenario];
      if (!data) return;

      titleEl.innerHTML = data.title;
      if (libBox) libBox.innerHTML = data.liberal || data.traditional;
      if (realBox) realBox.innerHTML = data.realism || data.algorithmic;
    });
  });
}

/* --- 8. Knowledge Check (Quiz) --- */
function initQuiz() {
  document.querySelectorAll('.quiz-question-card').forEach(card => {
    const options = card.querySelectorAll('.quiz-option-btn');
    const feedback = card.querySelector('.quiz-feedback');

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        // Reset options in this card
        options.forEach(o => {
          o.classList.remove('correct', 'incorrect');
        });

        const isCorrect = opt.dataset.correct === 'true';
        if (isCorrect) {
          opt.classList.add('correct');
          feedback.innerHTML = `<strong>✓ Correct!</strong> ${opt.dataset.feedback}`;
          feedback.style.background = 'rgba(16, 185, 129, 0.12)';
          feedback.style.color = '#10b981';
        } else {
          opt.classList.add('incorrect');
          feedback.innerHTML = `<strong>✗ Incorrect.</strong> ${opt.dataset.feedback}`;
          feedback.style.background = 'rgba(239, 68, 68, 0.12)';
          feedback.style.color = '#ef4444';
        }
        feedback.classList.add('show');
      });
    });
  });
}

/* --- 9. In-Text Citation Anchor Links --- */
function initCitationLinks() {
  document.querySelectorAll('.citation-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#ref-')) {
        const refEl = document.querySelector(href);
        if (refEl) {
          e.preventDefault();
          const parentChapter = refEl.closest('.monograph-chapter');
          if (parentChapter) {
            showChapter(parentChapter.id);
            setTimeout(() => {
              refEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              refEl.style.transition = 'background-color 0.4s ease';
              refEl.style.backgroundColor = 'rgba(79, 70, 229, 0.2)';
              setTimeout(() => {
                refEl.style.backgroundColor = '';
              }, 2000);
            }, 150);
          }
        }
      }
    });
  });
}
