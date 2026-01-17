  const apiUrl = 'https://owbbk.onrender.com';
 // const apiUrl = 'https://api.onlinewithbeta.name.ng';
  // const apiUrl = 'http://localhost:2025';
  
  function setCookie(cname, cvalue, exdays = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  /*
  async functions

  buy data//airtime 

  history

  plans


  fund




  */
  
  async function request(method, body, path) {
    try {
      const apikey = getCookie('apikey') || 23;
      const baseUrl = apiUrl;
      const url = baseUrl + path;
      
      const options = {
        method: method,
        headers: {
          'apikey': `${apikey}`,
          'Content-Type': 'application/json'
        }
      };
      
      if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        options.body = JSON.stringify(body);
      }
      
      const response = await fetch(url, options);
      let data = await response.json();
      
      if (response.status !== 200 && response.status !== 201) throw new Error(data.message)
      
      return data
    } catch (error) {
      let msg = error.message;
      if (msg === 'failed to fetch') msg = 'Bad internet connection.'
      throw new Error(msg)
    }
  }
  
  
  let apikey = getCookie('apikey')
  
  if (!apikey.includes('OWB')) {
    showAlert('warning', 'Please signin');
    
   window.location.href = 'https://onlinewithbeta.name.ng';
  }
  // Sample transaction data
  /*
  const transactions = [
  {
   'Date': 'April 3, 2025',
   'time': '04:36:24 PM',
   id: 'Data_12345678900',
   status: 'pending',
   action: 'Purchased 5GB MTN Data for +2349117624342',
   cost: '#0',
   old_balance: '#7000',
   new_balance: '#6500'
  },

  {
   'Date': 'April 2, 2025',
   'time': '10:15:30 AM',
   id: 'Airtime_12345678901',
   status: 'success',
   action: 'Purchased Airtime for +2348023456789',
   cost: '#1000',
   old_balance: '#8000',
   new_balance: '#7000'
  },
  {
   'Date': 'April 1, 2025',
   'time': '02:45:12 PM',
   id: 'funding_12345678906',
   status: 'success',
   action: 'Wallet Funding via Bank Transfer',
   cost: '#5000',
   old_balance: '#3000',
   new_balance: '#8000'
  },
  {
   'Date': 'March 30, 2025',
   'time': '09:20:45 AM',
   id: 'Data_12345678902',
   status: 'failed',
   action: 'Purchased 2GB Airtel Data for +2347034567890',
   cost: '#1200',
   old_balance: '#4200',
   new_balance: '#4200'
  },
  {
   'Date': 'March 28, 2025',
   'time': '05:10:33 PM',
   id: 'Airtime_12345678903',
   status: 'success',
   action: 'Purchased Airtime for +2349056781234',
   cost: '#500',
   old_balance: '#4700',
   new_balance: '#4200'
  },
  {
   'Date': 'March 25, 2025',
   'time': '11:05:22 AM',
   id: 'Data_12345678904',
   status: 'success',
   action: 'Purchased 1GB Glo Data for +2348167890123',
   cost: '#600',
   old_balance: '#5300',
   new_balance: '#4700'
  },
  {
   'Date': 'March 22, 2025',
   'time': '03:40:15 PM',
   id: 'Airtime_12345678905',
   status: 'pending',
   action: 'Purchased Airtime for +2348078901234',
   cost: '#1500',
   old_balance: '#6800',
   new_balance: '#5300'
  }];
  */
  
  
  let transactions = [];
  
  //Function for balance 
  async function getBalance() {
    try {
      let balRes = await request('GET', null, '/v1/fund/balance')
      console.log(balRes)
      
      return displayFund(balRes)
      
      
    } catch (e) {
      console.log(e)
    }
    
  }
  
  function displayFund(bal) {
    document.getElementById('walletBalance').innerText = `₦${bal}`;
  }
  // Function to show transactions
  async function showTransactions(filter = 'all') {
    try {
      if (filter === 'all') transactions = await request('GET', null, '/v1/buy/history');
      
      const transactionList = document.getElementById('transactionList');
      transactionList.innerHTML = '';
      
      // Filter transactions
      const filteredTransactions = filter === 'all' ?
        transactions :
        transactions.filter(t => t.status === filter);
      
      if (filteredTransactions.length === 0) {
        transactionList.innerHTML = '<div class="no-transactions">No transactions found</div>';
        return;
      }
      
      // Create transaction items
      filteredTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transactionItem';
        
        // Determine status class
        let statusClass = '';
        if (transaction.status === 'pending') statusClass = 'status-pending';
        if (transaction.status === 'success') statusClass = 'status-success';
        if (transaction.status === 'failed') statusClass = 'status-failed';
        
        transactionItem.innerHTML = `
      <div class="transactionInfo">
        <div class="transactionAction">${transaction.description}</div>
        <div class="transactionMeta">
          <span>${transaction.date.start}</span>
          <span>.</span>
          <span class="transactionId">${transaction.id}</span>
        </div>
      </div>
      <div class="transactionDetails">
        <div class="transactionCost">${transaction.cost}</div>
        <div class="transactionBalance">${transaction.old_balance} → ${transaction.new_balance}</div>
        <div class="transactionStatus ${statusClass}">${transaction.status}</div>
      </div>
    `;
        
        transactionList.appendChild(transactionItem);
      });
    } catch (e) {
      console.log(e.message)
      showAlert('warning', e.message);
    }
  }
  
  // Theme toggle functionality
  const themeSwitch = document.getElementById('themeSwitch');
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the saved theme on page load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeSwitch.checked = true;
  }
  
  // Theme toggle event listener
  themeToggle.addEventListener('click', function(e) {
    // Don't toggle if the click was on the switch itself (it has its own handler)
    if (e.target !== themeSwitch && !e.target.classList.contains('toggle-slider')) {
      themeSwitch.checked = !themeSwitch.checked;
      toggleTheme();
    }
  });
  
  // Switch change event
  themeSwitch.addEventListener('change', toggleTheme);
  
  function toggleTheme() {
    if (themeSwitch.checked) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
  // Data plans for different networks
  let dataPlans = {
    mtn: [
    {
      "networkId": 1,
      "network": "mtn",
      "data": "500mb",
      "price": 480,
      "days": 7,
      "id": 104,
      "type": "sme"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "500mb",
      "price": 480,
      "days": 7,
      "id": 89,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "1GB",
      "price": 600,
      "days": 7,
      "id": 103,
      "type": "sme"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "1GB",
      "price": 900,
      "days": 7,
      "id": 56,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "1.2GB",
      "price": 850,
      "days": 7,
      "id": 57,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "1GB",
      "price": 650,
      "days": 30,
      "id": 2,
      "type": "CG"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "2GB",
      "price": 1250,
      "days": 30,
      "id": 3,
      "type": "CG"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "2GB",
      "price": 1600,
      "days": 30,
      "id": 66,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "2.4GB",
      "price": 2100,
      "days": 30,
      "id": 67,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "3GB",
      "price": 1750,
      "days": 30,
      "id": 4,
      "type": "CG"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "3.2GB",
      "price": 1150,
      "days": 2,
      "id": 88,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "3.5GB",
      "price": 2600,
      "days": 30,
      "id": 68,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "5GB",
      "price": 2700,
      "days": 30,
      "id": 90,
      "type": "CG"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "6.75GB",
      "price": 3250,
      "days": 30,
      "id": 86,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "7GB",
      "price": 3700,
      "days": 7,
      "id": 54,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "10GB",
      "price": 4700,
      "days": 30,
      "id": 69,
      "type": "gifting"
    },
    {
      "networkId": 1,
      "network": "mtn",
      "data": "11GB",
      "price": 3680,
      "days": 7,
      "id": 74,
      "type": "gifting"
    }],
    
    airtel: [
    {
      "networkId": 2,
      "network": "airtel",
      "data": "600mb",
      "price": 500,
      "days": 2,
      "id": 92,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "600mb",
      "price": 550,
      "days": 2,
      "id": 107,
      "type": "CG"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "1GB",
      "price": 600,
      "days": 1,
      "id": 76,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "1GB",
      "price": 600,
      "days": 1,
      "id": 106,
      "type": "CG"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "1.5GB",
      "price": 490,
      "days": 1,
      "id": 77,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "2GB",
      "price": 580,
      "days": 1,
      "id": 110,
      "type": "CG"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "2GB",
      "price": 560,
      "days": 2,
      "id": 76,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "3GB",
      "price": 745,
      "days": 2,
      "id": 74,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "3.2GB",
      "price": 800,
      "days": 3,
      "id": 115,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "4GB",
      "price": 2800,
      "days": 30,
      "id": 114,
      "type": "CG"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "10GB",
      "price": 3600,
      "days": 30,
      "id": 105,
      "type": "CG"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "6.5GB",
      "price": 2000,
      "days": 7,
      "id": 116,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "10GB",
      "price": 3550,
      "days": 30,
      "id": 47,
      "type": "gifting"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "500mb",
      "price": 600,
      "days": 7,
      "id": 61,
      "type": "SME"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "1GB",
      "price": 650,
      "days": 7,
      "id": 62,
      "type": "SME"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "1GB",
      "price": 970,
      "days": 7,
      "id": 109,
      "type": "CG"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "2GB",
      "price": 1650,
      "days": 30,
      "id": 63,
      "type": "SME"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "2GB",
      "price": 1650,
      "days": 30,
      "id": 112,
      "type": "CG"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "3GB",
      "price": 2150,
      "days": 30,
      "id": 84,
      "type": "SME"
    },
    {
      "networkId": 2,
      "network": "airtel",
      "data": "4GB",
      "price": 1000,
      "days": 2,
      "id": 111,
      "type": "CG"
    }],
    
    glo: [
    {
      "networkId": 3,
      "network": "glo",
      "data": "500mb",
      "price": 249,
      "days": 14,
      "id": 93,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "0.5GB",
      "price": 249,
      "days": 30,
      "id": 12,
      "type": "CG"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "1GB",
      "price": 279,
      "days": 3,
      "id": 95,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "1GB",
      "price": 320,
      "days": 7,
      "id": 96,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "1GB",
      "price": 330,
      "days": 14,
      "id": 94,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "1GB",
      "price": 460,
      "days": 30,
      "id": 13,
      "type": "CG"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "2GB",
      "price": 900,
      "days": 30,
      "id": 14,
      "type": "CG"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "3GB",
      "price": 850,
      "days": 3,
      "id": 97,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "3GB",
      "price": 1330,
      "days": 30,
      "id": 15,
      "type": "CG"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "3GB",
      "price": 970,
      "days": 7,
      "id": 96,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "3GB",
      "price": 1200,
      "days": 14,
      "id": 99,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "5GB",
      "price": 1640,
      "days": 7,
      "id": 100,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "5GB",
      "price": 1650,
      "days": 14,
      "id": 101,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "5GB",
      "price": 2300,
      "days": 30,
      "id": 16,
      "type": "CG"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "10GB",
      "price": 3300,
      "days": 14,
      "id": 102,
      "type": "SME"
    },
    {
      "networkId": 3,
      "network": "glo",
      "data": "10GB",
      "price": 4300,
      "days": 30,
      "id": 17,
      "type": "CG"
    }],
    
    "9mobile": [{
      "networkId": 4,
      "network": "9mobile",
      "data": null,
      "price": null,
      "days": null,
      "id": null
    }]
  };
  
  async function getPlans() {
    dataPlans = await request('GET', null, '/v1/buy/plans');
  }
  
  // Navigation functionality
  const menuToggle = document.getElementById('menuToggle');
  const sideNav = document.getElementById('sideNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  function toggleNav() {
    sideNav.classList.toggle('active');
    navBackdrop.classList.toggle('active');
  }
  
  menuToggle.addEventListener('click', toggleNav);
  mobileMenuBtn.addEventListener('click', toggleNav);
  navBackdrop.addEventListener('click', toggleNav);
  
  // Function to create data plans
  function createPlans(network, plans) {
    const plansList = document.getElementById('dataPlansList');
    plansList.innerHTML = '';
    
    plans.forEach(plan => {
      const planItem = document.createElement('div');
      planItem.className = 'plan-item';
      planItem.dataset.id = plan.id;
      planItem.innerHTML = `
        <div class="plan-details">
          <span class="plan-size">${plan.data}</span>
          <span class="plan-duration">${plan.days} days</span>
        </div>
        <div class="plan-price">₦${plan.price}</div>
      `;
      
      planItem.addEventListener('click', () => {
        selectDataPlan(network, plan);
      });
      
      plansList.appendChild(planItem);
    });
  }
  
  // Function to show data plans overlay
  function showDataPlans(network) {
    const overlay = document.getElementById('dataPlansOverlay');
    const title = document.getElementById('dataPlansTitle');
    
    // Capitalize network name for display
    const networkName = network.charAt(0).toUpperCase() + network.slice(1);
    title.textContent = `${networkName} Data Plans`;
    
    // Create and display plans
    createPlans(network, dataPlans[network]);
    
    // Show overlay
    overlay.style.display = 'block';
  }
  
  // Function to select a data plan
  function selectDataPlan(network, plan) {
    // Close data plans overlay
    document.getElementById('dataPlansOverlay').style.display = 'none';
    
    // Show data order overlay
    const overlay = document.getElementById('dataOrderOverlay');
    const title = document.getElementById('dataOrderTitle');
    const selectedPlan = document.getElementById('selectedPlan');
    
    // Capitalize network name for display
    const networkName = network.charAt(0).toUpperCase() + network.slice(1);
    title.textContent = `${networkName} Data Order`;
    selectedPlan.innerHTML = `${networkName} ${plan.data} Data @${plan.days}days - ₦${plan.price}`;
    
    // Store selected plan data
    selectedPlan.dataset.network = network;
    selectedPlan.dataset.planId = plan.id;
    selectedPlan.dataset.price = plan.price;
    
    // Show overlay
    overlay.style.display = 'block';
  }
  
  // Function to show airtime overlay
  function showAirtime(network) {
    const overlay = document.getElementById('airtimeOverlay');
    const title = document.getElementById('airtimeTitle');
    
    // Capitalize network name for display
    const networkName = network.charAt(0).toUpperCase() + network.slice(1);
    title.textContent = `${networkName} Airtime`;
    
    // Store network in overlay for later use
    overlay.dataset.network = network;
    
    // Show overlay
    overlay.style.display = 'block';
  }
  
  // Function to show fund wallet overlay
  function showFundWallet() {
    document.getElementById('fundWalletOverlay').style.display = 'block';
  }
  
  
  
  
  
  
  
  
  
  // Event listeners for action buttons
  document.querySelectorAll('.actionBtn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const network = this.dataset.network;
      const type = this.dataset.type;
      
      if (type === 'data') {
        showDataPlans(network);
      } else if (type === 'airtime') {
        showAirtime(network);
      }
    });
  });
  
  
  
  
  // Fund wallet button
  document.getElementById('fundWalletBtn').addEventListener('click', showFundWallet);
  
  // Show transactions button
  document.getElementById('showTransactions').addEventListener('click', function(e) {
    e.preventDefault();
    toggleNav()
    document.getElementById('transactionContainer').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Mobile transactions button
  document.getElementById('mobileTransactionsBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('transactionContainer').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Transaction filter buttons
  document.querySelectorAll('.filterBtn').forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      document.querySelectorAll('.filterBtn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter transactions
      const filter = this.dataset.filter;
      showTransactions(filter);
    });
  });
  
  // Close button event listeners
  document.getElementById('closeDataPlans').addEventListener('click', function() {
    document.getElementById('dataPlansOverlay').style.display = 'none';
  });
  
  document.getElementById('closeAirtime').addEventListener('click', function() {
    document.getElementById('airtimeOverlay').style.display = 'none';
  });
  
  document.getElementById('closeDataOrder').addEventListener('click', function() {
    document.getElementById('dataOrderOverlay').style.display = 'none';
  });
  
  document.getElementById('closeFundWallet').addEventListener('click', function() {
    document.getElementById('fundWalletOverlay').style.display = 'none';
  });
  
  // Cancel button event listeners
  document.getElementById('cancelAirtimeBtn').addEventListener('click', function() {
    document.getElementById('airtimeOverlay').style.display = 'none';
  });
  
  document.getElementById('cancelDataBtn').addEventListener('click', function() {
    document.getElementById('dataOrderOverlay').style.display = 'none';
  });
  
  document.getElementById('cancelFundWallet').addEventListener('click', function() {
    document.getElementById('fundWalletOverlay').style.display = 'none';
  });
  
  document.getElementById('closeContact').addEventListener('click', function() {
    document.getElementById('contactOverlay').style.display = 'none';
  });
  
  document.getElementById('showContact').addEventListener('click', function() {
    document.getElementById('contactOverlay').style.display = 'block';
  });
  
  
  
  
  
  
  
  
  
  
  // Buy button event listeners
  document.getElementById('buyAirtimeBtn').addEventListener('click', async function() {
    let buyAirtimeLoading = showLoading('Airtime Purchase')
    const amount = document.getElementById('airtimeAmount').value;
    const phone = document.getElementById('airtimePhone').value;
    const network = document.getElementById('airtimeOverlay').dataset.network;
    
    updateLoading(buyAirtimeLoading, 'message', 'Validating input')
    if (!amount || amount < 100) {
      showAlert('warning', 'Please enter a valid amount (minimum ₦100)');
      updateLoading(buyAirtimeLoading, 'error', 'Please enter a valid amount (minimum ₦50)')
      hideLoading(buyAirtimeLoading)
      return;
    }
    
    updateLoading(buyAirtimeLoading, 'message', 'Validating phone number')
    if (!phone || phone.length !== 10) {
      showAlert('warning', 'Please enter a valid 10-digit phone number');
      hideLoading(buyAirtimeLoading)
      return;
    }
    if (phone[0] === '0') {
      showAlert('warning', 'The phone number should not start with 0!');
      hideLoading(buyAirtimeLoading)
      return;
    }
    
    
    hideLoading(buyAirtimeLoading, 1500)
    // In a real app, you would process the payment here
    showAlert('confirm', `Processing ${network} airtime purchase:\nAmount: ₦${amount}\nPhone: +234${phone}`, async () => {
      console.log({
        network,
        amount,
        phone
      })
      
      try {
        buyAirtimeLoading = showLoading('Airtime Purchase')
        
        let buyRes = await request('POST', {
            network: network,
            amount: amount,
            phone: phone,
          },
          '/v1/buy/airtime'
        );
        console.log(buyRes)
        hideLoading(buyAirtimeLoading)
        showAlert('success', buyRes.message)
      } catch (e) {
        hideLoading(buyAirtimeLoading)
        console.log(e.message)
        showAlert('warning', e.message)
      }
      
      
      
      
    });
    
    
    
    // Close overlay
    document.getElementById('airtimeOverlay').style.display = 'none';
    
    // Reset form
    document.getElementById('airtimeAmount').value = '';
    document.getElementById('airtimePhone').value = '';
  });
  
  document.getElementById('buyDataBtn').addEventListener('click', async function() {
    let buyDataLoading = showLoading('Purchasing data');
    
    const phone = document.getElementById('dataPhone').value;
    const selectedPlan = document.getElementById('selectedPlan');
    const network = selectedPlan.dataset.network;
    const price = selectedPlan.dataset.price;
    const planId = selectedPlan.dataset.planId;
    
    updateLoading(buyDataLoading, 'message', 'validating phone number.')
    if (!phone || phone.length !== 10) {
      showAlert('warning', 'Please enter a valid 10-digit phone number');
      hideLoading(buyDataLoading)
      return;
    }
    if (phone[0] === '0') {
      showAlert('warning', 'The phone number should not start with 0!');
      hideLoading(buyDataLoading)
      return;
    }
    updateLoading(buyDataLoading, 'message', 'Purchasing data')
    
    // In a real app, you would process the payment here
    showAlert('confirm', `Processing ${network} data purchase:\nPlan: ${selectedPlan.textContent}\nPhone: +234${phone}`, async () => {
      console.log({ network, planId, phone })
      buyDataLoading = showLoading('Purchasing data', true);
      
      try {
        let buyRes = await request('POST', {
            network: network,
            planId: Number(planId),
            phone: phone,
          },
          '/v1/buy/data'
        );
        console.log(buyRes)
        showAlert('success', buyRes.message)
        hideLoading(buyDataLoading)
      } catch (e) {
        hideLoading(buyDataLoading)
        console.log(e.message)
        showAlert('warning', e.message)
      }
      
      hideLoading(buyDataLoading)
      
    });
    
    hideLoading(buyDataLoading)
    
    
    // Close overlay
    document.getElementById('dataOrderOverlay').style.display = 'none';
    
    // Reset form
    document.getElementById('dataPhone').value = '';
  });
  
  
  
  
  // Fund wallet proceed button
  document.getElementById('proceedFundWallet').addEventListener('click', async function() {
    let proceedFundWalletLoader = showLoading('Funding Wallet');
    
    const amount = document.getElementById('fundAmount').value;
    
    updateLoading(proceedFundWalletLoader, 'message', 'validating amount');
    if (!amount || amount < 100) {
      showAlert('warning', 'Please enter a valid amount (minimum ₦100)');
      hideLoading(proceedFundWalletLoader, 1200)
      return;
    }
    
    // In a real app, you would process the payment here
    showAlert('confirm', `Process wallet funding:\nAmount: ₦${amount}`, async () => {
      let getFundLink = showLoading('Funding Wallet');
      
      //tryit
      try {
        fundRes = await request('POST', {
            amount: amount,
          },
          '/v1/fund'
        );
        console.log('fundRes')
        console.log(fundRes)
        console.log('fundRes')
        
        if (!fundRes.success) throw new Error('Unable to fund wallet')
        
        showAlert('confirm', 'Continue to pay', () => {
          let redirect = showLoading('Getting Account numbers');
          
          let url = fundRes.data.data.authorization_url;
          console.log(url);
          window.location.href = url;
        });
        hideLoading(getFundLink)
        
      } catch (e) {
        hideLoading(getFundLink)
        console.log(e.message)
        showAlert('warning', e.message)
      }
      
      hideLoading(proceedFundWalletLoader)
      
      
    });
    
    
    hideLoading(proceedFundWalletLoader, 1200)
    
    // Close overlay
    document.getElementById('fundWalletOverlay').style.display = 'none';
    
    // Reset form
    document.getElementById('fundAmount').value = '';
  });
  
  
  
  
  
  // Payment method selection
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
      document.querySelectorAll('.payment-method').forEach(m => {
        m.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  
  
  // Close overlays when clicking outside content
  window.addEventListener('click', function(e) {
    const dataPlansOverlay = document.getElementById('dataPlansOverlay');
    const airtimeOverlay = document.getElementById('airtimeOverlay');
    const dataOrderOverlay = document.getElementById('dataOrderOverlay');
    const fundWalletOverlay = document.getElementById('fundWalletOverlay');
    const contactOverlay = document.getElementById('contactOverlay');
    
    if (e.target === dataPlansOverlay) {
      dataPlansOverlay.style.display = 'none';
    }
    
    if (e.target === airtimeOverlay) {
      airtimeOverlay.style.display = 'none';
    }
    
    if (e.target === dataOrderOverlay) {
      dataOrderOverlay.style.display = 'none';
    }
    
    if (e.target === fundWalletOverlay) {
      fundWalletOverlay.style.display = 'none';
    }
    if (e.target === contactOverlay) {
      contactOverlay.style.display = 'none';
    }
  });
  
  
  
  
  
  
  
  
  // Custom alert function
  function showAlert(kind, message, okFunction = null, showCancel = false) {
    // Validate kind parameter
    const validKinds = ['info', 'success', 'warning', 'confirm', 'follow'];
    if (!validKinds.includes(kind)) {
      console.error('Invalid alert kind. Must be one of: info, success, warning, confirm, follow');
      return Promise.reject('Invalid alert kind');
    }
    
    // Return a Promise that resolves when user clicks OK or rejects when canceled
    return new Promise((resolve, reject) => {
      // Create alert overlay
      const alertOverlay = document.createElement('div');
      alertOverlay.className = 'alert-overlay';
      
      // Create alert box
      const alertBox = document.createElement('div');
      alertBox.className = `alert-box alert-${kind}`;
      
      // Set alert content based on kind
      let title, iconClass, showCancelBtn;
      
      switch (kind) {
        case 'info':
          title = 'Information';
          iconClass = 'fas fa-info';
          showCancelBtn = false;
          break;
        case 'success':
          title = 'Success';
          iconClass = 'fas fa-check';
          showCancelBtn = false;
          break;
        case 'warning':
          title = 'Warning';
          iconClass = 'fas fa-exclamation-triangle';
          showCancelBtn = showCancel || false;
          break;
        case 'confirm':
          title = 'Confirmation';
          iconClass = 'fas fa-question';
          showCancelBtn = true;
          break;
        case 'follow':
          title = 'Action Required';
          iconClass = 'fas fa-exclamation';
          showCancelBtn = false;
          break;
      }
      
      // Build alert HTML
      alertBox.innerHTML = `
            <div class="alert-header">
                <div class="alert-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="alert-title">${title}</div>
            </div>
            <div class="alert-body">
                <div class="alert-message">${message}</div>
            </div>
            <div class="alert-footer">
                ${showCancelBtn ? '<button class="alert-btn alert-btn-cancel">Cancel</button>' : ''}
                <button class="alert-btn alert-btn-ok">${kind === 'follow' ? 'Continue' : 'OK'}</button>
            </div>
        `;
      
      // Add to overlay
      alertOverlay.appendChild(alertBox);
      
      // Add to alert container
      const alertContainer = document.getElementById('alertContainer');
      alertContainer.appendChild(alertOverlay);
      
      // Set up event listeners
      const okButton = alertBox.querySelector('.alert-btn-ok');
      const cancelButton = alertBox.querySelector('.alert-btn-cancel');
      
      // Close alert function
      const closeAlert = (overlay) => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      };
      
      // OK button handler
      okButton.addEventListener('click', function() {
        if (okFunction && typeof okFunction === 'function') {
          okFunction();
        }
        closeAlert(alertOverlay);
        resolve('confirmed'); // Resolve the promise
      });
      
      // Cancel button handler
      if (cancelButton) {
        cancelButton.addEventListener('click', function() {
          closeAlert(alertOverlay);
          reject('cancelled'); // Reject the promise when canceled
        });
      }
      
      // Close on overlay click (outside the alert box)
      alertOverlay.addEventListener('click', function(e) {
        if (e.target === alertOverlay) {
          closeAlert(alertOverlay);
          reject('cancelled'); // Reject when clicking outside
        }
      });
      
      // Close on Escape key
      const escapeHandler = function(e) {
        if (e.key === 'Escape') {
          closeAlert(alertOverlay);
          document.removeEventListener('keydown', escapeHandler);
          reject('cancelled'); // Reject when Escape pressed
        }
      };
      document.addEventListener('keydown', escapeHandler);
      
      // Clean up event listener when alert is closed
      alertOverlay.addEventListener('close', function() {
        document.removeEventListener('keydown', escapeHandler);
      });
    });
  }
  
  // Function to close alert
  function closeAlert(alertElement) {
    alertElement.style.opacity = '0';
    alertElement.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      if (alertElement.parentNode) {
        alertElement.parentNode.removeChild(alertElement);
      }
    }, 300);
  }
  
  
  
  
  
  //Loading 
  // Loading component function
  function showLoading(message = 'Loading...', showProgress = false, size = 'default') {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    
    // Create loading container
    const loadingContainer = document.createElement('div');
    loadingContainer.className = `loading-container ${size === 'small' ? 'loading-small' : ''}`;
    
    // Build loading HTML
    loadingContainer.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <div class="loading-content">
          <div class="loading-title">Please wait</div>
          <div class="loading-message">${message}<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span></div>
        </div>
        ${showProgress ? `
          <div class="loading-progress">
            <div class="loading-progress-bar"></div>
          </div>
        ` : ''}
      `;
    
    // Add to overlay
    loadingOverlay.appendChild(loadingContainer);
    
    // Add to loading container
    const mainLoadingContainer = document.getElementById('loadingContainer');
    mainLoadingContainer.appendChild(loadingOverlay);
    
    // Return the loading element for later manipulation
    return loadingOverlay;
  }
  
  // Function to update loading state
  function updateLoading(loadingElement, state, message = null) {
    const spinner = loadingElement.querySelector('.loading-spinner');
    const messageEl = loadingElement.querySelector('.loading-message');
    
    // Remove existing state classes
    spinner.classList.remove('loading-success', 'loading-error');
    
    // Apply new state
    if (state === 'success') {
      spinner.classList.add('loading-success');
      if (message) messageEl.innerHTML = message;
    } else if (state === 'error') {
      spinner.classList.add('loading-error');
      if (message) messageEl.innerHTML = message;
    } else if (state === 'message' && message) {
      messageEl.innerHTML = message;
    }
  }
  
  // Function to hide loading
  function hideLoading(loadingElement, delay = 0) {
    setTimeout(() => {
      loadingElement.style.opacity = '0';
      loadingElement.style.transform = 'scale(0.9)';
      
      setTimeout(() => {
        if (loadingElement.parentNode) {
          loadingElement.parentNode.removeChild(loadingElement);
        }
      }, 300);
    }, delay);
  }
  
  
  // Initialize transactions on page load
  document.addEventListener('DOMContentLoaded', async function() {
    try {
      
      await showTransactions();
      
      await getPlans();
      await getBalance();
      
    } catch (e) {
      showAlert('warning', e.message)
    }
    
  });
  
  async function wakeApi() {
    //wake api
    let readyRes = await fetch(apiUrl)
    console.log(readyRes)
    if (readyRes.status !== 200) throw new Error("Please try again")
  }
  wakeApi()