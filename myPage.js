let back = document.querySelector(".back");
back.addEventListener("click",()=>{
    window.location.href="my_page.html"
})

// let addBtn = document.querySelector(".title .add-btn");
// addBtn.addEventListener("click",()=>{
//     let input = document.createElement("input");
//     let title = document.querySelector(".artist .title");
//     title.appendChild(input);

//     let conBtn = document.createElement("button");
//     conBtn.setAttribute("class","con-btn");
//     conBtn.textContent = "confirm";
//     title.appendChild(conBtn);
//     input.focus();
//     console.log("addBtn clicked")

//     conBtn.addEventListener("click",()=>{
//         let artistName = document.querySelector("input").value;
//         addArtistNametolist(input,artistName)})
// })

// function addArtistNametolist(input,artistName){
//     if (artistName == ""){
//         alert("type artist name");
//         input.focus();
//     }
//     else{
//         let listContent = document.createElement("li");
//         let list = document.querySelector(".artist ul");
//         listContent.textContent = artistName;
//         list.appendChild(listContent);
//         input.value = "";
//         input.focus();
//         // console.log(list.childElementCount);
//     }
// }

// let saveBtn = document.querySelector(".save");
// let storage = sessionStorage;
// saveBtn.addEventListener("click",saveInputedData);
// function saveInputedData(){
//     storage.clear();
//     let parentListLength = document.querySelector(".artist ul").childElementCount
//     let artistList = document.querySelectorAll(".artist ul li");
//     for (let i = 0;i<parentListLength;i++){
//         storage.setItem("artistList"+i,artistList[i].textContent);

//         console.log(storage.length)
//     }
//     alert("saved");
// }


let conBtns = document.querySelectorAll(".content button");
let inputs = document.querySelectorAll("input");
let uls = document.querySelectorAll(".detail_info ul");
conBtns.forEach((conBtn)=>{
    conBtn.addEventListener("click",()=>{
        indexNum = getConBtnNum(conBtn)
        userInput = getUserInput(indexNum)
        if (userInput){
            addUserInputToList(userInput,indexNum)
            delInputValueAndFocus(indexNum)
        }
    })
})

function getConBtnNum(conBtn){
    return conBtn.dataset.index
}

function getUserInput(indexNum){
    let userInputLi = document.createElement("li")
    userInput = inputs[indexNum].value
    if (userInput == ""){alert("type what you like")}
    else{
        userInputLi.textContent = userInput
        return userInputLi
    }
}

function addUserInputToList(userInput,indexNum){
    let delBtn = document.createElement("button")
    delBtn.textContent = "delete";
    userInput.appendChild(delBtn)
    uls[indexNum].appendChild(userInput)
    delBtn.addEventListener("click",()=>{
        uls[indexNum].removeChild(userInput)
    })
    console.log(userInput)
    // console.log(userInput.textContent.slice(0,-6)) //remove the strings, delete by slice
}


function delInputValueAndFocus(indexNum){
    inputs[indexNum].value = ""
    inputs[indexNum].focus()
}

let saveBtn = document.querySelector(".save");
let storage = sessionStorage;
saveBtn.addEventListener("click",()=>{
    console.log("pushed save button")
    storage.clear()
    for (let i=0;i<uls.length;i++){
        let ul = uls[i]
        let lis = ul.querySelectorAll("li")
        for (let I=0;I<lis.length;I++){
            storage.setItem(i+"-"+I,lis[I].textContent.slice(0,-6))
        }
    }
    alert("saved!")
})

document.addEventListener("DOMContentLoaded",()=>{
    let storage = sessionStorage;
        for (let i=0;i<storage.length;i++){
            let uls = document.querySelectorAll(".detail_info ul")
            let strContent = 0;
            for (let I=0;;I++){
                let delBtn = document.createElement("button")
                delBtn.textContent = "delete";
                let li = document.createElement("li");
                let strContent = storage.getItem(i+"-"+I);
                if (!strContent){
                    break;
                }
                else{
                    li.textContent = strContent;
                    uls[i].appendChild(li);
                    li.appendChild(delBtn)
                    delBtn.addEventListener("click",()=>{
                        uls[i].removeChild(li)
                    })
                }
            }
        }
})