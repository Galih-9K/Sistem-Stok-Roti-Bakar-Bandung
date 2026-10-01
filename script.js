/* =========================================
   KONEKSI SUPABASE
========================================= */
const SUPABASE_URL =
    "https://dlypehgyoijohrxshtus.supabase.co";
const SUPABASE_KEY =
    "sb_publishable_dhY_gV48v71cHvNDCmFilA_2yqPCTdj";
const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================
   DATA
========================================= */

let menu = [];

let extraTopping = [];

let batasStok = 5;

let filterAktif = "Semua";

let kataKunci = "";


/* =========================================
   FORMAT RUPIAH
========================================= */

function rupiah(angka) {

    return Number(angka).toLocaleString("id-ID");

}


/* =========================================
   AMBIL DATA SUPABASE
========================================= */

async function ambilDataStok() {

    const { data, error } =
        await supabaseClient
            .from("stok")
            .select("*")
            .order("harga", {
                ascending: true
            });


    if (error) {

        console.error(
            "Gagal mengambil data:",
            error
        );

        return;

    }


    menu = data.filter(function(item) {

        return item.tipe === "menu";

    });


    extraTopping = data.filter(function(item) {

        return item.tipe === "topping";

    });


    tampilkanMenu();

    tampilkanExtraTopping();

}


/* =========================================
   TAMPILKAN MENU
========================================= */

function tampilkanMenu() {

    const daftarMenu =
        document.getElementById(
            "daftarMenu"
        );


    daftarMenu.innerHTML = "";


    let totalStok = 0;

    let jumlahHampirHabis = 0;


    /* HITUNG TOTAL */

    menu.forEach(function(item) {

        totalStok += Number(item.stok);


        if (
            Number(item.stok)
            <= Number(item.batas_minimum)
        ) {

            jumlahHampirHabis++;

        }

    });


    /* =====================================
       FILTER
    ===================================== */

    let menuTampil = menu.filter(
        function(item) {


            if (
                filterAktif === "Aman" &&
                Number(item.stok)
                <= Number(item.batas_minimum)
            ) {

                return false;

            }


            if (
                filterAktif === "Rendah" &&
                Number(item.stok)
                > Number(item.batas_minimum)
            ) {

                return false;

            }


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

        }
    );


    /* =====================================
       KELOMPOKKAN BERDASARKAN HARGA
    ===================================== */

    let kelompokHarga = {};


    menuTampil.forEach(function(item) {

        if (!kelompokHarga[item.harga]) {

            kelompokHarga[item.harga] = [];

        }


        kelompokHarga[item.harga]
            .push(item);

    });


    /* =====================================
       TAMPILKAN KELOMPOK HARGA
    ===================================== */

    Object.keys(kelompokHarga)

        .sort(function(a, b) {

            return Number(a) - Number(b);

        })

        .forEach(function(harga) {


            let group =
                document.createElement(
                    "div"
                );


            group.className =
                "price-group";


            group.innerHTML = `

                <div class="price-title">

                    <div class="price-badge">
                        Rp ${rupiah(harga)}
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


            kelompokHarga[harga]
                .forEach(function(item) {


                    let card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "menu";


                    let rendah =
                        Number(item.stok)
                        <= Number(
                            item.batas_minimum
                        );


                    if (rendah) {

                        card.classList.add(
                            "merah"
                        );

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
                                onclick="kurangiStok(${item.id})">

                                − Kurangi

                            </button>


                            <button
                                class="tambah"
                                onclick="tambahStok(${item.id})">

                                + Tambah

                            </button>

                        </div>

                    `;


                    container.appendChild(
                        card
                    );

                });

        });


    /* =====================================
       UPDATE RINGKASAN
    ===================================== */

    document.getElementById(
        "totalMenu"
    ).textContent = menu.length;


    document.getElementById(
        "totalStok"
    ).textContent = totalStok;


    document.getElementById(
        "stokHabis"
    ).textContent =
        jumlahHampirHabis;

}


/* =========================================
   TAMBAH STOK MENU
========================================= */

async function tambahStok(id) {

    const item =
        menu.find(function(item) {

            return item.id === id;

        });


    if (!item) {

        return;

    }


    const stokBaru =
        Number(item.stok) + 1;


    const { error } =
        await supabaseClient
            .from("stok")
            .update({

                stok: stokBaru,

                updated_at:
                    new Date().toISOString()

            })
            .eq("id", id);


    if (error) {

        console.error(
            "Gagal menambah stok:",
            error
        );

        return;

    }

}


