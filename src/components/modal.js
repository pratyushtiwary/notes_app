let modal = {};

modal.show = (head,body,options,closeable=true)=>{
    var c=document.createElement("div"),m,h,b,o,op=document.createElement("div");
    if(!document.body.querySelector("modal")){
        m = document.createElement("modal");
       document.body.append(m);
    }

    m = document.body.querySelector("modal");
    m.innerHTML = "";

    if(closeable){
        var cl = document.createElement("div");
        cl.classList.add('icon');
        cl.classList.add("close");
        cl.innerText = "close";
        cl.addEventListener("click",()=>{
            modal.hide();
        })
        c.append(cl);
        op.onclick = ()=>{
            modal.hide();
        }
    }

    op.classList.add("opacity");
    c.classList.add("cont");

    h = document.createElement("div");
    h.classList.add("head");
    h.innerText = head;

    b = document.createElement("div");
    b.classList.add("body");
    b.innerHTML = body;

    o = document.createElement("div");
    o.classList.add("options");

    for(var a in options){
        o.innerHTML += `
            <div class="option ${options[a]}">${a}</div>
        `;
    }

    c.append(h);
    c.append(b);
    c.append(o);

    m.append(op);
    m.append(c);

    m.classList.add("open");

}

modal.hide = ()=>{
    if(document.body.querySelector("modal")){
        document.body.querySelector("modal").classList.remove("open");
    }
}

module.exports = modal;