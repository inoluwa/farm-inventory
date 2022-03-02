const eggUrl = "http://localhost:4000";
let eggPicked = [];

function getEggRecords() {
    var myHeaders=new Headers();
    myHeaders.append('content-type', 'application/json');
var requestOptions= {
    headers: myHeaders,
    method: 'GET'  
}
fetch(`${eggUrl}/api/allEggRecords`, requestOptions)
.then(res=> res.json())
.then(res=>{displayEggRecord(res.data)})
.catch(err=>console.error(err))
}

function dis_count (recordCount) {
 const nameCount = recordCount<2 ? 'entry':'entries';
 document.getElementById('counter-id').innerHTML = `showing <b>${recordCount}</b> ${nameCount}`;
}

function displayEggRecord(data) {
    const tBody = document.getElementById("eggPicked");
    tBody.innerHTML = "";
    dis_count(data.length)
    data.forEach(element => {
        let editBtn = document.createElement("a");
        editBtn.className = "edit";
        editBtn.setAttribute("data-bs-target", "#editModal")
        editBtn.setAttribute("onclick", `editFormDisplay(${element.id})`);
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.innerHTML =
            "<i class='material-icons' data-bs-toggle='tooltip' title='Edit'>&#xE254;</i>";

        let deleteBtn = document.createElement("a");
        deleteBtn.className = "delete";
        deleteBtn.setAttribute("data-bs-target", "#deleteEggModal")
        deleteBtn.setAttribute("onclick", `deleteFormDisplay(${element.id})`);
        deleteBtn.setAttribute("data-bs-toggle", "modal");
        deleteBtn.innerHTML =
            "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>";

            let tableRow = tBody.insertRow();
            let tableData1 = tableRow.insertCell(0);
            let newDate= new Date(element.date);

            let textDate = document.createTextNode(`${newDate.getDate()} / ${newDate.getMonth()+1} / ${newDate.getFullYear()}`);
            tableData1.appendChild(textDate);

            let tableData2 = tableRow.insertCell(1);
            let textGood = document.createTextNode(element.good);
            tableData2.appendChild(textGood);

            let tableData3 = tableRow.insertCell(2);
            let textBad = document.createTextNode(element.bad);
            tableData3.appendChild(textBad);

            let tableData4 = tableRow.insertCell(3);
            let textCracked = document.createTextNode(element.cracked);
            tableData4.appendChild(textCracked);

            let tableData5 = tableRow.insertCell(4);
            let textComment = document.createTextNode(element.comment);
            tableData5.appendChild(textComment);

            let tableData6 = tableRow.insertCell(5);

            tableData6.appendChild(editBtn);
            tableData6.appendChild(deleteBtn);
    })
    eggPicked = data;
}

function displayNewRecord(){
}
function saveRecord(){
    let good=document.getElementById('gud').value;
    let bad=document.getElementById('bad').value;
    let cracked=document.getElementById('cracked').value;
    let comment=document.getElementById('cmt').value;

    if(!(good && bad && cracked && comment)){
        alert('All field is required')
     return;
    }
const newData = JSON.stringify({
    "good":good,
     "condemed":bad,
     "cracked":cracked,
     "moreInformation":comment
});
var exit =  bootstrap.Modal.getInstance(document.getElementById('addEggModal'))
var myHeaders = new Headers();
myHeaders.append('content-type','application/json');
var requestOptions={
    method:'POST',
    headers:myHeaders,
    body:newData,
};
fetch(`${eggUrl}/api/postEggRecord/`, requestOptions)
    .then(response => response.json())
    .then(data =>{
       
        window.alert(data.message);
        getEggRecords();
        exit.hide();
            })
            .catch(error => console.error("Unable to post egg records"));

}

function editFormDisplay(id){
document.getElementById('edit_id').value=id;
//populate ur UI
const eggEntity= eggPicked.find(y=>y.id==id);
document.getElementById('good_value').value=eggEntity.good;
document.getElementById('bad_value').value=eggEntity.bad;
document.getElementById('cracked_value').value=eggEntity.cracked;
document.getElementById('comment_value').value=eggEntity.comment;

}
function updateRecord(){
    let good=document.getElementById('good_value').value;
    let bad=document.getElementById('bad_value').value;
    let cracked=document.getElementById('cracked_value').value;
    let comment=document.getElementById('comment_value').value;
    let id=document.getElementById('edit_id').value;

if(!(good && bad && cracked && comment)){
    window.alert('all field is required')
    return ;
}
// continue;

const objBody = {
    good:good,
    bad:bad,
    cracked:cracked,
    comment:comment
}
var editModal =  bootstrap.Modal.getInstance(document.getElementById('editModal'))


var myHeaders = new Headers();
myHeaders.append('content-type','application/json');
var requestOptions={
    method:'PUT',
    headers:myHeaders,
    body:JSON.stringify(objBody),
};
fetch(`${eggUrl}/api/updateEggRecord/${id}`, requestOptions)
    .then(response => response.json())
    .then(data =>{
window.alert(data);
editModal.hide();
getEggRecords();
} )
.catch((err)=>console.error('unable to update'))
}
getEggRecords();