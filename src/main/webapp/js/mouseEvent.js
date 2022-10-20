 document.getElementById("area").onmouseup = function (event){
    let r = checkR()
     if(r.status){
         r.mass.forEach(function (rValue){
             console.log(rValue)
             console.log(event.offsetX)
             console.log(event.offsetY)
             console.log(rValue)
             let x = (rValue * (event.offsetX - 200)/120).toFixed(3)
             let y = (rValue * (140 - event.offsetY)/120).toFixed(3)
             sendRequest(x, y, rValue)
         })
     }
     else{
         alert("Выберете число R")
     }

}

