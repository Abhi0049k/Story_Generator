const name = localStorage.getItem('user') || '';
const token = localStorage.getItem('token') || '';
const story = document.querySelector('#story');
const baseServerUrl = 'https://storygenerator.onrender.com/story';
const selectEl = document.querySelector('select');
const formEl = document.querySelector('form');
const user = document.querySelector('#user');
const favor = document.querySelector('#favor');
const logoutBtn = document.querySelector('#logout');

if(name==''|| token==''){
    window.location.href='index.html';
}

user.innerText = name;

logoutBtn.addEventListener('click', async()=>{
    try{
        let res = await fetch('https://storygenerator.onrender.com/user/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(res.ok){
            alert('Logout Successful');
            window.location.href = 'index.html';
        }else{
            alert('Something went wrong');
        }
    }catch(err){
        console.log(err);
    }
})

favor.addEventListener('click', (evnt)=>{
    let sty = story.innerText;
    if(sty==='') return alert('First Generate a story');
    addFavor()
})

const addFavor = async()=>{
    try{
        let genre = selectEl.value;
        let sty = story.innerText;
        let res = await fetch(`${baseServerUrl}/favorite`, {
            body: JSON.stringify({genre, story: sty}),
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.ok){
            alert('Story Added as Favorite');
        }
    }catch(err){
        console.log(err);
    }
}

formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    let genre = selectEl.value;
    if(genre==='') return alert('Please select a genre')
    alert('Please wait for 10-20 seconds');
    sendGenre(genre);
})

const sendGenre = async(genre)=>{
    try{
        let res = await fetch(baseServerUrl, ({
            method: 'POST',
            body: JSON.stringify({genre}),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }))
        res = await res.json();
        story.innerText = res.story;
    }catch(err){
        console.log(err);
    }
}
