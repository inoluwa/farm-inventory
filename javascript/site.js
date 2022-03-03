
// Getting all inventory records
//  created a variable baseurl for our api
const baseUrl = "https://naomi-project-test.herokuapp.com";
// here we declared an empty array, where our data will be saved 
let inventory = [];

// This a function to get all inventory records
function getInventoryItems() {
    // we create an empty header 
    // and then use myHeaders.append("Content-Type", "application/json"); it returns value in json 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
// declare a variable request option with object method and header
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    fetch(`${baseUrl}/api/getAllPosts`, requestOptions)
    .then(response => response.json())
    .then(res => displayItems(res.data))
    .catch(error => console.error("Unable to get farm inventory data.", error));
}

function displayCount(itemCount) {
    const name = itemCount < 2 ? "entry" : "entries";
    document.getElementById("counter").innerHTML = `Showing <b>${itemCount}</b> ${name}`;
}

function displayItems(data) {
    const tBody = document.getElementById("inventory");
    tBody.innerHTML= "";
  
    displayCount(data.length);
    data.forEach(item => {
        let editButton = document.createElement("a");
        editButton.className = "edit";
        editButton.setAttribute("data-bs-target", "#editInventoryModal")
        editButton.setAttribute("onclick", `displayEditForm(${item.id})`);
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.innerHTML =
            "<i class='material-icons' data-bs-toggle='tooltip' title='Edit'>&#xE254;</i>";

        let deleteButton = document.createElement("a");
        deleteButton.className = "delete";
        deleteButton.setAttribute("data-bs-target", "#deleteRecordModal")
        deleteButton.setAttribute("onclick", `displayDeleteForm(${item.id})`);
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.innerHTML =
            "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>";

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.innerHTML = `<span class="text-success">${item.date} </span>` //` < span class = "text-danger" > $ { item.date } < /span>`


        //   let td2 = tr.insertCell(1);
        //   let textId = document.createTextNode(item.id);
        //   td2.appendChild(textId);
        let td2 = tr.insertCell(1);
        let textExpenses = document.createTextNode(item.expenses_description);
        td2.appendChild(textExpenses);

        let td4 = tr.insertCell(2);
        let textMortalty = document.createTextNode(item.mortality);
        td4.appendChild(textMortalty);

        let td5 = tr.insertCell(3);
        let textQty = document.createTextNode(item.quantity);
        td5.appendChild(textQty);

        let td6 = tr.insertCell(4);
        let textAmount = document.createTextNode(item.amount);
        td6.appendChild(textAmount);

        let td7 = tr.insertCell(5);
        let textComment = document.createTextNode(item.comment);
        td7.appendChild(textComment);
        // 1 Expenditure 
        // 2 Sales
        //Type: 
        let analysisType = (item.analysisType === 1) ? 'Expenditure' : 'Sales';
        let td8 = tr.insertCell(6);
        let textAnalysisType = document.createTextNode(`${analysisType}`);
        td8.appendChild(textAnalysisType);

        let td9 = tr.insertCell(7);

        td9.appendChild(editButton);
        td9.appendChild(deleteButton);

    });

    inventory = data;
}

function displayDeleteForm(id) {
    document.getElementById("delete-id").value=id;


}
function deleteRecord(){
    //create a variable
    let id =document.getElementById("delete-id").value;
      let closeModal =  bootstrap.Modal.getInstance(document.getElementById('deleteRecordModal'))
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
    method: 'DELETE',
    headers: myHeaders
};
fetch(`${baseUrl}/api/deletebyid/${id}`, requestOptions)
    .then(response => response.json())
    .then(data =>{


window.alert(data);
getInventoryItems();
closeModal.hide();
    })
    .catch(error => console.error("Unable to delete record.", error));




}

function displayEditForm(id) {
document.getElementById('edit-id').value = id;
// API getbyid;
//find

let inventoryDetails= inventory.find(x=>x.id===id);
document.getElementById('expenses_description').value =inventoryDetails.expenses_description;
document.getElementById('mortality').value =inventoryDetails.mortality;
document.getElementById('quantity').value =inventoryDetails.quantity;
document.getElementById('amount').value =inventoryDetails.amount;
document.getElementById('analysisType').value =inventoryDetails.analysisType;
document.getElementById('comment').value =inventoryDetails.comment;
}
 function updateRecord(){
let expenses_description= document.getElementById('expenses_description');
let mortality= document.getElementById('mortality');
let quantity= document.getElementById('quantity').value;
let amount= document.getElementById('amount').value;
let analysisType= document.getElementById('analysisType').value;
let comment= document.getElementById('comment').value;
let id = document.getElementById('edit-id').value;


if(!expenses_description.value){
expenses_description.style.borderColor="red";
return ;
}
else{
    expenses_description.style.borderColor="#ced4da"
}

if(!mortality.value){
    mortality.style.borderColor="red";
return;
}
else{
    mortality.style.borderColor="#ced4da"
}

const objBody={
    expenses_description: expenses_description.value,
    mortality: mortality.value,
    quantity: quantity,
    amount: amount,
    analysisType: analysisType,
    comment: comment,
}
var editModal =  bootstrap.Modal.getInstance(document.getElementById('editInventoryModal'))
  
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization","Bearer e3erfghgghgghghgghghghggygfggfffgf")
var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body:JSON.stringify(objBody)
};
fetch(`${baseUrl}/api/updateRecord/${id}`, requestOptions)
    .then(response => response.json())
    .then(data =>{


window.alert(data);
getInventoryItems();
editModal.hide();
    })
    .catch(error => console.error("Unable to update farm inventory data.", error));





}



function displayNewInventoryForm(){
   

}

function saveData(){
    //
    let expenses_description= document.getElementById('exp_desc').value;
    let mortality= document.getElementById('mty').value;
    let quantity= document.getElementById('qty').value;
    let amount= document.getElementById('amt').value;
    let analysisType= document.getElementById('anaType').value;
    let comment= document.getElementById('cmt').value;

    // if no value is supplied to each field
    if(!(comment && expenses_description  && amount && quantity && mortality)){
        alert("All fields required");
        
      return;
      }

    const bodyData=JSON.stringify({
        "mortality":mortality,
        "expenses_description":expenses_description,
        "quantity": quantity,
   "amount": amount,
   "comment": comment,
   "analysisType":analysisType
 });
 
    var exitModal =  bootstrap.Modal.getInstance(document.getElementById('addInventoryModal'))
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body:bodyData,
};
fetch(`${baseUrl}/api/postData/`, requestOptions)
    .then(response => response.json())
    .then(data =>{
       
        window.alert(data.message);
        getInventoryItems();
        exitModal.hide();
            })
            .catch(error => console.error("Unable to post farm inventory data.", error));
}



getInventoryItems();




