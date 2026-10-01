/* =========================
   DATA MENU
========================= */

let menu = [

    /* 13K */

    {
        nama: "Melon + Melon",
        harga: 13000,
        stok: 10
    },

    {
        nama: "Anggur + Anggur",
        harga: 13000,
        stok: 8
    },

    {
        nama: "Nanas + Nanas",
        harga: 13000,
        stok: 12
    },

    {
        nama: "Strowberry + Strowberry",
        harga: 13000,
        stok: 4
    },

    {
        nama: "Anggur + Stowberry",
        harga: 13000,
        stok: 7
    },

    {
        nama: "Strowberry + Melon",
        harga: 13000,
        stok: 10
    },

    {
        nama: "Strowberry + Nanas",
        harga: 13000,
        stok: 6
    },


    /* 15K */

    {
        nama: "Coklat + Coklat",
        harga: 15000,
        stok: 10
    },

    {
        nama: "Coklat + Melon",
        harga: 15000,
        stok: 8
    },

    {
        nama: "Coklat + Nanas",
        harga: 15000,
        stok: 5
    },

    {
        nama: "Coklat + Strowberry",
        harga: 15000,
        stok: 9
    },

    {
        nama: "Coklat + Kacang",
        harga: 15000,
        stok: 7
    },

    {
        nama: "Coklat + Anggur",
        harga: 15000,
        stok: 3
    },


    /* 16K */

    {
        nama: "Coklat + Durian",
        harga: 16000,
        stok: 8
    },

    {
        nama: "Coklat + Greentea",
        harga: 16000,
        stok: 6
    },

    {
        nama: "Coklat + Pisang",
        harga: 16000,
        stok: 10
    },

    {
        nama: "Coklat + Vanilla",
        harga: 16000,
        stok: 4
    },


    /* 17K */

    {
        nama: "Keju + Coklat",
        harga: 17000,
        stok: 12
    },

    {
        nama: "Keju + Nanas",
        harga: 17000,
        stok: 8
    },

    {
        nama: "Keju + Melon",
        harga: 17000,
        stok: 7
    },

    {
        nama: "Keju + Anggur",
        harga: 17000,
        stok: 9
    },

    {
        nama: "Keju + Strowberry",
        harga: 17000,
        stok: 5
    },

    {
        nama: "Keju + Vanilla",
        harga: 17000,
        stok: 6
    },


    /* 18K */

    {
        nama: "Keju + Durian",
        harga: 18000,
        stok: 4
    },

    {
        nama: "Keju + Kacang",
        harga: 18000,
        stok: 8
    },

    {
        nama: "Keju + Pisang",
        harga: 18000,
        stok: 10
    },


    /* 20K */

    {
        nama: "Keju + Greentea",
        harga: 20000,
        stok: 6
    },

    {
        nama: "Keju + Keju",
        harga: 20000,
        stok: 5
    },

    {
        nama: "Keju + Anggur + Coklat",
        harga: 20000,
        stok: 7
    },

    {
        nama: "Keju + Kacang + Coklat",
        harga: 20000,
        stok: 4
    },

    {
        nama: "Durian + Durian",
        harga: 20000,
        stok: 8
    },

    {
        nama: "Keju + Strowberry + Coklat",
        harga: 20000,
        stok: 3
    },


    /* 22K */

    {
        nama: "Keju + Coklat + Durian",
        harga: 22000,
        stok: 6
    },


    /* 24K */

    {
        nama: "Keju + Pisang + Durian + Coklat",
        harga: 24000,
        stok: 10
    }

];


/* =========================
   PENGATURAN
========================= */

let batasStok = 5;

/* =========================
   DATA EXTRA TOPPING
========================= */

let extraTopping = [

    {
        nama: "Keju",
        harga: 4000,
        stok: 8
    },

    {
        nama: "Coklat",
        harga: 4000,
        stok: 4
    },

    {
        nama: "Greentea",
        harga: 4000,
        stok: 6
    }

];

let filterAktif = "Semua";

let kataKunci = "";


/* =========================
   FORMAT RUPIAH
========================= */

function rupiah(angka) {

    return angka.toLocaleString("id-ID");

}

/* =========================
   TAMPILKAN MENU
========================= */

