/**
 * monograph.js
 * Interactive scripts for jme.log analytical monographs
 * High School through Adult accessibility features
 */

function initMonograph() {
  const inits = [
    ['ScrollSpy', initScrollSpy],
    ['ChapterStepper', initChapterStepper],
    ['MetricCards', initMetricCards],
    ['ConceptGlossary', initConceptGlossary],
    ['CaseTabs', initCaseTabs],
    ['StrategyMatrix', initStrategyMatrix],
    ['ScenarioSimulator', initScenarioSimulator],
    ['Quiz', initQuiz],
    ['CitationLinks', initCitationLinks]
  ];

  inits.forEach(([name, fn]) => {
    try {
      fn();
    } catch (err) {
      console.warn(`[monograph.js] Failed to initialize ${name}:`, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMonograph);
} else {
  // If DOM is already interactive or complete, initialize immediately
  initMonograph();
}

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

/* --- 1. Continuous Reading ScrollSpy --- */
function initScrollSpy() {
  const chapters = document.querySelectorAll('.monograph-chapter');
  if (!chapters.length) return;

  const navWrapper = document.querySelector('.chapter-nav-wrapper');

  function onScroll() {
    const navHeight = navWrapper ? navWrapper.offsetHeight : 60;
    const scrollPos = (window.pageYOffset || document.documentElement.scrollTop || 0) + navHeight + 80;

    let currentId = null;
    chapters.forEach(ch => {
      const top = ch.offsetTop;
      const height = ch.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = ch.id;
      }
    });

    if (currentId) {
      document.querySelectorAll('.chapter-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.target === currentId);
      });
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* --- 2. Chapter Navigation & Smooth Scrolling --- */
function scrollToSectionTop(chapterId) {
  setTimeout(() => {
    const navWrapper = document.querySelector('.chapter-nav-wrapper');
    const navHeight = navWrapper ? navWrapper.offsetHeight : 0;
    const targetEl = document.getElementById(chapterId);

    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const targetAbsoluteTop = targetRect.top + currentScrollY;

      // Position the top of the chapter right beneath the sticky navigation bar
      const scrollPosition = Math.max(0, targetAbsoluteTop - navHeight - 16);

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    } else if (navWrapper) {
      const navRect = navWrapper.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      window.scrollTo({
        top: Math.max(0, navRect.top + currentScrollY - 10),
        behavior: 'smooth'
      });
    }
  }, 25);
}

function showChapter(chapterId) {
  // Update active pill
  document.querySelectorAll('.chapter-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.target === chapterId);
  });

  // Reliably push scroll position to the top of the active section
  scrollToSectionTop(chapterId);
}

// Make showChapter available globally for inline onclick handlers
window.showChapter = showChapter;

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
var metricDetails = window.metricDetails = {
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
  },

  // Post 3 Metrics: The End of Linear Globalization
  gdp_drag: {
    title: "-0.5% Global GDP Drag (2018–2021 Trade War)",
    content: "The World Trade Organization (WTO) estimated that tit-for-tat tariffs and retaliatory measures between the United States and China reduced global GDP by roughly 0.5% between 2018 and 2021, proving that bilateral protectionism between superpowers inflicts systemic damage worldwide.",
    source: "World Trade Organization (WTO) World Trade Report (2022)."
  },
  wheat_spike: {
    title: "+20% Global Wheat Price Surge (Black Sea Shock)",
    content: "Russia's invasion of Ukraine weaponized critical pipeline infrastructure and blockaded Black Sea grain corridors, causing immediate global food market shocks. UNCTAD recorded a swift 20% spike in worldwide wheat prices, demonstrating how localized conflict radiates into global food insecurity.",
    source: "UNCTAD Investment Trends Monitor & Commodity Price Bulletin (2021/2022)."
  },
  uk_fdi: {
    title: "-11% UK Foreign Direct Investment Contraction",
    content: "Following the Brexit referendum and formal exit from the European single market, the United Kingdom experienced an estimated 11% decline in inward foreign direct investment alongside regulatory fragmentation, quantifying the steep economic friction of prioritizing national sovereignty over deep market integration.",
    source: "Official UK Trade & Investment Accounts; Comparative IPE Synthesis."
  },
  trilemma: {
    title: "2 of 3: Dani Rodrik's Globalization Trilemma",
    content: "Economist Dani Rodrik demonstrated that nations cannot simultaneously maintain hyperglobalization (deep economic integration), national sovereignty (independent policymaking), and democratic politics. Societies can choose any two, but never all three at once—explaining the current global resurgence of 'defensive globalization'.",
    source: "Dani Rodrik, The Globalization Paradox (2011)."
  },

  // Post 4 Metrics: Political Censorship and Creative Resistance
  cfa_review: {
    title: "CFA: Multi-Tiered Propaganda Gatekeeping",
    content: "Under the CCP Central Propaganda Department, the China Film Administration (CFA) exercises rigorous control over Chinese cinema through a multi-stage approval system: mandatory script pre-registration, production oversight, review board screening, and final issuance of the coveted Dragon Seal (Longbiao) distribution permit.",
    source: "Stephen Rosen (2021), 'Censor's Dilemma: Film in the Era of Xi Jinping'; Christopher Hale (2021)."
  },
  xia_subversion: {
    title: "Xia Subversion: Reversing the 'Harmonious Society'",
    content: "In 'A Touch of Sin' (2013), Jia Zhangke appropriated traditional wuxia knight-errant (xia) tropes to reframe acts of violent desperation committed by exploited rural migrants not as antisocial criminality, but as righteous moral retaliation against state-sanctioned capitalist predation, directly challenging the CCP's official doctrine of 'Harmonious Society' (hexie shehui).",
    source: "Chris Berry, Xinyu Lu, & Lisa Rofel (2014), Violence, Wuxia, Migrants: Jia Zhangke's Cinematic Discontent."
  },
  noir_bear: {
    title: "2014 Golden Bear: Genre as Political Insulation",
    content: "Diao Yinan's 'Black Coal, Thin Ice' won the Golden Bear at the 64th Berlin International Film Festival. By framing its devastating critique of post-industrial rustbelt decay and systemic alienation within the formulaic conventions of a hardboiled detective noir, the film obtained domestic censorship clearance while achieving premier global critical recognition.",
    source: "Thomas M. Chen (2022), Made in Censorship; Berlinale Archives (2014)."
  },
  technical_pull: {
    title: "2019 Berlin Withdrawal: 'Technical Reasons' Euphemism",
    content: "Zhang Yimou's 'One Second' was abruptly withdrawn from the 69th Berlin International Film Festival competition just days before its world premiere under the official pretext of 'technical difficulties'—a recognized diplomatic euphemism for censorship intervention when a narrative touches upon sensitive historical trauma like the Cultural Revolution.",
    source: "Alan Stone, Boston Review (2012); Christopher Hale (2021), Journal of Media Studies."
  }
};

function initMetricCards() {
  const detailBox = document.getElementById('metric-detail-box');
  const cards = document.querySelectorAll('.metric-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const currentBox = detailBox || document.getElementById('metric-detail-box');
      if (!currentBox) return;

      const key = card.dataset.metric;
      let data = (window.metricDetails || metricDetails)[key];
      if (!data && card.dataset.title) {
        data = {
          title: card.dataset.title,
          content: card.dataset.content,
          source: card.dataset.source
        };
      }
      if (!data) return;

      const isAlreadyActive = card.classList.contains('active') && currentBox.classList.contains('show');

      cards.forEach(c => c.classList.remove('active'));

      if (isAlreadyActive) {
        currentBox.classList.remove('show');
      } else {
        card.classList.add('active');
        currentBox.innerHTML = `
          <strong style="color: var(--accent-color); font-size: 1rem;">${data.title}</strong>
          <p style="margin: 0.4rem 0 0.5rem 0; font-size: 0.95rem; line-height: 1.6;">${data.content}</p>
          <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Primary Source:</strong> ${data.source}</div>
        `;
        currentBox.classList.add('show');
      }
    });
  });
}

