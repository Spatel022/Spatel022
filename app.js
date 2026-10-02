(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const pages = {
    dashboard: "Dashboard",
    listing: "AI Listing Generator",
    profit: "Profit Calculator",
    tools: "Quick Tools"
  };

  function showPage(page) {
    if (!pages[page]) page = "dashboard";
    $$(".page").forEach(el => el.classList.toggle("active", el.id === page));
    $$(".nav").forEach(el => el.classList.toggle("active", el.dataset.page === page));
    $("#title").textContent = pages[page];
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $$(".nav, .jump").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  $("#generate").addEventListener("click", () => {
    const product = $("#product").value.trim() || "Your Product";
    const brand = $("#brand").value.trim() || "Your Brand";
    const features = $("#features").value
      .split(/,|\n/)
      .map(x => x.trim())
      .filter(Boolean)
      .slice(0, 5);

    const keywords = $("#keywords").value
      .split(",")
      .map(x => x.trim())
      .filter(Boolean);

    const market = $("#market").value;
    const tone = $("#tone").value;

    const finalFeatures = features.length
      ? features
      : ["High quality", "Practical design", "Reliable performance"];

    const titleKeyword = keywords[0] || product;

    const bullets = finalFeatures
      .map((feature, i) => (i + 1) + ". " + feature.charAt(0).toUpperCase() + feature.slice(1))
      .join("\n");

    const description =
      "Discover " + product + " from " + brand + ". " +
      "Designed with a " + tone.toLowerCase() + " presentation for " + market +
      " customers. Key features include " + finalFeatures.join(", ") + ".";

    $("#output").classList.remove("hidden");
    $("#output").textContent =
      "TITLE\n" +
      brand + " " + product + " - " + titleKeyword + "\n\n" +
      "BULLET POINTS\n" +
      bullets + "\n\n" +
      "DESCRIPTION\n" +
      description + "\n\n" +
      "KEYWORDS\n" +
      (keywords.length ? keywords.join(" • ") : product.toLowerCase());
  });

  $("#calc").addEventListener("click", () => {
    const cost = Number($("#cost").value) || 0;
    const selling = Number($("#sell").value) || 0;
    const fees = Number($("#fees").value) || 0;
    const shipping = Number($("#shipping").value) || 0;

    const profit = selling - cost - fees - shipping;
    const margin = selling ? (profit / selling) * 100 : 0;
    const roi = cost ? (profit / cost) * 100 : 0;

    $("#profitOut").innerHTML = [
      '<div class="stat"><b>£' + profit.toFixed(2) + '</b><span>Net Profit</span></div>',
      '<div class="stat"><b>' + margin.toFixed(1) + '%</b><span>Margin</span></div>',
      '<div class="stat"><b>' + roi.toFixed(1) + '%</b><span>ROI</span></div>'
    ].join("");
  });

  $("#replyBtn").addEventListener("click", () => {
    const message = $("#replyIn").value.trim() || "your query";

    $("#replyOut").textContent =
      "Hello,\n\n" +
      "Thank you for contacting us. We have received your message regarding: " +
      message +
      "\n\nWe will check the details and get back to you as soon as possible.\n\n" +
      "Kind regards,\nCustomer Support";
  });

  $("#seoBtn").addEventListener("click", () => {
    const product = $("#seoIn").value.trim();

    if (!product) {
      $("#seoOut").textContent = "Please enter a product name first.";
      return;
    }

    const base = product.toLowerCase();

    $("#seoOut").textContent = [
      base,
      base + " for home",
      base + " for travel",
      base + " premium",
      base + " online",
      "best " + base,
      base + " gift idea",
      base + " accessories"
    ].join(" • ");
  });

  $("#calc").click();
})();