/* =========================================
   KURANGI STOK MENU
========================================= */

async function kurangiStok(id) {

    const item =
        menu.find(function(item) {

            return item.id === id;

        });


    if (!item) {

        return;

    }


    if (Number(item.stok) <= 0) {

        return;

    }


    const stokBaru =
        Number(item.stok) - 1;


    const { error } =
        await supabaseClient
            .from("stok")
            .update({

                stok: stokBaru,

                updated_at:
                    new Date().toISOString()

            })
            .eq("id", id);


    if (error) {

        console.error(
            "Gagal mengurangi stok:",
            error
        );

        return;

    }

}


/* =========================================
   FILTER
========================================= */

function filterMenu(
    filter,
    tombol
) {

    filterAktif = filter;


    document
        .querySelectorAll(
            ".kategori-btn"
        )
        .forEach(function(button) {

            button.classList.remove(
                "aktif"
            );

        });


    tombol.classList.add(
        "aktif"
    );


    tampilkanMenu();

}


/* =========================================
   SEARCH
========================================= */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function() {

            kataKunci =
                this.value;

            tampilkanMenu();

        }
    );


/* =========================================
   EXTRA TOPPING
========================================= */

function tampilkanExtraTopping() {

    const container =
        document.getElementById(
            "extraToppingList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    extraTopping.forEach(
        function(item) {


            let rendah =
                Number(item.stok)
                <= Number(item.batas_minimum);


            let card =
                document.createElement(
                    "div"
                );


            card.className =
                "topping-card";


            if (rendah) {

                card.classList.add(
                    "merah"
                );

            }


            card.innerHTML = `

                <p class="topping-nama">
                    ${item.nama}
                </p>


                <p class="topping-harga">
                    Rp ${rupiah(item.harga)}
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
                        onclick="kurangiTopping(${item.id})">

                        − Kurangi

                    </button>


                    <button
                        class="topping-tambah"
                        onclick="tambahTopping(${item.id})">

                        + Tambah

                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================
   TAMBAH STOK TOPPING
========================================= */

async function tambahTopping(id) {

    const item =
        extraTopping.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!item) {

        return;

    }


    const stokBaru =
        Number(item.stok) + 1;


    const { error } =
        await supabaseClient
            .from("stok")
            .update({

                stok: stokBaru,

                updated_at:
                    new Date().toISOString()

            })
            .eq("id", id);


    if (error) {

        console.error(error);

    }

}


/* =========================================
   KURANGI STOK TOPPING
========================================= */

async function kurangiTopping(id) {

    const item =
        extraTopping.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!item) {

        return;

    }


    if (Number(item.stok) <= 0) {

        return;

    }


    const stokBaru =
        Number(item.stok) - 1;


    const { error } =
        await supabaseClient
            .from("stok")
            .update({

                stok: stokBaru,

                updated_at:
                    new Date().toISOString()

            })
            .eq("id", id);


    if (error) {

        console.error(error);

    }

}


/* =========================================
   BUKA / TUTUP FORM
========================================= */

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


/* =========================================
   TAMBAH MENU
========================================= */

document
    .getElementById("formMenu")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const nama =
                document.getElementById(
                    "namaMenu"
                ).value;


            const harga =
                Number(
                    document.getElementById(
                        "hargaMenu"
                    ).value
                );


            const stok =
                Number(
                    document.getElementById(
                        "stokMenu"
                    ).value
                );


            const { error } =
                await supabaseClient
                    .from("stok")
                    .insert({

                        nama: nama,

                        harga: harga,

                        stok: stok,

                        batas_minimum: 5,

                        tipe: "menu"

                    });


            if (error) {

                console.error(error);

                alert(
                    "Menu gagal ditambahkan."
                );

                return;

            }


            document
                .getElementById(
                    "formMenu"
                )
                .reset();


            tutupForm();

        }
    );


/* =========================================
   REAL-TIME
========================================= */

supabaseClient
    .channel("stok-realtime")
    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "stok"
        },
        function(payload) {

            console.log(
                "Perubahan realtime:",
                payload
            );


            ambilDataStok();

        }
    )
    .subscribe(function(status) {

        console.log(
            "Realtime status:",
            status
        );

    });


/* =========================================
   JALANKAN
========================================= */

ambilDataStok();
