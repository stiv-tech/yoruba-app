// function for signup
function signUp(event) {
    // prevents page reload
    event.preventDefault();

    // get spinner
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    // get values from inputs
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;
    const getConfirmPass = document.getElementById("confirmPassword").value;

    if (getName === "" || getEmail === "" || getPass === "" || getConfirmPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    if (getConfirmPass !== getPass) {
        Swal.fire({
            icon: 'info',
            text: 'Password do not match',
            confirmButtonColor: '#2D85DE'
        })
    }

    else {
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPass);
        signData.append("password_confirmation", getConfirmPass);

        const signReq = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, signReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    Icon: 'info',
                    text: 'Registration Unsuccessful!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }

}

// function to login
function logIn(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;

    if (getEmail === "" || getPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'password do not match',
            confirmButtonColor: '#2D85DE'
            
        })
        getSpin.style.display = "none";
    }
    else{
        const logForm = new FormData();
        logForm.append("email", getEmail);
        logForm.append("password", getPass);

        const logReq = {
            method: 'POST',
            body: logForm
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(url, logReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result));
            const getItem = localStorage.getItem("admin");
            const theItem = JSON.parse(getItem);
            if (theItem.hasOwnProperty("email")){
                location.href = "dashboard.html"
            } else {
                Swal.fire({
                    icon: 'warning',
                    text: 'login unsuccessful',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
            
        })
        .catch(error => console.log('error', error));
    }
}

// dashboard api
function dashboardApi() {
    const myPageModal = document.querySelector(".pagemodal");
    myPageModal.style.display = "block";
    
    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashReq = {
        method: 'GET',
        headers: dashHeader
    }
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const getCat = document.getElementById("category");
        const getLearn = document.getElementById("learnmat");
        const getsubCat = document.getElementById("subCat");
        const getQuiz = document.getElementById("quiz");
        const getStudent = document.getElementById("student");
        const getAdmin = document.getElementById("adminId");


    getCat.innerHTML = `${result.total_number_of_categories}`;
    getLearn.innerHTML = `${result.total_number_of_learningmaterial}`;
    getsubCat.innerHTML = `${result.total_number_of_subcategories}`;
    getQuiz.innerHTML = `${result.total_number_of_quize}`;
    getStudent.innerHTML = `${result.total_number_of_students}`;
    getAdmin.innerHTML = `${result.admin_name}`;


    myPageModal.style.display = "none";
    })
    .catch(error => console.log('error', error));
}
dashboardApi();

// topthreestudent

function studentModal(event) {
    event.preventDefault();
    const myModal = document.querySelector(".mymodal");
    myModal.style.display = "block";
    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashReq = {
        method: 'GET',
        headers: dashHeader
    }

    let dataItem = []
    const url ="https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) =>{
            dataItem += `
            <div class="student-card">
            <p><span class="clent">Name</span>: <span class="swichItem">${item.name}</span></p>
            <p><span class="clent">Email</span>: <span class="swichItem">${item.email}</span></p>
            <p><span class="clent">Phone</span>: <span class="swichItem">${item.phone_number}</span></p>
            <p><span class="clent">Position</span>: <span class="swichItem">${item.position}</span></p>
            <p><span class="clent">Score</span>: <span class="swichItem">${item.total_score}</span></p>
            </div>
            `
            const allStud = document.querySelector(".allstudent");
            allStud.innerHTML = dataItem;
        })
    })
    .catch(error => console.log('error', error));
}


