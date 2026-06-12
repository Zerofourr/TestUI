const competitorInput = document.querySelector("#competitor");
const clientInput = document.querySelector("#client");
const angleInput = document.querySelector("#angle");
const reportTitle = document.querySelector("#reportTitle");
const reportAngle = document.querySelector("#reportAngle");
const strategyHeading = document.querySelector("#strategyHeading");
const movesList = document.querySelector("#movesList");
const generateBtn = document.querySelector("#generateBtn");

const outputCopy = {
  summary: {
    kicker: "Executive Summary",
    title: "Partner-level synthesis",
    bullets: [
      "Sharp, 5-7 bullet narrative for senior stakeholders.",
      "Prioritizes insight over source recitation.",
      "Frames what matters, why now, and what the client should do next."
    ]
  },
  snapshot: {
    kicker: "Competitor Snapshot",
    title: "Business model and market posture",
    bullets: [
      "Captures core offerings, audience, revenue logic, and segment focus.",
      "Separates stated positioning from inferred strategic intent.",
      "Highlights how the competitor wants buyers to understand the category."
    ]
  },
  campaign: {
    kicker: "Campaign & Messaging Analysis",
    title: "Narratives, hooks, and content patterns",
    bullets: [
      "Identifies repeated themes across website, product pages, news, and campaigns.",
      "Maps emotional triggers such as speed, confidence, affordability, or control.",
      "Surfaces the brand voice behind the go-to-market motion."
    ]
  },
  threats: {
    kicker: "Threat Analysis",
    title: "Risks that matter commercially",
    bullets: [
      "Distinguishes direct displacement threats from longer-term category risks.",
      "Assesses where the competitor has pricing, narrative, or distribution leverage.",
      "Calls out vulnerabilities the client can exploit."
    ]
  },
  moves: {
    kicker: "Recommended Moves",
    title: "Action, rationale, and expected impact",
    bullets: [
      "Provides 5-10 concrete strategic actions.",
      "Each move includes what to do, why it works, and expected impact.",
      "Balances quick wins with durable differentiation plays."
    ]
  }
};

function currentBrief() {
  return {
    competitor: competitorInput.value.trim() || "Competitor",
    client: clientInput.value.trim() || "Client",
    angle: angleInput.value.trim() || "Strategic angle"
  };
}

function buildMoves(brief) {
  return [
    {
      title: `Reframe ${brief.client} as the scale-ready choice`,
      body: `Position against ${brief.competitor} by showing buyers they can start simply today without switching platforms once operations become more complex.`
    },
    {
      title: "Package AI outcomes, not AI capability",
      body: `Convert the ${brief.angle.toLowerCase()} story into priced outcomes such as resolved cases, qualified leads, or booked meetings.`
    },
    {
      title: "Build migration triggers around growth pain",
      body: `Target customers when ${brief.competitor}'s simplicity starts creating limits in governance, reporting, integrations, or advanced workflows.`
    },
    {
      title: "Turn partner delivery into fixed activation plays",
      body: "Offer one-week AI implementation packages with prebuilt workflows, proof metrics, and clear ownership."
    }
  ];
}

function renderMoves() {
  const brief = currentBrief();
  reportTitle.textContent = `${brief.competitor} vs ${brief.client}`;
  reportAngle.textContent = brief.angle;
  strategyHeading.textContent = `Recommended moves for ${brief.client}`;

  movesList.innerHTML = "";
  buildMoves(brief).forEach((move, index) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <h3><span>${String(index + 1).padStart(2, "0")}</span>${move.title}</h3>
      <p>${move.body}</p>
    `;
    movesList.appendChild(article);
  });
}

function renderOutput(key) {
  const copy = outputCopy[key];
  document.querySelector("#outputKicker").textContent = copy.kicker;
  document.querySelector("#outputTitle").textContent = copy.title;

  const list = document.querySelector("#outputList");
  list.innerHTML = "";
  copy.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = bullet;
    list.appendChild(item);
  });

  document.querySelectorAll(".outline-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.output === key);
  });
}

document.querySelectorAll(".outline-item").forEach((button) => {
  button.addEventListener("click", () => renderOutput(button.dataset.output));
});

[competitorInput, clientInput, angleInput].forEach((field) => {
  field.addEventListener("input", renderMoves);
  field.addEventListener("change", renderMoves);
});

generateBtn.addEventListener("click", () => {
  renderMoves();
  generateBtn.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(-2px)" },
      { transform: "translateY(0)" }
    ],
    { duration: 220, easing: "ease-out" }
  );
});

renderMoves();
