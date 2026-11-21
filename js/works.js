/* =====================================================================
   THE ARCHIVE — single source of truth for every plate on the site.
   Dates come from the original Picsart export filenames (yy-mm-dd).
   Files without a dated name are marked null and shown as "n.d.".
   `w`/`h` are the original export dimensions, not the web copies.
   Titles taken from text inside the work where it has any; the rest
   are working titles — rename freely, nothing else depends on them.
   ===================================================================== */

window.SERIES = {
  collage: {
    name: 'Collage & Cut-Paper',
    deva: 'कतरन',
    gloss: 'katran — clippings',
    desc: 'Cut-outs, comic bursts, textile borders and speech bubbles. Pop-art assembled from album photos, temple jewellery and family-function costume.'
  },
  poster: {
    name: 'Poster & Type',
    deva: 'इश्तिहार',
    gloss: 'ishtihaar — a poster, a notice',
    desc: 'Single images that carry a title. Latin and Devanagari lettering set to do as much work as the photograph underneath it.'
  },
  night: {
    name: 'Night Frames',
    deva: 'रात',
    gloss: 'raat — night',
    desc: 'Shot after dark and pushed hard: long exposures, red rooms, crushed blacks and light that refuses to sit still.'
  },
  day: {
    name: 'Day Archive',
    deva: 'धूप',
    gloss: 'dhoop — sunlight',
    desc: 'Daylight photographs with one intervention each: a scribbled-out face, a swapped sky, a borrowed caption.'
  }
};

