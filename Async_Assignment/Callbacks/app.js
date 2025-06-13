document.getElementById("btn").addEventListener("click", () =>{
    const resDiv=document.getElementById("callbackResult");
    resDiv.innerText="Waiting for 5 seconds";

    function delay(callback)
    {
        setTimeout(() => {
            callback();
        }, 5000);
    }

    delay(()=>{
        fetch("https://dummyjson.com/posts")
            .then(response => response.json())
            .then(data=>{
                    const titles= data.posts.map(post =>post.title).join("\n");
                    resDiv.innerText= "Callback executed after 5 seconds:\n\n" + titles;
            })
    });
});
