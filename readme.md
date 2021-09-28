## Table of Content
1. Introduction - OAuth
    - 

1. [Let's Demo](#lets-demo)

### Prerequisites
- Sudah mengingstall nodejs
- Memahami framework Express pada nodejs
- Memiliki akun GMail

### Let's Demo
Pada demo pembelajaran Social Media Login ini, kita akan menggunakan provider   
OAuth2 nya adalah `Google`, dengan `Google Sign-in (Legacy)` nya dan  
consumernya adalah aplikasi Express yang kita buat nanti.

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

#### Langkah 3 - Server

#### Langkah 4 - Perbaikan Client dan Server

### References
- https://developers.google.com/identity/sign-in/web/sign-in
- https://developers.google.com/identity/sign-in/web/backend-auth