/* --- 4. Concept Glossary Modal (High School to Adult) --- */
var glossary = window.glossary = {
  hegemony: {
    category: "Core Geopolitical Concept",
    title: "Hegemony (Hegemonic Power)",
    def: "The leadership or dominant influence exercised by one sovereign state over others in the international system, often setting global economic rules, enforcing naval security, and anchoring international currency.",
    why: "A hegemon isn't an emperor that conquers everyone, but rather the 'referee and rulemaker' of the global game.",
    analogy: "Analogy: Think of the host of an international airport who provides air traffic control, runway safety, and the official currency accepted at every terminal."
  },
  moat: {
    category: "Geographic Endowment",
    title: "Oceanic Moat",
    def: "The structural defense advantage provided by the Atlantic (3,000 miles) and Pacific (5,000+ miles) oceans, insulating North America from sustained land invasions and Eurasian conflicts.",
    why: "While European and Asian powers spent their treasuries and manpower defending land borders, the U.S. remained invulnerable to invasion post-1812.",
    analogy: "Analogy: Like playing a strategy board game where your castle is on a secluded island with rich gold mines, while everyone else fights on a crowded continent."
  },
  bretton_woods: {
    category: "International Political Economy",
    title: "The Bretton Woods Monetary Framework (1944)",
    def: "A landmark conference of 44 allied nations in New Hampshire that established the modern financial order, creating the International Monetary Fund (IMF), World Bank, and fixing the U.S. dollar to gold ($35/oz) with all other currencies pegged to the dollar.",
    why: "It made the U.S. dollar the world's primary reserve currency, allowing the United States to borrow and trade on uniquely favorable terms ('exorbitant privilege').",
    analogy: "Analogy: Imagine all arcade tickets or poker chips in the entire city being legally required to convert directly through your personal token desk."
  },
  petrodollar: {
    category: "Monetary & Energy Order",
    title: "The Petrodollar System (1974)",
    def: "An agreement between the United States and Saudi Arabia (later extended to OPEC) where crude oil was priced and sold exclusively in U.S. Dollars, in exchange for American military protection.",
    why: "Every country on Earth needs oil; therefore, every country must hold U.S. dollars in reserve, guaranteeing constant global demand for American currency even after the dollar left the gold standard in 1971.",
    analogy: "Analogy: No matter where you live in the world, to buy fuel for your car or factories, you first have to buy American dollars."
  },
  article_5: {
    category: "Security & Alliance Architecture",
    title: "NATO Article 5 (Collective Defense)",
    def: "The core mutual-defense principle of the North Atlantic Treaty: an armed attack against one NATO ally in Europe or North America shall be considered an attack against them all.",
    why: "It created an ironclad deterrent against Soviet/Russian expansion by extending the U.S. nuclear umbrella over European democracies.",
    analogy: "Analogy: The ultimate 'Three Musketeers' clause, 'All for one, and one for all.' Touching a small country triggers the full military wrath of the world's greatest superpower."
  },
  covert_regime_change: {
    category: "Foreign Policy Intervention",
    title: "Covert Regime Change",
    def: "Secret operations conducted by intelligence agencies (such as the CIA) to undermine, destabilize, or overthrow foreign governments without overt military declarations of war.",
    why: "During the Cold War, fear of Soviet expansion or protection of U.S. corporate interests led to 64 covert coup attempts, replacing democracies with military dictatorships in countries like Iran, Guatemala, and Chile.",
    analogy: "Analogy: Sponsoring strikes, bribes, propaganda, and rebel generals in secret rather than sending the army."
  },
  zaibatsu: {
    category: "Institutional Reform",
    title: "Zaibatsu Conglomerates",
    def: "Enormous family-controlled industrial and financial monopolies that dominated Japan's economy before 1945 and heavily drove Imperial Japan's militarization.",
    why: "General MacArthur's occupation administration dismantled these monopolies and broke up land ownership, unleashing democratic competitive enterprise that sparked the post-war Japanese manufacturing boom.",
    analogy: "Analogy: Breaking up giant industrial trusts so ordinary citizens and tenant farmers can own land and start businesses."
  },
  strategic_autonomy: {
    category: "Contemporary Alliance Realignment",
    title: "European Strategic Autonomy",
    def: "The European Union's push to build independent military capabilities, defense manufacturing, and sovereign supply chains, reducing its reliance on U.S. security guarantees.",
    why: "As American foreign policy shifted toward 'America First' and questioned Article 5, European leaders realized they must be prepared to defend themselves without relying on Washington.",
    analogy: "Analogy: A roommate realizing their co-signer might leave the lease at any moment, and urgently saving up an independent emergency fund."
  },
  appellate_body: {
    category: "Trade Governance",
    title: "WTO Appellate Body",
    def: "The highest supreme court of the World Trade Organization (WTO) responsible for ruling on international trade disputes, tariff violations, and economic sanctions.",
    why: "By refusing to appoint new judges, the United States effectively paralyzed the court's ability to issue binding rulings against American tariffs, dismantling the multilateral dispute mechanism.",
    analogy: "Analogy: Leaving a high court with no sitting judges so nobody can issue a final ruling against you."
  },

  // Post 2 Glossary: Algorithmic Extremism
  leaderless_resistance: {
    category: "Tactical Threat Architecture",
    title: "Leaderless Resistance",
    def: "A strategic organizational framework originally popularized by figures like Louis Beam in the 1980s, wherein autonomous individuals or small independent cells execute violent actions toward a common ideological objective without direct operational orders or centralized logistics.",
    why: "By removing headquarters, roster lists, and communication chains, leaderless networks prevent law enforcement from using traditional wiretaps and infiltration to foil plots.",
    analogy: "Analogy: Like an open-source coding repository where contributors build software independently without ever meeting or taking orders from a project manager."
  },
  leader_automated: {
    category: "Algorithmic Radicalization",
    title: "'Leader-Automated' Radicalization",
    def: "The foundational thesis that modern digital extremism is not truly leaderless, but rather 'leader-automated'—where the charismatic human figurehead is replaced by recommendation algorithms that function as a 'virtual commander.'",
    why: "Algorithms autonomously handle target selection (amplifying out-group hostility) and escalation of commitment (guiding users to extremist destinations like the Blackpill) to maximize platform retention.",
    analogy: "Analogy: Instead of a cult leader whispering in your ear at a compound, an AI recommendation engine curates a personalized spiral of grievance and rage directly onto your smartphone screen."
  },
  relative_deprivation: {
    category: "Sociological Conflict Theory",
    title: "Relative Deprivation (Ted Gurr)",
    def: "A foundational theory of political violence asserting that rebellion and aggression emerge from the psychological tension between 'value expectations' (goods and status to which people believe they are entitled) and 'value capabilities' (what they are realistically able to achieve).",
    why: "Radicalization does not require absolute poverty or starvation; it erupts when a group perceives that a rightful, promised status has been denied or taken away.",
    analogy: "Analogy: A driver who is not starving, but boils with road rage because they believe their luxury sports car guarantees them the unconditional right of way."
  },
  aggrieved_entitlement: {
    category: "Social Psychology & Manosphere",
    title: "Aggrieved Entitlement",
    def: "A psychological condition in which members of a historically dominant group feel that privileges and hierarchical status to which they are inherently entitled have been wrongfully stolen by an external out-group (specifically women and feminists).",
    why: "Incel ideology frames romantic isolation not as a personal struggle, but as a systemic injustice—a 'gynocentric conspiracy' stripping men of their natural social and sexual birthright.",
    analogy: "Analogy: Feeling furious that you arrived at a concert with a ticket you assumed was front-row VIP, only to discover general admission seating."
  },
  blackpill: {
    category: "Extremist Ideology",
    title: "The 'Blackpill' Nihilism",
    def: "A fatalistic subcultural dogma asserting that romantic, sexual, and social hierarchy is rigidly predetermined by immutable genetic and physical characteristics, rendering self-improvement futile and presenting violent exit or a 'beta uprising' as the only justifiable reaction.",
    why: "Unlike traditional political insurgencies that seek policy reform or governance, Blackpill nihilism views the social contract as unreformable, eliminating any possibility of political negotiation.",
    analogy: "Analogy: Deciding that because a game is permanently rigged against you, the only rational move left is to overturn the table and set the room on fire."
  },
  radical_filter_bubbles: {
    category: "Platform Architecture",
    title: "Radical Filter Bubbles (Reed et al.)",
    def: "Algorithmic curation systems on mainstream and fringe platforms that isolate users into hyper-personalized information ecosystems, progressively prioritizing and serving more extreme content to maximize engagement and watch time.",
    why: "It creates an invisible, private radicalization pipeline that leaves traditional law enforcement completely blind, as recruitment occurs through mathematical optimization rather than human contact.",
    analogy: "Analogy: Walking into a library to browse and having a robotic librarian quietly replace all moderate books with extremist manifestos tailored to your specific insecurities."
  },
  scattered_attacks: {
    category: "Tactical Violence Modeling",
    title: "'Scattered Attacks' (Malthaner et al.)",
    def: "A pattern of violence produced by decentralized, leaderless movements characterized by low-tech, high-impact, single-attacker strikes against soft civilian targets (such as vehicle rammings or solo shootings).",
    why: "While decentralized actors struggle to execute complex multi-target operations like 9/11, they generate frequent, volatile strikes that are impossible to predict individually yet statistically certain in aggregate.",
    analogy: "Analogy: Trying to prevent random sparks in dry brush versus intercepting an organized military air strike."
  },
  poes_law: {
    category: "Intelligence & Threat Assessment",
    title: "Poe's Law & Irony Masking",
    def: "An internet adage stating that without an explicit indicator of intent, it is impossible to distinguish between genuine extremism and satire; extremist communities intentionally weaponize dark humor and 'shitposting' as operational camouflage.",
    why: "Federal threat-management agencies require evidence of 'credible threat' with clear intent and capability. Memetic irony grants perpetrators plausible deniability until the violent strike occurs.",
    analogy: "Analogy: A suspect walking into a bank with a mask and crowbar, claiming they are merely 'satirizing a heist' right up until they smash open the deposit box."
  },
  validation_loop: {
    category: "Behavioral Gamification",
    title: "The Validation Loop & 'E-bile'",
    def: "A peer-to-peer social reward mechanism in online forums where users gain instant digital prestige (upvotes, badges, replies) for producing hyper-misogynistic rhetoric ('E-bile') and provocative content ('shitposting').",
    why: "It gamifies radicalization, turning violent ideation into the primary currency of belonging and accelerating the transition of passive 'lurkers' into active 'perpetrators.'",
    analogy: "Analogy: An arcade pinball machine that only awards points, flashing lights, and cheers when you fire increasingly hostile and destructive shots."
  },
  prosecutor_model: {
    category: "Federal Counterterrorism Doctrine",
    title: "The 'Prosecutor' Threat Model (A.M. Gallo)",
    def: "The legacy counterterrorism framework employed by the Department of Justice and FBI, designed to dismantle established hierarchical organizations through structural decapitation, leadership indictments, and asset seizures.",
    why: "This model fails against algorithmic extremism because there is no central hierarchy to indict, no leadership to arrest, and no financial infrastructure to freeze.",
    analogy: "Analogy: Trying to disperse morning fog by slapping handcuffs on the air."
  },
  e_bile: {
    category: "Digital Discourse & Subculture",
    title: "E-Bile",
    def: "A term describing extreme, dehumanizing, hyper-misogynistic rhetoric and cyber-hostility disseminated across digital platforms, serving as an ideological bonding mechanism within the Manosphere.",
    why: "It normalizes violent ideation against out-groups (women and feminists), shifting peer norms until violent physical action is perceived as justified retribution.",
    analogy: "Analogy: Toxic chemical runoff that gradually poisons an entire reservoir until normal life cannot survive."
  },
  paradox_of_resilience: {
    category: "Network Theory",
    title: "The Paradox of Resilience",
    def: "The structural reality that while centralized organizations collapse when their leadership is decapitated, decentralized online movements are 'hydra-headed'—platform bans merely trigger migration to less regulated grey-zone platforms where rhetoric becomes more extreme.",
    why: "Platform bans like the 2017 r/incels purge did not end radicalization; they concentrated users into unmoderated enclaves like Incels.is and encrypted Gab forums.",
    analogy: "Analogy: Swatting a dandelion flower: instead of destroying the weed, the blow scatters millions of seeds across the entire lawn."
  },
  method_of_difference: {
    category: "Comparative Methodology",
    title: "Method of Difference (John Stuart Mill)",
    def: "A comparative research design that examines cases sharing similar outcomes (lethal political violence) while varying in key structural attributes (hierarchical vs. algorithmic organization) to isolate causal factors.",
    why: "By comparing Oklahoma City (1995), Isla Vista (2014), and Toronto (2018), researchers isolate how digital decentralization accelerates detection lag and alters threat lethality.",
    analogy: "Analogy: Testing three engines with the same fuel in different vehicle designs to pinpoint how the chassis affects speed."
  },
  stochastic_terrorism: {
    category: "Tactical Threat Architecture",
    title: "Stochastic Terrorism",
    def: "The use of mass communication (or algorithmic amplification) to incite ideologically motivated violence that is statistically predictable in aggregate, yet individually unpredictable in timing, location, and perpetrator.",
    why: "Traditional intelligence cannot predict which specific online user will cross the threshold from reading manifestos to carrying out an attack.",
    analogy: "Analogy: Constantly loading dice and rolling them: you cannot predict which roll will land on snake eyes, but you know with mathematical certainty that snake eyes will eventually appear."
  },

  // Post 3 Glossary: The End of Linear Globalization
  end_of_history: {
    category: "Post-Cold War Political Philosophy",
    title: "The 'End of History' (Francis Fukuyama)",
    def: "Francis Fukuyama's 1992 thesis proposing that the collapse of the Soviet Union marked the culmination of ideological evolution, with Western liberal democracy and market-driven capitalism establishing themselves as the final, universal form of human government.",
    why: "This optimism drove three decades of unchecked trade liberalization and supply chain outsourcing, before fracturing against 21st-century great-power rivalry and economic nationalism.",
    analogy: "Analogy: Believing that because a championship game ended, all future sports tournaments have been permanently settled and replaced by friendly trade."
  },
  trilemma: {
    category: "International Political Economy",
    title: "The Globalization Trilemma (Dani Rodrik)",
    def: "A foundational political-economy theorem stating that a nation cannot simultaneously sustain: (1) hyperglobalization, (2) national sovereignty, and (3) democratic politics. It can pick any two, but must sacrifice the third.",
    why: "Explains why voters in democratic societies revolt against global rules when local jobs and sovereign regulations are overridden by international market mandates.",
    analogy: "Analogy: A three-legged stool where you can only sit if two legs are attached—trying to force all three simultaneously collapses the stool under political tension."
  },
  second_unbundling: {
    category: "Trade Economics & ICT",
    title: "The Second Unbundling (Richard Baldwin)",
    def: "Richard Baldwin's theory that modern Information and Communications Technology (ICT) drastically lowered coordination costs, allowing corporations to geographically fragment physical factory production across international supply chains.",
    why: "While maximizing corporate efficiency, this dispersion created acute vulnerabilities to cyber-espionage, regulatory choke points, and national security embargoes.",
    analogy: "Analogy: Disassembling an entire engine factory into separate workshops across five continents connected solely by real-time video calls and digital tracking."
  },
  slowbalization: {
    category: "Macroeconomic Trend",
    title: "Slowbalization & De-globalization",
    def: "The slowing, plateauing, or partial reversal of global economic integration following the 2008 financial crisis, accelerated by supply chain nationalization, tariff barriers, and data sovereignty laws.",
    why: "Shows that globalization is not an irreversible physical law, but an adjustable political framework vulnerable to geopolitical disruption.",
    analogy: "Analogy: High-speed highway traffic gradually braking and redirecting onto regional toll roads with mandatory border checkpoints."
  },
  near_shoring: {
    category: "Supply Chain & FDI Strategy",
    title: "Near-Shoring & Friend-Shoring",
    def: "The strategic relocation of foreign direct investment and supply chain manufacturing to geographically proximate or politically allied countries, prioritizing resilience and political stability over pure cost minimization.",
    why: "It reshapes global capital flows, pulling investments away from developing nations with high geopolitical risk and concentrating capital in favored regional hubs.",
    analogy: "Analogy: Moving your family savings and business partnerships from an uncertain distant vendor to a trusted neighbor next door."
  },
  chokepoints: {
    category: "Classical Geopolitics",
    title: "Geopolitical Maritime Chokepoints (Peter Kelly)",
    def: "Strategic, narrow geographic passages through which critical volumes of world trade, oil, or food must pass—such as the Strait of Hormuz, the Malacca Strait, the Bab el-Mandeb, and the Black Sea.",
    why: "Classical geopolitics (Mahan and Mackinder) shows that modern economic flows remain physically constrained by geography, enabling naval blockades and energy blackmail.",
    analogy: "Analogy: A single narrow bridge carrying all water and food into a metropolitan island—whoever controls the bridge controls the city."
  },
  political_landscapes: {
    category: "Relational Geopolitics",
    title: "Political Landscapes (John A. Agnew)",
    def: "A framework challenging the rigid state-centric view of borders, arguing that international power arises through dynamic relational interactions and historic spatial claims made by emerging powers like India and Brazil.",
    why: "Demonstrates that global trade is constantly re-engineered by regional cultural and historical claims, not just fixed sovereign lines.",
    analogy: "Analogy: Viewing a neighborhood not by legal property boundary maps, but by living pathways, cultural centers, and social gathering networks."
  },
  piketty_inequality: {
    category: "Capital Dynamics & Inequality",
    title: "Capital Accumulation & The Development Gap (Thomas Piketty)",
    def: "Thomas Piketty's empirical formulation (r > g) showing that when the rate of return on capital exceeds overall economic growth, wealth concentrates into existing asset owners far faster than wages rise for laborers.",
    why: "As FDI shifts toward near-shoring and automated hubs, developing countries reliant purely on wage labor fall further behind capital-rich economies.",
    analogy: "Analogy: An elevator moving investors to the penthouse at 10 mph while workers are forced to walk up the emergency stairs at 1 mph."
  },
  development_as_freedom: {
    category: "Human Development Economics",
    title: "Development as Freedom & Adaptive Sovereignty (Amartya Sen)",
    def: "Nobel laureate Amartya Sen's philosophy that true economic development is measured by the expansion of human substantive freedoms—such as quality healthcare, education, and institutional resilience—rather than raw GDP growth.",
    why: "Countries that invest in human capital develop 'adaptive sovereignty,' allowing them to absorb external trade shocks without political collapse.",
    analogy: "Analogy: Building a ship out of flexible, reinforced shock-absorbing materials rather than brittle steel that cracks in heavy ocean storms."
  },
  green_pacts: {
    category: "Sustainable Geoeconomics",
    title: "Green Investment Pacts (Joseph Stiglitz)",
    def: "Joseph Stiglitz's proposed replacement for outdated 20th-century trade pacts, linking market access and cross-border investment directly to decarbonization, renewable energy standards, and environmental resilience.",
    why: "Traditional trade deals prioritized shipping efficiency regardless of emissions; green pacts force trade rules to align with planetary ecological survival.",
    analogy: "Analogy: Updating building codes so that only eco-certified, fireproof, and storm-resistant materials can be bought and traded across town lines."
  },
  defensive_globalization: {
    category: "Strategic Trade Architecture",
    title: "Defensive Globalization",
    def: "A posture where sovereign states maintain international economic ties while systematically erecting defensive firewalls—such as semiconductor export controls, critical mineral stockpiles, and data localization mandates—to guard against weaponized interdependence.",
    why: "Marks the death of uncritical open borders; national security now sets the boundary conditions for global trade.",
    analogy: "Analogy: Installing reinforced security gates, cameras, and ID scanners at every entrance of a previously open shopping mall."
  },

  // Post 4 Glossary: Political Censorship and Creative Resistance
  made_in_censorship: {
    category: "Censorship Theory",
    title: "Productive Censorship (Thomas M. Chen)",
    def: "The analytical concept that state censorship functions not merely as a negative, repressive eraser of speech, but as a generative and 'productive' force that forces artists to invent sophisticated aesthetic codes, indirect metaphors, and innovative formal languages to negotiate political constraints.",
    why: "Rather than simply silencing artists, censorship actively shapes the formal and aesthetic DNA of contemporary Chinese-language cinema.",
    analogy: "Analogy: Like a river hitting a solid concrete dam; rather than disappearing, the water surges sideways, carving out deep, winding, and intricate new canyons to keep moving."
  },
  navigational_strategies: {
    category: "Cinematic Politics",
    title: "Navigational Strategies",
    def: "Formal, narrative, and generic techniques deployed by filmmakers to articulate politically sharp critiques of state power, corruption, and inequality while remaining technically within the permissible boundaries of censorship clearance.",
    why: "Enables filmmakers to critique the contemporary political order without suffering outright bans, blacklisting, or confiscation of film assets.",
    analogy: "Analogy: A skilled sailor tacking against gale-force headwinds, zigzagging at precise angles to advance toward their destination without capsizing."
  },
  cfa_mechanism: {
    category: "Institutional Regulation",
    title: "China Film Administration (CFA)",
    def: "The central regulatory agency responsible for film censorship, licensing, financing approval, and theatrical distribution in China, placed directly under the CCP Central Propaganda Department following bureaucratic restructuring in 2018.",
    why: "Centralized ideological supervision of popular culture directly under the Party's core propaganda apparatus rather than civil ministries.",
    analogy: "Analogy: A security checkpoint where your passport and cargo must be inspected, stamped, and approved by the highest political directors before you are allowed past the gate."
  },
  dragon_seal: {
    category: "Regulatory Licensing",
    title: "The Dragon Seal (Longbiao)",
    def: "The animated green permit banner featuring a golden dragon displayed before the opening credits of every commercially distributed film in mainland China, signaling formal approval from the China Film Administration.",
    why: "Without the Dragon Seal, a film cannot legally be screened in commercial theaters, broadcast digitally, or submitted to overseas international film festivals.",
    analogy: "Analogy: An official notarized government passport required before any creative work is permitted to travel in public view."
  },
  genre_camouflage: {
    category: "Aesthetic Strategy",
    title: "Genre Camouflage (Trojan Horse)",
    def: "The strategic deployment of established popular commercial genres—such as martial arts (wuxia), hardboiled crime thrillers (film noir), or melodramas—to cloak systemic social and political critiques in the guise of harmless entertainment.",
    why: "Popular genre tropes give filmmakers plausible deniability before review boards, allowing structural critiques of authority to appear inherent to formulaic storytelling.",
    analogy: "Analogy: A Trojan horse wheeled into a fortress, where the outer exterior looks like a popular carnival attraction while carrying a payload of radical ideas inside."
  },
  xia_knight_errant: {
    category: "Cultural Mythology & Resistance",
    title: "The Xia (Knight-Errant)",
    def: "A classical figure in Chinese literature and wuxia tradition characterized by an individualist moral code, who operates outside and above official state law to defend the powerless, right systemic wrongs, and enforce cosmic justice.",
    why: "Reappropriating the xia myth enables contemporary filmmakers to depict illegal acts of violence as legitimate moral resistance against corrupt state officials and predatory capitalists.",
    analogy: "Analogy: Like Robin Hood in Sherwood Forest, a folk hero who breaks the sheriff's formal laws because the laws themselves have become weapons of injustice."
  },
  hexie_shehui: {
    category: "CCP State Ideology",
    title: "Harmonious Society (Hexie Shehui)",
    def: "A signature socio-political doctrine promoted by the CCP leadership emphasizing social stability, national cohesion, and the absence of class conflict as the paramount goals of modernization.",
    why: "Challenged by critical filmmakers who expose how the official rhetoric of 'harmony' conceals extreme regional inequality, forced dispossession, and migrant exploitation.",
    analogy: "Analogy: Demanding that an entire orchestra play in soothing unison, while refusing to acknowledge that half the musicians' instruments are broken."
  },
  noir_decay: {
    category: "Visual Stylistics & Critique",
    title: "Neo-Noir Post-Industrial Decay",
    def: "A visual and tonal aesthetic characterized by bleak palettes (charcoal, soiled snow, industrial rust, fluorescent green), oppressive urban sprawl, and morally ambiguous protagonists navigating institutional collapse.",
    why: "Provides an atmospheric language that externalizes psychological disillusionment and institutional rot without making direct, censorable verbal declarations.",
    analogy: "Analogy: Painting a cityscape in mud and shadows so the viewer feels the decay in their bones, without the painter ever having to write 'this city is ruined' on the canvas."
  },
  technical_reasons: {
    category: "Censorship Diplomacy",
    title: "'Technical Reasons' (Jishu Yuanyin)",
    def: "A widely recognized diplomatic and bureaucratic euphemism employed by Chinese authorities and festivals when a film is abruptly pulled from international exhibition due to ideological sensitivity or censorship disapproval.",
    why: "Allows the state to exert extra-territorial political control while avoiding overt public debates about artistic repression or political censorship.",
    analogy: "Analogy: A flight announcement claiming 'unforeseen mechanical issues' when government authorities have quietly impounded the plane on the tarmac."
  },
  memory_management: {
    category: "State Historiography",
    title: "Party Memory Management",
    def: "The strict state regulation and monopolization of historical narratives concerning sensitive political traumas, notably the Cultural Revolution (1966–1976), the Great Leap Forward, and the 1989 Tiananmen Square protests.",
    why: "Marks the absolute outer boundary of aesthetic negotiation; historical trauma that threatens Party legitimacy cannot be salvaged even through the most sophisticated genre coding.",
    analogy: "Analogy: A locked national archive where only the state librarian is permitted to decide which pages of history the public is allowed to read."
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
      e.preventDefault();
      const termKey = chip.dataset.term;
      let data = (window.glossary || glossary)[termKey];
      
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

      if (modalCat) modalCat.textContent = data.category || "Theoretical Concept";
      if (modalTitle) modalTitle.textContent = data.title || "";
      if (modalDef) modalDef.textContent = data.def || "";
      if (modalWhy) {
        let whyHtml = '';
        if (data.why) {
          const cleanWhy = data.why.replace(/^(why it matters:?\s*)+/i, '');
          whyHtml += `<strong>Why It Matters:</strong> ${cleanWhy}`;
        }
        if (data.analogy) whyHtml += `${data.why ? '<br><br>' : ''}<span style="color: var(--text-muted);">${data.analogy}</span>`;
        modalWhy.innerHTML = whyHtml;
      }

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
      tab.addEventListener('click', (e) => {
        e.preventDefault();
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
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPane = document.getElementById(tab.dataset.tab) || container.querySelector('#' + tab.dataset.tab);
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
    const allRows = container.querySelectorAll('.matrix-row');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter; // 'all', 'liberal', 'realism', 'hierarchical', 'algorithmic'
        
        allRows.forEach(row => {
          const colA = row.querySelector('.matrix-col-liberal, .matrix-col-hierarchical');
          const colB = row.querySelector('.matrix-col-realism, .matrix-col-algorithmic');

          if (filter === 'all') {
            row.style.gridTemplateColumns = '160px 1fr 1fr';
            if (colA) colA.style.display = '';
            if (colB) colB.style.display = '';
          } else if (filter === 'liberal' || filter === 'hierarchical') {
            row.style.gridTemplateColumns = '160px 1fr';
            if (colA) colA.style.display = '';
            if (colB) colB.style.display = 'none';
          } else if (filter === 'realism' || filter === 'algorithmic') {
            row.style.gridTemplateColumns = '160px 1fr';
            if (colA) colA.style.display = 'none';
            if (colB) colB.style.display = '';
          }
        });
      });
    });
  });
}

