let dogImg = document.getElementById('dogImg');
let dogApi = "https://dog.ceo/api/breeds/list/all"
let breedList = [];

const fetchbreeds = async () =>{
    let res = await fetch(dogApi);

    let breed_key = await res.json();
    breedlist = Object.keys(breed_key);

    console.log(breedlist);
    
}

fetchbreeds();
// let base_url = `https://dog.ceo/api/${breed}/image/random`;
// const async function handleAPI() {
//     try {
//         let res = await fetch(base_url);
//         let data = await res.json();
//         dogImg.src = data.message;
//     } catch (error) {
//         console.log(error);

//     }
// }
// handleAPI();