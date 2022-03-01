
const spinner = document.getElementById('spinner-secion');
const error = document.getElementById('error')
const getPhone = () => {
    const inputValue = document.getElementById('input-value')
    let inputValueData = inputValue.value;
    // const error = document.getElementById('error')
    // alert('Please enter a number')
    if (inputValueData == '') {

        // -------------------------------Blank input error handle ---------------------------

        error.innerHTML = `
        <div class="alert alert-danger alert-dismissible ">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Ohps!</strong> Type your desire phone.
        </div>
        `
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValueData}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
        spinner.innerHTML = `
            <div class="text-center">
         <div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
         </div>
         </div>
            `
        error.innerHTML = ''

    }
    inputValue.value = '';
}

const displayPhone = (phones) => {
    // console.log(phones)
    const phoneSlice = phones.slice(0, 20)
    // console.log(phoneSlice)
    if (phoneSlice.length == 0) {

        //------------------------ Not Found error handle --------------------------

        error.innerHTML = `
         <div class="alert alert-danger alert-dismissible ">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Ohps Sorry! </strong> Not Found!
        </div>
        `
    }

    const displayPhoneData = document.getElementById('main-details');
    displayPhoneData.innerHTML = ''
    phoneSlice.forEach(phoneSlices => {
        // console.log(phone)
        // const phone20 = phone.slice(0, 20);
        // console.log(phone20)
        const div = document.createElement('div');
        div.className = "col-md-4 col-sm-6 mb-5 rounded"
        div.innerHTML = `
             <div class="card ">
               <div class="p-3"><img src="${phoneSlices.image}" class="card-img-top"> </div>
                <div class="card-body">
                <h6 class="card-title">Name: <span class="text-success">${phoneSlices.phone_name}</span></h6>
                <p class="card-text">Brand: <span class="text-success">${phoneSlices.brand}</span></p>
                <div class="text-center">
                <button onclick="cardDetails('${phoneSlices.slug}')" class="btn btn-info text-white">Explore</button>
                </div>
                </div>
          </div> `
        displayPhoneData.appendChild(div)
    })
    spinner.innerHTML = '';
}

const cardDetails = (detailsValue) => {
    console.log(detailsValue)
    const detailsSecond = detailsValue.slice(0, 19)
    const url = `https://openapi.programming-hero.com/api/phone/${detailsSecond}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailOnTop(data.data))
}


//--------------------------------- show details funcion -----------------------------------

const showDetailOnTop = (phone) => {
    console.log(phone)
    const detailTag = document.getElementById('details-section');
    detailTag.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="card w-50 mx-auto">
           <div class="p-3 w-50 mx-auto"><img src="${phone.image}" class="card-img-top"></div>
           <h4 class="text-center text-info">Details</h4>
            <div class="card-body">
            <h6 class="card-title  my-0"><span class="fw-bold">Name: </span><span class="text-success">${phone.name}</span></h6>
            <p class="card-text my-0 fw-normal"><span class="fw-bold">Brand: </span> <span class="text-success">${phone.brand}</span></p>
            <p class="card-text  my-0"><span class="fw-bold">Date: </span><span class="text-success">${phone.releaseDate}</span></p>
            <p class="card-text  my-0"><span class="fw-bold">Storage: </span><span class="text-success">${phone.mainFeatures.storage}</span></p>
            <p class="card-text  my-0"><span class="fw-bold">Display: </span><span class="text-success">${phone.mainFeatures.displaySize}</span></p>
            <p class="card-text  my-0"><span class="fw-bold">Sensors: </span><span class="text-success">${phone.mainFeatures.sensors}</span></p>
            <p class="card-text  my-0"><span class="fw-bold">Bluetooth: </span><span class="text-success">${phone?.others?.GPS}</span></p>
            <p class="card-text  my-0"><span class="fw-bold">GPS: </span><span class="text-success">${phone?.others?.WLAN}</span></p>
      </div> 
        `
    detailTag.appendChild(div)
}