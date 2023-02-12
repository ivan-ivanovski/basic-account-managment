
window.addEventListener('beforeunload', save);


let accoutsTableBody = document.querySelector("#accounts-table-body");

let allViewLinks = document.querySelectorAll(".nav-link");
let allViews = document.querySelectorAll(".view");
let viewAccounts = document.querySelector('#view-accounts-content');
let viewAddAccount = document.querySelector('#view-add-account');
//For Save Account
let idInput = document.querySelector('[placeholder="id"');
let firstNameInput = document.querySelector('[placeholder="First_name"');
let lastNameInput = document.querySelector('[placeholder="Last_name"');
let emailInput = document.querySelector('[placeholder="E-mail"');
let phoneInput = document.querySelector('[placeholder="Phone"');
let btnSaveAccount = document.querySelector('#btnSaveAccount');

let id;
/* console.log(idInput);
console.log(firstNameInput);
console.log(lastNameInput);
console.log(emailInput);
console.log(phoneInput);
console.log(btnSaveAccount);
*/

//for edit account 

let editId = document.querySelector("#editId");
let editFirstName = document.querySelector("#edit-FirstName");
let editLastName = document.querySelector("#edit-LastName");
let editEmail = document.querySelector("#editEmail");
let editPhone = document.querySelector("#editPhone");
let editAccountBtn = document.querySelector("#editSaveAccount");


//Button Save call function Save Account, with that we add new account to table
btnSaveAccount.addEventListener("click", saveAccount);
//Edit
editAccountBtn.addEventListener("click", saveEditedAccount);

function saveEditedAccount(){
    const editAccount = {
        id : editId.value,
        first_name: editFirstName.value,
        last_name: editLastName.value,
        email: editEmail.value,
        phone: editPhone.value 
    }

    accounts_db[id] = editAccount;
    CreateAccountsTable();
    showView("#view-accounts-content")
    //console.log(editAccount);
}

function saveAccount(){


    const newAccount ={
        id : idInput.value,
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value 
    };

    accounts_db.push(newAccount);

    idInput.value = "";
    firstNameInput.value = "";
    lastNameInput.value ="";
    emailInput.value="";
    phoneInput.value="";

    CreateAccountsTable();
    showView("#view-accounts-content");

}

for (let i=0;i<allViewLinks.length;i++) {
    allViewLinks[i].addEventListener('click', showView);
}

function showView(e){
    for (let i = 0; i < allViews.length; i++) {
        allViews[i].style.display = "none";
    }
    if(e instanceof Event){
        e.preventDefault();
        let thisNavLinkId = `#${this.getAttribute("href")}`;
        document.querySelector(thisNavLinkId).style.display = "block";
    }
    else{
        document.querySelector(e).style.display = "block";
    } 
}

//console.log(allViewLinks);




CreateAccountsTable();

function CreateAccountsTable(){
    let htmlAccounts = ``;
    for (let i = 0; i < accounts_db.length; i++) {
        const account = accounts_db[i];
        htmlAccounts +=`
        <tr>
            <td>${account.id}</td>
            <td>${account.first_name}</td>
            <td>${account.last_name}</td>
            <td>${account.email}</td>
            <td>${account.phone}</td>
            <td><button data-id="${i}" class="btn-edit btn btn-warning btn-sm form-control">Edit</button></td>
            <td><button data-id="${i}" class="btn-remove btn btn-sm btn-danger form-control">Remove</button></td>
        </tr>
        `
    }
    accoutsTableBody.innerHTML = htmlAccounts;

    let allRemoveBtn = document.querySelectorAll(".btn-remove");
    let allEditBtns = document.querySelectorAll(".btn-edit");

    for(let i=0;i<allRemoveBtn.length;i++){
        allRemoveBtn[i].addEventListener("click", removeAddAccout);
        allEditBtns[i].addEventListener("click", editSelectedAccount);
    }
    //console.log(htmlAccounts);
}


function removeAddAccout(){
    let dataId = this.getAttribute('data-id');
    accounts_db.splice(dataId, 1);
    CreateAccountsTable();
    showView("#view-accounts-content");
    console.log(dataId);
    //alert("Account Removed from list");
}

function editSelectedAccount(){
    id = this.getAttribute('data-id');
    let selectedAccount = accounts_db[id];
    editId.value = selectedAccount.id;
    editFirstName.value = selectedAccount.first_name;
    editLastName.value = selectedAccount.last_name;
    editEmail.value = selectedAccount.email;
    editPhone.value = selectedAccount.phone;

    showView("#view-edit-account");
}




function save(){
    localStorage.accounts_db = JSON.stringify(accounts_db);
}

/* let btnViewAccountsContent = document.querySelector('[href="view-accounts-content"]');
let btnViewAddAccount = document.querySelector('[href="view-add-account"]');


console.log(btnViewAccountsContent);
console.log(btnViewAddAccount);
console.log(viewAccounts);
console.log(viewAddAccount);

btnViewAddAccount.addEventListener('click',  function(e){
    e.preventDefault();
    viewAccounts.style.display="none";
    viewAddAccount.style.display = "block";
});

btnViewAccountsContent.addEventListener('click', function(e){
    e.preventDefault();
    viewAddAccount.style.display="none";
    viewAccounts.style.display="block";
}) */