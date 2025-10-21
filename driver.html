<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard Driver</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
  body, html { margin:0; padding:0; height:100%; font-family:Poppins,sans-serif; }
  #map { height: calc(100% - 60px - 60px); width:100%; }

  .topbar{
    height:60px; background:#007bff; color:white; display:flex; align-items:center;
    justify-content:space-between; padding:0 15px; box-shadow:0 3px 6px rgba(0,0,0,0.2);
  }
  .topbar img{ width:40px; height:40px; border-radius:50%; margin-right:10px; object-fit:cover; }
  .topbar .user-info{ display:flex; align-items:center; font-weight:600; }
  .topbar button{ padding:8px 15px; border:none; border-radius:20px; background:white; color:#007bff; font-weight:600; cursor:pointer; }

  .bottom-nav{
    height:60px; background:#007bff; display:flex; align-items:center; justify-content:space-around;
    position:fixed; bottom:0; width:100%; z-index:999; box-shadow:0 -3px 6px rgba(0,0,0,0.2);
  }
  .bottom-nav button{
    background:none; border:none; color:white; font-size:22px; cursor:pointer; display:flex; flex-direction:column; align-items:center;
  }
  .bottom-nav button span{ font-size:12px; margin-top:2px; }
  .bottom-nav button.active{ color:#ffc107; }
  .bottom-nav button:hover{ color:#ffc107; }

  #profileModal{
    display:none; position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.5); z-index:1000; justify-content:center; align-items:center;
    transition: opacity 0.3s ease; opacity:0;
  }
  #profileModal.show{ display:flex; opacity:1; }
  #profileModal > div{
    background:white; padding:20px; border-radius:10px; width:300px; text-align:center; 
    position:relative; transform: translateY(-50px); transition: transform 0.3s ease;
  }
  #profileModal.show > div{ transform: translateY(0); }
  #profileModal img{ width:80px; height:80px; border-radius:50%; object-fit:cover; margin-bottom:10px; }
  #profileModal button{ padding:10px 15px; border:none; background:#007bff; color:white; border-radius:5px; margin-top:10px; cursor:pointer; }
  #closeProfile{ position:absolute; top:10px; right:15px; cursor:pointer; font-weight:bold; }

  /* Speedometer */
  #speedometer{
    position: fixed;
    bottom: 70px;
    left: 10px;
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: bold;
    z-index: 999;
    font-size: 16px;
  }

  /* Overlay Darurat Full Layar */
  #dangerOverlay{
    display:none;
    position:fixed;
    top:0; left:0; width:100%; height:100%;
    background:red;
    opacity:0.8;
    z-index:2000;
    color:white;
    text-align:center;
    font-size:28px;
    font-weight:bold;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  #dangerOverlay button{
    margin-top:20px;
    padding:15px 30px;
    font-size:24px;
    font-weight:bold;
    background:white;
    color:red;
    border:none;
    border-radius:10px;
    cursor:pointer;
  }

  @keyframes blink{
    0%,50%,100%{opacity:0.8;}
    25%,75%{opacity:0.3;}
  }
</style>
</head>
<body>

<div class="topbar">
  <div class="user-info">
    <img id="driverPhoto" src="https://via.placeholder.com/40">
    <span id="driverName">Driver</span>
  </div>
  <button id="toggleBtn">On</button>
</div>

<div id="map"></div>
<div id="speedometer">0 km/j</div>

<div class="bottom-nav">
    <button id="navHome"><i class="fas fa-home"></i><span>Home</span></button>
  <button id="pesanBtn"><i class="fas fa-car"></i><span>Pesan</span></button>
  <button id="navOrder"><i class="fas fa-car-side"></i><span>Order</span></button>
  <button id="navInfo"><i class="fas fa-info-circle"></i><span>Info</span></button>
  <button id="navProfile"><i class="fas fa-user"></i><span>Profil</span></button>
</div>

<div id="profileModal">
  <div>
    <span id="closeProfile">&times;</span>
    <img id="modalPhoto" src="https://via.placeholder.com/80">
    <h3 id="modalName">Driver Name</h3>
    <p id="modalEmail">Email: example@mail.com</p>
    <p id="modalPhone">Telp: 08123456789</p>
    <button id="modalLogout">Logout</button>
  </div>
</div>

<!-- Overlay Darurat -->
<div id="dangerOverlay">
  <div id="dangerText"></div>
  <button id="safeBtn">Aman</button>
</div>

