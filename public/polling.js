
let timerID
let latestTimeStamp = Date.now();
let errCount = 0


const fetchPhotos = () => {fetch("/latest", 
{
method: "POST",
body: JSON.stringify({"after": latestTimeStamp}),
headers: {"Content-type": "application/json"}
}
).then(res=> res.json())
.then(res => {
    latestTimeStamp = res.timestamp
    for(let i = 0; i < res.images.length; i++) {
        const photoList = document.getElementById("photosList")
        const imgElement = document.createElement("img")
        imgElement.src = res.images[i]
        photoList.appendChild(imgElement)
        console.log("Success")
    }
}).catch(err => {
    errCount += 1
    if (errCount > 2) {
        alert("Lost Connection To Server")
        clearTimeout(timerID)
    }
})}

const interval = setInterval(fetchPhotos, 5000);