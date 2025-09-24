import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const tracks = [
    { name: "FC: the Freedom Club", artist: "Sleepytime Gorilla Museum", duration_ms: 355000 },
    { name: "Peephole", artist: "System of a Down", duration_ms: 482000 },
    { name: "Painkiller", artist: "Judas Priest", duration_ms: 391000 },
    { name: "Eyeless", artist: "Slipknot", duration_ms: 356000 },
    { name: "Links 2-3-4", artist: "Rammstein", duration_ms: 183000 },
    { name: "Circle of Tyrants", artist: "Celtic Frost", duration_ms: 294000 },
    { name: "Peace Sells", artist: "Megadeth", duration_ms: 369000 },
    { name: "The Toxic Waltz", artist: "Exodus", duration_ms: 301000 },
    { name: "Twilight of the Gods", artist: "Helloween", duration_ms: 167000 },
    { name: "2 Minutes to Midnight", artist: "Iron Maiden", duration_ms: 230000 },
    { name: "Mushroom Cult", artist: "Dog Fashion Disco", duration_ms: 147000 },
    { name: "Ace of Spades", artist: "Motorhead", duration_ms: 217000 },
    { name: "Unreliable Narrator", artist: "Free Salamander Exhibit", duration_ms: 161000 },
    { name: "Thinking of a Number Above 17", artist: "Idiot Flesh", duration_ms: 145000 },
    { name: "Quote Unquote", artist: "Mr. Bungle", duration_ms: 195000 },
    { name: "Hello from the Gutter", artist: "Overkill", duration_ms: 230000 },
    { name: "Tommy the Cat", artist: "Primus", duration_ms: 251000 },
    { name: "13 Steps to Nowhere", artist: "Pantera", duration_ms: 258000 },
    { name: "Believer", artist: "Ozzy Osbourne", duration_ms: 357000 },
    { name: "Human Capital", artist: "Antique Deathcult", duration_ms: 355000 },
    { name: "Vinterblot", artist: "Bathory", duration_ms: 482000 },
    { name: "Symptom Of The Universe", artist: "Black Sabbath", duration_ms: 391000 },
    { name: "Tugboat", artist: "The Book of Knots", duration_ms: 356000 },
    { name: "Cry of the Banshee", artist: "Brocas Helm", duration_ms: 183000 },
    { name: "Jordan", artist: "Buckethead", duration_ms: 294000 },
    { name: "Can I Have A Ride", artist: "Deli Creeps", duration_ms: 369000 },
    { name: "Senor Peligro", artist: "Ministry", duration_ms: 301000 },
    { name: "Warhead", artist: "Otep", duration_ms: 167000 },
    { name: "The Unthinking Majority", artist: "Serj Tankian", duration_ms: 230000 },
    { name: "South of Heaven", artist: "Slayer", duration_ms: 147000 },
    { name: "Agent Orange", artist: "Sodom", duration_ms: 217000 },
    { name: "Practice What You Preach", artist: "Testament", duration_ms: 161000 },
    { name: "Iron Tears", artist: "Flotsam And Jetsam", duration_ms: 145000 },
    { name: "Caught In A Mosh", artist: "Anthrax", duration_ms: 195000 },
    { name: "A Tap Dancer's Dilemma", artist: "Diablo Swing Orchestra", duration_ms: 230000 },
    { name: "Shoots And Ladders", artist: "Korn", duration_ms: 251000 },
    { name: "Ride The Lightning", artist: "Metallica", duration_ms: 258000 },
    { name: "Bullet in the Head", artist: "Rage Against The Machine", duration_ms: 216000, },
    { name: "Buckin' The Bolts", artist: "Super Junky Monkey", duration_ms: 357000, },
    { name: "Hatredcopter", artist: "Dethklok", duration_ms: 357000 },
  ];

  for (const track of tracks) {
    await db.query(
      "INSERT INTO tracks (name, artist, duration_ms) VALUES ($1, $2, $3)",
      [track.name, track.artist, track.duration_ms]
    );
  }

  const playlists = [
    {
      name: "Thrash Metal Classics",
      description: "High-speed, aggressive thrash metal anthems",
    },
    {
      name: "Black Metal Atmosphere",
      description: "Dark, atmospheric black metal masterpieces",
    },
    {
      name: "Doom Metal Heaviness",
      description: "Slow, crushing doom and sludge metal",
    },
    {
      name: "Progressive Metal",
      description: "Complex, technical progressive metal compositions",
    },
    {
      name: "Nu Metal Revolution",
      description: "Alternative metal from the late 90s/early 2000s",
    },
    {
      name: "Indie Brutality",
      description: "Metal made by me lol",
    },
    {
      name: "Experimental Avant-Garde",
      description: "Weird, experimental, and avant-garde metal",
    },
    {
      name: "Classic Heavy Metal",
      description: "Traditional heavy metal foundations",
    },
    {
      name: "Industrial Metal",
      description: "Mechanical, industrial-influenced metal",
    },
    {
      name: "Groove Metal Power",
      description: "Heavy groove and rhythm-focused metal",
    },
  ];

  for (const playlist of playlists) {
    await db.query(
      "INSERT INTO playlists (name, description) VALUES ($1, $2)",
      [playlist.name, playlist.description]
    );
  }

  const playlistTracks = [
    // Thrash Metal Classics (Playlist 1)
    { playlist_id: 1, track_id: 7 }, // Peace Sells - Megadeth
    { playlist_id: 1, track_id: 8 }, // The Toxic Waltz - Exodus
    { playlist_id: 1, track_id: 9 }, // Twilight of the Gods - Helloween
    { playlist_id: 1, track_id: 30 }, // South of Heaven - Slayer
    { playlist_id: 1, track_id: 31 }, // Agent Orange - Sodom
    { playlist_id: 1, track_id: 32 }, // Practice What You Preach - Testament
    { playlist_id: 1, track_id: 34 }, // Caught In A Mosh - Anthrax
    { playlist_id: 1, track_id: 37 }, // Ride The Lightning - Metallica
    { playlist_id: 1, track_id: 16 }, // Hello from the Gutter - Overkill
    { playlist_id: 1, track_id: 33 }, // Iron Tears - Flotsam And Jetsam
    { playlist_id: 1, track_id: 3 }, // Painkiller - Judas Priest

    // Black Metal Atmosphere (Playlist 2)
    { playlist_id: 2, track_id: 6 }, // Circle of Tyrants - Celtic Frost
    { playlist_id: 2, track_id: 21 }, // Vinterblot - Bathory

    // Doom Metal Heaviness (Playlist 3)
    { playlist_id: 3, track_id: 40 }, // Hatredcopter - Dethklok
    { playlist_id: 3, track_id: 28 }, // Warhead - Otep

    // Progressive Metal (Playlist 4)
    { playlist_id: 4, track_id: 1 }, // FC: the Freedom Club - Sleepytime Gorilla Museum
    { playlist_id: 4, track_id: 13 }, // Unreliable Narrator - Free Salamander Exhibit
    { playlist_id: 4, track_id: 23 }, // Tugboat - The Book of Knots
    { playlist_id: 4, track_id: 25 }, // Jordan - Buckethead

    // Nu Metal Revolution (Playlist 5)
    { playlist_id: 5, track_id: 2 }, // Peephole - System of a Down
    { playlist_id: 5, track_id: 4 }, // Eyeless - Slipknot
    { playlist_id: 5, track_id: 29 }, // The Unthinking Majority - Serj Tankian
    { playlist_id: 5, track_id: 36 }, // Shoots And Ladders - Korn

    // Indie Metal Brutality (Playlist 6)
    { playlist_id: 6, track_id: 20 }, // Human Capital - Antique Deathcult

    // Experimental Avant-Garde (Playlist 7)
    { playlist_id: 7, track_id: 11 }, // Mushroom Cult - Dog Fashion Disco
    { playlist_id: 7, track_id: 26 }, // Can I Have A Ride - Deli Creeps
    { playlist_id: 7, track_id: 35 }, // A Tap Dancer's Dilemma - Diablo Swing Orchestra
    { playlist_id: 7, track_id: 14 }, // Thinking of a Number Above 17 - Idiot Flesh
    { playlist_id: 7, track_id: 15 }, // Quote Unquote - Mr. Bungle

    // Classic Heavy Metal (Playlist 8)
    { playlist_id: 8, track_id: 10 }, // 2 Minutes to Midnight - Iron Maiden
    { playlist_id: 8, track_id: 12 }, // Ace of Spades - Motorhead
    { playlist_id: 8, track_id: 19 }, // Believer - Ozzy Osbourne
    { playlist_id: 8, track_id: 22 }, // Symptom Of The Universe - Black Sabbath
    { playlist_id: 8, track_id: 24 }, // Cry of the Banshee - Brocas Helm

    // Industrial Metal (Playlist 9)
    { playlist_id: 9, track_id: 5 }, // Links 2-3-4 - Rammstein
    { playlist_id: 9, track_id: 27 }, // Senor Peligro - Ministry

    // Groove Metal Power (Playlist 10)
    { playlist_id: 10, track_id: 17 }, // Tommy the Cat - Primus
    { playlist_id: 10, track_id: 18 }, // 13 Steps to Nowhere - Pantera
    { playlist_id: 10, track_id: 38 }, // Bullet in the Head - Rage Against The Machine
    { playlist_id: 10, track_id: 39 }, // Buckin' The Bolts - Super Junky Monkey
  ];

  for (const relation of playlistTracks) {
    await db.query(
      "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2)",
      [relation.playlist_id, relation.track_id]
    );
  }
}
