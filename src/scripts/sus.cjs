const firebase = require("firebase/compat/app");
const { doc, getFirestore, setDoc } = require("firebase/firestore");
const pinyin = require("chinese-to-pinyin");
const fs = require("fs");

const chineseClassNameToEnglish = (class_ch) => {
  const seniorOrJunior = class_ch[0] === "高" ? "S" : "J";
  const grade = ["一", "二", "三"].indexOf(class_ch[1]) + 1;
  let stream = "";
  if (seniorOrJunior === "S") {
    stream = {
      理: "S",
      文商: "AC",
      商: "C",
    }[class_ch.slice(2).replace(/\d+/g, "")];
  }
  let classNumber = class_ch.match(/\d+/)[0];
  classNumber =
    seniorOrJunior === "J" ? classNumber.padStart(2, "0") : classNumber;
  return `${seniorOrJunior}${grade}${stream}${classNumber}`;
};

const firebaseConfig = {
  apiKey: "AIzaSyDir-zvhrzJZgWElnUfjFTzL4Zo0zuH_pk",
  authDomain: "edu-system2.firebaseapp.com",
  projectId: "edu-system2",
  storageBucket: "edu-system2.appspot.com",
  messagingSenderId: "855741339000",
  appId: "1:855741339000:web:132230c985fa0b848c648d",
};

const app = firebase.initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const data = JSON.parse(fs.readFileSync("sus.json", "utf-8")).filter(
  (e) => e[2] === "高三商1"
);

(async () => {
  for (let i = 0; i < data.length; i++) {
    const [id, name_ch, class_ch, seat_no] = data[i];

    const name_en = pinyin(name_ch, { removeTone: true })
      .split(" ")
      .map((e) => e[0].toUpperCase() + e.slice(1))
      .join(" ");

    const gender = Math.random() > 0.5 ? "男" : "女";

    const docRef = doc(firestore, "students", id);
    const class_en = chineseClassNameToEnglish(class_ch);

    await setDoc(docRef, {
      name_ch,
      name_en,
      class: class_en,
      seat_no: parseInt(seat_no),
      sex: gender,
      id,
    });

    console.log(`Document with ID ${id} updated`);
  }
})();
