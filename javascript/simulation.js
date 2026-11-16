// MoneyChain - Educational Simulation

document.addEventListener("DOMContentLoaded", () => {
  // Make sure simulation data exists
  if (typeof simulationData === "undefined") {
    console.error("simulationData is not available. Check data.js.");
    return;
  }

  // Input elements
  const newParticipantsInput = document.getElementById("newParticipants");
  const virtualDepositInput = document.getElementById("virtualDeposit");
  const payoutRateInput = document.getElementById("payoutRate");

  // Buttons
  const runRoundButton = document.getElementById("runRound");
  const resetButton = document.getElementById("resetSimulation");

  // Round statistics
  const roundNumber = document.getElementById("roundNumber");
  const roundParticipants = document.getElementById("roundParticipants");
  const roundDeposits = document.getElementById("roundDeposits");
  const roundPayouts = document.getElementById("roundPayouts");
  const roundBalance = document.getElementById("roundBalance");

  // Overall statistics
  const totalParticipants = document.getElementById("totalParticipants");
  const totalDeposits = document.getElementById("totalDeposits");
  const totalPayouts = document.getElementById("totalPayouts");
  const totalBalance = document.getElementById("totalBalance");

  // Activity log
  const activityLog = document.getElementById("activityLog");

  // Format numbers as virtual currency
  function formatCurrency(amount) {
    return `V$${Number(amount).toLocaleString()}`;
  }

  // Update all displayed statistics
  function updateDisplay() {
    roundNumber.textContent = simulationData.round;
    totalParticipants.textContent =
      simulationData.totalParticipants.toLocaleString();

    totalDeposits.textContent = formatCurrency(
      simulationData.totalDeposits
    );

    totalPayouts.textContent = formatCurrency(
      simulationData.totalPayouts
    );

    totalBalance.textContent = formatCurrency(
      simulationData.totalBalance
    );
  }

  // Add activity to the activity log
  function addActivity(message, type = "normal") {
    if (!activityLog) return;

    const activity = document.createElement("div");
    activity.className = `activity-item ${type}`;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    activity.innerHTML = `
      <div>
        <strong>${message}</strong>
        <small>${time}</small>
      </div>
    `;

    activityLog.prepend(activity);
  }

  // Run a new educational simulation round
  function runSimulationRound() {
    const participants = parseInt(newParticipantsInput.value);
    const depositPerParticipant = parseFloat(
      virtualDepositInput.value
    );
    const payoutRate = parseFloat(payoutRateInput.value);

    // Validate inputs
    if (
      isNaN(participants) ||
      isNaN(depositPerParticipant) ||
      isNaN(payoutRate)
    ) {
      alert("Please enter valid simulation values.");
      return;
    }

    if (participants <= 0) {
      alert("Participants must be greater than 0.");
      return;
    }

    if (depositPerParticipant <= 0) {
      alert("Virtual deposit must be greater than 0.");
      return;
    }

    if (payoutRate < 0 || payoutRate > 100) {
      alert("Payout rate must be between 0% and 100%.");
      return;
    }

    // Calculate virtual values
    const deposits = participants * depositPerParticipant;

    const payouts =
      simulationData.totalDeposits * (payoutRate / 100);

    const balance = deposits - payouts;

    // Update simulation state
    simulationData.round += 1;
    simulationData.totalParticipants += participants;
    simulationData.totalDeposits += deposits;
    simulationData.totalPayouts += payouts;
    simulationData.totalBalance =
      simulationData.totalDeposits -
      simulationData.totalPayouts;

    // Update current round display
    roundNumber.textContent = simulationData.round;
    roundParticipants.textContent = participants.toLocaleString();
    roundDeposits.textContent = formatCurrency(deposits);
    roundPayouts.textContent = formatCurrency(payouts);
    roundBalance.textContent = formatCurrency(balance);

    // Update overall statistics
    updateDisplay();

    // Add activity
    addActivity(
      `Round ${simulationData.round}: ${participants} fictional participants added.`,
      "normal"
    );

    addActivity(
      `Virtual deposits: ${formatCurrency(deposits)}.`,
      "deposit"
    );

    addActivity(
      `Virtual payouts calculated: ${formatCurrency(payouts)}.`,
      "payout"
    );

    // Warn when payouts exceed new virtual deposits
    if (payouts > deposits) {
      addActivity(
        "Warning: simulated payouts exceeded new virtual deposits.",
        "warning"
      );
    }

    // Save simulation data
    saveSimulation();
  }

  // Save data in browser storage
  function saveSimulation() {
    localStorage.setItem(
      "moneyChainSimulation",
      JSON.stringify(simulationData)
    );
  }

  // Reset simulation
  function resetSimulation() {
    simulationData.round = 0;
    simulationData.totalParticipants = 0;
    simulationData.totalDeposits = 0;
    simulationData.totalPayouts = 0;
    simulationData.totalBalance = 0;

    // Reset round information
    roundNumber.textContent = "0";
    roundParticipants.textContent = "0";
    roundDeposits.textContent = "V$0";
    roundPayouts.textContent = "V$0";
    roundBalance.textContent = "V$0";

    // Reset totals
    updateDisplay();

    // Clear activity log
    if (activityLog) {
      activityLog.innerHTML = `
        <div class="empty-state">
          <p>No simulation activity yet.</p>
          <span>Run your first round to see activity here.</span>
        </div>
      `;
    }

    // Clear saved data
    localStorage.removeItem("moneyChainSimulation");

    addActivity(
      "Simulation has been reset.",
      "warning"
    );
  }

  // Make resetSimulation available to app.js
  window.resetSimulation = resetSimulation;

  // Button events
  if (runRoundButton) {
    runRoundButton.addEventListener("click", runSimulationRound);
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      if (confirm("Reset the educational simulation?")) {
        resetSimulation();
      }
    });
  }

  // Load saved simulation
  const savedData = localStorage.getItem(
    "moneyChainSimulation"
  );

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      simulationData.round = parsedData.round || 0;
      simulationData.totalParticipants =
        parsedData.totalParticipants || 0;
      simulationData.totalDeposits =
        parsedData.totalDeposits || 0;
      simulationData.totalPayouts =
        parsedData.totalPayouts || 0;
      simulationData.totalBalance =
        parsedData.totalBalance || 0;

      updateDisplay();
    } catch (error) {
      console.error("Could not load saved simulation data:", error);
    }
  } else {
    updateDisplay();
  }
});