function tampilkanMenu() {

    const daftarMenu =
        document.getElementById("daftarMenu");

    daftarMenu.innerHTML = "";


    let totalStok = 0;

    let stokRendah = 0;

    /* HITUNG TOTAL */

    menu.forEach(function(item) {

        totalStok += item.stok;

        if (item.stok <= batasStok) {

            stokRendah++;

        }

    });


    /* FILTER MENU */

    let menuTampil =
        menu.filter(function(item) {

            /* FILTER STOK */

            if (
                filterAktif === "Aman" &&
                item.stok <= batasStok
            ) {

                return false;

            }


            if (
                filterAktif === "Rendah" &&
                item.stok > batasStok
            ) {

                return false;

            }


            /* FILTER SEARCH */

            if (
                !item.nama
                    .toLowerCase()
                    .includes(
                        kataKunci.toLowerCase()
                    )
            ) {

                return false;

            }


            return true;

        });


    /* =========================
       KELOMPOKKAN BERDASARKAN HARGA
    ========================== */

    let kelompokHarga = {};


    menuTampil.forEach(function(item) {

        if (!kelompokHarga[item.harga]) {

            kelompokHarga[item.harga] = [];

        }

        kelompokHarga[item.harga].push(item);

    });


    /* =========================
       TAMPILKAN GROUP
    ========================== */

    Object.keys(kelompokHarga)

        .sort(function(a, b) {

            return Number(a) - Number(b);

        })

        .forEach(function(harga) {


            let group =
                document.createElement("div");

            group.className = "price-group";

         group.innerHTML = `

    <div class="price-title">

        <div class="price-badge">
            Rp ${rupiah(Number(harga))}
        </div>

     <div class="price-line"></div>

    </div>

    <div class="menu-container"></div>

`;


            daftarMenu.appendChild(group);


            let container =
                group.querySelector(
                    ".menu-container"
                );


            kelompokHarga[harga].forEach(
                function(item) {


                    let index =
                        menu.indexOf(item);


                    let card =
                        document.createElement("div");


                    card.className = "menu";


                    let rendah =
                        item.stok <= batasStok;


                    if (rendah) {

                        card.classList.add("merah");

                    }


                    card.innerHTML = `

                        <h3>
                            ${item.nama}
                        </h3>

                        <p class="harga">
                            Rp ${rupiah(item.harga)}
                        </p>


                        <div class="stok">

                            <span>
                                Stok
                            </span>

                            <strong>
                                ${item.stok}
                            </strong>

                        </div>


                        <p class="status">

                            ${
                                rendah
                                ? "⚠ STOK HAMPIR HABIS"
                                : "✓ STOK AMAN"
                            }

                        </p>


                        <div class="tombol">

                            <button
                                class="kurang"
                                onclick="kurangiStok(${index})">

                                − Kurangi

                            </button>


                            <button
                                class="tambah"
                                onclick="tambahStok(${index})">

                                + Tambah

                            </button>

                        </div> `;


                    container.appendChild(card);

                }

            );

        });


    /* JIKA TIDAK ADA MENU */

    if (menuTampil.length === 0) {

        daftarMenu.innerHTML = `

            <div class="tidak-ada">

                Menu tidak ditemukan.

            </div>

        `;

    }


    /* =========================
       UPDATE RINGKASAN
    ========================== */

    document.getElementById("totalMenu")
        .textContent = menu.length;


    document.getElementById("totalStok")
        .textContent = totalStok;


    document.getElementById("stokHabis")
        .textContent = stokRendah;

}


/* =========================
   TAMBAH STOK
========================= */

function tambahStok(index) {

    menu[index].stok++;

    tampilkanMenu();

}

/* =========================
   KURANGI STOK
========================= */

function kurangiStok(index) {

    if (menu[index].stok > 0) {

        menu[index].stok--;

    }

    tampilkanMenu();

}

/* =========================
   FILTER
========================= */

function filterMenu(filter, tombol) {

    filterAktif = filter;


    document
        .querySelectorAll(".kategori-btn")
        .forEach(function(button) {

            button.classList.remove("aktif");

        });


    tombol.classList.add("aktif");


    tampilkanMenu();

}


/* =========================
   SEARCH
========================= */

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        kataKunci = this.value;

        tampilkanMenu();

    });


/* =========================
   MODAL
========================= */

function bukaForm() {

    document
        .getElementById("modal")
        .classList.add("aktif");

}


function tutupForm() {

    document
        .getElementById("modal")
        .classList.remove("aktif");

}


/* =========================
   TAMBAH MENU BARU
========================= */

document
    .getElementById("formMenu")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let nama =
                document
                    .getElementById("namaMenu")
                    .value;


            let harga =
                Number(
                    document
                        .getElementById("hargaMenu")
                        .value
                );


            let stok =
                Number(
                    document
                        .getElementById("stokMenu")
                        .value
                );


            menu.push({

                nama: nama,

                harga: harga,

                stok: stok

            });


            tampilkanMenu();


            document
                .getElementById("formMenu")
                .reset();


            tutupForm();

        }
    );

/* =========================
   TAMPILKAN EXTRA TOPPING
========================= */

function tampilkanExtraTopping() {

    const container =
        document.getElementById("extraToppingList");

    container.innerHTML = "";


    extraTopping.forEach(function(item, index) {

        let rendah =
            item.stok <= batasStok;


        let card =
            document.createElement("div");


        card.className = "topping-card";


        if (rendah) {

            card.classList.add("merah");

        }


        card.innerHTML = `

            <p class="topping-nama">
                ${item.nama}
            </p>


            <p class="topping-harga">
                Rp ${item.harga.toLocaleString("id-ID")}
            </p>


            <div class="topping-stok">

                <span>
                    Stok
                </span>

                <strong>
                    ${item.stok}
                </strong>

            </div>


            <p class="topping-status">

                ${
                    rendah
                    ? "⚠ STOK HAMPIR HABIS"
                    : "✓ STOK AMAN"
                }

            </p>


            <div class="topping-tombol">

                <button
                    class="topping-kurang"
                    onclick="kurangiTopping(${index})">

                    − Kurangi

                </button>


                <button
                    class="topping-tambah"
                    onclick="tambahTopping(${index})">

                    + Tambah

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}

/* =========================
   TAMBAH STOK TOPPING
========================= */

function tambahTopping(index) {

    extraTopping[index].stok++;

    tampilkanExtraTopping();

}



/* =========================
   KURANGI STOK TOPPING
========================= */

function kurangiTopping(index) {

    if (extraTopping[index].stok > 0) {

        extraTopping[index].stok--;

    }

    tampilkanExtraTopping();

}
/* =========================
   JALANKAN
========================= */

tampilkanMenu();
tampilkanExtraTopping();
