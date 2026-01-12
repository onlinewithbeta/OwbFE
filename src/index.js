  const apiUrl = 'https://api.onlinewithbeta.name.ng';
  //const apiUrl = 'http://localhost:2025';
  
  
  setCookie('apikey', false)
  
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
  /*
  request('POST', {
   username: 'beevr',
   gmail: 'bievr@gmail.com',
   phone: '9000000004',
   password: 'bFelievr2347',
  }, '/v1/auth/signup')

  */
  
  
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
    console.log("update")
  }
  
  getPlans();
  // Page navigation
  function showPage(pageId) {
    // Hide all pages
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('signin').style.display = 'none';
    document.getElementById('forgotPassword').style.display = 'none';
    document.getElementById('otpVerification').style.display = 'none';
    
    // Show selected page
    document.getElementById(pageId).style.display = 'flex';
    
    // Close mobile menu if open
    document.getElementById('mobileNav').classList.remove('active');
    
    // Load pricing if showing homepage
    if (pageId === 'homepage') {
      loadPricing('mtn');
    }
    
    // Start OTP timer if showing OTP page
    if (pageId === 'otpVerification') {
      startOtpTimer();
    }
  }
  
  // OTP Timer functionality
  let otpTimer;
  let timerSeconds = 60;
  
  function startOtpTimer() {
    clearInterval(otpTimer);
    timerSeconds = 60;
    updateTimerDisplay();
    
    otpTimer = setInterval(function() {
      timerSeconds--;
      updateTimerDisplay();
      
      if (timerSeconds <= 0) {
        clearInterval(otpTimer);
        document.getElementById('resendOtp').style.display = 'inline';
        document.getElementById('resendTimer').style.display = 'none';
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    const timerElement = document.getElementById('timerCount');
    if (timerElement) {
      timerElement.textContent = timerSeconds;
    }
  }
  
  // Load pricing data
  async function loadPricing(network) {
    //  await getPlans();
    const pricingGrid = document.getElementById('pricingGrid');
    pricingGrid.innerHTML = '';
    
    if (dataPlans[network]) {
      dataPlans[network].forEach(plan => {
        const planCard = document.createElement('div');
        planCard.className = 'planCard';
        planCard.innerHTML = `
      <div class="planSize">${plan.data}</div>
      <div class="planDuration">${plan.days} days</div>
      <div class="planPrice">₦${plan.price}</div>
      <button class="btn btn-primary" onclick="showPage('signup')">Buy Now</button>
     `;
        pricingGrid.appendChild(planCard);
      });
    }
  }
  
  // Mobile menu toggle
  document.getElementById('mobileMenuToggle').addEventListener('click', function() {
    document.getElementById('mobileNav').classList.toggle('active');
  });
  
  // Password visibility toggle
  function setupPasswordToggle(passwordId, toggleId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleButton = document.getElementById(toggleId);
    
    if (!passwordInput || !toggleButton) return;
    
    toggleButton.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      toggleButton.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
  }
  
  // Setup all password toggles
  setupPasswordToggle('signupPassword', 'toggleSignupPassword');
  setupPasswordToggle('signupConfirmPassword', 'toggleSignupConfirmPassword');
  setupPasswordToggle('signinPassword', 'toggleSigninPassword');
  setupPasswordToggle('newPassword', 'toggleNewPassword');
  setupPasswordToggle('confirmNewPassword', 'toggleConfirmNewPassword');
  
  // Login type toggle
  document.getElementById('loginUsernameBtn').addEventListener('click', function() {
    document.getElementById('loginUsernameBtn').classList.add('active');
    document.getElementById('loginEmailBtn').classList.remove('active');
    document.getElementById('usernameGroup').style.display = 'block';
    document.getElementById('emailGroup').style.display = 'none';
    document.getElementById('signinUsername').required = true;
    document.getElementById('signinEmail').required = false;
  });
  
  document.getElementById('loginEmailBtn').addEventListener('click', function() {
    document.getElementById('loginEmailBtn').classList.add('active');
    document.getElementById('loginUsernameBtn').classList.remove('active');
    document.getElementById('emailGroup').style.display = 'block';
    document.getElementById('usernameGroup').style.display = 'none';
    document.getElementById('signinEmail').required = true;
    document.getElementById('signinUsername').required = false;
  });
  
  // Pricing tabs
  document.querySelectorAll('.pricingTab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.pricingTab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const network = this.getAttribute('data-network');
      loadPricing(network);
    });
  });
  
  // Form validation functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone) && phone[0] !== '0';
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }
  
  function validateOtp(otp) {
    const re = /^[0-9]{6}$/;
    return re.test(otp);
  }
  
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
  }
  
  
  
  
  
  // Form submissions
  //signup
  document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    //start Loadet
    let signupLoader = showLoading('Creating account', true)
    // Get form values
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Reset errors
    hideError('usernameError');
    hideError('emailError');
    hideError('phoneError');
    hideError('passwordError');
    hideError('confirmPasswordError');
    
    // Validate inputs
    let isValid = true;
    
    if (username.length < 3) {
      hideLoading(signupLoader, 1300)
      showError('usernameError', 'Username must be at least 3 characters');
      isValid = false;
    }
    
    if (!validateEmail(email)) {
      hideLoading(signupLoader, 1300)
      showError('emailError', 'Please enter a valid email address');
      isValid = false;
    }
    
    if (!validatePhone(phone)) {
      hideLoading(signupLoader, 1300)
      showError('phoneError', 'Please enter a valid 10-digit phone number (without 0)');
      isValid = false;
    }
    
    if (!validatePassword(password)) {
      hideLoading(signupLoader, 1300)
      showError('passwordError', 'Password must be at least 6 characters');
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      hideLoading(signupLoader, 1300)
      showError('confirmPasswordError', 'Passwords do not match');
      isValid = false;
    }
    
    if (isValid) {
      try {
        //try to sign up
        let signupRes = await request('POST', {
          username,
          gmail: email,
          phone: phone,
          password
        }, '/v1/auth/signup');
        /*     
             //signup829r'
             // Log form data
             console.log('Signup Form Data:', {
               username,
               gmail: email,
               phone: phone,
               password
             });
         */
        hideLoading(signupLoader, 2000)
        // In a real app, you would handle form submission here
        showAlert('success',
          'Account created successfully! You can now sign in.',
          () => {
            showPage('signin');
            
          }, false);
        
      } catch (e) {
        hideLoading(signupLoader, 1300)
        
        showAlert('warning', e.message)
      }
      
    }
  });
  //signin
  document.getElementById('signInBtn').addEventListener('click', async function(e) {
    e.preventDefault();
    //signin
    let signinLoader = showLoading('Login in progress', true)
    
    // Get form values
    const useUsername = document.getElementById('loginUsernameBtn').classList.contains('active');
    const username = document.getElementById('signinUsername').value;
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Reset errors
    hideError('signinUsernameError');
    hideError('signinEmailError');
    hideError('signinPasswordError');
    
    // Validate inputs
    let isValid = true;
    
    if (useUsername) {
      if (username.length < 3) {
        hideLoading(signinLoader, 1200)
        showError('signinUsernameError', 'Please enter a valid username');
        isValid = false;
      }
    } else {
      if (!validateEmail(email)) {
        showError('signinEmailError', 'Please enter a valid email address');
        isValid = false;
        hideLoading(signinLoader, 1200)
      }
    }
    
    if (!validatePassword(password)) {
      hideLoading(signinLoader, 1200)
      showError('signinPasswordError', 'Please enter your password');
      isValid = false;
    }
    
    if (isValid) {
      // Log form data
      
      const payLoad = {
        useGmail: !useUsername,
        useUsername: useUsername,
        identifier: useUsername ? username : email,
        password,
        rememberMe
      };
      
      // console.log('Signin Form Data:', payLoad);
      
      //login
      try {
        
        let loginRes = await request('POST',
          payLoad,
          '/v1/auth/signin'
        );
        //  console.log(loginRes)
        
        setCookie('apikey', loginRes.key, 1);
        
        showAlert('success',
          loginRes.message,
          () => {
            updateLoading(signinLoader, 'Redirecting')
            
            setCookie('apikey', loginRes.key);
            window.location.href = './dashboard.html';
          },
          false
        );
        hideLoading(signinLoader, 1300)
        
      } catch (e) {
        hideLoading(signinLoader, 1200)
        console.log(e.message)
        showAlert('warning', e.message)
      }
      
    }
    hideLoading(signinLoader, 1300)
    
  });
  
  //request otp
  document.getElementById('forgotPasswordForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    let forgotPasswordLoader = showLoading('Requesting OTP')
    // Get form values
    const email = document.getElementById('resetEmail').value;
    
    // Reset errors
    hideError('resetEmailError');
    
    // Validate inputs
    if (!validateEmail(email)) {
      hideLoading(forgotPasswordLoader, 1200)
      showError('resetEmailError', 'Please enter a valid email address');
      return;
    }
    
    // Log form data
    //  console.log('Forgot Password Form Data:', { email });
    
    try {
      //request otp
      setCookie('gmail', email);
      let otpRes = await request(
        'POST', { gmail: email },
        '/v1/auth/requestotp');
      
      showAlert('success', otpRes.message)
      showPage('otpVerification');
    } catch (e) {
      console.log(e.message);
      showAlert('warning', e.message)
      
    }
    
    hideLoading(forgotPasswordLoader, 1200)
  });
  
  
  
  //change the password 
  document.getElementById('otpForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    let changePassLoader = showLoading('Changing password', true)
    // Get form values
    const otp = document.getElementById('singleOtpInput').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Reset errors
    hideError('newPasswordError');
    hideError('confirmNewPasswordError');
    
    // Validate inputs
    let isValid = true;
    
    if (!validateOtp(otp)) {
      hideLoading(changePassLoader)
      showAlert('warning', 'Please enter a valid 6-digit OTP');
      document.getElementById('singleOtpInput').classList.add('error');
      isValid = false;
    } else {
      document.getElementById('singleOtpInput').classList.remove('error');
    }
    
    if (!validatePassword(newPassword)) {
      hideLoading(changePassLoader)
      showError('newPasswordError', 'Password must be at least 6 characters');
      isValid = false;
    }
    
    if (newPassword !== confirmNewPassword) {
      hideLoading(changePassLoader)
      showError('confirmNewPasswordError', 'Passwords do not match');
      isValid = false;
    }
    
    if (isValid) {
      // Log form data
      
      try {
        let changePassRes = await request('POST',
          {
            gmail: getCookie('gmail'),
            otp: otp,
            password: newPassword,
          },
          '/v1/auth/changepassword');
        hideLoading(changePassLoader)
        
        showAlert('success', changePassRes.message, () => {
          showPage('signin');
        })
        
        
      } catch (e) {
        hideLoading(changePassLoader)
        console.log(e.message)
        showAlert('warning', e.message)
      }
      
      hideLoading(changePassLoader)
      
    }
    
    hideLoading(changePassLoader)
    
  });
  
  // OTP input navigation for multiple inputs
  document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
    input.addEventListener('input', function() {
      if (this.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
  
  // Single OTP input validation
  document.getElementById('singleOtpInput').addEventListener('input', async function() {
    // Only allow numbers
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Remove error state when user types
    if (this.value.length > 0) {
      this.classList.remove('error');
    }
  });
  
  // Resend OTP
  document.getElementById('resendOtp').addEventListener('click', async function(e) {
    e.preventDefault();
    let reSendLoader = showLoading('Resending otp', true);
    // In a real app, you would resend the OTP
    try {
      //request otp
      const gmail = getCookie('gmail');
      
      let otpRes = await request(
        'POST', { gmail },
        '/v1/auth/requestotp');
      hideLoading(reSendLoader)
      showAlert('success', otpRes.message)
      showPage('otpVerification');
    } catch (e) {
      hideLoading(reSendLoader)
      console.log(e.message);
      showAlert('warning', e.message)
    }
    
    
    
    
    
    // Reset timer
    startOtpTimer();
    document.getElementById('resendOtp').style.display = 'none';
    document.getElementById('resendTimer').style.display = 'block';
  });
  
  
  
  
  
  
  
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.mobileNavLink').forEach(link => {
    link.addEventListener('click', function() {
      document.getElementById('mobileNav').classList.remove('active');
    });
  });
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', async function() {
    loadPricing('mtn');
    
    // Initialize OTP page state
    document.getElementById('resendOtp').style.display = 'none';
    document.getElementById('resendTimer').style.display = 'block';
  });
  
  
  
  
  //loading 
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
  
  async function wakeApi() {
    //wake api
    let readyRes = await fetch(apiUrl)
    //  console.log(readyRes)
    if (readyRes.status !== 200) throw new Error("Please try again")
  }
  wakeApi()
  
  
  //myAlert
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