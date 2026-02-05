document.getElementById("submit").addEventListener("click", function () {
    let username = getUsername()
    username=username.trim()
    let valid=validation(username)
    let err=document.getElementById("errorMsg")
    if(!valid)
        err.classList.remove("d-none")
    else
    {
        err.classList.add("d-none")
        searchUser(username)
    }
})

function getUsername(){
    return document.getElementById("input").value
}

function validation(username){
    return username.length>0
}

function searchUser(username){
    console.log("Searching...",username);
}