const token = localStorage.getItem('token') || '';
const name = localStorage.getItem('user') || '';
const userName = document.querySelector('#user');
const container = document.querySelector('main');
const logoutBtn = document.querySelector('#logout')
const baseServerUrl = 'https://storygenerator.onrender.com/story/allFavor';

if(name=='' || token=='') window.location.href='index.html';

userName.innerText = name;

(async ()=>{
    try{
        let res = await fetch(baseServerUrl, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        res = await res.json();
        renderfavor(res);
    }catch(err){
        console.log(err);
    }
})();

logoutBtn.addEventListener('click', async()=>{
    try{
        let res = await fetch('https://storygenerator.onrender.com/user/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.ok){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href='index.html';
        }
    }catch(err){
        console.log(err);
    }
})

const renderfavor = async(list)=>{
    try{
        let arr = list.map(el => card(el));
        container.innerHTML = arr.join('\n');
    }catch(err){
        console.log(err);
    }
}


const card = (el)=>{
    let str = `
    <div class='card'>
    <h2>Genre: ${el.genre}</h2>
    <p>${el.story}</p>
    </div>
    `;
    return str;
}
