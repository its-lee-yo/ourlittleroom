/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
  "https://pphfojfvrqzwumugqlil.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_eIRHuym799838CE6DWnRLg_lZO0EcEM";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


const STORAGE_URL =
  `${SUPABASE_URL}/storage/v1/object/public`;


/* =====================================================
   PHOTOS
=====================================================
   
===================================================== */

const photos = [

  {
    file: "amor.jpg",
    caption: "♡ cartitas ♡"
  },

  {
    file: "grr.jpg",
    caption: "♥ una de mis favoritas ♥"
  },

  {
    file: "us.jpg",
    caption: "♡ nosotros ♡"
  },

  {
    file: "WOWOW.jpg",
    caption: "♥ tu bella carita ♥"
  },

  {
    file: "leito.jpg",
    caption: "♡ juntos desde lejos ♡"
  },

  {
    file: "acta.jpg",
    caption: "♥ siempre nosotros ♥"
  }

];


/* =====================================================
   PHOTO URL
===================================================== */

function getPhotoURL(file) {

  return `${STORAGE_URL}/fotos/${encodeURIComponent(file)}`;

}


/* =====================================================
   LOAD PHOTOS
===================================================== */

function loadPhotos() {

  const gallery =
    document.getElementById("photoGallery");

  gallery.innerHTML = "";


  photos.forEach((photo, index) => {

    const card =
      document.createElement("div");

    card.className =
      "memory-photo";


    const img =
      document.createElement("img");

    img.src =
      getPhotoURL(photo.file);

    img.alt =
      photo.caption;


    img.onerror = function () {

      this.src =
        "https://placehold.co/600x600/fff0f6/b64d78?text=♡+PHOTO+HERE+♡";

    };


    const caption =
      document.createElement("div");

    caption.className =
      "photo-caption";

    caption.textContent =
      photo.caption;


    card.appendChild(img);

    card.appendChild(caption);


    card.addEventListener(
      "click",
      () => {

        openPhoto(
          getPhotoURL(photo.file),
          photo.caption
        );

      }
    );


    gallery.appendChild(card);

  });

}


/* =====================================================
   PROFILE PHOTO
=====================================================

   CAMBIA ESTE NOMBRE POR LA FOTO
   QUE QUIERAS USAR COMO PRINCIPAL.
===================================================== */

const profilePhoto =
  document.getElementById("profilePhoto");


profilePhoto.src =
  getPhotoURL("cachetes.jpg");


profilePhoto.onerror =
  function () {

    this.src =
      "https://placehold.co/600x600/fff0f6/b64d78?text=♡+OUR+PHOTO+♡";

  };


/* =====================================================
   PHOTO MODAL
===================================================== */

const photoModal =
  document.getElementById("photoModal");


const bigPhoto =
  document.getElementById("bigPhoto");


const bigPhotoCaption =
  document.getElementById("bigPhotoCaption");


function openPhoto(url, caption) {

  bigPhoto.src = url;

  bigPhotoCaption.textContent =
    caption;

  photoModal.classList.add("visible");

}


document
  .getElementById("closePhoto")
  .addEventListener(
    "click",
    () => {

      photoModal.classList.remove("visible");

      bigPhoto.src = "";

    }
  );


photoModal.addEventListener(
  "click",
  event => {

    if (event.target === photoModal) {

      photoModal.classList.remove("visible");

      bigPhoto.src = "";

    }

  }
);


/* =====================================================
   MUSIC
=====================================================

   ESTOS SON LOS NOMBRES EXACTOS
   QUE APARECEN EN TU BUCKET MUSIC.
===================================================== */

const songs = [

  {
    title: "Muñequita linda",
    artist: "Los Panchos",
    file: "rubidubi-linda.mp3"
  },

  {
    title: "Besos de fuego",
    artist: "Trío Los Jaibos",
    file: "besos-de-rubi.mp3"
  },

  {
    title: "Cien años",
    artist: "Pedro Infante",
    file: "mas-rubi.mp3"
  },

  {
    title: "Corazón de melón",
    artist: "Los Panchos",
    file: "corazon-de-rubi.mp3"
  }

];


let currentSong = 0;

