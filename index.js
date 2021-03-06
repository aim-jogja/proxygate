const {ipcRenderer} = require('electron');
const { BrowserWindow } = require('electron').remote;
const fetch = require('node-fetch');

var startURL = "https://www.proxyscan.io/api/proxy?last_check=9800&limit=1&level=anonymous&type=socks4,socks5";
var pingURL = "&ping=";
var uptimeURL = "&uptime=";
var regURL = "&country=";
var ip;
var port;
var url;
var proto;
var ipInfo;
var ipGen;
var reg = null;
var upTime;
var ping;
var URL;
var ipStore = ['0.0.0.0'];
var portStore = ['1234'];
var protoStore = ['SOCKS4'];


function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    });
    reg = checkbox.value;
    console.log(reg);
};

function changeUpTime() {
    upTime = document.getElementById("UpTimeServer").value;
    console.log(upTime);
}

function changePing() {
    ping = document.getElementById("PingServer").value;
    console.log(ping)
}

function genAuto() {
    var check = document.getElementById('setAuto')
    var setServer = document.getElementById('setting-server')

    if (check.checked == true){
        setServer.style.display = "block";
      } else {
         setServer.style.display = "none";
      }
}

function openNewWindow(){
    var part = 'unique_part'+ipInfo
    var wind 
        
        wind = new BrowserWindow({width: 400, height: 400, webPreferences: {
            nodeIntegration: true,
            partition: part
        }})
        wind.setMenu(null);
        wind.webContents.session.setProxy({proxyRules:ipInfo}, function () {
            console.log('using the proxy  : '+ipInfo);
            wind.loadURL(url,{userAgent: 'Chrome'});
        })
        console.log('Partition : '+part);
        console.log('Window is : '+wind);
};


function removeDuplicate(data){
    return data.filter((value,index)=> data.indexOf(value)===index);
}

const generate =()=>{
    if(reg != null){
        URL = startURL + regURL + reg + uptimeURL + upTime + pingURL + ping;
    }else{
        URL = startURL + uptimeURL + upTime + pingURL + ping;
    }
    console.log(URL)
    fetch(URL)
    .then(data=>{return data.json()})
    .then(res=>{ipGen = res})
    .then(()=>{
        var count = 0;
        for(i=0;i<ipStore.length;i++){
            if(ipGen[0].Ip != ipStore[i]){
                count++;
            }else{
                
                break;
            }}
        if(count == ipStore.length){
            ipStore.push(ipGen[0].Ip);
            portStore.push(ipGen[0].Port);
            protoStore.push(ipGen[0].Type[0]);
        }
        ipStore = removeDuplicate(ipStore);
        //portStore = removeDuplicate(portStore);
        //protoStore = removeDuplicate(protoStore);    
    
    })
    .then(()=>{
        console.log(ipStore[ipStore.length-1]);
        document.getElementById("ip-field").value = ipStore[ipStore.length-1];
        document.getElementById("port-field").value = portStore[portStore.length-1];
        document.getElementById("protocol").value = protoStore[protoStore.length-1];
        console.log(URL)
    })
};

const generates =async()=>{
    await generate()
};
const start =async()=>{
    ip = document.forms["field"]["ip-field"].value;
    port = document.forms["field"]["port-field"].value;
    proto = document.forms["field"]["protocol-field"].value;
    url = document.forms["field"]["url-field"].value;
    ipInfo = proto+"://"+ip+":"+port;
    
    if(ip=="" || port == "" || proto == "" || url == ""){
        alert("IP dan Port dan Protocol dan URL tidak boleh Kosong");
    }else{
        alert("Buka "+url+" dengan "+proto+"://"+ip+":"+port+" tunneling ?");
        openNewWindow();        
    }
};

