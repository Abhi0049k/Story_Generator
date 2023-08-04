const baseServerURL = 'https://storygenerator.onrender.com/user/login';

const formEl = document.querySelector('form');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    let obj = {};
    obj.email= emailEl.value;
    obj.password = passwordEl.value;
    sendCredentials(obj);
})

const sendCredentials = async(obj)=>{
    try{
        let res = await fetch(baseServerURL,{
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        let result = res.ok;
        res = await res.json();
        if(result){
            alert(res.msg);
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('user', res.user);
            window.location.href='home.html'
        }else{
            alert('Something went wrong, Try Again');
        }
    }catch(err){
        console.log(err);
    }
}