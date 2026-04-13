// Quran Vocabulary Dataset
// The 600 most common words in the Quran (sample of ~100 for demonstration)
// Each entry: { id, arabic, transliteration, meaning, category, frequency, verse, example }
// frequency = approximate number of occurrences in the Quran (based on word-frequency studies)
// verse = "Surah:Ayah" reference for the example sentence
// NOTE: "category" field is kept for reference but is NOT used by the UI —
//       alphabetical grouping now derives from the English meaning (see getMeaningLetter() in index.html)

const quranVocabulary = [
  { id: 1, arabic: "الله", transliteration: "Allah", meaning: "God", category: "A", frequency: 2816, verse: "1:1", example: "بسم الله الرحمن الرحيم — In the name of Allah, the Most Gracious, the Most Merciful" },
  { id: 2, arabic: "الرحمن", transliteration: "Ar-Rahman", meaning: "The Most Gracious", category: "A", frequency: 57, verse: "20:5", example: "الرحمن على العرش استوى — The Most Gracious rose over the Throne" },
  { id: 3, arabic: "الرحيم", transliteration: "Ar-Raheem", meaning: "The Most Merciful", category: "A", frequency: 114, verse: "2:173", example: "وهو الغفور الرحيم — And He is the Most Forgiving, the Most Merciful" },
  { id: 4, arabic: "العالمين", transliteration: "Al-'Aalameen", meaning: "The worlds / all creation", category: "A", frequency: 73, verse: "1:2", example: "الحمد لله رب العالمين — All praise is for Allah, Lord of the worlds" },
  { id: 5, arabic: "آمن", transliteration: "Aaman", meaning: "He believed", category: "A", frequency: 530, verse: "2:25", example: "الذين آمنوا وعملوا الصالحات — Those who believed and did righteous deeds" },
  { id: 6, arabic: "آية", transliteration: "Aayah", meaning: "Sign / verse", category: "A", frequency: 85, verse: "27:69", example: "إن في ذلك لآية — Indeed in that is a sign" },
  { id: 7, arabic: "أرض", transliteration: "Ard", meaning: "Earth", category: "A", frequency: 81, verse: "51:20", example: "وفي الأرض آيات للموقنين — And on the earth are signs for the certain" },
  { id: 8, arabic: "أسلم", transliteration: "Aslam", meaning: "He submitted / surrendered", category: "A", frequency: 35, verse: "2:131", example: "أسلمت لرب العالمين — I have submitted to the Lord of the worlds" },
  { id: 9, arabic: "أمر", transliteration: "Amr", meaning: "Command / matter", category: "A", frequency: 88, verse: "36:82", example: "إنما أمره إذا أراد شيئاً — His command when He intends something" },
  { id: 10, arabic: "أنعمت", transliteration: "An'amta", meaning: "You bestowed favor", category: "A", frequency: 22, verse: "1:7", example: "أنعمت عليهم — You have bestowed favor upon them" },

  { id: 11, arabic: "بارك", transliteration: "Baarak", meaning: "He blessed", category: "B", frequency: 28, verse: "25:1", example: "تبارك الذي نزل الفرقان — Blessed is He who sent down the Criterion" },
  { id: 12, arabic: "بين", transliteration: "Bayn", meaning: "Between", category: "B", frequency: 92, verse: "6:38", example: "ما فرطنا في الكتاب من شيء — We have neglected nothing in the Book" },
  { id: 13, arabic: "باطل", transliteration: "Baatil", meaning: "Falsehood / vain", category: "B", frequency: 33, verse: "17:81", example: "وقل جاء الحق وزهق الباطل — And say, Truth has come and falsehood has departed" },
  { id: 14, arabic: "بشر", transliteration: "Bashar", meaning: "Human being / mankind", category: "B", frequency: 37, verse: "18:110", example: "قل إنما أنا بشر مثلكم — Say, I am only a human being like you" },
  { id: 15, arabic: "بصير", transliteration: "Baseer", meaning: "All-Seeing / seeing", category: "B", frequency: 45, verse: "2:110", example: "إن الله بما تعملون بصير — Indeed Allah is Seeing of what you do" },
  { id: 16, arabic: "بعث", transliteration: "Ba'th", meaning: "He sent / resurrection", category: "B", frequency: 28, verse: "30:19", example: "ثم بعثناكم من بعد موتكم — Then We resurrected you after your death" },
  { id: 17, arabic: "بئس", transliteration: "Bi'sa", meaning: "How terrible / evil", category: "B", frequency: 31, verse: "3:12", example: "بئس ما كانوا يصنعون — How terrible was what they were doing" },
  { id: 18, arabic: "بشرى", transliteration: "Bushraa", meaning: "Good news / glad tidings", category: "B", frequency: 22, verse: "2:25", example: "وبشر الذين آمنوا — And give good news to those who believe" },
  { id: 19, arabic: "بل", transliteration: "Bal", meaning: "Rather / but", category: "B", frequency: 128, verse: "75:5", example: "بل يريد الإنسان لي فجر أمامه — But man wishes to commit sin ahead of him" },
  { id: 20, arabic: "بنى", transliteration: "Banaz", meaning: "He built", category: "B", frequency: 18, verse: "51:47", example: "والسماء بنيناها بأيد — And the heaven We built with might" },

  { id: 21, arabic: "توبة", transliteration: "Tawbah", meaning: "Repentance", category: "T", frequency: 25, verse: "24:31", example: "وتوبوا إلى الله جميعاً — And repent to Allah, all of you" },
  { id: 22, arabic: "تقوى", transliteration: "Taqwaa", meaning: "God-consciousness / piety", category: "T", frequency: 38, verse: "49:13", example: "إن أكرمكم عند الله أتقاكم — Indeed the most noble of you before Allah is the most pious" },
  { id: 23, arabic: "تلا", transliteration: "Talaa", meaning: "He recited / followed", category: "T", frequency: 30, verse: "12:3", example: "واتل عليهم نبأ — And recite to them the news" },
  { id: 24, arabic: "تولى", transliteration: "Tawallaz", meaning: "He turned away", category: "T", frequency: 24, verse: "7:146", example: "فتولى عنهم وقال — So he turned away from them and said" },
  { id: 25, arabic: "ترك", transliteration: "Taraka", meaning: "He left / abandoned", category: "T", frequency: 29, verse: "2:7", example: "وتركهم في ظلمات — And He left them in darknesses" },
  { id: 26, arabic: "تبارك", transliteration: "Tabaarak", meaning: "Blessed / exalted", category: "T", frequency: 12, verse: "67:1", example: "تبارك الذي بيده الملك — Blessed is He in whose hand is the dominion" },
  { id: 27, arabic: "تسبيح", transliteration: "Tasbeeh", meaning: "Glorification", category: "T", frequency: 15, verse: "37:180", example: "سبحان ربك رب العزة — Glory to your Lord, the Lord of Might" },
  { id: 28, arabic: "تفسير", transliteration: "Tafseer", meaning: "Interpretation / explanation", category: "T", frequency: 8, verse: "14:4", example: "ولقد صرفنا للناس في هذا القرآن — And We have certainly diversified for the people in this Quran" },
  { id: 29, arabic: "تذكرة", transliteration: "Tadhkirah", meaning: "Reminder / admonition", category: "T", frequency: 10, verse: "88:21", example: "إنما أنت مذكر — You are only a reminder" },
  { id: 30, arabic: "تبار", transliteration: "Tabaara", meaning: "Perished / destroyed", category: "T", frequency: 6, verse: "111:1", example: "تبارت أيدي أبي لهب — May the hands of Abu Lahab be ruined" },

  { id: 31, arabic: "جنة", transliteration: "Jannah", meaning: "Garden / Paradise", category: "J", frequency: 66, verse: "54:54", example: "وبشر الذين آمنوا أن لهم فردوساً — And give good tidings to those who believe that they will have gardens" },
  { id: 32, arabic: "جادل", transliteration: "Jaadal", meaning: "He disputed / argued", category: "J", frequency: 19, verse: "6:33", example: "وجادلوا بالباطل — And they disputed with falsehood" },
  { id: 33, arabic: "جاء", transliteration: "Jaa'a", meaning: "He came", category: "J", frequency: 105, verse: "17:81", example: "جاء الحق — The truth has come" },
  { id: 34, arabic: "جعل", transliteration: "Ja'ala", meaning: "He made / appointed", category: "J", frequency: 92, verse: "49:13", example: "وجعلناكم شعوباً وقبائل — And We made you peoples and tribes" },
  { id: 35, arabic: "جنات", transliteration: "Jannaat", meaning: "Gardens", category: "J", frequency: 27, verse: "2:25", example: "جنات تجري من تحتها الأنهار — Gardens beneath which rivers flow" },
  { id: 36, arabic: "جزاء", transliteration: "Jazaa'a", meaning: "Recompense / reward", category: "J", frequency: 22, verse: "3:57", example: "جزاء وفياً — A fitting recompense" },
  { id: 37, arabic: "جمع", transliteration: "Jama'a", meaning: "He gathered", category: "J", frequency: 20, verse: "18:49", example: "يوم نجمع المتقين — The Day We gather the righteous" },
  { id: 38, arabic: "جمال", transliteration: "Jamaal", meaning: "Beauty", category: "J", frequency: 5, verse: "18:107", example: "أصحاب الجنة يومئذ خير مستقراً — The companions of Paradise that Day are better in resting place" },

  { id: 41, arabic: "حمد", transliteration: "Hamd", meaning: "Praise", category: "H", frequency: 43, verse: "6:1", example: "الحمد لله رب العالمين — All praise is for Allah, Lord of the worlds" },
  { id: 42, arabic: "حكم", transliteration: "Hakam", meaning: "He judged / wisdom", category: "H", frequency: 55, verse: "14:27", example: "إن الله يحكم ما يريد — Indeed Allah judges what He wills" },
  { id: 43, arabic: "حلال", transliteration: "Halaal", meaning: "Permissible / lawful", category: "H", frequency: 12, verse: "5:4", example: "أحل لكم الطيبات — He has made lawful for you the good things" },
  { id: 44, arabic: "حرام", transliteration: "Haraam", meaning: "Sacred / forbidden", category: "H", frequency: 15, verse: "17:32", example: "إنما حرم ربي الفواحش — My Lord has only forbidden immoralities" },
  { id: 45, arabic: "حفظ", transliteration: "Hafiz", meaning: "He preserved / guarded", category: "H", frequency: 18, verse: "15:9", example: "إنا نحن نزلنا الذكر وإنا له لحافظون — Indeed We sent down the Reminder and We will preserve it" },
  { id: 46, arabic: "حكيم", transliteration: "Hakeem", meaning: "All-Wise / wise", category: "H", frequency: 38, verse: "39:5", example: "ذلك تحكيم العزيز الحكيم — That is the determination of the Exalted in Might, the Knowing" },
  { id: 47, arabic: "حق", transliteration: "Haqq", meaning: "Truth / right", category: "H", frequency: 107, verse: "17:81", example: "وقل جاء الحق — And say, the truth has come" },
  { id: 48, arabic: "حياة", transliteration: "Hayaat", meaning: "Life", category: "H", frequency: 46, verse: "29:64", example: "واعلموا أنما الحياة الدنيا لعب — And know that the life of this world is but play" },
  { id: 49, arabic: "حزن", transliteration: "Huzn", meaning: "Sadness / grief", category: "H", frequency: 14, verse: "3:139", example: "ولا تحزن عليهم — And do not grieve over them" },
  { id: 50, arabic: "حشر", transliteration: "Hashr", meaning: "Gathering / resurrection", category: "H", frequency: 11, verse: "27:65", example: "يوم يحشرهم كأن لم يلبثوا — The Day He will gather them, as if they had not stayed" },

  { id: 51, arabic: "خالق", transliteration: "Khaaliq", meaning: "The Creator", category: "K", frequency: 8, verse: "15:26", example: "خلق الإنسان من صلصال — He created man from clay" },
  { id: 52, arabic: "خير", transliteration: "Khayr", meaning: "Good / better", category: "K", frequency: 78, verse: "31:34", example: "وما تدري نفس ماذا تكسب غداً — And no soul knows what it will earn tomorrow" },
  { id: 53, arabic: "خوف", transliteration: "Khawf", meaning: "Fear", category: "K", frequency: 24, verse: "7:205", example: "يدعون ربهم خوفاً وطمعاً — They call upon their Lord in fear and hope" },
  { id: 54, arabic: "خشية", transliteration: "Khashyah", meaning: "Awe / reverence", category: "K", frequency: 14, verse: "35:28", example: "إنما يخشى الله من عباده العلماء — Only those fear Allah from among His servants who have knowledge" },
  { id: 55, arabic: "خبيث", transliteration: "Khabeeth", meaning: "Evil / vile", category: "K", frequency: 7, verse: "35:32", example: "قل لا يستوي الخبيث والطيب — Say, Not equal are the evil and the good" },

  { id: 61, arabic: "دعاء", transliteration: "Du'aa", meaning: "Supplication / prayer", category: "D", frequency: 28, verse: "40:60", example: "ادعوني أستجب لكم — Call upon Me and I will respond to you" },
  { id: 62, arabic: "دنيا", transliteration: "Dunyaa", meaning: "The world / this life", category: "D", frequency: 115, verse: "3:185", example: "ما الحياة الدنيا إلا متاع الغرور — The life of this world is nothing but enjoyment of delusion" },
  { id: 63, arabic: "دخل", transliteration: "Dakhala", meaning: "He entered", category: "D", frequency: 32, verse: "2:25", example: "ادخلوا الجنة — Enter Paradise" },
  { id: 64, arabic: "ذكر", transliteration: "Dhikr", meaning: "Remembrance / reminder", category: "D", frequency: 82, verse: "2:152", example: "فاذكروني أذكركم — So remember Me and I will remember you" },
  { id: 65, arabic: "دليل", transliteration: "Daleel", meaning: "Proof / guide", category: "D", frequency: 9, verse: "2:118", example: "قد جاءكم بصائر من ربكم — There has come to you clear evidence from your Lord" },

  { id: 71, arabic: "رجال", transliteration: "Rijaal", meaning: "Men", category: "R", frequency: 22, verse: "9:108", example: "فيهم رجال يحبون أن يتطهروا — In it are men who love to purify themselves" },
  { id: 72, arabic: "رحمة", transliteration: "Rahmah", meaning: "Mercy", category: "R", frequency: 79, verse: "7:156", example: "ورحمتي وسعت كل شيء — And My mercy encompasses all things" },
  { id: 73, arabic: "رب", transliteration: "Rabb", meaning: "Lord / Sustainer", category: "R", frequency: 152, verse: "1:2", example: "الحمد لله رب العالمين — All praise is for Allah, Lord of the worlds" },
  { id: 74, arabic: "رسول", transliteration: "Rasool", meaning: "Messenger", category: "R", frequency: 95, verse: "33:40", example: "ما كان محمد أبا أحد من رجالكم — Muhammad is not the father of any of your men" },
  { id: 75, arabic: "رزق", transliteration: "Rizq", meaning: "Provision / sustenance", category: "R", frequency: 43, verse: "51:58", example: "إن الله هو الرزاق ذو القوة المتين — Indeed Allah is the Provider, the Possessor of Strength" },
  { id: 76, arabic: "رضا", transliteration: "Ridaa", meaning: "Pleasure / satisfaction", category: "R", frequency: 31, verse: "5:119", example: "رضي الله عنهم ورضوا عنه — Allah is pleased with them and they are pleased with Him" },
  { id: 77, arabic: "ربك", transliteration: "Rabbuka", meaning: "Your Lord", category: "R", frequency: 88, verse: "37:180", example: "سبحان ربك رب العزة — Glory to your Lord, the Lord of Might" },
  { id: 78, arabic: "رقب", transliteration: "Raqaba", meaning: "He watched / observed", category: "R", frequency: 11, verse: "34:3", example: "ما يعزب عن ربك من مثقال ذرة — Nothing is hidden from your Lord" },

  { id: 81, arabic: "سماء", transliteration: "Samaa'a", meaning: "Sky / heaven", category: "S", frequency: 76, verse: "51:47", example: "والسماء بنيناها بأيد — And the heaven We built with might" },
  { id: 82, arabic: "سبحان", transliteration: "Subhaan", meaning: "Glory / far above", category: "S", frequency: 32, verse: "37:159", example: "سبحان الله عما يصفون — Glory to Allah above what they describe" },
  { id: 83, arabic: "سلام", transliteration: "Salaam", meaning: "Peace", category: "S", frequency: 36, verse: "56:25", example: "لهم دار السلام — For them is the home of peace" },
  { id: 84, arabic: "صلاة", transliteration: "Salaah", meaning: "Prayer", category: "S", frequency: 83, verse: "17:78", example: "أقم الصلاة لدلوك الشمس — Establish prayer at the decline of the sun" },
  { id: 85, arabic: "صبر", transliteration: "Sabr", meaning: "Patience / steadfastness", category: "S", frequency: 33, verse: "2:153", example: "إن الله مع الصابرين — Indeed Allah is with the patient" },
  { id: 86, arabic: "صدق", transliteration: "Sidq", meaning: "Truth / sincerity", category: "S", frequency: 28, verse: "39:33", example: "والذي جاء بالصدق — And the one who brought the truth" },
  { id: 87, arabic: "سيئة", transliteration: "Sayyi'ah", meaning: "Evil deed / sin", category: "S", frequency: 34, verse: "27:90", example: "من جاء بالسيئة فكبت وجوههم — Whoever comes with an evil deed will be disgraced" },
  { id: 88, arabic: "سلطان", transliteration: "Sultan", meaning: "Authority / proof", category: "S", frequency: 26, verse: "17:2", example: "ما أنزلنا على هذا القرآن من سلطان — We did not send down upon this Quran any authority" },
  { id: 89, arabic: "شكر", transliteration: "Shukr", meaning: "Gratitude / thankfulness", category: "S", frequency: 19, verse: "14:7", example: "لئن شكرتم لأزيدنكم — If you are grateful, I will give you more" },
  { id: 90, arabic: "شر", transliteration: "Sharr", meaning: "Evil / harm", category: "S", frequency: 41, verse: "113:1", example: "قل أعوذ برب الفلق من شر ما خلق — Say, I seek refuge in the Lord of daybreak from the evil He created" },

  { id: 91, arabic: "طاعة", transliteration: "Taa'ah", meaning: "Obedience", category: "T", frequency: 15, verse: "3:132", example: "وأطيعوا الله والرسول — And obey Allah and the Messenger" },
  { id: 92, arabic: "طيب", transliteration: "Tayyib", meaning: "Good / pure", category: "T", frequency: 18, verse: "7:26", example: "الطيبون للطيبات — The pure for the pure" },
  { id: 93, arabic: "طريق", transliteration: "Tareeq", meaning: "Way / path", category: "T", frequency: 26, verse: "36:61", example: "وأن هذا صراطي مستقيماً — And this is My straight path" },

  { id: 101, arabic: "علم", transliteration: "Ilm", meaning: "Knowledge", category: "A", frequency: 122, verse: "58:11", example: "يرفع الله الذين آمنوا منكم والذين أوتوا العلم درجات — Allah raises those who believe and are given knowledge in rank" },
  { id: 102, arabic: "عذاب", transliteration: "Adhaab", meaning: "Punishment / torment", category: "A", frequency: 78, verse: "3:131", example: "واتقوا عذاب النار — And fear the punishment of the Fire" },
  { id: 103, arabic: "عبد", transliteration: "Abd", meaning: "Servant / slave", category: "A", frequency: 135, verse: "4:36", example: "واعبدوا الله ولا تشركوا به شيئاً — Worship Allah and associate nothing with Him" },
  { id: 104, arabic: "عظيم", transliteration: "Adheem", meaning: "Great / mighty", category: "A", frequency: 32, verse: "40:16", example: "ولله العظمة — And to Allah belongs all greatness" },
  { id: 105, arabic: "عفو", transliteration: "Afw", meaning: "Pardon / forgiveness", category: "A", frequency: 14, verse: "9:43", example: "فأولئك عسى الله أن يعفو عنهم — Those — it is expected that Allah will pardon them" },

  { id: 111, arabic: "فاتحة", transliteration: "Faatihah", meaning: "The Opening", category: "F", frequency: 2, verse: "1:1", example: "الحمد لله رب العالمين — All praise is for Allah, Lord of all the worlds" },
  { id: 112, arabic: "فرقان", transliteration: "Furqaan", meaning: "Criterion / distinction", category: "F", frequency: 7, verse: "25:1", example: "تبارك الذي نزل الفرقان — Blessed is He who sent down the Criterion" },
  { id: 113, arabic: "فضل", transliteration: "Fadl", meaning: "Bounty / grace", category: "F", frequency: 25, verse: "2:212", example: "ذلك فضل الله يؤتيه من يشاء — That is the bounty of Allah which He gives to whom He wills" },
  { id: 114, arabic: "فكر", transliteration: "Fikr", meaning: "Thought / reflection", category: "F", frequency: 5, verse: "14:4", example: "أفلم يدبروا القول — Have they not reflected upon the word?" },
  { id: 115, arabic: "فسق", transliteration: "Fisq", meaning: "Rebellion / disobedience", category: "F", frequency: 8, verse: "3:119", example: "وكره إليكم الكفر والفسوق — And He has made disliked to you disbelief and disobedience" },

  { id: 121, arabic: "قرآن", transliteration: "Qur'aan", meaning: "The Quran / recitation", category: "Q", frequency: 68, verse: "17:9", example: "إن هذا القرآن يهدي للتي هي أقوم — Indeed this Quran guides to that which is most suitable" },
  { id: 122, arabic: "قيامة", transliteration: "Qiyaamah", meaning: "Resurrection / standing", category: "Q", frequency: 39, verse: "75:1", example: "من يوم القيامة — From the Day of Resurrection" },
  { id: 123, arabic: "قدر", transliteration: "Qadr", meaning: "Decree / power / destiny", category: "Q", frequency: 22, verse: "97:1", example: "إنا أنزلناه في ليلة القدر — Indeed We sent it down on the Night of Decree" },
  { id: 124, arabic: "قلم", transliteration: "Qalam", meaning: "Pen", category: "Q", frequency: 3, verse: "68:1", example: "ن والقلم وما يسطرون — Nun. By the pen and what they write" },
  { id: 125, arabic: "قول", transliteration: "Qawl", meaning: "Saying / word / statement", category: "Q", frequency: 75, verse: "17:53", example: "وقل لعبادي يقولوا التي هي أحسن — And tell My servants to say that which is best" },

  { id: 131, arabic: "كتاب", transliteration: "Kitaab", meaning: "Book / scripture", category: "K", frequency: 87, verse: "2:2", example: "ذلك الكتاب لا ريب فيه — This is the Book about which there is no doubt" },
  { id: 132, arabic: "كفر", transliteration: "Kufr", meaning: "Disbelief / ingratitude", category: "K", frequency: 158, verse: "2:6", example: "إن الذين كفروا سواء عليهم — Indeed those who disbelieve — it is all the same to them" },
  { id: 133, arabic: "كلمة", transliteration: "Kalimah", meaning: "Word / statement", category: "K", frequency: 16, verse: "14:24", example: "كلمة طيبة كشجرة طيبة — A good word is like a good tree" },

  { id: 141, arabic: "ليلة", transliteration: "Layl", meaning: "Night", category: "L", frequency: 28, verse: "92:1", example: "والليل إذا يغشى — By the night when it covers" },
  { id: 142, arabic: "لطف", transliteration: "Lutf", meaning: "Gentleness / subtlety", category: "L", frequency: 6, verse: "4:96", example: "الله لطيف بعباده — Allah is Gentle with His servants" },
  { id: 143, arabic: "لعنة", transliteration: "La'nah", meaning: "Curse / condemnation", category: "L", frequency: 5, verse: "3:56", example: "لعنة الله على الظالمين — The curse of Allah is upon the wrongdoers" },

  { id: 151, arabic: "مؤمن", transliteration: "Mu'min", meaning: "Believer", category: "M", frequency: 105, verse: "2:25", example: "والمؤمنون والمؤمنات بعضهم أولياء بعض — The believing men and women are allies of one another" },
  { id: 152, arabic: "موت", transliteration: "Mawt", meaning: "Death", category: "M", frequency: 42, verse: "3:185", example: "كل نفس ذائقة الموت — Every soul will taste death" },
  { id: 153, arabic: "ملك", transliteration: "Malak", meaning: "Angel / king", category: "M", frequency: 95, verse: "2:25", example: "ومن يأت مؤمناً — And whoever comes as a believer" },
  { id: 154, arabic: "مسجد", transliteration: "Masjid", meaning: "Mosque / place of prostration", category: "M", frequency: 28, verse: "72:18", example: "وأن المساجد لله — And that the mosques are for Allah" },
  { id: 155, arabic: "محمد", transliteration: "Muhammad", meaning: "Muhammad (praised)", category: "M", frequency: 4, verse: "33:40", example: "ما كان محمد أبا أحد — Muhammad is not the father of any" },
  { id: 156, arabic: "مصير", transliteration: "Maseer", meaning: "Destination / return", category: "M", frequency: 18, verse: "24:42", example: "إلى الله المصير — To Allah is the return" },
  { id: 157, arabic: "ميزان", transliteration: "Meezaan", meaning: "Scale / balance", category: "M", frequency: 7, verse: "21:47", example: "ونضع الموازين القسط — And We place the scales of justice" },
  { id: 158, arabic: "معصية", transliteration: "Ma'siyah", meaning: "Disobedience / sin", category: "M", frequency: 9, verse: "3:119", example: "ولا جناح عليكم فيما أخطأتم به — There is no blame upon you for mistakes" },

  { id: 161, arabic: "نور", transliteration: "Noor", meaning: "Light", category: "N", frequency: 49, verse: "24:35", example: "الله نور السماوات والأرض — Allah is the Light of the heavens and the earth" },
  { id: 162, arabic: "ناس", transliteration: "Naas", meaning: "Mankind / people", category: "N", frequency: 124, verse: "114:1", example: "قل أعوذ برب الناس — Say, I seek refuge in the Lord of mankind" },
  { id: 163, arabic: "نعمة", transliteration: "Ni'mah", meaning: "Blessing / favor", category: "N", frequency: 38, verse: "14:34", example: "وإن تعدوا نعمة الله لا تحصوها — And if you count the favors of Allah, you cannot enumerate them" },
  { id: 164, arabic: "نبي", transliteration: "Nabi", meaning: "Prophet", category: "N", frequency: 75, verse: "14:4", example: "وما أرسلنا من رسول إلا بلسان قومه — And We did not send any messenger except in the language of his people" },
  { id: 165, arabic: "نار", transliteration: "Naar", meaning: "Fire / Hellfire", category: "N", frequency: 52, verse: "2:24", example: "واتقوا النار التي أعدت للكافرين — And fear the Fire prepared for the disbelievers" },

  { id: 171, arabic: "هدى", transliteration: "Hudaa", meaning: "Guidance", category: "H", frequency: 85, verse: "1:6", example: "اهدنا الصراط المستقيم — Guide us to the straight path" },
  { id: 172, arabic: "هداية", transliteration: "Hidaayah", meaning: "Guidance", category: "H", frequency: 15, verse: "28:56", example: "إنك لا تهدي من أحببت — Indeed you do not guide whom you love" },

  { id: 181, arabic: "ولي", transliteration: "Wali", meaning: "Ally / protector / guardian", category: "W", frequency: 34, verse: "2:257", example: "الله ولي الذين آمنوا — Allah is the ally of those who believe" },
  { id: 182, arabic: "وضع", transliteration: "Wada'a", meaning: "He placed / put down", category: "W", frequency: 12, verse: "18:49", example: "ووضع الكتاب — And the book is placed" },
  { id: 183, arabic: "وجه", transliteration: "Wajh", meaning: "Face", category: "W", frequency: 18, verse: "28:88", example: "كل شيء هالك إلا وجهه — Everything will perish except His Face" },

  { id: 191, arabic: "يوم", transliteration: "Yawm", meaning: "Day", category: "Y", frequency: 475, verse: "26:88", example: "يوم لا ينفع مال ولا بنون — The Day when wealth and children will not benefit" },
  { id: 192, arabic: "يقين", transliteration: "Yaqeen", meaning: "Certainty", category: "Y", frequency: 8, verse: "15:99", example: "واعبد ربك حتى يأتيك اليقين — And worship your Lord until certainty comes to you" },
  { id: 193, arabic: "يأسي", transliteration: "Ya'sa", meaning: "He despairs", category: "Y", frequency: 4, verse: "12:87", example: "ومن يقنط من رحمة ربه إلا الضالون — And who despairs of the mercy of his Lord except the astray?" },

  { id: 201, arabic: "زكاة", transliteration: "Zakaah", meaning: "Purification / alms", category: "Z", frequency: 32, verse: "2:43", example: "وأقيموا الصلاة وآتوا الزكاة — And establish prayer and give zakah" },
  { id: 202, arabic: "ظلم", transliteration: "Zulm", meaning: "Injustice / wrongdoing", category: "Z", frequency: 55, verse: "3:182", example: "ومن يظلم منكم نذقه عذاباً أليماً — And whoever wrongs among you — We will make him taste a painful punishment" },
  { id: 203, arabic: "ظن", transliteration: "Zann", meaning: "Assumption / suspicion", category: "Z", frequency: 22, verse: "10:36", example: "إن الظن لا يغني من الحق شيئاً — Indeed assumption avails not against the truth at all" },

  { id: 211, arabic: "غفور", transliteration: "Ghafoor", meaning: "Most Forgiving", category: "G", frequency: 42, verse: "85:14", example: "وهو الغفور الودود — And He is the Most Forgiving, the Most Loving" },
  { id: 212, arabic: "غيب", transliteration: "Ghayb", meaning: "The unseen", category: "G", frequency: 15, verse: "2:3", example: "الذين يؤمنون بالغيب — Who believe in the unseen" },

  { id: 221, arabic: "فجر", transliteration: "Fajr", meaning: "Dawn / daybreak", category: "F", frequency: 6, verse: "89:1", example: "والفجر وليال عشر — By the dawn and ten nights" },
  { id: 222, arabic: "فردوس", transliteration: "Firdaws", meaning: "The highest paradise", category: "F", frequency: 1, verse: "23:11", example: "أولئك جزاؤهم مغفرة ورزقهم فردوس — Their reward is forgiveness and noble provision" },

  { id: 231, arabic: "صادقين", transliteration: "Sadiqeen", meaning: "The truthful", category: "S", frequency: 8, verse: "9:119", example: "كونوا مع الصادقين — Be with the truthful" },
  { id: 232, arabic: "صالحات", transliteration: "Salihaat", meaning: "Righteous deeds", category: "S", frequency: 56, verse: "2:25", example: "الذين آمنوا وعملوا الصالحات — Those who believe and do righteous deeds" },

  { id: 241, arabic: "قضاء", transliteration: "Qadaa'a", meaning: "Decree / judgment", category: "Q", frequency: 8, verse: "2:176", example: "قضي الأمر الذي فيه تستفتيان — The matter has been decided about which you inquire" },
  { id: 242, arabic: "قرية", transliteration: "Qaryah", meaning: "Town / city", category: "Q", frequency: 16, verse: "15:4", example: "وكم أهلكنا من قرية — And how many a town We destroyed" },

  { id: 251, arabic: "كافرين", transliteration: "Kaafireen", meaning: "The disbelievers", category: "K", frequency: 28, verse: "70:11", example: "يوم لا يغني عن الكافرين نفاؤهم — The Day their excuse will not benefit the wrongdoers" },
  { id: 134, arabic: "كريم", transliteration: "Kareem", meaning: "Noble / generous", category: "K", frequency: 18, verse: "56:77", example: "إنه لقرآن كريم — Indeed it is a noble Quran" },

  { id: 261, arabic: "ملائكة", transliteration: "Malaa'ikah", meaning: "Angels", category: "M", frequency: 38, verse: "58:1", example: "الحافظون من أمر الله — The guardians from the command of Allah" },

  { id: 271, arabic: "نزول", transliteration: "Nuzool", meaning: "Descent / revelation", category: "N", frequency: 5, verse: "44:3", example: "إنا أنزلناه في ليلة مباركة — Indeed We sent it down on a blessed night" },

  { id: 281, arabic: "واحد", transliteration: "Waaheed", meaning: "One / single", category: "W", frequency: 12, verse: "112:1", example: "قل هو الله أحد — Say, He is Allah, the One" },

  { id: 291, arabic: "يسر", transliteration: "Yusr", meaning: "Ease", category: "Y", frequency: 6, verse: "94:6", example: "فإن مع العسر يسراً — Indeed with hardship comes ease" },

  { id: 301, arabic: "أمة", transliteration: "Ummah", meaning: "Community / nation", category: "A", frequency: 48, verse: "3:110", example: "كنتم خير أمة أخرجت للناس — You are the best nation produced for mankind" },
  { id: 302, arabic: "أذن", transliteration: "Udhun", meaning: "Ear", category: "A", frequency: 9, verse: "16:78", example: "وجعل لكم السمع والأبصار — And He gave you hearing and sight" },
  { id: 303, arabic: "أجر", transliteration: "Ajr", meaning: "Reward / wage", category: "A", frequency: 32, verse: "4:134", example: "ولأجر الآخرة أكبر — And the reward of the Hereafter is greater" },

  { id: 311, arabic: "بعض", transliteration: "Ba'd", meaning: "Some / part", category: "B", frequency: 52, verse: "58:14", example: "بعضكم لبعض عدو — Some of you are enemies to others" },
  { id: 312, arabic: "بحر", transliteration: "Bahr", meaning: "Sea / ocean", category: "B", frequency: 33, verse: "42:32", example: "ومن آياته الجوار في البحر — And among His signs are the ships sailing in the sea" },

  { id: 321, arabic: "تلاوة", transliteration: "Tilaawah", meaning: "Recitation", category: "T", frequency: 4, verse: "73:4", example: "ورتّل القرآن ترتيلاً — And recite the Quran with measured recitation" },

  { id: 331, arabic: "جاهد", transliteration: "Jaahad", meaning: "He strove / struggled", category: "J", frequency: 11, verse: "22:78", example: "وجاهدوا في سبيل الله — And they strove in the cause of Allah" },

  { id: 351, arabic: "خاشعين", transliteration: "Khaashi'een", meaning: "The humble / reverent", category: "K", frequency: 3, verse: "23:2", example: "الذين هم في صلاتهم خاشعون — Those who are humble in their prayer" },

  { id: 361, arabic: "دعوا", transliteration: "Da'aw", meaning: "They called / invited", category: "D", frequency: 14, verse: "54:10", example: "فدعا ربه أني مغلوب فانتصر — So he called upon his Lord, I am overpowered, so help" },

  { id: 371, arabic: "راغب", transliteration: "Raaghib", meaning: "Desiring / willing", category: "R", frequency: 5, verse: "4:125", example: "فمن رغب عن ملة إبراهيم — And whoever turns away from the religion of Abraham" },
  { id: 372, arabic: "رقيب", transliteration: "Raqeeb", meaning: "Watchful / guardian", category: "R", frequency: 3, verse: "4:1", example: "وكان الله على كل شيء رقيباً — And Allah is Watchful over all things" },

  { id: 381, arabic: "سجود", transliteration: "Sujood", meaning: "Prostration", category: "S", frequency: 8, verse: "2:34", example: "وخرروا سجداً — And they fell down in prostration" },

  { id: 391, arabic: "صابرين", transliteration: "Saabireen", meaning: "The patient / steadfast", category: "S", frequency: 7, verse: "3:200", example: "يا أيها الذين آمنوا اصبروا — O you who believe, persevere" },

  { id: 401, arabic: "طه", transliteration: "Taa-Haa", meaning: "Ta-Ha (Quranic opening)", category: "T", frequency: 2, verse: "20:1", example: "طه ما أنزلنا عليك القرآن لتشقى — Ta-Ha. We did not send down the Quran to you to cause distress" },

  { id: 411, arabic: "عالم", transliteration: "Aalim", meaning: "Knower / scholar", category: "A", frequency: 22, verse: "35:28", example: "إنما يخشى الله من عباده العلماء — Only those fear Allah from among His servants who have knowledge" },

  { id: 421, arabic: "فتح", transliteration: "Fath", meaning: "Victory / conquest", category: "F", frequency: 6, verse: "48:1", example: "إنا فتحنا لك فتحاً مبيناً — Indeed We have given you a clear conquest" },

  { id: 431, arabic: "قدير", transliteration: "Qadeer", meaning: "All-Powerful / capable", category: "Q", frequency: 28, verse: "2:20", example: "إن الله على كل شيء قدير — Indeed Allah is over all things competent" },

  { id: 441, arabic: "كبير", transliteration: "Kabeer", meaning: "Great / large", category: "K", frequency: 32, verse: "8:47", example: "كبر على المشركين ما تدعوهم إليه — Grave is that which the polytheists are called to" },

  { id: 451, arabic: "لطيف", transliteration: "Lateef", meaning: "Subtle / gentle", category: "L", frequency: 4, verse: "67:14", example: "ألا يعلم من خلق وهو اللطيف الخبير — Does He who created not know, while He is the Subtle, the Aware?" },

  { id: 461, arabic: "مجيد", transliteration: "Majeed", meaning: "Glorious / noble", category: "M", frequency: 5, verse: "85:21", example: "إنه لقرآن مجيد — Indeed it is a noble Quran" },

  { id: 471, arabic: "نذير", transliteration: "Nadheer", meaning: "Warner", category: "N", frequency: 18, verse: "88:21", example: "إنما أنت نذير — You are only a warner" },

  { id: 481, arabic: "وابل", transliteration: "Waabil", meaning: "Heavy rain", category: "W", frequency: 2, verse: "2:261", example: "كمثل حبة أنبتت سبع سنابل — Like a seed which grows seven ears" },

  { id: 491, arabic: "يابس", transliteration: "Yaabis", meaning: "Dry", category: "Y", frequency: 3, verse: "21:30", example: "وجعلنا من الماء كل شيء حي — And We made from water every living thing" },

  { id: 501, arabic: "زبور", transliteration: "Zaboor", meaning: "Psalms / scripture", category: "Z", frequency: 2, verse: "4:163", example: "ولقد كتبنا في الزبور — And We have already written in the Psalms" },

  { id: 511, arabic: "غني", transliteration: "Ghani", meaning: "Self-sufficient / rich", category: "G", frequency: 18, verse: "22:64", example: "والله هو الغني الحميد — And Allah is the Self-Sufficient, the Praiseworthy" },

  { id: 521, arabic: "فاسقون", transliteration: "Fasiqoon", meaning: "The disobedient / rebellious", category: "F", frequency: 4, verse: "9:80", example: "وأما الذين فسقوا فمأواهم النار — But as for the defiantly disobedient, their refuge is the Fire" },

  { id: 531, arabic: "قرين", transliteration: "Qareen", meaning: "Companion / associate", category: "Q", frequency: 3, verse: "43:36", example: "ومن يعش عن ذكر الرحمن نقرن له شيطاناً — And whoever turns away from the remembrance of the Most Merciful, We appoint for him a devil" },

  { id: 541, arabic: "كاظمين", transliteration: "Kaazimeen", meaning: "Those who restrain anger", category: "K", frequency: 2, verse: "3:134", example: "والكاظمين الغيظ — And those who restrain anger" },

  { id: 551, arabic: "مستقيم", transliteration: "Mustaqeem", meaning: "Straight / upright", category: "M", frequency: 45, verse: "1:6", example: "اهدنا الصراط المستقيم — Guide us to the straight path" },

  { id: 561, arabic: "ناظرون", transliteration: "Naaziroon", meaning: "Watching / observing", category: "N", frequency: 5, verse: "75:21", example: "يوم ينظرون — The Day they are looking" },

  { id: 571, arabic: "ويل", transliteration: "Wayl", meaning: "Woe / ruin", category: "W", frequency: 11, verse: "83:1", example: "ويل للمطفرين — Woe to those who give less" },

  { id: 581, arabic: "يس", transliteration: "Yaa-Seen", meaning: "Ya-Sin (Quranic opening)", category: "Y", frequency: 2, verse: "36:1", example: "يس والقرآن الحكيم — Ya-Sin. By the wise Quran" },

  { id: 591, arabic: "زينة", transliteration: "Zeena", meaning: "Adornment / beauty", category: "Z", frequency: 6, verse: "3:14", example: "زينة للناس حب الشهوات — Adorned for people is the love of desires" },

  { id: 601, arabic: "غاشية", transliteration: "Ghaashiyah", meaning: "The overwhelming / covering", category: "G", frequency: 2, verse: "88:1", example: "هل أتاك حديث الغاشية — Has there come to you the report of the Overwhelming event?" },
];

