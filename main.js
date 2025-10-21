import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

// Switch tabs
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
loginTab.onclick = ()=>{ loginTab.classList.add('active'); registerTab.classList.remove('active'); loginForm.style.display='block'; registerForm.style.display='none'; }
registerTab.onclick = ()=>{ registerTab.classList.add('active'); loginTab.classList.remove('active'); registerForm.style.display='block'; loginForm.style.display='none'; }

// Toggle password
document.getElementById('toggleLoginPass').onclick = ()=> { const p=document.getElementById('loginPassword'); p.type=(p.type==='password')?'text':'password'; }
document.getElementById('toggleRegPass').onclick = ()=> { const p=document.getElementById('regPassword'); p.type=(p.type==='password')?'text':'password'; }

// Foto
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
let photoData="";
photoPreview.addEventListener('click',()=>photoInput.click());
photoInput.addEventListener('change', function(){
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = e=>{ photoData=e.target.result; photoPreview.src=photoData; }
    reader.readAsDataURL(file);
  }
});

// Register
document.getElementById('registerBtn').addEventListener('click', ()=>{
  const name=document.getElementById('regName').value.trim();
  const phone=document.getElementById('regPhone').value.trim();
  const plate=document.getElementById('regPlate').value.trim();
  const email=document.getElementById('regEmail').value.trim();
  const password=document.getElementById('regPassword').value.trim();
  if(!name||!phone||!plate||!email||!password){ alert("Semua field harus diisi!"); return; }

  const driversRef = ref(db,'drivers');
  onValue(driversRef,snapshot=>{
    const data=snapshot.val();
    let emailExists=false, phoneExists=false, plateExists=false;
    if(data){
      Object.values(data).forEach(d=>{
        if(d.email===email) emailExists=true;
        if(d.nomortelepon===phone) phoneExists=true;
        if(d.plate===plate) plateExists=true;
      });
    }
    if(emailExists){ alert("Email sudah terdaftar!"); return; }
    if(phoneExists){ alert("Nomor telepon sudah terdaftar!"); return; }
    if(plateExists){ alert("Plat mobil sudah terdaftar!"); return; }

    navigator.geolocation.getCurrentPosition(pos=>{
      const lat=pos.coords.latitude;
      const lng=pos.coords.longitude;
      const driverRef=push(driversRef);
      set(driverRef,{
        uid:driverRef.key,
        name, nomortelepon:phone, plate, email, password,
        photo:photoData, status:"Aktif",
        lat,lng,lastUpdate:Date.now()
      }).then(()=>{
        alert("Registrasi berhasil! Silakan login.");
        loginTab.click();
        document.getElementById('loginEmail').value=email;
        document.getElementById('loginPassword').value=password;
      });
    }, err=>alert("Gagal dapat lokasi: "+err.message));
  }, {onlyOnce:true});
});

// Login
document.getElementById('loginBtn').addEventListener('click', ()=>{
  const email=document.getElementById('loginEmail').value.trim();
  const password=document.getElementById('loginPassword').value.trim();
  if(!email||!password){ alert("Isi email & password!"); return; }

  const driversRef=ref(db,'drivers');
  onValue(driversRef,snapshot=>{
    const data=snapshot.val();
    let found=false;
    if(data){
      Object.entries(data).forEach(([key,driver])=>{
        if(driver.email===email && driver.password===password){
          found=true;
          if(driver.status!=="Aktif"){ alert("Akun tidak aktif!"); return; }
          localStorage.setItem('driverKey', key);
          alert(`Login sukses! Selamat datang, ${driver.name}`);
          window.location.href="driver.html";
        }
      });
      if(!found) alert("Email atau password salah!");
    } else alert("Belum ada driver terdaftar.");
  }, {onlyOnce:true});
});

// Lupa password
document.getElementById('forgotBtn').addEventListener('click', ()=>{
  const email=document.getElementById('loginEmail').value.trim();
  if(!email){ alert("Masukkan email untuk reset password"); return; }
  const driversRef=ref(db,'drivers');
  onValue(driversRef,snapshot=>{
    const data=snapshot.val();
    let found=false;
    if(data){
      Object.entries(data).forEach(([key,driver])=>{
        if(driver.email===email){
          found=true;
          const newPass=prompt("Masukkan password baru:");
          if(newPass) update(ref(db,'drivers/'+key),{password:newPass});
          alert("Password berhasil diubah!");
        }
      });
      if(!found) alert("Email tidak ditemukan!");
    }
  }, {onlyOnce:true});
});
