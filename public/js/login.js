

async function logInforum(event){
event.preventDefault();
const username = document.querySelector('.username').value.trim()
const password = document.querySelector('.validate').value.trim()

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
