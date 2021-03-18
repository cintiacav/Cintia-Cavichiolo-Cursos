//load
window.addEventListener('load', () => {
    tabUsers = document.querySelector('#tabUsers');
    tabStatistics = document.querySelector('#tabStatistics');
    lblUser = document.querySelector('#lblUser');
    lblStatistic = document.querySelector('#lblStatistic');
    btnFind = document.querySelector('#btnFind');
    inputName = document.querySelector('#name');    
    numberFormat = Intl.NumberFormat('pt-BR',{maximumSignificantDigits: 4 });
    form = document.querySelector('form');
    fetchUsers();
    inputName.focus();
    form.addEventListener('submit', event => preventSubmit(event));
    inputName.addEventListener('keyup', event => validateKeyUp(event));
    btnFind.addEventListener('click', () => validateButton());   
    
 
});



// estado da aplicação
let tabStatistics = null;

let tabUsers = null;

let allUsers = [];

let filteredUsers = [];

let lblUser = null;

let lblStatistic = null;

let numberFormat = null;

let btnFind = null;

let inputName =null;

let form = null;


async function fetchUsers(){
    var resource = await fetch('http://localhost:3001/users');
     var json = await resource.json();
     allUsers =  json.map(user =>{

        const { name, age, gender, picture } = user;
         
          return{
              name: `${user.name.first} ${user.name.last}`,
              age: user.dob.age,
              gender, 
              picture: user.picture.thumbnail
          };
          
      });      
    
}

 //render
 function render(){
     renderUserList();
    if(filteredUsers.length >0){
        renderSummary();
        renderStatistics();
    }else{
        lblUser.textContent = "Nenhum Usuário Filtrado";
        lblStatistic.textContent = "Nada a ser exibido";
        tabStatistics.textContent = "";
    }
}
//ValidateKeyUp

function validateKeyUp(event){
    
    let nameToFind = event.target.value;
    if(event.key === 'Enter' && nameToFind.length>0){       
       addToUser(nameToFind);
    }
}

function validateButton(){
    let nameToFind = inputName.value;
    if(nameToFind.length>0){       
       addToUser(nameToFind);
    }
}

function preventSubmit(event){
    event.preventDefault();    
}

//AddtoUser
function addToUser(nameToFind){

    filteredUsers = allUsers.filter(user =>{
       if (user.name.toLowerCase().includes(nameToFind.toLowerCase())){
           return user;
       }
    }); 
    filteredUsers.sort((a,b)=>{
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    render();
}

//renderUserList
function renderUserList(){
    let usersHTML = '<div>';

    filteredUsers.forEach(user =>{
        const { name, age, gender, picture } = user;
        const userHTML = `
                <div class='user'>
                    <div> <img src="${user.picture}" alt="${user.name}"/></div>                           
                    <div> <label>${user.name}, ${user.age} anos</label></div>
                </div>
            `;
            usersHTML += userHTML;
    });
        usersHTML += '</div>';
        tabUsers.innerHTML = usersHTML;
}


function renderSummary(){
    const countUser = filteredUsers.length;
    if(countUser>0){
        lblUser.textContent = `${countUser} usuário(s) encontrado(s)`;
    }
}

function renderStatistics(){  
    lblStatistic.textContent = 'Estatísticas';
    const countMale= filteredUsers.filter(male =>{
        if (male.gender === 'male'){
            return male;
        }
     }); ;
    const countFemale=filteredUsers.filter(female =>{
        if (female.gender === 'female'){
            return female;
        }
     }); ;
    const countAges = filteredUsers.reduce((accumulator,current) =>{
        return accumulator + current.age;
    }, 0);
    const averageAge= countAges / filteredUsers.length;

    const statisticsHTML = `
    <div class='statistic'>    
        <div> <label>Sexo masculino:</label> <label style="font-weight: bold !important;">${countMale.length}</div>
        <div> <label>Sexo feminino:</label> <label style="font-weight: bold !important;">${countFemale.length}</div>  
        <div> <label>Soma das idades:</label> <label style="font-weight: bold !important;">${countAges}</label></div>  
        <div> <label>Média das idades:</label> <label style="font-weight: bold !important;">${numberFormat.format(averageAge)}</label></div>    
    </div>`;
    tabStatistics.innerHTML = statisticsHTML;

}


/*


//fetch
async function fetchUsers(){
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json =  await res.json();
    allCountries = json.map(country =>{

      const { numericCode, translations, population, flag } = country;
       
       
        return{
            //utilizando destructuring no return
            id: numericCode,
            name: translations.pt,
            population, //quando repete não precisa declarar os 2
            formattedPopulation: formatNumber(population),
            flag //quando repete não precisa declarar os 2
           
        };
        
    });
    render();
 }

 //render
function render(){
    renderCountryList();
    renderFavorities();
    renderSummary();
    handleCountryButtons();   
}

function renderCountryList(){
    let countriesHTML = '<div>';

    allCountries.forEach(country =>{
        const {id, name, population, formattedPopulation, flag} = country;
        const countryHTML = `
            <div class='country'>
                <div> <a id="${country.id}" class="waves-effect waves-light btn">+</a></div>
                <div> <img src="${country.flag}" alt="${name}"/></div>
                <div> <ul> <li>${country.name}</li><li>${formattedPopulation}<li><ul></label></div>
            </div>
        `;
        countriesHTML += countryHTML;
    });
    countriesHTML += '</div>';
    tabCountries.innerHTML = countriesHTML;
}

function renderFavorities(){
    let favouritesHTML = '<div>';
    allFavorites.forEach(country => {
        const { name, id, population, flag ,formattedPopulation} = country;
        const favouriteCountryHTML = `
            <div class='country'>
                <div> <a id="${country.id}" class="waves-effect waves-light btn red darken-4">-</a></div>
                <div> <img src="${country.flag}" alt="${name}"/></div>
                <div> <ul> <li>${country.name}</li><li>${formattedPopulation}<li><ul></label></div>
            </div>
        `;
        favouritesHTML += favouriteCountryHTML;
    });

    favouritesHTML += '</div>';
    tabFavorites.innerHTML = favouritesHTML;
}
function renderSummary(){
    countCountries.textContent = allCountries.length;
    countFavorites.textContent = allFavorites.length;

    const populationList = allCountries.reduce((accumulator,current) =>{
        return accumulator + current.population;
    }, 0);
   totalPopulationList.textContent = formatNumber(populationList);

   const favoritesList = allFavorites.reduce((accumulator,current) =>{
    return accumulator + current.population;
    }, 0);
    totalPopulationFavorites.textContent = formatNumber(favoritesList);
}

//Handle Buttons
function handleCountryButtons(){
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    const favoritesButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

    countryButtons.forEach(button =>{
        button.addEventListener('click',() => addToFavourites(button.id));        
    });
    
    favoritesButtons.forEach(button =>{
        button.addEventListener('click',() => removeFromFavourites(button.id));        
    });   

}

function addToFavourites(id){
    const countryToAdd = allCountries.find(country => country.id === id);

    allFavorites = [...allFavorites, countryToAdd];

    allFavorites.sort((a,b)=>{
        return a.name.localeCompare(b.name);
    });
    
    allCountries = allCountries.filter(country => country.id !== id);
    
    render();
}
function removeFromFavourites(id){

    const countryToRemove =  allFavorites.find(country => country.id === id);

    allCountries = [...allCountries, countryToRemove];

    allCountries.sort((a,b) =>{
        return a.name.localeCompare(b.name);
    });

    allFavorites = allFavorites.filter(country => country.id !== id);

    render();
}

//Format Number
function formatNumber(number){
    return numberFormat.format(number);
}*/