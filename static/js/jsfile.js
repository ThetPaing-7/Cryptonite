console.log("This is working")


// Check for user save theme
window.onload = function(){
    const themeCheckbox = document.getElementById("theme")

    if(localStorage.getItem('theme') === 'light'){
        themeCheckbox.checked = true;
        document.body.classList.add("light_mode")
    }else{
        themeCheckbox.checked = false;
        document.body.classList.remove("light_mode")
    }

    // listen for the checkbox changes
    themeCheckbox.addEventListener("click",function(){
        if(themeCheckbox.checked){
            document.body.classList.add("light_mode")
            localStorage.setItem('theme', 'light')
        }else{
            //Dark mode
            document.body.classList.remove("light_mode");
            localStorage.setItem('theme', 'dark')
        }
    })
}