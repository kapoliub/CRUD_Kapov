let employeeForm = document.getElementById('employeeForm');
    document.getElementById('newEmployee').addEventListener('click', function(){
        employeeForm.classList.toggle('hideForm');
    })

function changeCheckbox(elem){
    let checkBoxes = document.getElementsByClassName('inputCheckbox');
    if(elem.checked){
        for(let i = 0; i < checkBoxes.length; i++){
            checkBoxes[i].checked = true;
        }
    }
    else{
        for(let i = 0; i < checkBoxes.length; i++){
            checkBoxes[i].checked = false;;
        }
    }
}

function deleteItems(){
    let checkboxes = document.getElementsByClassName('inputCheckbox');
    let tr = document.getElementsByTagName('tr');
    for (let i = checkboxes.length-1; i >= 0; i--) {
    let checkboxes = document.getElementsByClassName('inputCheckbox');
        if (checkboxes[i].checked) {
            tr[i+1].remove();
        }
    }
    document.getElementById('mainCheckbox').checked = false;
}




function closeForm(){
    addTitle.classList.remove('hideTitle');
    editTitle.classList.add('hideTitle');
    addEmployee.classList.remove('hideBtn');
    hidenEditBtn.classList.add('hideBtn')
    employeeForm.classList.add('hideForm');
    name.value = '';
    email.value = '';
    address.value = '';
    phone.value = '';
}

function createEmployeeID(){
    let n = 0;
    const myFunction = function(){
        let input = 'inputID';
        let name = "nameID";
        let email = "emailID";
        let address = "addressID";
        let phone = "phoneID";
        let editBtn = "editBtnID";
        let deleteBtn = "deleteBtnID";
        n++;
        return obj = {
            inputID : input += n,
            nameID : name += n,
            emailID : email += n,
            addressID : address += n, 
            phoneID : phone += n, 
            editBtnID : editBtn += n,
            deleteBtnID : deleteBtn += n,
            n : n 
        };
    }
    return myFunction;
}
let createID = createEmployeeID();


let name = document.getElementById('nameInput');
let email = document.getElementById('emailInput');
let address = document.getElementById('addressInput');
let phone = document.getElementById('phoneInput');
let addEmployee = document.getElementById('addEmployee');


addEmployee.addEventListener('click', function(){
    if(name.value != '' && email.value != '' && address.value != '' && phone.value != ''){
        let tr = document.createElement('tr');
        let td = [];
        createID();
        
        for(let i = 0; i < 6; i++){
            td[i] = document.createElement('td');
        }
        
        let input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', obj.inputID);
        input.classList.add('inputCheckbox');
        td[0].prepend(input);
        tr.prepend(td[0]);
        
        td[1].innerHTML = name.value;
        td[1].setAttribute('id', obj.nameID);
        td[1].classList.add('nameField');
        tr.append(td[1]);
        
        td[2].innerHTML = email.value;
        td[2].setAttribute('id', obj.emailID);
        td[2].classList.add('emailField');
        tr.append(td[2]);
        
        td[3].innerHTML = address.value;
        td[3].setAttribute('id', obj.addressID);
        td[3].classList.add('addressField');
        tr.append(td[3]);
        
        td[4].innerHTML = phone.value;
        td[4].setAttribute('id', obj.phoneID);
        td[4].classList.add('phoneField');
        tr.append(td[4]);
        
        let editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.setAttribute('id', obj.editBtnID);
        editBtn.setAttribute('data-title', 'Edit');
        let iPen = document.createElement('i');
        iPen.classList.add('fas');
        iPen.classList.add('fa-pen');
        editBtn.append(iPen);
        // for(let i = 0; i < obj.n; i++){
        //     let btnEd = document.getElementById(obj.editBtnID);
        //     btnEd.addEventListener('click', function(){
        //         console.log('hello' + i);
        //     })
        // }

        td[5].prepend(editBtn);
        tr.prepend(td[5]);
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.setAttribute('id', obj.deleteBtnID);
        deleteBtn.setAttribute('data-title', 'Delete');
        let iTrash = document.createElement('i');
        iTrash.classList.add('fas');
        iTrash.classList.add('fa-trash-alt');
        deleteBtn.append(iTrash);
        deleteBtn.addEventListener('click', function(){
            tr.remove();
        })
        td[5].append(deleteBtn);
        tr.append(td[5]);

        document.getElementById('table').append(tr);
        closeForm();
    }
});