let isPlaying = false;


const audio =
  document.getElementById("audio");


const songName =
  document.getElementById("songName");


const sideSong =
  document.getElementById("sideSong");


const playPause =
  document.getElementById("playPause");


const musicError =
  document.getElementById("musicError");


const volume =
  document.getElementById("volume");


/* =====================================================
   MUSIC URL
===================================================== */

function getMusicURL(file) {

  return `${STORAGE_URL}/music/${encodeURIComponent(file)}`;

}


/* =====================================================
   LOAD SONG
===================================================== */

function loadSong(index, autoplay = false) {

  currentSong = index;

  const song =
    songs[currentSong];


  audio.src =
    getMusicURL(song.file);


  songName.textContent =
    `${song.title} — ${song.artist}`;


  sideSong.textContent =
    song.title;


  musicError.textContent =
    "";


  if (autoplay) {

    playCurrentSong();

  }

}


/* =====================================================
   PLAY
===================================================== */

function playCurrentSong() {

  audio.play()
    .then(() => {

      isPlaying = true;

      playPause.textContent =
        "❚❚";

      musicError.textContent =
        "";

    })
    .catch(error => {

      console.error(
        "Music error:",
        error
      );

      isPlaying = false;

      playPause.textContent =
        "▶";

      musicError.textContent =
        "♡ couldn't play ♡";

    });

}


/* =====================================================
   PLAY / PAUSE
===================================================== */

playPause.addEventListener(
  "click",
  () => {

    if (isPlaying) {

      audio.pause();

      isPlaying = false;

      playPause.textContent =
        "▶";

    } else {

      playCurrentSong();

    }

  }
);


/* =====================================================
   NEXT
===================================================== */

document
  .getElementById("nextSong")
  .addEventListener(
    "click",
    () => {

      currentSong =
        (currentSong + 1)
        % songs.length;

      loadSong(
        currentSong,
        true
      );

    }
  );


/* =====================================================
   PREVIOUS
===================================================== */

document
  .getElementById("prevSong")
  .addEventListener(
    "click",
    () => {

      currentSong =
        (
          currentSong
          - 1
          + songs.length
        )
        % songs.length;

      loadSong(
        currentSong,
        true
      );

    }
  );


/* =====================================================
   AUTOMATIC NEXT SONG
===================================================== */

audio.addEventListener(
  "ended",
  () => {

    currentSong =
      (currentSong + 1)
      % songs.length;

    loadSong(
      currentSong,
      true
    );

  }
);


/* =====================================================
   VOLUME
===================================================== */

volume.addEventListener(
  "input",
  () => {

    audio.volume =
      Number(volume.value);

  }
);


audio.volume = 0.7;


/* =====================================================
   MUSIC WELCOME
===================================================== */

const musicWelcome =
  document.getElementById(
    "musicWelcome"
  );


document
  .getElementById("musicYes")
  .addEventListener(
    "click",
    () => {

      musicWelcome.style.display =
        "none";

      loadSong(
        0,
        true
      );

    }
  );


document
  .getElementById("musicNo")
  .addEventListener(
    "click",
    () => {

      musicWelcome.style.display =
        "none";

      loadSong(
        0,
        false
      );

    }
  );


/* =====================================================
   LETTERS
===================================================== */

async function loadLetters() {

  const list =
    document.getElementById(
      "lettersList"
    );


  list.innerHTML =
    `<div class="center">
      loading our mailbox... ♡
    </div>`;


  const {
    data,
    error
  } =
    await supabaseClient
      .from("letters")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(error);

    list.innerHTML =
      `<div class="center">
        couldn't load our letters ♡
      </div>`;

    return;

  }


  if (!data || data.length === 0) {

    list.innerHTML =
      `<div class="center">
        our mailbox is empty... ♡
      </div>`;

    return;

  }


  list.innerHTML = "";


  data.forEach(
    letter => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "letter-card";


      const title =
        document.createElement(
          "h3"
        );

      title.textContent =
        `♡ ${letter.title}`;


      const meta =
        document.createElement(
          "div"
        );

      meta.className =
        "letter-meta";


      const date =
        new Date(
          letter.created_at
        ).toLocaleDateString();


      meta.textContent =
        `from ${letter.author} · ${date}`;


      const body =
        document.createElement(
          "div"
        );

      body.className =
        "letter-body";


      body.textContent =
        letter.body;


      card.appendChild(title);

      card.appendChild(meta);

      card.appendChild(body);


      list.appendChild(card);

    }
  );

}


