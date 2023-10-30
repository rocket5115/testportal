const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

function SaveCookies(data) {
    data.forEach(v=>{
        document.cookie=v[0]+'='+v[1];
    });
};

function GetPHPData(address,cookies,cb) {
    SaveCookies(cookies);
    let http = new XMLHttpRequest();
    http.open('POST',address+'.php',false);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            if(cb)cb(http.responseText);
        } else {
            if(cb)cb(null);
        };
    };
    http.send();
};

const TranslateLocation = (link,rep) => {
    let pos = 0;
    for(let i=0;i<link.length;i++){
        if(link.substring(i,i+1)=='/'){
            pos=i
        };
    };
    return link=link.substring(0,pos)+'/'+rep;
};

const OpenNewElem = (id) => {
    location.assign(TranslateLocation(location.href,(id?id:'index')+'.html'));
};

function Register() {
    OpenNewElem('register')
};

function Login() {
    OpenNewElem('login')
};

function ProfileClicked(e) {
    let name = e.querySelector('.header-user-info').textContent.toLowerCase();
    if(name=='zaloguj się'){
        console.log(document.cookie)
        let [username,password]=[getCookie('name'),getCookie('password')];
        if(username&&password){
            GetPHPData('login',[
                ['name',username],
                ['password',password]
            ], (res)=>{
                if(!res.substring(0,8).match('failed')){
                    SaveCookies([['username',res]]);
                    OpenNewElem('main');
                } else {
                    OpenNewElem('login');
                };
            });
        } else {
            OpenNewElem('login');
        };
    } else {
        OpenNewElem('main');
    };
};

function GetLoginInfo(e,register) {
    if(register){
        let querySelector = e.parentNode.querySelectorAll('span');
        let [name,pass,cpass]=[querySelector[0].querySelector('input').value,querySelector[1].querySelector('input').value,querySelector[2].querySelector('input').value]
        GetPHPData('register',[
            ['name',name],
            ['password',pass],
            ['cpassword',cpass]
        ], (res)=>{
            if(!res.substring(0,8).match('failed')){
                SaveCookies([['username',res]]);
                OpenNewElem('main');
            } else {
                alert(res.substring(8,res.length))
            };
        });
    } else {
        let querySelector = e.parentNode.querySelectorAll('span');
        let [name,pass]=[querySelector[0].querySelector('input').value,querySelector[1].querySelector('input').value]
        GetPHPData('login',[
            ['name',name],
            ['password',pass]
        ], (res)=>{
            if(!res.substring(0,8).match('failed')){
                console.log(res)
                SaveCookies([['username',res]]);
                OpenNewElem('main');
            } else {
                alert(res.substring(8,res.length))
            };
        });
    };
};