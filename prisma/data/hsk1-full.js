// prisma/data/hsk1-full.js
// Trọn bộ 150 từ vựng chuẩn HSK 1 phân bổ qua 15 bài học theo chủ đề thực tế

const hsk1Lessons = [
  { id: 'hsk1-l1', levelId: 'hsk1', order: 1, title: '你好', titleVi: 'Chào hỏi & Xã giao' },
  { id: 'hsk1-l2', levelId: 'hsk1', order: 2, title: '一二三四五', titleVi: 'Chữ số & Số đếm' },
  { id: 'hsk1-l3', levelId: 'hsk1', order: 3, title: '你叫什么名字', titleVi: 'Đại từ & Tên gọi' },
  { id: 'hsk1-l4', levelId: 'hsk1', order: 4, title: '她是我的汉语老师', titleVi: 'Gia đình & Quốc gia' },
  { id: 'hsk1-l5', levelId: 'hsk1', order: 5, title: '我们在学校学习', titleVi: 'Trường học & Nghề nghiệp' },
  { id: 'hsk1-l6', levelId: 'hsk1', order: 6, title: '今天几号', titleVi: 'Thời gian & Lịch' },
  { id: 'hsk1-l7', levelId: 'hsk1', order: 7, title: '现在几点', titleVi: 'Giờ giấc & Sinh hoạt' },
  { id: 'hsk1-l8', levelId: 'hsk1', order: 8, title: '我想喝茶', titleVi: 'Ẩm thực & Đồ uống' },
  { id: 'hsk1-l9', levelId: 'hsk1', order: 9, title: '去商店买东西', titleVi: 'Mua sắm & Tiền bạc' },
  { id: 'hsk1-l10', levelId: 'hsk1', order: 10, title: '桌子上有什么', titleVi: 'Đồ vật & Vị trí' },
  { id: 'hsk1-l11', levelId: 'hsk1', order: 11, title: '你在哪儿工作', titleVi: 'Địa điểm & Phương tiện' },
  { id: 'hsk1-l12', levelId: 'hsk1', order: 12, title: '今天天气怎么样', titleVi: 'Thời tiết & Động vật' },
  { id: 'hsk1-l13', levelId: 'hsk1', order: 13, title: '我会说汉语', titleVi: 'Kỹ năng & Ngôn ngữ' },
  { id: 'hsk1-l14', levelId: 'hsk1', order: 14, title: '认识你很高兴', titleVi: 'Cảm xúc & Tính chất' },
  { id: 'hsk1-l15', levelId: 'hsk1', order: 15, title: '他在打电话呢', titleVi: 'Giao tiếp & Đời sống' },
];

