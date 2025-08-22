document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  body.classList.add("fade-in");

  const links = document.querySelectorAll("a[href^='/']");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = href;
      }, 300); 
    });
  });

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

// const CA_API_URL = "https://131.163.96.121:8000/buscar?codigo_rastreio= ";

// fetch(CA_API_URL)
//   .then (Response => {
//     if (Response.ok){
//       document.getElementById("status-servidor").innerText = "Status Servidor: Online";
//     } else {
//       document.getElementById("status-servidor").innerText = "Status Servidor: Offline";
//     }
//   })
//   .catch(error => {
//     document.getElementById("status-servidor").textContent = "Status Servidor: Offline";
//   });

// fetch(CA_API_URL)
//   .then(response => {
//     // Verifica se a requisição foi bem-sucedida (status 200-299)
//     if (response.ok) {
//       document.getElementById("status-servidor").innerText = "Status Servidor: Offline❌";
//     } else {
//       document.getElementById("status-servidor").innerText = "Status Servidor: Online✳️";
//     }
//   })
//   .catch(error => {
//     // Se o erro for net::ERR_SSL_PROTOCOL_ERROR, consideramos o servidor como online
//     if (error.message.includes('net::ERR_SSL_PROTOCOL_ERROR')) {
//       document.getElementById("status-servidor").innerText = "Status Servidor: Offline❌";
//     }
//     // Para outros erros, consideramos o servidor como offline
//     else {
//       document.getElementById("status-servidor").innerText = "Status Servidor: Online✳️";
//     }
//   });
