const newFourmHandler = async event => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;

const response = await fetch('/api/posts', {
    method: "POST",
    body: JSON.stringify({
        title,
        content,
    }),
    headers: {
        "Content-Type": "application/json",
    },
});

console.log(responce)
if (response.ok) {
    document.location.replace("/homepage");
}else{
    alert(response.statusText)
}
};


document
.querySelector()
.addEventListener("submit", newFourmHandler)