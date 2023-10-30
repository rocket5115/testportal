setTimeout(()=>{
    let username = getCookie('username');
    if(username!=""&&username.length>=5){
        document.querySelector('.header-user-info').textContent = username;
    };
},100)