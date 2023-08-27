const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayphones(phones)
}

const displayphones = phones => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container cards before adding new card
    phoneContainer.textContent=''
    // display show all button if there are more than 10 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 10){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // display only first 10 phone
    phones = phones.slice(0,10)
    phones.forEach(phone => {
        console.log(phone);
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 p-4 shadow-xl`
        // set inner html
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        // append child
        phoneContainer.appendChild(phoneCard);
    });
}
// handle search button
const handleSearch =() =>{
    // console.log('search handle')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText);
    loadPhone(searchText)
}
const handleSearch2 = () =>{
    const searchField = document.getElementById('search-field2')
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText)
}
// loadPhone()