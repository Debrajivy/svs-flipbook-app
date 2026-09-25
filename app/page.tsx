"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ResultRow = { label: string; value: string; participants?: string[] };
type CompetitionResult = {
  theme: string;
  date: string;
  heading: string;
  groupHeading: string;
  rankHeadings: string[];
  rows: { group: string; winners: string[][] }[];
};
type Article = { title: string; paragraphs?: string[]; result?: string; results?: ResultRow[]; resultColumns?: [string, string, string?]; resultCaption?: string; images?: string[] };
type StudentSubmission = {
  title: string;
  author: string;
  className: string;
  rollNumber?: string;
  image: string;
  language: "hi" | "en";
  format?: "article" | "poem";
  pageBreakAfter?: number;
  paragraphs: string[];
};
type MentorMessage = {
  name: string;
  image: string;
  message: string;
};
/* Legacy contents list retained in source history for reference.
"Message from the Chairman","Message from the Founder & Director","Message from the Academic Director","Annual Report 2025–26: A Year of Growth & Achievement","A New Beginning: Inauguration of Srijan Valley School","Celebrating the Spirit of Freedom: Independence Day","Unveiling Creativity: Science, Art & Craft Exhibition","Colours of Creativity: Inter-House Rangoli Competition (with Results)","Celebrating Excellence: Prize Distribution Ceremony","Srijan Valley School Shines at the International Library & Cultural Centre (Fancy Dress Event)","Celebrating Childhood: Children’s Day","Caring for Our Children: Medical Health Check-Up Camp","Fancy Dress Fiesta: A Splash of Imagination (with Results)","Speak to Inspire: Speech Competition (with Results)","A Bright Celebration: Yellow Day","The Magic of Christmas: Christmas Celebration","Remembering Swami Vivekananda: National Youth Day","Celebrating Knowledge & Tradition: Basant Panchami","Honouring the Nation: Republic Day Celebration","Nurturing Talents, Celebrating Achievements (Curricular Activities & Results)","Colours on Canvas: Drawing Competition","Exploring Space: Space on Wheels","Discovering the Wonders of Science: Visit to Science City","A Day of Wonder & Laughter: Magic Show","Honouring Excellence: Felicitation Ceremony","Young Minds, Creative Words: Articles & Poems by Our Students","Our Mentors Speak: Teachers’ Messages"];
*/
const titles = [
  "Message from the Chairman",
  "Message from the Founder & Director",
  "Message from the Academic Director",
  "From the Principal’s Desk",
  "Annual Report 2025‑26: A Year of Growth & Achievement",
  "A New Beginning: Inauguration of Srijan Valley School",
  "Celebrating the Spirit of Freedom: Independence Day",
  "Unveiling Creativity: Science, Art & Craft Exhibition",
  "Colours of Creativity: Inter-House Rangoli Competition",
  "Celebrating Excellence: Prize Distribution Ceremony",
  "Srijan Valley School Shines at the International Library & Cultural Centre (Fancy Dress Event)",
  "Celebrating Childhood: Children’s Day",
  "Caring for Our Children: Medical Health Check-Up Camp",
  "Fancy Dress Fiesta: A Splash of Imagination",
  "Speak to Inspire: Speech Competition",
  "A Bright Celebration: Yellow Day",
  "The Magic of Christmas: Christmas Celebration",
  "Remembering Swami Vivekananda: National Youth Day",
  "Celebrating Knowledge & Tradition: Basant Panchami",
  "Honouring the Nation: Republic Day Celebration",
  "Nurturing Talents, Celebrating Achievements",
  "Exploring Space: Space on Wheels",
  "Discovering the Wonders of Science: Visit to Science City",
  "A Day of Wonder & Laughter: Magic Show",
  "Honouring Excellence: Felicitation Ceremony",
  "Young Minds, Creative Words",
  "Our Mentors Speak: Teachers’ Messages",
];