function getEachStudent() {
    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;

    const getStudent = new Headers();
    getStudent.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: "GET",
        headers: getStudent
    }

    let allStudent = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";

    fetch(url, dashReq)
    .then(response => response.json())
    .then (result => {
        console.log(result)
        const allStudentDash = document.getElementById("table-id");

        if(result.lenght === 0) {
            allStudentDash.innerHTML = "No Registered Student!"
        }

        else {
            result.map((item) => {
               allStudent += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.position}</td>
                    <td>${item.total_score}</td>
                </tr>
                ` 
            })
            
        }
        allStudentDash.innerHTML = allStudent;
    })
    .catch(error => console.log('error', error));
}

getEachStudent();

  function closeDashModal() {
    const closeStudent = document.getElementById("dash-modal");
    closeStudent.style.display = "none";
  }


  function createCategory(event) {
    event.preventDefault();

    

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const getCatName = document.getElementById("categories-name").value;
    const getCatImg = document.getElementById("cat-img").files[0];

    if (getCatName === "" || getCatImg === "") {
        Swal.fire({
            icon: 'info',
            text: 'All field are required',
            confirmButtonColor: '#2D85DE'
            
        })
        // getSpin.style.display = "none";
    }
    else{

        const formdata = new FormData();
        formdata.append("name", getCatName);
        formdata.append("image",  getCatImg );

        const logReq = {
            method: 'POST',
            headers: myHeaders,
            body: formdata
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
        fetch(url, logReq)

        .then(response => response.json())
       .then(result => {
        console.log(result)
        if (result.status === "success"){
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            setTimeout(() => {
                location.reload();
            }, 3000)  
        }else{
            Swal.fire({
                icon: 'info',
                text: ' unsuccessful',
                confirmButtonColor: '#2D85DE'
            })
        }
        
    })
       .catch(error => console.log('error', error));

}
 }

//  category list

function getCatList() {

    const getStrollItem = document.querySelector(".cat-disp");
    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;

    const listHeaders = new Headers();
    listHeaders.append("Authorization", `Bearer ${token}`);

   const listOption = {
     method: 'GET',
     headers: listHeaders,
  }
     let data = [];

     const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_list`;
     fetch(url, listOption)

     .then(response => response.json())
     .then(result => {
        console.log(result)
        result?.map((item) => {
            data  += `
            <div class="search-card">
            <a href="details.html?id=${item.id}&name=${item.name}"><img src=${item.image} alt="image" /></a>
            <div class="button">
            <p>${item.name}</p>
            <div class="text-right">
              <button class="update-button" onclick="openModal(${item.id})">Update</button>
              <button class="delete-button" onclick="deleteCategory(${item.id})">Delete</button>
            </div>
            </div>
          </div>
          `;
          getStrollItem.innerHTML = data;
        });
    })
     .catch(error => console.log('error', error))
} getCatList();


// function for update

let uniqueId;
 function openModal(modalId) {

    localStorage.setItem("un", modalId);

    const myModal = document.getElementById("my-modal3")
    myModal.style.display = "block";

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;

    const catHeaders = new Headers();
    catHeaders.append("Authorization", `Bearer ${token}`);

    uniqueId = modalId

    const reqId = {
        method: 'GET',
        headers: catHeaders,
     }

     const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${uniqueId}`;
     fetch(url, reqId)

     .then(response => response.json())
     .then(result => {
        console.log(result)
        const getUpName = document.getElementById("updateName");
        const getUpName2 = document.getElementById("updateNameImage");

        getUpName.setAttribute('value', `${result.name}`);
        getUpName2.setAttribute('value', `${result.image}`);
    })
     .catch(error => console.log('error', error));

     
  

 }

 function closeModal3() {
    const myModal = document.getElementById("my-modal3")
    myModal.style.display = "none";
 }

 function chooseImg(event){
    event.preventDefault();
    const div1 =  document.querySelector(".getWrapp");
    const div2 =  document.querySelector(".wrapper");

 }

//  function to update category

function updateCategory(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";
    const getUpname = document.getElementById("updateName").value;
    const getUimg1 = document.getElementById("updateNameImage").value;
    const getUimg2 = document.getElementById("updateImage").files[0];
    const getId = localStorage.getItem("un");
    if (getUpname === "") {
        Swal.fire({
            icon: 'info',
            text: 'the name field is required!',
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem('admin');
        const token = JSON.parse(getToken);
        const myToken = token.token;
        const listHeaders = new Headers();
        listHeaders.append("Authorization", `Bearer ${myToken}`);
        const upFormData = new FormData();
        upFormData.append("name", getUpname);
        upFormData.append("image", getUimg1);
        upFormData.append("image", getUimg2);
        upFormData.append("category_id", getId);
        const upReq = {
            method: 'POST',
            headers: listHeaders,
            body: upFormData
        };
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";
        fetch(url, upReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            }
            else{
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}


 function deleteCategory(myid) {
    const getToken = localStorage.getItem('admin');
    const token = JSON.parse(getToken);
    const myToken = token.token;
    const listHeaders = new Headers();
    listHeaders.append("Authorization", `Bearer ${myToken}`);
    const delReq = {
        method: 'GET',
        headers: listHeaders
    }
    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${myid}`;
    fetch(url, delReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: "#2D85DE"
            })
            setTimeout(() => {
                location.reload();
            }, 3000)
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful',
                confirmButtonColor: "#2D85DE"
            })
        }
    })
    .catch(error => console.log('error', error));
}

// functions to get value from url

function getItemUrl() {
    const myParams = new URLSearchParams(window.location.search);
    let catName = myParams.get('name');
    const displayCatName = document.querySelector(".det");
    displayCatName.innerHTML = catName;
}

// function for subcategory

