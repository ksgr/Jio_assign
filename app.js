console.log("It's working...");

/**
 * Mocking the respone Object
 */
let response = {
    status: 200,
        data: [
            { id: '00001', img: 'https://dummyimage.com/320x50/000/fff&text=Image1' },
            { id: '00002', img: 'https://dummyimage.com/320x50/000/fff&text=Image2' },
            { id: '00003', img: 'https://dummyimage.com/320x50/000/fff&text=Image3' },
            { id: '00004', img: 'https://dummyimage.com/320x50/000/fff&text=Image4' },
            { id: '00005', img: 'https://dummyimage.com/320x50/000/fff&text=Image5' }
        ]
    }

/**
* On DOM load invloke the method to load the refresh the iframes
*/    
window.onload = function(){    
    let tagsArr = Array.from(document.getElementsByTagName('myTag'));    
    this.loadAndRefreshIframes(tagsArr);
}

/**
 * Method loads and refresh the iframe every 5 sec
 * @param {*} tagsArr 
 */
function loadAndRefreshIframes(tagsArr){
    tagsArr.map((tag) => {
        if(tag.hasChildNodes()) tag.removeChild(tag.childNodes[0]);        
        let iframe = this.getRandomImageWithIframe(response.data);                
        tag.appendChild(iframe);
    });
    setTimeout(loadAndRefreshIframes,15000,tagsArr)
}

/**
 * Method returns the iframe for every tag.
 * Also sets the attributs and event listener which sends the notification 
 * after once it's loaded.
 * @param {*} imageArr
 */
function getRandomImageWithIframe(imageArr){
    let iframe = document.createElement("IFRAME");
    let imageLink = this.getRandomImageId(imageArr)
    iframe.setAttribute("src", imageLink);
    iframe.addEventListener('load',this.sendNotification("https://dummytrackerserver.com?id=00003")
        .then(() => console.log('success'))
        .catch(() => console.error('failed'))
        );
    return iframe;
}

/**
 * Method returns the random imageLink from mocked response data.
 * @param {*} imageArr
 */
function getRandomImageId(imageArr){
   let imgId = Math.round(Math.random() * (imageArr.length - 1) );
   console.log("ImageLink="+imageArr[imgId].img);
   return imageArr[imgId].img;
}

/**
 * Methods sends the notification via HTTP request.
 * @param {*} payload 
 */
function sendNotification(payload){
    console.log("Notification payload="+payload);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", payload);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}