const copy: Record<number, Omit<Article,"title">> = {
1:{paragraphs:["I am proud to see Srijan Valley School advancing its mission of bringing opportunity and excellence to children in rural communities. A school is more than a place of learning; it is where dreams take root, character is shaped and young minds gain the courage to imagine a better future.","We believe that every child deserves access to quality education, regardless of where they are born. With guidance, resources and encouragement, our students can achieve great heights and contribute meaningfully to society.","Our goal is to nurture not only capable students, but also compassionate and responsible citizens. True success lies in their integrity, perseverance and service to their families, communities and nation.","I sincerely appreciate our dedicated teachers, supportive parents and hardworking students. May this magazine celebrate the creativity and achievements of our young learners.","With warm wishes for the continued growth of Srijan Valley School and a bright future in which every student learns, serves and shines.","Govind Lall Agrawal\n"]},
2:{paragraphs:["A school magazine is more than a collection of articles, photographs and memories; it is a reflection of the vibrant life of the school. It provides our students with a platform to express their thoughts, creativity, talents and achievements. It also brings together the collective efforts of students, teachers and the school community, preserving precious memories and showcasing the values and vision of the institution.","The establishment of Srijan Valley School is rooted in a cherished dream—to bring quality education to children in the rural areas and provide them with facilities and opportunities at par with those available in the best educational institutions. My vision is not merely to impart academic knowledge, but to nurture confident, responsible, compassionate and capable individuals.","I believe that every child deserves the opportunity to dream big and receive the right guidance and environment to transform those dreams into reality. Through a balanced blend of academics, co-curricular activities, technology, sports, creativity and value-based education, we strive to develop the complete personality of every child.","My  dream will be truly fulfilled when the young learners of Srijan Valley School step into prestigious institutions for higher education, excel in their chosen fields and above all, grow into responsible citizens who contribute meaningfully to the progress and development of our nation.","As we present this magazine, I congratulate our students and teachers for their creativity, dedication and enthusiasm. May these pages inspire our children to explore, learn, create and always strive for excellence.","With best wishes for a bright and fulfilling future.","Pramod Agrawal\n"]},
3:{paragraphs:["It gives me immense pleasure and satisfaction to see our students and teachers coming together with enthusiasm and dedication for the publication of the first edition of our school magazine. This magazine is not merely a collection of articles and photographs; it is a beautiful reflection of the creativity, talent, achievements and experiences of our young learners.","I am particularly happy to see our students getting an opportunity to express their thoughts, ideas and imagination through their own words. Such platforms help children develop confidence, creativity, communication skills and a sense of responsibility.","The wholehearted involvement of our teachers in guiding and encouraging the students is truly appreciable. Their efforts have helped transform the ideas of our young minds into meaningful contributions.","As we bring out this first edition, I hope the magazine becomes a cherished record of our school’s growth and continues to inspire our children to learn, explore and achieve greater heights.","My heartfelt appreciation and best wishes to all the students, teachers and everyone who has contributed to making this first edition a success. May this be the beginning of many more wonderful editions in the years to come.","Dr. Renu Agrawal\n"]},
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
const requestedCopy: Record<number, Omit<Article, "title">> = {
  4: { paragraphs: [
    "“Education is not merely about filling young minds with knowledge; it is about nurturing them to think, create, lead and become responsible human beings.”",
    "It gives me immense pleasure to present the Annual Magazine for the session 2025–26 of Srijan Valley School. This magazine is a reflection of the creativity, imagination, talent and achievements of our young learners. I feel proud to see our students expressing their thoughts and ideas through articles, poems, stories and other creative contributions.",
    "At Srijan Valley School, we firmly believe that education goes beyond textbooks and examinations. Our magazine provides a meaningful platform for children to explore their interests, express their ideas and showcase their talents with confidence. We encourage every child to participate, create and discover their own potential.",
    "I would like to express my heartfelt gratitude to our Founder and Director, Shri Pramod Agrawal, and our Academic Director, Dr. Renu Agrawal, for their constant guidance, encouragement and unwavering support. Their vision and commitment have been instrumental in creating a nurturing and progressive environment at Srijan Valley School.",
    "I sincerely appreciate the efforts and cooperation of our teachers and students, whose hard work, creativity and enthusiasm have brought this magazine to life.",
    "Our endeavour is to nurture children not only academically but also as confident, responsible and compassionate individuals. We strive to develop qualities such as hard work, discipline, leadership, creativity, effective communication, confidence, good values and a spirit of cooperation.",
    "I hope this magazine inspires our children to dream big, work hard, think creatively and express themselves fearlessly. Let us continue to nurture young minds today and empower them to become confident, capable and responsible citizens of tomorrow.",
    "Seema Chitlangia\n",
  ] },
  5: { paragraphs: [
    "The academic session 2025–26 marks a significant milestone in the journey of Srijan Valley School, as it was the school’s first year of operation. The school commenced its journey on 4 May 2025 with a clear vision of providing quality education in a nurturing, progressive and child-centred environment.",
    "The first year has been a journey of learning, growth, new experiences and achievements. Starting with a small group of enthusiastic learners, Srijan Valley School gradually developed into a vibrant learning community where children were encouraged to learn with curiosity, participate actively and express themselves with confidence.",
    "From the very beginning, the school focused on providing a strong foundation in academics while giving equal importance to personality development, creativity, communication skills, discipline, leadership and values. Activity-based learning, classroom participation and various co-curricular activities were incorporated to make learning meaningful and enjoyable.",
    "Throughout the session, students participated enthusiastically in a wide range of activities and celebrations, exhibitions, competitions, cultural programmes and various special events. Special emphasis was also given to reading, spoken English, computer education, science activities and creative expression.",
    "Srijan Valley School was established by Shri Pramod Agrawal, former Chairman of Coal India Limited, with the vision of providing quality education and holistic development opportunities to children in rural areas.",
    "The sincere efforts of the teachers and the enthusiastic participation of our students have been the greatest strengths of this journey. We, the team of Srijan Valley School, also extend gratitude to the parents for their trust, cooperation and continued support.",
    "As we look back at our first year, we feel proud of how far we have come. At the same time, we recognise that this is only the beginning. The first year has laid the foundation; the years ahead will build the legacy.",
  ] },
  6: { paragraphs: copy[5].paragraphs },
  7: { paragraphs: copy[6].paragraphs },
  8: { paragraphs: ["The school organised an Art, Craft and Science Exhibition on 13 October 2025. Students enthusiastically displayed creative exhibits under the guidance of their teachers.", "The exhibition was inaugurated by Dr. R. K. Sharma, Pithoria. A Parent-Teacher Meeting was also held, during which parents viewed the exhibits and collected their children’s answer sheets.", "The event beautifully reflected the creativity, scientific temperament and collaborative spirit of the students, leaving a lasting impression on everyone present."] },
  9: { paragraphs: copy[8].paragraphs, resultCaption: "Result of Inter-House Rangoli Making Competition", resultColumns: ["Rank", "House", "Name of Participants"], results: [
    { label: "First", value: "Jasmine", participants: ["Ananya Thakur", "Rishabh Kumar", "Ashwini Kumar"] },
    { label: "Second", value: "Lotus", participants: ["Jiya Kumari", "Nishi Keshri", "Krit Kumar"] },
    { label: "Third", value: "Rose", participants: ["Aalita Firdous", "Aditya Kumar", "Ayush Keshri"] },
    { label: "Fourth", value: "Lily", participants: ["Nanis Keshri", "Pari Kumari", "Ayush Kumar Sahu"] },
  ] },
  10: { paragraphs: copy[9].paragraphs },
  11: { paragraphs: copy[10].paragraphs },
  12: { paragraphs: copy[11].paragraphs },
  13: { paragraphs: copy[12].paragraphs },
  14: { paragraphs: copy[13].paragraphs, results: [
    { label: "Nursery", value: "Saransh Kumar" },
    { label: "K.G.", value: "Arav Keshri" },
    { label: "Std I", value: "Abhinav Raj" },
    { label: "Std II", value: "Ayush Kuiry" },
  ] },
  15: { paragraphs: ["Srijan Valley School organised a Speech Competition to encourage students to develop confidence, communication skills and the art of public speaking. The enthusiastic participation of the students made the event engaging and enriching."] },
  16: { paragraphs: copy[15].paragraphs },
  17: { paragraphs: copy[16].paragraphs },
  18: { paragraphs: copy[17].paragraphs },
  19: { paragraphs: copy[18].paragraphs },
  20: { paragraphs: ["Republic Day was celebrated at Srijan Valley School with great enthusiasm and patriotic fervour. The celebration commenced with the unfurling of the National Flag by the Chairman of the School, Shri Govind Lall Agrawal, followed by the National Anthem.", "Addressing the students, Shri Govind Lall Agrawal spoke about the importance of patriotism, responsibility and contributing positively to society. He inspired the children to become responsible citizens and work towards the progress of the nation.", "The programme was beautifully anchored by Ananya Thakur of Class VI. A number of students delivered inspiring speeches reflecting their love for the country and their commitment to serving society. The students pledged to work hard, remain responsible citizens and contribute towards building a stronger and better India.", "The Founder and Director, Shri Pramod Agrawal, Academic Director, Dr. Renu Agrawal, and other esteemed members of the School Managing Committee graced the occasion with their presence.", "The Principal, Mrs. Seema Chitlangia, encouraged the students to work hard as well as work smartly, reminding them that dedication, discipline and a positive attitude are the keys to success.", "The celebration concluded on a patriotic note, leaving the students inspired with a renewed sense of pride, responsibility and love for the nation."] },
  21: { paragraphs: ["Co-curricular activities play a vital role in the holistic development of children. They provide students with opportunities to discover their talents, develop creativity, build confidence, improve communication skills and learn the values of teamwork, discipline and leadership.", "Srijan Valley School is committed to the all-round development of every student. Keeping this vision in mind, a number of co-curricular activities and competitions were organised throughout the session 2025–26. Students participated in these activities with great enthusiasm and showcased their creativity, confidence and talents.", "These activities provided every child with a platform to explore their potential, express themselves freely and learn through experience. The enthusiastic participation of the students made each event successful and memorable. The results of the various activities are given below."] },
  22: { paragraphs: copy[22].paragraphs },
  23: { paragraphs: copy[23].paragraphs },
  24: { paragraphs: ["“Education is not only about studies; a child’s mind also needs moments of joy and recreation.”", "After the completion of the Final Examination, Srijan Valley School organised a Magic Show to refresh and entertain the children. A talented magician presented fascinating magic tricks that left the children amazed and delighted.", "The show was not limited to Srijan Valley students; children from other schools also participated and enjoyed the fun-filled event. It was a memorable day of laughter, excitement and recreation, giving the children a much-needed break after their examinations."] },
  25: { paragraphs: copy[25].paragraphs },
};

const achievementResults: CompetitionResult[] = [
  {
    theme: "Penmanship Perfection",
    date: "01/11/2025",
    heading: "Result of English Handwriting Competition",
    groupHeading: "Group/Class",
    rankHeadings: ["First", "Second", "Third"],
    rows: [
      { group: "Group A\n(Std V & VI)", winners: [["Pari Kumari"], ["Nishi Keshri"], ["Jiya Kumari"]] },
      { group: "Group B\n(Std III & IV)", winners: [["Aradhya Raj"], ["Yash Raj Keshri"], ["Anshika Priya"]] },
      { group: "Group C\n(Std II)", winners: [["Ayush Kuiry"], ["Priyanshu Thakur"], ["–"]] },
      { group: "Group D\n(Std I)", winners: [["Abhinav Raj"], ["–"], ["–"]] },
    ],
  },
  {
    theme: "Expression in Words",
    date: "03/12/2025",
    heading: "Result of Hindi Elocution Competition",
    groupHeading: "Group/Class",
    rankHeadings: ["First", "Second"],
    rows: [
      { group: "Group A\n(Std III & IV)", winners: [["Aradhya Raj\n(Std III)"], ["Pihu Kumari\n(Std III)", "Yash Keshri\n(Std IV)"]] },
      { group: "Group B\n(Std V & VI)", winners: [["Ananya Thakur\n(Std VI)"], ["Ashwini Kumar\n(Std V)", "Jiya Kumari\n(Std VI)"]] },
    ],
  },
  {
    theme: "The Creative Canvas",
    date: "11/02/2026",
    heading: "Result of Drawing Competition",
    groupHeading: "Class",
    rankHeadings: ["Winner’s Name"],
    rows: [
      { group: "Std I", winners: [["Abhinav Raj"]] },
      { group: "Std II", winners: [["Ayush Kuiry"]] },
      { group: "Std III", winners: [["Parween Kumar"]] },
      { group: "Std IV", winners: [["Yash Keshri"]] },
      { group: "Std V", winners: [["Pari Kumari"]] },
      { group: "Std VI", winners: [["Ayush Kumar Sahu"]] },
    ],
  },
];

const articleImages: Record<number,string[]> = {
  2:["/assets/annual-report/director.jpg"],
  5:[
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
const requestedArticleImages: Record<number, string[]> = {
  1: ["/assets/annual-report/chairman.jpeg"],
  2: articleImages[2],
  3: ["/assets/annual-report/academic.jpeg"],
  4: ["/assets/annual-report/principal.jpeg"],
  5: [],
  6: articleImages[5],
  7: articleImages[6],
  8: [
    "/assets/annual-report/exhibition-01.jpg",
    "/assets/annual-report/exhibition-02.jpg",
    "/assets/annual-report/exhibition-03.jpg",
    "/assets/annual-report/exhibition-04.jpg",
    "/assets/annual-report/exhibition-05.jpg",
    "/assets/annual-report/exhibition-06.jpg",
  ],
  9: articleImages[8],
  10: articleImages[9],
  11: articleImages[10],
  12: articleImages[11].filter((src) => src !== "/assets/annual-report/children-05.jpg"),
  13: articleImages[12].filter((src) => !["/assets/annual-report/medical-05.jpg", "/assets/annual-report/medical-06.jpg"].includes(src)),
  14: articleImages[13],
  15: articleImages[14],
  16: articleImages[15],
  17: articleImages[16],
  18: articleImages[17],
  19: articleImages[18],
  20: articleImages[19],
  22: articleImages[22],
  23: articleImages[23],
  24: articleImages[24],
  25: articleImages[25],
};
const portraitImagePaths = new Set([
  "/assets/annual-report/children-01.jpg", "/assets/annual-report/children-02.jpg", "/assets/annual-report/children-04.jpg", "/assets/annual-report/children-05.jpg",
  "/assets/annual-report/christmas-01.jpg", "/assets/annual-report/christmas-05.jpg", "/assets/annual-report/fancy-fiesta-01.jpg", "/assets/annual-report/fancy-fiesta-02.jpg",
  "/assets/annual-report/fancy-fiesta-03.jpg", "/assets/annual-report/fancy-fiesta-05.jpg", "/assets/annual-report/fancy-fiesta-06.jpg", "/assets/annual-report/fancy-library-01.jpg",
  "/assets/annual-report/fancy-library-02.jpg", "/assets/annual-report/fancy-library-03.jpg", "/assets/annual-report/fancy-library-04.jpg", "/assets/annual-report/independence-02.jpg",
  "/assets/annual-report/independence-03.jpg", "/assets/annual-report/independence-04.jpg", "/assets/annual-report/independence-05.jpg", "/assets/annual-report/rangoli-01.jpg",
  "/assets/annual-report/rangoli-02.jpg", "/assets/annual-report/rangoli-03.jpg", "/assets/annual-report/rangoli-05.jpg", "/assets/annual-report/rangoli-07.jpg",
  "/assets/annual-report/republic-01.jpg", "/assets/annual-report/republic-05.jpg", "/assets/annual-report/republic-08.jpg", "/assets/annual-report/space-04.jpg",
  "/assets/annual-report/exhibition-02.jpg", "/assets/annual-report/exhibition-03.jpg", "/assets/annual-report/exhibition-05.jpg",
  "/assets/annual-report/speech-01.jpg", "/assets/annual-report/speech-02.jpg", "/assets/annual-report/speech-03.jpg", "/assets/annual-report/speech-04.jpg",
  "/assets/annual-report/speech-05.jpg", "/assets/annual-report/speech-06.jpg", "/assets/annual-report/yellow-01.jpg", "/assets/annual-report/yellow-02.jpg",
  "/assets/annual-report/yellow-03.jpg", "/assets/annual-report/yellow-04.jpg",
]);
const articles: Article[] = titles.map((title, i) => ({
  title,
  ...copy[i + 1],
  ...requestedCopy[i + 1],
  images: requestedArticleImages[i + 1] ?? articleImages[i + 1],
}));
type ContentsEntry = { number: number; title: string; page: number };
type PageData =
  | { kind: "cover"; image: string; alt: string }
  | { kind: "contents"; entries: ContentsEntry[]; continuation: boolean }
  | { kind: "story"; article: Article; serial: number; paragraphs: string[]; images: string[]; continuation: boolean; openingPortrait?: boolean; resultsPage?: boolean; competitionResult?: CompetitionResult }
  | { kind: "student"; article: Article; serial: number; student: StudentSubmission; paragraphs: string[]; continuation: boolean; showProfile: boolean }
  | { kind: "mentors"; article: Article; serial: number; mentors: MentorMessage[]; continuation: boolean }
  | { kind: "blank" };

const CONTENTS_PER_PAGE = 9;
const TEXT_BUDGET = 1120;
const exhibitionImageGroups = [
  ["/assets/annual-report/exhibition-01.jpg", "/assets/annual-report/exhibition-02.jpg", "/assets/annual-report/exhibition-03.jpg"],
  ["/assets/annual-report/exhibition-04.jpg", "/assets/annual-report/exhibition-05.jpg", "/assets/annual-report/exhibition-06.jpg"],
];

const studentSubmissions: StudentSubmission[] = [
  {
    title: "तिरंगा – एकता, गौरव और स्वाभिमान का प्रतीक",
    author: "आरोही सिंह",
    className: "कक्षा 7",
    image: "/assets/student1.jpeg",
    language: "hi",
    paragraphs: [
      "हमारा राष्ट्रीय ध्वज तिरंगा हर भारतीय के लिए शान और गौरव का प्रतीक है। इसमें तीन मुख्य रंग होते हैं। सबसे ऊपर केसरिया रंग साहस और बलिदान को दर्शाता है। बीच में सफेद रंग शांति और सच्चाई का संदेश देता है और सबसे नीचे हरा रंग हमारे देश की हरियाली और खुशहाली को दर्शाता है। सफेद पट्टी के बीच में नीले रंग का अशोक चक्र है, जो हमें हमेशा आगे बढ़ते रहने की सीख देता है।",
      "यह तिरंगा हमें उन वीर शहीदों की याद दिलाता है, जिन्होंने देश को आज़ाद कराने के लिए अपना सब कुछ न्योछावर कर दिया। जब भी हम तिरंगे को आसमान में लहराते हुए देखते हैं, हमारा सिर गर्व से ऊँचा हो जाता है। स्कूल की प्रार्थना के माध्यम से हम सब यह संकल्प लेते हैं कि हम हमेशा अपने तिरंगे का सम्मान करेंगे और देश के अच्छे नागरिक बनेंगे।",
      "जय हिंद!",
    ],
  },
  {
    title: "छोटे-छोटे प्रयास, बड़े बदलाव",
    author: "सृष्टि कुमारी",
    className: "कक्षा 6",
    image: "/assets/student4.jpeg",
    language: "hi",
    paragraphs: [
      "छोटे-छोटे प्रयास मिलकर बड़े बदलाव लाते हैं। यदि हम रोज थोड़ा-थोड़ा पढ़ें, तो हमारी पढ़ाई अच्छी हो सकती है और हम अच्छे अंक प्राप्त कर सकते हैं। इसी तरह हमें अपने आसपास सफाई रखनी चाहिए, पेड़-पौधे लगाने चाहिए, पानी और बिजली की बचत करनी चाहिए तथा अपने बड़ों का सम्मान करना चाहिए।",
      "हमारे छोटे-छोटे अच्छे कार्य समाज और पर्यावरण पर बड़ा प्रभाव डाल सकते हैं। यदि हर व्यक्ति अपने घर और आसपास की सफाई का ध्यान रखे, तो हमारा पूरा मोहल्ला स्वच्छ बन सकता है। यदि हम एक पेड़ लगाएँ और उसकी देखभाल करें, तो वह आगे चलकर हमें छाया, फल और स्वच्छ हवा दे सकता है।",
      "इसलिए हमें यह नहीं सोचना चाहिए कि हमारा छोटा-सा प्रयास किसी काम का नहीं है। बूंद-बूंद से ही समुद्र बनता है। हमें हमेशा अच्छे कार्य करने का छोटा-सा प्रयास करते रहना चाहिए। एक छोटी शुरुआत ही बड़े बदलाव की पहली सीढ़ी होती है।",
    ],
  },
  {
    title: "Time Management",
    author: "Umme Ruman",
    className: "Class 7",
    image: "/assets/student2.jpeg",
    language: "en",
    pageBreakAfter: 4,
    paragraphs: [
      "Time and tide wait for none. Time is one of the most precious things in our life. We can recover many losses in life, but we can never recover the time that we have lost. Even millions of dollars cannot bring back lost time. Therefore, we should use our time wisely and carefully.",
      "We should invest our time in activities that are useful for our future. As students, it is our duty to utilise our time in such a way that it increases our knowledge and helps us grow academically and personally. Even a small waste of time can sometimes lead to a big loss in life.",
      "Time management does not mean working all day. It means knowing what is important and giving the right amount of time to the right task. Imagine your time as a handful of sand. If you hold it carefully, you can keep it, but if you let it slip through your fingers, you can never collect the same grains again.",
      "As students, we often waste our precious time scrolling through our phones, watching unnecessary videos, playing games, or simply saying, “I will do it later.” As the saying goes, “Tomorrow is often the busiest day of the week.”",
      "The secret of successful people is not that they have more time; they simply use their time more wisely. Therefore, we should make a proper timetable and follow it sincerely.",
      "We will respect time.\nWe will value every minute.\nWe will stop postponing our dreams.\nWe will use every day as an opportunity to become better than yesterday.",
      "Time is life. Waste your time, and you waste a part of your life. Respect your time, and you give yourself a chance to create a beautiful future.",
    ],
  },
  {
    title: "जल है तो कल है",
    author: "नैंसी केशरी",
    className: "कक्षा 7",
    image: "/assets/student3.jpeg",
    language: "hi",
    paragraphs: [
      "जल केवल पानी नहीं है, जल ही जीवन है। हमारे शरीर में पानी है, खेतों में पानी है, पेड़-पौधों में पानी है और प्रकृति की हर धड़कन में पानी है। यदि जल है, तो जीवन है; यदि जल नहीं है, तो जीवन की कल्पना भी नहीं की जा सकती।",
      "ज़रा सोचिए—अगर एक दिन हमारे घरों में पानी न आए, तो क्या होगा? न नहाना संभव होगा, न खाना बनाना, न सफाई और न ही खेती। और यदि यही स्थिति हमेशा के लिए हो जाए, तो मनुष्य, पशु-पक्षियों और पेड़-पौधों का अस्तित्व ही संकट में पड़ जाएगा।",
      "दुर्भाग्य से, आज हम जल का महत्व समझने के बावजूद इसका अत्यधिक दुरुपयोग कर रहे हैं। नल खुला छोड़ देना, आवश्यकता से अधिक पानी बहाना, तालाबों और नदियों को प्रदूषित करना तथा पेड़ों की अंधाधुंध कटाई करना—ये सभी हमारे भविष्य के लिए खतरे की घंटी हैं।",
      "आज कई क्षेत्रों में लोग पानी की एक-एक बूंद के लिए संघर्ष कर रहे हैं। भूजल का स्तर लगातार नीचे जा रहा है। यदि हमने समय रहते जल संरक्षण नहीं किया, तो आने वाली पीढ़ियाँ हमें कभी माफ नहीं करेंगी।",
      "हमें याद रखना चाहिए—\n\n“बूंद-बूंद से सागर बनता है,\nबूंद-बूंद से जीवन चलता है।”",
      "जल हमारे जीवन का आधार है। इसलिए हमें पानी की हर बूंद का महत्व समझना चाहिए और जल को बचाने का संकल्प लेना चाहिए। आज जल बचाएँगे, तभी हमारा कल सुरक्षित होगा।",
    ],
  },
  {
    title: "The Joy of Learning",
    author: "Jiya Kumari",
    className: "Class 7",
    image: "/assets/student5.jpeg",
    language: "en",
    paragraphs: [
      "Learning is one of the most beautiful and exciting parts of life. The joy of learning means feeling happy and curious when we discover something new. Every day gives us a chance to learn something different. We learn from our teachers, parents, friends, books, nature, and our own experiences.",
      "Learning is not only about studying textbooks or getting good marks in examinations. It helps us understand the world, develop new skills, solve problems, and become confident. When we learn something difficult and finally understand it, we feel a great sense of achievement. Even our mistakes can teach us valuable lessons and help us improve.",
      "A curious mind always wants to know more. Asking questions, reading books, doing experiments, and observing things around us can make learning interesting. We should never be afraid of making mistakes because mistakes are a natural part of learning.",
      "The joy of learning makes us more creative, confident, and independent. It also helps us achieve our dreams and become responsible people. Therefore, we should enjoy the process of learning and always remain curious. Learning is a lifelong journey, and every new thing we learn adds something valuable to our lives.",
    ],
  },
  {
    title: "शिक्षा का महत्व",
    author: "आदित्य राज",
    className: "कक्षा 6",
    image: "/assets/student6.jpeg",
    language: "hi",
    format: "poem",
    paragraphs: [
      "ज्ञान से बड़ा कोई धन नहीं,\nऔर शिक्षा से बड़ा उपहार नहीं।\nजो सीखने की चाह रखता है,\nउसके लिए कोई हार नहीं।",
      "किताबें रास्ता दिखाती है,\nऔर मंजिल तक पहुंचाती हैं।\nशिक्षा ही वो रोशनी है,\nजो अंधेरे को मिटाती है।",
      "इसलिए शिक्षा के सम्मान करो,\nज्ञान को अपना हथियार बनाओ।\nक्योंकि जो सीखता रहता है,\nवही जीवन में आगे बढ़ पाता है।",
    ],
  },
  {
    title: "The Power of Positive Thoughts",
    author: "Aradhya Kumari Sahu",
    className: "Class VI",
    rollNumber: "Roll No. 11",
    image: "/assets/AradhyaKumariSahu.jpg.jpeg",
    language: "en",
    paragraphs: [
      "Life is full of mysteries. Sometimes it is all about happiness, and at other times we face a lot of struggles. So the question arises: what should we do in both situations, and how do we balance everything when life is on a rollercoaster? The answer is positive thinking. When everything is fine and we are winning in life, we should be humble and thankful, and show gratitude to others. When our life hits rock bottom, we should follow the same process, adding a little extra hard work to achieve the life we want.",
      "The first step is always trying—it does not matter if we fail, as long as we learn from our mistakes. The second step is following guidelines and discipline in our lifestyle and being firm about it. The third step is having a strong mindset and surrounding ourselves with positive people. Last but not least, we should never give up on anything. We should try to find happiness in the small events and achievements of our life. One day, we will know that the secret behind every success is always hidden in our positive thinking.",
    ],
  },
];

const mentorMessages: MentorMessage[] = [
  {
    name: "Abhijeet Sir",
    image: "/assets/AbhijeetSirPic.jpg.jpeg",
    message: "The beautiful thing about learning is that no one can take it away from you. At Srijan Valley School, we provide the best education to our students so that they can flourish throughout their lives.",
  },
  {
    name: "Soumya Sir",
    image: "/assets/SoumyaSirPic.png",
    message: "A teacher is one who shapes the lives of young generations. As teachers, our role is not just to explain the topics given in books, but also to make students aware of how to use things practically in their lives. The true success of any student lies in their knowledge and skills.",
  },
  {
    name: "Priyanka Devi Ma’am",
    image: "/assets/PriyankaDeviMaam Pic.jpg.jpeg",
    message: "Srijan Valley School is a wonderful place of learning and growth. Our school provides a positive and friendly environment for students. Teachers guide and support every child with care and dedication. We focus on education, discipline, creativity and good values. Our aim is to help every student become confident, responsible and successful.",
  },
  {
    name: "Saima Parween",
    image: "/assets/SaimaParweenpic.png",
    message: "Respect means treating everyone with kindness, care and good manners. We should respect our parents, teachers, friends, elders and everyone around us. We must listen to others and never hurt or make fun of anyone. Everyone is special and deserves to be valued. Respect others and make the world a better place.",
  },
  {
    name: "Ananya Pandey",
    image: "/assets/AnanyaPandeyPic.jpg.jpeg",
    message: "Teaching is more than a profession; it is a privilege. Every day, I get to shape little minds, build confidence and make learning meaningful. I may teach lessons, but my students teach me patience, kindness and joy. Every question, mistake and little achievement is a part of their journey. My goal is not just to teach, but to leave every child a little more confident than I found them. A teacher’s impact lives far beyond the classroom.",
  },
  {
    name: "Eni Guria",
    image: "/assets/EniGuriaPic.jpg.jpeg",
    message: "Every small effort takes us one step closer to our dreams. Therefore, we should always believe in ourselves and work hard to achieve our goals.",
  },
];

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
  if (index === 25) {
    return studentSubmissions.flatMap((student, submissionIndex) => {
      const paragraphGroups = student.pageBreakAfter
        ? [student.paragraphs.slice(0, student.pageBreakAfter), student.paragraphs.slice(student.pageBreakAfter)]
        : [student.paragraphs];
      return paragraphGroups.map((paragraphs, part) => ({
        kind: "student" as const,
        article,
        serial: index + 1,
        student,
        paragraphs,
        continuation: submissionIndex > 0 || part > 0,
        showProfile: part === 0,
      }));
    });
  }
  if (index === 26) {
    return Array.from({ length: Math.ceil(mentorMessages.length / 2) }, (_, part) => ({
      kind: "mentors" as const,
      article,
      serial: index + 1,
      mentors: mentorMessages.slice(part * 2, part * 2 + 2),
      continuation: part > 0,
    }));
  }
  const isOpeningPortrait = index < 4 && article.images?.length === 1;
  if (isOpeningPortrait) {
    // Use the available space beneath each portrait before continuing the message.
    // These counts also keep the remaining message together on its continuation page.
    const openingParagraphCount = [3, 2, 3, 3][index];
    const openingParagraphs = (article.paragraphs ?? []).slice(0, openingParagraphCount);
    const remainingParagraphs = (article.paragraphs ?? []).slice(openingParagraphCount);
    const remainingGroups = splitParagraphs(remainingParagraphs);
    return [
      { kind: "story" as const, article, serial: index + 1, paragraphs: openingParagraphs, images: article.images ?? [], continuation: false, openingPortrait: true },
      ...remainingGroups.filter((paragraphs) => paragraphs.length > 0).map((paragraphs) => ({ kind: "story" as const, article, serial: index + 1, paragraphs, images: [], continuation: true })),
    ];
  }
  const textGroups=splitParagraphs(article.paragraphs);
  const imageGroups=index===7
    ? exhibitionImageGroups
    : Array.from({length:Math.ceil((article.images?.length??0)/2)},(_,part)=>article.images!.slice(part*2,part*2+2));
  const groups: { paragraphs: string[]; images: string[]; competitionResult?: CompetitionResult; resultsPage?: boolean }[] = article.paragraphs?.length
    ? [...textGroups.map(paragraphs=>({paragraphs,images:[]})),...imageGroups.map(images=>({paragraphs:[],images}))]
    : imageGroups.length?imageGroups.map(images=>({paragraphs:[],images})):[{paragraphs:[],images:[]}];
  const combineResultsWithFinalText = article.title === "Fancy Dress Fiesta: A Splash of Imagination";
  if (article.results?.length) {
    if (combineResultsWithFinalText) groups[textGroups.length - 1].resultsPage = true;
    else groups.splice(textGroups.length, 0, { paragraphs: [], images: [] });
  }
  if (index === 20) groups.splice(textGroups.length, 0, ...achievementResults.map((competitionResult) => ({ paragraphs: [], images: [], competitionResult })));
  return groups.map((group,part)=>({kind:"story" as const,article,serial:index+1,...group,continuation:part>0,resultsPage:group.resultsPage ?? (!combineResultsWithFinalText && Boolean(article.results?.length)&&part===textGroups.length)}));
});
const contentsPageCount = Math.ceil(titles.length / CONTENTS_PER_PAGE);
const articleStartPages: number[] = [];
let runningPage = contentsPageCount + 1;
articleChunks.forEach((chunks) => { articleStartPages.push(runningPage); runningPage += chunks.length; });
const contentsEntries: ContentsEntry[] = titles.map((title, index) => ({ number: index + 1, title, page: articleStartPages[index] }));
const bookPages: PageData[] = [
  { kind: "cover", image: "/assets/cover-srijan-valley-school-v4.png", alt: "Srijan Valley School — Where curiosity grows into character" },
  ...Array.from({ length: contentsPageCount }, (_, index) => ({ kind: "contents" as const, entries: contentsEntries.slice(index * CONTENTS_PER_PAGE, (index + 1) * CONTENTS_PER_PAGE), continuation: index > 0 })),
  ...articleChunks.flat(),
  { kind: "cover", image: "/assets/img1.jpeg", alt: "Srijan Valley School — Let’s create what comes next" },
];
if (bookPages.length % 2 === 0) bookPages.splice(bookPages.length - 1, 0, { kind: "blank" });

function Footer({ n }: { n: number }) { return <footer><span>Srijan Valley School</span><b>{String(n).padStart(2, "0")}</b></footer>; }
function ResultsTable({ rows, columns = ["Class", "Winner’s Name"], caption }: { rows: ResultRow[]; columns?: [string, string, string?]; caption?: string }) {
  return <table className={`results-table ${columns[2] ? "rangoli-results" : ""}`}>{caption && <caption>{caption}</caption>}<thead><tr><th>{columns[0]}</th><th>{columns[1]}</th>{columns[2] && <th>{columns[2]}</th>}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><td>{row.label}</td><td>{row.value}</td>{columns[2] && <td>{row.participants?.map((name) => <span key={name}>{name}</span>)}</td>}</tr>)}</tbody></table>;
}
function CompetitionResultTable({ result }: { result: CompetitionResult }) {
  const hasRanks = result.rankHeadings.length > 1;
  return <section className="competition-result">
    <div className="competition-result-meta"><span>{result.theme}</span><time>{result.date}</time></div>
    <h2>{result.heading}</h2>
    <table>
      <thead>{hasRanks ? <><tr><th rowSpan={2}>{result.groupHeading}</th><th colSpan={result.rankHeadings.length}>Rank</th></tr><tr>{result.rankHeadings.map((rank) => <th key={rank}>{rank}</th>)}</tr></> : <tr><th>{result.groupHeading}</th><th>{result.rankHeadings[0]}</th></tr>}</thead>
      <tbody>{result.rows.map((row) => <tr key={row.group}><th scope="row">{row.group}</th>{row.winners.map((winners, index) => <td key={index}>{winners.map((winner) => <span key={winner}>{winner}</span>)}</td>)}</tr>)}</tbody>
    </table>
  </section>;
}
function PageSheet({ data, pageNumber }: { data?: PageData; pageNumber: number }) {
  if (!data || data.kind === "blank") return <div className="paper blank-page" />;
  if (data.kind === "cover") return <div className="cover"><Image src={data.image} alt={data.alt} fill sizes="(max-width: 760px) 92vw, 520px" priority={pageNumber === 0} /></div>;
  if (data.kind === "contents") return <div className="paper contents"><small>Annual Chronicle 2025–26</small><h1>{data.continuation ? "Continued" : "Contents"}</h1><section>{data.entries.map((entry) => <div key={entry.number}><b>{String(entry.number).padStart(2, "0")}</b><span>{entry.title}</span><i aria-hidden="true" /><em>{String(entry.page).padStart(2, "0")}</em></div>)}</section><Footer n={pageNumber} /></div>;
  if (data.kind === "student") {
    const { student } = data;
    return <article className={`paper story student-page student-page-${student.language} ${student.format === "poem" ? "student-page-poem" : ""}`} lang={student.language}>
      <small>Feature · {String(data.serial).padStart(2, "0")} · Student Voice{data.showProfile ? "" : " · Continued"}</small>
      {!data.continuation && <h1 className="student-section-title">{data.article.title}</h1>}
      {data.showProfile ? <div className="student-intro">
          <div className="student-heading">
            <h1>{student.title}</h1>
            <div className="student-byline"><strong>{student.author}</strong><span>{[student.className, student.rollNumber].filter(Boolean).join(" · ")}</span></div>
          </div>
          <figure className="student-portrait"><Image src={student.image} alt={`${student.author}, ${student.className}`} fill sizes="(max-width: 700px) 30vw, 150px" /></figure>
        </div>
        : <div className="student-running-title"><strong>{student.title}</strong><span>{student.author}</span></div>}
      <i className="rule" />
      <section className="copy student-copy">{data.paragraphs.map((paragraph, index) => <p className={student.format === "poem" ? "student-poem-stanza" : paragraph.includes("\n") ? "student-quote" : undefined} key={index}>{paragraph}</p>)}</section>
      <Footer n={pageNumber} />
    </article>;
  }
  if (data.kind === "mentors") {
    return <article className="paper story mentor-page">
      <small>Feature · {String(data.serial).padStart(2, "0")} · Mentors’ Messages</small>
      {!data.continuation && <><h1>{data.article.title}</h1><i className="rule" /></>}
      <section className="mentor-list">{data.mentors.map((mentor) => <article className="mentor-card" key={mentor.name}>
        <figure className="mentor-portrait"><Image src={mentor.image} alt={mentor.name} fill sizes="(max-width: 700px) 25vw, 130px" /></figure>
        <div className="mentor-copy"><p>{mentor.message}</p><strong>— {mentor.name}</strong></div>
      </article>)}</section>
      <Footer n={pageNumber} />
    </article>;
  }
  const hasPortraitPair = data.images.length === 2 && data.images.every((src) => portraitImagePaths.has(src));
  const isExhibitionGallery = data.images.length === 3 && data.images.every((src) => src.includes("/exhibition-"));
  const gallery = data.images.length > 0 && <section className={`story-gallery gallery-${data.images.length} ${hasPortraitPair ? "side-by-side-portraits" : ""} ${isExhibitionGallery ? "exhibition-gallery" : ""}`}>{data.images.map((src,index)=><figure key={src} className={src.endsWith("inauguration-cc.jpg") ? "portrait-frame" : isExhibitionGallery && portraitImagePaths.has(src) ? "exhibition-portrait-frame" : undefined}><Image src={src} alt={`${data.article.title} — photograph ${index+1}`} fill sizes="(max-width: 700px) 84vw, 38vw" /></figure>)}</section>;
  const copyBlock = data.paragraphs.length > 0 && <section className="copy">{data.paragraphs.map((paragraph, index) => <p className={paragraph.includes("\n")?"signature":undefined} key={index}>{paragraph}</p>)}</section>;
  const showResults = data.article.results && data.resultsPage;
  return <div className={`paper story ${data.paragraphs.length||data.images.length||data.resultsPage||data.competitionResult ? "" : "empty"} ${data.images.length===1?"portrait-story":""} ${data.openingPortrait ? "opening-portrait" : ""} ${data.resultsPage ? "results-page" : ""} ${data.competitionResult ? "competition-page" : ""} ${data.openingPortrait && (data.serial === 3 || data.serial === 4) ? "portrait-square" : ""}`}>
    <small>{data.continuation ? "Continued" : `Feature · ${String(data.serial).padStart(2, "0")}`}</small>
    {!data.continuation && <><h1>{data.article.title}</h1><i className="rule" /></>}
    {data.openingPortrait ? <>{gallery}{copyBlock}</> : <>{copyBlock}{showResults && <ResultsTable rows={data.article.results!} columns={data.article.resultColumns} caption={data.article.resultCaption} />}{data.competitionResult && <CompetitionResultTable result={data.competitionResult} />}{gallery}</>}
    <Footer n={pageNumber} />
  </div>;
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
