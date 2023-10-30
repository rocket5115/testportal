let [opts,elems] = [0,0]

function UpdateHeight(opt,elm) {
    opt=opt||0;elm=elm||0;
    opts+=opt;
    elems+=elm;
    let nums = 100;
    let [op,el] = [opts*35,elems*5];
    if(op+el>100){
        nums=op+el
    };
    console.log(nums,opt,elm)
    document.documentElement.style.setProperty('--container-height', String(nums)+"%");
};

let firstClasses = ['divElem'];
let innerHTML = ``;

function CreateNewTest(e) {
    e.parentNode.remove();
    CreateProject(DecodeURI("KQdgQsBMkC4JYwDYFMqWAZgIJrAJwEMBrKABgBUBPGAV2AGEBWYADkjuinrQHsAHeDwB2AZzSYcjCODTwkqTtlyESkCtTpNW7cZG7QYlPgvRLoIgBY88MXfsjIUAWzGLJERgBEuaAqIDuyHiupu5CNIiIwF6g3nqgEAYIKOJmkPjEZFS0DMxsHOjxBkYmEmiW1racRQ7OIWVS0XH2fiKBwanuaOTIRCJV6DEg3kOeQA"));
};

function LoadTest() {
    let retval = [];
    GetPHPData('get_projects',[],(res)=>{
        if(res=='Brak rekordów'){
            alert('Brak rekordów');
            return
        } else {
            let c = eval(res);
            c.forEach(elem=>{
                retval[retval.length]={
                    title: elem
                };
            });
        };
    });
    if(retval.length==0){
        return;
    }
    CreateForm({
        title: "Wczytaj Projekt",
        elements: retval
    },(data,menu)=>{
        let res = data.current;
        if(res.title=='Brak nazwy'){
            res='';
        } else {
            res=res.title;
        };
        GetPHPData('get_project',[
            ['project_name',res]
        ], (res)=>{
            res = JSON.parse(decodeURIComponent(Citizen.decompressFromEncodedURIComponent(res)));
            CreateProject(res);
        });
        menu.destroy()
    });
};

function CreateElement(classes,innerHTML,id) {
    let div = document.createElement('div');
    if(id)div.id=id;
    classes.forEach(cls=>{
        div.classList.add(cls);
    });
    div.innerHTML = innerHTML;
    return div;
};

let classes = {
    short: '<input type="text" placeholder="tekst">',
    long: '<textarea></textarea>',
    single: `<div>
    <input type="radio" onclick="RadioClicked(this)">
    <input type="text" placeholder="tytuł" value="Tytuł">
    <i class="fa-solid fa-x" onclick="Remove(this)"></i>
    <div>`,
    multiple: `<div>
    <input type="checkbox">
    <input type="text" placeholder="tytuł" value="Tytuł">
    <i class="fa-solid fa-x" onclick="Remove(this)"></i>
    <div>`,
};

let template = `
    <div class="elem-title"><input type="text" placeholder="title" value="Brak Tytułu"><i class="fa-solid fa-x" onclick="RemoveWhole(this)"></i></div>
    <div class="elem-type">
        <select name="types" onclick="SelectionPrepare(this)">
            <option value="short">Krótki Tekst</option>
            <option value="long">Długi Tekst</option>
            <option value="single">Jeden wybór</option>
            <option value="multiple">Wiele wyborów</option>
        </select>
    </div>
    <div class="elem-wrapper"></div>
    <div class="elem-footer"></div>
`;

let NewElement = `<i class="fa-solid fa-circle-plus" onclick="AddNewElement(this)"></i>`;

