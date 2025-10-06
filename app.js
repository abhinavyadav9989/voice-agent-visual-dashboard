// Application data
const applicationData = {
  campaign_overview: {
    total_calls: 5000,
    call_duration_minutes: 5,
    total_minutes: 25000,
    language: "Telugu",
    total_cost_usd: 555.56,
    total_cost_inr: 46268,
    cost_per_call_usd: 0.111,
    cost_per_call_inr: 9.25
  },
  cost_breakdown: {
    deepgram_flux_stt: {
      cost: 192.50,
      percentage: 34.8,
      color: "#2563eb",
      description: "Advanced STT with interruption handling",
      pricing: "$0.0077 per minute",
      features: ["Real-time processing", "Turn detection", "Conversational intelligence"]
    },
    plivo_calls: {
      cost: 222.00,
      percentage: 40.1,
      color: "#dc2626",
      description: "Voice calls via Plivo India",
      pricing: "₹0.74 per minute",
      features: ["High-quality voice", "India coverage", "Reliable connectivity"]
    },
    infrastructure: {
      cost: 100.00,
      percentage: 18.1,
      color: "#6b7280",
      description: "Server hosting and management",
      pricing: "$100 monthly allocation",
      features: ["Cloud hosting", "Auto-scaling", "24/7 monitoring"]
    },
    openai_tts: {
      cost: 37.50,
      percentage: 6.8,
      color: "#059669",
      description: "Telugu text-to-speech synthesis",
      pricing: "$0.015 per 1K characters",
      features: ["Natural voices", "Telugu support", "High quality audio"]
    },
    gpt5_nano: {
      cost: 3.56,
      percentage: 0.6,
      color: "#ea580c",
      description: "AI conversation processing",
      pricing: "$0.05 input + $0.40 output per 1M tokens",
      features: ["Superior Telugu understanding", "Fast responses", "Cost-efficient"]
    }
  },
  competitive_analysis: {
    "Our Solution": {
      cost_per_call: 0.111,
      setup_time: "4-6 weeks",
      tech_requirements: "High",
      telugu_quality: 5,
      customization: 5,
      support: 2,
      features: 5,
      color: "#059669"
    },
    "Retell AI": {
      cost_per_call: 0.375,
      setup_time: "1-2 days",
      tech_requirements: "Low",
      telugu_quality: 4,
      customization: 3,
      support: 4,
      features: 4,
      color: "#3b82f6"
    },
    "Vapi AI": {
      cost_per_call: 1.500,
      setup_time: "2-4 weeks",
      tech_requirements: "Very High",
      telugu_quality: 4,
      customization: 5,
      support: 2,
      features: 5,
      color: "#8b5cf6"
    },
    "Azure AI": {
      cost_per_call: 0.160,
      setup_time: "2-3 weeks",
      tech_requirements: "High",
      telugu_quality: 4,
      customization: 4,
      support: 5,
      features: 4,
      color: "#0ea5e9"
    },
    "Synthflow AI": {
      cost_per_call: 0.690,
      setup_time: "1 day",
      tech_requirements: "None",
      telugu_quality: 4,
      customization: 2,
      support: 5,
      features: 3,
      color: "#f59e0b"
    },
    "ElevenLabs": {
      cost_per_call: 0.350,
      setup_time: "1-2 weeks",
      tech_requirements: "Medium",
      telugu_quality: 5,
      customization: 3,
      support: 3,
      features: 3,
      color: "#ef4444"
    }
  },
  savings_analysis: {
    vs_competitors: {
      "Retell AI": { absolute: 1319.44, percentage: 70.4 },
      "Vapi AI": { absolute: 6944.44, percentage: 92.6 },
      "Azure AI": { absolute: 244.44, percentage: 30.5 },
      "Synthflow AI": { absolute: 3194.44, percentage: 82.6 },
      "ElevenLabs": { absolute: 1194.44, percentage: 68.2 }
    },
    annual_projection: {
      our_solution: 6667,
      retell_ai: 22500,
      vapi_ai: 90000,
      human_agents: 46000,
      savings_vs_human: 39333,
      savings_percentage: 85.5
    }
  },
  feature_matrix: {
    categories: ["Telugu Support", "Real-time Processing", "Interruption Handling", "Voice Quality", "Customization", "Scalability", "Cost Efficiency", "Setup Speed"],
    "Our Solution": [5, 5, 5, 4, 5, 5, 5, 2],
    "Retell AI": [4, 5, 4, 4, 3, 4, 3, 5],
    "Vapi AI": [4, 5, 3, 4, 5, 4, 1, 2],
    "Azure AI": [4, 5, 4, 4, 4, 5, 4, 3],
    "Synthflow AI": [4, 4, 3, 3, 2, 3, 2, 5],
    "ElevenLabs": [5, 4, 3, 5, 3, 3, 3, 4]
  }
};

