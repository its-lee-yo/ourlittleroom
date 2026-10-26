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

/* =========================================================
   SEASON CONTROLLER
   SPOOKY VERSION + NUEVO COMIENZO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  (() => {

    "use strict";


  /* =======================================================
     SUPABASE INDEPENDIENTE
     No toca las variables del script original.
  ======================================================= */

  const SPOOKY_SUPABASE_URL =
    "https://pphfojfvrqzwumugqlil.supabase.co";

  const SPOOKY_SUPABASE_KEY =
    "sb_publishable_eIRHuym799838CE6DWnRLg_lZO0EcEM";

  const spookySupabase =
    window.supabase.createClient(
      SPOOKY_SUPABASE_URL,
      SPOOKY_SUPABASE_KEY
    );


  /* =======================================================
     ELEMENTOS PRINCIPALES
  ======================================================= */

  const seasonController =
    document.getElementById("seasonController");

  const seasonSelect =
    document.getElementById("seasonSelect");

  const spookySeason =
    document.getElementById("spookySeason");

  const originalWebsite =
    document.getElementById("website");

  const originalMusicWelcome =
    document.getElementById("musicWelcome");

  const originalMusicPlayer =
    document.getElementById("musicPlayer");


  if (!seasonController || !seasonSelect || !spookySeason) {
    return;
  }


  /* =======================================================
     TEMPORADA
  ======================================================= */

  const initialSeason = "spooky";


  function showSpooky() {

    seasonSelect.value = "spooky";

    localStorage.setItem(
      "amor-current-season",
      "spooky"
    );


    /*
      Ocultamos completamente la página original.
    */

    if (originalMusicWelcome) {
      originalMusicWelcome.style.display = "none";
    }

    if (originalWebsite) {
      originalWebsite.style.display = "none";
    }

    if (originalMusicPlayer) {
      originalMusicPlayer.style.display = "none";
    }


    /*
      Mostramos solamente Spooky.
    */

    spookySeason.style.display = "block";


    /*
      El único reproductor Spooky.
    */

    const miniPlayer =
      document.getElementById("spookyMiniPlayer");

    if (miniPlayer) {
      miniPlayer.style.display = "block";
    }


    loadSpookyMusic();

    loadSpookyMemories();
    loadSpookyBoard();
    loadSpookyLetters();
    loadSpookyNotifications();

  }


  function showNuevoComienzo() {

    seasonSelect.value = "nuevo-comienzo";

    localStorage.setItem(
      "amor-current-season",
      "nuevo-comienzo"
    );


    /*
      Ocultamos TODO Spooky.
    */

    spookySeason.style.display = "none";


    const miniPlayer =
      document.getElementById("spookyMiniPlayer");

    if (miniPlayer) {
      miniPlayer.style.display = "none";
    }


    /*
      Recuperamos la página original.
    */

    if (originalWebsite) {
      originalWebsite.style.display = "";
    }


    /*
      El reproductor original vuelve solamente
      en Nuevo Comienzo.
    */

    if (originalMusicPlayer) {
      originalMusicPlayer.style.display = "";
    }


    /*
      La ventana "¿Un poco de música?"
      pertenece únicamente a esta temporada.

      Si todavía no se ha elegido una opción,
      vuelve a aparecer.
    */

    const musicChoice =
      localStorage.getItem(
        "nuevo-comienzo-music-choice"
      );


    if (
      originalMusicWelcome &&
      !musicChoice
    ) {

      originalMusicWelcome.style.display = "";

    } else if (originalMusicWelcome) {

      originalMusicWelcome.style.display = "none";

    }

  }


  function changeSeason(value) {

    if (value === "spooky") {

      showSpooky();

    } else {

      showNuevoComienzo();

    }

  }


  seasonSelect.addEventListener(
    "change",
    () => {
      changeSeason(
        seasonSelect.value
      );
    }
  );


  /*
    Dejamos guardada la decisión de música
    del sistema original.
  */

  const originalMusicYes =
    document.getElementById("musicYes");

  const originalMusicNo =
    document.getElementById("musicNo");


  if (originalMusicYes) {

    originalMusicYes.addEventListener(
      "click",
      () => {

        localStorage.setItem(
          "nuevo-comienzo-music-choice",
          "yes"
        );

      }
    );

  }


  if (originalMusicNo) {

    originalMusicNo.addEventListener(
      "click",
      () => {

        localStorage.setItem(
          "nuevo-comienzo-music-choice",
          "no"
        );

      }
    );

  }


  /* =======================================================
     NAVEGACIÓN SPOOKY
  ======================================================= */

  document
    .querySelectorAll(
      "[data-spooky-target]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const target =
            button.dataset.spookyTarget;

          document
            .querySelectorAll(
              ".spooky-section"
            )
            .forEach(section => {

              section.classList.remove(
                "spooky-active-section"
              );

            });


          const destination =
            document.getElementById(target);

          if (destination) {

            destination.classList.add(
              "spooky-active-section"
            );

            destination.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }
      );

    });


  /* =======================================================
     MÚSICA SPOOKY
  ======================================================= */

  let spookySongs = [];
  let spookyCurrentSong = 0;
  let spookyPlaying = false;


  const spookyAudio =
    document.getElementById("spookyAudio");

  const spookySongTitle =
    document.getElementById("spookySongTitle");

  const spookyMiniSong =
    document.getElementById("spookyMiniSong");

  const spookySongList =
    document.getElementById("spookySongList");


  function spookyStorageURL(fileName) {
  return (
    SPOOKY_SUPABASE_URL +
    "/storage/v1/object/public/halloween-music/" +
    encodeURIComponent(fileName)
  );
}


  async function loadSpookyMusic() {

    if (!spookySongList) {
      return;
    }


    spookySongList.innerHTML =
      "<div class='spooky-song'>Cargando música...</div>";


    const { data, error } =
      await spookySupabase
        .storage
        .from("halloween-music")
        .list(
          "",
          {
            limit: 100,
            sortBy: {
              column: "name",
              order: "asc"
            }
          }
        );


    if (error) {

      spookySongs = [];

      spookySongList.innerHTML =
        "<div class='spooky-song'>" +
        "No se pudo cargar la música." +
        "</div>";

      return;

    }


    spookySongs =
      (data || [])
        .filter(file => {

          const name =
            file.name.toLowerCase();

          return (
            name.endsWith(".mp3") ||
            name.endsWith(".wav") ||
            name.endsWith(".ogg") ||
            name.endsWith(".m4a")
          );

        })
        .slice(0, 20);


    if (!spookySongs.length) {

      spookySongList.innerHTML =
        "<div class='spooky-song'>" +
        "Añade canciones en music/halloween." +
        "</div>";

      if (spookySongTitle) {
        spookySongTitle.textContent =
          "Sin canciones";
      }

      if (spookyMiniSong) {
        spookyMiniSong.textContent =
          "Sin canciones";
      }

      return;

    }


    renderSpookySongList();

    loadSpookySong(
      0,
      false
    );

  }


  function renderSpookySongList() {

    spookySongList.innerHTML = "";


    spookySongs.forEach(
      (song, index) => {

        const item =
          document.createElement("div");

        item.className =
          "spooky-song";


        item.textContent =
          `${index + 1}. ${cleanSongName(song.name)}`;


        item.addEventListener(
          "click",
          () => {

            loadSpookySong(
              index,
              true
            );

          }
        );


        spookySongList.appendChild(item);

      }
    );

  }


  function cleanSongName(name) {

    return name
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]+/g, " ");

  }


  function updateSpookySongUI() {

    if (!spookySongs.length) {
      return;
    }


    const song =
      spookySongs[
        spookyCurrentSong
      ];


    const title =
      cleanSongName(song.name);


    if (spookySongTitle) {
      spookySongTitle.textContent =
        title;
    }


    if (spookyMiniSong) {
      spookyMiniSong.textContent =
        title;
    }


    document
      .querySelectorAll(
        ".spooky-song"
      )
      .forEach(
        (element, index) => {

          element.classList.toggle(
            "current",
            index === spookyCurrentSong
          );

        }
      );

  }


  function loadSpookySong(
    index,
    autoplay
  ) {

    if (!spookySongs.length) {
      return;
    }


    if (index < 0) {
      index =
        spookySongs.length - 1;
    }


    if (
      index >=
      spookySongs.length
    ) {
      index = 0;
    }


    spookyCurrentSong = index;


    const song =
      spookySongs[
        spookyCurrentSong
      ];


    spookyAudio.src =
      spookyStorageURL(
        song.name
      );


    spookyAudio.load();


    updateSpookySongUI();


    if (autoplay) {

      spookyAudio
        .play()
        .then(() => {

          spookyPlaying = true;
          updatePlayButtons();

        })
        .catch(() => {

          spookyPlaying = false;
          updatePlayButtons();

        });

    }

  }


  function toggleSpookyMusic() {

    if (!spookySongs.length) {
      return;
    }


    if (spookyAudio.paused) {

      spookyAudio
        .play()
        .then(() => {

          spookyPlaying = true;
          updatePlayButtons();

        })
        .catch(() => {});

    } else {

      spookyAudio.pause();

      spookyPlaying = false;

      updatePlayButtons();

    }

  }


  function updatePlayButtons() {

    const buttons = [
      document.getElementById(
        "spookyPlay"
      ),
      document.getElementById(
        "spookyMiniPlay"
      )
    ];


    buttons.forEach(button => {

      if (!button) {
        return;
      }

      button.textContent =
        spookyPlaying
          ? "PAUSE"
          : "PLAY";

    });

  }


  function nextSpookySong() {

    loadSpookySong(
      spookyCurrentSong + 1,
      true
    );

  }


  function previousSpookySong() {

    loadSpookySong(
      spookyCurrentSong - 1,
      true
    );

  }


  document
    .getElementById("spookyPlay")
    ?.addEventListener(
      "click",
      toggleSpookyMusic
    );


  document
    .getElementById("spookyMiniPlay")
    ?.addEventListener(
      "click",
      toggleSpookyMusic
    );


  document
    .getElementById("spookyNext")
    ?.addEventListener(
      "click",
      nextSpookySong
    );


  document
    .getElementById("spookyMiniNext")
    ?.addEventListener(
      "click",
      nextSpookySong
    );


  document
    .getElementById("spookyPrev")
    ?.addEventListener(
      "click",
      previousSpookySong
    );


  document
    .getElementById("spookyMiniPrev")
    ?.addEventListener(
      "click",
      previousSpookySong
    );


  spookyAudio.addEventListener(
    "ended",
    nextSpookySong
  );


  /* =======================================================
     CERRAR MINI PLAYER
  ======================================================= */

  document
    .getElementById("spookyMiniClose")
    ?.addEventListener(
      "click",
      () => {

        const player =
          document.getElementById(
            "spookyMiniPlayer"
          );

        if (player) {
          player.style.display = "none";
        }

      }
    );


  /* =======================================================
     MEMORIAS
  ======================================================= */

  const memoryTitle =
    document.getElementById(
      "spookyMemoryTitle"
    );

  const memoryDescription =
    document.getElementById(
      "spookyMemoryDescription"
    );

  const memoryFile =
    document.getElementById(
      "spookyMemoryFile"
    );

  const memoryStatus =
    document.getElementById(
      "spookyMemoryStatus"
    );

  const memoryGallery =
    document.getElementById(
      "spookyMemoryGallery"
    );


  async function loadSpookyMemories() {

    if (!memoryGallery) {
      return;
    }


    const { data, error } =
      await spookySupabase
        .from("halloween_memories")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      memoryGallery.innerHTML =
        "<div class='spooky-memory'>" +
        "Todavía no hay memorias disponibles." +
        "</div>";

      return;

    }


    memoryGallery.innerHTML = "";


    (data || []).forEach(
      memory => {

        const box =
          document.createElement("article");

        box.className =
          "spooky-memory";


        let media = "";


        const path =
          memory.file_path;


        const url =
          spookySupabase
            .storage
            .from("halloween-memories")
            .getPublicUrl(path)
            .data
            .publicUrl;


        if (
          memory.file_type === "image"
        ) {

          media =
            `<img src="${url}" alt="">`;

        } else if (
          memory.file_type === "video"
        ) {

          media =
            `<video src="${url}" controls></video>`;

        } else if (
          memory.file_type === "audio"
        ) {

          media =
            `<audio src="${url}" controls></audio>`;

        }


        box.innerHTML = `

          ${media}

          <h3>
            ${escapeHTML(memory.title || "Recuerdo")}
          </h3>

          <p>
            ${escapeHTML(memory.description || "")}
          </p>

        `;


        memoryGallery.appendChild(box);

      }
    );

  }


  document
    .getElementById("spookyUploadMemory")
    ?.addEventListener(
      "click",
      uploadSpookyMemory
    );


  async function uploadSpookyMemory() {

    const file =
      memoryFile?.files?.[0];


    if (!file) {

      memoryStatus.textContent =
        "Selecciona un archivo.";

      return;

    }


    memoryStatus.textContent =
      "Guardando...";


    const safeName =
      file.name
        .replace(
          /[^a-zA-Z0-9._-]/g,
          "_"
        );


    const path =
      "halloween/" +
      crypto.randomUUID() +
      "-" +
      safeName;


    const { error: uploadError } =
      await spookySupabase
        .storage
        .from("halloween-memories")
        .upload(
          path,
          file,
          {
            upsert: false
          }
        );


    if (uploadError) {

      memoryStatus.textContent =
        "No se pudo subir el archivo.";

      return;

    }


    let fileType =
      "audio";


    if (
      file.type.startsWith("image/")
    ) {

      fileType = "image";

    } else if (
      file.type.startsWith("video/")
    ) {

      fileType = "video";

    }


    const { error: dbError } =
      await spookySupabase
        .from("halloween_memories")
        .insert({
          title:
            memoryTitle.value.trim() ||
            "Recuerdo",

          description:
            memoryDescription.value.trim(),

          file_name:
            file.name,

          file_path:
            path,

          file_type:
            fileType,

          mime_type:
            file.type
        });


    if (dbError) {

      memoryStatus.textContent =
        "El archivo se subió, pero no se guardó la memoria.";

      return;

    }


    memoryStatus.textContent =
      "Recuerdo guardado.";


    memoryTitle.value = "";
    memoryDescription.value = "";
    memoryFile.value = "";


    loadSpookyMemories();

  }


  /* =======================================================
     TABLÓN
  ======================================================= */

  let spookyBoardType =
    "queja";


  document
    .querySelectorAll(
      ".spooky-board-type"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".spooky-board-type"
            )
            .forEach(
              item => {

                item.classList.remove(
                  "active"
                );

              }
            );


          button.classList.add(
            "active"
          );


          spookyBoardType =
            button.dataset.boardType;


          loadSpookyBoard();

        }
      );

    });


  async function loadSpookyBoard() {

    const list =
      document.getElementById(
        "spookyBoardList"
      );


    if (!list) {
      return;
    }


    const { data, error } =
      await spookySupabase
        .from("halloween_board")
        .select("*")
        .eq(
          "type",
          spookyBoardType
        )
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      list.innerHTML =
        "<div class='spooky-board-item'>" +
        "Todavía no hay publicaciones." +
        "</div>";

      return;

    }


    list.innerHTML = "";


    (data || []).forEach(
      item => {

        const box =
          document.createElement("article");

        box.className =
          `spooky-board-item ${item.type}`;


        box.innerHTML = `

          <strong>
            ${escapeHTML(item.author || "Anónimo")}
          </strong>

          <p>
            ${escapeHTML(item.content || "")}
          </p>

        `;


        list.appendChild(box);

      }
    );

  }


  document
    .getElementById("spookyAddBoard")
    ?.addEventListener(
      "click",
      addSpookyBoard
    );


  async function addSpookyBoard() {

    const author =
      document.getElementById(
        "spookyBoardAuthor"
      ).value.trim();


    const content =
      document.getElementById(
        "spookyBoardContent"
      ).value.trim();


    if (!content) {
      return;
    }


    const { error } =
      await spookySupabase
        .from("halloween_board")
        .insert({
          type:
            spookyBoardType,

          author:
            author || "Anónimo",

          content
        });


    if (error) {

      alert(
        "No se pudo guardar el mensaje."
      );

      return;

    }


    document.getElementById(
      "spookyBoardContent"
    ).value = "";


    loadSpookyBoard();

  }


  /* =======================================================
     CARTAS SPOOKY
  ======================================================= */

  async function loadSpookyLetters() {

    const list =
      document.getElementById(
        "spookyLettersList"
      );


    if (!list) {
      return;
    }


    const { data, error } =
      await spookySupabase
        .from("halloween_letters")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      list.innerHTML =
        "<div class='spooky-letter'>" +
        "Todavía no hay cartas." +
        "</div>";

      return;

    }


    list.innerHTML = "";


    (data || []).forEach(
      letter => {

        const article =
          document.createElement("article");

        article.className =
          "spooky-letter";


        article.innerHTML = `

          <h3>
            ${escapeHTML(letter.title || "Carta")}
          </h3>

          <div class="spooky-letter-author">
            ${escapeHTML(letter.author || "Anónimo")}
          </div>

          <p>
            ${escapeHTML(letter.body || "")}
          </p>

        `;


        list.appendChild(article);

      }
    );

  }


  document
    .getElementById("spookySaveLetter")
    ?.addEventListener(
      "click",
      saveSpookyLetter
    );


  async function saveSpookyLetter() {

    const author =
      document.getElementById(
        "spookyLetterAuthor"
      ).value.trim();


    const title =
      document.getElementById(
        "spookyLetterTitle"
      ).value.trim();


    const body =
      document.getElementById(
        "spookyLetterBody"
      ).value.trim();


    const status =
      document.getElementById(
        "spookyLetterStatus"
      );


    if (!body) {

      status.textContent =
        "Escribe algo antes de guardar.";

      return;

    }


    const { error } =
      await spookySupabase
        .from("halloween_letters")
        .insert({
          title:
            title || "Carta spooky",

          author:
            author || "Anónimo",

          body
        });


    if (error) {

      status.textContent =
        "No se pudo guardar la carta.";

      return;

    }


    status.textContent =
      "Carta guardada.";


    document.getElementById(
      "spookyLetterAuthor"
    ).value = "";

    document.getElementById(
      "spookyLetterTitle"
    ).value = "";

    document.getElementById(
      "spookyLetterBody"
    ).value = "";


    loadSpookyLetters();

  }


  /* =======================================================
     NOTIFICACIONES
  ======================================================= */

  const notificationBox =
    document.getElementById(
      "spookyNotifications"
    );


  document
    .getElementById(
      "spookyNotificationsButton"
    )
    ?.addEventListener(
      "click",
      () => {

        notificationBox.classList.add(
          "show"
        );

        loadSpookyNotifications();

      }
    );


  document
    .getElementById(
      "spookyNotificationsClose"
    )
    ?.addEventListener(
      "click",
      () => {

        notificationBox.classList.remove(
          "show"
        );

      }
    );


  async function loadSpookyNotifications() {

    const list =
      document.getElementById(
        "spookyNotificationsList"
      );


    const count =
      document.getElementById(
        "spookyNotificationCount"
      );


    if (!list) {
      return;
    }


    const { data, error } =
      await spookySupabase
        .from("halloween_notifications")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false
          }
        )
        .limit(30);


    if (error) {

      list.innerHTML =
        "<div class='spooky-notification'>" +
        "No hay notificaciones todavía." +
        "</div>";

      if (count) {
        count.textContent = "0";
      }

      return;

    }


    list.innerHTML = "";


    const notifications =
      data || [];


    if (count) {

      count.textContent =
        notifications.length;

    }


    notifications.forEach(
      notification => {

        const item =
          document.createElement("article");

        item.className =
          "spooky-notification";


        item.innerHTML = `

          <strong>
            ${escapeHTML(
              notification.title ||
              "Nueva notificación"
            )}
          </strong>

          <p>
            ${escapeHTML(
              notification.message ||
              ""
            )}
          </p>

        `;


        list.appendChild(item);

      }
    );

  }


  /* =======================================================
     SEGURIDAD DE TEXTO
  ======================================================= */

  function escapeHTML(value) {

    return String(value)
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }


  /* =======================================================
     INICIO
  ======================================================= */

  changeSeason(
  initialSeason
);

  })();

});
