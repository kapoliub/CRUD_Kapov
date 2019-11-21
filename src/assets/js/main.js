let employeeForm = document.getElementById('employeeForm');
    document.getElementById('newEmployee').addEventListener('click', function(){
        employeeForm.classList.toggle('hideForm');
    })

function closeForm(){
    employeeForm.classList.add('hideForm');
}
{
    let name = document.getElementById('nameInput');
    let email = document.getElementById('emailInput');
    let address = document.getElementById('addressInput');
    let phone = document.getElementById('phoneInput');
    let addEmployee = document.getElementById('addEmployee');
    addEmployee.addEventListener('click', function(){
        if(name.value != '' && email.value != '' && address.value != '' && phone.value != ''){
            let tr = document.createElement('tr');
            let td = [];
            for(let i = 0; i < 6; i++){
                td[i] = document.createElement('td');
            }
            let input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            td[0].prepend(input);
            tr.prepend(td[0]);
            td[1].innerHTML = name.value;
            tr.append(td[1]);
            td[2].innerHTML = email.value;
            tr.append(td[2]);
            td[3].innerHTML = address.value;
            tr.append(td[3]);
            td[4].innerHTML = phone.value;
            tr.append(td[4]);
            let editBtn = document.createElement('button');
            editBtn.setAttribute('id', 'editBtn');
            editBtn.setAttribute('data-title', 'Edit');
            let iPen = document.createElement('i');
            iPen.classList.add('fas');
            iPen.classList.add('fa-pen');
            editBtn.append(iPen);
            td[5].prepend(editBtn);
            tr.prepend(td[5]);
            let deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('id', 'deleteBtn');
            deleteBtn.setAttribute('data-title', 'Delete');
            let iTrash = document.createElement('i');
            iTrash.classList.add('fas');
            iTrash.classList.add('fa-trash-alt');
            deleteBtn.append(iTrash);
            td[5].append(deleteBtn);
            tr.append(td[5]);
            document.getElementById('table').append(tr);
            name.value = '';
            email.value = '';
            address.value = '';
            phone.value = '';
            employeeForm.classList.add('hideForm');
        }
    });
}
