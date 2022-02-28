const getPhone = () => {
    const inputValue = document.getElementById('input-value')
    const inputValueData = inputValue.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValueData}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = (phones) => {
    // console.log(phones)
    const displayPhoneData = document.getElementById('main-details');
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.className = "col-md-4 col-sm-6 mb-5 rounded"
        div.innerHTML = `
         <div class="card ">
           <div class="p-3"><img src="${phone.image}" class="card-img-top"> </div>
            <div class="card-body">
            <h6 class="card-title">Name: <span class="text-success">${phone.phone_name}</span></h6>
            <p class="card-text">Brand: <span class="text-success">${phone.brand}</span></p>
            <div class="text-center"><button onclick="cardDetails('${phone.slug}')" class="btn btn-info text-white">Explore</button></div>
            </div>
      </div> `
        displayPhoneData.appendChild(div)
    })
}

const cardDetails = (detailsValue) => {
    console.log(detailsValue)
    const url = `https://openapi.programming-hero.com/api/phone/${detailsValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailOnTop(data.data))
}

const showDetailOnTop = (phone) => {
    console.log(phone)
    const detailTag = document.getElementById('details-section');
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="card ">
           <div class="p-3"><img class="w-25" src="${phone.image}" class="card-img-top"> </div>
            <div class="card-body">
            <h6 class="card-title">Name: <span class="text-success">${phone.phone_name}</span></h6>
            <p class="card-text">Brand: <span class="text-success">${phone.brand}</span></p>
      </div> 
        `
    detailTag.appendChild(div)

}