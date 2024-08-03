// Mock data for creatures and their values
const creatures = {
  "Adharcaiin": 500,
  "Barg": 600,
  "Carnifex": 800,
  "Druid": 1000,
  // Add other creatures with their values here
};

// Function to toggle the "Me" box content
function toggleMeBox() {
  const meContent = document.getElementById('meContent');
  meContent.style.display = meContent.style.display === 'none' ? 'block' : 'none';
}

// Function to toggle the "Them" box content
function toggleThemBox() {
  const themContent = document.getElementById('themContent');
  themContent.style.display = themContent.style.display === 'none' ? 'block' : 'none';
}

// Function to calculate the values and display the result
function calculateValue() {
  const meCreatureName = document.getElementById('meCreature').value;
  const meMush = parseInt(document.getElementById('meMush').value) || 0;

  const themCreatureName = document.getElementById('themCreature').value;
  const themMush = parseInt(document.getElementById('themMush').value) || 0;

  const meCreatureValue = creatures[meCreatureName] || 0;
  const themCreatureValue = creatures[themCreatureName] || 0;

  const meValue = meCreatureValue + meMush;
  const themValue = themCreatureValue + themMush;

  const resultText = document.getElementById('resultText');
  const loading = document.getElementById('loading');

  loading.style.display = 'block';
  resultText.style.display = 'none';

  setTimeout(() => {
    loading.style.display = 'none';
    resultText.style.display = 'block';

    const valueDifference = meValue - themValue;

    if (valueDifference > 0) {
      resultText.textContent = `You win! You gain ${valueDifference} value.`;
    } else if (valueDifference < 0) {
      resultText.textContent = `You lose! You lose ${Math.abs(valueDifference)} value.`;
    } else {
      resultText.textContent = 'It\'s a tie!';
    }
  }, 1000);
}

// Function to populate the creature select elements with options
function populateCreatures() {
  const creatureOptions = Object.keys(creatures).map(creatureName => `<option value="${creatureName}">${creatureName}</option>`).join('');
  document.getElementById('meCreature').innerHTML += creatureOptions;
  document.getElementById('themCreature').innerHTML += creatureOptions;
}

// Function to filter creatures based on search input
function filterCreatures(type) {
  const searchInput = document.getElementById(`${type}Search`).value.toLowerCase();
  const selectElement = document.getElementById(`${type}Creature`);
  const options = Object.keys(creatures).filter(creatureName => creatureName.toLowerCase().includes(searchInput));

  selectElement.innerHTML = `<option value="">Select Creature</option>`;
  options.forEach(creatureName => {
    selectElement.innerHTML += `<option value="${creatureName}">${creatureName}</option>`;
  });
}

// Initialize the options on page load
window.onload = populateCreatures;