function subCategory(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    let catId = params.get('id');

    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";
    const catSubName = document.getElementById("subCatName").value;
    const catSubImage = document.getElementById("subCatImg").files[0];

    if (catSubName === "" || catSubImage === "") {
        Swal.fire({
            icon: 'info',
            text: 'All field are Required!',
            confirmButtonColor: '#2D85DE'
        })
    }
    else{
        const getToken = localStorage.getItem('admin');
        const token = JSON.parse(getToken);
        const myToken = token.token;

        const listHeaders = new Headers();
       listHeaders.append("Authorization", `Bearer ${myToken}`);

       const createCat = new FormData();
        createCat.append("name",  catSubName);
        createCat.append("image", catSubImage);
        createCat.append("category_id", catId);
     
        const upReq = {
            method: 'POST',
            headers: listHeaders,
            body: createCat
        }
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";

        fetch(url, upReq)

        .then(response => response.json())
       .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: "category created successful",
                confirmButtonColor: "#2D85DE"
            })
            setTimeout(() => {
                location.reload();
            }, 3000)
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful',
                confirmButtonColor: "#2D85DE"
            })
        }
    })
       .catch(error => console.log('error', error));
    }
   
}

//function to get subcategory list

function getSubList() {

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('id');
    
    const getToken = localStorage.getItem('admin');
        const token = JSON.parse(getToken);
        const myToken = token.token;

        const listHeaders = new Headers();
       listHeaders.append("Authorization", `Bearer ${myToken}`);

       const upReq = {
        method: 'GET',
        headers: listHeaders,
    }

    let items = []
    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${getId}`;

    fetch(url, upReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result?.map((item) => {
            items +=`
              <div class="col-sm-12 col-md-12 col-lg-6">
                <div class="box-img2">
                <div class="fl-img">
                  <img src=${item.image}>
                </div>
                    <p class="p-3">${item.name}</p>
                    <div class="text-center">
                        <button class="update-button" onclick="openSubModal(${item.id})">Update</buton>
                    </div>
                </div>
              </div>
            `
            let info = document.querySelector(".row");
            info.innerHTML = items;
        })

    })
    .catch(error => console.log('error', error));

}getSubList()


    function upDateAdmin(event) {
        event.preventDefault();

        const getSpin = document.querySelector(".spin2");
        // getSpin.style.display = "inline-block";

    const getUpdateName = document.getElementById("updateName").value;
    const getUpdateEmaill = document.getElementById("updateEmail").value;

    if ( getUpdateName === "" || getUpdateEmail === "") {
        Swal.fire({
            icon: 'info',
            text: 'Email incoorrect',
            confirmButtonColor: '#2D85DE'
            
        })
        getSpin.style.display = "none";
    }
    else{

        const getToken = localStorage.getItem('admin');
        const token = JSON.parse(getToken);
        const myToken = token.token;

        const logForm = new FormData();
        logForm.append("name", getUpdateName);
        logForm.append("email", getUpdateEmaill);
        

        
       
        const listHeaders = new Headers();
        listHeaders.append("Authorization", `Bearer ${myToken}`);

        const logReq = {
            method: 'POST',
            headers: listHeaders,
            body: logForm
        }
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile";

        fetch(url, logReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: " successful",
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            } else {
                Swal.fire({
                    icon: 'warning',
                    text: 'login unsuccessful',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
            
        })
        .catch(error => console.log('error', error));
    }}

// function for update password

function upDatePassword(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";



    const getUpdateEmail = document.getElementById("updatePassEmail").value;
    const getUpdatePass = document.getElementById("updatePassword").value;
    const getConfirmPass = document.getElementById("confirmPassword").value;

    console.log(getUpdateEmail, getUpdatePass, getConfirmPass)

    if ( getUpdateEmail === "" || getUpdatePass === "" || getConfirmPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'password do not match',
            confirmButtonColor: '#2D85DE'
            
        })
        getSpin.style.display = "none";
    }
    else{

        const getToken = localStorage.getItem('admin');
        const token = JSON.parse(getToken);
        const myToken = token.token;

        const listHeaders = new Headers();
        listHeaders.append("Authorization", `Bearer ${myToken}`);

        const logForm = new FormData();
        logForm.append("email", getUpdateEmail);
        logForm.append("password", getUpdatePass);
        logForm.append("password_confirmation", getConfirmPass);

        
    

        const logReq = {
            method: 'POST',
            headers: listHeaders,
            body: logForm
        }
     

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_password";

        fetch(url, logReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: 'successful',
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            } else {
                Swal.fire({
                    icon: 'warning',
                    text: 'login unsuccessful',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
            
        })
        .catch(error => console.log('error', error));
    }
}



 


function logout() {
    swal.fire({
        icon: "success",
        text: "logout successfull",
        confirmButtonColor: "2D85DE"
    })

    setTimeout(()=> {
        localStorage.clear();
        location.href = "index.html"
    }, 3000)
}