/* --- 7. Scenario Simulator --- */
var scenarios = {
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
  },

  // Post 3 Scenarios: The Globalization Trilemma
  trilemma_straitjacket: {
    title: "Configuration 1: The 'Golden Straitjacket' (Hyperglobalization + Nation-State)",
    outcome_a: "<strong>Sacrificed:</strong> <em>Democratic Governance</em>. Domestic policy is tightly constrained by international financial markets, multinational capital flows, and foreign investor tribunals.",
    outcome_b: "<strong>Real-World Trade-Off:</strong> The pre-2008 Washington Consensus and euro-zone debt crisis mandates, where domestic voters could replace prime ministers but could not alter macroeconomic austerity rules set abroad."
  },
  trilemma_bretton_woods: {
    title: "Configuration 2: The 'Bretton Woods Compromise' (Democratic Politics + National Sovereignty)",
    outcome_a: "<strong>Sacrificed:</strong> <em>Hyperglobalization</em>. Unrestricted global capital mobility is surrendered in favor of sovereign capital controls, targeted tariffs, and domestic industrial policy.",
    outcome_b: "<strong>Real-World Trade-Off:</strong> The 1945–1973 Post-WWII economic expansion. Nations traded manufactured goods under GATT, while preserving sovereign welfare safety nets, healthcare systems, and labor unions."
  },
  trilemma_global_governance: {
    title: "Configuration 3: Global Democratic Federalism (Hyperglobalization + Democratic Politics)",
    outcome_a: "<strong>Sacrificed:</strong> <em>National Sovereignty</em>. Autonomous nation-states cede sovereign power to binding supranational democratic parliaments and global regulatory agencies.",
    outcome_b: "<strong>Real-World Trade-Off:</strong> The European Union model taken to its theoretical extreme. A unified supranational legislature regulating a borderless single market, though continually challenged by sovereign national resistance."
  },

  // Post 4 Scenarios: Navigational Strategies under Film Censorship
  strategy_wuxia: {
    title: "Strategy 1: The Wuxia Allegory (Jia Zhangke - A Touch of Sin)",
    outcome_a: "<strong>Generic Shield:</strong> Traditional martial arts revenge narrative. Exploits the centuries-old Chinese cultural tradition of the wandering sword fighter (*xia*) defending personal honor against corrupt, predatory local tyrants.",
    outcome_b: "<strong>Smuggled Critique:</strong> Reframes violent attacks by marginalized rural migrant workers against corrupt village chiefs and factory bosses as righteous retribution, dismantling the state myth of 'Harmonious Society' (hexie shehui)."
  },
  strategy_noir: {
    title: "Strategy 2: The Neo-Noir Landscape (Diao Yinan - Black Coal, Thin Ice)",
    outcome_a: "<strong>Generic Shield:</strong> Hardboiled police procedural thriller. Follows an alcoholic ex-cop investigating a serial killer dismembering bodies across a northern industrial coal mining network.",
    outcome_b: "<strong>Smuggled Critique:</strong> Uses gray post-industrial rustbelts, flickering neon, and severed body parts as visual metaphors for the complete erosion of social trust, worker alienation, and institutional breakdown under hyper-capitalism."
  },
  strategy_historical: {
    title: "Strategy 3: Historical Memory Drama (Zhang Yimou - One Second)",
    outcome_a: "<strong>Generic Shield:</strong> Sentimental cinephilic melodrama. A touching story about the communal magic of celluloid film projection and a father's love for his daughter in a remote desert village.",
    outcome_b: "<strong>Smuggled Critique:</strong> Exposes the collective psychological trauma, forced labor camps, and spiritual famine of the Cultural Revolution. Crossed sensitivity red lines, triggering a sudden withdrawal from the Berlin Film Festival."
  }
};

