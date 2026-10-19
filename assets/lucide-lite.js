(() => {
  "use strict";
  const paths = {
    swords: '<path d="m14.5 5.5 4-4 4 4-4 4"/><path d="m18.5 1.5-10 10"/><path d="m5.5 14.5-4 4 4 4 4-4"/><path d="m1.5 18.5 10-10"/><path d="m14 10 4 4"/><path d="m10 14 4 4"/>',
    trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a4 4 0 0 0 4 4"/><path d="M17 6h3v2a4 4 0 0 1-4 4"/>',
    medal: '<circle cx="12" cy="14" r="6"/><path d="m8 3 4 5 4-5"/><path d="M8 3h8"/><path d="m10 14 1.3 1.3L14 12.5"/>',
    clapperboard: '<path d="M3 7h18v14H3z"/><path d="M3 7 5 3h18l-2 4"/><path d="m8 3 4 4"/><path d="m14 3 4 4"/>',
    "trending-up": '<path d="M3 17 9 11l4 4 8-9"/><path d="M15 6h6v6"/>'
  };
  window.lucide = {
    createIcons(options = {}) {
      const attrs = options.attrs || {};
      document.querySelectorAll("i[data-lucide]").forEach((node) => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", String(attrs["stroke-width"] || 1.55));
        svg.setAttribute("stroke-linecap", attrs["stroke-linecap"] || "square");
        svg.setAttribute("stroke-linejoin", attrs["stroke-linejoin"] || "miter");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.innerHTML = paths[node.dataset.lucide] || '<circle cx="12" cy="12" r="9"/>';
        node.replaceWith(svg);
      });
    }
  };
})();