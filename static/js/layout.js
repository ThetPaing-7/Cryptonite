let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode','active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode',null)
}

if(darkmode === 'active') enableDarkmode()
// Click to switch light and dark
themeSwitch.addEventListener("click",()=>{
  dakrmode = localStorage.getItem('darkmode')
  dakrmode !== "active" ? enableDarkmode() : disableDarkmode()
})


function hideFlashMessage() {
  const flashMessage = document.getElementById("flash-message");
  console.log("Flash message element:", flashMessage); // Debugging
  if (flashMessage) {
    console.log("Hiding flash message..."); // Debugging
    setTimeout(() => {
      flashMessage.style.opacity = "0"; // Fade out
      setTimeout(() => {
        flashMessage.style.display = "none"; // Remove from DOM
      }, 500); // Wait for the fade-out to finish
    }, 3000); // 3000 milliseconds = 3 seconds
  }
}

window.addEventListener("load", hideFlashMessage);