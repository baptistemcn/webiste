class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["href", "variant", "icon", "target", "download"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const cssPath = new URL("./button.css", import.meta.url).href;

    const href = this.getAttribute("href") || "#";
    const variant = this.getAttribute("variant") || "glass";
    const icon = this.getAttribute("icon") || "";
    const target = this.getAttribute("target") || "_self";
    const download = this.hasAttribute("download") ? "download" : "";
    const label = this.textContent || "Bouton";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${cssPath}">
      
      <a class="btn btn-${variant}" href="${href}" target="${target}" ${download}>
        ${
          icon
            ? `<span class="material-symbols-outlined" aria-hidden="true">${icon}</span>`
            : ""
        }
        <span>${label}</span>
      </a>
    `;
  }
}

customElements.define("link-btn", Button);
