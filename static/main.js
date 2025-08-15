document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  // Aplica o fade-in na página ao carregar
  body.classList.add("fade-in");

  // Suaviza a saída ao clicar em qualquer link interno
  const links = document.querySelectorAll("a[href^='/']");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = href;
      }, 300); // Tempo igual ao da transição CSS
    });
  });

  // Evita múltiplos envios nos formulários
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function () {
      const submitButton = form.querySelector("button[type='submit']");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Carregando...';
      }

      const loadingDiv = document.createElement("div");
      loadingDiv.className = "mt-3 alert alert-info";
      loadingDiv.innerText = "Carregando dados, por favor aguarde...";
      form.appendChild(loadingDiv);

      body.classList.add("fade-out");
    });
  });
});