<!-- Sirene Full Bass -->
<audio id="sirenAudio" loop>
  <source src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" type="audio/ogg">
</audio>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, update, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3FQbFF5a91MlASpqImTMmGkYvaTcdxm0",
  authDomain: "kadek-ed34e.firebaseapp.com",
  databaseURL: "https://kadek-ed34e-default-rtdb.firebaseio.com",
  projectId: "kadek-ed34e",
  storageBucket: "kadek-ed34e.appspot.com",
  messagingSenderId: "65756136303",
  appId: "1:65756136303:web:6dbe5bc658fadb05ca1e9a"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const driverKey = localStorage.getItem('driverKey');
if(!driverKey){ alert("Silakan login dulu!"); window.location.href="index.html"; }

const driverRef = ref(db,'drivers/'+driverKey);

// Load driver info
onValue(driverRef,snapshot=>{
  const driver = snapshot.val();
  if(driver){
    document.getElementById('driverName').innerText = driver.name;
    document.getElementById('driverPhoto').src = driver.photo || "https://via.placeholder.com/40";
  }
});

// Toggle On/Off
let isOnline = true;
const toggleBtn = document.getElementById('toggleBtn');
toggleBtn.onclick = ()=>{
  isOnline = !isOnline;
  toggleBtn.innerText = isOnline ? "On" : "Off";
  update(driverRef,{online:isOnline});
};

// Speedometer & update lokasi
let lastPos = null;
function updateLocation(){
  if(!isOnline) return;
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const now = Date.now();
      if(lastPos){
        const dt = (now - lastPos.time)/1000;
        const distance = Math.sqrt(Math.pow(lat-lastPos.lat,2)+Math.pow(lng-lastPos.lng,2)) * 111139;
        const speed = distance/dt*3.6;
        document.getElementById('speedometer').innerText = speed.toFixed(1) + ' km/j';
      }
      lastPos = {lat,lng,time:now};
      get(driverRef).then(snapshot=>{
        const driverData = snapshot.val() || {};
        update(driverRef,{
          prevLat: driverData.lat || null,
          prevLng: driverData.lng || null,
          lat, lng,
          lastUpdate: Date.now(),
          online:isOnline
        });
      });
    });
  }
}
setInterval(updateLocation,1000);

// Navbar & profil modal
function setActiveIcon(activeId){
  document.querySelectorAll('.bottom-nav button').forEach(btn=>btn.classList.remove('active'));
  document.getElementById(activeId).classList.add('active');
}
document.getElementById('navProfile').onclick = ()=>{
  setActiveIcon('navProfile');
  const modal = document.getElementById('profileModal');
  modal.classList.add('show');
  if(navigator.vibrate) navigator.vibrate([100,50,100]);
  get(driverRef).then(snapshot=>{
    const d = snapshot.val();
    if(d){
      document.getElementById('modalName').innerText = d.name || "Driver";
      document.getElementById('modalPhoto').src = d.photo || "https://via.placeholder.com/80";
      document.getElementById('modalEmail').innerText = "Email: "+(d.email||"-");
      document.getElementById('modalPhone').innerText = "Telp: "+(d.phone||"-");
    }
  });
};
document.getElementById('closeProfile').onclick = ()=>{document.getElementById('profileModal').classList.remove('show');};
document.getElementById('modalLogout').onclick = ()=>{
  localStorage.removeItem('driverKey'); window.location.href="index.html";
};

// ------------------- Google Maps -------------------
let map;
let markers = {};
function getBorderColor(driver){ return driver.online ? 'green':'red'; }

function moveMarker(marker,newPos){
  const DELTA=0.00005;
  const interval = setInterval(()=>{
    const lat=marker.position.lat();
    const lng=marker.position.lng();
    const diffLat=newPos.lat-lat;
    const diffLng=newPos.lng-lng;
    if(Math.abs(diffLat)<DELTA && Math.abs(diffLng)<DELTA){ marker.position=newPos; clearInterval(interval); return; }
    marker.position={lat:lat+diffLat*0.2,lng:lng+diffLng*0.2};
    if(marker.customLabel) marker.customLabel.draw();
  },30);
}
function getOffsetPosition(lat,lng){ return {lat:lat+(Math.random()-0.5)*0.00005,lng:lng+(Math.random()-0.5)*0.00005}; }

