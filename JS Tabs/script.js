function openTab(event, tabName) {
  // Get tabcontents and convert to array
  const tabcontents = Array.from(document.getElementsByClassName("tabcontent"));
  tabcontents.forEach(content => content.style.display = "none");

  // Get tablinks and convert to array
  const tablinks = Array.from(document.getElementsByClassName("tab"));
  tablinks.forEach(link => {
    link.className = link.className.replace(" active", "");
  });

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}