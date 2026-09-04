"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Article = { title: string; paragraphs?: string[]; result?: string; images?: string[] };
const titles = [
"Message from the Chairman","Message from the Founder & Director","Message from the Academic Director","Annual Report 2025–26: A Year of Growth & Achievement","A New Beginning: Inauguration of Srijan Valley School","Celebrating the Spirit of Freedom: Independence Day","Unveiling Creativity: Science, Art & Craft Exhibition","Colours of Creativity: Inter-House Rangoli Competition (with Results)","Celebrating Excellence: Prize Distribution Ceremony","Srijan Valley School Shines at the International Library & Cultural Centre (Fancy Dress Event)","Celebrating Childhood: Children’s Day","Caring for Our Children: Medical Health Check-Up Camp","Fancy Dress Fiesta: A Splash of Imagination (with Results)","Speak to Inspire: Speech Competition (with Results)","A Bright Celebration: Yellow Day","The Magic of Christmas: Christmas Celebration","Remembering Swami Vivekananda: National Youth Day","Celebrating Knowledge & Tradition: Basant Panchami","Honouring the Nation: Republic Day Celebration","Nurturing Talents, Celebrating Achievements (Curricular Activities & Results)","Colours on Canvas: Drawing Competition","Exploring Space: Space on Wheels","Discovering the Wonders of Science: Visit to Science City","A Day of Wonder & Laughter: Magic Show","Honouring Excellence: Felicitation Ceremony","Young Minds, Creative Words: Articles & Poems by Our Students","Our Mentors Speak: Teachers’ Messages"];
const copy: Record<number, Omit<Article,"title">> = {
1:{paragraphs:["I am proud to see Srijan Valley School advancing its mission of bringing opportunity and excellence to children in rural communities. A school is more than a place of learning; it is where dreams take root, character is shaped and young minds gain the courage to imagine a better future.","We believe that every child deserves access to quality education, regardless of where they are born. With guidance, resources and encouragement, our students can achieve great heights and contribute meaningfully to society.","Our goal is to nurture not only capable students, but also compassionate and responsible citizens. True success lies in their integrity, perseverance and service to their families, communities and nation.","I sincerely appreciate our dedicated teachers, supportive parents and hardworking students. May this magazine celebrate the creativity and achievements of our young learners.","With warm wishes for the continued growth of Srijan Valley School and a bright future in which every student learns, serves and shines.","Govind Lall Agrawal\nChairman"]},
2:{paragraphs:["A school magazine is more than a collection of articles, photographs and memories; it is a reflection of the vibrant life of the school. It provides our students with a platform to express their thoughts, creativity, talents and achievements. It also brings together the collective efforts of students, teachers and the school community, preserving precious memories and showcasing the values and vision of the institution.","The establishment of Srijan Valley School is rooted in a cherished dream—to bring quality education to children in the rural areas and provide them with facilities and opportunities at par with those available in the best educational institutions. My vision is not merely to impart academic knowledge, but to nurture confident, responsible, compassionate and capable individuals.","I believe that every child deserves the opportunity to dream big and receive the right guidance and environment to transform those dreams into reality. Through a balanced blend of academics, co-curricular activities, technology, sports, creativity and value-based education, we strive to develop the complete personality of every child.","My  dream will be truly fulfilled when the young learners of Srijan Valley School step into prestigious institutions for higher education, excel in their chosen fields and above all, grow into responsible citizens who contribute meaningfully to the progress and development of our nation.","As we present this magazine, I congratulate our students and teachers for their creativity, dedication and enthusiasm. May these pages inspire our children to explore, learn, create and always strive for excellence.","With best wishes for a bright and fulfilling future.","Pramod Agrawal\nFounder & Director"]},
3:{paragraphs:["It gives me immense pleasure and satisfaction to see our students and teachers coming together with enthusiasm and dedication for the publication of the first edition of our school magazine. This magazine is not merely a collection of articles and photographs; it is a beautiful reflection of the creativity, talent, achievements and experiences of our young learners.","I am particularly happy to see our students getting an opportunity to express their thoughts, ideas and imagination through their own words. Such platforms help children develop confidence, creativity, communication skills and a sense of responsibility.","The wholehearted involvement of our teachers in guiding and encouraging the students is truly appreciable. Their efforts have helped transform the ideas of our young minds into meaningful contributions.","As we bring out this first edition, I hope the magazine becomes a cherished record of our school’s growth and continues to inspire our children to learn, explore and achieve greater heights.","My heartfelt appreciation and best wishes to all the students, teachers and everyone who has contributed to making this first edition a success. May this be the beginning of many more wonderful editions in the years to come.","Dr. Renu Agrawal\nAcademic Director"]},
5:{paragraphs:["The inauguration of Srijan Valley School was held on 3 May 2025 with great enthusiasm and joy. The auspicious occasion marked the beginning of a new chapter in providing quality education to children in the rural region of Pithoria.","The ceremony was graced by the presence of Chairman Shri Govind Lall Agrawal, Trustee Shri Pawan Agrawal, Founder and Director Shri Pramod Agrawal, Academic Director Dr. Renu Agrawal , Mr. Prateek Agrawal and Ms. Eeshani Agrawal along with other members of the Board of Trustees and the School Managing Committee. The teachers and staff of the school were also present on this memorable occasion.","The dignitaries addressed the gathering and shared the vision and objectives behind establishing the school. They emphasised the commitment to providing quality education, strong values and holistic development to children of the Pithoria rural region. The school aims to create a stimulating learning environment where children can develop confidence, creativity, communication skills and a strong foundation for their future.","The local residents welcomed the initiative with immense happiness and enthusiasm. They expressed their gratitude for bringing a quality educational institution closer to their community. The inauguration thus marked not merely the opening of a school, but the beginning of a meaningful journey towards empowering rural children through education and opportunity."]},
6:{paragraphs:["Srijan Valley School celebrated Independence Day on 15 August 2025 with immense pride, patriotic spirit and enthusiasm. The celebration commenced with the hoisting of the National Flag by Chairman Shri Govind Lall Agrawal, followed by the National Anthem. In his address, he highlighted the values of freedom, unity and responsible citizenship, inspiring everyone to contribute towards a better nation.","Founder and Director Shri Pramod Agrawal along with other Board members graced the occasion with their presence. The students presented a vibrant and colourful cultural programme comprising patriotic songs, speeches and performances. Their confidence and enthusiasm added charm to the celebration and filled the atmosphere with patriotic fervour.","The celebration concluded with a renewed pledge to uphold the values of our nation and cherish the freedom for which countless heroes made sacrifices."]},
8:{paragraphs:["An Inter-House Rangoli Competition was organised on 17 October 2025 with great enthusiasm and excitement. Students from all four houses—Jasmine, Lily, Lotus and Rose—participated with creativity and team spirit.","The young artists beautifully transformed their spaces with colourful and attractive Rangoli designs, reflecting their imagination, artistic skills and festive spirit. Each house presented a unique and impressive creation, making the competition vibrant and colourful.","After careful evaluation, Jasmine House emerged as the winner, earning appreciation for its outstanding presentation. The competition was a wonderful celebration of creativity, cooperation and the artistic talent of our students."],result:"(Result - Table)"},
9:{paragraphs:["To recognise and appreciate the hard work and talent of the students, a Prize Distribution Ceremony was organised at Srijan Valley School on 3rd November 2025. The ceremony celebrated the achievements of students who participated enthusiastically in various activities, including the Science and Craft Exhibition, Inter-House Rangoli Competition, and Speech Competition.","On this occasion, Shri Pramod Agrawal, Founder and Director, and Mrs. Renu Agrawal, Academic Director, felicitated the participating students and appreciated their sincere efforts and enthusiasm.","Addressing the students, Shri Pramod Agrawal highlighted the importance of co-curricular activities in the overall development of children. He said that such activities help children become smart, confident, creative, and capable of facing challenges with confidence.","Mrs. Renu Agrawal, Academic Director and Mrs. Seema Chitlangia, Principal also encouraged the students to continue participating in such activities and motivated them to work hard and achieve greater success in their future endeavours.","The ceremony was filled with joy and pride as the students received appreciation for their efforts. It served as a strong encouragement for them to explore their talents and strive for excellence in every field."]},
10:{paragraphs:["The International Library and Cultural Centre organised a Fancy Dress Competition on 8th November 2026, in which the students of Srijan Valley School participated enthusiastically.","Saransh Kumar of Nursery dressed up as Aladdin, Priyanshu Thakur of Standard II portrayed a Doctor, and Anshika Priya of Standard III beautifully portrayed the renowned sportsperson Sania Mirza.","All the participants presented their characters with confidence and enthusiasm. Their performances were highly appreciated by the organisers, teachers, and audience. The event provided the children with a wonderful opportunity to showcase their creativity, confidence, and talent."]},
11:{paragraphs:["The School celebrated Children’s Day on 14 November 2025 with great enthusiasm and joy. The programme began with a heartfelt tribute to Pandit Jawaharlal Nehru, lovingly remembered as Chacha Nehru. The children garlanded his portrait and paid floral tribute.","Students delivered informative speeches about Nehru ji’s life, ideals and his special love for children. A lively quiz session was also organised, in which the students participated enthusiastically.","The Principal Mrs Seema Chitlangia addressed the children and spoke about the importance of Children’s Day. She encouraged them to be disciplined, responsible and hardworking, and motivated them to develop good values and strive for excellence.","The celebration concluded with the distribution of sweets among the children. The day was filled with learning, happiness and memorable moments for all."]},
12:{paragraphs:["Srijan Valley School, in association with CCL, organised a Health Camp for the students and parents of the school, as well as the people of the surrounding Pithoria region.","A team of experienced doctors from CCL visited the school and conducted health check-ups for the children, parents, and local residents. The doctors also provided medical advice and distributed medicines free of cost to those in need.","The camp was a meaningful initiative that promoted health awareness and well-being among the school community and the local people. It was highly appreciated by all the beneficiaries."]},
13:{paragraphs:["A Fancy Dress Competition was organised at Srijan Valley School on 16th December 2025, with enthusiastic participation from the students of Nursery, KG, Classes I and II. The Nursery children presented themselves as different fruits and vegetables, while the KG students beautifully portrayed elements of nature, such as trees and rainbows. The students of Classes I and II presented meaningful themes such as Save Trees, Clean India, Stop Food Wastage, Healthy Food, Say No to Plastic, and Save Electricity.","The children participated with great enthusiasm and confidence, displaying their creativity and talent. The performances were appreciated by the judges, Mrs. Mamta Kumari and Mrs. Ranjeeta, as well as the parents. The parents expressed their appreciation for the sincere efforts of Srijan Valley School in nurturing creativity and bringing out the hidden talents of children.","Dr. Renu Agrawal, Academic Director and Mrs Seema chitlangia principal felicitated the winners from each class with trophies and sweets. They also presented mementoes and shawls to the judges, Mrs. Mamta Kumari and Mrs. Ranjeeta, as a token of appreciation for their valuable contribution. The event was a joyful and enriching experience that encouraged the children to express themselves confidently while conveying important messages for a healthy, clean, and responsible society."],result:"( Result)"},
15:{paragraphs:["The pre-primary section of the School celebrated Yellow Day on 11 December 2025 with great enthusiasm. The school looked bright and cheerful as all the children and teachers came dressed in yellow outfits. The children also brought and displayed various yellow-coloured objects.","The Director, Dr. Renu Agrawal explained the importance of yellow in our lives, giving examples such as the sun and yellow flowers. The Principal, Mrs. Seema Chitlangia encouraged the children to participate actively in such celebrations and appreciated the efforts of the teachers.","The celebration was a joyful blend of learning, creativity and fun, making it a memorable experience for the children."]},
16:{paragraphs:["The Pre-Primary Section of Srijan Valley School celebrated Christmas with great joy and enthusiasm. The little ones dressed up in colourful costumes and participated in various activities, songs, and dances based on the spirit of Christmas.","The children enjoyed the celebration and learnt about the values of love, kindness, sharing, and caring. The programme filled the school with happiness and festive cheer."]},
17:{paragraphs:["National Youth Day was celebrated on 12 January 2026 with great enthusiasm to commemorate the birth anniversary of Swami Vivekananda. The programme began with a solemn tribute to the great visionary, followed by a colourful procession in which the students participated with pride and enthusiasm.","Students delivered inspiring speeches highlighting Swami Vivekananda’s life, teachings and his message of courage, self-confidence and service to the nation. The celebration aimed to motivate young minds to follow his ideals and become responsible and confident citizens.","The Principal, Mrs. Seema Chitlangia, encouraged the students to follow the path of courage, discipline and self-confidence shown by Swami Vivekananda and to carry his inspiring message forward in their lives."]},
18:{paragraphs:["The students of the School celebrated Basant Panchami with devotion, enthusiasm and a festive spirit. The celebration began with the traditional worship of Goddess Saraswati, the divine symbol of knowledge, wisdom and learning. Students and teachers participated in the puja with great reverence.","The Director, Mrs. Renu Agrawal, and the Principal, Mrs. Seema Chitlangia, graced the occasion with their presence and joined the students and staff in seeking the blessings of Goddess Saraswati. They encouraged the children to value knowledge, remain curious and pursue learning with dedication.","The celebration created an atmosphere of peace, positivity and devotion, leaving everyone with a renewed sense of respect for education and learning."]},
22:{paragraphs:["A fascinating “Space on Wheels” exhibition was organised to introduce students to the wonders of space and astronomy. The exhibition was arranged in a specially designed bus showcasing various space-related models, pictures, and information.","The students of Srijan Valley School visited the exhibition with great enthusiasm. They explored the exhibits, asked several questions to the organisers, and gained interesting knowledge about space, planets, and space exploration.","The visit was an informative and enriching experience, making learning enjoyable and inspiring the children to develop a deeper interest in science and astronomy."]},
23:{paragraphs:["The students of Srijan Valley School visited Science City with great enthusiasm and curiosity. The educational visit provided the children with an opportunity to observe various scientific exhibits and understand scientific concepts through practical and interactive experiences .","The visit was conducted under the guidance of senior teacher Mr. Soumya Garg, who encouraged the children to ask questions, explore and learn from their surroundings.","The trip was an enriching and enjoyable experience, combining learning, exploration and fun, and left the students with many new ideas and memorable experiences."]},
25:{paragraphs:["The closing ceremony of the academic session 2025–26 at Srijan Valley School was celebrated on 24 April 2026 with great pride and enthusiasm. The occasion was graced by Shri Sanjay Seth, Hon’ble Union Minister of State for Defence, Government of India, as the Chief Guest. The programme began with lightning the lamp and a melodious welcome song presented by the students, followed by the welcome address by Shri Pramod Agrawal, Founder and Director.","The academic toppers of various classes were felicitated for their outstanding performance and received prizes from the Chief Guest. A special memento was presented to Shri Sanjay Seth by Shri Pawan Agrawal trustee member of the school as a token of respect and gratitude. Shri Pramod Agrawal also announced scholarships for the students securing the first position in their respective classes, encouraging them to continue their pursuit of excellence.","The occasion was further honoured by the presence of Dr. Renu Agrawal, Academic Director, Mr. Praneet Agrawal, Member of SMC along with other members of the School Managing Committee. The programme was anchored by Ms. Ananya Pandey, and the Vote of Thanks was proposed by Mrs. Seema Chitlangia, Principal.","The ceremony concluded on a joyful and inspiring note, celebrating the achievements of the students and marking the successful culmination of the session."]}}
const articleImages: Record<number,string[]> = {
  2:["/assets/annual-report/director.jpg"],
  5:[
    "/assets/annual-report/inauguration-aa.jpg",
    "/assets/annual-report/inauguration-bb.jpg",
    "/assets/annual-report/inauguration-cc.jpg",
    "/assets/annual-report/inauguration-dd.jpg",
    "/assets/annual-report/inauguration-ee.jpg",
    "/assets/annual-report/inauguration-ff.jpg",
  ],
  6:[
    "/assets/annual-report/independence-01.jpg",
    "/assets/annual-report/independence-02.jpg",
    "/assets/annual-report/independence-03.jpg",
    "/assets/annual-report/independence-04.jpg",
    "/assets/annual-report/independence-05.jpg",
    "/assets/annual-report/independence-06.jpg",
    "/assets/annual-report/independence-07.jpg",
  ],
  8:[
    "/assets/annual-report/rangoli-01.jpg",
    "/assets/annual-report/rangoli-02.jpg",
    "/assets/annual-report/rangoli-03.jpg",
    "/assets/annual-report/rangoli-04.jpg",
    "/assets/annual-report/rangoli-05.jpg",
    "/assets/annual-report/rangoli-06.jpg",
    "/assets/annual-report/rangoli-07.jpg",
  ],
  9:[
    "/assets/annual-report/prize-01.jpg",
    "/assets/annual-report/prize-02.jpg",
    "/assets/annual-report/prize-03.jpg",
    "/assets/annual-report/prize-04.jpg",
    "/assets/annual-report/prize-05.jpg",
    "/assets/annual-report/prize-06.jpg",
  ],
  10:[
    "/assets/annual-report/fancy-library-01.jpg",
    "/assets/annual-report/fancy-library-02.jpg",
    "/assets/annual-report/fancy-library-03.jpg",
    "/assets/annual-report/fancy-library-04.jpg",
    "/assets/annual-report/fancy-library-05.jpg",
  ],
  11:[
    "/assets/annual-report/children-01.jpg",
    "/assets/annual-report/children-02.jpg",
    "/assets/annual-report/children-03.jpg",
    "/assets/annual-report/children-04.jpg",
    "/assets/annual-report/children-05.jpg",
  ],
  12:[
    "/assets/annual-report/medical-01.jpg",
    "/assets/annual-report/medical-02.jpg",
    "/assets/annual-report/medical-03.jpg",
    "/assets/annual-report/medical-04.jpg",
    "/assets/annual-report/medical-05.jpg",
    "/assets/annual-report/medical-06.jpg",
    "/assets/annual-report/medical-07.jpg",
    "/assets/annual-report/medical-08.jpg",
  ],
  13:[
    "/assets/annual-report/fancy-fiesta-01.jpg",
    "/assets/annual-report/fancy-fiesta-02.jpg",
    "/assets/annual-report/fancy-fiesta-03.jpg",
    "/assets/annual-report/fancy-fiesta-04.jpg",
    "/assets/annual-report/fancy-fiesta-05.jpg",
    "/assets/annual-report/fancy-fiesta-06.jpg",
  ],
  14:[
    "/assets/annual-report/speech-01.jpg",
    "/assets/annual-report/speech-02.jpg",
    "/assets/annual-report/speech-03.jpg",
    "/assets/annual-report/speech-04.jpg",
    "/assets/annual-report/speech-05.jpg",
    "/assets/annual-report/speech-06.jpg",
  ],
  15:[
    "/assets/annual-report/yellow-01.jpg","/assets/annual-report/yellow-02.jpg",
    "/assets/annual-report/yellow-03.jpg","/assets/annual-report/yellow-04.jpg",
    "/assets/annual-report/yellow-05.jpg","/assets/annual-report/yellow-06.jpg",
    "/assets/annual-report/yellow-07.jpg",
  ],
  16:[
    "/assets/annual-report/christmas-01.jpg","/assets/annual-report/christmas-02.jpg",
    "/assets/annual-report/christmas-03.jpg","/assets/annual-report/christmas-04.jpg",
    "/assets/annual-report/christmas-05.jpg",
  ],
  17:["/assets/annual-report/youth-01.jpg","/assets/annual-report/youth-02.jpg"],
  18:[
    "/assets/annual-report/basant-01.jpg","/assets/annual-report/basant-02.jpg",
    "/assets/annual-report/basant-03.jpg","/assets/annual-report/basant-04.jpg",
  ],
  19:[
    "/assets/annual-report/republic-01.jpg","/assets/annual-report/republic-02.jpg",
    "/assets/annual-report/republic-03.jpg","/assets/annual-report/republic-04.jpg",
    "/assets/annual-report/republic-05.jpg","/assets/annual-report/republic-06.jpg",
    "/assets/annual-report/republic-07.jpg","/assets/annual-report/republic-08.jpg",
  ],
  22:[
    "/assets/annual-report/space-01.jpg","/assets/annual-report/space-02.jpg",
    "/assets/annual-report/space-03.jpg","/assets/annual-report/space-04.jpg",
    "/assets/annual-report/space-05.jpg",
  ],
  23:[
    "/assets/annual-report/science-city-01.jpg","/assets/annual-report/science-city-02.jpg",
    "/assets/annual-report/science-city-03.jpg","/assets/annual-report/science-city-04.jpg",
    "/assets/annual-report/science-city-05.jpg",
  ],
  24:[
    "/assets/annual-report/magic-01.jpg","/assets/annual-report/magic-02.jpg",
    "/assets/annual-report/magic-03.jpg",
  ],
  25:[
    "/assets/annual-report/felicitation-01.jpg","/assets/annual-report/felicitation-02.jpg",
    "/assets/annual-report/felicitation-03.jpg","/assets/annual-report/felicitation-04.jpg",
    "/assets/annual-report/felicitation-05.jpg","/assets/annual-report/felicitation-06.jpg",
    "/assets/annual-report/felicitation-07.jpg","/assets/annual-report/felicitation-08.jpg",
  ],
};
const articles: Article[] = titles.map((title,i)=>({title,...copy[i+1],images:articleImages[i+1]}));
type ContentsEntry = { number: number; title: string; page: number };
type PageData =
  | { kind: "cover"; image: string; alt: string }
  | { kind: "contents"; entries: ContentsEntry[]; continuation: boolean }
  | { kind: "story"; article: Article; serial: number; paragraphs: string[]; images: string[]; continuation: boolean }
  | { kind: "blank" };

