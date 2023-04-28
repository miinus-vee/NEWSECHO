const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// Add event listener to the messaging button

const messageButton = document.getElementById("message-button");
messageButton.addEventListener("click", openMessagingWindow);

// Function to open the messaging window
function openMessagingWindow() {
  const messagingWindow = document.getElementById("messaging-window");
  messagingWindow.style.display = "block";
}

// Add event listener to the send button
const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", sendMessage);

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value;
  
  // Send the message to the server and update the messages container
  // ...
  
  messageInput.value = ""; // Clear the message input field
}



// Grab the news container
const newsAccordion = document.getElementById('newsAccordion');

// Initialize the news api parameters
const apiKey = 'b385f21d5d354dada78a9de7ee162de0';

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index)
            let news = `<div class="card mb-5">
            
                
                <img src="${element["urlToImage"] || 'placeholder-image.png'}" class="card-img-top" alt="${element["title"]}">

                <div class="card-header" id="heading${index}">
                    <h2 class="mb-0">
                    <b>Breaking News ${index+1}:</b> ${element["title"]}
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                            <img src="down.svg" alt="Bootstrap" width="22" height="22">
                        </button>
                        
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                    <div class="card-body">${element["content"]}. <a href="${element['url']}" target="_blank">Read more here</a></div>
                    <div class="card-footer">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Enter your comment...">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button">Submit</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary mr-2"><i class="fas fa-share"></i> Share</button>
                        <button type="button" class="btn btn-secondary"><i class="fas fa-comment"></i> Comment</button>
                    </div>
                </div>
            </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send();
