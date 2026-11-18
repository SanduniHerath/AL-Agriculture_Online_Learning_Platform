/**
 * Starting site content taken from the approved Figma design. These are PLACEHOLDERS:
 * the teacher replaces them in Admin → Teacher profile / Site settings (decision D14).
 */
export const TEACHER_PROFILE = {
  nameEn: "Mr. S. Jayawardena",
  nameSi: "එස්. ජයවර්ධන සර්",
  qualificationsEn: "B.Sc. Agriculture (Hons) · A/L Agriculture Educator",
  qualificationsSi: "කෘෂි විද්‍යා (ගෞරව) උපාධිධාරී · උසස් පෙළ කෘෂි විද්‍යා ආචාර්ය",
  introEn:
    "Clear theory, exam-focused discussions and 30 years of past papers—guided by an experienced teacher who understands every student.",
  introSi:
    "පැහැදිලි සිද්ධාන්ත, විභාග ඉලක්කගත සාකච්ඡා සහ වසර 30ක පසුගිය ප්‍රශ්න පත්‍ර—සෑම සිසුවෙකුම තේරුම් ගන්නා පළපුරුදු ගුරුවරයෙකුගේ මඟ පෙන්වීමෙන්.",
  statYears: "18+",
  statStudents: "7,500+",
  statPasses: "620+",
};

export const TESTIMONIALS = [
  {
    quoteEn:
      "“The short explanations made difficult lessons much easier to revise before the exam.”",
    quoteSi: "“කෙටි පැහැදිලි කිරීම් නිසා අමාරු පාඩම් විභාගයට පෙර නැවත බැලීම ඉතා පහසු වුණා.”",
    authorEn: "Grade 13 student · Kandy",
    authorSi: "13 ශ්‍රේණියේ සිසුවියක් · මහනුවර",
  },
  {
    quoteEn: "“I could clearly see what my son had completed and where he needed support.”",
    quoteSi: "“මගේ පුතා අවසන් කළ කොටස් සහ ඔහුට සහාය අවශ්‍ය තැන් පැහැදිලිව දැකගත හැකි වුණා.”",
    authorEn: "Parent · Kurunegala",
    authorSi: "දෙමාපියෙක් · කුරුණෑගල",
  },
];

/** Sample lesson titles for development videos (SEED_SAMPLE_CONTENT=true only). */
export const SAMPLE_LESSONS: Array<{ titleEn: string; titleSi: string }> = [
  { titleEn: "Core concepts and key definitions", titleSi: "මූලික සංකල්ප සහ ප්‍රධාන නිර්වචන" },
  { titleEn: "Sri Lankan examples and exam links", titleSi: "ශ්‍රී ලාංකික උදාහරණ සහ විභාග සම්බන්ධතා" },
  { titleEn: "Quick revision and knowledge check", titleSi: "කෙටි පුනරීක්ෂණය සහ දැනුම පරීක්ෂාව" },
];
