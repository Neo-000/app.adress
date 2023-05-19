const input = document.getElementById('input');
const switches = [];
const err = document.getElementById('err');
const value = {
    number:'12',
    active:{
        item_1:false,
        item_2:false,
        item_3:false,
        item_4:false,
        item_5:false,
        item_6:false,
        item_7:false,
        item_8:false
    },
    enums:[]

};
const chekpoint ={
    item_1:1,
    item_2:2,
    item_3:4,
    item_4:8,
    item_5:16,
    item_6:32,
    item_7:64,
    item_8:128
};

function logik(){
    console.log('!')
    let summ = Number(value.number);
    console.log(summ)
    for(let i = 8; i >= 1;i = i - 1){
        console.log(switches[i])
        let id = 'item_' + i;
        console.log(chekpoint[id])
        if(summ >= chekpoint[id]){
            summ = Number(summ) - Number( chekpoint[id]);
            value.active[id] = true
            switches[i].checked = true
        }
        else {
            summ = Number(summ);
            value.active[id] = false
            switches[i].checked = false
        }
        console.log('summ ' + summ)
    }
}



function switched(){
    let summ = 0;
    for(let key in chekpoint){
        if(value.active[key] == true){
            summ = Number(summ) + Number(chekpoint[key])
        }
    }
    value.number = Number(summ)
    PushNumber();
}

function event_switches(){
    for(let i = 1;i < switches.length;i++){
        switches[i].onclick = () =>{
            let id = `item_` + i;
            if(switches[i].checked){
             for (let key in value.active) {
                    if(key == id){
                        value.active[key] = true
                    }
                }
            }else{
                for (let key in value.active) {
                    if(key == id){
                        value.active[key] = false
                    }
                }
            }
            switched()
            // console.log(value.active)
          }
        }
    }

function getSwitches(){
    for(let i = 1; i < 9; i++){
        switches[i] = document.getElementById(`item_${i}`)
    }
}

function PushNumber(){
    input.value = value.number
}

function PushErr(text){
    if(text == '' || text == null || text == undefined){
        err.value = '';
    } else {
        err.value = text;
    }
}


function init(){
    getSwitches();
    event_switches();
    input.oninput = () => {
        // console.log('input invaled')
        value.number = Number(input.value);
        if(Number(value.number) > 255){
            PushErr('число не может быть больше 255')
            input.value = 255
            value.number = Number(input.value)
        } else{
            PushErr(null)
        }
        if(Number(input.value) < 0){
            PushErr('число не может быть меньше 0')
            input.value = 0
        } else {
            PushErr(null)
        }
        logik()
        // console.log(value.number)
    }
    // console.log(switches)
}



init()