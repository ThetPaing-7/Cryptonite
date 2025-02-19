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