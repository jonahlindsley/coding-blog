const { json } = require("express");

async function logInforum(event){
event.preventDefault();
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
        document.location.replace('/index')
    }else{
        alert(response.statusText)
    }
}
}
// eventlistener for submit btn