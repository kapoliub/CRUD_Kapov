function addNewEmployeeButtonClick(){
    $('#employeeForm').toggle();
    getFocus();
    if($('#editTitle').is(':visible')){
        closeForm();
        $('#employeeForm').toggle();
    }
}

function getFocus() {           
    $("#nameInput").focus();
}

function changeCheckboxesValue(){
    if($('#mainCheckbox').prop("checked") == true){
        $('.checkboxData').each(function(){
            $(this).prop('checked', true);
        })
    }
    else{
        $('.checkboxData').each(function(){
            $(this).prop('checked', false);
        })
    }
}

function deleteSelectedItems(){
    $('.checkboxData').each(function(){
        if($(this).prop('checked') == true){
            $(this).closest('tr').remove();
        }
    })
    $('#mainCheckbox').prop('checked', false);
}

function closeForm(){
    $('#addTitle').show();
    $('#editTitle').hide();
    $('#addEmployee').show();
    $('#hidenEditBtn').hide()
    $('#employeeForm').hide();
    
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
    let oldUserName = $(`#${id} .userName`);
    let oldUserEmail = $(`#${id} .userEmail`);
    let oldUserAddress= $(`#${id} .userAddress`);
    let oldUserPhone = $(`#${id} .userPhone`);

    $('#nameInput').val(oldUserName.text());
    $('#emailInput').val(oldUserEmail.text());
    $('#addressInput').val(oldUserAddress.text());
    $('#phoneInput').val(oldUserPhone.text());
    
    $('#addTitle').hide();
    $('#editTitle').show();
    $('#addEmployee').hide();
    $('#hidenEditBtn').show()
    $('#employeeForm').show();
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

    $(`#${savedID} .userName`).text(newUserData.name);
    $(`#${savedID} .userEmail`).text(newUserData.email);
    $(`#${savedID} .userAddress`).text(newUserData.address);
    $(`#${savedID} .userPhone`).text(newUserData.phone);

    $('#employeeForm').removeAttr('customAttrID');
    closeForm();
}

function setDefaultInputBorders(){
    $('#nameInput').css('border', '1px solid #c5c6c7');
    $('#emailInput').css('border', '1px solid #c5c6c7');
    $('#addressInput').css('border', '1px solid #c5c6c7');
    $('#phoneInput').css('border', '1px solid #c5c6c7');
}

function checkInputValuesRequires(){
    if($('#nameInput').val().trim().length < 1){
        $('#nameInput').css('border','3px solid #cb444bcc');
        return
    }    
    if($('#emailInput').val().trim().length < 1 || $('#emailInput').val().indexOf('@') < 0){
        $('#emailInput').css('border','3px solid #cb444bcc');
        return
    }
    if($('#addressInput').val().trim().length < 1){
        $('#addressInput').css('border','3px solid #cb444bcc');
        return
    }
    if($('#phoneInput').val().trim().length < 10){
        $('#phoneInput').css('border','3px solid #cb444bcc');
        return
    }
    return true;
}

function createNewElement(){
    let randomID = String('userID-' + Math.random() * 1000000).split('.')[0];
    setDefaultInputBorders();
    if(checkInputValuesRequires() == true){
        $('<tr>',{
            id : randomID,
            class : 'userRow'
        }).appendTo($('#inputDataArea'));
        $('<td>',{
            class : 'userCheckbox'
        }).appendTo($(`#${randomID}`));
        $('<td>',{
            class : 'userName'
        }).appendTo($(`#${randomID}`));
        $('<td>',{
            class : 'userEmail'
        }).appendTo($(`#${randomID}`));
        $('<td>',{
            class : 'userAddress'
        }).appendTo($(`#${randomID}`));
        $('<td>',{
            class : 'userPhone'
        }).appendTo($(`#${randomID}`));
        $('<td>',{
            class : 'userButtonsArea'
        }).appendTo($(`#${randomID}`));
    
        $('<input>', {
            type : 'checkbox',
            class : 'checkboxData'
        }).appendTo($(`#${randomID} .userCheckbox`));
        
        $('<button>',{
            class : 'editBtn',
            'data-title' : 'Edit'
        }).appendTo($(`#${randomID} .userButtonsArea`))
        $('<button>',{
            class : 'deleteBtn',
            'data-title' : 'Delete'
        }).appendTo($(`#${randomID} .userButtonsArea`))
    
        $('<i>',{
            class : 'fas fa-pen'
        }).appendTo($(`#${randomID} .editBtn`))
        $('<i>',{
            class : 'fas fa-trash-alt'
        }).appendTo($(`#${randomID} .deleteBtn`))
    
        $(`#${randomID} .editBtn`).on('click', function(){
            editButtonClick(randomID);
        })
        
        $(`#${randomID} .deleteBtn`).on('click', function(){
            deleteUserRow(randomID);
        })
    
        $(`#${randomID} .userName`).text($('#nameInput').val());
        $(`#${randomID} .userEmail`).text($('#emailInput').val());
        $(`#${randomID} .userAddress`).text($('#addressInput').val());
        $(`#${randomID} .userPhone`).text($('#phoneInput').val());
    
        closeForm();
    }
}

// _________key events_________
$('#employeeForm').on('keyup', function(e){
    if(e.keyCode == 27){
        closeForm();
    }
    if(e.keyCode == 13){
        if($('#editTitle').is(':visible') && $('#employeeForm').is(':visible')){
            updateEmployeeInfo();
        }
        else if($('#employeeForm').is(':visible') && $('#addTitle').is(':visible')){
            createNewElement();
        }
    }
});