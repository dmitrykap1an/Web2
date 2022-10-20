const xButtons = document.querySelectorAll(".x_button"),
    rButtons = document.querySelectorAll(".r-button"),
    yButton = document.querySelector(".y_text"),
    form = document.getElementById("form"),
    table = document.querySelector(".my_table"),
    tbody = table.getElementsByTagName("tbody")[0];

form.addEventListener("click",onsubmit);


function onsubmit(){
    let x = checkX()
    let y = validateY()
    let r = checkR()
    let array = [x, y, r]
    if(x.status && y.status && r.status){
        sendRequest(x.value, y.value, r.value)
    }
    else{
        let errorString = ""
        array.forEach(function (input){
            if(!input.status){
                errorString += input.errorMessage + "\n"
            }
        })

        alert(errorString)
    }
    return false;
}

function validateY(){
    let yVal = yButton.value.replace(",", ".")
    if(!isNaN(yVal)){
        return checkY(Number.parseFloat(yVal).toFixed(3))
    }
    else{
        return {
            status: false,
            value: 404,
            errorMessage: "Y должен быть представлен числом"
        }
    }
}

function checkY(yVal){
    if(yVal >= -5 && yVal <= 5){
        return {
            status: true,
            value: yVal,
            errorMessage: ""
        }
    }
    else{
        return {
            status: false,
            value: 404,
            errorMessage: "Число Y должно быть в промежутке от -5 до 3"
        }
    }

}

function checkX(){
    let number = 404;
    xButtons.forEach(function (input){
        if(input.checked){
            number = Number.parseFloat(input.value)
        }
    })

    if(number === 404){
        return {
            status: false,
            value: number,
            errorMessage: "Выберете X!"
        }
    }
    else return {
        status: true,
        value:  number,
        errorMessage: ""
    }


}

function checkR(){
    let number = 404;
    rButtons.forEach(function (input){
        if(input.checked){
            number = Number.parseFloat(input.value);
        }
    })

    if(number === 404){
        return {
            status: false,
            value: number,
            errorMessage: "Выберете R!"
        }
    }
    else return {
        status: true,
        value: number,
        errorMessage: ""
    }
}

function getResponse(request){
    const response = JSON.parse(request.response)
    if(response.error){
        alert(response.message)
    }
    else{
       updateTable(response)
    }


}

function updateTable(response){
    addDots(response.x, response.y, response.R)
    const row = document.createElement("tr");
    const x = document.createElement("td");
    const y = document.createElement("td");
    const R = document.createElement("td");
    const hit = document.createElement("td");
    const request_time = document.createElement("td");
    const timing = document.createElement("td");
    x.innerHTML = response.x;
    y.innerHTML = response.y;
    R.innerHTML = response.R;
    hit.innerHTML = response.result ? "Точка попала в область" : "Точка не попала в область";
    request_time.innerHTML = response.serverTime;
    timing.innerHTML = response.executeTime;
    row.appendChild(x);
    row.appendChild(y);
    row.appendChild(R);
    row.appendChild(hit);
    row.appendChild(request_time);
    row.appendChild(timing);
    tbody.insertBefore(row, tbody.firstChild);
}

function sendRequest(x, y, R){

    const path = "/controller-servlet?x=" + x + "&y=" + y + "&R=" + R
    const request = new XMLHttpRequest()
    request.open("POST", path, true)

    request.onreadystatechange = () =>{
        if(request.readyState === 4 && request.status === 200){
            getResponse(request)
        }
    }
    request.send()

}

function rebootRequest(){
    const path = "/controller-servlet?reboot";
    const request = new XMLHttpRequest();
    request.open("POST", path, true);
    request.onreadystatechange = () =>{
        if(request.readyState === 4 && request.status === 200){
            console.log("reboot")
        }
    }
    request.send()
}

function addDots(x, y, r){
    let coordinateX = x > 5 || x < -3? x: x >= 0? 200 + (x * 120)/r: 200 + (x * 120)/r
    let coordinateY = y > 5 || y < -5 ? y:  y >= 0? 140 - (y * 120)/r: 140 - (y * 120)/r
    drawCircle(coordinateX, coordinateY, 1, 0, 2*Math.PI)
}

function resetDots(request){
    if(request !== undefined) {
        request.forEach(function (data){
            let dot = JSON.parse(data)
            addDots(dot.x, dot.y, dot.R)
        })
    }
}

rebootRequest()

