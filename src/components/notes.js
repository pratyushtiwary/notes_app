import React, { useState, useEffect } from 'react';
const modal = require("./modal");
const snackbar = require("./snackbar");

function Notes(props){

    var [notes,setNotes] = useState([]);

    function load(){
        if(localStorage.getItem("notes")){
            var a = JSON.parse(localStorage.getItem("notes"));
            setNotes(a);
        }
    }

    useEffect(()=>{
        load();
    },[]);

    function add(){
        modal.show("Add Note",`
            <div class="input">
                <input type="text" id="title"/>
                <label for="title">Title</label>
            </div>
            <div class="input">
                <textarea id="body"></textarea>
                <label for="body">Body</label>
            </div>
        `,{
            "Save": "s"
        });
        document.querySelector("modal .s").onclick = ()=>{
            if(document.querySelector("modal #title").value===""){
                document.querySelector("modal #title").focus();
                snackbar("Please enter a title!");
                return;
            }
            
            var d = new Date(),h = document.querySelector("modal #title").value,b = document.querySelector("modal #body").value;

            d = d.getDate().toString() + "-" + d.getMonth().toString()+"-"+d.getFullYear();

            var note = {
                "Date": d,
                "Head": h,
                "Body": b
            }

            if(!localStorage.getItem("notes")){
                localStorage.setItem("notes","[]");
            }

            var l = JSON.parse(localStorage.getItem("notes"));
            l.push(note);
            localStorage.setItem("notes",JSON.stringify(l));
            modal.hide();
            load();
            snackbar("Note Added!");

        }
    }

    let toggle = 0;

    function edit(e){
        toggle = 1;
        e.persist();
        let i = parseInt(e.target.parentElement.parentElement.getAttribute("id").replace(/note/,""));
        let notes = JSON.parse(localStorage.getItem("notes"));
        modal.show("Edit Note",`
            <div class="input">
                <input type="text" value=${notes[i].Head} id="title"/>
                <label for="title" class="float">Title</label>
            </div>
            <div class="input">
                <textarea id="body">${notes[i].Body}</textarea>
                <label for="body" class="float">Body</label>
            </div>
        `,{
            "Save": "s"
        });
        document.querySelector("modal .s").onclick = ()=>{
            let h = document.querySelector("modal #title").value,b=document.querySelector("modal #body").value,d= new Date();
            d = d.getDate().toString() + "-" + d.getMonth().toString()+"-"+d.getFullYear();
            notes[i] =  {
                "Date": d,
                "Head": h,
                "Body": b
            };
            notes = JSON.stringify(notes);
            localStorage.setItem("notes",notes);
            modal.hide();
            load();
            snackbar("Note Saved!");
        }
    }

    function del(e){

        toggle = 1;

        e.persist();
        modal.show("Delete Confirmation",`
            Are you sure you want to delete this note?
        `,{
            "<font color='red'>Yes, Delete It</font>": "del",
            "No": "d"
        },false);

        document.querySelector("modal .del").onclick = ()=>{
            let t = [],a=JSON.parse(localStorage.getItem("notes")),i=parseInt(e.target.parentElement.parentElement.getAttribute("id").replace(/note/gi,""));
            a.forEach((e,ii)=>{
                if(ii!==i){
                    t.push(e);
                }
            });
            t = JSON.stringify(t);
            localStorage.setItem("notes",t);
            load();
            modal.hide();
            snackbar("Note Deleted!");


        }

        document.querySelector("modal .d").onclick = ()=>{
            modal.hide();
        }

    }

    function open(e){
        if(!toggle){
            e.persist();
            let i = parseInt(e.target.getAttribute("id").replace(/note/,""));
            let notes = JSON.parse(localStorage.getItem("notes"));
            modal.show(notes[i].Head,notes[i].Body,{});
        }
        toggle = 0;
    }

    return (
        <div className="notes">
            <div className="note add icon" onClick={add}>add</div>
            {notes.map((n,i)=>{
                return (
                    <div className="note" id={"note"+i.toString()} key={i.toString()} onClick={open}>
                        <div className="cont" id={"note"+i.toString()}>
                            <div className="title" id={"note"+i.toString()}>{n.Head}</div>
                            <div className="body" id={"note"+i.toString()}>{n.Body}</div>
                            <div className="date" id={"note"+i.toString()}>{n.Date}</div>
                        </div>
                        <div className="toolbar">
                            <div className="icon edit" onClick={edit}>edit</div>
                            <div className="icon del" onClick={del}>delete</div>
                        </div>
                    </div>
                )                
            })}
        </div>
    )

}

export default Notes;