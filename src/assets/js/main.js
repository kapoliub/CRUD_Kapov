//_____open/close new employee form_________________
function addNewEmployeeButtonClick(){
    $('#employeeForm').toggleClass('hidden');
    focusMethod();
    if($('#addTitle').hasClass('hidden')){
        closeForm();
        $('#employeeForm').toggleClass('hidden');
    }
}
focusMethod = function getFocus() {           
    $("#nameInput").focus();
}
//_____main checkbox changer_______________
function changeCheckboxesValue(elem){
    let checkBoxes = $('.checkboxData');
    if(elem.checked){
        for(let i = 0; i < checkBoxes.length; i++){
            checkBoxes[i].checked = true;
        }
        // $('.checkboxData').each(function(){
        //     $(this).checked = true;
        // })
    }
    else{
        for(let i = 0; i < checkBoxes.length; i++){
            checkBoxes[i].checked = false;;
        }
        // $('.checkboxData').each(function(){
        //     $(this).checked = false;
        // })
    }
}
//_____________delete checked items____________________
function deleteSelectedItems(){
    let checkboxes = $('.checkboxData');
    let tr = $('.userRow');
    for (let i = checkboxes.length-1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            tr[i].remove();
        }
    }
    $('#mainCheckbox').checked = false;
    closeForm();
}
//_________reset form to default values____________
function closeForm(){
    $('#addTitle').removeClass('hidden');
    $('#editTitle').addClass('hidden');
    $('#addEmployee').removeClass('hidden');
    $('#hidenEditBtn').addClass('hidden')
    $('#employeeForm').addClass('hidden');
    
    $('#nameInput').val('');
    $('#emailInput').val('');
    $('#addressInput').val('');
    $('#phoneInput').val('');
}
//__________delete row __________________________
function deleteUserRow(id){
    $('#' + id).remove();
    closeForm();
}
//___________edit button click___________________
function editButtonClick(id){
    let oldUserName = $('#' + id + ' .userName');
    let oldUserEmail = $('#' + id + ' .userEmail');
    let oldUserAddress= $('#' + id + ' .userAddress');
    let oldUserPhone = $('#' + id + ' .userPhone');

    $('#nameInput').val(oldUserName.text());
    $('#emailInput').val(oldUserEmail.text());
    $('#addressInput').val(oldUserAddress.text());
    $('#phoneInput').val(oldUserPhone.text());
    
    $('#addTitle').addClass('hidden');
    $('#editTitle').removeClass('hidden');
    $('#addEmployee').addClass('hidden');
    $('#hidenEditBtn').removeClass('hidden')
    $('#employeeForm').removeClass('hidden');
    focusMethod();
    //______save our ID________
    $('#employeeForm').attr('customAttrID', id);
}
//__________update employee data_________________
function updateEmployeeInfo(){
    let newUserData = {
        name : $('#nameInput').val(),
        email : $('#emailInput').val(),
        address : $('#addressInput').val(),
        phone : $('#phoneInput').val()
    }

    let savedID = $('#employeeForm').attr('customAttrID');

    $('#' + savedID + ' .userName').text(newUserData.name);
    $('#' + savedID + ' .userEmail').text(newUserData.email);
    $('#' + savedID + ' .userAddress').text(newUserData.address);
    $('#' + savedID + ' .userPhone').text(newUserData.phone);

    $('#employeeForm').removeAttr('customAttrID');
    closeForm();
}
//_________create a new element__________________
function createNewElement(){
    let randomID = String('userID-' + Math.random() * 1000000).split('.')[0];
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

    userRow.classList.add('userRow')
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
$(window).on('keyup', function(e){
    if(e.keyCode == 27){
        closeForm();
    }
    if(e.keyCode == 13){
        if($('#addEmployee').hasClass('hidden')){
            updateEmployeeInfo();
        }
    }
});

$('#phoneInput').on('keyup', function(e){
    if(e.keyCode == 13){
        $('#addEmployee').click();
    }
})