const CONTENTS_PER_PAGE = 9;
const TEXT_BUDGET = 1120;

function splitParagraphs(paragraphs: string[] = []) {
  if (!paragraphs.length) return [[]];
  const groups: string[][] = [];
  let group: string[] = [];
  let used = 0;
  for (const paragraph of paragraphs) {
    if (group.length && used + paragraph.length > TEXT_BUDGET) {
      groups.push(group);
      group = [];
      used = 0;
    };
    group.push(paragraph);
    used += paragraph.length;
  }
  if (group.length) groups.push(group);
  return groups;
}

const articleChunks = articles.map((article, index) => {
  const textGroups=splitParagraphs(article.paragraphs);
  const imageGroups=Array.from({length:Math.ceil((article.images?.length??0)/2)},(_,part)=>article.images!.slice(part*2,part*2+2));
  const groups=article.paragraphs?.length
    ? [...textGroups.map(paragraphs=>({paragraphs,images:[]})),...imageGroups.map(images=>({paragraphs:[],images}))]
    : imageGroups.length?imageGroups.map(images=>({paragraphs:[],images})):[{paragraphs:[],images:[]}];
  return groups.map((group,part)=>({kind:"story" as const,article,serial:index+1,...group,continuation:part>0}));
});
const contentsPageCount = Math.ceil(titles.length / CONTENTS_PER_PAGE);
const articleStartPages: number[] = [];
let runningPage = contentsPageCount + 1;
articleChunks.forEach((chunks) => { articleStartPages.push(runningPage); runningPage += chunks.length; });
const contentsEntries: ContentsEntry[] = titles.map((title, index) => ({ number: index + 1, title, page: articleStartPages[index] }));
const bookPages: PageData[] = [
  { kind: "cover", image: "/assets/img2.jpeg", alt: "Srijan Valley School — Where curiosity grows into character" },
  ...Array.from({ length: contentsPageCount }, (_, index) => ({ kind: "contents" as const, entries: contentsEntries.slice(index * CONTENTS_PER_PAGE, (index + 1) * CONTENTS_PER_PAGE), continuation: index > 0 })),
  ...articleChunks.flat(),
  { kind: "cover", image: "/assets/img1.jpeg", alt: "Srijan Valley School — Let’s create what comes next" },
];
if (bookPages.length % 2 === 0) bookPages.splice(bookPages.length - 1, 0, { kind: "blank" });

