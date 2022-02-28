const getPhone = () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=samsung`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}
getPhone()

const displayPhone = (phones) => {
    // console.log(phones)
    phones.forEach(phone => {
        console.log(phone)
    })
}