const { json } = require("express");

async function logInforum(event){
event.preventDefault();
const username = document.querySelector('.username').value.trim()
const password = document.querySelector('.validate').value.trim()
// put user name here, make sure to .value.trim() at the end
// put password here, make sure to .value.trim() at the end
if (username && password){
    const response = await fetch('/api/users/login', {
        method: 'POST', 
        body: JSON.stringify({
         username, 
         password   
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
        document.location.replace('/homepage')
    }else{
        alert(response.statusText)
    }
}
}
document.querySelector('.submitBtn').addEventListener('click', logInforum)
// eventlistener for submit btn