window.WORKS = [
  { slug: 'hojao', title: 'Fuck Off Hojao', date: '2023-12-09', series: 'collage', w: 1080, h: 1440,
    note: 'Ransom-note lettering cut from mismatched type and pasted over a garden group photo. Sunflowers stand in for every face.',
    tags: ['ransom type', 'cut-out', 'sunflower'] },

  { slug: 'dekh-chidiya', title: 'Dekh Chidiya', date: '2024-02-24', series: 'day', w: 2221, h: 2773,
    note: 'Two friends under a lilac umbrella, faces scribbled out in white. The caption borrows the line everyone uses to make you look up.',
    tags: ['scribble', 'caption', 'film tone'] },

  { slug: 'back-seat', title: 'Back Seat', date: '2024-03-10', series: 'day', w: 2256, h: 1589,
    note: 'Late-afternoon light across a back seat. Faces cross-hatched out so that posture does all of the talking.',
    tags: ['scribble', 'warm grade'] },

  { slug: 'what-you-looking-at', title: 'What You Looking At?', date: '2024-04-09', series: 'poster', w: 1448, h: 2574,
    note: 'Lips and a hand inverted into cyan, with the question chalked in green straight across the mouth.',
    tags: ['inversion', 'hand lettering'] },

  { slug: 'teachers-pet', title: "Teacher's Pet", date: '2024-06-07', series: 'poster', w: 506, h: 900,
    note: 'A magenta-flooded eye whose tear runs pink. Every insult it has heard is typeset around the iris and along the lid.',
    tags: ['type on path', 'magenta flood'] },

  { slug: 'costume-rash', title: 'This Costume Is Giving Me a Rash', date: '2024-12-28', series: 'collage', w: 1949, h: 3464,
    note: 'Dancers in gold-and-white costume, daisies for faces, one speech bubble with the complaint, and a white drip melting into black.',
    tags: ['speech bubble', 'drip', 'daisy'] },

  { slug: 'jaa-naa', title: 'Jaa Naa Lavdi', date: '2025-09-09', series: 'collage', w: 1200, h: 1600,
    note: 'A street pup on a magenta-graded rug, interrupted by comic starbursts saying what the dog is clearly thinking.',
    tags: ['starburst', 'indie pup'] },

  { slug: 'nikamma', title: 'Ni-कम्मा', date: '2025-09-26', series: 'poster', w: 1949, h: 3464,
    note: 'A night-drive frame full of flare under a doubled Latin/Devanagari title that reads as one word and as two.',
    tags: ['bilingual type', 'flare', 'night drive'] },

  { slug: 'booom', title: 'BOOOM', date: '2025-09-27', series: 'collage', w: 3464, h: 3464,
    note: 'A group portrait nested inside zari textile borders on a tangerine field, finished with a comic burst and a “To Be Continued…” caption box.',
    tags: ['textile border', 'caption box', 'nested frame'] },

  { slug: 'afterimage', title: 'Afterimage', date: '2025-11-16', series: 'night', w: 3000, h: 4000,
    note: 'Long exposure on a wet street. One figure stands still while red and violet light smears past.',
    tags: ['long exposure', 'wet street'] },

  { slug: 'flower-face', title: 'Flower Face', date: '2025-11-17', series: 'night', w: 3000, h: 4000,
    note: 'A crowded market night under bunting and Kannada signage. One face has been swapped for a flower.',
    tags: ['street', 'face swap', 'signage'] },

  { slug: 'the-mess', title: 'THE MESS in my head', date: '2025-11-26', series: 'poster', w: 3464, h: 1949,
    note: 'A shadowed concrete courtyard littered with colour, sitting under a heavy red grotesque headline.',
    tags: ['grotesque type', 'courtyard', 'chiaroscuro'] },

  { slug: 'burnt-bus', title: '२६ ११ २५', date: '2025-11-29', series: 'poster', w: 3464, h: 2309,
    note: 'A burnt-out bus graded red and amber, mounted on a handmade-paper mat over a block-printed floral, stamped with a Devanagari date.',
    tags: ['paper mat', 'devanagari stamp', 'block print'] },

  { slug: 'three-frames', title: 'Three Frames', date: '2026-02-07', series: 'night', w: 1949, h: 3464,
    note: 'The same eye three times down one vertical strip, overexposed until it burns into white and red.',
    tags: ['repetition', 'overexposure'] },

  { slug: 'star-struck', title: 'Star Struck', date: '2026-02-15', series: 'collage', w: 3464, h: 3464,
    note: 'A mirror selfie in a sari, cut out onto a maroon burst with gold-foil stars stuck on top.',
    tags: ['cut-out', 'foil stars', 'sari'] },

  { slug: 'motion-blur', title: 'Motion Blur', date: '2026-02-23', series: 'night', w: 842, h: 1497,
    note: 'Street lights and a passing cart, pulled out into streaks.',
    tags: ['streak', 'street'] },

  { slug: 'rings', title: 'Rings', date: '2026-04-05', series: 'night', w: 1949, h: 3464,
    note: 'Hands and rings in a shaken frame, letterboxed hard in black.',
    tags: ['letterbox', 'shake'] },

  { slug: 'smoke-break', title: 'Smoke Break', date: '2026-04-28', series: 'collage', w: 1772, h: 1080,
    note: 'A smoker re-printed in magenta and acid green, with a blue map pattern layered over the skin.',
    tags: ['duotone', 'pattern overlay'] },

  { slug: 'rooftop', title: 'Rooftop', date: '2026-06-15', series: 'day', w: 3000, h: 4000,
    note: 'Wide-angle under banana leaves against a hard blue sky.',
    tags: ['wide angle', 'hard sky'] },

  { slug: 'red-room', title: 'Red Room', date: '2026-07-14', series: 'night', w: 1200, h: 1600,
    note: 'A café at night seen through glass, with red paper lanterns doing all of the lighting.',
    tags: ['lanterns', 'through glass'] },

  { slug: 'table-for-four', title: 'Table for Four', date: '2026-07-15', series: 'night', w: 1949, h: 3464,
    note: 'Inside the same red: a table of friends caught mid-conversation.',
    tags: ['interior', 'red light'] },

  { slug: 'heat', title: 'Heat', date: '2026-08-08', series: 'night', w: 2731, h: 1536,
    note: 'Crushed to red and black until only the brightest edges survive.',
    tags: ['crushed blacks', 'threshold'] },

  { slug: 'indian-stray', title: 'Indian स्ट्रे', date: '2026-10-02', series: 'day', w: 3000, h: 4000,
    note: 'Two kittens and a paint bucket in raking sun, titled half in English and half in Devanagari.',
    tags: ['bilingual type', 'raking light'] },

  { slug: 'ughhh', title: 'UGHHH. I Need Out of Here', date: null, series: 'collage', w: 736, h: 736,
    note: 'Classical dancers repeated in plum-and-cyan duotone, interrupted by a hard-shadowed yellow dialog box.',
    tags: ['retro UI', 'duotone', 'repetition'] },

  { slug: 'mohabbat-zindabad', title: 'Mohabbat Zindabad', date: null, series: 'collage', w: 735, h: 490,
    note: 'A yellow pickup wearing truck-art lettering, parked inside a collage of miniature painting, textile trims and sunflowers.',
    tags: ['truck art', 'miniature', 'textile trim'] },

  { slug: 'lsd-sky', title: 'LSD Sky', date: null, series: 'day', w: 734, h: 414,
    note: 'A street seen from the back of a scooter, its sky swapped for a warped pink-and-violet checkerboard.',
    tags: ['sky swap', 'checkerboard'] },

  { slug: 'aankhein', title: 'Aankhein', date: null, series: 'poster', w: 736, h: 1308,
    note: 'Five horizontal slices of the same pair of eyes, graded acid-yellow to red, with the title in a high-contrast italic serif.',
    tags: ['film strip', 'italic serif', 'grain'] },

  { slug: 'untitled-eye', title: 'Untitled (Eye)', date: null, series: 'night', w: 736, h: 414,
    note: 'An eye in close-up, split by a hard lime-and-magenta block of colour.',
    tags: ['close-up', 'colour block'] },

  { slug: 'spits-blood-violently', title: 'Spits Blood Violently', date: null, series: 'collage', w: 736, h: 736,
    note: 'A black-and-white street corner. Two figures turned into rainbow cut-outs, one red line of text repeating down the frame.',
    tags: ['rainbow cut-out', 'repeat text', 'b&w'] }
];

/* plate numbers follow archive order: dated plates first, chronologically */
window.WORKS.forEach(function (w, i) { w.n = i + 1; });
