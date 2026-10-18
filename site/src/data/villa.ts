export type Language = 'sr' | 'en';
export type Localized = Record<Language, string>;
export const villa = {
  id: 'mirava', name: 'Vila Mirava',
  rooms: [
    { name: { sr: 'Spavaća soba', en: 'Bedroom' }, area: '15 m²' },
    { name: { sr: 'Spavaća soba', en: 'Bedroom' }, area: '11 m²' },
    { name: { sr: 'Spavaća soba', en: 'Bedroom' }, area: '9.9 m²' },
    { name: { sr: 'Dnevni boravak', en: 'Living room' }, area: '21 m²' },
  ],
};
export const copy = {
  sr: {
    title: 'Vila Mirava | Portfolio koncept', description: 'Samostalni portfolio koncept izmišljene vile uz reku, sa AI ilustracijama. Nije klijentski projekat; rezervacije nisu dostupne.',
    skip: 'Pređi na sadržaj', nav: ['Vila', 'Galerija', 'Doživljaj', 'Demo'], menu: 'Otvori meni', closeMenu: 'Zatvori meni',
    contact: 'O ovom demou',
    eyebrow: 'PORTFOLIO · SAMOSTALNI KONCEPT', hero1: 'Vaše mesto', hero2: 'pored reke.',
    heroText: 'Jutra uz reku. Popodneva pored bazena.\nVreme samo za vas.', explore: 'Upoznajte vilu', heroNote: 'Privatna vila. Vaš ritam.', scroll: 'Otkrijte više',
    introLabel: 'DOBRO DOŠLI U VILA MIRAVA', intro1: 'Blizu prirode.', intro2: 'Daleko od žurbe.',
    introText: 'Kuća otvorena prema dvorištu, bazen na nekoliko koraka i reka odmah iza. Jednostavno mesto za duge razgovore, zajedničke obroke i dane bez rasporeda.',
    riverCaption: 'Reka, u svom ritmu.', villaLabel: 'VAŠ BORAVAK', villaText: 'Tri spavaće sobe, prostran dnevni boravak i terasa koja vas vodi napolje. Okupite svoje ljude i napravite mesta za odmor.',
    facts: ['Spavaće sobe', 'Kupatilo', 'Privatni bazen', 'Uz reku'], photos: 'Pogledajte fotografije',
    galleryLabel: 'POGLEDAJTE BLIŽE', galleryTitle: 'Prostor za vaše trenutke.', galleryText: 'Od prve jutarnje kafe do poslednjih zraka sunca.',
    layoutLabel: 'UNUTRAŠNJI PROSTOR', layoutTitle: 'Mesto za svakoga.', layoutText: 'Tri odvojene spavaće sobe i zajednički prostor za druženje. Pogledajte kako su prostorije povezane.',
    layoutNote: 'Ilustrativni plan izmišljenog objekta. Raspored i površine služe samo za prikaz koncepta.', layoutAction: 'Uvećajte plan', layoutAlt: 'Ilustrativni plan izmišljene vile sa tri spavaće sobe, dnevnim boravkom, kuhinjom i kupatilom',
    experienceLabel: 'DANI PO VAŠOJ MERI', experienceTitle: 'Malo planova. Mnogo uživanja.',
    experiences: [{title:'Samo još jedan krug.',text:'Popodne uz bazen, uz knjigu ili u dobrom društvu.'},{title:'Za istim stolom.',text:'Natkrivena terasa za duge obroke na otvorenom.'},{title:'Dočekajte zalazak.',text:'Siđite do reke i pustite da dan polako prođe.'}],
    amenitiesTitle: 'Sve na svom mestu.', amenities: ['Privatni bazen', 'Opremljena kuhinja', 'Prostor za roštilj', 'Privatni parking', 'Wi-Fi', 'Klima-uređaj'],
    locationLabel: 'ŽIVOT UZ REKU', locationTitle: 'Vaš mali beg.\nBlizu prirode.', locationText: 'Reka, otvoren prostor i sporiji ritam dana. Ova stranica prikazuje dizajn koncept; tačna lokacija objekta nije navedena.',
    bookingLabel:'SAMOSTALNI PORTFOLIO PROJEKAT', bookingTitle:'Vidimo se pored reke.', bookingText:'Samostalni portfolio koncept, nije klijentski projekat. Objekti i nazivi su izmišljeni; ilustrativne slike su generisane pomoću AI. Kontakt i rezervacije nisu dostupni.', footer:'Portfolio · Dizajn koncept', rights:'Dizajn koncept', languageLabel:'Jezik sajta',
  },
  en: {
    title: 'Vila Mirava | Portfolio concept', description: 'A self-initiated portfolio concept for a fictional riverside villa with AI-generated illustrations. Not a client commission; no reservations.',
    skip: 'Skip to content', nav: ['The villa', 'Gallery', 'Experience', 'Demo'], menu:'Open menu', closeMenu:'Close menu',
    contact:'About this demo',
    eyebrow:'PORTFOLIO · SELF-INITIATED CONCEPT', hero1:'Your place', hero2:'by the river.', heroText:'Mornings by the river. Afternoons by the pool.\nTime that is entirely yours.', explore:'Explore the villa', heroNote:'A private villa. Your own pace.', scroll:'Discover more',
    introLabel:'WELCOME TO VILA MIRAVA', intro1:'Closer to nature.', intro2:'Further from the rush.', introText:'A house that opens onto the garden, a pool a few steps away, and the river just beyond. A place for long conversations, shared meals and days without a schedule.',
    riverCaption:'The river, at its own pace.', villaLabel:'YOUR STAY', villaText:'Three bedrooms, a generous living room and a terrace that draws you outside. Bring your favourite people and make room for a slower day.',
    facts:['Bedrooms','Bathroom','Private pool','Riverside'], photos:'Explore the gallery',
    galleryLabel:'TAKE A CLOSER LOOK', galleryTitle:'Room for your kind of moments.', galleryText:'From the first coffee to the last light of the day.',
    layoutLabel:'INSIDE THE VILLA', layoutTitle:'A place for everyone.', layoutText:'Three separate bedrooms and a shared space to come together. Take a closer look at how the rooms connect.',
    layoutNote:'Illustrative floor plan of a fictional property. The layout and areas serve only to present the concept.', layoutAction:'Enlarge floor plan', layoutAlt:'Illustrative floor plan of a fictional villa with three bedrooms, living room, kitchen and bathroom',
    experienceLabel:'DAYS AT YOUR OWN PACE', experienceTitle:'Fewer plans. More moments.',
    experiences:[{title:'One more dip.',text:'An afternoon by the pool, with a book or good company.'},{title:'Around the same table.',text:'A covered terrace for long meals outdoors.'},{title:'Stay for the sunset.',text:'Wander down to the river and let the day slow down.'}],
    amenitiesTitle:'The comforts of a good stay.', amenities:['Private pool','Equipped kitchen','Barbecue pavilion','Private parking','Wi-Fi','Air conditioning'],
    locationLabel:'LIFE BY THE RIVER', locationTitle:'A little escape.\nCloser to nature.', locationText:'A river, open space and a slower pace. This page presents a design concept; the exact property location is omitted.',
    bookingLabel:'SELF-INITIATED PORTFOLIO PROJECT', bookingTitle:'See you by the river.', bookingText:'A self-initiated portfolio concept, not a client commission. Properties and names are fictional; illustrative images are AI-generated. Contact and reservations are unavailable.', footer:'Portfolio · Design concept', rights:'Design concept',languageLabel:'Website language',
  },
};