const hsk1Vocab = [
  // --- BÀI 1: CHÀO HỎI & XÃ GIAO (1-10) ---
  {
    id: 'hsk1-v001', lessonId: 'hsk1-l1', hanzi: '你', pinyin: 'nǐ', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80',
    exampleSentence: '你好吗？', exampleSentenceVi: 'Bạn khỏe không?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Bạn, anh, chị (ngôi thứ 2 số ít)' }]
  },
  {
    id: 'hsk1-v002', lessonId: 'hsk1-l1', hanzi: '好', pinyin: 'hǎo', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    exampleSentence: '今天天气很好。', exampleSentenceVi: 'Thời tiết hôm nay rất tốt.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Tốt, đẹp, khỏe, được' }]
  },
  {
    id: 'hsk1-v003', lessonId: 'hsk1-l1', hanzi: '您', pinyin: 'nín', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80',
    exampleSentence: '老师，您好！', exampleSentenceVi: 'Em chào thầy/cô ạ!',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Ngài, ông, bà (kính ngữ của 你)' }]
  },
  {
    id: 'hsk1-v004', lessonId: 'hsk1-l1', hanzi: '你们', pinyin: 'nǐmen', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    exampleSentence: '你们都是好朋友。', exampleSentenceVi: 'Các bạn đều là bạn tốt.',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Các bạn, các anh, các chị' }]
  },
  {
    id: 'hsk1-v005', lessonId: 'hsk1-l1', hanzi: '对不起', pinyin: 'duìbuqǐ', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1584447141399-be2c47895317?w=400&q=80',
    exampleSentence: '对不起，我来晚了。', exampleSentenceVi: 'Xin lỗi, tôi đến muộn.',
    meanings: [{ wordClass: 'Cụm từ', meaningVi: 'Xin lỗi' }]
  },
  {
    id: 'hsk1-v006', lessonId: 'hsk1-l1', hanzi: '没关系', pinyin: 'méiguānxi', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80',
    exampleSentence: '没关系，请进。', exampleSentenceVi: 'Không sao đâu, xin mời vào.',
    meanings: [{ wordClass: 'Cụm từ', meaningVi: 'Không có gì, không sao' }]
  },
  {
    id: 'hsk1-v007', lessonId: 'hsk1-l1', hanzi: '谢谢', pinyin: 'xièxie', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80',
    exampleSentence: '谢谢你的帮助。', exampleSentenceVi: 'Cảm ơn sự giúp đỡ của bạn.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Cảm ơn, tạ ơn' }]
  },
  {
    id: 'hsk1-v008', lessonId: 'hsk1-l1', hanzi: '不客气', pinyin: 'búkèqi', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    exampleSentence: '不用谢，不客气。', exampleSentenceVi: 'Đừng cảm ơn, không có chi.',
    meanings: [{ wordClass: 'Cụm từ', meaningVi: 'Đừng khách sáo, không có gì' }]
  },
  {
    id: 'hsk1-v009', lessonId: 'hsk1-l1', hanzi: '再见', pinyin: 'zàijiàn', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    exampleSentence: '明天见，再见！', exampleSentenceVi: 'Mai gặp nhé, tạm biệt!',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Tạm biệt, hẹn gặp lại' }]
  },
  {
    id: 'hsk1-v010', lessonId: 'hsk1-l1', hanzi: '请', pinyin: 'qǐng', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80',
    exampleSentence: '请进，请坐。', exampleSentenceVi: 'Xin mời vào, xin mời ngồi.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Mời, xin, nhờ' }]
  },

  // --- BÀI 2: CHỮ SỐ & SỐ ĐẾM (11-20) ---
  {
    id: 'hsk1-v011', lessonId: 'hsk1-l2', hanzi: '一', pinyin: 'yī', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '我有一个苹果。', exampleSentenceVi: 'Tôi có một quả táo.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 1, một' }]
  },
  {
    id: 'hsk1-v012', lessonId: 'hsk1-l2', hanzi: '二', pinyin: 'èr', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '桌子上有两本书。', exampleSentenceVi: 'Trên bàn có hai quyển sách.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 2, hai' }]
  },
  {
    id: 'hsk1-v013', lessonId: 'hsk1-l2', hanzi: '三', pinyin: 'sān', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '我家有三口人。', exampleSentenceVi: 'Nhà tôi có ba người.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 3, ba' }]
  },
  {
    id: 'hsk1-v014', lessonId: 'hsk1-l2', hanzi: '四', pinyin: 'sì', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '一年有四个季节。', exampleSentenceVi: 'Một năm có bốn mùa.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 4, bốn' }]
  },
  {
    id: 'hsk1-v015', lessonId: 'hsk1-l2', hanzi: '五', pinyin: 'wǔ', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '今天星期五。', exampleSentenceVi: 'Hôm nay là thứ sáu.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 5, năm' }]
  },
  {
    id: 'hsk1-v016', lessonId: 'hsk1-l2', hanzi: '六', pinyin: 'liù', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '六点了，我们走吧。', exampleSentenceVi: 'Sáu giờ rồi, chúng ta đi thôi.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 6, sáu' }]
  },
  {
    id: 'hsk1-v017', lessonId: 'hsk1-l2', hanzi: '七', pinyin: 'qī', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '一个星期有七天。', exampleSentenceVi: 'Một tuần có bảy ngày.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 7, bảy' }]
  },
  {
    id: 'hsk1-v018', lessonId: 'hsk1-l2', hanzi: '八', pinyin: 'bā', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '八点半上课。', exampleSentenceVi: 'Tám rưỡi vào lớp.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 8, tám' }]
  },
  {
    id: 'hsk1-v019', lessonId: 'hsk1-l2', hanzi: '九', pinyin: 'jiǔ', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '九月一号开学。', exampleSentenceVi: 'Ngày một tháng chín khai giảng.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 9, chín' }]
  },
  {
    id: 'hsk1-v020', lessonId: 'hsk1-l2', hanzi: '十', pinyin: 'shí', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '这里有十个学生。', exampleSentenceVi: 'Ở đây có mười học sinh.',
    meanings: [{ wordClass: 'Số từ', meaningVi: 'Số 10, mười' }]
  },

  // --- BÀI 3: ĐẠI TỪ & TÊN GỌI (21-30) ---
  {
    id: 'hsk1-v021', lessonId: 'hsk1-l3', hanzi: '我', pinyin: 'wǒ', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
    exampleSentence: '我爱学中文。', exampleSentenceVi: 'Tôi thích học tiếng Trung.',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Tôi, mình, ta' }]
  },
  {
    id: 'hsk1-v022', lessonId: 'hsk1-l3', hanzi: '我们', pinyin: 'wǒmen', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    exampleSentence: '我们都在北京。', exampleSentenceVi: 'Chúng tôi đều ở Bắc Kinh.',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Chúng tôi, chúng ta' }]
  },
  {
    id: 'hsk1-v023', lessonId: 'hsk1-l3', hanzi: '他', pinyin: 'tā', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    exampleSentence: '他是我的同学。', exampleSentenceVi: 'Cậu ấy là bạn học của tôi.',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Anh ấy, cậu ấy, ông ấy' }]
  },
  {
    id: 'hsk1-v024', lessonId: 'hsk1-l3', hanzi: '她', pinyin: 'tā', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    exampleSentence: '她是我的好朋友。', exampleSentenceVi: 'Cô ấy là bạn tốt của tôi.',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Cô ấy, chị ấy, bà ấy' }]
  },
  {
    id: 'hsk1-v025', lessonId: 'hsk1-l3', hanzi: '他们', pinyin: 'tāmen', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    exampleSentence: '他们去商店了。', exampleSentenceVi: 'Bọn họ đi cửa hàng rồi.',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Họ, bọn họ, các anh ấy' }]
  },
  {
    id: 'hsk1-v026', lessonId: 'hsk1-l3', hanzi: '叫', pinyin: 'jiào', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    exampleSentence: '我叫李明。', exampleSentenceVi: 'Tôi tên là Lý Minh.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Tên là, gọi là' }]
  },
  {
    id: 'hsk1-v027', lessonId: 'hsk1-l3', hanzi: '名字', pinyin: 'míngzi', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
    exampleSentence: '你的名字是什么？', exampleSentenceVi: 'Tên của bạn là gì?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Tên, danh xưng' }]
  },
  {
    id: 'hsk1-v028', lessonId: 'hsk1-l3', hanzi: '什么', pinyin: 'shénme', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    exampleSentence: '你想吃什么？', exampleSentenceVi: 'Bạn muốn ăn cái gì?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Cái gì, gì' }]
  },
  {
    id: 'hsk1-v029', lessonId: 'hsk1-l3', hanzi: '是', pinyin: 'shì', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    exampleSentence: '我是中国人。', exampleSentenceVi: 'Tôi là người Trung Quốc.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Là, đúng, phải' }]
  },
  {
    id: 'hsk1-v030', lessonId: 'hsk1-l3', hanzi: '不', pinyin: 'bù', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    exampleSentence: '我不是老师。', exampleSentenceVi: 'Tôi không phải là giáo viên.',
    meanings: [{ wordClass: 'Phó từ', meaningVi: 'Không, chẳng' }]
  },

  // --- BÀI 4: GIA ĐÌNH & QUỐC GIA (31-40) ---
  {
    id: 'hsk1-v031', lessonId: 'hsk1-l4', hanzi: '人', pinyin: 'rén', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    exampleSentence: '他是越南人。', exampleSentenceVi: 'Anh ấy là người Việt Nam.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Người, con người' }]
  },
  {
    id: 'hsk1-v032', lessonId: 'hsk1-l4', hanzi: '中国', pinyin: 'Zhōngguó', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&q=80',
    exampleSentence: '中国很大。', exampleSentenceVi: 'Trung Quốc rất lớn.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Trung Quốc' }]
  },
  {
    id: 'hsk1-v033', lessonId: 'hsk1-l4', hanzi: '北京', pinyin: 'Běijīng', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&q=80',
    exampleSentence: '我想去北京旅游。', exampleSentenceVi: 'Tôi muốn đi Bắc Kinh du lịch.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Bắc Kinh' }]
  },
  {
    id: 'hsk1-v034', lessonId: 'hsk1-l4', hanzi: '爸爸', pinyin: 'bàba', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&q=80',
    exampleSentence: '我爸爸是医生。', exampleSentenceVi: 'Bố tôi là bác sĩ.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Bố, ba, cha' }]
  },
  {
    id: 'hsk1-v035', lessonId: 'hsk1-l4', hanzi: '妈妈', pinyin: 'māma', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    exampleSentence: '妈妈做的菜很好吃。', exampleSentenceVi: 'Món mẹ nấu rất ngon.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Mẹ, má' }]
  },
  {
    id: 'hsk1-v036', lessonId: 'hsk1-l4', hanzi: '儿子', pinyin: 'érzi', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&q=80',
    exampleSentence: '他有一个儿子。', exampleSentenceVi: 'Anh ấy có một cậu con trai.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Con trai' }]
  },
  {
    id: 'hsk1-v037', lessonId: 'hsk1-l4', hanzi: '女儿', pinyin: 'nǚ\'ér', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80',
    exampleSentence: '她女儿今年十岁。', exampleSentenceVi: 'Con gái cô ấy năm nay mười tuổi.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Con gái' }]
  },
  {
    id: 'hsk1-v038', lessonId: 'hsk1-l4', hanzi: '家', pinyin: 'jiā', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    exampleSentence: '欢迎来我家玩！', exampleSentenceVi: 'Hoan nghênh đến nhà tôi chơi!',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Nhà, gia đình' }]
  },
  {
    id: 'hsk1-v039', lessonId: 'hsk1-l4', hanzi: '谁', pinyin: 'shéi', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    exampleSentence: '他是谁？', exampleSentenceVi: 'Anh ấy là ai?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Ai' }]
  },
  {
    id: 'hsk1-v040', lessonId: 'hsk1-l4', hanzi: '的', pinyin: 'de', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    exampleSentence: '这是我的书。', exampleSentenceVi: 'Đây là sách của tôi.',
    meanings: [{ wordClass: 'Trợ từ', meaningVi: 'Của (biểu thị quan hệ sở hữu)' }]
  },

  // --- BÀI 5: TRƯỜNG HỌC & NGHỀ NGHIỆP (41-50) ---
  {
    id: 'hsk1-v041', lessonId: 'hsk1-l5', hanzi: '老师', pinyin: 'lǎoshī', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80',
    exampleSentence: '王老师教我们汉语。', exampleSentenceVi: 'Thầy Vương dạy chúng tôi tiếng Trung.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Thầy giáo, cô giáo' }]
  },
  {
    id: 'hsk1-v042', lessonId: 'hsk1-l5', hanzi: '学生', pinyin: 'xuésheng', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80',
    exampleSentence: '学校里有很多学生。', exampleSentenceVi: 'Trong trường có rất nhiều học sinh.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Học sinh, sinh viên' }]
  },
  {
    id: 'hsk1-v043', lessonId: 'hsk1-l5', hanzi: '同学', pinyin: 'tóngxué', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80',
    exampleSentence: '我们是大学同学。', exampleSentenceVi: 'Chúng tôi là bạn học đại học.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Bạn học, bạn cùng lớp' }]
  },
  {
    id: 'hsk1-v044', lessonId: 'hsk1-l5', hanzi: '朋友', pinyin: 'péngyou', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80',
    exampleSentence: '他有很多好朋友。', exampleSentenceVi: 'Anh ấy có rất nhiều bạn tốt.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Bạn bè, người bạn' }]
  },
  {
    id: 'hsk1-v045', lessonId: 'hsk1-l5', hanzi: '医生', pinyin: 'yīshēng', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    exampleSentence: '医生在医院工作。', exampleSentenceVi: 'Bác sĩ làm việc ở bệnh viện.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Bác sĩ, thầy thuốc' }]
  },
  {
    id: 'hsk1-v046', lessonId: 'hsk1-l5', hanzi: '先生', pinyin: 'xiānsheng', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    exampleSentence: '张先生在看报纸。', exampleSentenceVi: 'Ông Trương đang đọc báo.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Ông, ngài, quý ông' }]
  },
  {
    id: 'hsk1-v047', lessonId: 'hsk1-l5', hanzi: '小姐', pinyin: 'xiǎojiě', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    exampleSentence: '李小姐买了一件衣服。', exampleSentenceVi: 'Cô Lý đã mua một bộ quần áo.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Cô, tiểu thư' }]
  },
  {
    id: 'hsk1-v048', lessonId: 'hsk1-l5', hanzi: '学校', pinyin: 'xuéxiào', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80',
    exampleSentence: '我们学校很大。', exampleSentenceVi: 'Trường học của chúng tôi rất lớn.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Trường học' }]
  },
  {
    id: 'hsk1-v049', lessonId: 'hsk1-l5', hanzi: '学习', pinyin: 'xuéxí', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    exampleSentence: '天天向上，好好学习。', exampleSentenceVi: 'Học tập thật tốt, ngày ngày tiến bộ.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Học tập, học hỏi' }]
  },
  {
    id: 'hsk1-v050', lessonId: 'hsk1-l5', hanzi: '工作', pinyin: 'gōngzuò', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
    exampleSentence: '你在哪儿工作？', exampleSentenceVi: 'Bạn làm việc ở đâu?',
    meanings: [{ wordClass: 'Động từ / Danh từ', meaningVi: 'Làm việc / Công việc' }]
  },

  // --- BÀI 6: THỜI GIAN & LỊCH (51-60) ---
  {
    id: 'hsk1-v051', lessonId: 'hsk1-l6', hanzi: '今天', pinyin: 'jīntiān', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    exampleSentence: '今天星期五。', exampleSentenceVi: 'Hôm nay là thứ sáu.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Hôm nay' }]
  },
  {
    id: 'hsk1-v052', lessonId: 'hsk1-l6', hanzi: '明天', pinyin: 'míngtiān', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&q=80',
    exampleSentence: '明天我们去看电影。', exampleSentenceVi: 'Ngày mai chúng ta đi xem phim.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Ngày mai' }]
  },
  {
    id: 'hsk1-v053', lessonId: 'hsk1-l6', hanzi: '昨天', pinyin: 'zuótiān', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80',
    exampleSentence: '昨天天气很冷。', exampleSentenceVi: 'Hôm qua thời tiết rất lạnh.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Hôm qua' }]
  },
  {
    id: 'hsk1-v054', lessonId: 'hsk1-l6', hanzi: '年', pinyin: 'nián', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '他在中国住了三年。', exampleSentenceVi: 'Anh ấy sống ở Trung Quốc ba năm.',
    meanings: [{ wordClass: 'Danh từ / Lượng từ', meaningVi: 'Năm' }]
  },
  {
    id: 'hsk1-v055', lessonId: 'hsk1-l6', hanzi: '月', pinyin: 'yuè', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&q=80',
    exampleSentence: '现在是五月。', exampleSentenceVi: 'Bây giờ là tháng năm.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Tháng, mặt trăng' }]
  },
  {
    id: 'hsk1-v056', lessonId: 'hsk1-l6', hanzi: '日', pinyin: 'rì', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '十月一日是国庆节。', exampleSentenceVi: 'Ngày một tháng mười là ngày Quốc khánh.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Ngày (văn viết)' }]
  },
  {
    id: 'hsk1-v057', lessonId: 'hsk1-l6', hanzi: '号', pinyin: 'hào', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '今天几号？', exampleSentenceVi: 'Hôm nay ngày mấy?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Ngày (khẩu ngữ), số' }]
  },
  {
    id: 'hsk1-v058', lessonId: 'hsk1-l6', hanzi: '星期', pinyin: 'xīngqī', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80',
    exampleSentence: '一个星期有七天。', exampleSentenceVi: 'Một tuần có bảy ngày.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Tuần, thứ' }]
  },
  {
    id: 'hsk1-v059', lessonId: 'hsk1-l6', hanzi: '上午', pinyin: 'shàngwǔ', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    exampleSentence: '上午九点我们上课。', exampleSentenceVi: 'Chín giờ sáng chúng tôi vào học.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Buổi sáng' }]
  },
  {
    id: 'hsk1-v060', lessonId: 'hsk1-l6', hanzi: '下午', pinyin: 'xiàwǔ', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    exampleSentence: '下午我去图书馆。', exampleSentenceVi: 'Buổi chiều tôi đến thư viện.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Buổi chiều' }]
  },

  // --- BÀI 7: GIỜ GIẤC & SINH HOẠT (61-70) ---
  {
    id: 'hsk1-v061', lessonId: 'hsk1-l7', hanzi: '现在', pinyin: 'xiànzài', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&q=80',
    exampleSentence: '现在几点了？', exampleSentenceVi: 'Bây giờ mấy giờ rồi?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Bây giờ, hiện tại' }]
  },
  {
    id: 'hsk1-v062', lessonId: 'hsk1-l7', hanzi: '点', pinyin: 'diǎn', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&q=80',
    exampleSentence: '现在两点整。', exampleSentenceVi: 'Bây giờ đúng hai giờ.',
    meanings: [{ wordClass: 'Lượng từ / Danh từ', meaningVi: 'Giờ, điểm, giọt' }]
  },
  {
    id: 'hsk1-v063', lessonId: 'hsk1-l7', hanzi: '分钟', pinyin: 'fēnzhōng', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&q=80',
    exampleSentence: '我等了你十分钟。', exampleSentenceVi: 'Tôi đã đợi bạn mười phút.',
    meanings: [{ wordClass: 'Lượng từ / Danh từ', meaningVi: 'Phút' }]
  },
  {
    id: 'hsk1-v064', lessonId: 'hsk1-l7', hanzi: '中午', pinyin: 'zhōngwǔ', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    exampleSentence: '中午我们一起吃米饭。', exampleSentenceVi: 'Buổi trưa chúng mình cùng ăn cơm.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Buổi trưa' }]
  },
  {
    id: 'hsk1-v065', lessonId: 'hsk1-l7', hanzi: '时候', pinyin: 'shíhou', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80',
    exampleSentence: '你什么时候回家？', exampleSentenceVi: 'Khi nào bạn về nhà?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Lúc, khi, thời điểm' }]
  },
  {
    id: 'hsk1-v066', lessonId: 'hsk1-l7', hanzi: '吃', pinyin: 'chī', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    exampleSentence: '你想吃什么菜？', exampleSentenceVi: 'Bạn muốn ăn món gì?',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Ăn' }]
  },
  {
    id: 'hsk1-v067', lessonId: 'hsk1-l7', hanzi: '睡觉', pinyin: 'shuìjiào', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&q=80',
    exampleSentence: '太晚了，去睡觉吧。', exampleSentenceVi: 'Muộn quá rồi, đi ngủ thôi.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Ngủ, đi ngủ' }]
  },
  {
    id: 'hsk1-v068', lessonId: 'hsk1-l7', hanzi: '回', pinyin: 'huí', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    exampleSentence: '他五点回家。', exampleSentenceVi: 'Năm giờ anh ấy về nhà.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Về, quay lại' }]
  },
  {
    id: 'hsk1-v069', lessonId: 'hsk1-l7', hanzi: '去', pinyin: 'qù', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80',
    exampleSentence: '我们去商店买水。', exampleSentenceVi: 'Chúng mình đi cửa hàng mua nước.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Đi, đến' }]
  },
  {
    id: 'hsk1-v070', lessonId: 'hsk1-l7', hanzi: '住', pinyin: 'zhù', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80',
    exampleSentence: '你在北京住哪儿？', exampleSentenceVi: 'Bạn sống ở đâu tại Bắc Kinh?',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Ở, sống, cư trú' }]
  },

  // --- BÀI 8: ẨM THỰC & ĐỒ UỐNG (71-80) ---
  {
    id: 'hsk1-v071', lessonId: 'hsk1-l8', hanzi: '喝', pinyin: 'hē', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    exampleSentence: '请喝茶！', exampleSentenceVi: 'Xin mời uống trà!',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Uống' }]
  },
  {
    id: 'hsk1-v072', lessonId: 'hsk1-l8', hanzi: '茶', pinyin: 'chá', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    exampleSentence: '中国人很喜欢喝茶。', exampleSentenceVi: 'Người Trung Quốc rất thích uống trà.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Trà, chè' }]
  },
  {
    id: 'hsk1-v073', lessonId: 'hsk1-l8', hanzi: '水', pinyin: 'shuǐ', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
    exampleSentence: '请多喝水。', exampleSentenceVi: 'Xin hãy uống nhiều nước.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Nước' }]
  },
  {
    id: 'hsk1-v074', lessonId: 'hsk1-l8', hanzi: '菜', pinyin: 'cài', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
    exampleSentence: '中国菜很好吃。', exampleSentenceVi: 'Món ăn Trung Quốc rất ngon.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Rau, món ăn' }]
  },
  {
    id: 'hsk1-v075', lessonId: 'hsk1-l8', hanzi: '米饭', pinyin: 'mǐfàn', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80',
    exampleSentence: '我想吃一碗米饭。', exampleSentenceVi: 'Tôi muốn ăn một bát cơm.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Cơm, cơm trắng' }]
  },
  {
    id: 'hsk1-v076', lessonId: 'hsk1-l8', hanzi: '水果', pinyin: 'shuǐguǒ', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80',
    exampleSentence: '多吃水果对身体好。', exampleSentenceVi: 'Ăn nhiều hoa quả tốt cho sức khỏe.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Hoa quả, trái cây' }]
  },
  {
    id: 'hsk1-v077', lessonId: 'hsk1-l8', hanzi: '苹果', pinyin: 'píngguǒ', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
    exampleSentence: '这个苹果很甜。', exampleSentenceVi: 'Quả táo này rất ngọt.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Quả táo' }]
  },
  {
    id: 'hsk1-v078', lessonId: 'hsk1-l8', hanzi: '杯子', pinyin: 'bēizi', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
    exampleSentence: '桌子上有一个茶杯。', exampleSentenceVi: 'Trên bàn có một chiếc tách trà.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Cốc, ly, tách' }]
  },
  {
    id: 'hsk1-v079', lessonId: 'hsk1-l8', hanzi: '好吃', pinyin: 'hǎochī', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    exampleSentence: '北京烤鸭太好吃了！', exampleSentenceVi: 'Vịt quay Bắc Kinh ngon quá!',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Ngon, ngon miệng' }]
  },
  {
    id: 'hsk1-v080', lessonId: 'hsk1-l8', hanzi: '想', pinyin: 'xiǎng', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80',
    exampleSentence: '我想去中国旅游。', exampleSentenceVi: 'Tôi muốn đi Trung Quốc du lịch.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Muốn, nghĩ, nhớ' }]
  },

  // --- BÀI 9: MUA SẮM & TIỀN BẠC (81-90) ---
  {
    id: 'hsk1-v081', lessonId: 'hsk1-l9', hanzi: '买', pinyin: 'mǎi', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80',
    exampleSentence: '我想买这件衣服。', exampleSentenceVi: 'Tôi muốn mua bộ quần áo này.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Mua' }]
  },
  {
    id: 'hsk1-v082', lessonId: 'hsk1-l9', hanzi: '东西', pinyin: 'dōngxi', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    exampleSentence: '你去买什么东西？', exampleSentenceVi: 'Bạn đi mua đồ gì vậy?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Đồ vật, đồ đạc' }]
  },
  {
    id: 'hsk1-v083', lessonId: 'hsk1-l9', hanzi: '商店', pinyin: 'shāngdiàn', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80',
    exampleSentence: '商店里有很多水果。', exampleSentenceVi: 'Trong cửa hàng có rất nhiều hoa quả.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Cửa hàng, tiệm' }]
  },
  {
    id: 'hsk1-v084', lessonId: 'hsk1-l9', hanzi: '钱', pinyin: 'qián', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&q=80',
    exampleSentence: '这个杯子多少钱？', exampleSentenceVi: 'Chiếc cốc này bao nhiêu tiền?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Tiền' }]
  },
  {
    id: 'hsk1-v085', lessonId: 'hsk1-l9', hanzi: '块', pinyin: 'kuài', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&q=80',
    exampleSentence: '这件衣服一百块钱。', exampleSentenceVi: 'Bộ quần áo này một trăm tệ.',
    meanings: [{ wordClass: 'Lượng từ', meaningVi: 'Đồng (tệ), miếng, tảng' }]
  },
  {
    id: 'hsk1-v086', lessonId: 'hsk1-l9', hanzi: '多少', pinyin: 'duōshao', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&q=80',
    exampleSentence: '你们学校有多少学生？', exampleSentenceVi: 'Trường các bạn có bao nhiêu học sinh?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Bao nhiêu' }]
  },
  {
    id: 'hsk1-v087', lessonId: 'hsk1-l9', hanzi: '这', pinyin: 'zhè', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    exampleSentence: '这是什么东西？', exampleSentenceVi: 'Đây là đồ vật gì?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Đây, này' }]
  },
  {
    id: 'hsk1-v088', lessonId: 'hsk1-l9', hanzi: '那', pinyin: 'nà', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    exampleSentence: '那是他的书。', exampleSentenceVi: 'Kia là sách của anh ấy.',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Kia, đó' }]
  },
  {
    id: 'hsk1-v089', lessonId: 'hsk1-l9', hanzi: '个', pinyin: 'gè', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '我买了一个苹果。', exampleSentenceVi: 'Tôi đã mua một quả táo.',
    meanings: [{ wordClass: 'Lượng từ', meaningVi: 'Cái, chiếc, quả' }]
  },
  {
    id: 'hsk1-v090', lessonId: 'hsk1-l9', hanzi: '本', pinyin: 'běn', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    exampleSentence: '桌上有一本书。', exampleSentenceVi: 'Trên bàn có một quyển sách.',
    meanings: [{ wordClass: 'Lượng từ', meaningVi: 'Quyển, cuốn (sách)' }]
  },

  // --- BÀI 10: ĐỒ VẬT & VỊ TRÍ (91-100) ---
  {
    id: 'hsk1-v091', lessonId: 'hsk1-l10', hanzi: '桌子', pinyin: 'zhuōzi', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80',
    exampleSentence: '桌子上有一台电脑。', exampleSentenceVi: 'Trên bàn có một chiếc máy tính.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Cái bàn' }]
  },
  {
    id: 'hsk1-v092', lessonId: 'hsk1-l10', hanzi: '椅子', pinyin: 'yǐzi', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328ad4f39e8?w=400&q=80',
    exampleSentence: '请坐在椅子上。', exampleSentenceVi: 'Xin hãy ngồi trên ghế.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Cái ghế' }]
  },
  {
    id: 'hsk1-v093', lessonId: 'hsk1-l10', hanzi: '电脑', pinyin: 'diànnǎo', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
    exampleSentence: '这台电脑很好用。', exampleSentenceVi: 'Chiếc máy tính này dùng rất tốt.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Máy tính, máy vi tính' }]
  },
  {
    id: 'hsk1-v094', lessonId: 'hsk1-l10', hanzi: '电视', pinyin: 'diànshì', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80',
    exampleSentence: '爸爸在看电视。', exampleSentenceVi: 'Bố đang xem ti-vi.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Truyền hình, ti-vi' }]
  },
  {
    id: 'hsk1-v095', lessonId: 'hsk1-l10', hanzi: '书', pinyin: 'shū', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
    exampleSentence: '我喜欢看汉语书。', exampleSentenceVi: 'Tôi thích đọc sách tiếng Trung.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Sách, cuốn sách' }]
  },
  {
    id: 'hsk1-v096', lessonId: 'hsk1-l10', hanzi: '上', pinyin: 'shàng', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80',
    exampleSentence: '猫在桌子上面。', exampleSentenceVi: 'Con mèo ở trên bàn.',
    meanings: [{ wordClass: 'Danh từ chỉ vị trí / Động từ', meaningVi: 'Trên, phía trên / Đi lên' }]
  },
  {
    id: 'hsk1-v097', lessonId: 'hsk1-l10', hanzi: '下', pinyin: 'xià', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328ad4f39e8?w=400&q=80',
    exampleSentence: '狗在椅子下面。', exampleSentenceVi: 'Con chó ở dưới ghế.',
    meanings: [{ wordClass: 'Danh từ chỉ vị trí / Động từ', meaningVi: 'Dưới, phía dưới / Đi xuống' }]
  },
  {
    id: 'hsk1-v098', lessonId: 'hsk1-l10', hanzi: '前面', pinyin: 'qiánmiàn', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    exampleSentence: '前面是学校。', exampleSentenceVi: 'Phía trước là trường học.',
    meanings: [{ wordClass: 'Danh từ chỉ vị trí', meaningVi: 'Phía trước, đằng trước' }]
  },
  {
    id: 'hsk1-v099', lessonId: 'hsk1-l10', hanzi: '后面', pinyin: 'hòumiàn', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    exampleSentence: '医院在商店后面。', exampleSentenceVi: 'Bệnh viện ở phía sau cửa hàng.',
    meanings: [{ wordClass: 'Danh từ chỉ vị trí', meaningVi: 'Phía sau, đằng sau' }]
  },
  {
    id: 'hsk1-v100', lessonId: 'hsk1-l10', hanzi: '里', pinyin: 'lǐ', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    exampleSentence: '书在包里。', exampleSentenceVi: 'Sách ở bên trong túi.',
    meanings: [{ wordClass: 'Danh từ chỉ vị trí', meaningVi: 'Trong, bên trong' }]
  },

  // --- BÀI 11: ĐỊA ĐIỂM & PHƯƠNG TIỆN (101-110) ---
  {
    id: 'hsk1-v101', lessonId: 'hsk1-l11', hanzi: '在', pinyin: 'zài', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80',
    exampleSentence: '他在图书馆看书。', exampleSentenceVi: 'Anh ấy đang ở thư viện đọc sách.',
    meanings: [{ wordClass: 'Giới từ / Động từ', meaningVi: 'Ở, tại, đang (làm gì)' }]
  },
  {
    id: 'hsk1-v102', lessonId: 'hsk1-l11', hanzi: '哪儿', pinyin: 'nǎr', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=400&q=80',
    exampleSentence: '你去哪儿？', exampleSentenceVi: 'Bạn đi đâu thế?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Ở đâu, đâu' }]
  },
  {
    id: 'hsk1-v103', lessonId: 'hsk1-l11', hanzi: '医院', pinyin: 'yīyuàn', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
    exampleSentence: '他在医院工作。', exampleSentenceVi: 'Anh ấy làm việc ở bệnh viện.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Bệnh viện' }]
  },
  {
    id: 'hsk1-v104', lessonId: 'hsk1-l11', hanzi: '饭店', pinyin: 'fàndiàn', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    exampleSentence: '我们在饭店吃饭。', exampleSentenceVi: 'Chúng tôi ăn cơm ở nhà hàng.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Nhà hàng, quán ăn, khách sạn' }]
  },
  {
    id: 'hsk1-v105', lessonId: 'hsk1-l11', hanzi: '火车站', pinyin: 'huǒchēzhàn', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80',
    exampleSentence: '我送你去火车站。', exampleSentenceVi: 'Tôi đưa bạn ra ga tàu hỏa.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Ga xe lửa, ga tàu hỏa' }]
  },
  {
    id: 'hsk1-v106', lessonId: 'hsk1-l11', hanzi: '飞机', pinyin: 'fēijī', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80',
    exampleSentence: '我是坐飞机来的。', exampleSentenceVi: 'Tôi đi máy bay tới đây.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Máy bay' }]
  },
  {
    id: 'hsk1-v107', lessonId: 'hsk1-l11', hanzi: '出租车', pinyin: 'chūzūchē', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&q=80',
    exampleSentence: '我们坐出租车去吧。', exampleSentenceVi: 'Chúng mình đi taxi đi.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Xe taxi' }]
  },
  {
    id: 'hsk1-v108', lessonId: 'hsk1-l11', hanzi: '开', pinyin: 'kāi', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80',
    exampleSentence: '爸爸会开车。', exampleSentenceVi: 'Bố biết lái xe hơi.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Lái (xe), mở' }]
  },
  {
    id: 'hsk1-v109', lessonId: 'hsk1-l11', hanzi: '坐', pinyin: 'zuò', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328ad4f39e8?w=400&q=80',
    exampleSentence: '请坐在这儿。', exampleSentenceVi: 'Xin hãy ngồi ở đây.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Ngồi, đi (tàu, xe, máy bay)' }]
  },
  {
    id: 'hsk1-v110', lessonId: 'hsk1-l11', hanzi: '怎么', pinyin: 'zěnme', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    exampleSentence: '去火车站怎么走？', exampleSentenceVi: 'Đi đến ga tàu hỏa đi như thế nào?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Thế nào, làm sao, bằng cách nào' }]
  },

  // --- BÀI 12: THỜI TIẾT & ĐỘNG VẬT (111-120) ---
  {
    id: 'hsk1-v111', lessonId: 'hsk1-l12', hanzi: '猫', pinyin: 'māo', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    exampleSentence: '我家有一只小猫。', exampleSentenceVi: 'Nhà tôi có một con mèo nhỏ.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Con mèo' }]
  },
  {
    id: 'hsk1-v112', lessonId: 'hsk1-l12', hanzi: '狗', pinyin: 'gǒu', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80',
    exampleSentence: '那只小狗很可爱。', exampleSentenceVi: 'Chú chó nhỏ kia rất đáng yêu.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Con chó' }]
  },
  {
    id: 'hsk1-v113', lessonId: 'hsk1-l12', hanzi: '天气', pinyin: 'tiānqì', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&q=80',
    exampleSentence: '今天的天气怎么样？', exampleSentenceVi: 'Thời tiết hôm nay thế nào?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Thời tiết' }]
  },
  {
    id: 'hsk1-v114', lessonId: 'hsk1-l12', hanzi: '怎么样', pinyin: 'zěnmeyàng', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    exampleSentence: '这本书怎么样？', exampleSentenceVi: 'Quyển sách này như thế nào?',
    meanings: [{ wordClass: 'Đại từ', meaningVi: 'Như thế nào, ra sao' }]
  },
  {
    id: 'hsk1-v115', lessonId: 'hsk1-l12', hanzi: '冷', pinyin: 'lěng', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=400&q=80',
    exampleSentence: '今天外面很冷。', exampleSentenceVi: 'Hôm nay bên ngoài rất lạnh.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Lạnh' }]
  },
  {
    id: 'hsk1-v116', lessonId: 'hsk1-l12', hanzi: '热', pinyin: 'rè', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    exampleSentence: '夏天的天气很热。', exampleSentenceVi: 'Thời tiết mùa hè rất nóng.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Nóng' }]
  },
  {
    id: 'hsk1-v117', lessonId: 'hsk1-l12', hanzi: '下雨', pinyin: 'xiàyǔ', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&q=80',
    exampleSentence: '外面正在下雨。', exampleSentenceVi: 'Bên ngoài trời đang mưa.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Mưa, trời mưa' }]
  },
  {
    id: 'hsk1-v118', lessonId: 'hsk1-l12', hanzi: '太', pinyin: 'tài', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80',
    exampleSentence: '太好了！', exampleSentenceVi: 'Tốt quá rồi!',
    meanings: [{ wordClass: 'Phó từ', meaningVi: 'Quá, lắm' }]
  },
  {
    id: 'hsk1-v119', lessonId: 'hsk1-l12', hanzi: '很', pinyin: 'hěn', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    exampleSentence: '我很高兴。', exampleSentenceVi: 'Tôi rất vui.',
    meanings: [{ wordClass: 'Phó từ', meaningVi: 'Rất' }]
  },
  {
    id: 'hsk1-v120', lessonId: 'hsk1-l12', hanzi: '都', pinyin: 'dōu', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    exampleSentence: '他们都是好学生。', exampleSentenceVi: 'Bọn họ đều là học sinh giỏi.',
    meanings: [{ wordClass: 'Phó từ', meaningVi: 'Đều, tất cả' }]
  },

  // --- BÀI 13: KỸ NĂNG & NGÔN NGỮ (121-130) ---
  {
    id: 'hsk1-v121', lessonId: 'hsk1-l13', hanzi: '会', pinyin: 'huì', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    exampleSentence: '我会说汉语。', exampleSentenceVi: 'Tôi biết nói tiếng Trung.',
    meanings: [{ wordClass: 'Động từ năng nguyện', meaningVi: 'Biết (thông qua học tập), sẽ' }]
  },
  {
    id: 'hsk1-v122', lessonId: 'hsk1-l13', hanzi: '能', pinyin: 'néng', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    exampleSentence: '我能坐这儿吗？', exampleSentenceVi: 'Tôi có thể ngồi đây không?',
    meanings: [{ wordClass: 'Động từ năng nguyện', meaningVi: 'Có thể' }]
  },
  {
    id: 'hsk1-v123', lessonId: 'hsk1-l13', hanzi: '说', pinyin: 'shuō', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&q=80',
    exampleSentence: '请大声说。', exampleSentenceVi: 'Xin hãy nói to lên.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Nói' }]
  },
  {
    id: 'hsk1-v124', lessonId: 'hsk1-l13', hanzi: '说话', pinyin: 'shuōhuà', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&q=80',
    exampleSentence: '他们在说话。', exampleSentenceVi: 'Họ đang nói chuyện.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Nói chuyện, phát biểu' }]
  },
  {
    id: 'hsk1-v125', lessonId: 'hsk1-l13', hanzi: '读', pinyin: 'dú', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    exampleSentence: '请跟我读生词。', exampleSentenceVi: 'Xin đọc từ mới theo tôi.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Đọc' }]
  },
  {
    id: 'hsk1-v126', lessonId: 'hsk1-l13', hanzi: '写', pinyin: 'xiě', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
    exampleSentence: '你会写汉字吗？', exampleSentenceVi: 'Bạn biết viết chữ Hán không?',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Viết' }]
  },
  {
    id: 'hsk1-v127', lessonId: 'hsk1-l13', hanzi: '汉字', pinyin: 'hànzì', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
    exampleSentence: '汉字很有意思。', exampleSentenceVi: 'Chữ Hán rất thú vị.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Chữ Hán' }]
  },
  {
    id: 'hsk1-v128', lessonId: 'hsk1-l13', hanzi: '字', pinyin: 'zì', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
    exampleSentence: '这个字怎么读？', exampleSentenceVi: 'Chữ này đọc như thế nào?',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Chữ, ký tự' }]
  },
  {
    id: 'hsk1-v129', lessonId: 'hsk1-l13', hanzi: '汉语', pinyin: 'hànyǔ', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80',
    exampleSentence: '我喜欢学习汉语。', exampleSentenceVi: 'Tôi thích học tiếng Hán.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Tiếng Hán, tiếng Trung' }]
  },
  {
    id: 'hsk1-v130', lessonId: 'hsk1-l13', hanzi: '听', pinyin: 'tīng', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    exampleSentence: '请听录音。', exampleSentenceVi: 'Xin hãy nghe băng ghi âm.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Nghe' }]
  },

  // --- BÀI 14: CẢM XÚC & TÍNH CHẤT (131-140) ---
  {
    id: 'hsk1-v131', lessonId: 'hsk1-l14', hanzi: '爱', pinyin: 'ài', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80',
    exampleSentence: '我爱我的爸爸妈妈。', exampleSentenceVi: 'Tôi yêu bố mẹ tôi.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Yêu, thương, thích' }]
  },
  {
    id: 'hsk1-v132', lessonId: 'hsk1-l14', hanzi: '喜欢', pinyin: 'xǐhuan', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80',
    exampleSentence: '我喜欢中国文化。', exampleSentenceVi: 'Tôi thích văn hóa Trung Quốc.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Thích, yêu thích' }]
  },
  {
    id: 'hsk1-v133', lessonId: 'hsk1-l14', hanzi: '认识', pinyin: 'rènshi', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80',
    exampleSentence: '很高兴认识你！', exampleSentenceVi: 'Rất vui được quen biết bạn!',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Quen biết, nhận biết' }]
  },
  {
    id: 'hsk1-v134', lessonId: 'hsk1-l14', hanzi: '高兴', pinyin: 'gāoxìng', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80',
    exampleSentence: '今天我们都很高兴。', exampleSentenceVi: 'Hôm nay chúng tôi đều rất vui.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Vui vẻ, phấn khởi' }]
  },
  {
    id: 'hsk1-v135', lessonId: 'hsk1-l14', hanzi: '漂亮', pinyin: 'piàoliang', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    exampleSentence: '这件衣服真漂亮。', exampleSentenceVi: 'Bộ quần áo này thật xinh đẹp.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Đẹp, xinh đẹp' }]
  },
  {
    id: 'hsk1-v136', lessonId: 'hsk1-l14', hanzi: '大', pinyin: 'dà', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&q=80',
    exampleSentence: '这个苹果很大。', exampleSentenceVi: 'Quả táo này rất to.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'To, lớn' }]
  },
  {
    id: 'hsk1-v137', lessonId: 'hsk1-l14', hanzi: '小', pinyin: 'xiǎo', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    exampleSentence: '这是一只小猫。', exampleSentenceVi: 'Đây là một chú mèo nhỏ.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Nhỏ, bé' }]
  },
  {
    id: 'hsk1-v138', lessonId: 'hsk1-l14', hanzi: '多', pinyin: 'duō', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '这里人很多。', exampleSentenceVi: 'Ở đây rất đông người.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Nhiều' }]
  },
  {
    id: 'hsk1-v139', lessonId: 'hsk1-l14', hanzi: '少', pinyin: 'shǎo', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    exampleSentence: '他喝的水很少。', exampleSentenceVi: 'Anh ấy uống rất ít nước.',
    meanings: [{ wordClass: 'Tính từ', meaningVi: 'Ít' }]
  },
  {
    id: 'hsk1-v140', lessonId: 'hsk1-l14', hanzi: '些', pinyin: 'xiē', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80',
    exampleSentence: '我想买些苹果。', exampleSentenceVi: 'Tôi muốn mua một ít táo.',
    meanings: [{ wordClass: 'Lượng từ', meaningVi: 'Một vài, một ít, những' }]
  },

  // --- BÀI 15: GIAO TIẾP & ĐỜI SỐNG (141-150) ---
  {
    id: 'hsk1-v141', lessonId: 'hsk1-l15', hanzi: '喂', pinyin: 'wèi', order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&q=80',
    exampleSentence: '喂，请问张先生在吗？', exampleSentenceVi: 'A-lô, xin hỏi ông Trương có đó không?',
    meanings: [{ wordClass: 'Thán từ', meaningVi: 'A-lô (nghe điện thoại), này' }]
  },
  {
    id: 'hsk1-v142', lessonId: 'hsk1-l15', hanzi: '打电话', pinyin: 'dǎ diànhuà', order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&q=80',
    exampleSentence: '他在给朋友打电话。', exampleSentenceVi: 'Anh ấy đang gọi điện thoại cho bạn.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Gọi điện thoại' }]
  },
  {
    id: 'hsk1-v143', lessonId: 'hsk1-l15', hanzi: '做', pinyin: 'zuò', order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    exampleSentence: '妈妈在做饭。', exampleSentenceVi: 'Mẹ đang nấu cơm.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Làm, nấu, chế tạo' }]
  },
  {
    id: 'hsk1-v144', lessonId: 'hsk1-l15', hanzi: '看', pinyin: 'kàn', order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    exampleSentence: '他在看书。', exampleSentenceVi: 'Anh ấy đang đọc sách.',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Nhìn, xem, đọc' }]
  },
  {
    id: 'hsk1-v145', lessonId: 'hsk1-l15', hanzi: '看见', pinyin: 'kànjiàn', order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    exampleSentence: '你看见我的杯子了吗？', exampleSentenceVi: 'Bạn có nhìn thấy chiếc cốc của tôi không?',
    meanings: [{ wordClass: 'Động từ', meaningVi: 'Nhìn thấy, trông thấy' }]
  },
  {
    id: 'hsk1-v146', lessonId: 'hsk1-l15', hanzi: '电影', pinyin: 'diànyǐng', order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
    exampleSentence: '今天晚上一起来看电影吧。', exampleSentenceVi: 'Tối nay cùng xem phim nhé.',
    meanings: [{ wordClass: 'Danh từ', meaningVi: 'Phim, phim điện ảnh' }]
  },
  {
    id: 'hsk1-v147', lessonId: 'hsk1-l15', hanzi: '和', pinyin: 'hé', order: 7,
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    exampleSentence: '我和他是好朋友。', exampleSentenceVi: 'Tôi và cậu ấy là bạn tốt.',
    meanings: [{ wordClass: 'Liên từ', meaningVi: 'Và, cùng với' }]
  },
  {
    id: 'hsk1-v148', lessonId: 'hsk1-l15', hanzi: '没', pinyin: 'méi', order: 8,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    exampleSentence: '我没有钱。', exampleSentenceVi: 'Tôi không có tiền.',
    meanings: [{ wordClass: 'Phó từ', meaningVi: 'Không, chưa (phủ định 有 hoặc quá khứ)' }]
  },
  {
    id: 'hsk1-v149', lessonId: 'hsk1-l15', hanzi: '了', pinyin: 'le', order: 9,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    exampleSentence: '他吃饭了。', exampleSentenceVi: 'Anh ấy đã ăn cơm rồi.',
    meanings: [{ wordClass: 'Trợ từ', meaningVi: 'Rồi (biểu thị hoàn thành hoặc thay đổi)' }]
  },
  {
    id: 'hsk1-v150', lessonId: 'hsk1-l15', hanzi: '吧', pinyin: 'ba', order: 10,
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80',
    exampleSentence: '我们走吧！', exampleSentenceVi: 'Chúng ta đi thôi!',
    meanings: [{ wordClass: 'Trợ từ ngữ khí', meaningVi: 'Nhé, đi, thôi (gợi ý, rủ rê)' }]
  },
];