function Footer({ n }: { n: number }) { return <footer><span>Srijan Valley School</span><b>{String(n).padStart(2, "0")}</b></footer>; }
function PageSheet({ data, pageNumber }: { data?: PageData; pageNumber: number }) {
  if (!data || data.kind === "blank") return <div className="paper blank-page" />;
  if (data.kind === "cover") return <div className="cover"><Image src={data.image} alt={data.alt} fill sizes="(max-width: 760px) 92vw, 520px" priority={pageNumber === 0} /></div>;
  if (data.kind === "contents") return <div className="paper contents"><small>Annual Chronicle 2025–26</small><h1>{data.continuation ? "Contents continued" : "Contents"}</h1><section>{data.entries.map((entry) => <div key={entry.number}><b>{String(entry.number).padStart(2, "0")}</b><span>{entry.title}</span><i aria-hidden="true" /><em>{String(entry.page).padStart(2, "0")}</em></div>)}</section><Footer n={pageNumber} /></div>;
  return <div className={`paper story ${data.paragraphs.length||data.images.length ? "" : "empty"} ${data.images.length===1?"portrait-story":""}`}><small>{data.continuation ? `Continued · ${String(data.serial).padStart(2, "0")}` : `Feature · ${String(data.serial).padStart(2, "0")}`}</small><h1>{data.article.title}</h1><i className="rule" />{data.paragraphs.length > 0 && <section className="copy">{data.paragraphs.map((paragraph, index) => <p className={paragraph.includes("\n")?"signature":undefined} key={index}>{paragraph}</p>)}{data.article.result && !data.continuation && <p className="result">{data.article.result}</p>}</section>}{data.images.length>0&&<section className={`story-gallery gallery-${data.images.length}`}>{data.images.map((src,index)=><figure key={src}><Image src={src} alt={`${data.article.title} — photograph ${index+1}`} fill sizes="(max-width: 700px) 84vw, 38vw" /></figure>)}</section>}<Footer n={pageNumber} /></div>;
}
export default function Home(){
  const [page,setPage]=useState(0);
  const [isMobile,setIsMobile]=useState(false);
  const [turning,setTurning]=useState<{direction:"next"|"previous";target:number}|null>(null);
  const start=useRef<number|null>(null);
  const lastSpread=isMobile?bookPages.length-1:bookPages.length-2;
  const turn=useCallback((direction:"next"|"previous")=>{
    if(turning)return;
    const target=isMobile
      ? direction==="next"?Math.min(lastSpread,page+1):Math.max(0,page-1)
      : direction==="next"?Math.min(lastSpread,page===0?1:page+2):Math.max(0,page===1?0:page-2);
    if(target===page)return;
    setTurning({direction,target});
  },[isMobile,lastSpread,page,turning]);
  const finishTurn=useCallback(()=>{
    if(!turning)return;
    setPage(turning.target);
    setTurning(null);
  },[turning]);
  const prev=useCallback(()=>turn("previous"),[turn]);
  const next=useCallback(()=>turn("next"),[turn]);
  useEffect(()=>{
    const query=window.matchMedia("(max-width: 700px)");
    const update=()=>{
      setIsMobile(query.matches);
      setTurning(null);
      if(!query.matches)setPage(current=>current===0?0:current%2===0?current-1:current);
    };
    update();
    query.addEventListener("change",update);
    return()=>query.removeEventListener("change",update);
  },[]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==="ArrowLeft")prev();if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();next()}};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[prev,next]);
  const leftPage=turning?.direction==="previous"?turning.target:page;
  const rightPage=page===0&&!turning?0:turning?.direction==="next"?turning.target+1:page+1;
  return <main onTouchStart={e=>start.current=e.changedTouches[0].clientX} onTouchEnd={e=>{if(start.current===null)return;const d=e.changedTouches[0].clientX-start.current;if(d>55)prev();if(d< -55)next();start.current=null}}>
    <header><div className="brand"><b>SVS</b><span><strong>Srijan Valley School</strong><small>Annual Chronicle 2025–26</small></span></div><div className="count">{page===0?"Cover":isMobile?String(page).padStart(2,"0"):`${String(page).padStart(2,"0")}–${String(Math.min(page+1,bookPages.length-1)).padStart(2,"0")}`} / {String(bookPages.length-1).padStart(2,"0")}</div></header>
    <div className="reader"><div className={`stage ${isMobile?"mobile-book":""} ${turning?"is-turning":""} ${page===0&&!turning&&!isMobile?"is-closed":""} ${page===0&&turning?.direction==="next"&&!isMobile?"is-opening":""}`} aria-label="Digital school chronicle">
      {isMobile?<div className="page mobile-page"><PageSheet data={bookPages[turning?turning.target:page]} pageNumber={turning?turning.target:page}/></div>:<><div className="page left-page"><PageSheet data={page===0&&!turning?undefined:bookPages[leftPage]} pageNumber={leftPage}/></div><div className="page right-page"><PageSheet data={bookPages[rightPage]} pageNumber={rightPage}/></div></>}
      {turning?.direction==="next"&&<div className="turning-leaf turn-next" onAnimationEnd={event=>{if(event.currentTarget===event.target)finishTurn()}}><div className="leaf-face leaf-front"><PageSheet data={bookPages[isMobile?page:page===0?0:page+1]} pageNumber={isMobile?page:page===0?0:page+1}/></div><div className="leaf-face leaf-back"><PageSheet data={bookPages[turning.target]} pageNumber={turning.target}/></div></div>}
      {turning?.direction==="previous"&&<div className="turning-leaf turn-previous" onAnimationEnd={event=>{if(event.currentTarget===event.target)finishTurn()}}><div className="leaf-face leaf-front"><PageSheet data={bookPages[page]} pageNumber={page}/></div><div className="leaf-face leaf-back"><PageSheet data={bookPages[isMobile?turning.target:turning.target+1]} pageNumber={isMobile?turning.target:turning.target+1}/></div></div>}
      <span className="book-spine" aria-hidden="true" />
      <button className="page-hit page-hit-previous" onClick={prev} disabled={!page||Boolean(turning)} aria-label="Turn to the previous pages" />
      <button className="page-hit page-hit-next" onClick={next} disabled={page===lastSpread||Boolean(turning)} aria-label="Turn to the next pages" />
    </div><nav><button onClick={prev} disabled={!page||Boolean(turning)} aria-label="Previous spread">‹</button><span><i style={{width:`${Math.max(3,(page+1)/(lastSpread+1)*100)}%`}}/></span><button onClick={next} disabled={page===lastSpread||Boolean(turning)} aria-label="Next spread">›</button></nav><p className="hint">Click a page edge, use arrow keys, or swipe to turn the page</p></div>
  </main>
}