window.initMap=function(){
  map=new google.maps.Map(document.getElementById('map'),{center:{lat:-8.65,lng:115.2167}, zoom:10});
  const driversRefAll=ref(db,'drivers');
  onValue(driversRefAll,snapshot=>{
    const data=snapshot.val();
    if(data){
      Object.entries(data).forEach(([key,driver])=>{
        if(driver.lat && driver.lng){
          let pos={lat:driver.lat,lng:driver.lng};
          if(markers[key]){
            moveMarker(markers[key],pos);
            markers[key].customLabel.div.style.borderColor=getBorderColor(driver);
          }else{
            const label=new google.maps.OverlayView();
            label.position=pos;
            label.onAdd=function(){
              const div=document.createElement('div');
              div.style.position='absolute'; div.style.width='40px'; div.style.height='40px';
              div.style.borderRadius='50%'; div.style.overflow='hidden';
              div.style.border=`3px solid ${getBorderColor(driver)}`;
              div.style.boxShadow='0 0 4px rgba(0,0,0,0.5)'; div.style.cursor='pointer';
              const img=document.createElement('img'); img.src=driver.photo||"https://via.placeholder.com/40";
              img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover';
              div.appendChild(img); this.div=div; this.getPanes().overlayImage.appendChild(div);

              div.onclick=()=>{
                const infoContent=document.createElement('div');
                infoContent.style.textAlign='center';
                infoContent.innerHTML=`<img src="${driver.photo||'https://via.placeholder.com/50'}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;"><br>
                <b>${driver.name}</b><br>
                Status: <b>${driver.online?'Online':'Offline'}</b><br>`;
                
                if(driverKey===key){ // Tombol darurat driver sendiri
                  const btn = document.createElement('button');
                  btn.innerText="DARURAT";
                  btn.style.cssText="padding:5px 10px;margin-top:5px;border:none;background:red;color:white;border-radius:5px;cursor:pointer;font-weight:bold;";
                  btn.onclick = ()=>{
                    update(driverRef,{danger:true,dangerName:driver.name});
                  };
                  infoContent.appendChild(btn);
                }else{
                  const btn = document.createElement('button');
                  btn.innerText="Menuju ke Sini";
                  btn.style.cssText="padding:5px 10px;margin-top:5px;border:none;background:#007bff;color:white;border-radius:5px;cursor:pointer;";
                  btn.onclick = ()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${driver.lat},${driver.lng}`,'_blank');
                  infoContent.appendChild(btn);
                }

                const info=new google.maps.InfoWindow({content:infoContent});
                info.open(map,new google.maps.Marker({position:new google.maps.LatLng(driver.lat,driver.lng),map}));
              };
            };
            label.draw=function(){
              const overlayProjection=this.getProjection();
              const posPixel=overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(label.position.lat,label.position.lng));
              if(this.div){ this.div.style.left=(posPixel.x-20)+'px'; this.div.style.top=(posPixel.y-20)+'px'; }
            };
            label.setMap(map);
            markers[key]={position:pos, customLabel:label};
          }
        }
      });
    }
  });
};

// ------------------- Darurat Semua Driver -------------------
const dangerOverlay = document.getElementById('dangerOverlay');
const dangerText = document.getElementById('dangerText');
const safeBtn = document.getElementById('safeBtn');
const sirenAudio = document.getElementById('sirenAudio');

safeBtn.onclick = ()=>{
  update(driverRef,{danger:false,dangerName:""});
  dangerOverlay.style.display='none';
  sirenAudio.pause();
  if(navigator.vibrate) navigator.vibrate(0);
};

const driversRefAll = ref(db,'drivers');
onValue(driversRefAll,snapshot=>{
  const data = snapshot.val();
  let anyDanger=false;
  let dangerDriver="";
  if(data){
    Object.values(data).forEach(d=>{
      if(d.danger){
        anyDanger=true;
        dangerDriver=d.dangerName||"Driver Lain";
      }
    });
  }

  if(anyDanger){
    dangerOverlay.style.display="flex";
    dangerText.innerText="Segera Bantu "+dangerDriver;
    dangerOverlay.style.animation="blink 1s infinite";
    sirenAudio.play().catch(e=>console.log("Audio play blocked",e));
    if(navigator.vibrate) navigator.vibrate([500,200,500,200]);
  }else{
    dangerOverlay.style.display="none";
    dangerOverlay.style.animation="none";
    sirenAudio.pause();
    if(navigator.vibrate) navigator.vibrate(0);
  }
});
</script>

<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap"></script>
</body>
</html>
