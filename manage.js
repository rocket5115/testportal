function EncodeURI(arr) {
    return Citizen.compressToEncodedURIComponent(encodeURIComponent(JSON.stringify(arr)));
};

function DecodeURI(arr) {
    return JSON.parse(decodeURIComponent(Citizen.decompressFromEncodedURIComponent(arr)));
};

function TranslateURI(data) {
    data.forEach(arr=>{
        let name = DecodeURI(arr[0]);
    });
};

function GetPersonalInfo(inf) {
    let data = DecodeURI(inf);
    return data.firstname + " " + data.surname + " " + data.class;
};

function SeeTests(e) {
    GetPHPData('get_tests',[],res=>{
        if(res.substring(0,1)=='^'){
            alert(res.substring(1,res.length));
        } else {
            let data = eval(res);
            let em=[];
            data.forEach(arr=>{
                em[em.length]={title:arr[0],value:arr[1]}
            });
            CreateForm({
                title: 'Twoje Testy',
                elements: em
            },(data,menu)=>{
                if(data.current.value){
                    let val=data.current.value;
                    menu.destroy();
                    CreateForm({
                        title: 'Opcje',
                        elements: [
                            {title: 'Usuń Test', value: 'delete_all'},
                            {title: 'Zobacz Wyniki', value: 'see_all'}
                        ]
                    }, (data,menu)=>{
                        if(data.current.value=='see_all'){
                            menu.destroy();
                            GetPHPData('get_answers',[
                                ['pid',val]
                            ],res=>{
                                if(res.substring(0,1)=='^'){
                                    alert(res.substring(1,res.length));
                                } else {
                                    let data = eval(res);
                                    let em=[];
                                    data.forEach(arr=>{
                                        em[em.length]={title:GetPersonalInfo(arr),value:arr}
                                    });
                                    CreateForm({
                                        title: 'Użytkownicy Testu: '+val,
                                        elements: em
                                    },(data,menu)=>{
                                        if(data.current.value){
                                            GetPHPData('get_answer',[
                                                ['data',data.current.value]
                                            ],res=>{
                                                if(res.substring(0,1)=='^'){
                                                    alert(res.substring(1,res.length));
                                                } else {
                                                    e.style.display='none';
                                                    LoadMenu(eval(res));
                                                };
                                            });
                                            menu.destroy();
                                        };
                                    });
                                };
                            });
                        } else if(data.current.value=='delete_all') {
                            menu.destroy();
                            if(confirm('Napewno chcesz usunąć udostępniony test i jego odpowiedzi?')){
                                GetPHPData('delete_export',[['pid',val]],res=>{
                                    alert(res);
                                });
                            };
                        };
                    })
                };
            });
        };
    });
};

function SeeProjects() {
    GetPHPData('get_projects',[],res=>{
        let data;
        try {
            data=eval(res);
        } catch (error) {
            alert('Brak Rekordów!');
        }
        if(!data)return;
        let em=[];
        data.forEach(arr=>{
            em[em.length]={title:arr}
        })
        CreateForm({
            title: 'Twoje Projekty',
            elements: em
        },(data,menu)=>{
            menu.destroy();
            if(data.current.title) {
                if(confirm('Napewno chcesz usunąć projekt o nazwie: '+data.current.title+' ?')){
                    GetPHPData('delete_project',[['data',data.current.title]],res=>{
                        alert(res);
                    });
                };
            };
        });
    });
}

var GlobalData = {};

let colours = {
    1: 'rgba(0,0,255,0.2)',
    2: 'rgba(0,100,100,0.2)',
    3: 'rgba(100,100,0,0.2)'
}

function LoadMenu(data) {
    let [questions,given,answers] = [DecodeURI(data[0]),DecodeURI(data[1]),DecodeURI(data[2])];
    let div = document.createElement('div');
    div.classList.add('main-manage');
    div.innerHTML=`<div id="quest"></div><div id="answered"></div><div id="answer"></div>`;
    document.querySelector('body').append(div);
    let quest = document.getElementById('quest');
    let answered = document.getElementById('answered');
    let answer = document.getElementById('answer');
    questions.options.splice(0,1);
    given.splice(0,1);
    answers.splice(0,1);
    let counter = 1;
    for(let i=0;i<questions.options.length;i++) {
        if(counter>=4){
            counter=1;
        };
        let s = document.createElement('div');
        s.textContent = questions.options[i].title;
        s.style.backgroundColor=colours[counter];
        quest.append(s);
        if(typeof(given[i][0])=='boolean'){
            s=document.createElement('div');
            s.style.backgroundColor=colours[counter];
            answered.append(s);
            let s2=document.createElement('div');
            s2.style.backgroundColor=colours[counter];
            answer.append(s2);
            for(let j=0;j<given[i].length;j++){
                let di = document.createElement('div');
                di.textContent=String(j+1)+'. '+questions.options[i].elems[j]+" - "+(given[i][j]&&'Zaznaczone'||'Nie');
                s.append(di);
                if(given[i][j]!=answers[i][j]) {
                    di.style.backgroundColor = 'rgba(255,0,0,0.25)'
                } else {
                    di.style.backgroundColor = 'rgba(0,255,0,0.25)'
                }
                di = document.createElement('div');
                di.textContent=String(j+1)+'. '+questions.options[i].elems[j]+" - "+(answers[i][j]&&'Zaznaczone'||'Nie');
                s2.append(di);
            }
        } else {
            s=document.createElement('div');
            s.style.backgroundColor=colours[counter];
            answered.append(s);
            let s2=document.createElement('div');
            s2.style.backgroundColor=colours[counter];
            answer.append(s2);
            let j=0;
            s2.textContent=answers[i][j];
            if(given[i][j].length>100){
                let id = "G"+Math.random();
                GlobalData[id]=given[i][j];
                s.innerHTML=`<span class="click" onclick="Download('${id}')">Ten Tekst jest zbyt długi aby go pokazać, kliknij aby go pobrać</span>`
            } else {
                s.textContent = given[i][j];
                if(s2.textContent.toLowerCase()!=s.textContent.toLowerCase()){
                    s.style.backgroundColor='rgba(255,0,0,0.25)';
                } else {
                    s.style.backgroundColor = 'rgba(0,255,0,0.25)';
                }
            }
        };
        counter++;
    };
};

function Download(txt) {
    var blob = new Blob([GlobalData[txt]], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, 'Tekst');
};