function CreateProject(options,test) {
    let title = options.title;
    let elems = options.data||options.options;
    elems.splice(0,1);
    let div = CreateElement(['elem-main'],`
    <div class="elem-title"><input type="text" placeholder="title" value="Brak Tytułu" ${test?'disabled':''}></div>
    <div class="elem-wrapper"></div>
    <div class="elem-footer"></div>`,'main-title');
    div.querySelector('.elem-title').querySelector('input').value=title;
    let main = document.querySelector('.main').querySelector('div');
    UpdateHeight(1,0);
    main.innerHTML = "";
    main.append(div);
    elems.forEach(arr=>{
        let elem = CreateElement(['elem-main'],template);
        let type = elem.querySelector('.elem-type').querySelector('select');
        type.selectedIndex = arr.type=='short'?0:arr.type=='long'?1:arr.type=='single'?2:3;
        let tit = elem.querySelector('.elem-title').querySelector('input');
        tit.value=arr.title;
        if(test){
            tit.disabled=true;
        };
        if((arr.type=='single'||arr.type=='multiple')&&!test){
            elem.querySelector('.elem-footer').innerHTML+'<i class="fa-solid fa-circle-plus" onclick="Add(this)"></i>';
        };
        let wrapper = elem.querySelector('.elem-wrapper');
        wrapper.innerHTML=classes[arr.type];
        if(arr.type=='short'){
            let inp = wrapper.querySelector('input');
            if(!test){
                inp.value=arr.answers[0];
            };
        } else if (arr.type=='single'||arr.type=='multiple') {
            wrapper.innerHTML="";
            for(let i=0;i<arr.elems.length;i++) {
                let div = CreateElement([],classes[arr.type]);
                wrapper.append(div);
            };
            let i=0;
            wrapper.querySelectorAll('input[type="text"]').forEach(elem=>{
                elem.value=arr.elems[i];
                if(test){
                    elem.disabled=true;
                };
                UpdateHeight(0,1);
                i++;
            });
            if(!test){
                i=0;
                wrapper.querySelectorAll(arr.type=='single'?'input[type="radio"]':'input[type="checkbox"]').forEach(elem=>{
                    elem.checked=arr.answers[i];
                    i++;
                });
            };
        };
        main.append(elem);
    });
    if(!test){
        div = CreateElement(['elem-add-new'],NewElement);
        main.append(div);
    } else {
        div = CreateElement(['elem-add-new'],`<form><button type="button" onclick="FinishTest()">Zakończ Test</button></form>`)
        main.append(div);
    };
    UpdateHeight(main.querySelectorAll('.elem-main').length,0);
};

let footer = {
    single: '<i class="fa-solid fa-circle-plus" onclick="Add(this)"></i>',
    multiple: '<i class="fa-solid fa-circle-plus" onclick="Add(this,true)"></i>'
};

function SelectionPrepare(e) {
    let selected = e.options[e.selectedIndex].value;
    let isAlready = e.parentNode.parentNode.querySelector('.elem-wrapper').querySelector(`${selected=='short'?'input[type="text"]':selected=='long'?'textarea':selected=='single'?'input[type="radio"]':'input[type="checkbox"]'}`);
    if(isAlready&&selected=='short'){
        if(!(e.parentNode.parentNode.querySelector('input[type="radio"]')||e.parentNode.parentNode.querySelector('input[type="checkbox"]'))){
            return;
        };
    } else if(isAlready){
        return;
    };
    e.parentNode.parentNode.querySelector('.elem-wrapper').innerHTML = classes[selected];
    if(selected=='single'||selected=='multiple'){
        e.parentNode.parentNode.querySelector('.elem-footer').innerHTML=footer[selected];
    };
};

function Remove(e) {
    if(e.parentNode.querySelector('input[type="radio"]')){
        e.parentNode.parentNode.remove();
    } else {
        e.parentNode.remove();
    };
    UpdateHeight(0,-1);
}

function Add(e,check) {
    if(!check){
        let div = CreateElement([],classes['single']);
        let ew = e.parentNode.parentNode.querySelector('.elem-wrapper');
        if(!ew.querySelector('input[type="radio"]')){
            if(ew.querySelector('input[type="text"]')||ew.querySelector('textarea')){
                e.remove();
                return;
            } else {
                ew.append(div);
            }
        } else {
            ew.append(div);
        };
    } else {
        let div = CreateElement([],classes['multiple']);
        let ew = e.parentNode.parentNode.querySelector('.elem-wrapper');
        if(!ew.querySelector('input[type="checkbox"]')){
            if(ew.querySelector('input[type="text"]')||ew.querySelector('textarea')){
                e.remove();
                return;
            } else {
                ew.append(div);
            }
        } else {
            ew.append(div);
        };
    };
    UpdateHeight(0,1);
};

function AddNewElement(e) {
    e.parentNode.remove();
    let main = document.querySelector('.main').querySelector('div');
    let elem = CreateElement(['elem-main'],template);
    elem.querySelector('.elem-wrapper').innerHTML=classes.short;
    main.append(elem);
    let div = CreateElement(['elem-add-new'],NewElement);
    main.append(div);
    UpdateHeight(1,0);
};

function RadioClicked(e) {
    e.id = "CurrentE";
    e.parentNode.parentNode.parentNode.querySelectorAll('input[type="radio"]').forEach(elem=>{
        if(elem.checked&&elem.id!='CurrentE') {
            elem.checked=false;
        }
    });
    e.id="";
};

function AppendHeader() {
    let elem = document.querySelector('.header-options');
    let [div,div2] = [document.createElement('div'),document.createElement('div')];
    div.onclick=function() {
        SaveTest();
    };
    div.textContent = "Zapisz Test";
    elem.append(div);
    div2.onclick = function() {
        ExportTest();
    };
    div2.textContent = "Udostępnij Test";
    elem.append(div2);
};

setTimeout(()=>{
    AppendHeader();
},200);