/* =====================================================
   LETTER MODAL
===================================================== */

const letterModal =
  document.getElementById(
    "letterModal"
  );


document
  .getElementById(
    "newLetterButton"
  )
  .addEventListener(
    "click",
    () => {

      letterModal.classList.add(
        "visible"
      );

    }
  );


document
  .getElementById("closeLetter")
  .addEventListener(
    "click",
    () => {

      letterModal.classList.remove(
        "visible"
      );

    }
  );


/* =====================================================
   SAVE LETTER
===================================================== */

document
  .getElementById("saveLetter")
  .addEventListener(
    "click",
    async () => {

      const title =
        document
          .getElementById(
            "letterTitle"
          )
          .value
          .trim();


      const author =
        document
          .getElementById(
            "letterAuthor"
          )
          .value
          .trim();


      const body =
        document
          .getElementById(
            "letterBody"
          )
          .value
          .trim();


      const status =
        document.getElementById(
          "letterStatus"
        );


      if (
        !title ||
        !author ||
        !body
      ) {

        status.textContent =
          "♡ fill everything first ♡";

        return;

      }


      status.textContent =
        "sending... ♥";


      const {
        error
      } =
        await supabaseClient
          .from("letters")
          .insert([
            {
              title,
              author,
              body
            }
          ]);


      if (error) {

        console.error(error);

        status.textContent =
          "something went wrong ♡";

        return;

      }


      status.textContent =
        "sent ♥";


      document
        .getElementById(
          "letterTitle"
        )
        .value = "";


      document
        .getElementById(
          "letterAuthor"
        )
        .value = "";


      document
        .getElementById(
          "letterBody"
        )
        .value = "";


      setTimeout(
        () => {

          letterModal.classList.remove(
            "visible"
          );

          status.textContent = "";

          loadLetters();

        },
        700
      );

    }
  );


/* =====================================================
   YES ♥
===================================================== */

const yesScreen =
  document.getElementById(
    "yesScreen"
  );


const lettersSection =
  document.getElementById(
    "letters"
  );


document
  .getElementById("yesButton")
  .addEventListener(
    "click",
    () => {

      yesScreen.classList.add(
        "visible"
      );

      createHeartRain();

    }
  );


/* =====================================================
   OPEN NEW CHAPTER
===================================================== */

document
  .getElementById("openLetters")
  .addEventListener(
    "click",
    () => {

      yesScreen.classList.remove(
        "visible"
      );


      lettersSection.classList.add(
        "visible"
      );


      setTimeout(
        () => {

          lettersSection.scrollIntoView({
            behavior: "smooth"
          });

        },
        100
      );


      loadLetters();

    }
  );


/* =====================================================
   HEART RAIN
===================================================== */

function createHeartRain() {

  const container =
    document.getElementById(
      "heartRain"
    );


  container.innerHTML = "";


  for (
    let i = 0;
    i < 65;
    i++
  ) {

    const heart =
      document.createElement(
        "div"
      );


    heart.className =
      "falling-heart";


    heart.textContent =
      Math.random() > .5
        ? "♥"
        : "♡";


    heart.style.left =
      `${Math.random() * 100}%`;


    heart.style.fontSize =
      `${10 + Math.random() * 20}px`;


    heart.style.animationDuration =
      `${3 + Math.random() * 5}s`;


    heart.style.animationDelay =
      `${Math.random() * 2}s`;


    container.appendChild(
      heart
    );

  }

}


/* =====================================================
   ESC
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      photoModal.classList.remove(
        "visible"
      );

      letterModal.classList.remove(
        "visible"
      );

      yesScreen.classList.remove(
        "visible"
      );

    }

  }
);


/* =====================================================
   START
===================================================== */

loadPhotos();

loadLetters();

loadSong(
  0,
  false
);
