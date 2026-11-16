// MoneyChain - Main App JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Start Simulation buttons
  const startButtons = document.querySelectorAll(
    "#startSimulation, .start-simulation"
  );

  startButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "simulation.html";
    });
  });

  // Dashboard buttons
  const dashboardButtons = document.querySelectorAll(
    "#dashboardButton, .dashboard-button"
  );

  dashboardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  });

  // Back Home buttons
  const homeButtons = document.querySelectorAll(
    "#homeButton, .home-button"
  );

  homeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  });

  // Reset Simulation buttons
  const resetButtons = document.querySelectorAll(
    "#resetSimulation, .reset-simulation"
  );

  resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (
        typeof resetSimulation === "function" &&
        confirm("Reset the educational simulation?")
      ) {
        resetSimulation();
      }
    });
  });

  // Dashboard reset button
  const dashboardReset = document.getElementById("dashboardReset");

  if (dashboardReset) {
    dashboardReset.addEventListener("click", () => {
      if (typeof resetSimulation === "function") {
        const confirmed = confirm(
          "Reset all MoneyChain simulation data?"
        );

        if (confirmed) {
          resetSimulation();
          window.location.reload();
        }
      }
    });
  }

  // Simple active navigation link
  const currentPage = window.location.pathname.split("/").pop();

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});