function EncodeURI(arr) {
    return Citizen.compressToEncodedURIComponent(encodeURIComponent(JSON.stringify(arr)));
};

function DecodeURI(arr) {
    return JSON.parse(decodeURIComponent(Citizen.decompressFromEncodedURIComponent(arr)));
};

function ExportTest() {
    CreateForm({
        title: "Test",
        elements: [
            {title: 'Tytuł', type: 'text', id: 'title'},
            {title: 'Hasło (bez = brak)', type: 'text', id:'password'},
            {title: 'Anuluj', type: 'button', value: 'cancel'},
            {title: 'Akceptuj', type: 'button', value: 'accept'}
        ]
    }, (data,menu)=>{
        if(data.current.value=='accept'){
            if(data.title){
                if(confirm('Czy napewno chcesz przejść dalej?')){
                    let test = DownloadTestData();
                    let answers = [];
                    test.options.forEach(elem=>{
                        answers[answers.length]=elem.answers;
                        elem.answers=undefined;
                    });
                    GetPHPData('export',[
                        ['data',EncodeURI(test)],
                        ['answers',EncodeURI(answers)],
                        ['title',data.title],
                        ['pass',(data.password||'#NOT#SET')]
                    ], cb=>{
                        alert(cb);
                        menu.destroy();
                    });
                };
            } else {
                alert('Nie może być puste tytuł!');
            };
        } else {
            menu.destroy();
        };
    });
};

function DownloadTestData() {
    let docs = document.querySelectorAll('.elem-main');
    let retval = {
        title: docs[0].querySelector('input[type="text"]').value,
        options: []
    };
    for(let i=0;i<docs.length;i++){
        let title = docs[i].querySelector('.elem-title').querySelector('input').value;
        let elem = docs[i].querySelector('.elem-wrapper');
        let type = elem.querySelector('textarea')?'long':elem.querySelector('input[type="radio"]')?'single':elem.querySelector('input[type="checkbox"]')?'multiple':'short';
        retval.options[retval.options.length]={
            title: title,
            type: type,
            elems: [],
            answers: []
        };
        let srt = retval.options[retval.options.length-1];
        if(type=='short'){
            srt.answers[0]=elem.querySelector('input')?.value;
        } else if(type=='long') {
            srt.answers[0]=elem.querySelector('textarea')?.value;

        } else if(type=='single') {
            let txts = elem.querySelectorAll('input[type="text"]');
            let j=0;
            elem.querySelectorAll('input[type="radio"]').forEach(el=>{
                srt.elems[srt.elems.length]=txts[j].value;
                srt.answers[srt.answers.length]=el.checked;
                j++;
            });
        } else if(type=='multiple') {
            let txts = elem.querySelectorAll('input[type="text"]');
            let j=0;
            elem.querySelectorAll('input[type="checkbox"]').forEach(el=>{
                srt.elems[srt.elems.length]=txts[j].value;
                srt.answers[srt.answers.length]=el.checked;
                j++;
            });
        };
    };
    return retval;
};

function SaveTest() {
    let data = DownloadTestData();
    GetPHPData('save',[
        ['title',data.title],
        ['data',EncodeURI(data)]
    ],res=>{
        alert(res);
    });
};

var IsInTest = false

function StartTest(e) {
    let parent = e.parentNode.querySelectorAll('input');
    let data = [];
    for(let i=0;i<parent.length;i++) {
        data[data.length]=[parent[i].name,parent[i].value];
        if(parent[i].name!='pass'&&!parent[i].value){
            alert('Nieprawidłowe dane!');
            return;
        };
    };
    GetPHPData('get_test',data,res=>{
        if(res.substring(0,1)=='^'){
            alert(res.substring(1,res.length));
        } else {
            e.parentNode.remove();
            CreateProject(DecodeURI(res),true);
            IsInTest = true;
        };
    });
};

function RemoveWhole(e) {
    e.parentNode.parentNode.remove();
    UpdateHeight(-1,0)
}

function FinishTest() {
    let data = DownloadTestData();
    console.log(data);
    let answ = [];
    data.options.forEach(elem=>{
        answ[answ.length] = elem.answers;
    });
    if(confirm('Napewno chcesz zakończyć test?')){
        GetPHPData('finish_test',[
            ['answers',EncodeURI(answ)],
            ['data',EncodeURI({firstname:getCookie('firstname').toLowerCase(),surname:getCookie('surname').toLowerCase(),class:getCookie('class').toLowerCase()})]
        ], (res)=>{
            if(res.substring(0,1)=='^'){
                alert(res.substring(1,res.length));
            } else {
                alert('Zakończyłeś test, powrócisz teraz na stronę główną');
                OpenNewElem('');
            };
        });
    };
}