function initScenarioSimulator() {
  const simulators = document.querySelectorAll('.scenario-simulator');
  if (!simulators.length) return;

  simulators.forEach(sim => {
    const btns = sim.querySelectorAll('.scenario-btn');
    const titleEl = sim.querySelector('#scenario-title') || sim.querySelector('.scenario-title');
    const libBox = sim.querySelector('#scenario-liberal, #scenario-traditional, #scenario-outcome-a, .scenario-col-a');
    const realBox = sim.querySelector('#scenario-realism, #scenario-algorithmic, #scenario-outcome-b, .scenario-col-b');

    if (!btns.length || !titleEl) return;

    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const data = scenarios[btn.dataset.scenario];
        if (!data) return;

        titleEl.innerHTML = data.title;
        if (libBox) libBox.innerHTML = data.liberal || data.traditional || data.outcome_a || '';
        if (realBox) realBox.innerHTML = data.realism || data.algorithmic || data.outcome_b || '';
      });
    });
  });
}

/* --- 8. Knowledge Check (Quiz) --- */
function initQuiz() {
  document.querySelectorAll('.quiz-question-card').forEach(card => {
    const options = card.querySelectorAll('.quiz-option-btn');
    const feedback = card.querySelector('.quiz-feedback');
    if (!options.length || !feedback) return;

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        // Reset options in this card
        options.forEach(o => {
          o.classList.remove('correct', 'incorrect');
        });

        const isCorrect = opt.dataset.correct === 'true';
        if (isCorrect) {
          opt.classList.add('correct');
          feedback.innerHTML = `<strong>✓ Correct!</strong> ${opt.dataset.feedback || ''}`;
          feedback.style.background = 'rgba(16, 185, 129, 0.12)';
          feedback.style.color = '#10b981';
        } else {
          opt.classList.add('incorrect');
          feedback.innerHTML = `<strong>✗ Incorrect.</strong> ${opt.dataset.feedback || ''}`;
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
