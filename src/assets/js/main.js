function addNewEmployeeButtonClick(){
    $('#employeeForm').toggleClass('hidden');
    getFocus();
    if($('#addTitle').hasClass('hidden')){
        closeForm();
        $('#employeeForm').toggleClass('hidden');
    }
}

function getFocus() {           
    $("#nameInput").focus();
}

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

function deleteSelectedItems(){
    let checkboxes = $('.checkboxData');
    let tr = $('.userRow');
    for (let i = checkboxes.length-1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            tr[i].remove();
        }
    }
    document.getElementById('mainCheckbox').checked = false;
    closeForm();
}

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

function deleteUserRow(id){
    $('#' + id).remove();
    closeForm();
}

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
    getFocus();
    //______save our ID________
    $('#employeeForm').attr('customAttrID', id);
}

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

function createNewElement(){
    let randomID = String('userID-' + Math.random() * 1000000).split('.')[0];
    if($('#nameInput').val().trim().length > 1){
        if($('#emailInput').val().trim().length > 1 && $('#emailInput').val().indexOf('@') >= 0){
            if($('#addressInput').val().trim().length > 1){
                if($('#phoneInput').val().trim().length > 9){
                    $('<tr>',{
                        id : randomID,
                        class : 'userRow'
                    }).appendTo($('#inputDataArea'));
                    $('<td>',{
                        class : 'userCheckbox'
                    }).appendTo($('#' + randomID));
                    $('<td>',{
                        class : 'userName'
                    }).appendTo($('#' + randomID));
                    $('<td>',{
                        class : 'userEmail'
                    }).appendTo($('#' + randomID));
                    $('<td>',{
                        class : 'userAddress'
                    }).appendTo($('#' + randomID));
                    $('<td>',{
                        class : 'userPhone'
                    }).appendTo($('#' + randomID));
                    $('<td>',{
                        class : 'userButtonsArea'
                    }).appendTo($('#' + randomID));
                
                    $('<input>', {
                        type : 'checkbox',
                        class : 'checkboxData'
                    }).appendTo($('#' + randomID + ' .userCheckbox'));
                    
                    $('<button>',{
                        class : 'editBtn',
                        'data-title' : 'Edit'
                    }).appendTo($('#' + randomID + ' .userButtonsArea'))
                    $('<button>',{
                        class : 'deleteBtn',
                        'data-title' : 'Delete'
                    }).appendTo($('#' + randomID + ' .userButtonsArea'))
                
                    $('<i>',{
                        class : 'fas fa-pen'
                    }).appendTo($('#' + randomID + ' .editBtn'))
                    $('<i>',{
                        class : 'fas fa-trash-alt'
                    }).appendTo($('#' + randomID + ' .deleteBtn'))
                
                    $('#' + randomID + ' .editBtn').on('click', function(){
                        editButtonClick(randomID);
                    })
                    
                    $('#' + randomID + ' .deleteBtn').on('click', function(){
                        deleteUserRow(randomID);
                    })
                
                    $('#' + randomID + ' .userName').text($('#nameInput').val());
                    $('#' + randomID + ' .userEmail').text($('#emailInput').val());
                    $('#' + randomID + ' .userAddress').text($('#addressInput').val());
                    $('#' + randomID + ' .userPhone').text($('#phoneInput').val());
                
                    closeForm();
                }
            }
        }
    }
}

// _________key events_________
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

$('#nameInput').on('keyup', function(e){
    if(e.keyCode == 13){
        $('#addEmployee').click();
    }
})
$('#emailInput').on('keyup', function(e){
    if(e.keyCode == 13){
        $('#addEmployee').click();
    }
})
$('#addressInput').on('keyup', function(e){
    if(e.keyCode == 13){
        $('#addEmployee').click();
    }
})
$('#phoneInput').on('keyup', function(e){
    if(e.keyCode == 13){
        $('#addEmployee').click();
    }
})




