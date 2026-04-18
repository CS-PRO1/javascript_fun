const textarea = document.querySelector('.textarea');
const current = document.querySelector('#current');
const max = document.querySelector('#max');
const progress = document.querySelector('.progress');
const message = document.querySelector('.message');
progress.style.width = '0%';
message.textContent = "Let\'s Get Started! ^^";

// Set the maximum length
max.textContent = textarea.getAttribute('maxlength');

textarea.addEventListener('input', function () {
    const length = this.value.length;
    current.textContent = length;
    changemsessage(length);
    progress.style.width = (length / 250) * 100 + '%';
    if (length === 250) {
        current.style.color = "red";
        textarea.style.borderColor = "red";
    } else {
        current.style.color = "black";
        textarea.style.borderColor = "lightpink";
    }
});

function changemsessage(length) {
    switch (true) {
        case (length === 0):
            message.textContent = "Let\'s Get Started! ^^";
            break;
        case (length < 30):
            message.textContent = "Here We Go!";
            break;
        case (length < 200):
            message.textContent = "Keep Going! There's still plenty of room.";
            break;
        case (length < 250):
            message.textContent = "Almost There! Get yourself in position!";
            break;
        case (length === 250):
            message.textContent = "You Fool! You've Taken too long!";
        default:
            break;
    }
}