const hsk1Grammars = [
  {
    id: 'gram-hsk1-1', lessonId: 'hsk1-l1',
    title: 'Cách dùng lời chào và xưng hô lịch sự',
    explanation: 'Trong tiếng Trung, "你好" (Nǐ hǎo) là lời chào phổ biến nhất. Khi gặp người lớn tuổi hoặc bề trên cần tôn trọng, ta dùng "您好" (Nín hǎo). Khi chào nhóm nhiều người, dùng "你们好" (Nǐmen hǎo).',
    examples: JSON.stringify([
      { zh: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Xin chào!' },
      { zh: '您好，老师！', pinyin: 'Nín hǎo, lǎoshī!', vi: 'Em chào thầy ạ!' },
      { zh: '你们好！', pinyin: 'Nǐmen hǎo!', vi: 'Chào các bạn!' }
    ]),
  },
  {
    id: 'gram-hsk1-2', lessonId: 'hsk1-l2',
    title: 'Quy tắc đọc số đếm từ 1 đến 99 trong tiếng Trung',
    explanation: 'Số đếm tiếng Trung tuân theo nguyên tắc ghép âm rất logic: 11 = 十一 (shí-yī), 20 = 二十 (èr-shí), 25 = 二十五 (èr-shí-wǔ), 99 = 九十九 (jiǔ-shí-jiǔ).',
    examples: JSON.stringify([
      { zh: '十五', pinyin: 'shíwǔ', vi: 'Mười lăm (15)' },
      { zh: '三十', pinyin: 'sānshí', vi: 'Ba mươi (30)' },
      { zh: '八十八', pinyin: 'bāshíbā', vi: 'Tám mươi tám (88)' }
    ]),
  },
  {
    id: 'gram-hsk1-3', lessonId: 'hsk1-l3',
    title: 'Cấu trúc câu khẳng định và phủ định với 是 và 不',
    explanation: 'Cấu trúc: "Chủ ngữ + 是 + Danh từ" (biểu thị khẳng định). Phủ định dùng "Chủ ngữ + 不是 + Danh từ". Chú ý: "不" khi đi trước thanh 4 sẽ biến điệu đọc thành thanh 2 (bú).',
    examples: JSON.stringify([
      { zh: '我是学生。', pinyin: 'Wǒ shì xuésheng.', vi: 'Tôi là học sinh.' },
      { zh: '他不是老师。', pinyin: 'Tā bú shì lǎoshī.', vi: 'Anh ấy không phải là giáo viên.' }
    ]),
  },
  {
    id: 'gram-hsk1-4', lessonId: 'hsk1-l4',
    title: 'Trợ từ sở hữu 的 (de) và câu hỏi với 谁 (shéi)',
    explanation: 'Trợ từ "的" đặt giữa định ngữ và trung tâm ngữ để biểu thị quan hệ sở hữu (Của). Cấu trúc: A + 的 + B (B của A). Từ hỏi "谁" (ai) giữ nguyên vị trí ngữ pháp.',
    examples: JSON.stringify([
      { zh: '这是我的书。', pinyin: 'Zhè shì wǒ de shū.', vi: 'Đây là sách của tôi.' },
      { zh: '他是谁？', pinyin: 'Tā shì shéi?', vi: 'Anh ấy là ai?' }
    ]),
  },
  {
    id: 'gram-hsk1-5', lessonId: 'hsk1-l5',
    title: 'Cách hỏi và giới thiệu nơi làm việc, học tập',
    explanation: 'Cấu trúc: "Chủ ngữ + 在 + Địa điểm + Động từ" biểu thị làm việc gì ở đâu. Khác với tiếng Việt, cụm chỉ địa điểm trong tiếng Trung đứng TRƯỚC hành động.',
    examples: JSON.stringify([
      { zh: '我们在学校学习。', pinyin: 'Wǒmen zài xuéxiào xuéxí.', vi: 'Chúng tôi học tập ở trường.' },
      { zh: '他在医院工作。', pinyin: 'Tā zài yīyuàn gōngzuò.', vi: 'Anh ấy làm việc ở bệnh viện.' }
    ]),
  },
  {
    id: 'gram-hsk1-6', lessonId: 'hsk1-l6',
    title: 'Trật tự diễn đạt Thời gian trong tiếng Trung',
    explanation: 'Tiếng Trung luôn sắp xếp từ LỚN ĐẾN BÉ: Năm -> Tháng -> Ngày -> Buổi -> Giờ. Ví dụ: 2026年 10月 13日 上午 9点.',
    examples: JSON.stringify([
      { zh: '今天十月一日。', pinyin: 'Jīntiān shí yuè yī hào.', vi: 'Hôm nay ngày 1 tháng 10.' },
      { zh: '明天星期六。', pinyin: 'Míngtiān xīngqīliù.', vi: 'Ngày mai là thứ bảy.' }
    ]),
  },
  {
    id: 'gram-hsk1-7', lessonId: 'hsk1-l7',
    title: 'Cách nói giờ và phút (点 diǎn / 分 fēn)',
    explanation: 'Giờ chẵn: Số + 点 (ví dụ: 两点 = 2 giờ, chú ý dùng 两 thay vì 二 khi chỉ 2 giờ). Giờ lẻ: Số giờ + 点 + Số phút + 分.',
    examples: JSON.stringify([
      { zh: '现在两点十分。', pinyin: 'Xiànzài liǎng diǎn shí fēn.', vi: 'Bây giờ là 2 giờ 10 phút.' },
      { zh: '差五分八点。', pinyin: 'Chà wǔ fēn bā diǎn.', vi: 'Tám giờ kém năm phút.' }
    ]),
  },
  {
    id: 'gram-hsk1-8', lessonId: 'hsk1-l8',
    title: 'Động từ năng nguyện 想 (xiǎng) biểu thị mong muốn',
    explanation: 'Cấu trúc: "Chủ ngữ + 想 + Động từ + Tân ngữ" biểu thị nguyện vọng, dự định muốn làm việc gì đó.',
    examples: JSON.stringify([
      { zh: '我想喝中国茶。', pinyin: 'Wǒ xiǎng hē Zhōngguó chá.', vi: 'Tôi muốn uống trà Trung Quốc.' },
      { zh: '你想吃什么？', pinyin: 'Nǐ xiǎng chī shénme?', vi: 'Bạn muốn ăn cái gì?' }
    ]),
  },
  {
    id: 'gram-hsk1-9', lessonId: 'hsk1-l9',
    title: 'Câu hỏi số lượng: 几 (jǐ) và 多少 (duōshao)',
    explanation: '"几" dùng cho số lượng nhỏ (thường < 10) và bắt buộc phải đi kèm lượng từ: 几本书. "多少" dùng cho số lượng lớn bất kỳ hoặc hỏi giá cả, có thể không cần lượng từ: 多少钱.',
    examples: JSON.stringify([
      { zh: '你有几个苹果？', pinyin: 'Nǐ yǒu jǐ gè píngguǒ?', vi: 'Bạn có mấy quả táo?' },
      { zh: '这个多少钱？', pinyin: 'Zhè gè duōshao qián?', vi: 'Cái này bao nhiêu tiền?' }
    ]),
  },
  {
    id: 'gram-hsk1-10', lessonId: 'hsk1-l10',
    title: 'Từ chỉ phương vị và vị trí: 上, 下, 里, 前面, 后面',
    explanation: 'Cấu trúc biểu thị sự tồn tại: "Địa điểm / Đồ vật + Từ chỉ phương vị + 有 / 是 + Tân ngữ". Ví dụ: 桌子上有一本书 (Trên bàn có một quyển sách).',
    examples: JSON.stringify([
      { zh: '桌子上有一台电脑。', pinyin: 'Zhuōzi shàng yǒu yì tái diànnǎo.', vi: 'Trên bàn có một chiếc máy tính.' },
      { zh: '猫在椅子下面。', pinyin: 'Māo zài yǐzi xiàmiàn.', vi: 'Con mèo ở dưới ghế.' }
    ]),
  },
  {
    id: 'gram-hsk1-11', lessonId: 'hsk1-l11',
    title: 'Hỏi phương thức hành động bằng 怎么 (zěnme)',
    explanation: 'Cấu trúc: "怎么 + Động từ" biểu thị làm một việc bằng cách nào, phương tiện gì. Ví dụ: 怎么去 (Đi bằng gì?), 怎么读 (Đọc như thế nào?).',
    examples: JSON.stringify([
      { zh: '去北京怎么走？', pinyin: 'Qù Běijīng zěnme zǒu?', vi: 'Đi đến Bắc Kinh đi thế nào?' },
      { zh: '这个汉字怎么写？', pinyin: 'Zhè gè hànzì zěnme xiě?', vi: 'Chữ Hán này viết thế nào?' }
    ]),
  },
  {
    id: 'gram-hsk1-12', lessonId: 'hsk1-l12',
    title: 'Cấu trúc cảm thán 太...了 (tài...le)',
    explanation: 'Dùng để biểu thị mức độ cao hoặc thốt lên sự kinh ngạc, khen ngợi hay phàn nàn. Cấu trúc: 太 + Tính từ + 了.',
    examples: JSON.stringify([
      { zh: '太好了！', pinyin: 'Tài hǎo le!', vi: 'Tốt quá rồi!' },
      { zh: '今天太冷了。', pinyin: 'Jīntiān tài lěng le.', vi: 'Hôm nay lạnh quá.' }
    ]),
  },
  {
    id: 'gram-hsk1-13', lessonId: 'hsk1-l13',
    title: 'Phân biệt động từ năng nguyện 会 (huì) và 能 (néng)',
    explanation: '"会" biểu thị năng lực đạt được qua quá trình học tập (rèn luyện mà biết, ví dụ: biết bơi, biết lái xe, biết tiếng Trung). "能" biểu thị khả năng trong điều kiện hoàn cảnh cho phép.',
    examples: JSON.stringify([
      { zh: '我会说汉语。', pinyin: 'Wǒ huì shuō hànyǔ.', vi: 'Tôi biết nói tiếng Trung (do đã học).' },
      { zh: '我今天能来。', pinyin: 'Wǒ jīntiān néng lái.', vi: 'Hôm nay tôi có thể đến được (hoàn cảnh cho phép).' }
    ]),
  },
  {
    id: 'gram-hsk1-14', lessonId: 'hsk1-l14',
    title: 'Tính từ làm vị ngữ không cần động từ 是',
    explanation: 'Trong tiếng Trung, trước tính từ làm vị ngữ ta thường thêm phó từ "很", KHÔNG dùng "是". Ví dụ: "Tôi rất vui" nói là "我很高兴", KHÔNG nói "我是高兴".',
    examples: JSON.stringify([
      { zh: '她很漂亮。', pinyin: 'Tā hěn piàoliang.', vi: 'Cô ấy rất xinh đẹp.' },
      { zh: '苹果很大。', pinyin: 'Píngguǒ hěn dà.', vi: 'Quả táo rất to.' }
    ]),
  },
  {
    id: 'gram-hsk1-15', lessonId: 'hsk1-l15',
    title: 'Trợ từ ngữ khí 吧 (ba) và trợ từ 了 (le)',
    explanation: '"吧" đứng cuối câu để biểu thị lời đề nghị, thỉnh cầu hoặc rủ rê (Chúng ta đi thôi: 我们走吧). "了" biểu thị hành động đã hoàn tất hoặc có sự thay đổi trạng thái.',
    examples: JSON.stringify([
      { zh: '我们一起去吧！', pinyin: 'Wǒmen yìqǐ qù ba!', vi: 'Chúng ta cùng đi nhé!' },
      { zh: '他吃饭了。', pinyin: 'Tā chī fàn le.', vi: 'Anh ấy đã ăn cơm rồi.' }
    ]),
  },
];

module.exports = {
  hsk1Lessons,
  hsk1Vocab,
  hsk1Grammars,
};
