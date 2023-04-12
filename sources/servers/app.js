// Tambahkan kode untuk import OAuth2Client dari Google Auth Library
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const express = require("express");
const { User } = require("./models/index");

// Instance client yang akan digunakan
const client = new OAuth2Client(
  "517430794824-0vo2m9ntml49t2ptr0r56t7103ob19uv.apps.googleusercontent.com"
);
const app = express();
const port = process.env.PORT || 3000;

// Digunakan agar client bisa mengakses ke sini
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// POST /login-google
app.post("/login-google", async (req, res) => {
  // di sini kita akan meminta sebuah data dikirimkan bernama token
  const { token } = req.body;

  // ticket ini adalah data terenkripsi yang nanti bisa kita ambil payloadnya
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "517430794824-0vo2m9ntml49t2ptr0r56t7103ob19uv.apps.googleusercontent.com",
  });

  // ekstrak data payload berdasarkan ticket yang didapat
  const payload = ticket.getPayload();

  // Mari kita lihat apakah isi dari payload ini?
  console.log(payload);

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

app.listen(port, (_) => console.log(`Application is working at ${port}`));
