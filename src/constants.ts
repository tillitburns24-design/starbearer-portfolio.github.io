import { Category, Contact, Work } from './types';

const createTextCover = (title: string, subtitle: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f6e3ba" />
          <stop offset="48%" stop-color="#e6bf77" />
          <stop offset="100%" stop-color="#c9974f" />
        </linearGradient>
        <radialGradient id="glow" cx="18%" cy="16%" r="88%">
          <stop offset="0%" stop-color="#fff6df" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#fff6df" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="shadow" cx="88%" cy="80%" r="72%">
          <stop offset="0%" stop-color="#8e6132" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#8e6132" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" />
      <rect width="1200" height="800" fill="url(#glow)" />
      <rect width="1200" height="800" fill="url(#shadow)" />
      <circle cx="1000" cy="180" r="180" fill="#fff0c8" opacity="0.2" />
      <circle cx="1020" cy="620" r="240" fill="#9f6d38" opacity="0.08" />
      <text x="88" y="142" fill="#8e6132" font-family="Georgia, serif" font-size="30" letter-spacing="8">STARBEARER</text>
      <text x="88" y="410" fill="#3f2a19" font-family="Georgia, serif" font-size="78" font-weight="700">${title}</text>
      <text x="88" y="478" fill="#5f3f24" font-family="Arial, sans-serif" font-size="28">${subtitle}</text>
      <rect x="88" y="560" width="160" height="2" fill="#8e6132" opacity="0.7" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const parseWorkEndDate = (work: Work) => {
  const duration = work.details.find((detail) => detail.label === 'Duration')?.value;
  const year = work.details.find((detail) => detail.label === 'Year')?.value;
  const source = (duration || year || '').replace(/[–—]/g, '-');
  const dateMatches = source.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/g);

  if (dateMatches && dateMatches.length > 0) {
    const [day, month, rawYear] = dateMatches[dateMatches.length - 1].split('/');
    const normalizedYear = rawYear.length === 2 ? `20${rawYear}` : rawYear;

    return new Date(`${normalizedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T23:59:59`).getTime();
  }

  const yearMatches = source.match(/\b(19|20)\d{2}\b/g);

  if (yearMatches && yearMatches.length > 0) {
    return new Date(`${yearMatches[yearMatches.length - 1]}-12-31T23:59:59`).getTime();
  }

  return 0;
};

const sortCategoriesByNewest = (categories: Category[]) =>
  categories.map((category) => ({
    ...category,
    works: [...category.works].sort((left, right) => parseWorkEndDate(right) - parseWorkEndDate(left))
  }));

