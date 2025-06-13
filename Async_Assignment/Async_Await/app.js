//adding event listener
document.getElementById("asyncBtn").addEventListener("click", async() =>{
    const resDiv=document.getElementById("asyncResult");
    resDiv.innerText= "Loading...";

    //try block
    try{
        const controller=new AbortController();
        const timeout= setTimeout(() =>{
           controller.abort()
        },5000);
         const res= await fetch("https://dummyjson.com/posts", {
            signal: controller.signal
         })
         clearTimeout(timeout);

         if(!res.ok) throw new Error("Failed to fetch");
         const data = await res.json();
         resDiv.innerText = data.posts.map(post=>post.title).join("\n");
    }
    
    //catch block
    catch(error)
    {
        resDiv.innerText = "Error: " +(error.name==="AbortError" ? "Request Timed Out" : error.message);
    }
});