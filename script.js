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

function getData(url){
    return fetch(url)
}

async function consumeData(username) {
    startLoading()
    try {
        const url=`https://api.github.com/users/${username}`
        let info=await getData(url)
        if(info.ok===false)
        {
            apiError(info.status)
            return;
        }
            
        let data=await info.json()
        // console.log(JSON.stringify(data, null, 2))
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
        appendRepoList(username)
    } catch (error) {
        apiError("network_issue")
    } finally{
        stopLoading()
    }
}

async function appendRepoList(username) {
    try {
        let repoList=document.getElementById("repoList")
        repoList.innerHTML=""
        const url=`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
        let info=await getData(url)
        if(info.ok===false)
        {
            repoList.textContent="No repositories found!"
            repoList.text-danger
            return;
        }
            
        let data=await info.json()
        // console.log(JSON.stringify(data, null, 2))

        if(data.length===0)
        {
            repoList.textContent="User has no repo"
            repoList.classList.add("text-danger")
        }
        else
        {
            data.forEach(element => {
                let div=document.createElement("div")
                div.innerHTML=`<div class="border border-3 border-dark rounded rounded-3 m-2 p-1">
                                    <a href="${element.html_url}" target="_blank">${element.name}</a>
                                </div>`
                repoList.appendChild(div)
            });
        }
    } catch (error) {
        apiError("network_issue")
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    consumeData("skrish-g")
})