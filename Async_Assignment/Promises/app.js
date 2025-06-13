document.getElementById("promiseBtn").addEventListener("click", () =>{
    const resDiv= document.getElementById("promiseResult");
    resDiv.innerText = "Loading....";

    const fetchPromise=new Promise((resolve,reject)=>{
        const timeout= setTimeout(()=> reject("Operation timeout "),5000);

            fetch("https://dummyjson.com/posts")
                .then(res=>res.json())
                .then(data=>{
                    clearTimeout(timeout);
                    resolve(data.posts.map(post=>post.title).join("\n"));
                })

                .catch(err=>{
                    clearTimeout(timeout);
                    reject("Network Error Occured");
                });
        });

    fetchPromise
        .then(data=> resDiv.innerText = data)
        .catch(err=> resDiv.innerText = "Error: " +err)
});