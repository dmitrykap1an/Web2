const xButtons = document.querySelectorAll(".x_button"),
    rButtons = document.querySelectorAll(".r-button"),
    yButton = document.querySelector(".y_text"),
    form = document.getElementById("form"),
    table = document.querySelector(".my_table"),
    tbody = table.getElementsByTagName("tbody")[0];

form.addEventListener("click",onsubmit);


function onsubmit(message){
    let x = checkX()
    let y = validateY()
    let r = checkR()
    let array = [x, y, r]
    if(x.status && y.status && r.status){
        sendRequest(x.mass[0], y.value, r.mass[0])
        // for(let i = 0; i < x.mass.length; i++ ){
        //     for(let j = 0; j < r.mass.length; i++){
        //         sendRequest(x.mass[i], y.value, r.mass[j])
        //     }
        // }
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
    let mass = []
    xButtons.forEach(function (input){
        if(input.checked){
            mass.push(Number.parseFloat(input.value));
        }
    })

    if(mass.length === 0){
        return {
            status: false,
            mass: number,
            errorMessage: "Выберете X!"
        }
    }
    else return {
        status: true,
        mass: mass,
        errorMessage: ""
    }


}

function checkR(){
    let number = 404;
    let mass = []
    rButtons.forEach(function (input){
        if(input.checked){
            mass.push(Number.parseFloat(input.value));
        }
    })

    if(mass.length === 0){
        return {
            status: false,
            mass: number,
            errorMessage: "Выберете R!"
        }
    }
    else return {
        status: true,
        mass: mass,
        errorMessage: ""
    }
}

function getResponse(request){
    const response = JSON.parse(request.response)
    if(response.error){
        alert(response.message)
    }
    else{
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

