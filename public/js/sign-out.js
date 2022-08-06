const { json } = require("express");

async function logOutforum(event){
event.preventDefault();
// put user name here, make sure to .value.trim() at the end
// put password here, make sure to .value.trim() at the end

    const response = await fetch('/api/users/logout', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
        document.location.replace('/')
    }else{
        alert(response.statusText)
    }

}
// eventlis