import type { Locale, NewsItem } from "@/content/data";

const NOTICE_IMAGE = {
  pt: "Comunicado publicado em imagem no site oficial. Consulte o original em aectm.pt.",
  en: "Notice published as an image on the official site. See the original on aectm.pt.",
};

type NewsCopy = { title: string; excerpt: string; body: string };

const EN: Record<string, NewsCopy> = {
  "mensagem-de-boas-vindas-2": {
    title: "Welcome message",
    excerpt:
      "Welcome to the 2026/2027 school year! It is with enthusiasm and a sense of responsibility that we begin a new year at the Castro Marim School Cluster.",
    body: `Welcome to the 2026/2027 school year!
It is with great enthusiasm and a sense of responsibility that we begin a new school year at the Castro Marim School Cluster.
Each new year is a moment to start again, to renew dreams and projects, to face new challenges and, above all, to keep learning and growing together. In this spirit of trust, closeness and commitment we welcome our entire school community.
This start of year also has a special meaning, marked by a new stage in the leadership of our cluster. A transition is always a moment of change, but also an opportunity to look to the future with confidence, valuing the path already travelled and keeping alive what unites us: our school, our students and the building of a quality, inclusive and humanist education.
We want this new cycle to be lived with serenity, enthusiasm and a spirit of unity. A school is built daily through the relationships it forms, the experiences it offers and the capacity of each person to contribute to an environment where everyone feels welcomed, respected and valued.
We will therefore continue to work closely and collaboratively, eyes on the future, without losing sight of the values and identity that characterise the Castro Marim School Cluster.
May 2026/2027 be a year of new learning, achievements, growth and, above all, joint construction.
Wishes for an excellent school year, full of enthusiasm, confidence and success.
A friendly embrace,
José Nunes`,
  },
  "arranque-do-ano-letivo-informacao": {
    title: "Start of the school year — information",
    excerpt: NOTICE_IMAGE.en,
    body: NOTICE_IMAGE.en,
  },
  "informacao-arranque-do-ano-letivo": {
    title: "Start of the school year — information",
    excerpt: NOTICE_IMAGE.en,
    body: NOTICE_IMAGE.en,
  },
  sardinhas: {
    title: "Sardines",
    excerpt:
      "Sardines with soul: from clay to popular verse. The PIEF class developed an interdisciplinary project around the sardine as a symbol of Portuguese culture.",
    body: `Sardines with soul: from clay to popular verse
The PIEF class of the Castro Marim School Cluster developed the project “Sardines with soul: from clay to popular verse”, involving Living in Portuguese, Art Workshop and Communicating in a Foreign Language — English.
Starting from the sardine as a symbol of Portuguese culture, students carried out visual research, created sketches, shaped sardines in modelling paste and painted them with patterns inspired by popular tradition. Living in Portuguese and the Art Workshop guided the creative process, while English was used for short bilingual captions.
Students also wrote original popular quatrains, linking each text to the sardine they had made. The project ended with an exhibition in the School Library, where the community could see the class’s artistic path and commitment.
The initiative highlighted the creativity of the PIEF students and reinforced the value of popular culture and interdisciplinary learning.`,
  },
  maquetes: {
    title: "Models",
    excerpt:
      "When reading takes shape: Year 7 class B built models inspired by The Story of a Seagull and the Cat Who Taught Her to Fly.",
    body: `When reading takes shape: models that tell stories
Year 7 class B created models inspired by The Story of a Seagull and the Cat Who Taught Her to Fly, turning reading into a visual and creative process. The project linked Portuguese and Visual Education, asking students to choose key moments of the narrative and represent them in three dimensions.
The models were exhibited in the School Library, offering visitors a visual path through the work. Students’ commitment stood out throughout, showing creativity, responsibility and collaboration. The activity strengthened academic and artistic skills and the pleasure of learning.`,
  },
  "historias-com-magia": {
    title: "Stories with magic",
    excerpt:
      "Year 7 class B continued “Stories with Magic”, adapting and retelling stories in pairs across Portuguese, Discover and Learn, and ICT.",
    body: `Stories that come to life: class B’s creativity in action
Year 7 class B continued the project “Stories with Magic”, working in pairs to adapt and retell stories. The activity stood out for the link between Portuguese, Discover and Learn, and Information and Communication Technologies, allowing integrated and creative learning.
The project ended with presentations to first-cycle classes at EB1 Castro Marim on the afternoon of Children’s Day. Students showed commitment, responsibility and enthusiasm, and skills such as communication, creativity, collaboration and managing emotions before a real audience.
The involvement of the whole class showed the value of interdisciplinary work that strengthens ties with the educational community.`,
  },
  "lista-de-candidatos-admitidos-e-excluidos-ao-processo-concursal": {
    title: "List of candidates admitted and excluded from the competition",
    excerpt:
      "In accordance with Notice no. 15208/2026/2 on the opening of the competition to elect the Director of the Castro Marim School Cluster, the list of admitted and excluded candidates is published.",
    body: `In accordance with paragraph 6 of Notice no. 15208/2026/2 concerning the opening of the competition to elect the Director of the Castro Marim municipal school cluster, published in Series 2 of the Diário da República on 19 June 2026, the list of candidates admitted and excluded from the competition is made public, as decided at a meeting of the Commission appointed by the General Council to accompany the election of the Director.`,
  },
  "alunos-da-escola-vencem-premio-nacional": {
    title: "SCHOOL STUDENTS WIN A NATIONAL PRIZE",
    excerpt:
      "Marta Teixeira and Martim Antunes, Year 9 students, were among the seven winning groups in the 3rd-cycle category of Pinocchio at School (Gulbenkian / Polígrafo).",
    body: `Marta Teixeira and Martim Antunes, Year 9 students (classes A and B respectively), were among the seven winning groups in the 3rd-cycle category of Pinocchio at School, a joint initiative of the Calouste Gulbenkian Foundation and Polígrafo.
https://poligrafo.sapo.pt/institucional/pinoquio-na-escola-distingue-vencedores-da-edicao-2025-2026
The work that received this distinction was Anatomima da Desinformação: o Caso das Alergias and addresses, as the title suggests, the problem of disinformation.
The work was produced in Portuguese, taught by José Guedes.`,
  },
  "2a-comemoracao-do-dia-mundial-da-diversidade-cultural": {
    title: "2nd COMMEMORATION OF WORLD DAY FOR CULTURAL DIVERSITY",
    excerpt:
      "Castro Marim Basic School marked 21 May, World Day for Cultural Diversity for Dialogue and Development.",
    body: `Castro Marim Basic School celebrated, on 21 May, the World Day for Cultural Diversity for Dialogue and Development, turning the school into a meeting of cultures, colours and traditions.
Throughout the day, students, teachers and the whole educational community took part in activities that showed the cultural richness present in the school and reinforced values such as respect, dialogue and healthy coexistence.
The week was marked by the mural Fragments of Me, a collective work in which each fragment represented identity, origins and family traditions.
There was also a book exhibition on diversity and interculturality, a display of objects, photographs, clothing and cultural symbols, cultural games, inspiring phrases around the school, a workshop on diversity/interculturality, a Diversity flashmob, musical and dance performances at lunch, henna painting, and names written in Urdu.
The initiative reinforced diversity as essential to individual and collective growth.`,
  },
  "desafios-darte-25-26": {
    title: "DESAFIOS D’ARTE 25-26",
    excerpt:
      "The Desafios d’Arte® 2025/2026 contest, promoted by Faber-Castell Portugal and APEVT, invited students to reflect on art as expression, thought and transformation.",
    body: `The Desafios d’Arte® 2025/2026 contest, promoted by Faber-Castell Portugal with APEVT, challenges students to reflect on art as a form of expression, thought and transformation.
Under the theme The Gesture and the Idea: Visual Dialogues in Times of Rupture, participants explore different artistic languages, drawing on Conceptualism, Gesturalism and Expressionism.
Students of the Castro Marim School Cluster took part in the 2nd-cycle tier.
Leonardo Farinha, Year 5 C, guided by teacher Joaquim Correia, reached the final with the work A Objetiva.
Inspired by Expressionism, the work uses expressive brushstrokes, vibrant colour and mixed technique to represent the feeling of being constantly observed. Collages of eyes symbolise permanent surveillance.
The Desafios d’Arte final gala was held on 30 May at the Carris Museum in Lisbon.`,
  },
  "visita-de-estudo-a-escola-de-hotelaria-e-turismo-de-vrsa": {
    title: "STUDY VISIT TO THE VRSA HOTEL AND TOURISM SCHOOL",
    excerpt:
      "On 8 May, Year 9 C and PIEF visited the Hotel and Tourism School of Vila Real de Santo António; Year 9 B went on 22 May.",
    body: `On 8 May, students from Year 9 C and PIEF made a study visit to the Hotel and Tourism School of Vila Real de Santo António, making natural juices and healthy pies.
On 22 May it was the turn of Year 9 B.
The activity promoted healthy habits and showed options for further study.
Castro Marim municipality provided transport.`,
  },
  "um-testemunho-vivo-sobre-a-guerra-do-ultramar": {
    title: "A LIVING TESTIMONY ON THE OVERSEAS WAR",
    excerpt:
      "In History and Geography of Portugal, Year 6 class A received a visit from a student’s grandfather, who shared his experience of 27 months in Angola during the Colonial War.",
    body: `In History and Geography of Portugal, Year 6 class A received a visit from a student’s grandfather, who shared, closely and meaningfully, his experience during the Colonial War, in the 27 months he spent in Angola.
Students listened to accounts of that period of Portugal’s history, deepening their knowledge through a real testimony.
The guest brought his military booklet, period photographs and a decoration medal, which aroused great curiosity.
Students asked questions with respect and interest.
This was a valuable learning opportunity, linking generations and reflecting on the importance of peace.
We thank Mr João Ramos for his availability and generous sharing.`,
  },
  "peddy-paper-intergeracional": {
    title: "INTERGENERATIONAL SCAVENGER HUNT",
    excerpt:
      "On 13 and 14 May the historic centre of Castro Marim hosted an intergenerational scavenger hunt organised with the residential and day-care structure for dementia.",
    body: `The Intergenerational Peddy Paper was a success. On 13 and 14 May the historic centre of Castro Marim hosted a celebration of empathy, sharing and union between generations.
Organised by the Castro Marim School Cluster and the António Cabrita Residential and Day-Care Structure — Alzheimer and other dementias, it brought together children, teachers, technicians, the community and local institutions.
All Year 1 and Year 5 students took part, alongside users of the José Cabrita structure and the Cegonha Branca home and day centre in Altura.
More than 600 hugs were shared over the two days.
The initiative had support from Castro Marim Town Hall and Parish Council and local partners including Casa do Sal, the local market, Castro Marim Castle and Odiana.
It forms part of the cluster’s Personal, Social and Community Development Plan in the Annual Activities Plan.
In a municipality with about 297 older people per 100 young people (2021 Census), real contact between generations matters.`,
  },
  "semana-do-bem-estar-digital": {
    title: "DIGITAL WELL-BEING WEEK",
    excerpt:
      "Between 30 April and 6 May, ICT ran initiatives for a more conscious use of technology, including a session on social media and mental health.",
    body: `In Digital Well-being Week, 30 April to 6 May, ICT ran initiatives to promote a more conscious and healthy use of technology.
Among them was Social Media and Mental Health, for 3rd-cycle students, on the impact of digital platforms on psychological well-being.
Breaks were also animated with Just Dance, to encourage movement and time away from screens.
The week included the Castro Marim CPCJ and ABESFA.
https://canva.link/thk82gd3asigljv`,
  },
  "4o-a-participa-no-hubliterario": {
    title: "YEAR 4 A TAKES PART IN HUBLITERÁRIO",
    excerpt:
      "On 5 May, Year 4 E, guided by teacher Alzira Cavaco, took part in HubLiterário at EB 2,3 Monte Gordo.",
    body: `On 5 May, Year 4 E, guided by teacher Alzira Cavaco, took part in HubLiterário, which promotes reading, sharing between schools and oral and artistic expression.
Students went to Escola Básica 2,3 de Monte Gordo and presented a play based on Luís Sepúlveda’s The snail who discovered the importance of slowness.
The performance stood out for creativity and expression. Taking part deepened contact with literature and social, cooperation and communication skills.`,
  },
  "dia-do-laco-azul": {
    title: "BLUE RIBBON DAY",
    excerpt:
      "April is also the month for preventing child maltreatment. The cluster, with Castro Marim CPCJ and ABESFA, held a human Blue Ribbon awareness action.",
    body: `April is also the month for preventing maltreatment in childhood, and the Blue Ribbon symbolises the collective commitment against all forms of violence against children, including neglect and physical, psychological and emotional abuse.
Our cluster, together with Castro Marim CPCJ and ABESFA, once again promoted an awareness action (Human Blue Ribbon) to alert society and encourage reporting of abuse.`,
  },
  "concurso-de-leitura-do-baixo-guadiana-2": {
    title: "BAIXO GUADIANA READING CONTEST",
    excerpt:
      "This year the contest had no winner from the cluster, but many students reached the final.",
    body: `This year the Baixo Guadiana Reading Contest had no winner from the cluster, but our students’ participation was no less meritorious.
Many reached the final, as the list published shows.
1st cycle. Altura: Clara Correia (class M), Alice Ribeiro (class M) and Inês Calvinho (class H); Castro Marim: Carlos, Carolina Gonçalves and Diana Baltazar.
2nd cycle: Gonçalo Ramos (6A), and José Domingos and Vicente Fernandes (both 6B).
3rd cycle: Carlota Rufino (7B), Lia Filipe (8A) and Maria Fernandes (9C).
Congratulations to all.`,
  },
  podcast06: {
    title: "PODCAST#06",
    excerpt:
      "The sixth Castro Marim School Radio podcast is online, on digital well-being, produced by Year 6 C.",
    body: `The sixth Castro Marim School Radio podcast is online, this time on digital well-being.
https://drive.google.com/file/d/1D7CIF_D8O2aIL9WvssktB_ETJvB7ow7c/view
It was produced by Year 6 C, guided by teacher Elisabete Teixeira.
António Cavaleiro and Marta Mestre are the teachers responsible for School Radio.`,
  },
  "intercambio-escolar-entre-portugal-e-espanha": {
    title: "SCHOOL EXCHANGE BETWEEN PORTUGAL AND SPAIN",
    excerpt:
      "On 30 May, in the PEBIF project, Years 5 B and 5 C received students from Ayamonte and Lepe.",
    body: `On 30 May, in the PEBIF project, Years 5 B and 5 C welcomed students from Ayamonte and Lepe.
Morning activities introduced our town and encouraged sharing.
The visit to the Santo António ravelin, led by Pedro Pires of Castro Marim Town Hall, offered a view of local history and shared ties with Ayamonte.
At Casa do Sal, students took part in Hunt the Painting, based on work by local artist José Mário Carolino.
At Castro Marim Basic School they watched short films and played traditional games, including in the library.
The morning ended with gifts from the Parish Council and the Ayuntamientos of Lepe and Ayamonte.`,
  },
  "visita-de-estudo-a-brenhosa": {
    title: "STUDY VISIT TO BRENHOSA",
    excerpt:
      "On 23 April Year 6 students visited Brenhosa for a day of learning, including bread-making and outdoor activities.",
    body: `On 23 April Year 6 students took part in a study visit to Brenhosa, a day of learning, fun and time together.
They helped bake bread and learned about local heritage.
The programme also included laser tag, archery, traditional games and local paths — a way to learn about fauna, flora and geography.
There was also time for a swim and sun.
The municipality provided transport.`,
  },
  "fabrica-das-historias": {
    title: "STORY FACTORY",
    excerpt:
      "Year 6 classes presented books they had illustrated, written by users of the Santa Casa da Misericórdia home.",
    body: `Year 6 classes came to the auditorium on 16 April to present books they had illustrated the previous year.
The activity, Story Factory, was run with users of the Santa Casa da Misericórdia de Castro Marim home, specifically those with neurocognitive disorder — the authors of the stories the students illustrated.
Present were Cristina Lopes, the teacher who guided the young illustrators, Iola Fernandes, director of the home, and Manuela Maurício, a resident who read a story and helped give books to the illustrators.
The books can be bought at Santa Casa da Misericórdia de Castro Marim.`,
  },
  "todos-diferentes-todos-importantes": {
    title: "ALL DIFFERENT, ALL IMPORTANT",
    excerpt:
      "On 24 April educator Raquel Horta ran a playful-educational activity with her Year 2 class on inclusion and respect for diversity.",
    body: `On 24 April educator Raquel Horta ran a playful-educational activity with her Year 2 class, titled We are all different, all important.
The aim was to promote inclusion and respect for diversity in the class.
Activities of this kind promote empathy and belonging, and help root values such as respect, tolerance and inclusion.`,
  },
  "monitorizacao-da-agua-na-ribeira-de-odeleite": {
    title: "WATER MONITORING ON THE ODELEITE STREAM",
    excerpt:
      "On 16 and 17 April, Years 8 B and 9 C monitored water quality on the Odeleite stream with APA engineers.",
    body: `Students of classes B and C of Years 8 and 9 respectively monitored water quality on the Odeleite stream on 16 and 17 April, downstream in Odeleite and upstream in Fortes.
The activity, guided by engineers Paula Vaz and Nuno Alves of APA (Portuguese Environment Agency), allowed students to contribute to protecting water resources and ecosystems.
Special thanks to APA staff and trainees Nicole Abreu and Rafael Machado.`,
  },
  "workshop-de-robotica": {
    title: "ROBOTICS WORKSHOP",
    excerpt:
      "On 15 April, Ciência Viva na Escola club students took part in a robotics workshop at the Tavira Ciência Viva Centre.",
    body: `On 15 April, students in the Ciência Viva na Escola club took part in a robotics workshop at the Tavira Ciência Viva Centre.
It was a chance to practise block programming and computational thinking.
Thanks to all who helped make the activity possible.`,
  },
  "o-segredo-das-ervas-marinhas": {
    title: "THE SECRET OF THE SEAGRASSES",
    excerpt:
      "About 90 students from Years 7 and 8 presented the animation film The Secret of the Seagrasses, with the National Arts Plan and Museu Zer0.",
    body: `Premiere and emotion: “The Secret of the Seagrasses” wins over the community.
Unforgettable days at the Castro Marim School Cluster with the animation film made by about 90 students from Years 7 and 8. A preview on 24 March was followed by an evaluation meeting with the teaching team, resident artist Catarina Calvinho Gil, the cluster directorate and the National Arts Plan, represented by regional coordinator Nádia Torres, as part of the Culture Education Biennial theme “And instead of fear?”
The official premiere was on 26 March, the first day of the cluster’s Cultural Days, with the Organisation of Ibero-American States (which funded the project), Museu Zer0, the Mayor of Castro Marim and her culture and education team.
Students shared cinematic techniques (2D animation, watercolour and acrylic) and teamwork skills.
https://drive.google.com/file/d/1LDoaw15p3n0KVcZGYnNDgXj2yfu1iFED/view
(Text by Cristina Serote)`,
  },
  "a-escola-foi-ao-cinema": {
    title: "THE SCHOOL WENT TO THE CINEMA",
    excerpt: "School cinema outing, as published on aectm.pt.",
    body: "",
  },
  "aviso-de-greve-11": {
    title: "STRIKE NOTICE",
    excerpt: "Strike notice published on the official site.",
    body: "",
  },
  "ainda-os-dias-culturais-ii": {
    title: "CULTURAL DAYS STILL — II",
    excerpt: "Further report on the cluster’s Cultural Days, as published on aectm.pt.",
    body: "",
  },
  "ainda-os-dias-culturais-i": {
    title: "CULTURAL DAYS STILL — I",
    excerpt: "Report on the cluster’s Cultural Days, as published on aectm.pt.",
    body: "",
  },
  "matriculas-e-renovacao-de-matriculas-3": {
    title: "ENROLMENT AND RE-ENROLMENT",
    excerpt: "Enrolment and re-enrolment notice as published on aectm.pt.",
    body: "",
  },
  "dias-culturais-i": {
    title: "CULTURAL DAYS 26",
    excerpt: "Cultural Days notice as published on aectm.pt.",
    body: "",
  },
  "bem-vindos-ao-ano-letivo-2026-2027": {
    title: "Welcome to the 2026/2027 school year!",
    excerpt:
      "It is with enthusiasm and a sense of responsibility that we begin a new year at the Castro Marim School Cluster.",
    body: "",
  },
};

