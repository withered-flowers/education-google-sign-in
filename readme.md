## Table of Content
1. [Introduction](#introduction)
    - OAuth2
    - Social Media Login
1. [Let's Demo](#lets-demo)

### Prerequisites
- Sudah mengingstall nodejs dan postgresql
- Memahami framework Express pada nodejs
- Memahami penggunaan sequelize pada nodejs
- Memiliki akun GMail

### Introduction
Apabila kita sedang menggunakan aplikasi, seringkali kita menemukan bahwa  
pengguna aplikasi tidak selalu harus melakukan registrasi ke dalam aplikasi  
yang dibuat terlebih dahulu sebelum bisa melakukan login ke dalam aplikasi  
yang ada bukan?

Sebagai contoh:
- Untuk bisa menggunakan aplikasi `9gag`, kita bisa saja login dengan 
  menggunakan akun `Facebook` yang dimiliki oleh pengguna, atau akun `Gmail`  
  yang dimiliki oleh pengguna

Kira kira bagaimana cara kerjanya yah?

Pada pembelajaran hari ini kita akan melihat apakah yang ada di balik layar  
tersebut dan mencoba untuk mengimplementasikannya ke dalam aplikasi sederhana  
yang dibuat yah !

#### OAuth2
OAuth2 atau Open Authorization v2.0, adalah suatu protokol yang memungkinkan 
pengguna untuk berbagi sumber / data pribadi tanpa perlu memberikan nama atau  
password yang dimiliki.

Untuk mengetahui lebih lanjut tentang OAuth2 ini, mari kita tonton sebuah  
video pendek berikut yang akan membantu kita lebih memahami OAuth2 ini

https://www.youtube.com/watch?v=byZQ9KT7wWA

Dari video pendek di atas, dapat disimpulkan bahwa pada *Olaf2.0* ini,  
Checknotes 30 USD itu apabila direalisasikan, sebenarnya adalah sebuah kunci   
a.k.a `token` yang berfungsi untuk melakukan proses Authentikasi dan  
Authorisasinya.

`token` ini kita bisa berikan secara spesifik untuk batasan bisa melakukan   
apa saja atau disebut dengan `scope`, durasinya berapa lama sebelum expired,  
dkk.

Dalam OAuth2 ini sendiri sebenarnya ada banyak sekali terminologi yang ada,   
namun yang paling penting adalah pada bagian, Provider atau penyedia resource  
dan Consumer atau yang mengkonsumsi resource yang tersedia.

Sebagai contoh 9gag dengan login Facebook, maka Providernya adalah Facebook   
dan Consumernya adalah 9gag itu sendiri.

Nah pada pembelajaran ini, kita tidak akan berusaha untuk membuat sisi   
Providernya OAuth2 ini, namun kita akan membuat sisi Consumer dari OAuth2 ini,  
atau istilah kerennya adalah kita akan membuat Social Media Login.

#### Social Media Login
Pada demo pembelajaran Social Media Login ini, kita akan menggunakan provider   
OAuth2 nya adalah `Google`, dengan `Google Sign-in (Legacy)` nya dan  
consumernya adalah aplikasi Express yang kita buat nanti.

Tanpa ba bi bu lama lama lagi, mari kita demokan ini !

### Let's Demo
Disclaimer:
OAuth2 ini hanya akan kita gunakan sebagai media untuk registrasi ke dalam  
aplikasi Express kita saja, tidak sampai membaca data dengan scope tambahan  
pada Google Account yang kita miliki.

Pada aplikasi ini, kita akan membuat consumer apps nya pada Express dengan  
clientnya pada sebuah file html saja.

Langkah-langkah yang harus dilakukan adalah:

#### Langkah 1 - Register Apps di Provider
Pada langkah ini kita akan mencoba untuk meregistrasikan aplikasi yang kita  
buat agar dapat menggunakan OAuth yang disediakan oleh Google, agar kita dapat  
menggunakan Google Login dalam aplikasi kita

1. Membuka console GCP pada tautan https://console.cloud.google.com
1. Lakukan login dengan akun GMail yang dimiliki, apabila diminta buatlah  
   sebuah project baru pada console GCP dengan nama yang disukai
1. Membuka halaman Credentials pada console GCP pada tautan 
   https://console.developers.google.com/apis/credentials
1. Pilih tombol `+ CREATE CREDENTIALS` untuk membuat sebuah credentials baru  
   berupa `OAuth Client ID`
1. Pada halaman `Create OAuth Client ID`, masukkan informasi sebagai berikut:
   - Application Type: `Web Application`
   - Name: `<TERSERAH_DEVELOPER>`
   - Authorized JavaSript Origins -> `+ ADD URI` -> Masukkan URL halaman   
     client akan digunakan 
      - Untuk development, gunakan `http://localhost:<port>`
      - Untuk production, gunakan domain yang digunakan untuk serving client
   - Authorized redirect URIs -> kosongkan untuk sekarang ini, pada  
     pembelajaran ini kita tidak menggunakannya
1. Selanjutnya tekan tombol `CREATE` dan akan diberikan *OAuth2 Client ID*   
   dan *OAuth2 Client Secret*, Catat Client IDnya.

Sampai pada tahap ini, proses untuk registrasi aplikasi kita pada provider  
Google sudah selesai, selanjutnya kita akan mencoba untuk membuat halaman  
client consumernya dengan menggunakan html biasa dan jQuery sederhana.

#### Langkah 2 - Client
Pada langkah ini kita akan membuat halaman clientnya agar dapat menggunakan  
login yang disediakan oleh Google.

1. Buatlah sebuah folder untuk menampung code client
1. Pada folder ini, inisialisasi project dengan menggunakan `npm init -y`
1. Dikarenakan kita diharuskan untuk menyediakan client ini dalam localhost,  
   Maka selanjutnya kita akan menginstall `live-server`, sebuah package untuk   
   menyediakan index.html ini di dalam localhost, jadi file index.html ini  
   tidak hanya asal di drag drop ke dalam browser saja.

   Dapat digunakan dengan menggunakan perintah `npm i -D live-server`
1. Selanjutnya kita akan membuat sebuah file index.html sederhana yang isinya  
   adalah sebagai berikut:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Google Sign In</title>
   </head>
   <body></body>
   </html>
   ```
1. Pada tag `<head>`, tambahkan sebaris code berikut
   ```html
   <head>
      ...
      <!-- Tambahkan sebaris ini sebelum title -->
      <!-- ganti YOUR_CLIENT_ID.apps.googleusercontent.com -->
      <!-- dengan Client ID yang diberikan pada saat registrasi aplikasi -->
      <!-- Digunakan oleh Google Sign In untuk mengetahui Client ID kita -->
      <meta 
         name="google-signin-client_id" 
         content="YOUR_CLIENT_ID.apps.googleusercontent.com">
      <title>Google Sign In</title>
   </head>
   ```
1. Pada akhir dari tag `<body>`, tambahkan sebuah `script` untuk menggunakan  
   `Google Platform Library`. Library ini berfungsi untuk menyediakan tombol  
   `Google Sign-In`.
   ```html
   <body>
      <!-- Tambahkan script ini -->
      <script src="https://apis.google.com/js/platform.js" async defer></script>
   </body>
   ```
1. Selanjutnya kita akan menmbuat sebuah tombol `Google Sign-In` pada  
   aplikasi yang dibuat.
   ```html
   <body>
      <!-- Tambahkan div ini -->
      
      <!-- Perhatikan pada div ini ada sebuah attribute dengan nama -->
      <!-- data-onsuccess -->

      <!-- data-onsucess ini berisi sebuah fungsi yang harus 
            diimplementasikan -->
      <div class="g-signin2" data-onsuccess="onSignIn"></div>

      <script src="https://apis.google.com/js/platform.js" async defer></script>
   </body>
   ```
1. Selanjutnya kita akan mencoba untuk mengimplementasikan fungsi yang 
   dibutuhkan pada saat `data-onsucess` ke-*trigger*, yaitu `onSignIn`
   ```html
   <body>
      <div class="g-signin2" data-onsuccess="onSignIn"></div>

      <script src="https://apis.google.com/js/platform.js" async defer></script>

      <!-- Custom script untuk implementasi fungsi onSignIn -->
      <script>
         // Fungsi ini menerima sebuah parameter
         // dengan nama googleUser
         function onSignIn(googleUser) {
            // di sini kita akan mengambil basic profile yang disediakan
            // ketika user berhasil login dengan Google Sign-In
            const profile = googleUser.getBasicProfile();

            // Cetak data yang bisa diambil dari basic profile tersebut

            // data ID ini tidak boleh di send ke backend server kita
            // harus menggunakan cara lain untuk passing data ke backend
            // server nantinya (hint: gunakan token !)
            console.log('ID: ' + profile.getId()); 
            
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());

            // Email ini akan kosong (null) apabila 
            // scope `email` tidak didefinisikan
            console.log('Email: ' + profile.getEmail());

            // Gunakan ini untuk mendapatkan ID Token
            console.log("Token: " + googleUser.getAuthResponse().id_token);
         }
      </script>
   </body>
   ```

Sampai pada tahap ini artinya Client side sudah setengah selesai.

Selanjutnya kita akan membuat Servernya terlebih dahulu, sebelum melanjutkan  
bagian Client lagi.

Disclaimer:  
Pada Server ini nantinya akan digunakan untuk melakukan registrasi akun  
berdasarkan profil yang diberikan oleh Google Sign-In kepada Server yang kita  
miliki.

#### Langkah 3 - Server
Pada langkah ini kita akan membuat server untuk melakukan registrasi akun  
(register) ATAU Login berdasarkan profil yang diberikan.

Sehingga apabila akun email sudah ada, maka akan secara otomatis Login ke  
dalam server kita, apabila akun email belum ada, maka akan dibuatkan terlebih  
dahulu ke dalam server (registrasi otomatis) kemudian akan login.

Langkah-langkahnya adalah sebagai berikut:

[Inisialisasi Server]
1. Buatlah sebuah folder untuk menampung file server
1. Pada folder ini, inisialisasi project dengan menggunakan `npm init -y`
1. Install package yang dibutuhkan pada project ini dengan menggunakan  
   `npm i express pg sequelize jsonwebtoken cors`
1. Install package yang dibutuhkan untuk development pada project ini dengan  
   menggunakan `npm i -D sequelize-cli nodemon`
1. Inisialisasi database dengan menggunakan `npx sequelize-cli init`
1. Bukalah file `config/config.json` dan konfigurasi database agar sesuai   
   credential database server yang digunakan
1. Buatlah db berdasarkan config tersebut dengan `npx sequelize-cli db:create`
1. Buatlah sebuah model dengan nama User yang berisi username dan password  
   dengan menggunakan perintah:
   `npx sequelize-cli model:create --name User --attributes name:string,password:string`
1. Buatlah table berdasar model tersebut dengan `npx sequelize-cli db:migrate`
1. Buatlah sebuah file dengan nama `app.js`
1. Selanjutnya kita akan membuat kode dasar untuk express pada file `app.js`   
   ini. Kode dasar ini berisi sebuah endpoint `POST /login-google` yang akan  
   digunakan pada pembelajaran ini.
   ```javascript
   const cors = require("cors");
   const express = require("express");

   const app = express();
   const port = process.env.PORT || 3000;

   // Digunakan agar client bisa mengakses ke sini
   app.use(cors());
   app.use(express.urlencoded({ extended: false }));
   app.use(express.json());

   // POST /login-google
   app.post("/login-google", async (req, res) => {
      // Masih kosong
      // Nanti akan kita isi dengan logic yang dibutuhkan
   });

   app.listen(port, (_) => console.log(`Application is working at ${port}`));
   ```

[Menambahkan Library Google]
1. Untuk bisa menggunakan Google Sign In, sekarang kita akan membutuhkan  
   sebuah library tambahan dari google sendiri yaitu `google-auth-library`.  
   Cara installnya dengan menggunakan `npm i google-auth-library`
1. Modifikasi kode pada file `app.js` agar melakukan import dan inisialisasi  
   OAuth2Client.
   ```javascript
   // Tambahkan kode untuk import OAuth2Client dari Google Auth Library
   const { OAuth2Client } = require("google-auth-library");
   const cors = require("cors");
   const express = require("express");

   // Instance client yang akan digunakan
   const client = new OAuth2Client("MASUKKAN_CLIENT_ID_DI_SINI");
   
   ...
   ```
1. Modifikasi kode pada bagian `POST /login-google` sehingga kita bisa  
   menerima data dengan nama `token` dan akan digunakan untuk membaca data  
   `payload`nya
   ```javascript
   // POST /login-google
   app.post("/login-google", async (req, res) => {
      // di sini kita akan meminta sebuah data dikirimkan bernama token
      const { token } = req.body;

      // ticket ini adalah data terenkripsi yang nanti  
      // bisa kita ambil payloadnya
      const ticket = await client.verifyIdToken({
         idToken: token,
         audience: "MASUKKAN_CLIENT_ID_DI_SINI",
      });

      // ekstrak data payload berdasarkan ticket yang didapat
      const payload = ticket.getPayload();

      // Mari kita lihat apakah isi dari payload ini?
      console.log(payload);

      // untuk sementara saja
      // nanti akan kita modifikasi lagi
      res.status(200).json({ msg: "See console" });
   });
   ```

Sampai pada tahap ini artinya kita sudah berhasil untuk bisa mendapatkan data  
dari client dan ditranslate data yang dibutuhkan oleh server. Namun kita  
belum bisa mengirimkan data dari client karena apabila dilihat pada code  
client, tidak ada kiriman data apapun ke server, sehingga sekarang kita akan  
memperbaiki kode tersebut. 

#### Langkah 4 - Perbaikan Client dan Server
Sekarang kita akan menggabungkan Client dan Server sehingga bisa berkomunikasi  
dengan baik.

[Client]
1. Jalankan file pada client dengan membuka folder client dan menjalankan  
   live-server dengan `npx live-server --host=localhost .`
1. Pada file client `index.html` tambahkanlah sebuah script baru untuk jQuery.  
   Di pembelajaran ini kita hanya menggunakan jQuery untuk melakukan ajax call  
   saja. Bisa digantikan dengan `fetch` ataupun `axios` bila tidak ingin  
   menggunakan jQuery, disesuaikan saja.
   ```html
   <!-- Jquery -->
   <!-- Diletakkan sebelum custom script yang berisi fungsi onSignIn -->
   <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"
   ></script>
   <script>
      function onSignIn(googleUser) {
         ...
      }
   </script>
   ```
1. Selanjutnya kita akan memodifikasi fungsi `onSignIn` sehingga bisa  
   mengirimkan data `token` untuk diproses oleh server kita.
   ```html
   <script>
      function onSignIn(googleUser) {
         ...

         // Menggunakan ajax call ke server dan mengirimkan data yang dibutuhkan
         // ingat pada backend kita tidak boleh mengirimkan data name dan email
         // secara langsung ke server
         // tapi harus menggunakan id_token yang disediakan oleh google
         $.ajax({
            url: "http://localhost:3000/login-google",
            method: "POST",
            data: {
            // JANGAN GUNAKAN KEDUA INI YAH !
            // name: profile.getName(),
            // email: profile.getEmail(),

            // GUNAKAN YANG INI
            // nanti akan diterima oleh server dalam bentuk
            // req.body.token
            token: googleUser.getAuthResponse().id_token,
            },
         })
            .done(function (resp) {
               console.log(resp);
            })
            .fail(function (err) {
               console.log(err);
            });
      }
   </script>
   ```

Sampai pada tahap ini artinya kita sudah berhasil mengirimkan data dari client  
dan dapat diproses / ditranslate isinya oleh server untuk mendapatkan  
payload (data) profil dari user yang berhasil melakukan sign-in.

Yay !

Namun sekarang bagaimanakah kelanjutannya untuk server kita, apabila kita  
ingin melakukan registrasi terhadap akun yang belum ada di database kita DAN  
melakukan login dan mengembalikan token dari server kita apabila sudah dibuat  
dan berhasil login?

Mari kita mencoba untuk mengubah dari sisi servernya lagi

[Server]
1. Bukalah folder server, kemudian jalankan `app.js` dengan menggunakan  
   `npx nodemon app.js`
1. Bukalah kembali file `app.js` yang sudah dibuat
1. Tambahkanlah import untuk model `User` pada file app.js
   ```javascript
   const { OAuth2Client } = require("google-auth-library");
   const cors = require("cors");
   const express = require("express");
   // Tambahkan ini
   const { User } = require('./models/index');
   ...
   ```
1. Selanjutnya kita akan menggunakan method `findOrCreate` pada sequelize  
   untuk bisa mencari ATAU menambahkan data pada database. method ini  
   ditambahkan pada endpoint `POST /login-google`
   ```javascript
   // POST /login-google
   app.post("/login-google", async (req, res) => {
      ...

      // Di sini kita akan menggunakan method sequelize bernama
      // findOrCreate
      // - Fungsi ini mengembalikan sebuah array dengan 2 value
      //    - indeks 0 adalah user yang dibuat / ditemukan (Model User)
      //    - indeks 1 adalah menyatakan user baru dibuat atau tidak (boolean)
      const [user, created] = await User.findOrCreate({
         where: {
            name: payload.email,
         },
      });

      const payloadDariServer = require("jsonwebtoken").sign(
         {
            id: user.id,
            name: user.name,
         },
         "inisangatamansekali"
      );

      // Modifikasi untuk mengembalikan token
      res.status(200).json({ access_token: payloadDariServer });
   });
   ```
Sampai pada tahap ini, artinya kita sudah berhasil untuk menambahkan data pada  
Server kita dan mengembalikan token ke client, HORE !!!!

Namun ada sedikit lagi hal yang perlu diperhatikan, yaitu, bagaimanakah cara  
kita menyimpan token yang dikirimkan oleh server pada client?

Apabila kita menggunakan cara yang disimpan di variabel saja, maka ketika  
halaman client di-refresh, maka data akan hilang bukan?

Sehingga bagaimanakah cara client menyimpan data yang ada?

Maka kita harus menggunakan tempat penyimpanan sederhana yang disediakan oleh  
browser yang dimiliki, yaitu sesuatu yang bernama `localStorage`.

Cara penggunaanya pun cukup mudah.

Mari kita memodifikasi lagi kode yang ada pada client kita

[Client]
1. Bukalah kembali file `index.html`
1. Modifikasi kode `$.ajax().done()` dengan kode sebagai berikut:
   ```javascript
   $.ajax({
      ...
   })
      .done(function(resp) {
         // di sini diketahui bahwa resp adalah berbentuk object dengan
         // sebuah prop dengan nama accesss_token
         console.log(resp);

         // simpan data ini ke dalam localStorage
         localStorage.setItem("access_token", resp.access_token);
      })
   ```
1. Untuk melihat apakah sudah tersimpan atau belum, pada browser, bukalah  
   `Inspect Element`, kemudian Pilih pada tab `Storage`, situs yang digunakan  
   e.g. `http://localhost:8080` kemudian lihatlah apakah ada key `access_token`

TL;DR (Step by Step)
0. Registrasi OAuth di provider
1. Client akan melakukan login ke google
2. Client akan mendapatkan "token"
3. Client akan mengirimkan "token" tersebut ke server (backend) -> via ajax
4. Dari server akan berusaha untuk mentranslate token tersebut jadi payload
5. Dalam payload tersebut nanti kita akan liat ada isinya apa aja untuk kita proses ke dalam databasenya kita!
6. Kemudian kita akan berusaha untuk mencari ATAU menambahkan data tersebut (apabila belum ada !) -> Apabila ada data tambahan lain yang dibutuhkan, berarti harus menuliskan `defaults`-nya !
7. Sampai di tahap ini, "registrasi" sudah selesai, selanjutnya kita akan bikin untuk bagian "login"-nya juga di dalam aplikasinya kita
8. Membuat PAYLOAD yang dibutuhkan di aplikasinya kita
9. Membuat TOKEN yang akan digunakan di aplikasinya kita
10. Mengirimkan kembali si TOKEN aplikasinya kita ke clientnya kita !

Selamat sampai di sini kita sudah berhasil menggunakan Google Sign-In dan  
berhasil menggunakannya sebagai media untuk login ke dalam aplikasi yang kita  
buat !

### References
- https://id.wikipedia.org/wiki/OAuth
- https://medium.com/codelabs-unikom/memahami-oauth-2-0-api-security-9376bc3a307b
- https://www.youtube.com/watch?v=byZQ9KT7wWA
- https://developers.google.com/identity/sign-in/web/sign-in
- https://developers.google.com/identity/sign-in/web/backend-auth
- https://sequelize.org/master/manual/model-querying-finders.html#-code-findorcreate--code-
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage