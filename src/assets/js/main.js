//_____open/close new employee form_________________
function addNewEmployeeButton(){
    document.getElementById('employeeForm').classList.toggle('hidden');
    if(document.getElementById('addTitle').classList.contains('hidden')){
        closeForm();
        document.getElementById('employeeForm').classList.toggle('hidden');
    }
}
//_____main checkbox changer_______________
function changeCheckboxesValue(elem){
    let checkBoxes = document.getElementsByClassName('checkboxData');
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
//_____________delete checked items____________________
function deleteSelectedItems(){
    let checkboxes = document.getElementsByClassName('checkboxData');
    let tr = document.getElementsByTagName('tr');
    for (let i = checkboxes.length-1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            tr[i+1].remove();
        }
    }
    document.getElementById('mainCheckbox').checked = false;
    closeForm();
}
//_________reset form to default values____________
function closeForm(){
    document.getElementById('addTitle').classList.remove('hidden');
    document.getElementById('editTitle').classList.add('hidden');
    document.getElementById('addEmployee').classList.remove('hidden');
    document.getElementById('hidenEditBtn').classList.add('hidden')
    document.getElementById('employeeForm').classList.add('hidden');
    
    document.querySelector('#nameInput').value = '';
    document.querySelector('#emailInput').value = '';
    document.querySelector('#addressInput').value = '';
    document.querySelector('#phoneInput').value = '';
}
//__________delete row __________________________
function deleteUserRow(id){
    document.getElementById(id).remove();
    closeForm();
}
//___________edit button click___________________
function editButtonClick(id){
    let oldUserName = document.querySelector('#' + id + ' .userName');
    let oldUserEmail = document.querySelector('#' + id + ' .userEmail');
    let oldUserAddress= document.querySelector('#' + id + ' .userAddress');
    let oldUserPhone = document.querySelector('#' + id + ' .userPhone');
    document.querySelector('#nameInput').value = oldUserName.innerText;
    document.querySelector('#emailInput').value = oldUserEmail.innerText;
    document.querySelector('#addressInput').value = oldUserAddress.innerText;
    document.querySelector('#phoneInput').value = oldUserPhone.innerText;
    
    document.getElementById('addTitle').classList.add('hidden');
    document.getElementById('editTitle').classList.remove('hidden');
    document.getElementById('addEmployee').classList.add('hidden');
    document.getElementById('hidenEditBtn').classList.remove('hidden')
    document.getElementById('employeeForm').classList.remove('hidden');

    //______save our ID________
    document.querySelector('#employeeForm').setAttribute('customAttrID', id);
}
//__________update employee data_________________
function updateEmployeeInfo(id){
    let newUserData = {
        name : document.querySelector('#nameInput').value,
        email : document.querySelector('#emailInput').value,
        address : document.querySelector('#addressInput').value,
        phone : document.querySelector('#phoneInput').value
    }

    let savedID = document.querySelector('#employeeForm').getAttribute('customAttrID');
    document.querySelector('#' + savedID + ' .userName').innerText = newUserData.name;
    document.querySelector('#' + savedID + ' .userEmail').innerText = newUserData.email;
    document.querySelector('#' + savedID + ' .userAddress').innerText = newUserData.address;
    document.querySelector('#' + savedID + ' .userPhone').innerText = newUserData.phone;

    document.querySelector('#employeeForm').removeAttribute('customAttrID');
    closeForm();
    
}
//_________create a new element__________________
function createNewElement(){
    let randomID = String('userID' + Math.random() * 1000000).split('.')[0];
    let employeeForm = document.querySelector('#employeeForm');
    let userName = document.querySelector('#employeeForm #nameInput');
    let userEmail = document.querySelector('#employeeForm #emailInput');
    let userAddress = document.querySelector('#employeeForm #addressInput');
    let userPhone = document.querySelector('#employeeForm #phoneInput');
    if(userName.value.trim().length < 1 || userEmail.value.trim().length < 1 || userAddress.value.trim().length < 1 || userPhone.value.trim().length < 1){
        return;
    }
    //__________________________________________
    let userDataTable = document.querySelector('#userDataTable');
    let userRow = document.createElement('tr');
    //__________________________________________
    let userRowInput = document.createElement('td');
    let userRowName = document.createElement('td');
    let userRowEmail = document.createElement('td');
    let userRowAddress = document.createElement('td');
    let userRowPhone = document.createElement('td');
    let userRowButtonsArea = document.createElement('td');
    //_______________________________________________
    let userRowCheckbox = document.createElement('input');
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    //_____________________________________
    userRowInput.appendChild(userRowCheckbox);
    userRowCheckbox.setAttribute('type', 'checkbox');
    userRowCheckbox.classList.add('checkboxData');

    editButton.classList.add('editBtn');
    editButton.setAttribute('data-title', 'Edit');
    let penIcon = document.createElement('i');
    penIcon.classList.add('fas');
    penIcon.classList.add('fa-pen');
    editButton.append(penIcon);
    editButton.addEventListener('click', function(){
        editButtonClick(randomID);
    })

    deleteButton.classList.add('deleteBtn');
    deleteButton.setAttribute('data-title', 'Delete');
    let trashIcon = document.createElement('i');
    trashIcon.classList.add('fas');
    trashIcon.classList.add('fa-trash-alt');
    deleteButton.append(trashIcon);
    deleteButton.addEventListener('click', function(){
        deleteUserRow(randomID);
    })

    userRowButtonsArea.appendChild(editButton);
    userRowButtonsArea.appendChild(deleteButton);
    //_____________________________________________
    userRow.appendChild(userRowInput);
    userRow.appendChild(userRowName);
    userRow.appendChild(userRowEmail);
    userRow.appendChild(userRowAddress);
    userRow.appendChild(userRowPhone);
    userRow.appendChild(userRowButtonsArea);

    userDataTable.appendChild(userRow);

    userRow.setAttribute('id', randomID);

    userRowName.classList.add('userName');
    userRowEmail.classList.add('userEmail');
    userRowAddress.classList.add('userAddress');
    userRowPhone.classList.add('userPhone');

    userRowName.innerText = userName.value;
    userRowEmail.innerText = userEmail.value;
    userRowAddress.innerText = userAddress.value;
    userRowPhone.innerText = userPhone.value;
    //_________________________________________
    userName.value = '';
    userEmail.value = '';
    userAddress.value = '';
    userPhone.value = '';
    closeForm();
}

// _________key event_________
window.addEventListener('keyup', function(e){
    {
        if(e.keyCode == 27){
        closeForm();
        }
    }
    {
        // if(e.keyCode == 13){
        //     if(document.querySelector('#addTitle').classList.contains('hidden')){
        //         document.getElementById('hidenEditBtn').click();
        //     }
        //     // else if(document.getElementById('employeeForm').classList.contains('hidden')==false){
        //     //     if(document.getElementById('addTitle').classList.contains('hidden')==false){
        //     //         document.getElementById('addEmployee').click();
        //     //     }                
        //     // }
        // }
    }
});