export const PROJECTS: Category[] = sortCategoriesByNewest([
  {
    id: 'level-design',
    title: 'Level Design',
    works: [
      {
        id: 'p1',
        title: 'Ceres',
        category: 'Level Design',
        description: 'A level design and creation project based on the show "The Expanse"',
        imageUrl: "Ceres/Ceres_concept01.jpg", // Title picture from drive
        longDescription: 'A game design and creation project with weekly progress reports. Theme was "Unseen Scene from the show The Expanse", made to be a three level baseline for a fleshed out project with the base interaction and movement in place.',
        media: [
          { type: 'video', url: "Ceres/Playthrough.mp4", caption: 'The playthrough of the final rendition of the project' },
          { type: 'text', content: 'The unlikely survivor of a home long gone.' },
          { type: 'text', content: 'Based on season 6 episode 3 of the show, this project shows what the character Naomi Nagata would have found amongst the fire and ruin inhabiting the Ceres Station.' },
          { type: 'bubble', content: 'Concept art for Ceres Station' },
          { type: 'image', url: "Ceres/Ceres_concept.jpg", caption: 'Concept art for the Docks, viewed from above' },
          { type: 'image', url: "Ceres/Ceres_concept04.jpg", caption: 'Concept art for the Docks, viewed from the bridge' },
          { type: 'image', url: "Ceres/Ceres_concept05.jpg", caption: 'Concept art for inside the elevator, with a view of Mid-Town' },
          { type: 'image', url: "Ceres/Ceres_concept01.jpg", caption: 'Concept art for the Market' },
          { type: 'image', url: "Ceres/Ceres_concept02.jpg", caption: 'Concept art for Mid-Town' },
          { type: 'image', url: "Ceres/Ceres_concept03.jpg", caption: 'Concept art for the Conference room' },
          { type: 'divider' },
          { type: 'image', url: "Ceres/Ceres PC character design.jpg", caption: 'Player character "Naomi Nagata", rough character design concept' },
          { type: 'image', url: "Ceres/Ceres draft02.jpg", caption: 'Initial draft for the upper levels' },
          { type: 'image', url: "Ceres/Ceres draft01.jpg", caption: 'Initial draft for the lower levels' },
        ],
        details: [
          { label: 'Type', value: 'Group Project (6 members)' },
          { label: 'Duration', value: '29/11/2023 - 16/01/2024' },
          { label: 'Role', value: 'Team Lead, Narrative & Game Design, Concept Art, Character Design, Visual Design, Light Artist, Presenter' },
          { label: 'Tools', value: 'Autodesk Sketchbook Pro and Unreal Engine' }
        ]
      },
      {
        id: 'p2',
        title: 'Tanpen',
        category: 'Level Design',
        description: 'An island level design',
        imageUrl: 'Tanpen/Tanpen 1.jpg',
        longDescription: 'A game level design project, done from the ground up with predetermined 3D assets, supposed to show understanding of material, focus on open world design with multiple routes from starting to ending point on the map',
        media: [
          {
            type: 'grid',
            urls: [
              'Tanpen/Tanpen.jpg',
              'Tanpen/Screenshot 2023-06-08 154429.png'
            ],
            caption: 'The initial sketch vs the final look of the level'
          },
          {
            type: 'image',
            url: 'Tanpen/Screenshot 2023-06-08 154455.png',
            caption: 'Vertical view of the level'
          },
          { type: 'bubble', content: 'Different route playthroughs' },
          {
            type: 'video',
            url: 'Tanpen/1. Fastest n most Direct route_aka_ZOOM_aka_We realize that we need statues_Quick overview of the scene though.mp4',
            caption: '1. Fastest n most Direct route_aka_ZOOM_aka_We realize that we need statues_Quick overview of the scene though'
          },
          {
            type: 'video',
            url: 'Tanpen/2. Library Side route_aka_First lil House_Also first Statue found_Am proud of the library.mp4',
            caption: '2. Library Side route_aka_First lil House_Also first Statue found_Am proud of the library'
          },
          {
            type: 'video',
            url: 'Tanpen/3. Houses route_aka_We going down_also sightseeing_ALSO_Two Statues out of four found here.mp4',
            caption: '3. Houses route_aka_We going down_also sightseeing_ALSO_Two Statues out of four found here'
          },
          {
            type: 'video',
            url: 'Tanpen/4. Roof route_aka_THE Scenic route_aka_PARKOUR_Still love going over roofs_how obvious is it that I got a friend to go over this route for me_still love tho.mp4',
            caption: '4. Roof route_aka_THE Scenic route_aka_PARKOUR_Still love going over roofs_how obvious is it that I got a friend to go over this route for me_still love tho'
          },
          {
            type: 'video',
            url: 'Tanpen/5. Cliff Route_aka_For when you YEET yourself off the cliff_yes i planned for this_Under the bridge and houses we go.mp4',
            caption: '5. Cliff Route_aka_For when you YEET yourself off the cliff_yes i planned for this_Under the bridge and houses we go'
          },
          { type: 'bubble', content: 'Different views of the level' },
          {
            type: 'grid',
            urls: [
              'Tanpen/Screenshot 2023-06-08 101753.png',
              'Tanpen/Screenshot 2023-06-08 102014.png',
              'Tanpen/Screenshot 2023-06-08 102408.png',
              'Tanpen/Screenshot 2023-06-08 102619.png'
            ]
          },
          {
            type: 'grid',
            urls: [
              'Tanpen/Screenshot 2023-06-08 102814.png',
              'Tanpen/Screenshot 2023-06-08 103022.png',
              'Tanpen/Screenshot 2023-06-08 103234.png',
              'Tanpen/Screenshot 2023-06-08 103445.png'
            ]
          },
          {
            type: 'grid',
            urls: [
              'Tanpen/Screenshot 2023-06-11 223219.png',
              'Tanpen/Screenshot 2023-06-11 223340.png',
              'Tanpen/Screenshot 2023-06-11 223436.png',
              'Tanpen/Screenshot 2023-06-11 223615.png'
            ]
          },
          {
            type: 'grid',
            urls: [
              'Tanpen/Screenshot 2023-06-11 231322.png',
              'Tanpen/Screenshot 2023-06-11 231454.png',
              'Tanpen/Screenshot 2023-06-11 231755.png'
            ]
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '11/05/2023 - 08/06/2023' },
          { label: 'Role', value: 'Game and Narrative Designer' },
          { label: 'Tools', value: 'Unreal Engine' }
        ]
      },
      {
        id: 'p3',
        title: 'Catan',
        category: 'Level Design',
        description: 'A game design project based on the TTG',
        imageUrl: 'Catan/Screenshot 2024-02-10 121945.png',
        longDescription: 'A group of peers given the same topic, meant to make a version of Catan one for AR and one for VR. We were told to do so with the same set of 3D models that we designed and made for both',
        media: [
          { type: 'video', url: 'Catan/Acceptance - Playthrough.mp4', caption: 'Acceptance - Playthrough' },
          { type: 'video', url: 'Catan/Acceptance_Playthrough_Pt_1.mp4', caption: 'Acceptance_Playthrough_Pt_1' },
          { type: 'video', url: 'Catan/Acceptance_Playthrough_Pt_2.mp4', caption: 'Acceptance_Playthrough_Pt_2' },
          { type: 'video', url: 'Catan/Catan - Models Overview.mp4', caption: 'Catan - Models Overview' },
          { type: 'video', url: 'Catan/Catan - AR App.mp4', caption: 'Catan - AR App' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '03/12/2023 - 11/02/2024' },
          { label: 'Role', value: 'Game Design, Programmer, 3D Modeller, Environment Artist, Texture Artist' },
          { label: 'Tools', value: 'Unreal Engine, 3DS Max, Substance Painter' }
        ]
      },
    ]
  },
  {
    id: 'game-design',
    title: 'Game Design',
    works: [
      {
        id: 'b1',
        title: "Death's Return",
        category: 'Game Design',
        description: "A game concept about Death in a world that yearns and rejects it",
        imageUrl: "Death's Return/Death's Return - Banner.png",
        longDescription: `"In a world where people can represent Symbols and Omens, and have control over the Laws of Nature, what would happen if someone managed to capture Death?\nAfter a millennia long imprisonment, The Omens of Death have finally returned to world long lost to rot and corruption."\nA creative project that grew into a game concept with fleshed out characters and world`,
        media: [
          { type: 'image', url: "Death's Return/Death's Return - Banner.png" },
          {
            type: 'markdown',
            content: `**Name:**

Death's Return

**Logline:**

In this single/multiplayer fantasy action RPG, you play as the Corvids, the Lost Omens of Death, who now must decide between returning balance to Law and getting their revenge against those who forsook them.

**Detailed game concept:**

In a world where people can represent Symbols and Omens, and have control over the Laws of Nature, what would happen if someone managed to capture Death? After a millennia long imprisonment, The Omens of Death have finally returned to a world long lost to rot and corruption. 
Playing as either Crow, Raven or Rook, (or as a multiplayer), you explore what’s left of Law and its people, gathering the strength of your Faith, through Believers or through Clashes with the Symbols. 

**Genre:**

Modern fantasy action roleplaying game with Roguelike tendencies.

**Philosophy of creation:**

The goal of the game is to get the players to face and embrace the finality and the brief nature of life through the eternity spent living and suffering through it. The game gets philosophical and hypothetical through its themes of Loss, Death, Balance and Overindulgence, which are brought in the dialogue, as well as the small cutscenes the MC views, and the ways the playable's evolve. It also gets both sweet and melancholic with its Bird characters, giving all of them a moral and emotional reason to fight.
DR (Death's Return) is an adaptive game, which in its multiplayer form draws inspiration from D&D with a real time fighting and a roleplaying aspect that depends on the belief people have about the characters, and in its singleplayer mode each character gives a different narrative and game mechanics, with Crow giving the brawler experience for the revenge route, and a more stealth based quest filled healing route, Raven being a long range sharpshooter/mimicry mage for the revenge route, parkour dream tamer mini levels for the healing route, and Rook being a bloodthirsty swordfighter for the revenge, cult builder/problem solver and benevolent tyrant for the healing route. All of the routes rely on a Belief system, where each action the player takes, shapes the way they're viewed and can impact the game.
Aesthetically, the game calls on a lot of bird symbolism and bird imagery in myths, dystopian and utopian schools of thought, with one of its main inspirations being the dichotomy of the Rich enjoying the frivolities given to them by the suffering of those they see below them. The whole thing is also inspired by what happens when the Apex predator is removed from an ecosystem, because what is Death if not the one at the end of the chain.

**Demography:**

Game targets players with a bit more experience, those that yearn a challenge from the Boss fights, those who go for lore based games that don't give you all the information directly. Players that enjoy philosophical and metaphor filled works, like getting attached and learning about the characters in the new world, and like birds. It's also targeted to that one multiplayer mod community that wants to play difficult fantasy games with their friends.`
          },
          {
            type: 'markdown',
            content: `**Setting:**

The Laws of Nature, also just called Law or Laws, a three level city, set in the near future timeline wise to our present, in a world of magical realism where during the Ancient times, the people of the Laws managed to entrap the Concepts of Nature in human-like forms, creating the first generation of Symbols (the Good) and Omens (the Bad), the two names used interchangeably to refer to the Bird Gods in control of their assigned Concept. With the Concept gaining a human form and mind, Belief and Faith became a currency for regular people, the Believers, to barter with to gain their desired outcome with the Symbols and Omens. Concepts can gain new forms and change based on the people’s Belief, leading to new Symbols being made and existing ones changing temper.

About a thousand years ago from the story’s starting point, the newly appointed Symbol of Peace, Dove, came to a decision to banish the Omens of Death, as a way of ensuring Peace and Prosperity, as opposed to Grief and Pain. With the rest of the Symbols being fresh out of the Great Ideological War, the majority agreed, gathering the three Corvids, Omens of Death, from the battlefield and throwing them into the Dark, the lowest part of the Laws, to be chained by the Belief that they are no longer needed.
In the present of the game, the Corvid siblings are able to break their chains and choose their path of Faith.
In those thousand years, the Laws has divided itself even further into the three levels: the Dark, the Underground, and the Light.

The Dark has kept the look and feel of the catacombs and dungeons of a medieval castle with subtle details of an abandoned hospital from the Great War. In this lowest level reside the Faithless, a wraith like creatures made of fears and belief of young Believers, and the Huskless, the Believers whose Belief drained them but didn’t kill them (as no one can die with the Omens of Death chained).

The Underground is an overcrowded space, densely packed with the Undesired, those who don’t fit into the standard mold of the Light. The look is a combination of an immigrant only neighborhood in Chicago, Dieselpunk version of an Asian district, and a block full of Communism Architecture Buildings. The Undesired have three Symbols in charge of them, Owl, Sparrow, and Ostrich, each having a ‘Neighborhood’ they look after. Undesired fall into a few categories: the Overgrown, creatures that began as Believer that started to mutate as their organs never stopped growing, becoming an amalgamation of tissue stitched together with little to no sanity left; the Undercares, Believers whose bodies ate at themselves through illnesses and age; and the Delusions, Believers that stopped believing in the Light Symbols or believed too much in the ‘wrong’ ones,, or just stopped believing at all.

The Light is a utopian-like part of the Laws, located at the highest point of the city, home to the three main Light Symbols, Dove, Swallow, and Flamingo. Flamingo’s neighborhood is an eternal rave, with cyberpunk and neon holographic feel, a home to overindulgence. Swallow’s level is an overgrown jungle overlapping with a forest, both evergrowing, both stuck not allowing room for actual life, with few that live there, doing so in solarpunk-esc threehouses. Dove commands an empty white Corporate, Greco-Roman inspired area, one in charge of communicating and controlling the rest of the Laws. Besides the Believers, the Symbols kept around the Guardians, creatures that mutated out of people’s belief of an inanimate sapience, with three variations for each neighborhood (Marble statues for Dove, Tree golems for Swallow, Plastic Bouncer for Flamingo).

Belief as a magic system influences both the Symbols, with the personality changes, areas of life they effect, and their powerlevels, it also gives life and power to inanimate and ideas.`
          },
          {
            type: 'markdown',
            content: `**Main characters:**

The game has three main playable main characters, each making the gaming and narrative experience different. All three start the story when they manage to break out of their imprisonment.`
          },
          {
            type: 'grid',
            urls: [
              "Death's Return/Death's Return Original Character Concept .png",
              "Death's Return/Death's Return New Corvid Character Concept.png"
            ],
            caption: "The original character concepts vs the latest corvid character concepts"
          },
          {
            type: 'markdown',
            content: `Crow, eldest of the Corvids, is the Omen of Brutal Death, Prophecy and Health. As the shortest of the three, Crow stands at 1,6 meters, a stocky stature, of Southeast Asian decent, with short shaggy black hair, amber eyes hidden behind a bone mask in shape of a simplified bird face and underneath a black hood, a comfortable dark shortsleeved shirt and pants, along with leather indonesian inspired pauldrons and metal vembraces. They’re a no-nonsense type of person, could be seen as stoic, full of determination to restore Balance of Life and Death. They’re a pretty blunt person, able to wax poetics about cheesy romance novels and crack dark army war humour jokes, but aren't used to interacting with people that aren’t warriors or chronically ill, now even less so after a thousand year long imprisonment. They don’t care about a lot, can learn to care about their Believers, but only hold their siblings in high regard, though they don’t show it. Out of the three, they were the one to keep the other two Corvids talking and sane during the imprisonment, planning the fastest way to collect all the Believers who need to pass on with the help of their Visions. Before the War, they were a somewhat closed off person, one who wanted to make way for change and innovation, through their role as the sole Omen of Death before the creation of their siblings, kind and gentle, but that gentleness has dulled over the years. Still the most patient out of the three Corvids, one of those people willing to wait out the person talking themselves into a hole. Willing to fight when necessary, more likely to think their way out of a problem.`
          },
          { type: 'image', url: "Death's Return/Death's Return Crow Character Concept .png" },
          {
            type: 'markdown',
            content: `Raven, second oldest, is the Omen of Peaceful Death, Dreams and Creation. Raven as the tallest of the three stands at 2,1 meters, a lean almost hourglass build, of North American Native decent, with black hair longer than her older sibling in a shape of a reverse triangle, almost golden eyes hidden behind a mask made out of grey sinew lace in a shape of a bird’s beak, pale Lakotan dress with purple accent tucked in a black leather corset, with wide dark pants. Both the most quiet and the most talkative of the siblings, Raven is used to silence and listening to others, giving her Believers the final moment to tell their stories and regrets before passing, but also able to talk a hundred miles an hour if asked. Endlessly curious and artsy, she doesn’t really have a frame of reference for what a normal interaction looks like, too used to being surrounded by his ravens and their collection of dreams, nightmares and ambitions of the believers. As the storyteller of the siblings, they tried to keep the siblings sane, speaking of the best dreams she ever made into reality, debating the reasoning behind the imprisonment, and the like. After escaping, Raven’s first and only goal is the recollection of her ravens and their Dream Collection, as well as verbally roasting the lack of creativity in the design of the city. Most used to action out of the three, whether that be through a fight or through actively doing something needed to find a solution or solve a problem.`
          },
          { type: 'image', url: "Death's Return/Death's Return Raven Character Concept.png" },
          {
            type: 'markdown',
            content: `Rook, the youngest, is the Omen of Sudden Death, Change and Home. Standing at 1,8 meters, with a lanky build and of Scandinavian, Rook has long dark grey hair, pale green eyes behind a white leather plague doctor mask with green lenses, with a grey sleeveless short jumpsuit, black leggings and a grey green feather-like cape. Before the imprisonment, Rook was content, a calm person, one who was always a bit hurt by the way people perceived them outside of their Believers, but willing to overlook the majority in favor of their siblings and Believers. They were a kind hardworking person, soft spoken and warm, a huge soft spot for small children and older people who hadn’t given up, and a bit quick on the draw of her sword when it came to protecting her chosen ones. On the flip side of her siblings, she was the closest to her Believers, actively making a community, thus gaining the charisma needed to actually be liked by everyone. When they were imprisoned, Rook became devastated, their community failed them and worst of all she failed her community as well. Rook started building a mask for herself, a way to keep their siblings from worrying, but also a way to plan for the future, after she was set free. Her rage over the years simmered and rose interchangeably, but also gave her the fuel to change her goal from only protection, to destruction of all other Symbols. For if they dared deny Rook her community, she is willing to destroy everything they hold in high regard, whether that be their status, power, or their Believers. Relies on pre-made plans for most situations, very impulsive though, so it mostly ends with them fighting.`
          },
          { type: 'image', url: "Death's Return/Death's Return Rook Character Concept .png" },
          {
            type: 'markdown',
            content: `**Premise:**

The story begins a thousand years after the main twist, the main thing that throws the Laws out of balance. The story of Laws before the imprisonment of the main characters is mostly unimportant and unmentioned by everyone except the main characters, the Corvids, and the antagonists, the Light, so the twist starts with the imprisonment of Death, or at least their Omens, at the hand of the antagonist, Dove, Symbol of Peace. During the imprisonment of Death, the Laws started changing, both for the better and worse, as did any ecosystem with its apex predator removed, which the Corvids discover after their escape. Corvids have the goal of returning Death into Law, although the ways vary depending on the character chosen and gamestyle of the player. During the story, Corvids have to pass through three main areas, each with a few characters, most of which need to be won over by the player, as the Omens are still feared. In the first area, the Dark, where they start, the player doesn’t encounter any truly living person, only the leftovers of the forgotten and the left Beliefs that they can talk to, gaining insight from as well as power. The second area, the Underground, gives more characters that can be dubious in nature, as in they won’t attack you if you don’t threaten their way of living. Here the player sees the way the lack of Death truly impacted the world, and gets to help people pass on, gaining followers (Believers), allies and enemies (Sparrow, Ostrich and Owl, their status varies depending on the player’s choices). Out of the three rulers of the Underground, Sparrows (Symbols of Freedom) are the only ones that immediately starts liking the Corvids, helping when they can, with Ostrich (Symbol of Justice) being neutral but willing to listen to their story, and Owl (Symbol of Wisdom) being actively hostile or giving you false information. In the final area, the Light, Corvids meet face to face with the delusions the Light Symbols have been feeding their Believers, the player encountering people so drugged on ecstasy and brief pleasure, they are ignorant to the state of the other two levels of the city. Corvids have to interact in some way with each of the Symbols of light. Flamingo (Symbol of Beauty and Joy) not being willing to listen to the play at all, only reacting in a passive-aggressive dismissive manner to everything, and trying to drug the players, leading to an interaction with other drugged Believers and the Plastic Bouncers. Swallow (Symbol of Growth and Spring) ends up being the more positive if not melancholy interaction of the three, her being unable to speak nor leave her level, despite being used to produce the food for the whole city, letting the player know that if ignorance wasn’t inherent, its silence was enforced. The final confrontation with the antagonist, Dove (Symbol of Peace and Equality) shows the true rot and misinformation that she spread through this world, with her still being a young Symbol, acting like a child throwing a tantrum playing god whenever the player says anything to negate her rulings. Dove acting like the judge, jury and the executioner, but still acting as if her hands are clean, leads to the player's choice between killing Dove, locking her power away, or destroying the system of Symbols.
The story allows for multiple endings, all depending on the chosen characters, whether the player went the Revenger or Healing route, the amount of Believers the player amassed, as well as whether they end up fighting against the hidden bosses (the Symbols of the Underground, other Corvids, or the last boss the Hummingbird, the symbol of Life).`
          },
          {
            type: 'markdown',
            content: `**Goal of the game:**

Outer goal: Return the Balance through Death, Collect Belief.

Inner goal: Make the believers see the joy and value in the briefness of Life and the comfort of Death, make them stop fearing Death and Grief, have them believe Death is merciful, get revenge on the Symbols of Light for trapping you.`
          },
          {
            type: 'markdown',
            content: `**Genre characteristics:**

One of the main higher concepts of the game, beside the option between a multiplayer and a single player game that has Elder Scrolls level of difficulty with boss battles, is the availability of different player mechanics for each of the characters, giving a different playthrough depending on both the character and the route choice. All of the characters have a Roguelike mechanic of returning back to the beginning of the game upon “Death” without the gathered upgrades, as well as a type of stealth mechanic of ‘looking behind the wall’ (Crow seeing where the unhealthy people are, Raven seeing the dream-sand on believers, Rook seeing people standing on the same thing her sword hits).
During the ‘action’ parts of the game, the mechanics differ for each character, Crow getting an ability to see the opponents next attack, Raven getting to mimic a magic based attack from the opponents, Rook getting to teleport to different parts of the battle. For the ‘roleplay’ parts of the game, each PC gets a different hint relating to the dialogue and reaction/action options depending on the Minor Omens they have, leading to them getting a different perspective/relation with the given character/part of the world.`
          },
          { type: 'bubble', content: 'Additional concept art' },
          { type: 'image', url: "Death's Return/Death's Return Corvids Fighting Concept.png" },
          { type: 'image', url: "Death's Return/Death's Return Corvid Recharge Concept.png" }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '15/03/2023 - Ongoing' },
          { label: 'Role', value: 'Writer, Game Designer, Concept Artist, Illustrator' }
        ]
      },
      {
        id: 'b2',
        title: 'Her Guardian',
        category: 'Game Design',
        description: 'A game concept about an amnesiac ghost and a child with a camera exploring a city',
        imageUrl: 'Her Guardian/Her Guardian.jpg',
        longDescription: '"With one foot in the grave and one on the ground, getting a new guardian \'angel\' seems like a good upside to your escape plan..."\n\nA game concept for a puzzle \'your choices matter\' game, where a (near) death experience connects little Mari Gold with a newly awaken ghost, the game design document and concepts are complete, the project just hasn\'t been further developed',
        media: [
          { type: 'image', url: 'Her Guardian/Her Guardian.jpg' },
          {
            type: 'bubble',
            content: `Creator's note: Parts of this document are ‘blacked’ out for a spoiler <span class="spoiler">[memory]</span> free experience. For the complete text, simply hover over the blacked out sections. \n\n<span class="spoiler">Welcome to the Enlightenment, my Friend.</span>`
          },
          {
            type: 'markdown',
            content: `**Name:** 
            
            Her Guardian

**Logline:** 

In this Puzzle/Adventure game, you play as a ghost attached to the Child new to the City, torn between regaining the memories of your previous life and building new memories with other Ghosts of this world of duality.

**Detailed game concept:** 

Waking up after your brutal death, you suddenly find yourself attached to Mari Gold, a girl also new to the City willing to find out all of the town’s Secrets, yet trying to return to her Home. You must decide whether to help her in her quest or use her role as your vessel to regain your Memories of the life Before and your new/old Place in the City, through your power of Drifting between the Live,
Ghost and Memory versions of the City. Your powers as a Spirit allow you to help Mari solve the puzzles left in the Before and the Now of the City, allowing you to progress through the world and for you to influence the world from “the Beyond”.

**Genre:** 

A single-player 2D Puzzle Adventure game with slight Psychological and Existential horror elements.

**Philosophy of creation:** 

One of the main questions the game draws inspiration from is the “Nature vs Nurture” debate. Whether we are the way we are because it is our Nature, our Soul, to act thusly; or if we are made by our Memories, the way we were Nurtured into being. And what of our surroundings, our communities, our culture? The Change is constant, but do we change along with every passing belief, or do we stay the same in our Core. The goal is to inspire a bit of a moral and philosophical conundrum for the players, all wrapped in a story about a self-assured child being influenced by a person they trust, alongside a changing environment.
A question also posed, taken from “The Truman Show” and “1984”, is how much of one's Freedom and sense of Self are we willing to sacrifice for the sake of Control and Entertain. This subgoal is mostly seen as a background thing as neither of the main characters concerns themself with it <span class="spoiler">(unless it's part of the Enlightenment route)</span>.
While the game and its mechanics are simple and straightforward, the moral and existential decisions that need to be made are meant to give the player a sense of scale when it comes to the game.
The primary feel of the game is supposed to evoke: comfort coming from an eerie place, melancholic nostalgia, <span class="spoiler">the desperate need for control in a system that only puts you down</span>, and emotional drainage from a choice that impacts and changes everything. The game is meant to be played strategically and logically but the choices retaining the characters themselves are supposed to be emotionally charged <span class="spoiler">(although if the players wish for a specific ending, strategy is a requirement)</span>.

**Demography:** 

Lovers of the “cute grotesque” genre of media, people who like a bit of a dystopian feel in their cute stories, lovers of the “Gruff man adopts an opinionated child he didn't want” trope, fans of bands like “Rabbitology” and “Crane Wives”, those who played and liked games like “Little Miss Fortune”, “Night in the Woods” and “Sally Face”, those who liked the feel of games like “Little Nightmares” and “Cult of the Lamb”, <span class="spoiler">the fans of “Slay the Princess”, and those who want to know what it's like to run a cult/gang built in your name</span>. This game is made for the more casual players who enjoy narrative based games, where your choices and decisions matter, but who still like a bit of an intellectual challenge besides the moral and ethical ones.

**Setting:** 

The City, <span class="spoiler">an encased dome filming studio/city</span>, is the setting made from a combination of a 1950’s ideal and a slight cyberpunk inspired future, with the powers present fitting the genre of magical realism. It is divided into three regions, the Center, the Suburbia, and the Fences, with the player being given three different view of each region depending on either of the three ways:

**Living,** *a patchwork of finished paintings cut and stuck together in a collage; unable to escape but never belonging. The cracks in the paint were left for the People to settle in, to try and build a life that is always going to be Watched, but never Seen. - But the tears are the best part! The rooftops with the sunsets and the wisps of memories, the dead end corner with the hints of laughter, the backdoor roads with the echoes of the people who were there before? Those are my favorite parts.* – The Guardian, <span class="spoiler">Blanc</span>, describing the Living, with Mari replying.

**The Living City** is the version of the city that the game starts in, the one that actually gets to move onwards. It's populated by People, some of which can feel or somehow get in touch with the Remembrance and communicate with the other City. Remembrance is viewed as the City fighting against change, or at least trying to get back the culture of past People of the Living City. The Remembrance is seen as a puncture in the canvas of the City, from which Memories can spill. Remembrance can take the shape of one of the members of the Dying City, or of golden and indigo paint-like sludge.
The Living has clear borders between each of its areas, as well as <span class="spoiler">Walls</span> at the end of its borders which are on the other side of the Fences. Every border is lined with clear Eyes/surveillance cameras, with those cameras placed everywhere in the City. Behind the cameras/Eyes, the ones taking out every threat to their ‘order’, are the Producers. The Producers are seen as black tar-like entities that watch and use the lives of the People as entertainment. The current Producers are <span class="spoiler">direct descendants of the Enlighten Followers</span>, but the original origin of the Producers is unknown.

**Dying/Ghost,** *an ink pen sketch continuously added to that is always on the verge of tumbling down, with the edges torn and the hues splashed onto the scenery as blotches of watercolor, overcrowded yet lively with the sounds of the home you forgot to miss in the Outskirts, the creeping of leaves you didn't notice stopped growing tumbling out of cracks in the Square, the splashes of the first and last lakes you visited reverberating through overflooded Underground tunnels, all encompassed by a sense of unlived nostalgia… You see most of it spilling in the final picture, Lovely, don't know why you keep asking me to describe anything.* – The Guardian, <span class="spoiler">Dad</span>, to Mari after being questioned about pure Ghost City.

**The Ghost City** is the spirit/ghost variant of the city, made from the leftover memories of places and people left by the denizens of the Living. This gives the City an additional look of a post WWII Japan and the feel of the 1920’s New Orleans thrown in the mix, with buildings and houses all stacked on each other, attached by metal and wooden poles, all sketched in a Nihonga watercolor and ink painting.
The city is made from two sentient species of Spirits, the Spirits of the Ancient and the Spirits of the Cultures, and additionally populated by the Dying, the Spirits of the People who lived in the City. Spirits of the Ancient are nature spirits, usually representing biomes that are significant to the land (massive evergreen forests, tropical woods, the overgrowing autumnal trees and plants on the urban sides of the City), and they are the most quiet. Ancients are both the strongest and widest of the Spirits but are constantly in danger of being Forgotten (the equivalent of Second Death in the Ghost City), so they often try to regain territory in the Living, resulting in most Remembrances being plant life.
Spirits of Culture are spirits of emotion, usually stemmed from beliefs and legends surrounding a specific place/building/monument, which results in moveable places all around the City which can somewhat influence the emotions of other spirits. Culture Spirits aren't as strong but they are playful and pretty talkative as opposed to the Ancients, especially because they are tied to an ever revolving circle of oral tradition, but that tie leads to the Spirits changing over time (slowly and drastically).
Last spirits are the actual population, the Spirits of People or, as they're know, the Dying. The Dying are separated into two categories, the Legacies and the Rewritten, with the latter being almost non-existent or at least full of Dying with no memories of their past. The Legacies are spirits of people who left behind people and ideals for which they still influence the Living. They're the weakest of the Spirits but the ones that are most likely to get in touch with People, most influencing surface level thoughts of the Living and opening Doors (routes that are available only to Spirits in the Living).

**Remembering/Memories,** *an oil pastel mess of saturated colors that scream at the Guardian’s every move, yet lives through a crawling of pigment on a black canvas of the Alleys, the slow movement of the leaves in the trees of the Suburbs before the red spills, and the slow focus of the obsidian betrayal on a pastel scene… I don’t think I know how to describe the experience better.* – The Guardian, <span class="spoiler">Blanc</span>, asked by Mari to explain how the Memories look.

**The Memories** is the remembered version of the city, fully built out of broken up memories of the Guardian. Remembering gives the City a look of both the 1960’s Italy village, as well as the Ghetto of a Mob-run country in the 1970’s, all painted with an oversaturated oil pastels set given to a Van Gogh inspired artist.
Even though the Memories are just that, memories, they are still populated by ‘people’ depicted in one of three ways by Blanc’s mind. The Blurs, seen as blobs of smudged pastels, are people that are heavily associated with pain in Guardian’s mind, people that either hurt him or ignored him, making most people in the Memories Blurs. The Darks, aggressive strokes of black or otherwise dark pastels scratched over the shadow of a person, are related to betrayal, people that Guardian trusted or otherwise held in high regard who ended up betraying him or discarding him, making only a few people in the Memories Dark (<span class="spoiler">his Protected while in the Mafia</span>, <span class="spoiler">his Second in Command in the Cult</span>, <span class="spoiler">his Sister after leaving and dying</span>). And finally, the Lights, seen as swirls of light and gold pastels around an outline of a person, are the people Guardian loved and cherished in his life, of which there are only two (<span class="spoiler">his Sister</span>, and <span class="spoiler">his Voice</span>).

**Main characters:** Two main characters.

Mari Gold [also known as The Child, Golden, <span class="spoiler">God’s Protected</span>, <span class="spoiler">The Eyes of Beyond</span>, <span class="spoiler">The Voice of God</span>, <span class="spoiler">SUBJECT #2-13</span>, <span class="spoiler">Kid</span>, <span class="spoiler">The Moon</span>] is a self-assured and intelligent nine year-old aspiring journalist, who is still trusting and a bit naive when it comes to adults and their stances, but pretty private and able to deflect conversation and questions easily. She's still a pretty athletic kid, one pretty tall for her age, with pale skin, short dark hair with two strands framing her face, and amber eyes that glow gold when in contact with Ghosts or Merged with Guardian. At the start of the game, her main acknowledged goal is to return Home. She never says where her Home is, so at the start that is her house outside the city, where she grew up with borderline emotionally abusive, but definitely negligent parents. Said parents left her alone while at a ‘Business Conference’, which led Mari to wandering off. While wandering, she tries climbing the side of a building to get a better picture with her camera, leading to her falling and hitting her head, which connects her to the Guardian and starts the game.
Begins the story pretty enthusiastic, somewhat confused by Guardian’s appearance with her, but accepting it and bulldozing through that confusion with acceptance. Not much is known about Mari’s backstory, besides her parents.
The few things the player learns about Mari’s life outside is related to her love of people watching, climbing and learning. Mari says that she was pretty hesitant to come to the City, but she ends up loving both it and the exploration it gave her with Guardian.
Her inner goal is to belong and be wanted by anyone, which leads her to become attached to Guardian pretty quickly regardless of how he treats her.
Mari’s way of dealing with problems and obstacles is pretty straightforward; with her debating the right call for about 10 seconds, before deadpanning her decision/answer and proceeding to scale the nearest vertical surface.
The actual reason why <span class="spoiler">the Producers are watching her</span> or at least why she’s important as the protagonist, is because she can see Ghosts and expand the Rememberance. Her being connected with <span class="spoiler">Blanc</span> aka her Guardian, while also being able to Merge with him and interact directly with the Dying, is another reason why she’s one of the protagonists.

<span class="spoiler">Blanc Lilly</span> [also known as The Guardian, Angel, <span class="spoiler">God</span>, <span class="spoiler">Voice from the Other</span>, <span class="spoiler">The Enlightened</span>, <span class="spoiler">Lily flower</span>, <span class="spoiler">False Messiah</span>, <span class="spoiler">Dad</span>, <span class="spoiler">The Sun</span>] is a passionate and fierce [<span class="spoiler">thirty-eight</span>] ??? year-old [<span class="spoiler">cultist, protector, sibling, artist</span>], who is pretty reserved and quiet when it comes to many things at first, but dangerously protective over and sarcastically flippant to people and things he cares for. They're seen as a dark shadow of nondescript appearance [<span class="spoiler">a slender dark skinned person with a combination of both masculine and feminine features</span>], almost two times as tall as Mari, but still shorter than most characters, light hair shorter than Mari’s, with glowing white <span class="spoiler">turquoise blue</span> eyes.
Guardian’s main goal at the start is to figure everything about himself out, while his inner one is for Guardian to become someone (either by remembering, by creating a new identity, or by being remembered and becoming something More).
At the start of the story, they are slightly dazed but also blunt in their confusion, as Guardian wakes up without any memory (<span class="spoiler">choking, being asphyxiated by both betrayal and his own blood - the fall/shove off the cliff breaking both him and his connection to Light - begging in his mind for something to help him one last time</span>) of being either alive or dead before being attached to Mari. He is, in spite of this, open and curious about his situation and about the City, making him willing to start finding out about himself.
His <span class="spoiler">tragedy</span>/backstory is unknown, but can be accessed by finding Memories, which are presented in reverse chronological order. At the beginning of the game, Guardian becoming connected to Mari is seen as a new start and a second chance by <span class="spoiler">Blanc</span> himself.
Unlike Mari, <span class="spoiler">Blanc</span> has more of a method for dealing with obstacles; thinking and talking his way through most issues, whether that results in convincing or manipulating others into giving him what he needs. A strong believer in the saying “there is power in numbers”, but prefers to keep his closest few, and others in denial of their ‘closeness’.

<span class="spoiler">[an overview of Blanc’s Memories: abusive childhood, his sister [blurred in the memories] being the highlight, being happy she escaped, accidentally helping the local gang stash a body, starts collecting favors, paints a wall in an alley behind a bakery, becomes known as the Artist (shops with his art are protected, shops with his sign are dead), half the City owes him, people start targeting him, Sister returns, she’s killed in a crossfire Blanc doesn’t even witness, breakdown, wants to burn his studio, suddenly Enlightenment, Voice of the Moon urging him to Burn, gang turns into a cult,
Burns himself for the community, starts going against the Directors, Burns their connection to the Light with the cult, has followers everywhere, some followers get greedy, decide that they should get the access by getting the Enlightenment from the source, killing Blanc]</span>

**Premise:** 

This is a simple story of a girl falling and upon waking up, having her own ghost Guardian. – <span class="spoiler">This is a complicated tale of a man being pushed and upon dying/forgetting, being connected to his new Child.</span>
The disbalancing moment of this story is the very beginning, with the two protagonists waking up connected to each other. Her story goes onwards, while his history is being remembered backwards. There is no return to balance, only the two trying to find a new balance together. They collect either the forgotten Memories of him, or work on making new Memories of them. The two Drift from City to City, meeting different people and ghosts, choosing whether to bring them together or to keep the two Cities apart.
Two confront the Producers or never be made aware of their existence. The two preach of the Enlightenment, or they never even see the light. The two protect the unified City they created, or the two leave to find Home.
There are many endings to their tale, making the game personalized and tailored to the player's choices. There is no final confrontation, but there are a few open endings placed before the final standoffs (<span class="spoiler">facing the Producers head on once more</span>, <span class="spoiler">fully Looking into the Enlightenment</span>, <span class="spoiler">standing at the edge of the City about to board the train to Home</span>). Each ending is supposed to give the player the sense of fulfillment but also make them yearn more.

**Goal of the game:** 

Outer goal: Go Home, Leave the City, Figure Stuff Out.

Inner goal: Regain your Memories, <span class="spoiler">Get a Body</span>, Heal the Ghost and Living City, <span class="spoiler">Take control of the Whole City</span>, Get Mari Home, <span class="spoiler">Become Mari’s Home</span>.

**Genre characteristics:** 

The Game has a Roguelike tendency in which it doesn't have a save or a load function, forcing the player to stick to their choices. It allows for the game to be paused and closed while ‘saving’ the progress, but it doesn't allow for loading of past areas or for the player to rethink their choices unless they reset the whole game.
The main characteristics being the actual puzzles, they are usually logic and strategy based, usually being in the environment. The puzzles can also be solved through dialogue choices, or by simply finding a way around the puzzles in the landscape of the game.
The game allows for a change of the look and feel of itself through Drifting, Merging and Remember mechanics.
The game is really sensitive to the Player’s choices (both from when the Player interacts with the environment, with other characters, when they Drift and Merge and Memory, as well as when they Blackmail), leading to a personalized gameplay and end result.
The psychological horror is usually seen through the dialogue and the subtle background happenings, though the protagonists react differently to them, so the horror is more prominent when Guardian is in control as opposed to Mari.
Additional semi hidden meta elements that appear in certain routes of the game: the Producers getting information about the Player themselves and changing the desktop background to ominous messages, or with the Enlightenment giving you encouragement that borders on a Lovecraftian Eldritch horror finding a new favorite.

**Game flow - World:** 

Game progresses through ‘missions’, with most going linearly, leading the PCs through the main story and all the parts of the City. The missions mostly consist of talking to People and Ghosts, getting stories out of the Living and Memories out of the Dying, freeing up different roads and passages for travel. There are different sidequests (<span class="spoiler">Blackmail</span> [<span class="spoiler">Control route</span>], <span class="spoiler">Favors</span> [<span class="spoiler">Mafia route</span>], <span class="spoiler">Enlightening</span> [<span class="spoiler">Cult route</span>]) that require the use of Mari’s *Camera* and *Charm*, which lead to the Two influencing and actually changing the City more drastically (<span class="spoiler">Getting the Producers to either stop filming in some places, or to use the footage for the player’s gain</span>, <span class="spoiler">Getting people Living and Dying protected and sacked depending on how they treated the PCs</span>, <span class="spoiler">Gathering people to your cult and getting them to follow and worship your commands and beliefs</span>). An additional mission that the player can choose whether to go through or not has to do with Remembering, where upon stumbling across a specific Memory or two, the player can choose to bring parts of the Remembering into the Ghost City, thus getting more of the Dying Spirit to be restored in the Living. The Remembrance mission is a rare side-quest in the full <span class="spoiler">Memory Enlightenment route</span>, where <span class="spoiler">Blanc</span> is encouraged to get his version of the City back by letting Mari <span class="spoiler">*Voice*</span> it to the people through her <span class="spoiler">control of the Producers</span> in order for everyone to remember.

**Game flow - Characters:** 

Neither of the main characters get upgrades in the regular sense of the word.

Mari’s skillset consists of four main things: *Camera* (her skill with seeing things people don't want her to and capturing that information, as well as pulling information and Spirits from the Dying into the Living with a good picture), *Ghost Sight* (ability to see and hear the Ghost City, as well as being susceptible to Merging), *Observe* (uncanny skill that allows her to read people and get information about and out of them without conversing, works best when she's unseen, or in tandem with Guardian's Charm), and <span class="spoiler">*Voice*</span> (an ability that isn't obvious nor readily accessible at the start, <span class="spoiler">allows Mari to make people believe every word she says, sometimes making her words into reality</span>; really powerful in combination with Guardian’s <span class="spoiler">*Burn*</span>).
Mari ‘upgrades’ her skillset (seeing the Ghost City with and without her *Camera*, getting more skills from Guardian when *Merging*, <span class="spoiler">making *Voice* stronger and people obeying her every word instantly</span>) by talking to specific people in some areas, the amount of time spent *Merged* with Guardian in the Living versus the Ghost, taking more pictures with her *Camera* in both the Living and the Dying (which ‘upgrades’ for <span class="spoiler">Blackmail</span> on the Living and for <span class="spoiler">Information</span> on the Ghosts), and of course by Guardian deciding what relationship they would have with her (which leads to different ‘upgrades’ regarding *Observe* and <span class="spoiler">*Voice*</span> depending on whether it's the <span class="spoiler">Reborn</span>, <span class="spoiler">Parent</span>, <span class="spoiler">Mafia</span>, <span class="spoiler">Control</span> or the <span class="spoiler">Enlightenment routes</span>).

Guardian's ability set also consists of four main skills: *Drift/Merge* (ability to leave Mari’s body and interact with the Ghost City, as well as possess Mari’s body and pilot it), *Mimic* (skill that allows him to imitate voices and mannerisms of others), *Charm* (ability to effectively get people on their side and to get them to open up), and *Enlighten/<span class="spoiler">Burn</span>* (skill that’s rarely activated and not often used, <span class="spoiler">gets people to connect to the Light and have the Knowledge Burned into them</span>; used as an advanced *Charm*, gets people to religiously follow him and take his words and actions as gospel).
<span class="spoiler">Blanc</span> gets ‘upgrades’ based on his relationship with Mari, the types of Memories that were or weren’t recovered (no memories recovered leads to <span class="spoiler">Reborn</span>, <span class="spoiler">childhood and sister memories lead to Parent</span>, <span class="spoiler">protection ‘agency’ and running from law enforcement memories lead to Mafia</span>, <span class="spoiler">memories from his death and betrayals lead to Control</span>, and <span class="spoiler">memories of their accidental cult and revolution leads to Enlightenment</span>), also by the amount of favors owned from the Dying (including whether they were repaid or not).

**Player mechanics:** 

Played from a third person perspective, game allows the player to move in four directions, left and right (in regards to the screen, the character can move forwards and backwards), as well as up if a scalable wall is in place (or down, if able), if not, the character can jump or crouch. Mari’s basic moving mechanics are regaled to walking, slow jogging, jumping, slow climbing and creeping, while Guardian has walking, sprinting, floating (both through walls and off the ground), parkour style jumping, wire walking, and stalking. Neither character really has an advanced level of movement, though Mari can borrow Guardian’s floating and wirewalking, but the two can use Ghost Taxis and the Underground to move between the larger areas of the city if needed.
Base game mechanics are related to *Dialogue*, whether between Mari and Guardian, or either of the PCs and one of the denizens of the City. Other interaction mechanics are *Drifting*, where Guardian leaves Mari’s body to explore the Ghost City, *Memory Remembrance*, where Guardian can in certain areas view and play through part of his Life Before, *Photography*, where Mari can stop and take a photo that shows clues and overlapping Living and Ghost City, *Puzzle Solving*, which calls upon problem solving skills to open new passages for Mari or Guardian to go through, and *Merging*, where Mari and Guardian ‘merge’ for a limited time, allowing Mari to use some of Guardian’s skills or Guardian to speak to people from inside Mari’s body.
Besides the basic mechanics are related to the dialogue, where depending on how much Guardian remembers, <span class="spoiler">how many Favors people and ghosts owe you two</span>, <span class="spoiler">whether Blanc remembers his Cult or his Protection days</span>, as well as <span class="spoiler">whether Guardian decided to adopt Mari or not</span>, Mari and Guardian can use *Convince/Charm/Enlighten* on people to get results they wouldn’t be able to in different runs of the game.

**Level design:**

all levels are ‘hand made’, the game is linear but the player chooses which parts of the line they do first, the obstacles are mostly seen as dead ends/missing pieces, where the player has to either solve a puzzle somewhere to overcome it, or get a different route opened through gameplay.
as Mari, the player can climb walls if they have support (are made of brick or have vines/shrubbery growing on it), and can climb over fences. As <span class="spoiler">Blanc</span>, the player can drift through most walls if they don’t exist in the Ghost City or in the Memories
Center ‘levels’ are urban, somewhat claustrophobic, pretty dark with lots of artificial lights
Suburbia levels are semi-urban, consisting of houses and the creek, pretty light but not bright
Fences levels are decollete, seen as the most natural, but are full of urban ‘junk’, the most open of the three, most bright but it’s still a dusk feel
the design of the world changes throughout gameplay, both depending on what version of the City is played and on player choices throughout the game
every version of the City in every level seems drawn (blended oil paintings for Living, sketched and inked watercolors for Ghost, messy oil pastels for Memory)

**Look and feel - references and inspiration:**

Some of the inspirations for the story of the game come from the movies “Poor Things” (2023) (the question of self, existentialism, as well as some of the style choices), “The Truman Show” (1998) but especially the ideas for the sequel of the movie (the story of the Producers and the existential dread), and “Dogman” (2023) (the building of the myth of the Dogman, his backstory and methods), as well as the show “Legion” (2017-2019) (again, the questions of self, making of reality, questioning and building control, descent into madness and cult, also the psychological and existential horror elements, as well as the style of the series). Books that inspired this game are “More than This” by Patrick Ness, “Epic” by Conor Kostick, “Neverwhere” by Niel Gaiman, “Shades of Magic” trilogy by V.E. Schwab, “Toilet-bound Hanako-kun” (yes, the manga), and the collection of stories about belief from around the world found on the internet.`
          },
          { type: 'bubble', content: 'Moodboard' },
          {
            type: 'grid',
            urls: [
              'Her Guardian/Moodboard 1.png',
              'Her Guardian/Moodboard 2.png',
              'Her Guardian/Moodboard 3.png',
              'Her Guardian/Moodboard 4.png'
            ],
            caption: 'Moodboard for the atmosphere and visual style of Her Guardian'
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '12/04/2024 – 19/04/2024' },
          { label: 'Role', value: 'Writer, Game Designer, Concept Artist, Illustrator' }
        ]
      },
    ]
  },
  {
    id: 'storyboards',
    title: 'Storyboards & Animatics',
    works: [
      {
        id: 'm1',
        title: 'The Game',
        category: 'Storyboards & Animatics',
        description: 'A storyboard and animatic about the choices we can make in the game called life',
        imageUrl: 'The Game/The Game - Poster.png',
        longDescription: 'Project for the author\'s Bachelor Thesis titled "The Use of Cuts and Transitions in Film Narrative as shown in the personal story \'The Game\'". \n\nBased on a short story from the same author, "[Tišina](work:ph6)", a storyboard and a rough animatic depicting the visual change of taking control over your own life in a world where everyone\'s focus is on themselves.',
        media: [
          { type: 'video', url: 'The Game/The Game.mp4', caption: 'The Game.mp4' },
          { type: 'text', content: 'We are all players, in a game where nobody knows the rules' },
          { type: 'image', url: 'The Game/The Game - Poster.png', caption: 'First poster design for the story' },
          { type: 'bubble', content: 'Environment and character concepts' },
          { type: 'image', url: 'The Game/Locations - Table.png', caption: 'Initial concept art for the above table scene' },
          { type: 'image', url: 'The Game/Locations - Ingame City.png', caption: 'Initial concept art for the ingame city scene' },
          { type: 'image', url: 'The Game/Main characters design.png', caption: 'Character design concepts for the main characters' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '27/09/2024 - 27/02/2026' },
          { label: 'Role', value: 'Writer, Script Writer, Director, Video Editor, Storyboard Artist' },
          { label: 'Tools', value: 'Autodesk Sketchbook Pro and Magix Vegas Pro' }
        ]
      },
      {
        id: 'm2',
        title: 'Unsigned Goodbye',
        category: 'Storyboards & Animatics',
        description: 'A storyboard of a story related to loving one long lost to you',
        imageUrl: 'Unsigned Goodbye/Unsigned Goodbye - Poster.png',
        longDescription: `"Sometimes, the unsaid farewells are the hardest to let go of"\n\nShort personal story made solely as a storyboard, inspired by all the stories that ended not because there wasn't enough love, but because sometimes the love from another isn't enough to replace the lack of love one has for themselves. The storyboard shows how such an ending can haunt someone even decades after its final word.`,
        media: [
          { type: 'image', url: 'Unsigned Goodbye/Unsigned Goodbye - Poster.png', caption: 'Poster for Unsigned Goodbye' },
          { type: 'pdf', url: 'Unsigned Goodbye/Unsigned Goodbye Storyboard Teaser.pdf', caption: 'Storyboards for a Teaser Trailer of Unsigned Goodbye' },
          { type: 'pdf', url: 'Unsigned Goodbye/Unsigned Goodbye Storyboard Main.pdf', caption: 'Storyboards for the full Unsigned Goodbye' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '05/11/2023 - 19/11/2023' },
          { label: 'Role', value: 'Writer, Concept Artist and Illustrator, Storyboard Artist' },
          { label: 'Tools', value: 'Autodesk Sketchbook Pro' }
        ]
      },
      {
        id: 'm3',
        title: 'Poltergeist',
        category: 'Storyboards & Animatics',
        description: 'An animatic project group based on a pre-existing script',
        imageUrl: 'Poltergeist/e3944cf7-e4c4-42b8-aa25-6f05fe750455.png',
        longDescription: 'A group project based on a pre-existing script titled "Poltergeist", where we were given creative freedom regarding the composition and the pacing of the story while keeping true to the original plot and story beats.',
        media: [
          { type: 'image', url: 'Poltergeist/e3944cf7-e4c4-42b8-aa25-6f05fe750455.png', caption: 'Poltergeist cover frame' },
          { type: 'bubble', content: 'Selected storyboard and animatic frames' },
          {
            type: 'grid',
            urls: [
              'Poltergeist/1.png',
              'Poltergeist/2.png',
              'Poltergeist/3.png',
              'Poltergeist/4.png'
            ]
          },
          {
            type: 'grid',
            urls: [
              'Poltergeist/5.png',
              'Poltergeist/6.png',
              'Poltergeist/7.png',
              'Poltergeist/8.png'
            ]
          },
          {
            type: 'grid',
            urls: [
              'Poltergeist/9.png',
              'Poltergeist/10.png',
              'Poltergeist/11.png',
              'Poltergeist/12.png'
            ]
          },
          {
            type: 'grid',
            urls: [
              'Poltergeist/13.png',
              'Poltergeist/14.png',
              'Poltergeist/15.png',
              'Poltergeist/83058d70-7252-4bdc-a58d-a9f3c7de7792.png'
            ]
          },
          { type: 'image', url: 'Poltergeist/b4cba9ae-45c3-4358-bdbf-f21f2284dc96.png', caption: 'Additional Poltergeist storyboard frame' }
        ],
        details: [
          { label: 'Type', value: 'Group Project (3 members)' },
          { label: 'Duration', value: '19/11/2023 - 12/01/2024' },
          { label: 'Role', value: 'Lead Creative, Concept Artist, Character Designer, Environment Designer, Storyboard Artist, Timer' },
          { label: 'Tools', value: 'Autodesk Sketchbook Pro, Adobe AfterEffects' }
        ]
      },
      {
        id: 'm4',
        title: 'General Atlas',
        category: 'Storyboards & Animatics',
        description: 'A series of animatics giving depth to the short story General Atlas',
        imageUrl: 'Animatics/Atlas.png',
        longDescription: 'After writing the original short story, [General Atlas](work:ph5), the inspiration to give depth to its world stayed and so a few shorter animatics set in the world have been made. It is currently an unfinished project but it might get two more animatics.',
        media: [
          { type: 'video', url: 'Animatics/General Atlas - Kindness.mp4', caption: "A view into the General's mentality during the final battle not shown in the original written work" },
          { type: 'video', url: 'Animatics/General Atlas - Beginning .mp4', caption: "The scene from before the start of the War, shows the General's origin and the dynamic between the General and her Her before the War" }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '02/12/2025 - 06/12/2025' },
          { label: 'Status', value: 'Unfinished' },
          { label: 'Role', value: 'Writer, Artist' }
        ]
      }
    ]
  }
]);

