document.getElementById("submit").addEventListener("click", function () {
    let username = document.getElementById("input").value
    username=username.trim()
    let valid=username.length>0
    let err=document.getElementById("errorMsg")
    if(!valid)
        apiError("empty")
    else
    {
        err.classList.add("d-none")
        consumeData(username)
    }
})

function apiError(status){
    let err=document.getElementById("errorMsg")
    err.classList.remove("d-none")
    if(status==="empty")
        err.textContent="Please enter username!"
    else if(status===404)
        err.textContent="Please enter a valid GitHub username!"
    else if(status===403)
        err.textContent="GitHub API rate limit reached. Please try again later!"
    else
        err.textContent="Something went wrong. Please try again!"
    document.getElementById("input").value=""
    document.getElementById("input").focus()
}

function startLoading(){
    let btn=document.getElementById("submit")
    btn.disabled=true
    btn.children[0].classList.remove("d-none")
    btn.children[1].textContent="Loading..."
    // setTimeout(()=>{
    //     stopLoading()
    // }, 2000)
}

function stopLoading(){
    let btn=document.getElementById("submit")
    btn.disabled=false
    btn.children[0].classList.add("d-none")
    btn.children[1].textContent="Search"
    document.getElementById("input").value=""
}

function getData(username){
    const url=`https://api.github.com/users/${username}`
    return fetch(url)
}

async function consumeData(username) {
    startLoading()
    try {
        let info=await getData(username)
        if(info.ok===false)
        {
            apiError(info.status)
            return;
        }
            
        let data=await info.json()
        console.log(JSON.stringify(data, null, 2))
        document.getElementById("avatar").src=`${data.avatar_url}`
        if(data.name===null)
            document.getElementById("name").textContent=`${data.login}`
        else
            document.getElementById("name").textContent=`${data.name}`
        document.getElementById("username").textContent=`${data.login}`
        document.getElementById("repoCount").textContent=`${data.public_repos}`
        document.getElementById("followerCount").textContent=`${data.followers}`
        document.getElementById("followingCount").textContent=`${data.following}`
        if(data.bio===null)
            document.getElementById("bio").textContent="No bio available"
        else
            document.getElementById("bio").textContent=`${data.bio}`
    } catch (error) {
        apiError("network_issue")
    } finally{
        stopLoading()
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    consumeData("skrish-g")
})