/**
 * rsvp.js
 * -----------------------------------
 * RSVP + Guest Wishes
 * -----------------------------------
 */

const STORAGE_KEY = "ucapan-danar-celly-2026";

const SELECTOR = {
    form: "#rsvp-form",
    success: "#rsvp-sukses",
    list: "#ucapan-list",
    section: "#ucapan-section",
    guest: "#rsvp-nama-tamu",

    jumlah: "#rsvp-jumlah",
    status: "#rsvp-status",
    pesan: "#rsvp-pesan"
};

const $ = (s) => document.querySelector(s);

/* -----------------------------
   STORAGE
-------------------------------- */

function loadData() {

    try {

        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    } catch {

        return [];

    }

}

function saveData(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

/* -----------------------------
   BADGE
-------------------------------- */

function badge(status) {

    switch(status){

        case "Hadir":

            return `<span class="badge-hadir">
                        <i class="bi bi-check-circle-fill"></i>
                        Hadir
                    </span>`;

        case "Tidak Hadir":

            return `<span class="badge-tidak-hadir">
                        <i class="bi bi-x-circle-fill"></i>
                        Tidak Hadir
                    </span>`;

        default:

            return `<span class="badge-ragu">
                        <i class="bi bi-question-circle-fill"></i>
                        Ragu-ragu
                    </span>`;

    }

}

/* -----------------------------
   RENDER
-------------------------------- */

function renderList() {

    const container = $(SELECTOR.list);

    if(!container) return;

    const data = loadData();

    if(data.length===0){

        container.innerHTML=`
            <p class="ucapan-kosong">
                Belum ada ucapan 💌
            </p>
        `;

        return;

    }

    container.innerHTML=data.map(item=>`

        <div class="ucapan-item">

            <div class="ucapan-header">

                <span class="ucapan-nama">

                    <i class="bi bi-person-circle"></i>

                    ${item.nama}

                </span>

                ${badge(item.status)}

            </div>

            <p class="ucapan-pesan">

                "${item.pesan}"

            </p>

            <span class="ucapan-waktu">

                ${item.waktu}

            </span>

        </div>

    `).join("");

}

/* -----------------------------
   DATE
-------------------------------- */

function now(){

    const d=new Date();

    return d.toLocaleDateString("id-ID",{

        day:"numeric",

        month:"long",

        year:"numeric"

    })+" "+d.toLocaleTimeString("id-ID",{

        hour:"2-digit",

        minute:"2-digit"

    });

}

/* -----------------------------
   API
-------------------------------- */

async function sendToWeb3Forms(data){

    try{

        await fetch("https://api.web3forms.com/submit",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                access_key:"GANTI_ACCESS_KEY_ANDA",

                "Nama Tamu":data.nama,

                "Jumlah":data.jumlah,

                "Status":data.status,

                "Ucapan":data.pesan

            })

        });

    }catch(err){

        console.warn(err);

    }

}

/* -----------------------------
   SUBMIT
-------------------------------- */

async function submitForm(e){

    e.preventDefault();

    const form=e.target;

    const btn=form.querySelector("button[type=submit]");

    btn.disabled=true;

    btn.innerHTML='<i class="bi bi-hourglass-split"></i> Mengirim...';

    const data={

        nama:$(SELECTOR.guest).textContent,

        jumlah:$(SELECTOR.jumlah).value,

        status:$(SELECTOR.status).value,

        pesan:$(SELECTOR.pesan).value.trim(),

        waktu:now()

    };

    if(!data.pesan){

        btn.disabled=false;

        btn.innerHTML='<i class="bi bi-send"></i> Kirim Konfirmasi';

        return;

    }

    const list=loadData();

    list.unshift(data);

    saveData(list);

    renderList();

    await sendToWeb3Forms(data);

    form.classList.add("d-none");

    $(SELECTOR.success).classList.remove("d-none");

    setTimeout(()=>{

        $(SELECTOR.section)

            ?.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

    },400);

}

/* -----------------------------
   INIT
-------------------------------- */

export function initRSVP(){

    renderList();

    const form=$(SELECTOR.form);

    if(!form) return;

    form.addEventListener(

        "submit",

        submitForm

    );

}