export const MISCELLANEOUS: Category[] = sortCategoriesByNewest([
  {
    id: 'three-d-works',
    title: '3D Works',
    works: [
      {
        id: 'w1',
        title: 'ser Birb',
        category: '3D Works',
        description: 'A digital sculpting project for 3D printing',
        imageUrl: 'ser Birb/Screenshot 2024-06-03 165611.png',
        longDescription: 'A character design and 3D sculpting project, made for 3D printing as a standing figuring. Theme was "Anthropomorphic design and sculpture", made as a Crow Kenku Paladin',
        media: [
          { type: 'video', url: 'ser Birb/Birb.mp4', caption: 'Final sculpt turnaround' },
          { type: 'image', url: 'ser Birb/Screenshot 2026-03-20 221153.jpg', caption: 'Moodboard for the character design' },
          {
            type: 'grid',
            urls: [
              'ser Birb/Ser Birb.jpg',
              'ser Birb/Biird.jpg'
            ],
            caption: 'Character and final pose concept art'
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '29/03/2024 - 01/06/2024' },
          { label: 'Role', value: 'Concept Artist, Character Designer, 3D Modeller, 3D Sculptor' },
          { label: 'Tools', value: 'Autodesk Sketchbook Pro, ZBrush' }
        ]
      },
      {
        id: 'w2',
        title: 'Cultural Monuments: Now and Then',
        category: '3D Works',
        description: 'A short form video showing a cultural monument now and then',
        imageUrl: 'Cultural Monuments/Profile.jpg',
        longDescription: 'A shortform research turned video project, with a focus on showing a cultural monument of the city as it was and as it is. Additional focus on photogrammetry on the original scene, a few 3D effects and elements added in post, as well as actual editing of the video',
        media: [
          { type: 'video', url: 'Cultural Monuments/Final Video of the Project.mp4', caption: 'Finished product of the project' },
          {
            type: 'grid',
            urls: [
              'Cultural Monuments/Before.jpg',
              'Cultural Monuments/Now.jpg'
            ],
            caption: 'Reference photos of the monument from 1941 and 1980'
          },
          { type: 'image', url: 'Cultural Monuments/Moodboard.jpg', caption: 'Moodboard for the project' },
          { type: 'image', url: 'Cultural Monuments/Storyboard.jpg', caption: 'Initial storyboard of the project' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '24/08/2025 - 10/10/2025' },
          { label: 'Role', value: 'Researcher, Storyboard Artist, Camera Operator, 3D Animator, Video Editor' },
          { label: 'Tools', value: 'DaVinci Resolve, Blender, 3DF Zephyr' }
        ]
      },
      {
        id: 'w3',
        title: 'Cardboard Box Sim',
        category: '3D Works',
        description: 'A 3D animated simulation with digital physics',
        imageUrl: 'Box/Render0339.jpg',
        longDescription: 'A part of a larger animation project, where 60 animators animated a ball drop and connected it in a continuous loop. Mine was the starting animation, with all models and parameters set by me, with the same already established ball enter and exit time given to every animator.',
        media: [
          { type: 'video', url: 'Box/AI_1_2021_Teodora_Jovanović_SVE_PPZ.mp4', caption: 'My part of the bigger project' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project (part of a collective)' },
          { label: 'Duration', value: '23/03/2024 - 07/04/2024' },
          { label: 'Role', value: 'Designer, 3D Modeller, Texture Artist, Animator' },
          { label: 'Tools', value: 'Autodesk 3Ds Max, Adobe Substance Painter' }
        ]
      },
      {
        id: 'w4',
        title: 'Street Fishes',
        category: '3D Works',
        description: 'A short embedded animation project',
        imageUrl: 'Fishes/Fish.jpg',
        longDescription: 'A group project using 3D models and animation in a real world picture/background. The original idea and look were of my design, while the simulated animations were done by the rest of the group. The final compositing of the animation and models in the 3D space, along with the editing and combining the separately rendered elements into one video, was my doing.',
        media: [
          { type: 'video', url: 'Fishes/AI_1_2021_AI_13_2021_AI_36_2021_SVE_PP.mp4', caption: 'Final look of the project' }
        ],
        details: [
          { label: 'Type', value: 'Group Project (3 members)' },
          { label: 'Duration', value: '28/05/2024 - 12/06/2024' },
          { label: 'Role', value: 'Project Lead, 3D Compositor, Video Editor' },
          { label: 'Tools', value: 'Autodesk 3Ds Max, Adobe AfterEffects' }
        ]
      },
      {
        id: 'w5',
        title: 'LEGION: Scene Recreation',
        category: '3D Works',
        description: 'A shot for shot recreation of a chosen scene from show Legion',
        imageUrl: 'LEGION/Screenshot 2026-03-26 191630.jpg',
        longDescription: 'As a way to analyze and learn from already published work, this was a project with a goal of reverse engineering a live shot scene in 3D. Ended up doing a shot for shot analysis of the chosen scene and recreating it (without the detailed movement and animation), alongside additional editing with self-recorded voicework and sound effects.',
        media: [
          { type: 'video', url: 'LEGION/Legion Scene_ FInal Compare.mp4', caption: 'Comparison of the Original Scene from TV Show LEGION and the final rendition of the 3D recreation, with self-recorded and edited voiceover and sound effects' },
          { type: 'video', url: 'LEGION/LEGION_Scene.mp4', caption: 'Comparison of the initial length of the chosen scene and the 3D recreation, with the sound and voicework from the original source material' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '01/03/2024 - 17/05/2024' },
          { label: 'Role', value: '3D Blockout, Environment Design, Director, Video Editor, Voice Acting, Foley Artist, Sound Editor, Storyboard Artist' },
          { label: 'Tools', value: 'Unreal Engine 4.27, DaVinci Resolve' }
        ]
      },
      {
        id: 'w6',
        title: 'Character Animation Tests',
        category: '3D Works',
        description: 'Collection of 3D character animations done in Blender',
        imageUrl: 'Character Animation/CA.jpg',
        longDescription: "A collection of character animations I've done to familiarize myself with the then new-to-me software. The first two were classic animation projects and exercises testing my knowledge of animation principles in a new environment, while the final animation is me showing off a bit.",
        media: [
          {
            type: 'videoGrid',
            urls: [
              'Character Animation/AI_1_2021_Teodora_Jovanovic_AK_Govor.mp4',
              'Character Animation/AI_1_2021_Teodora_Jovanovic_AK_Govor_REF.mp4'
            ],
            caption: '3. Animation and original reference for a lip-sync and movement animation'
          },
          { type: 'video', url: 'Character Animation/AI_1_2021_Teodora_Jovanovic_AK_NLA.mp4', caption: '2. Non-linear animation of a walk cycle' },
          {
            type: 'videoGrid',
            urls: [
              'Character Animation/AI_1_2021_Teodora_Jovanović_AK_Dizanje.mp4',
              'Character Animation/AI_1_2021_Teodora_Jovanović_AK_Dizanje_REF.mp4'
            ],
            caption: '1. Animation and the original reference for "Picking up"'
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '06/12/2023 - 21/01/2024' },
          { label: 'Role', value: 'Animator' },
          { label: 'Tools', value: 'Blender' }
        ]
      }
    ]
  },
  {
    id: 'creative-misc',
    title: 'Creative Misc.',
    works: [
      {
        id: 'cm2',
        title: 'Taxi',
        category: 'Creative Misc.',
        description: 'A short comic about finding home.',
        imageUrl: 'Taxi/Taxi!.jpg',
        longDescription: 'A short comic made as a part of the short story series. Inspired by the urban myths in Japan regarding the lost souls and ghosts who rely on taxi drivers to take them home, with the bonus page comparing the culture behind those beliefs to the urban myths from New Orleans.',
        media: [
          { type: 'image', url: 'Taxi/pg 1.jpg', hideFooter: true },
          { type: 'image', url: 'Taxi/pg 2.jpg', hideFooter: true },
          { type: 'image', url: 'Taxi/pg 3.jpg', hideFooter: true },
          { type: 'image', url: 'Taxi/pg 4.jpg', hideFooter: true }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '18/08/2025 - 28/08/2025' },
          { label: 'Role', value: 'Writer, Artist' }
        ]
      },
      {
        id: 'cm3',
        title: 'Zvezda, Beg, Mir',
        category: 'Creative Misc.',
        description: 'A short comic about a Star, a Runaway, and the different perspectives of the same memory',
        imageUrl: 'San/San.jpg',
        longDescription: 'A short comic done as a part of the second short story series, with the theme being "Dreams". Inspiration stems from the often illogical nature of dreams and memories, and how a person\'s view of a real-life event often gets skewed by their emotions.',
        media: [
          { type: 'image', url: 'San/San pg 1.jpg', hideFooter: true },
          { type: 'image', url: 'San/San pg 2.jpg', hideFooter: true },
          { type: 'image', url: 'San/San pg 3.jpg', hideFooter: true },
          { type: 'image', url: 'San/San pg 4.jpg', hideFooter: true },
          { type: 'image', url: 'San/San pg 5.jpg', hideFooter: true },
          { type: 'image', url: 'San/San pg 6.jpg', hideFooter: true },
          { type: 'image', url: 'San/San pg 7.jpg', hideFooter: true }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '18/05/2026 - 27/05/2026' },
          { label: 'Role', value: 'Writer, Artist' }
        ]
      },
      {
        id: 'cm1',
        title: 'Mirror Optics',
        category: 'Creative Misc.',
        description: 'A short educational animation about the physics of mirrors',
        imageUrl: 'Optics/AI_1_2021_Teodora_Jovanović_BIO_PP.mp4',
        longDescription: 'A hand-drawn stickman animation detailing the physics of regular and round mirrors, while showing the logic behind such physics in a simple and educational manner.',
        media: [
          { type: 'video', url: 'Optics/AI_1_2021_Teodora_Jovanović_BIO_PP.mp4', caption: 'Full Mirror Optics animation' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '08/09/2025 - 11/09/2025' },
          { label: 'Role', value: 'Animator' },
          { label: 'Tools', value: 'Autodesk Sketchbook Pro' }
        ]
      },
      {
        id: 'cm4',
        title: 'Animatic Trends',
        category: 'Creative Misc.',
        description: 'A few animatics based on art trends from the time',
        imageUrl: 'Animatics/King.png',
        longDescription: "As a challenge, I've tried to do a few art animatic trends with me as the center focus of them. Ended up picking the Sienna and Soldier, Poet, King trends and have done these two videos on the topic.",
        media: [
          { type: 'video', url: 'Animatics/Sienna trend.mp4', caption: "Oh Sienna trend - showing the favorite characters of the artist, mine being Kim Dokja from Omniscient Reader's Viewpoint, Technoblade from Minecraft SMPs, Midoriya Izuku from My Hero Academia, Percy Jackson from the Rick Riordan books, and Din Djarin from The Mandalorian" },
          { type: 'video', url: 'Animatics/Soldier, Poet, King trend.mp4', caption: 'Trend from the Soldier, Poet, King by The Oh Hellos song - shows which of the three archetypes the artist fits most regardless of personal preference' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '30/11/2025 - 01/12/2025' },
          { label: 'Role', value: 'Artist' }
        ]
      },
      {
        id: 'cm5',
        title: 'Ko Vam Glumi Sonju Savić? Posters',
        category: 'Creative Misc.',
        description: 'A series of posters made based on the theatre play "Ko vam glumi Sonju Savić?"',
        imageUrl: 'Posters/A Koga Zanima Istina.jpg',
        longDescription: 'After seeing the play live, I was inspired to make a series of posters and illustrations based on the moments within the show that had the most emotional impact to me. Using the quotes from the play, I took inspiration from the very messy punk style of posters that I believe encapsulated the emotions held within the show.',
        media: [
          { type: 'image', url: 'Posters/A Koga Zanima Istina.jpg', caption: 'A Koga Zanima Istina!! - Main and first poster of the series, based on the main theme of the show' },
          { type: 'image', url: 'Posters/Klekni!Poljubi!Ubi!.jpg', caption: 'Klekni! Poljubi! Ubi! - Second piece of the series' },
          { type: 'image', url: 'Posters/Hvala.jpg', caption: 'Hvala - Third piece of the series, based on the middle part of the show where one of the performers was actively pouring water down his throat while thanking everyone for their contributions to the play' },
          { type: 'image', url: 'Posters/umro je sam.jpg', caption: 'umro je sam - Fourth piece of the series' },
          { type: 'image', url: 'Posters/Njegova priča.jpg', caption: 'Njegova priča - Final piece of the series, based on the very ending of the show, showing the state of the theatre industry and how it treats its performers' }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Duration', value: '09/12/2023 - 17/12/2023' },
          { label: 'Role', value: 'Designer, Artist' }
        ]
      }
    ]
  },
  {
    id: 'writing',
    title: 'Writing',
    works: [
      {
        id: 'ph1',
        title: 'Ogledalo Stanja',
        category: 'Writing',
        description: "A short story about a character's mental and emotional state",
        imageUrl: 'Written Works/Voda.jpg',
        longDescription: "First of the themed short stories.\nThe week's theme: Element (Water)\nA short story about how ones mental and emotional state can be as ever changing as the different states of water",
        media: [
          {
            type: 'markdown',
            content: `Držala sam je u šaci, ne odvajajući pogled od površi unutar nje. Kondenzacija je krenula da se stvara na obodima, kapi žudeći za delom celine kojoj su obećani. Mahinalno ih brišem polu nesvesnim pokretima palca na ivici čaše. I dalje ne dižem pogled sa tečnosti unutar nje. Niko me ne pita zašto, mada ne verujem da bi ih i zanimalo. Većinu više zanima njihovo mišljenje, i da se moje poklapa. Čak i da bi me iko pitao, ne znam šta bi mu rekla. Nemam specifičan razlog. Samo gledam u sebe.

Pogled mi ne luta, ali i bez njega ih mogu osetiti. Miris letnjeg sunca koji preplavljuje, koji obuhvata i zarobljava. Toplina njihovih osmeha, koja nesvesnim pokretima može spržiti i uništiti. Pogled koji greje i štiti, i koji nikad tom nežnošću ne bi zalutao u mom pravcu.

Sedim na obodu tog svetla, nikad deo njega, ali dovoljno blizu da nalikujem, da dobijem užitak u njegovim refrakcijma. Te devojke predstavljaju u svakom slučaj sastavni akt scene u kojoj se nalazimo. Sama sam dodelila sebi ulogu statiste, zamene za sve uloge koje im zafale, pozadina koja je tu konstanta ali u neprekidnom fluksu. Navikla sam na tu ulogu.

“-- znam ali to je tako očigledno. Šta ti misliš?”

Trzam se u mestu. Njihov pogled je uperen ka meni. Svetlo umesto da prelama se usmerava. Prema meni.

Želim da pobegnem, da nestanem, da se istopim sa mog mesta i da me more proguta.

Ali ne uspevam.

Para kreće da mi bode oči. Ruke mi se koče, početak grča, početak- Zvuk nalik lomljenju stakla kreće da mi para uši, sporo krckanje i mrvljenje hiljada majušnih kristala, dolazi od svuda, prekriva sve ostale zvuke, naglo ih sve preklopi, razarajući moje misli, dok ono nastavlja da lomi, i ruši, i-
Krv u mojim venama, moj konstantan saputnik i metronom, se ledi. Ledi i kreće da prekriva ne samo moj krvotok. Nego i sve organe. Sve misli. Sve emocije. Sve, što čini mene.

Izdišem, moj dah para, otvaram oči, uperene na njih.

Ionako ih ne zanima stvarno šta mislim.

“Nisam razmišljala o tome.”

Taj hladna reč seče kroz vazduh, sušta suprotnost žaru kome odgovara.
Devojke sležu ramenima, i okreću se nazad jedna drugoj, svetlo zajedno sa njima.

Kristali iz kojih se glas jedva pročuo su teški, rigorozniji nego kapljice koje su zamenile, ali su čvršće. I to je bilo najbitnije. Glava dole, teška zbog oklopa, opet gleda u čašu, sama sebi u dušu. Piće i dalje predstavlja ogledalo. Krenulo da se talasa pri obodima, ali opstaje dovoljno mirno da se i dalje vidim u njemu.

Disanje postaje bolno, unutar kristala. Konstantno lomljenje, zarastanje, i ponovno lomljenje. Odstranjene iglice probadaju krila pluća pri svakom pokretu. 

A pokreta je malo. 

Kristalni oklop ne dopušta mnogo, dovoljno da budem zaštićena od pogleda i napada. Ali ne dovoljno da budem. Postajem nepokretna, kapi kondenzacije na čaši postaju isto - zaleđene u trenutku poraza.

Glas odjekuje unutar oklopa. Ne samo moj, koji ne koristim, nego i tuđi, glasovi koji dolaze od svetla, koji se prelamaju kroz strukturu leda kao njihov izvor. Ne želim da obraćam pažnju na njih, na njihove emocije, mišljenja, očekivanja, ali oni dopiru do mene. Eko reči koje nisam trebala čuti razara tišinu mog daha, kao brod kroz mirne talase.

“Razmažena”, “privilegovana”, “baš misli da je bolja od nas”, “hladna”, “oštra”, “hladna”, “hladna”, “hladna”-

Nešto krhko je prslo. Ramena postaju teža. Vazduh ređi. Pokušavam da smirim svoj lik u tečnosti. Težina kristala počinje da guši. Oslanjam se na crno kada belo počinje da nailazi iz mene. Nešto u mojim grudima kreće da bubri. Više nisu igle u plućima, razmišljam, dok led drži krila otvorena, ne bi li taj vazduh, sad hladan, umirio vrelinu. Šake se lede, oklop nalik kamenu. Ogledalo u čaši nakrivljeno ali čvrsto. Oči otvorene, pogled miran, emocije pod kontrolom-

“- tako hladna, mislila sam da će te je se otarasiti do sad?”

Jači pucaj odzvanja kroz komoru kristala, raspršujući to krhko po podu dubina.

I eto ga opet. To bubrenje. Talasi kreću da kipe, kristali počinju da se tope, tišina kreće da vrišti, strpljenje isparava, moj oklop, moj led, moja kontrola, sve, sve, sve-
Talas me potapa. Ponirem. Pokušavam da se domognem toga, svega, nečega, bilo čega- 
Bezuspešno. Tonem. Svetlo situacije se preliva kroz talase svega iznad mene. Počinje da tinji. Što me dublje povlači to me više drži celom. Nema oklopa. Nema leda u venama, u plućima. Nema ničega.

Osećam pritisak, očekivanja, emocija, želja i snova. To me drži na okupu. Da li su moji? Da li su ikad bili ili će biti moji? Trenutno me drže. I dalje tonem. Više ne vidim prelamanje svetlosti.

Pogled i dalje usmeren ka površini, dopuštam da me eko vuče ka dole. Među plavim, tama preuzima kontrolu nad svim. Polako okružuje, prisvaja, uvlači se u svaki deo postojanja, dok na kraju i sam ne postaneš deo nje. Onda te pusti. I u tom trenutku, nisam jedna, nego deo svega. Srce više ne broji otkucaje kristalima, pluća šire krila, lebdim.

Dopuštam da postojim u tom trenutku gde ništa ne postoji.

Onda nailazi dno, pad nalik zagrljaju, dok talasi ne guše, nego miluju. Obgrljena, oslanjam se na crnilo, na lagani otkucaj koji odzvanja mojim bićem. Dno se uzarava u dlanove, rasparčan mozaik sećanja, snova emocija, zaseca i gradi reljef šaka. I to dopuštam. Koristim bol kao podsetnik.

Udah.

Voda se sliva kao kiša, oslobađajuće i vedro, ostavljajući samo miris petrihola i novih mogućnosti iza sebe. Pogled uperen u čašu, ogledalo u njoj ponovo mirno, ovaj put postavljeno na površ oko koje je postavljena scena. Zadnji izdah, ovaj put neprimetan. Aktori postavljeni. Glava je podignuta.

“Jesi li dobro?”

Svetlo ovaj put ne razara. Glas topline sa moje leve strane, njene oči ne žale, ne peku, samo brinu. Odgovaram joj osmehom, deliću sačuvane osvežavajuće emocije. Oči planu, osmeh ozari njeno lice, zvuk pucketanja plamena ispuni prostor u kom ja opet počinjem da ga sastavljam. To nešto, krhko, neukrotivo, od želja, snova i emocija, o kome se ja vidim. Na obodu čaše nema više leda, kapi kondenzacije isparile. Unutar nje se vidi njen osmeh. I ogled mog pogleda.`
          },
          {
            type: 'image',
            url: 'Written Works/Voda.jpg',
            caption: 'Ogledalo Stanja'
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project (First in a series)' },
          { label: 'Year', value: '2025' },
          { label: 'Role', value: 'Writer' }
        ]
      },
      {
        id: 'ph2',
        title: 'Zar niste čuli?',
        category: 'Writing',
        description: "A short horror story regarding the myth, the rumour and the truth about a girl's suffering",
        imageUrl: 'Written Works/Lil Red.png',
        longDescription: "Second of the themed short stories.\nThe week's theme: Fairytale Sequels and Prequels *(Little Red Riding Hood, Sequel)*\nA short erotic horror story about how the stories and rumours can become all there is to you as a person after you experience trauma",
        media: [
          {
            type: 'markdown',
            content: `**“Zar niste čuli? O maloj crvenog kaputa, koja vijori sredinom puta, koja po šumi hoda, meta vučjeg uhoda.”**

Škripa vrata neuspešno pokuša da odjekne, kroz prostor pun požude i pohlepe. 
Promaja ipak uspe da se provuče, njen zvuk utihnut koracima nečujnim među zidovima buke. 
Pod biva lepljiv blago, vazduh težak, stolovi puni nemara. 
Smeh odzvanja, puni zidove, kao zavijanje, sred vedre noći. 
Izdah nečujan, pružen korak, vetar prolazi između tela i zidova znoja i neuspeha.

**“Mala crvena, nevinog pogleda, šumi se rado preda, jer za nju vuka nema.”**

Kandže pružene, halapljive, vetru nepreče.
Piće teče, beli osmesi lažni, očnjaci stvarni.
Ćošak zida dva, vetru predah da.

**“Crven kaput vuku lepa stvar, ali osmeh male veliki kvar, progutati taj dar, i tako ga poslati u zaborav.”**

Izdah grohot upija, zavijanje još uvek odzvanja, jer u prostoru punom gladi, sit ništa ne radi.
Pogled zidove postavljene obara, tri para kljova prepozna.
Njihove glasove pod prihvata, priče iste lepi i zahvata.

**“A mala crvenih očnjaka progutana, iz utrobe mora biti isečena, iz crvenih kandži iskopana, bez smeha odtad zarobljena.”**

Ritam prstiju započinje, vetar ćoška pogleda prodora, trojica grohota prvu ispriča.
Svetlo ćošak ne dodiruje, ali do pogleda dopire, pogled koji prati, grimasu svake koja pati.
Vazduh kreće da se oštri, ali pušta zvuk da vri, svetlo da dotakne sve površi, kandži zlatnih kaveza da do plafona završi.
Prva priča nedovoljna, smeh režanja opet odzvanja, prosipajući više od priča i pića, znajući da će priča biti do svića.
Drugo režanje zube oštri, pogled se ne osvrće, tkanje zida vetar štiti, a lepršavo gorko kreće.



**“Znate valjda? O devojci krvnih usana, koja beži od preporuke boljih strana, koja upada u čeljusti pune greha, šumom ispunjenom mrtvog eha.”**

Ritmu nemom se koraci pridružuju, perju belog usnulog besa obasjaju, dok osmesi lepršavog gladne hrani, a njihove rane vetar ladi.
Glasovi odavno izgubljeni, tela šarenog pera tkanom neba, oči zatvorene pred gladnog gleda, pogledi halapljivo ljubljeni.
Koraci tkani, ples neodigrani, tela poleta, svetlom odneta.
Stolovi hordi blizu postavljeni, šape pružene, oči razarene, a lepršave ne dovoljno daleko stavljene.
Svetlo obasjava i hvata, ali ne smeta, kad rane kandže povuku, perja se ipak lako izvuku.

**“Devojka crna, u inat svoga druga, ne sluša znanja veka, za nju u šumi nema eha.”**

Perja laka, lepršava poneka pada, voda na usne para.
Pod lepljiv, plafon spreči, suzama reči.
Ritam brži, glas stola režanja, reči perja bez eha.

**“Krvne usne mame sad, u kuće dobrih baka tad, vučje glase samo čuje, za devojku više ne mož biti oluje.”**

Zida tiha dva, para genva se zadržava, izdah prati pogleda dva.
Zvuk znoja i tela guši, ali vetar njuške puši, pružene šape gura, daleko od perjinih tura.
Šarena perja ta, rane i plače neme, jer crnilu se ipak sve da.

**“U utrobi krvnih usna više nije, iz nje puštena devojka suze lije, šumom njen glas se još uvek vije, sad kao deo eha istorije.”**

Kandže tad pružene, meka grla crnilom obgoljena, grohot smeh priče dve, pod pićem i blavom lepe.
Šarena perja nikad više bela, u šapama ostala, stola prepuna, očnjacima podstakla.
Pogled vetra oštar, brižni, utehu ne može da priušti.
Zato pogled oštar ritmu brzinu pruži, pažnju i osmeh lepršavim očima nudi, slobodu u ćošku budi, od stolova daljinu posluži.
Treću priču grohot umesto pića gradi, lepršavim perjem sadi, prve dve uvod samo, za trojicu grehom opijeno. 



**“Zar priče videli? O ženi crvene glave, koja bori oči strave, koja nosi puške krvi pune, strepeći od ponovne bune.”**

Pogled svetla senki prodoran, tkanje majčine oči zidine izgrađene, vetar teških grudi, ritam trza.
Zidovi zlata se skupljaju, zavijanje stolova pokupljaju, osmesi greha pića i požude, kandže zidovima nude.
Strah leprša, tkane oči brigu pruže, grohoti belo perje okruže, vetar se o metal ruši.
Svetlo pogled tkanju uputi, dva zida zaštitu postave, pogledi jednom drugom ranu lade, perje lebdi preletenoj ruti.
Plafon kavezu visinu više ne donosi, jer kandže šape na dole pruže, lepršave u visine odlaze, dok svetlo pažnju režanju na dole nosi.

**“Žena klonula, u senkama šuma se sklonila, šapat režanja za nju mora, žrtva vučjeg ora.”**

Prosuto piće po stolu, očnjaka manje, ritam nalik kolu.
Zlatni kavez riđa, pod pušta perja iz vazduha skinuta, ples zidova znoja i tela usporava.
Mek pamuk preko prstiju, usne pune bola se sosmehuju, pogled svetlu daruju.

**“Crvene glave vučje senke mami, puške njene zaboravi, jer žena u mraku boravi, kiselinu utrobe nikad ne ostavi.”**

Tkanje preko glava pasa, ritam staje, lepršave domogle se spasa.
Zidovi greha i smeha, bili teški, a sada ostali i bez eha.
Vetar put devojke vodi, od pogleda pamuk ih sklanja, zajedno s perjem ka slobodi.

**“O buni kiselih laži, ženo kaži, jedino šuma takve stvari traži, u njoj i ostani senkama zaostani, preko ramena čuj, reži, na tlu svoje prve borbe ostani.”**

Zadnja priča trojicu budi, nemost prostora još ne slute, strah od svetla još se ne da znati, kad okružen čoporom on ne pati.
Zvuk im još ostao, taj grohot smeh, i dok se sklapa perje, izdah skoro nestao.
Tkanje čošku se vrati, trojici neprimetni, vetru smeh povrati, zaslužen metal postavi.
Halapljivost ne prestaje, dok ritam metal postaje, tri smeha očnjaka i požude, vetru cilj tišine nude.
Perje vetru pomoć sad pruži, drugčiju priču trojici, za koju zida dva nude odjeka, trojici novo znanje ostaje zaveka.
	


*‘Ali čuli niste, o maloj koju je stariji stavio na nivo njemu iste.’*

Šuštanje perje vazduha, skljanjajući bogastvo stola.

*‘Ali znate valjda, o devojci koju zbog izbora ostavljena na dar.’*

Šapat tela zida, gušeći mljackanje režanja posledica.

*‘Ali priče videli, o ženi koju zbog nesreće iz svih života prognali.’*

Šum tkanja oka, otkrivajući samoću ostatka čopora.

*‘Zadnje ali, niste razumeli, jer njega čudovište crnog krvnog kaputa brani, jer ono lovi vukove bez obmane.’* 

Zadnji sto, sto trojice.
Nelagoda režanja, praznih pića.
Očnjaka para tri, grohot smeh nanosi, pa zar čudovište, njih da odnosi.



Tišina vetra zidove napokon poji, stolica odgurnuta, nemi izdasi, glasni koraci.




*‘Zar čuli niste? Maloj kandže porasle.’*

Korak, krzno po podu, crveno mu ostavlja.

Kandže male stolove prelaze, grohote mute, ritmove nove stvara, poglede ne vara. 



*‘Valjda znate? Devojci ehom rane odgovorile.’*

Korak, lepršave osmeh pružile, belim crno okružile.

Usne rana krvne očnjake trojici nude, perju sklone, crne šape lome, puškom u naručju spremne da dune. 




*‘Videli priče zar? Ženi tuđe krvi veksle.’*

 Korak, krznena kapa, otvorena vrata.

Zadnji pogled svetlo miluje, oči brige vetrom kliču, novčići u kaputu zveckaju, oštrim osmehom dalje putuje. 




Vetrom prolazi kroz drveće, nove male štititće, krvi ostavile i pojile, vukove same lovile.

Vrata zatvorena, osmesi lepršavi sad, nigde nema glad.

Bar dok je podu još vučja krv dar.`
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project (Second in a series)' },
          { label: 'Year', value: '2025' },
          { label: 'Role', value: 'Writer' }
        ]
      },
      {
        id: 'ph3',
        title: 'Izložba razgovora',
        category: 'Writing',
        description: 'A short story and comic about conversations and overlooked happenings',
        imageUrl: 'Written Works/Razgovor 02.jpg',
        longDescription: "Third of the themed short stories.\nThe week's theme: Overheard conversations *(Five conversations and a painting - in comic)*\nA short story and comic about how us being so focused on our own lives and conversations can lead us to not seeing the most important things happening in the background",
        media: [
          {
            type: 'markdown',
            content: `"-ne mogu da verujem da sam stigla na vreme a vi ste svi tu-"
"-JA ne mogu da verujem da sam stigla na vreme-"
"-JA ne mogu da verujem da sam stigao uopšte-"

Dve kamere ispred ulaza.
Jedna radi, gleda od ulaza prema ulici.
*(Beskorisno, jer stražari bi mogli to da vide i bez kamera kada bi samo podigli glave. Nikad ne dižu glave)*
Druga ne radi, okrenuta ka parku.
*(Korisno za mene, ali ko sam ja da to kažem)*
Grupa ispred ulaza glasno priča o tome ko je kad stigao.
*(Prijatelji, još uvek tinejdžeri, zadnjem koji je prozborio se sviđa prva, prvoj se sviđa druga, druga ništa ne vidi-. Ali koga briga)*
Grupa se i dalje raspravlja.
Spuštam kačket niže na čelo, i ulazim.

—

"-da baš moramo da čekamo-"
"-a zašto svi baš izlaze u sredu?-"
"-pa valjda tako sreda, sredina nedelje pa da proslave-"
"-ali zašto baš sreda?-"

Galerija se sastoji od tri prostorije.
Sama izložba je u onoj sa staklenim krovom.
*(Užasna odluka, naročito jer se sastoji od tempera na platnu i mastila na tkanini. Ali ja ne postavljam izložbu)*
Tri kamere u svakoj prostoriji.
*(Svih devet radi. Da li rade dobro? Nikad)*
Jedna u prostoriji sa staklenim krovom je uperena na najveće delo na platnu.
*(Samo jedna i ima pogled na to platno. Loša odluka)*
Dvoje se svađaju o gužvi ispred toaleta.
*(Prijatelji, partneri, brat i sestra? Ne znam, mada me i ne zanima)*
Ja gledam izdignut stakleni plafon.

—

"-a, nešto baš letiš danas-"
"-stavili te da baš plešeš-"
"*gorak smeh*"

Galerija unajmljuje tri čistačice.
Jedna za svaku prostoriju u galeriji.
*(Efikasno, naročito za stalna dela. Da one stvarno to rade)*
Svake večeri sve tri dođu, isprepiru se, i odluče koja to veče radi.
*(Neefikasno, ali ljudski. Zadnjih pet noći uvek ona najniža bude ostavljena da radi)*
Dve uvek ostanu u jednoj od prostorija stalne instalacije.
*(Uvek su previše glasne, i uvek zapričaju i čuvare i sebe. Najniža nikad na diže pogled)*
Prašina na obodu pre stakla nije bila dodirnuta zadnje dve godine.
*(Imam sreće što nemam alergiju od prašine)*
Čistatice u drugoj prostoriji, od smeha se ne čuje moj skok.

—

"-da ne želim da pričam sa vama, da nisam takav čovek, da ovo nije takva situacija-"
"-da, da-"

Svih devet snimaka osvetljava mračnu prostoriju.
Dva čuvara sede, na nezvaničnoj pauzi.
*(Treba da ih bude troje. Ali treći je na ‘puš pauzi’ zadnja tri sata. Tako da ih je samo dvoje)*
Jedan jede i ne prestaje da priča.
*(Gleda u prazno ili u koleginicu. Previše priča o glupim temama)*
Druga pije kafu i pretvara se da ga sluša.
*(Gleda u telefon, nisko osvetljenje zbog ekrana. Ne ume dobro da se pretvara)*
Jedna kamera u staklenoj prostoriji redovno prekida.
*(Treba da je zamene, ali pre toga da primete da prekida. Nikad ne primete)*
Slika se lako skida sa zida, a uz zid se lako može uspentrati.

—

"-misliš da ima nekog smisla?-"
"-pa mislim, mora-"
"-kakvog j***nog smisla misliš da OVO-"
"-pa trenutno stanje u društvu?-"

Svetlo u prostoriji sa staklenim krovom je već izbledelo par dela.
Petak je, iznenađujuće prazno.
*(Ne zanima me zašto, ali zanimljiva kontrast u odnosu na sredu. Možda zato što ljudi nemaju šta da slave)*
Ispred velikog zida ispod prozora na staklenom krovom stoje dvojica i raspravljaju se.
*(Pokušavaju da shvate značenja dela. Veoma je abstrakna izložba, priznajem)*
Smešim se drugim delima, a naročito zidu.
*(Nazivi su veoma čudni. Čudno napisani na samom platnu, i još čudnije dati delima. Boli da priznam da sam pet minuta gledao u jedan naziv dok nisam odustao i pogledao tablicu sa opisom)*
Uputim zadnji osmeh zidu, dvojici čuvara i izlazim iz galerije.
Dvojica se i dalje raspravlja, ispred praznog zida sa jednom tablicom, u prostoriji sa staklenim krovom.


"-... ja i dalje ne razumem-”`
          },
          {
            type: 'image',
            url: 'Written Works/Razgovor 01.jpg',
            caption: 'Razgovor 01'
          },
          {
            type: 'image',
            url: 'Written Works/Razgovor 02.jpg',
            caption: 'Razgovor 02'
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project (Third in a series)' },
          { label: 'Year', value: '2025' },
          { label: 'Role', value: 'Writer' }
        ]
      },
      {
        id: 'ph5',
        title: 'General Atlas',
        category: 'Writing',
        description: "A short story about a general's last day on the battlefield",
        imageUrl: createTextCover('General Atlas', 'Short story'),
        longDescription: "An emotional and intimate short story about what one would do with the weight of an entire country's worth of belief and expectation on their shoulders, and with the one person they care the most for being just out of reach. Using the symbolizing of Titans and Atlas, to show the last day on the battlefield of a glorious general",
        media: [
          {
            type: 'markdown',
            content: `„Život nije sastavljen od samo pobeda i poraza, on je pun disanja i gledanja i slušanja i dodira i ljubavi i prijateljstva i običnog života“

Bačen pogled pun žudnje na velelepno prostranstvo puno utihnulog života uz gotovo nečujno šuštanje voljenih glasova, punih uspomena i jučerašnje slobode, je verovatno, i će verovatno biti, moja najbolja i zadnja lična odluka. Pažljivo udahnuta duša zelenila je počela da se širi u zategnutim i naizgled sve manjim i manjim plućima, dok se pogled lagano gubio iza tankih kapaka, koji su pokušavali da urežu taj poslednji prizor u moje samo biće, ne bili taj zadnji dah, taj zadnji trenutak trajao večno, bar u mojim snovima, u mojim mislima.

Šuštanje i pomeranje lišća iza mene je bio dovoljan znak da mi se ona približava, jer bi samo ona otežala svoje nečujne, lagane *(neprirodne, naučene, primorane, zarad slobode, zarad preživljavanja –)* korake samo nekoliko metara od mog trenutnog položaja. Dala sam sebi još tih par sekundi, par večnosti, toliko dugačkih, toliko kratkih, ali ipak dovoljnih, da se potrudim da zadržim, da potpuno prisvojim taj trenutak, da bude zauvek moj, pre nego što otvorim oči, potpuno prihvatim svoju budućnost, svoje postojanje, svoj moguć kraj u beskrajnoj vici i krvi i borbi. Njen dodir je bio toliko prolazan, pažljiv, poput vetra koji donosi i obećava, koji žudi za više trenutaka, dodira, smeha, toplote, koji priznaje hladnoću, dim i odzvanjajuću tišinu preda mnom, pred njima. Htela sam da pružim sebi to uživanje, taj kratak i skoro neprimetan spoj mojih svetova, željenog sna i neizbežne sudbine, stvarno sam htela ali uz zadnji dah, uz taj zadnji pozdrav, moje oči su bile otvorene, a ja daleko od tog trenutka, od njenog toplog dodira, od njenog zabrinutog ali odlučnog pogleda koji je bio zaleđen u mislima, u sećanjima, dok su njene oči bile okrenute ka horizontu. Nisam mogla da odolim *(zadnja šansa, to mi je bila zadnja šansa da budem sa njom da joj uzvratim –)*, polako sam joj dala svoje želje, svoje snove, da mi čuva, da ih ona odživi, dajem joj sve u jednom još kraćem dodiru, još manjem povetarcu, pre nego što sam se skroz zatvorila i krenula da koračam nazad, oklop na mojim leđima, prsima, ramenima, još teži, moj mač i nož na kukovima, još umarajući, kao Atlas, čije nebo je bilo puno obećanja, njegova i tuđa, nemoguća i neostvarena. Atlas, čiji um je odlutao tokom godina, vekova provedenih pod tim teretom, čiji život je nastavio napred, čije telo je već oduzelo toliko života, daha, snova, da krv na njegovom *(njenom, samo njenom, molim te, dopusti mi da sama nosim taj teret, da oni ne moraju, da ona ostane čistog i nevinog dodira, molim te –)* maču biva skoro nevidljiva, skroz ista kao i sama utopljena oštrica koja ne prestaje da kaplje, da oplakuje, da oduzima, i oduzima, i oduzima...

Zvuk. Plač. Zašto neko plače? Zašto bi bilo ko drugi plakao nad njegovom *(njenom, samo i zauvek njenom)* žrtvom, na njegovim teretom?

Udah. Njen osmeh. Njihove šale. Toplota, toplota, vrućina, opekotina, bol –
I Atlas se vratio, miris krvi punio njena pluća, njeno biće. Naglo okretanje glave, neprekidajući pogled, neusaglašeno disanje *(brzo, prebrzo, gde je vazduh, dah, daj mi kiseonik –)*, i odjednom ona.

Prekid vremena. Zaustavljen tok misli. Prazan pogled. Poraz. Ovo je poraz. 

Gubitak svega.

Gubitak smeha, sreće, snova, života, postojanja, misli, nisam joj priznala, nisam joj rekla –

„Pobedili ste generale.“

Prekid. Nema daha, izbačen, zamenjen krvlju, porazom, prazninom, njom, njom, njom – 

I on je tu.

„Nadam se da je ovo bilo vredno svega.“

Oči crvene *(od plakanja, krvi, mržnje, ne znam, ne znam, ne znam)* uperene u mene, toliko drugačije od njenih nežnih, od njenih sivih. Atlas je gledao u svog brata, u drugog titana koji je držao i pokleknuo pod svojim nebom, i Atlas je razumeo, prihvatio i žalio nad izgubljenim.

„Šta se dešava posle ovog?“

Čiji je to glas? Bio je grub, previše hladan, uplašen, zbunjen –

„Sada? To je tvoj izbor generale.“

Hladan, toliko hladan, njegov titan je odgovorio mom *(moj glas, ono je bio moj glas, zašto je bio moj –)*.

„Aa.“

Plač je nastavio da odzvanja nad napuštenim morem snova, ostavljenih ali nezaboravljenih duša *(nikad zaboravljene, nikad, nikad –)* 

Zadnji pravi pogled, zadnji zvuk, zadnja suza.

Osmeh, toplota, dah, vetar, ona, ona, ona –

Oči bivaju otvorene, vetar topao, njen dodir na meni, njihove šale oko vatre, zadnja suza i ja bivam slobodna.

Atlas sklapa oči i pušta nebo da ga prisvoji.`
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Year', value: '2021' },
          { label: 'Role', value: 'Writer' }
        ]
      },
      {
        id: 'ph6',
        title: 'Tišina',
        category: 'Writing',
        description: 'A short experimental story regarding our relationship with ourselves, others and life',
        imageUrl: createTextCover('Tišina', 'Short story'),
        longDescription: 'A short story which name means "Quiet" in the author\'s native language.\n\nSeen as an experimental work that uses both the composition of the words on the page and the length of its sentences to invoke the feeling of loneliness and overwhelming thought that the character is experiencing',
        media: [
          {
            type: 'markdown',
            content: `„Ni u čemu što nam se dešava nismo sami, ni prvi, ni jedini“

Tišina.

Mukla tišina koja ti oduzima dah, u kojoj ne možeš čuti svoje misli. Tišina koja je toliko glasna da svi zvuci nestanu i jedino što postoji je to. To ništavilo. To prazno mesto koje polako preuzima sve što čini jednu osobu živom. 

Mrak.

Mrak toliko taman da curi, izliva se iz senki i kaplje sa neba, i uskoro, postaje sve što može da se vidi. 

Ja se plašim samoće, to mogu da priznam. Plašim se da ću jednog dana prestati da postojim, i da ću morati da budem sama sa svojim mislima, ili da ih uopšte ne čujem. Plašim se tišine koja nastaje kada je čovek stvarno sam, i mraka koji mu prekriva oči kada je ostavljen od strane drugih. Plašim se ništavila.

Ovaj život je oduvek bio predstavljen kao igra, bar za one koji znaju kako da je igrati. Naši životi imaju pravila koje moramo da pošujemo, imaju kazne koje dobijamo kada pogrešimo i izgubimo, i imaju nagrade za svaki naš uspeh. I naravno, postoje i drugi igrači u ovoj igri zvanoj Život. Neki od njih više vole da igraju sami, da se oslanjaju samo na sebe i da ne traže pomoć od drugih, ali ipak zavise od svih oko sebe. Neki igrači igraju u manjim grupama i tako prolaze kroz život, ali ipak zavise od drugih. 

Ova igra ima pravila, ima kazne i nagrade, ali ono što većina zaboravlja jeste da je ovo igra u kojoj svi igrači zavise jedni od drugih, i da jedini način da izgubiš u ovoj igri, jeste da budeš potpuno sam. Izolovan od svih živih bića, u domu ništavila, gde ništa ne raste, ništa ne umire, ništa ne postoji. Ali niko ne želi da izgubi. Niko ne želi da bude ostavljen u samoći toliko velikoj da jedino ima svoje misli da mu prave društvo, naročito što mogu biti neprijateljske.

Plašim se samoće. Plašim se gubitka. Plašim se sebe. Znam da su to uzaludni strahovi, jer niko sam sebe ne bi naterao da prođe kroz sve to. Ja nikad ne bih dopustila da mi se to desi, ako imam izbora. 

Izbor. 

To je još jedan deo ove igre. 

Svako ima pravo izbora u bilo kojoj situaciji da se nalazi. Ali, šta da se uradi ako je taj izbor oduzet od igrača. Ako njegov izbor više nije bitan i da su drugi već izabrali u njegovo ime. To je druga priča. Jer ljudi nikad ne bi izabrali potpunu samoću za sebe, ali, za druge? Dosta njih je već odabrao taj izbor. I tako moji strahovi se vraćaju i postaju sve manje besmisleni i sve manje nerazumni. Mada, ja nisam prva osoba sa ovakvim strahovima. A znam da neću biti zadnja, ma koliko se nadam da jesam. Ovakav život, prožet strahom, tamom koja se polako širi i preuzima svaki deo našeg postojanja, život koji polako ali sigurno postaje sve glasniji i glasniji i glasniji, da na kraju postane tih. I došli smo do toga. Do tišine. Zvuk toliko glasan da je postao tih. Svetlost toliko jaka i žarka da nas ostavlja u potpunon mraku. Život prepun igrača koji su toliko blizu i koji toliko zavise jedni od drugih, da na kraju svega... 

Oni ostaju sami. 

Sami. U tišini. U mraku. 

I odjednom? 

Zvuk. Otkucaj srca. Udah vazduha. Glas. Odjednom, više nije tiho. Odjednom si opet okružen ljudima. 

Odjednom, ti si ti. Igrač, koji ima izbor kao svi pre njega, koji je toliko sam u svom životu i u svojoj glavi, ali koji ne mora da bude. Ti si igrač u igri koja je nepravedna i koja te povlači sve dalje i dalje od drugih. Ali, drugi i dalje postoje. Drugi igrači su tu, imaju sopstvene izbore, igraju istu igru, bore se sa istom samoćom. I odjednom... Više nisi sam. Odabrao si, i više nisi sam. Nikad nisi bio. Nikad nije bilo tišine. Nikad nije bilo mraka. Nikad nije bilo ništavila. Samo previše svega.

Ja se i dalje plašim samoće, neću da lažem i kažem da više nisam. Neću da kažem da se ne bojim pomisli da ću odjednom biti toliko sama da neću moći da čujem ni misli koje lutaju po mojoj glavi. Neću, jer nije istina. Ali to ne znači da nisam spremna da se suočim sa tim. To ne znači da neću naći nekog, ko je u istoj situaciji kao ja, i da neću da napokon nađem razlog da se više ne bojim toliko pomisli o večitoj samoći, jer sad znam. 

Znam za samoću, ali znam i za druge koji će biti tu u mojoj samoći. 

Znam za tišinu, ali znam i za zvuk toliko jasan i čist, toliko prodoran da ukloni tišinu. 

Znam i za mrak, ali sada znam kako da budem sopstveno svetlo, da uklonim tamu i senke. 

Jer na kraju, možda nisam zadnja, znam da nisam prva, ali želja da pomognem onima koji dolaze nakon mene, je jača od samoće i straha koji prethodi njoj.

I onda.

Tišina. 

Mukla tišina koja oduzima dah, u kojoj ne možeš čuti sopstvene misli. 

Udah. 

Misao. 

Nikad nisi bio sam.

Tišina nestaje i opet se čuje zvuk.`
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Year', value: '2019' },
          { label: 'Role', value: 'Writer' }
        ]
      },
      {
        id: 'ph7',
        title: 'Horizont',
        category: 'Writing',
        description: 'A short story about loving the one who can never love you back',
        imageUrl: createTextCover('Horizont', 'Short story'),
        longDescription: 'A short story exploring the fine line between love, worship and heartbreak, with a view into the mind of one who shall never stop loving even if it hurts',
        media: [
          {
            type: 'markdown',
            content: `Od prvog trenutka, od samo početka, znala sam da je on moja propast. 

Način na koji je njegov glas dopirao do svakog u prostoriji i terao ih da zaustave sopstveno postojanje, sve njihove misli da utihnu, da njihovi životi budu sasvim odbačeni i ostavljeni. I činjenica da su svi oni tako postupili, bez ikakvog pogovora, to je verovatno bio moj prvi trag, moj prvi nagoveštaj za moju sudbinu sa njim. 
Priznajem da njegov sam izgled i opušten stav nije bio nešto novo, nešto potpuno vanzemaljsko. 
Tamna kosa one najgorčije čokolade, oči koje bi pevale sopstvenom plavinom kada bi vam se pogledi susreli, i telo nekog ko očigledno nije mario previše za sopstveni izgled. Kao i većina naših vršnjaka, izgledao je sasvim normalno. 

Ali bi onda otvorio usta i počeo da priča. 

I sam svet, i svi oko njega bi utihnuli. 

Počeo bj da priča o postojanju, o lepoti života i dragocenosti naših veza sa svime oko nas, ili bi zapevao o sopstvenoj ljubavi koja je cvetala i gorela i koja je zvučala plavo kao i sama tuga koju bi prekrivao ali i kao večnost neba koja se nalazila u njegovim očima koje su uvek odavale i više nego potrebno. Otkrivale su bol, tugu ali i radost, zahvalnost za život koji mu je podaren. Ne, njegove oči nisu nebo, pravednije bi bilo da im podarim naziv mora, okeana, neistraženog, nedodirljivog ali ipak tu, odmah do nas. 

Moj drugi nagoveštaj je verovatno bila u tome što sam se voljno, bez straha i bez razmišljanja, bacila i zaronila u njegov okean. I on me je primio, prihvatio, prigrlio ka sebi i tako sam postala jedna sa njim. 
Bar sam ja tako pretpostavila. 
Postali smo nama najbliži, i nisam mogla, niti sam htela da tražim za više od toga. Otvorio mi je oči prema horizontu, prem beskrajnosti i prema tihoj mudrosti sakrivenoj u tom prostranstvu. Uglavnom bi se izgubila, bez i druge pomisli, u tom okeanu koji je nosio bol ali i poentu nekoliko života u sebi, bilo to njegovih ili tuđih, koji su mu se voljno pridružili kao ja. 

Onda mi je otkrio tajnu mog postojanja, moje duše koja je vezana za moje telo i koju sam, drago, njemu poklonila. 
Ali, on je odbio moju ponudu sa osmehom i priznao da je njegova duša povezana i predata drugom. 
Drugom, koji ga je čekao u sledećem životu, izvan tog nedosležnog horizonta, koga sad vidim ali ne mogu mu priči, u tačci gde se noćno nebo i okean sreću, tamo gde ja nemogu ići. 
I taj drugi ga je voleo. 
Kao i svi oko njega što ga vole. 
Isto kao što ga i ja volim. 
Ali on se idalje osmehuje i nastavlja da peva svoju pesmu o zahvalnosti, bolu i ljubavi. I on nastavlja da me prihvata i drži me pored sebe. I ja to prihvatam i volim. 
Volim, jer više ne znam šta da radim bez nedostižnosti, bez nepoznatog, bez bola, bez tuge, bez njegove ljubavi prema drugom, bez njegove zahvalnosti prema životu. 
Ne zna i ne želim da znam za postojanje bez neba, bez horizonta, bez njega i bez mora. Tako da nikad ni neću saznati.`
          }
        ],
        details: [
          { label: 'Type', value: 'Solo Project' },
          { label: 'Year', value: '2018' },
          { label: 'Role', value: 'Writer' }
        ]
      },
    ]
  }
]);

export const CONTACTS: Contact[] = [
  { label: 'email', value: 'therrajovanovic@gmail.com', link: 'mailto:therrajovanovic@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/teodora-jovanovic', link: 'https://www.linkedin.com/in/teodora-jovanovi%C4%87-59792a3b6/' },
  { label: 'Instagram', value: '@inferna_jax', link: 'https://www.instagram.com/inferna_jax/' }
];

export const FOOTER_CONTACTS: Contact[] = [
  ...CONTACTS
];
