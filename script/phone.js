const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayphones(phones,isShowAll)
}

const displayphones = (phones,isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container cards before adding new card
    phoneContainer.textContent=''
    // display show all button if there are more than 10 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all', isShowAll);
    // display only first 10 phone if not show all
    if(!isShowAll){
        phones = phones.slice(0,10)
    }
    
    phones.forEach(phone => {
        // console.log(phone);
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 p-4 shadow-xl`
        // set inner html
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick = "handleShowDetails('${phone.slug}') 
            "class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false)
}

//
const handleShowDetails = async (id) => {
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

}
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML= `
        <img src="${phone.image}"alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `

    // show the modal
    show_details_modal.showModal();
}





// handle search button
const handleSearch =(isShowAll) =>{
    toggleLoadingSpinner(true)
    // console.log('search handle')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText);
    loadPhone(searchText, isShowAll)
}
const handleSearch2 = () =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field2')
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText)
}
// handle search recap
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
    
}
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// 
// handle show all
const handleShowAll = () =>{
    handleSearch(true)
}

// loadPhone()