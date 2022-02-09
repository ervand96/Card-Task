let blockArray = [];
const squareGlb = document.getElementById('square_glob');

function randomNumberGenerate() {
    while (blockArray.length <= 50) {
        const randomNum = Math.floor(Math.random() * 50 + 1);
        if (!blockArray.find(rand => rand.text == randomNum)) {
            return randomNum;
        }
    }
    return;
}

function randomColor() {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return color;
}

function createBlockElement(randomNumber, color) {
    const blockElement = document.createElement('div');
    blockElement.style.background = color;
    blockElement.classList.add('child');
    
    const closeSpan = document.createElement('span');
    closeSpan.innerText = "X"
    closeSpan.classList.add('closeSpan');
    closeSpan.addEventListener('click', (event) => {
        closeBlockElement(event)
    });
    
    blockElement.appendChild(closeSpan);
    blockElement.innerHTML = blockElement.innerHTML + "<span class= 'randomNumber' >" + randomNumber + "</span>";

    squareGlb.appendChild(blockElement);
    
}

function addBlockElement() {
    if (squareGlb.children.length < 50) {
        const randomNumber = randomNumberGenerate();
        const color = randomColor();
        if (randomNumber) {
            createBlockElement(randomNumber, color)
            blockArray.push({
                id: randomNumber,
                text: randomNumber,
                color: color,
            })
        }
    }
}

function removeBlockElement() {
    const childrenDiv = squareGlb.children;

    if (childrenDiv.length > 0) {
        squareGlb.removeChild(childrenDiv[childrenDiv.length - 1]);
        blockArray.pop();
    }
}

function closeBlockElement(event) {
    const blockNumber = event.target.previousSibling.innerText
    blockArray = blockArray.filter(arra => arra.text != blockNumber)
    event.target.parentElement.remove();
}

function sortBlockElements() {
    blockArray = blockArray.sort((a, b) => {
        return a.text - b.text;
    });
    
    squareGlb.innerHTML = "";
    for (let i = 0; i < blockArray.length; i++) {
        createBlockElement(blockArray[i].text, blockArray[i].color);
    }
}