// Fully voweled (Harakaat) forms for display purposes.
// Key = word id, Value = Arabic with full diacritics.
// These are shown in the hero card, modal, and grid for proper pronunciation.
// The bare `arabic` field is still used for verse-highlight matching.
const VOCALIZED = {
  1: "ٱللَّهُ",
  2: "ٱلرَّحْمَـٰنُ",
  3: "ٱلرَّحِيمُ",
  4: "ٱلْعَـٰلَمُونَ",
  5: "ءَامَنَ",
  6: "ءَايَةٌ",
  7: "أَرْضٌ",
  8: "أَسْلَمَ",
  9: "أَمْرٌ",
  10: "أَنْعَمْتَ",

  11: "بَارَكَ",
  12: "بَيْنَ",
  13: "بَـٰطِلٌ",
  14: "بَشَرٌ",
  15: "بَصِيرٌ",
  16: "بَعْثٌ",
  17: "بِئْسَ",
  18: "بُشْرَىٰ",
  19: "بَلْ",
  20: "بَنَىٰ",

  21: "تَوْبَةٌ",
  22: "تَقْوَىٰ",
  23: "تَلَا",
  24: "تَوَلَّىٰ",
  25: "تَرَكَ",
  26: "تَبَارَكَ",
  27: "تَسْبِيحٌ",
  28: "تَفْسِيرٌ",
  29: "تَذْكِرَةٌ",
  30: "تَبَارٌ",

  31: "جَنَّةٌ",
  32: "جَـٰدَلَ",
  33: "جَاءَ",
  34: "جَعَلَ",
  35: "جَنَّـٰتٌ",
  36: "جَزَاءٌ",
  37: "جَمْعٌ",
  38: "جَمَالٌ",

  41: "حَمْدٌ",
  42: "حُكْمٌ",
  43: "حَلَـٰلٌ",
  44: "حَرَامٌ",
  45: "حِفْظٌ",
  46: "حَكِيمٌ",
  47: "حَقٌّ",
  48: "حَيَوٰةٌ",
  49: "حُزْنٌ",
  50: "حَشْرٌ",

  51: "خَـٰلِقٌ",
  52: "خَيْرٌ",
  53: "خَوْفٌ",
  54: "خَشْيَةٌ",
  55: "خَبِيثٌ",

  61: "دُعَاءٌ",
  62: "دُنْيَا",
  63: "دَخَلَ",
  64: "ذِكْرٌ",
  65: "دَلِيلٌ",

  71: "رِجَالٌ",
  72: "رَحْمَةٌ",
  73: "رَبٌّ",
  74: "رَسُولٌ",
  75: "رِزْقٌ",
  76: "رِضًا",
  77: "رَبُّكَ",
  78: "رَقَبَ",

  81: "سَمَاءٌ",
  82: "سُبْحَـٰنَ",
  83: "سَلَـٰمٌ",
  84: "صَلَوٰةٌ",
  85: "صَبْرٌ",
  86: "صِدْقٌ",
  87: "سَيِّئَةٌ",
  88: "سُلْطَـٰنٌ",
  89: "شُكْرٌ",
  90: "شَرٌّ",

  91: "طَاعَةٌ",
  92: "طَيِّبٌ",
  93: "طَرِيقٌ",

  101: "عِلْمٌ",
  102: "عَذَابٌ",
  103: "عَبْدٌ",
  104: "عَظِيمٌ",
  105: "عَفْوٌ",

  111: "فَـٰتِحَةٌ",
  112: "فُرْقَانٌ",
  113: "فَضْلٌ",
  114: "فِكْرٌ",
  115: "فِسْقٌ",

  121: "قُرْءَانٌ",
  122: "قِيَـٰمَةٌ",
  123: "قَدْرٌ",
  124: "قَلَمٌ",
  125: "قَوْلٌ",

  131: "كِتَـٰبٌ",
  132: "كُفْرٌ",
  133: "كَلِمَةٌ",

  141: "لَيْلَةٌ",
  142: "لُطْفٌ",
  143: "لَعْنَةٌ",

  151: "مُؤْمِنٌ",
  152: "مَوْتٌ",
  153: "مَلَكٌ",
  154: "مَسْجِدٌ",
  155: "مُحَمَّدٌ",
  156: "مَصِيرٌ",
  157: "مِيزَانٌ",
  158: "مَعْصِيَةٌ",

  161: "نُورٌ",
  162: "نَاسٌ",
  163: "نِعْمَةٌ",
  164: "نَبِيٌّ",
  165: "نَارٌ",

  171: "هُدًى",
  172: "هِدَايَةٌ",

  181: "وَلِيٌّ",
  182: "وَضَعَ",
  183: "وَجْهٌ",

  191: "يَوْمٌ",
  192: "يَقِينٌ",
  193: "يَأْسٌ",

  201: "زَكَوٰةٌ",
  202: "ظُلْمٌ",
  203: "ظَنٌّ",

  211: "غَفُورٌ",
  212: "غَيْبٌ",

  221: "فَجْرٌ",
  222: "فِرْدَوْسٌ",

  231: "صَـٰدِقِينَ",
  232: "صَـٰلِحَـٰتٌ",

  241: "قَضَاءٌ",
  242: "قَرْيَةٌ",

  251: "كَـٰفِرُونَ",
  134: "كَرِيمٌ",

  261: "مَلَـٰئِكَةٌ",

  271: "نُزُولٌ",

  281: "وَاحِدٌ",

  291: "يُسْرٌ",

  301: "أُمَّةٌ",
  302: "أُذُنٌ",
  303: "أَجْرٌ",

  311: "بَعْضٌ",
  312: "بَحْرٌ",

  321: "تِلَاوَةٌ",

  331: "جَـٰهَدَ",

  351: "خَـٰشِعُونَ",

  361: "دَعَوْا",

  371: "رَاغِبٌ",
  372: "رَقِيبٌ",

  381: "سُجُودٌ",

  391: "صَـٰبِرِينَ",

  401: "طٰهٰ",

  411: "عَـٰلِمٌ",

  421: "فَتْحٌ",

  431: "قَدِيرٌ",

  441: "كَبِيرٌ",

  451: "لَطِيفٌ",

  461: "مَجِيدٌ",

  471: "نَذِيرٌ",

  481: "وَابِلٌ",

  491: "يَابِسٌ",

  501: "زَبُورٌ",

  511: "غَنِيٌّ",

  521: "فَـٰسِقُونَ",

  531: "قَرِينٌ",

  541: "كَـٰظِمُونَ",

  551: "مُسْتَقِيمٌ",

  561: "نَـٰظِرُونَ",

  571: "وَيْلٌ",

  581: "يٰسٓ",

  591: "زِينَةٌ",

  601: "غَـٰشِيَةٌ",
};

