function addNewEmployeeButtonClick(){
    inputsErrorReset();
    $('#employeeForm').toggle();
    $("#nameInput").focus();
    if($('#editTitle').is(':visible')){
        closeForm();
        $('#employeeForm').toggle();
    }
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
    $('#addTitle, #addEmployee ').show();
    $('#editTitle, #hidenEditBtn, #employeeForm').hide();
    $('#nameInput, #emailInput, #addressInput, #phoneInput').val('');
    inputsErrorReset();
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
    
    $('#addTitle, #addEmployee').hide();
    $('#editTitle, #hidenEditBtn, #employeeForm').show();
    $("#nameInput").focus();
    //______save our ID________
    $('#employeeForm').attr('customAttrID', id);
}

function updateEmployeeInfo(){
    inputsErrorReset();
    if(!checkInputValuesRequires()){
        return
    }
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

function inputsErrorReset(){
let errorReset = {
    prop: 'box-shadow',
    value: 'none'
};

    $('#nameInput, #emailInput, #addressInput, #phoneInput').css(errorReset.prop, errorReset.value);
}

function checkInputValuesRequires(){
    let error = {
        prop: 'box-shadow',
        value: '0 0 0 2pt #cb444bcc'
    };

    let input1 = false;
    let input2 = false;
    let input3 = false;
    let input4 = false;

    if($('#nameInput').val().trim().length < 1 || $('#nameInput').val().match(/\d/)){
        $('#nameInput').css(error.prop, error.value);
    }    
    else{
        input1 = true;
    }
    if(!$('#emailInput').val().match(/@/)){
        $('#emailInput').css(error.prop, error.value);
    }

    else{
        input2 = true;
    }
    if($('#addressInput').val().trim().length < 1){
        $('#addressInput').css(error.prop, error.value);
    }
    else{
        input3 = true;
    }
    if($('#phoneInput').val().trim().length < 7 || !$('#phoneInput').val().match(/\+\d/)){
        $('#phoneInput').css(error.prop, error.value);
    }
    else{
        input4 = true;
    }

    if(input1 && input2 && input3 && input4){
        return true
    }
}

function createNewElement(){
    let randomID = String('userID-' + Math.random() * 1000000).split('.')[0];
    inputsErrorReset();
    if(!checkInputValuesRequires()){
        return
    }
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

// _________key events_________
$(function(){
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
});