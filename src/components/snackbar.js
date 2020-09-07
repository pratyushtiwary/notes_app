let snackbar = function(body,timeout=2000){
    var sn = document.createElement("div");
    sn.classList.add("snackbar");
    if(document.body.querySelector(".snackbar")){
        sn = document.body.querySelector(".snackbar");
    }
    else{
        document.body.append(sn);
    }

    sn.innerText = body;
    sn.classList.add("show");
    setTimeout(()=>{
        sn.classList.remove("show");
    },timeout);

}

module.exports = snackbar;