document.addEventListener("DOMContentLoaded", function() {
    initial();
    setTimer();
    
    buttons.minus.addEventListener("click", minusButton);
    buttons.plus.addEventListener("click", plusButton);
    buttons.heart.addEventListener("click", heartButton);
    buttons.pause.addEventListener("click", pauseButton);
    comment.submitButton.addEventListener("click", commentButton);

});

function initial() {
    run = true;
    count = 0;
    counter = document.getElementById("counter");
    likes = document.querySelector("ul");
    buttons = {
        pause: document.getElementById("pause"),
        heart: document.getElementById("heart"),
        plus: document.getElementById("plus"),
        minus: document.getElementById("minus"),
        comment: document.getElementById("submit"),
    }
    comment = {
        list: document.getElementById("list"),
        submitButton: document.getElementById("submit"),
        submission: document.getElementById("comment-input"),
    }
}

let updateCounter = (n = ++count) => {
    count = (n < 0)? 0 : n;
    counter.innerHTML = count;
}

let setTimer = () => setTimeout(e => {
    if (run) {
        updateCounter();
        setTimer();
    }
}, 1000)

let plusButton= event => {
    updateCounter();
}

let minusButton = event => {
    updateCounter(--count);
}


let pauseButton = event => {
    run = !run;
    if (running) {
        setTimer();
        buttons.pause.innerHTML = "pause";
    } else {
        buttons.pause.innerHTML = "resume";
    }
}


let heartButton = event => {
    let like = likes.querySelector(`[num="${count}"]`)
    if (!like) {
        like = document.createElement("li");
        like.setAttribute("num", count);
        like.innerHTML = `${count} has been liked <span>0</span> times.`;
        likes.appendChild(like);
    }
    let innerCount = like.querySelector("span");
    innerCount.innerHTML = parseInt(innerCount.innerHTML) + 1;
}

let commentButton = event => {
    event.preventDefault();
    if (comment.submission.value !== "") {
        let newComment = document.createElement("p");
        newComment.innerHTML = comment.submission.value;
        comment.submission.value = "";
        comment.list.appendChild(newComment);
    }
}