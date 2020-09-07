(()=>{

    function input(){
        var inputs = document.querySelectorAll("input, textarea");
        inputs.forEach((e,i)=>{
            e.onkeyup = ()=>{
                if(e.value!=""){
                    e.parentElement.querySelector("label").classList.add("float");
                }
                else{
                    e.parentElement.querySelector("label").classList.remove("float")
                }
            }
        });    
    }
    setInterval(()=>{
        input();
    },500);

    input();
})()