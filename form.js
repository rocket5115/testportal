function CreateForm(options,cb,cb2) {
    let name = options.title;
    let elements = options.elements;
    let div = document.createElement('div');
    let id = 'FORM'+Math.random();
    div.id = id;
    div.classList.add('form-control');
    let [title,wrapper] = [document.createElement('div'),document.createElement('div')];
    title.classList.add('form-title');
    title.textContent = name;
    wrapper.classList.add('form-wrapper');
    div.append(title);
    div.append(wrapper);
    let ids = [];
    for(let i=0;i<elements.length;i++) {
        let elem = elements[i].type!='text'?document.createElement('div'):document.createElement('input');
        elem.classList.add('form-'+(elements[i].type?elements[i].type:'text'));
        if(elements[i].type!='text') {
            elem.textContent = elements[i].title;
            if(cb) {
                elem.onclick = function() {
                    elements[i].options={
                        current: {
                            title: elements[i].title,
                            type: 'button',
                            value: elements[i].value,
                            custom: elements[i].custom,
                            custom2: elements[i].custom2,
                            custom3: elements[i].custom3
                        }
                    };
                    ids.forEach(id=>{
                        elements[i].options[id]=document.getElementById(id)?.value;
                    });
                    cb(elements[i].options,{
                        destroy: ()=>{
                            DestroyForm(id);
                        }
                    });
                };
            };
        } else {
            elem.placeholder = elements[i].title;
            let pid = elements[i].id||ids.length;
            elem.id=pid;
            ids[ids.length]=pid;
        };
        wrapper.append(elem);
    };
    $('body').append(div);
};

function DestroyForm(id) {
    document.getElementById(id).remove();
};