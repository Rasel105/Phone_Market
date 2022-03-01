
const spinner = document.getElementById('spinner-secion');
const error = document.getElementById('error')
const getPhone = () => {
    const inputValue = document.getElementById('input-value')
    let inputValueData = inputValue.value;
    // const error = document.getElementById('error')
    // alert('Please enter a number')
    if (inputValueData == '') {
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
    }
}

const displayPhone = (phones) => {
    // console.log(phones)
    if (phones.length == 0) {
        error.innerHTML = `
         <div class="alert alert-danger alert-dismissible ">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Ohps Sorry! </strong> Not Found!
        </div>
        `
    }
    const displayPhoneData = document.getElementById('main-details');
    displayPhoneData.innerHTML = ''
    phones.forEach(phone => {
        // console.log(phone)
        // const phone20 = phone.slice(0, 20);
        // console.log(phone20)
        const div = document.createElement('div');
        div.className = "col-md-4 col-sm-6 mb-5 rounded"
        div.innerHTML = `
             <div class="card ">
               <div class="p-3"><img src="${phone.image}" class="card-img-top"> </div>
                <div class="card-body">
                <h6 class="card-title">Name: <span class="text-success">${phone.phone_name}</span></h6>
                <p class="card-text">Brand: <span class="text-success">${phone.brand}</span></p>
                <div class="text-center">
                <button onclick="cardDetails('${phone.slug}')" class="btn btn-info text-white">Explore</button>
                </div>
                </div>
          </div> `
        displayPhoneData.appendChild(div)
    })
    spinner.innerHTML = '';
}

const cardDetails = (detailsValue) => {
    const url = `https://openapi.programming-hero.com/api/phone/${detailsValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailOnTop(data.data))
}

const showDetailOnTop = (phone) => {
    // console.log(phone)
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