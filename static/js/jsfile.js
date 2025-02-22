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




document.addEventListener('DOMContentLoaded', function () {
    // Select all alert elements
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(alert => {
        // Set a timeout to fade out the alert after 2 seconds
        setTimeout(() => {
            alert.style.opacity = '0';
            // Remove the alert from the DOM after the fade-out transition
            setTimeout(() => alert.remove(), 500); // 500ms matches the CSS transition duration
        }, 2000); // 2000ms = 2 seconds
    });
});