// Global variables
let currentCalls = 5000;
let currentDuration = 5.0;
let costBreakdownChart = null;
let competitionChart = null;
let roiChart = null;
let currentCurrency = 'USD';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeCurrency();
  initializeCalculator();
  updateMetrics();
  generateComponents();
  generateFeatureMatrix();
  initializeCharts();
  
  // Event listeners
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  const currencyBtn = document.getElementById('currencyToggle');
  if (currencyBtn) currencyBtn.addEventListener('click', toggleCurrency);
  document.getElementById('callsSlider').addEventListener('input', handleSliderChange);
  document.getElementById('durationSlider').addEventListener('input', handleSliderChange);
});

// Theme management
function initializeTheme() {
  const savedTheme = getComputedStyle(document.documentElement).getPropertyValue('--color-background').includes('252, 252, 249') ? 'light' : 'dark';
  updateThemeIcon(savedTheme);
}

// Currency management
function initializeCurrency() {
  const label = document.querySelector('.currency-label');
  if (label) label.textContent = currentCurrency;
}

function toggleCurrency() {
  currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
  const label = document.querySelector('.currency-label');
  if (label) label.textContent = currentCurrency;
  updateMetrics();
  updateAllCharts();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  updateThemeIcon(newTheme);
  
  // Update charts with new theme
  setTimeout(() => {
    updateAllCharts();
  }, 100);
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Calculator functionality
function initializeCalculator() {
  const callsSlider = document.getElementById('callsSlider');
  const durationSlider = document.getElementById('durationSlider');
  
  updateSliderDisplay();
}

function handleSliderChange() {
  const callsSlider = document.getElementById('callsSlider');
  const durationSlider = document.getElementById('durationSlider');
  
  currentCalls = parseInt(callsSlider.value);
  currentDuration = parseFloat(durationSlider.value);
  
  updateSliderDisplay();
  updateMetrics();
  updateAllCharts();
}

function updateSliderDisplay() {
  document.getElementById('callsValue').textContent = formatNumber(currentCalls);
  document.getElementById('durationValue').textContent = currentDuration.toFixed(1);
}

// Metrics calculation and updates
function calculateCosts() {
  const baseCalls = applicationData.campaign_overview.total_calls;
  const baseDuration = applicationData.campaign_overview.call_duration_minutes;
  const baseCost = applicationData.campaign_overview.total_cost_usd;
  
  // Scale costs based on current inputs
  const callsRatio = currentCalls / baseCalls;
  const durationRatio = currentDuration / baseDuration;
  const totalRatio = callsRatio * durationRatio;
  
  const scaledCost = baseCost * totalRatio;
  const costPerCall = scaledCost / currentCalls;
  
  return {
    totalCost: scaledCost,
    costPerCall: costPerCall,
    breakdown: scaleBreakdown(totalRatio)
  };
}

function scaleBreakdown(ratio) {
  const breakdown = {};
  for (const [key, value] of Object.entries(applicationData.cost_breakdown)) {
    breakdown[key] = {
      ...value,
      cost: value.cost * ratio
    };
  }
  return breakdown;
}

function updateMetrics() {
  const costs = calculateCosts();
  
  // Update hero metrics - including monthly calls
  document.getElementById('totalCost').textContent = formatMoneyFromUSD(costs.totalCost, 2);
  document.getElementById('costPerCall').textContent = formatMoneyFromUSD(costs.costPerCall, 3);
  document.getElementById('monthlyCalls').textContent = formatNumber(currentCalls);
  
  // Calculate savings percentages
  updateSavingsCards(costs.costPerCall);
}

function updateSavingsCards(ourCostPerCall) {
  const competitors = applicationData.competitive_analysis;
  const savingsCards = document.querySelectorAll('.savings-card');
  
  // Update specific savings cards based on current calculations
  const retellSavings = (competitors["Retell AI"].cost_per_call - ourCostPerCall) * currentCalls;
  const vapiSavings = (competitors["Vapi AI"].cost_per_call - ourCostPerCall) * currentCalls;
  const azureSavings = (competitors["Azure AI"].cost_per_call - ourCostPerCall) * currentCalls;
  
  // Estimated human agent cost per call ($8-10)
  const humanCostPerCall = 9.2;
  const humanSavings = (humanCostPerCall - ourCostPerCall) * currentCalls;
  
  if (savingsCards.length >= 4) {
    savingsCards[0].querySelector('.savings-amount').textContent = formatMoneyFromUSD(retellSavings, 0);
    savingsCards[1].querySelector('.savings-amount').textContent = formatMoneyFromUSD(vapiSavings, 0);
    savingsCards[2].querySelector('.savings-amount').textContent = formatMoneyFromUSD(azureSavings, 0);
    savingsCards[3].querySelector('.savings-amount').textContent = formatMoneyFromUSD(humanSavings, 0);
  }
}

// Component generation
function generateComponents() {
  const componentsGrid = document.getElementById('componentsGrid');
  const costs = calculateCosts();
  
  componentsGrid.innerHTML = '';
  
  for (const [key, component] of Object.entries(costs.breakdown)) {
    const componentCard = document.createElement('div');
    componentCard.className = 'component-card';
    componentCard.innerHTML = `
      <div class="component-header">
        <div class="component-title">${formatComponentName(key)}</div>
        <div class="component-cost">${formatMoneyFromUSD(component.cost, 2)}</div>
      </div>
      <div class="component-percentage">${component.percentage.toFixed(1)}% of total cost</div>
      <div class="component-description">${component.description}</div>
      <div class="component-pricing"><strong>Pricing:</strong> ${component.pricing}</div>
      <ul class="component-features">
        ${component.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    `;
    componentsGrid.appendChild(componentCard);
  }
}

function formatComponentName(key) {
  const names = {
    deepgram_flux_stt: 'Deepgram Flux STT',
    plivo_calls: 'Plivo Calls',
    infrastructure: 'Infrastructure',
    openai_tts: 'OpenAI TTS',
    gpt5_nano: 'GPT-5 Nano'
  };
  return names[key] || key;
}

// Feature matrix generation
function generateFeatureMatrix() {
  const matrixTable = document.getElementById('featureMatrix');
  const matrix = applicationData.feature_matrix;
  
  // Create header row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>Platform</th>' + 
    matrix.categories.map(cat => `<th>${cat}</th>`).join('');
  
  const thead = document.createElement('thead');
  thead.appendChild(headerRow);
  matrixTable.appendChild(thead);
  
  // Create body rows
  const tbody = document.createElement('tbody');
  
  for (const [platform, ratings] of Object.entries(matrix)) {
    if (platform === 'categories') continue;
    
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${platform}</strong></td>` + 
      ratings.map(rating => `<td><span class="rating-${rating}">${'★'.repeat(rating)}</span></td>`).join('');
    tbody.appendChild(row);
  }
  
  matrixTable.appendChild(tbody);
}

// Chart initialization and updates
function initializeCharts() {
  initializeCostBreakdownChart();
  initializeCompetitionChart();
  initializeROIChart();
}

function initializeCostBreakdownChart() {
  const ctx = document.getElementById('costBreakdownChart').getContext('2d');
  const costs = calculateCosts();
  
  const labels = Object.keys(costs.breakdown).map(key => formatComponentName(key));
  const data = Object.values(costs.breakdown).map(item => convertFromUSD(item.cost));
  const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
  
  costBreakdownChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: getChartBorderColor()
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: getChartTextColor(),
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${getCurrencySymbol()}${value.toFixed(2)} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

function initializeCompetitionChart() {
  const ctx = document.getElementById('competitionChart').getContext('2d');
  const competitors = applicationData.competitive_analysis;
  
  const labels = Object.keys(competitors);
  const data = labels.map(platform => convertFromUSD(competitors[platform].cost_per_call * currentCalls).toFixed(2));
  const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];
  
  competitionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: `Monthly Cost (${currentCurrency})`,
        data: data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const monthly = parseFloat(context.parsed.y);
              const perCall = monthly / currentCalls;
              return [`Monthly: ${getCurrencySymbol()}${monthly.toFixed(2)}`, `Per Call: ${getCurrencySymbol()}${perCall.toFixed(4)}`];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: getChartTextColor(),
            callback: function(value) {
              const locale = currentCurrency === 'USD' ? 'en-US' : 'en-IN';
              return getCurrencySymbol() + new Intl.NumberFormat(locale).format(value);
            }
          },
          grid: {
            color: getChartGridColor()
          }
        },
        x: {
          ticks: {
            color: getChartTextColor(),
            maxRotation: 45
          },
          grid: {
            color: getChartGridColor()
          }
        }
      }
    }
  });
}

function initializeROIChart() {
  const ctx = document.getElementById('roiChart').getContext('2d');
  
  const roiData = calculateROIData();
  
  roiChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [{
        label: 'Our Solution',
        data: roiData.ourSolution.map(convertFromUSD),
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: false,
        tension: 0.4
      }, {
        label: 'Retell AI',
        data: roiData.retellAI.map(convertFromUSD),
        borderColor: '#FFC185',
        backgroundColor: 'rgba(255, 193, 133, 0.1)',
        fill: false,
        tension: 0.4
      }, {
        label: 'Human Agents',
        data: roiData.humanAgents.map(convertFromUSD),
        borderColor: '#B4413C',
        backgroundColor: 'rgba(180, 65, 60, 0.1)',
        fill: false,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getChartTextColor(),
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${getCurrencySymbol()}${new Intl.NumberFormat(currentCurrency === 'USD' ? 'en-US' : 'en-IN').format(context.parsed.y)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: getChartTextColor(),
            callback: function(value) {
              const locale = currentCurrency === 'USD' ? 'en-US' : 'en-IN';
              return getCurrencySymbol() + new Intl.NumberFormat(locale).format(value);
            }
          },
          grid: {
            color: getChartGridColor()
          }
        },
        x: {
          ticks: {
            color: getChartTextColor()
          },
          grid: {
            color: getChartGridColor()
          }
        }
      }
    }
  });
}

function calculateROIData() {
  const costs = calculateCosts();
  const annualCost = costs.totalCost * 12;
  const retellAnnualCost = applicationData.competitive_analysis["Retell AI"].cost_per_call * currentCalls * 12;
  const humanAnnualCost = 9.2 * currentCalls * 12; // Estimated human agent cost
  
  return {
    ourSolution: [annualCost, annualCost * 2, annualCost * 3, annualCost * 4, annualCost * 5],
    retellAI: [retellAnnualCost, retellAnnualCost * 2, retellAnnualCost * 3, retellAnnualCost * 4, retellAnnualCost * 5],
    humanAgents: [humanAnnualCost, humanAnnualCost * 2, humanAnnualCost * 3, humanAnnualCost * 4, humanAnnualCost * 5]
  };
}

function updateAllCharts() {
  if (costBreakdownChart) updateCostBreakdownChart();
  if (competitionChart) updateCompetitionChart();
  if (roiChart) updateROIChart();
  generateComponents(); // Regenerate components with new costs
}

function updateCostBreakdownChart() {
  const costs = calculateCosts();
  const data = Object.values(costs.breakdown).map(item => convertFromUSD(item.cost));
  
  costBreakdownChart.data.datasets[0].data = data;
  costBreakdownChart.data.datasets[0].borderColor = getChartBorderColor();
  costBreakdownChart.options.plugins.legend.labels.color = getChartTextColor();
  costBreakdownChart.update('none');
}

function updateCompetitionChart() {
  const competitors = applicationData.competitive_analysis;
  const data = Object.keys(competitors).map(platform => 
    convertFromUSD(competitors[platform].cost_per_call * currentCalls).toFixed(2)
  );
  
  competitionChart.data.datasets[0].data = data;
  competitionChart.data.datasets[0].label = `Monthly Cost (${currentCurrency})`;
  competitionChart.options.scales.y.ticks.color = getChartTextColor();
  competitionChart.options.scales.x.ticks.color = getChartTextColor();
  competitionChart.options.scales.y.grid.color = getChartGridColor();
  competitionChart.options.scales.x.grid.color = getChartGridColor();
  competitionChart.update('none');
}

function updateROIChart() {
  const roiData = calculateROIData();
  
  roiChart.data.datasets[0].data = roiData.ourSolution.map(convertFromUSD);
  roiChart.data.datasets[1].data = roiData.retellAI.map(convertFromUSD);
  roiChart.data.datasets[2].data = roiData.humanAgents.map(convertFromUSD);
  roiChart.options.plugins.legend.labels.color = getChartTextColor();
  roiChart.options.scales.y.ticks.color = getChartTextColor();
  roiChart.options.scales.x.ticks.color = getChartTextColor();
  roiChart.options.scales.y.grid.color = getChartGridColor();
  roiChart.options.scales.x.grid.color = getChartGridColor();
  roiChart.update('none');
}

// Chart color utilities for theme support
function getChartTextColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
}

function getChartBorderColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim();
}

function getChartGridColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim();
}

// Utility functions
function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

function formatCurrency(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}

// Currency helpers
function getConversionRate() {
  return 88.77;
}

function getCurrencySymbol() {
  return currentCurrency === 'USD' ? '$' : '₹';
}

function convertFromUSD(value) {
  if (currentCurrency === 'USD') return value;
  return value * getConversionRate();
}

function formatMoneyFromUSD(valueUSD, fractionDigits = 2) {
  const value = convertFromUSD(valueUSD);
  const locale = currentCurrency === 'USD' ? 'en-US' : 'en-IN';
  return `${getCurrencySymbol()}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value)}`;
}

// Smooth scroll utility
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

// Animation utilities
function animateValue(element, start, end, duration = 1000) {
  const startTime = performance.now();
  const startValue = start;
  const endValue = end;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentValue = startValue + (endValue - startValue) * progress;
    element.textContent = formatNumber(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Initialize tooltips and interactive elements
function initializeInteractiveElements() {
  // Add hover effects for metric cards
  const metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add click handlers for navigation
  const heroButton = document.querySelector('.cta-button');
  if (heroButton) {
    heroButton.addEventListener('click', () => scrollToSection('calculator'));
  }
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize interactive elements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeInteractiveElements();
});