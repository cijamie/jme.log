/**
 * monograph.js
 * Interactive scripts for "The Architecture of Primacy"
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
    const targetId = activePill ? activePill.dataset.target : 'chap-intro';
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
const chaptersOrder = [
  'chap-intro',
  'chap-geography',
  'chap-operating-system',
  'chap-paradox',
  'chap-realignment',
  'chap-grand-strategy',
  'chap-conclusion'
];

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
  const idx = chaptersOrder.indexOf(chapterId);
  const prevBtns = document.querySelectorAll('.stepper-prev-btn');
  const nextBtns = document.querySelectorAll('.stepper-next-btn');

  prevBtns.forEach(btn => {
    if (idx > 0) {
      btn.style.display = 'inline-flex';
      btn.dataset.target = chaptersOrder[idx - 1];
    } else {
      btn.style.display = 'none';
    }
  });

  nextBtns.forEach(btn => {
    if (idx < chaptersOrder.length - 1) {
      btn.style.display = 'inline-flex';
      btn.dataset.target = chaptersOrder[idx + 1];
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
  }
};

function initMetricCards() {
  const detailBox = document.getElementById('metric-detail-box');
  const cards = document.querySelectorAll('.metric-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.metric;
      const data = metricDetails[key];
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
    analogy: "Analogy: The ultimate 'Three Musketeers' clause—'All for one, and one for all.' Touching a small country triggers the full military wrath of the world's greatest superpower."
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
      const data = glossary[termKey];
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

/* --- 5. Interactive Tabs (Section III: Rebuilding vs Intervention) --- */
function initCaseTabs() {
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
}

/* --- 6. Grand Strategy Matrix Filter --- */
function initStrategyMatrix() {
  const filterBtns = document.querySelectorAll('.matrix-filter-btn');
  const rows = document.querySelectorAll('.matrix-row:not(.header)');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter; // 'all', 'liberal', 'realism'
      
      rows.forEach(row => {
        const colLib = row.querySelector('.matrix-col-liberal');
        const colReal = row.querySelector('.matrix-col-realism');

        if (filter === 'all') {
          row.style.gridTemplateColumns = '160px 1fr 1fr';
          if (colLib) colLib.style.display = 'block';
          if (colReal) colReal.style.display = 'block';
        } else if (filter === 'liberal') {
          row.style.gridTemplateColumns = '160px 1fr';
          if (colLib) colLib.style.display = 'block';
          if (colReal) colReal.style.display = 'none';
        } else if (filter === 'realism') {
          row.style.gridTemplateColumns = '160px 1fr';
          if (colLib) colLib.style.display = 'none';
          if (colReal) colReal.style.display = 'block';
        }
      });
    });
  });
}

/* --- 7. Scenario Simulator --- */
const scenarios = {
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
  }
};

function initScenarioSimulator() {
  const btns = document.querySelectorAll('.scenario-btn');
  const titleEl = document.getElementById('scenario-title');
  const libBox = document.getElementById('scenario-liberal');
  const realBox = document.getElementById('scenario-realism');

  if (!btns.length || !titleEl) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = scenarios[btn.dataset.scenario];
      if (!data) return;

      titleEl.innerHTML = data.title;
      libBox.innerHTML = data.liberal;
      realBox.innerHTML = data.realism;
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
