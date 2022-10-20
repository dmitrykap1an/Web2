 document.getElementById("area").onmouseup = function (event){
    let r = checkR()
     if(r.status){
             let x = (r.value * (event.offsetX - 200)/120).toFixed(3)
             let y = (r.value * (140 - event.offsetY)/120).toFixed(3)
             sendRequest(x, y, r.value)
     }
     else{
         alert("Выберете число R")
     }

}

