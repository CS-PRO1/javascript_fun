
/*
* Tab Changing Logic
*/

function openTab(event, tabName) {
  // Get tabcontents and convert to array
  const tabcontents = Array.from(document.querySelectorAll(".tabcontent"));
  tabcontents.forEach(content => content.style.display = "none");

  // Get tablinks and convert to array
  const tablinks = Array.from(document.querySelectorAll(".tab"));
  tablinks.forEach(link => {
    link.className = link.className.replace(" active", "");
  });

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

/*
* Cookie Consent Logic
*/

//Accept cookies function
function acceptCookies() {
  const cookieConsent = document.querySelector(".cookieConsent");
  cookieConsent.classList.add("hidden");
  setTimeout(() => {
    cookieConsent.style.display = "none";
  }, 500);
  //saving cookies conesnt in localstorage
  localStorage.setItem('cookieConsent', 'true');
}

function declineCookies() {
  const cookieConsent = document.querySelector(".cookieConsent");
  cookieConsent.classList.add("hidden");
  setTimeout(() => {
    cookieConsent.style.display = "none";
  }, 500);
  localStorage.setItem('cookieConsent', 'false');
}

// Check if the user has already accepted/declined cookies to not show the message
window.addEventListener('DOMContentLoaded', () => {
  const cookieConsent = localStorage.getItem('cookieConsent');
  if (!cookieConsent) {
    // Show the cookie consent message
    setTimeout(() => {
      const cookieConsent = document.querySelector(".cookieConsent");
      cookieConsent.classList.remove("hidden");
      cookieConsent.classList.add("show");
    }, 2000);
  }
});

// Temporary button to reset cookie consent for testing if cookie consent is given
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('cookieConsent')) {
    console.log('Cookie consent already given.');

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Cookie Consent';
    resetButton.style.position = 'fixed';
    resetButton.style.bottom = '10px';
    resetButton.style.right = '10px';
    resetButton.style.zIndex = '1000';
    resetButton.style.padding = '5px 10px';
    resetButton.style.backgroundColor = '#f00';
    resetButton.style.color = '#fff';
    resetButton.style.border = 'none';
    resetButton.style.cursor = 'pointer';

    document.body.appendChild(resetButton);

    resetButton.addEventListener('click', () => {
      localStorage.removeItem('cookieConsent');
      alert('Cookie consent has been reset. Refresh the page to test again.');
    });
  }
});