/**
 * The 19 units of the NIE G.C.E. (A/L) Agricultural Science syllabus (implemented 2017).
 * Competencies 1-11 are taught in Grade 12, 12-19 in Grade 13. See docs/syllabus-units.md.
 * Titles and grades are editable in the admin panel; the seed never overwrites them.
 */
export type SyllabusUnit = {
  number: number;
  grade: 12 | 13;
  titleEn: string;
  titleSi: string;
  /** Official NIE competency statement (English). */
  competency: string;
};

export const SYLLABUS_UNITS: SyllabusUnit[] = [
  {
    number: 1,
    grade: 12,
    titleEn: "Agriculture and the Development of Sri Lanka",
    titleSi: "ශ්‍රී ලංකාවේ සංවර්ධනයට කෘෂි අංශයේ දායකත්වය",
    competency:
      "Investigates the contribution of the agriculture sector to the development of Sri Lanka considering objectives of agriculture practically.",
  },
  {
    number: 2,
    grade: 12,
    titleEn: "Climatic Factors in Crop Production",
    titleSi: "බෝග වගාවේ දේශගුණික සාධක",
    competency: "Investigates the importance of climatic factors on crop production.",
  },
  {
    number: 3,
    grade: 12,
    titleEn: "Soil Quality Management",
    titleSi: "පස් ගුණාත්මක බව කළමනාකරණය",
    competency:
      "Prepares a plan to obtain high yield through the management of the quality of soil.",
  },
  {
    number: 4,
    grade: 12,
    titleEn: "Plant Nutrient Management",
    titleSi: "පෝෂක කළමනාකරණය",
    competency: "Plans strategies for the management of nutrients to obtain an optimum yield.",
  },
  {
    number: 5,
    grade: 12,
    titleEn: "Crop Establishment",
    titleSi: "බෝග සංස්ථාපනය",
    competency: "Exhibits readiness for establishment of crops in a suitable soil environment.",
  },
  {
    number: 6,
    grade: 12,
    titleEn: "Irrigation and Drainage",
    titleSi: "ජල සම්පාදනය හා ජලවහනය",
    competency: "Plans suitable irrigation and drainage methods for successful crop cultivation.",
  },
  {
    number: 7,
    grade: 12,
    titleEn: "Plant Physiological Processes",
    titleSi: "ශාක ක්‍රියාවලි",
    competency:
      "Exhibits readiness to obtain a high yield by optimising plant physiological processes.",
  },
  {
    number: 8,
    grade: 12,
    titleEn: "Plant Propagation",
    titleSi: "ශාක ප්‍රචාරණය",
    competency: "Engages in plant propagation using suitable technologies.",
  },
  {
    number: 9,
    grade: 12,
    titleEn: "Plant Breeding and Genetic Resource Conservation",
    titleSi: "බෝග අභිජනනය හා ජාන සම්පත් සංරක්ෂණය",
    competency:
      "Investigates the methodologies of plant breeding for crop improvement and conservation of genetic resources.",
  },
  {
    number: 10,
    grade: 12,
    titleEn: "Controlled Environment Agriculture",
    titleSi: "පාලිත පරිසර තත්ත්ව යටතේ වගාව",
    competency: "Plans controlled environmental conditions to obtain successful crop cultivation.",
  },
  {
    number: 11,
    grade: 12,
    titleEn: "Soilless Culture",
    titleSi: "නිර්පාංශු වගා ක්‍රම",
    competency: "Plans soilless cultures for quantitative and qualitative yield.",
  },
  {
    number: 12,
    grade: 13,
    titleEn: "Pest Management",
    titleSi: "පළිබෝධ කළමනාකරණය",
    competency: "Plans effective pest management practices to ensure successful crop production.",
  },
  {
    number: 13,
    grade: 13,
    titleEn: "Food and Nutrition",
    titleSi: "ආහාර පරිභෝජනය හා පෝෂණය",
    competency: "Plans quality food consumption patterns for a healthy life.",
  },
  {
    number: 14,
    grade: 13,
    titleEn: "Post-harvest Technology",
    titleSi: "පසු අස්වනු තාක්ෂණය",
    competency: "Investigates pre- and post-harvest techniques for a high-quality harvest.",
  },
  {
    number: 15,
    grade: 13,
    titleEn: "Animal Husbandry",
    titleSi: "ගොවිපොළ සතුන් ඇති කිරීම",
    competency:
      "Plans methodologies of animal husbandry to ensure high qualitative and quantitative yield.",
  },
  {
    number: 16,
    grade: 13,
    titleEn: "Agricultural Economics",
    titleSi: "කෘෂි ආර්ථික විද්‍යාව",
    competency:
      "Exhibits readiness to apply principles of economics to improve productivity in agricultural enterprises.",
  },
  {
    number: 17,
    grade: 13,
    titleEn: "Sustainable Agriculture",
    titleSi: "තිරසාර කෘෂිකර්මාන්තය",
    competency: "Exhibits readiness to engage in sustainable agriculture.",
  },
  {
    number: 18,
    grade: 13,
    titleEn: "Health Issues in Agriculture",
    titleSi: "කෘෂිකර්මාන්තයේ සෞඛ්‍ය ගැටලු",
    competency: "Investigates strategies to minimise health problems in agriculture.",
  },
  {
    number: 19,
    grade: 13,
    titleEn: "Challenges in Agriculture",
    titleSi: "කෘෂිකර්මාන්තයේ අභියෝග",
    competency: "Exhibits readiness to plan to overcome challenges faced in agriculture.",
  },
];

/**
 * PLACEHOLDER sub-part titles. The teacher supplies the real sub-part list for each unit
 * (SRS TBD-09) and edits it in the admin panel. Even-numbered units get 4, odd get 3.
 */
export const PLACEHOLDER_SUBPARTS: Array<{ titleEn: string; titleSi: string }> = [
  { titleEn: "Introduction and key concepts", titleSi: "හැඳින්වීම සහ මූලික සංකල්ප" },
  { titleEn: "Principles and processes", titleSi: "මූලධර්ම සහ ක්‍රියාවලි" },
  { titleEn: "Applications in Sri Lanka", titleSi: "ශ්‍රී ලංකාවේ භාවිත" },
  { titleEn: "Revision and exam practice", titleSi: "පුනරීක්ෂණය සහ විභාග පුහුණුව" },
];

/** Starting prices in whole rupees (from the approved design). Editable per product. */
export const DEFAULT_PRICES = {
  unit: { 12: 1500, 13: 1750 },
  pastPaper: (year: number) => (year >= 2020 ? 750 : 500),
} as const;
