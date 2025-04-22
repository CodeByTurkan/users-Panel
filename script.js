const userData =  document.getElementById('userData')
const newUserModal =  document.getElementById('newUserModal')
const fullname =  document.getElementById('fullname')
const email =  document.getElementById('email')


async function getData() {
    const res = await fetch('https://680677f7e81df7060eb7408e.mockapi.io/user')
    const data = await res.json()
    showData(data)
    console.log(data);
 }
 getData()

 function showData(data) {
    
    let code = ''
    data.forEach(elm => {
        let createdDate = elm.createdAt
        let filteredDate = createdDate.split('T')[0]
        // .split('-').join(':')  if you wish
        // we cut until t and now have two parts before and after t which is 0 and 1 in index, so we took 0 first part
        code += 
            `   <div class="flex justify-between w-[95%]">
                    <p>${elm.avatar}</p>
                    <p>${elm.fullname}</p>
                    <p>${elm.email}</p>
                    <p>${elm.status}</p>
                    <p> ${filteredDate} </p>
                    <div class="flex items-center justify-between text-orange-600">
                        <i onclick="editChanges(${elm.id})" class="fa-solid fa-pen-to-square"></i>
                        <i onclick="deleteChanges(${elm.id})" class="fa-solid fa-trash px-2"></i>
                    </div>
                </div>
            `
    });
    userData.innerHTML = code
 }
// let data = '2015.. '
//  let fileteredDate = date
//  let fileteredDate  = data.split('T')[0].split('-').join(':')
//  fileteredDate  = fileteredDate.split('-').join(':')

function newUser() {
    newUserModal.classList.remove('hidden')
}
function closeModal() {
    newUserModal.classList.add('hidden')
}
function cancelChanges() {
    newUserModal.classList.add('hidden')
}

// after checking that we can get data, now we can add more data.
function saveChanges() {
    const addStatus =  document.getElementById('addStatus');
    console.log(addStatus.value);
    
    fetch('https://680677f7e81df7060eb7408e.mockapi.io/user',{
        method:'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            fullname: fullname.value,
            email: email.value,
            status: addStatus.value
            // we write value insdie the status,  after id it can reach to the value.
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        getData();
    })
}
function deleteChanges(id) {
    fetch(`https://680677f7e81df7060eb7408e.mockapi.io/user/${id}`,{
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        getData();
    })
}

function editChanges(id) {
    
}