function fallbackTitle(pt: string): string {
  return pt
    .replace(/^AVISO DE GREVE.*/i, "STRIKE NOTICE")
    .replace(/^MENSAGEM DE BOAS VINDAS$/i, "Welcome message");
}

export function newsCopy(item: NewsItem, locale: Locale): NewsCopy {
  if (locale === "pt") {
    const title =
      item.title === "_" || !item.title.trim()
        ? "Arranque do Ano Letivo – Informação"
        : item.title;
    let body = item.body;
    let excerpt = item.excerpt;
    if (!body.trim() && item.image) {
      body = NOTICE_IMAGE.pt;
      excerpt = excerpt || NOTICE_IMAGE.pt;
    }
    return { title, excerpt, body };
  }
  const hit = EN[item.slug];
  if (hit) {
    return {
      title: hit.title,
      excerpt: hit.excerpt || item.excerpt,
      body: hit.body || (item.body ? item.body : NOTICE_IMAGE.en),
    };
  }
  return {
    title: fallbackTitle(item.title),
    excerpt: item.excerpt,
    body: item.body || (item.image ? NOTICE_IMAGE.en : ""),
  };
}

export function isNotice(item: NewsItem): boolean {
  const t = `${item.title} ${item.slug}`.toLowerCase();
  return [
    "aviso",
    "greve",
    "matrícul",
    "matricul",
    "lista",
    "concurso",
    "prova",
    "exame",
    "calendário",
    "calendario",
    "inscri",
    "alerta",
    "arranque",
    "informação",
    "informacao",
  ].some((k) => t.includes(k));
}
