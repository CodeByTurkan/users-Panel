const userData =  document.getElementById('userData')
const newUserModal =  document.getElementById('newUserModal')
const fullname =  document.getElementById('fullname')
const email =  document.getElementById('email')
const addStatus =  document.getElementById('addStatus');
const searchStatus =  document.getElementById('searchStatus')
const searchUser =  document.getElementById('searchUser')

// get data
let filterData = []
async function getData() {
    const res = await fetch('https://680677f7e81df7060eb7408e.mockapi.io/user')
    const data = await res.json()
    showData(data)
    filterData = data
    console.log(data);
 }
 getData()


//  showUsers on screen
 function showData(data) {
    // if (!data.length) kod = <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-yellow-600"></div>
    // baxirsanki arrayin ici bosdursa
    let code = ''
    data.forEach(elm => {
        let createdDate = elm.createdAt
        let filteredDate = createdDate.split('T')[0]
        // .split('-').join(':')  if you wish
        // we cut until t and now have two parts before and after t which is 0 and 1 in index, so we took 0 first part
        code += 
            `   <div class="flex items-center justify-between w-[95%]">
                    <img src="${elm.avatar}" alt="" class="w-12 h-12 rounded-full object-cover" >
                    <p>${elm.fullname}</p>
                    <p>${elm.email}</p>
                    <p>${elm.status}</p>
                    <p> ${filteredDate} </p>
                    <div class="flex items-center justify-between text-orange-600">
                        <i onclick="cleanInput(${elm.id})" class="fa-solid fa-pen-to-square"></i>
                        <i onclick="deleteChanges(${elm.id})" class="fa-solid fa-trash px-2"></i>
                    </div>
                </div>
            `
    });
    userData.innerHTML = code
    
 }

 

//  function searchforUser() {
//     const filteredUser = searchUser.value
//     const filtered = filterData.filter(elm => {
//         return elm.fullname.toLowerCase().includes(filteredUser)
//     })
//     showData(filtered)
//  }
//  searchUser.addEventListener("input", searchforUser)
// //  ancaw lazim oldugu zaman yeni inputa nese yazanda funksiya islesin./ adi funksiya ise ancaq bir defe isleyir.

// function showStatus() {
//     const search = searchStatus.value
//         if (search === '') {
//             showData(filterData)   //i dont need innethtml but its fucntion
//         }else{
//             const filtered = filterData.filter(elm =>{
//                 return elm.status === search
//                 // elm.status yeni mockapideki eger deyeere = olarsa
//             })
//             showData(filtered)
//         }
// }


// filter
function nameAndStatus() {
    const search = searchStatus.value.toLowerCase()
    const filteredUser = searchUser.value.toLowerCase()
    // men hem verdiyimi hemde aldigimi lower  case cevirirem
    
    const filtered = filterData.filter(elm =>{
        let chooseInput = elm.fullname.toLowerCase().includes(filteredUser)
        let chooseSearch = search === '' || elm.status.toLowerCase() === search
        return chooseInput && chooseSearch
    })
    showData(filtered)
    
}
searchStatus.addEventListener('input', nameAndStatus)
searchUser.addEventListener('input', nameAndStatus);

// show modal
function newUser() {
    newUserModal.classList.remove('hidden')
    fullname.value = ''
    email.value = ''
    addStatus.value = 'Active'
}
// closemodal
function closeModal() {
    newUserModal.classList.add('hidden')
}
//  cancel button in modal
function cancelChanges() {
    newUserModal.classList.add('hidden')
}

// add new users
function saveChanges() {
    console.log(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`);
    
    fetch('https://680677f7e81df7060eb7408e.mockapi.io/user',{
        method:'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            fullname: fullname.value,
            email: email.value,
            status: addStatus.value
            // we write value insdie the status,  after id it can reach to the value.
        })
    })
    .then(res => {
        if (res.ok) {
            getData()
            closeModal()
            return res.json();
        }
    })
    .then(data => {
        getData();
        
    })
}


// delete users with Fetch
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
    })
    .then(data => {
        getData();
    })
}

// clean user inputs

let editedId = ''
function cleanInput(id) {
    // elm.id = 3 - onu goturdun - sonra 3 numberle element tapdin.
   const selectedElment =  filterData.find(item => item.id === id.toString())
   console.log(selectedElment);
   

    // basdigim yerin id-si elmentin id-sine = olmasi.
    newUserModal.classList.remove('hidden')
    save.classList.add('hidden')
    edit.classList.remove('hidden')

    fullname.value = selectedElment.fullname,
    email.value = selectedElment.email,
    addStatus.value = selectedElment.status

    editedId = selectedElment.id
}


// editUsers
const save = document.getElementById('save')
const edit = document.getElementById('edit')
function editChanges() {
    fetch(`https://680677f7e81df7060eb7408e.mockapi.io/user/${editedId}`,{
        method: 'PUT',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            fullname: fullname.value,
            email: email.value,
            status: addStatus.value
        })
    })
        .then(res => {
            if (res.ok) {
                res.json()
            }
        })
        .then(data => {
            getData()
            newUserModal.classList.add('hidden')
        })

    
}
// hansi ist duzeltmek isteyyirikse, onun  formatini ve neleri duzletmek isteyirik, fetch headers ve  bodyde gonderririk, sorna gelenn res okaydirsa cavabi jsonda  cekirik, cunki bur formatda gondermisiak ve bizim komp backdan infonu bele goturur. sonrada deyisikliyi datada cixaririq. alian melumat getdataya daxil olurki ordanda showdata oturulur. get data apidan yenilemmiss melumati elde etmek ve onu showdataya cixarmaq ucundu.


