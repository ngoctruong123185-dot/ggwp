// prisma/data/hsk2-full.js
// Trọn bộ 150 từ vựng mới của HSK 2 (chuẩn HSK 2.0), chia 15 bài × 10 từ theo chủ đề.
// Cộng với 150 từ HSK 1 trong hsk1-full.js = 300 từ tích lũy, đúng mô tả cấp độ HSK 2.
//
// Ghi chú: danh sách HSK 1 của dự án đã đưa sẵn 您, 日, 好吃, 说话, 吧 (vốn thuộc HSK 2),
// nên HSK 2 ở đây bổ sung 5 từ HSK 1 chính thức còn thiếu: 有, 来, 几, 岁, 衣服.
//
// Ảnh minh họa dùng emoji render thành SVG cục bộ (xem emoji-image.js) để chạy offline.

const { emojiImage } = require('./emoji-image');

const hsk2Lessons = [
  { id: 'hsk2-l1', levelId: 'hsk2', order: 1, title: '我们一起去运动吧', titleVi: 'Thể thao & Vận động' },
  { id: 'hsk2-l2', levelId: 'hsk2', order: 2, title: '她是我姐姐', titleVi: 'Gia đình & Người thân' },
  { id: 'hsk2-l3', levelId: 'hsk2', order: 3, title: '我早上六点起床', titleVi: 'Thời gian biểu một ngày' },
  { id: 'hsk2-l4', levelId: 'hsk2', order: 4, title: '我要一杯咖啡', titleVi: 'Ăn uống & Món ngon' },
  { id: 'hsk2-l5', levelId: 'hsk2', order: 5, title: '这件衣服很便宜', titleVi: 'Mua sắm & Màu sắc' },
  { id: 'hsk2-l6', levelId: 'hsk2', order: 6, title: '机场离这儿远吗', titleVi: 'Giao thông & Hỏi đường' },
  { id: 'hsk2-l7', levelId: 'hsk2', order: 7, title: '外面下雪了', titleVi: 'Thời tiết & Mùa trong năm' },
  { id: 'hsk2-l8', levelId: 'hsk2', order: 8, title: '你的眼睛怎么了', titleVi: 'Sức khỏe & Đi khám bệnh' },
  { id: 'hsk2-l9', levelId: 'hsk2', order: 9, title: '欢迎来北京旅游', titleVi: 'Du lịch & Khách sạn' },
  { id: 'hsk2-l10', levelId: 'hsk2', order: 10, title: '这个题我不懂', titleVi: 'Lớp học & Thi cử' },
  { id: 'hsk2-l11', levelId: 'hsk2', order: 11, title: '他正在公司工作', titleVi: 'Công việc & Văn phòng' },
  { id: 'hsk2-l12', levelId: 'hsk2', order: 12, title: '祝你生日快乐', titleVi: 'Sinh nhật & Quà tặng' },
  { id: 'hsk2-l13', levelId: 'hsk2', order: 13, title: '他跑得最快', titleVi: 'So sánh & Miêu tả' },
  { id: 'hsk2-l14', levelId: 'hsk2', order: 14, title: '你知道她在哪儿吗', titleVi: 'Giao tiếp hằng ngày' },
  { id: 'hsk2-l15', levelId: 'hsk2', order: 15, title: '你去过中国吗', titleVi: 'Trải nghiệm & Kế hoạch' },
];

// [hanzi, pinyin, emoji, meanings: [[wordClass, meaningVi], ...], exampleSentence, exampleSentenceVi]
const lessonWords = {
  'hsk2-l1': [
    ['运动', 'yùndòng', '🏃', [['Danh từ / Động từ', 'Thể thao, vận động']], '我每天早上运动一个小时。', 'Mỗi sáng tôi vận động một tiếng.'],
    ['打篮球', 'dǎ lánqiú', '🏀', [['Cụm từ', 'Chơi bóng rổ']], '下午我们去打篮球吧。', 'Chiều nay chúng ta đi chơi bóng rổ nhé.'],
    ['踢足球', 'tī zúqiú', '⚽', [['Cụm từ', 'Đá bóng']], '我哥哥很喜欢踢足球。', 'Anh trai tôi rất thích đá bóng.'],
    ['跑步', 'pǎobù', '👟', [['Động từ', 'Chạy bộ']], '他每天早上六点去跑步。', 'Sáng nào anh ấy cũng đi chạy bộ lúc sáu giờ.'],
    ['游泳', 'yóuyǒng', '🏊', [['Động từ', 'Bơi lội']], '她游泳游得很好。', 'Cô ấy bơi rất giỏi.'],
    ['跳舞', 'tiàowǔ', '💃', [['Động từ', 'Nhảy múa, khiêu vũ']], '妹妹喜欢唱歌和跳舞。', 'Em gái thích hát và nhảy múa.'],
    ['身体', 'shēntǐ', '💪', [['Danh từ', 'Cơ thể; sức khỏe']], '多运动对身体很好。', 'Vận động nhiều rất tốt cho sức khỏe.'],
    ['累', 'lèi', '🥵', [['Tính từ', 'Mệt']], '跑了一个小时，我很累。', 'Chạy một tiếng rồi, tôi rất mệt.'],
    ['休息', 'xiūxi', '🛋️', [['Động từ', 'Nghỉ ngơi']], '你累了，休息一下吧。', 'Bạn mệt rồi, nghỉ một chút đi.'],
    ['一起', 'yìqǐ', '🤝', [['Phó từ', 'Cùng nhau']], '我们一起去游泳吧！', 'Chúng ta cùng đi bơi nhé!'],
  ],
  'hsk2-l2': [
    ['哥哥', 'gēge', '👦', [['Danh từ', 'Anh trai']], '我哥哥在北京工作。', 'Anh trai tôi làm việc ở Bắc Kinh.'],
    ['姐姐', 'jiějie', '👩', [['Danh từ', 'Chị gái']], '我姐姐是医生。', 'Chị gái tôi là bác sĩ.'],
    ['弟弟', 'dìdi', '🧒', [['Danh từ', 'Em trai']], '我弟弟今年八岁。', 'Em trai tôi năm nay tám tuổi.'],
    ['妹妹', 'mèimei', '👧', [['Danh từ', 'Em gái']], '妹妹喜欢看电视。', 'Em gái thích xem tivi.'],
    ['丈夫', 'zhàngfu', '🤵', [['Danh từ', 'Chồng']], '她丈夫是老师。', 'Chồng cô ấy là giáo viên.'],
    ['妻子', 'qīzi', '👰', [['Danh từ', 'Vợ']], '他妻子很漂亮。', 'Vợ anh ấy rất xinh đẹp.'],
    ['孩子', 'háizi', '👶', [['Danh từ', 'Con, đứa trẻ']], '他们有两个孩子。', 'Họ có hai đứa con.'],
    ['男', 'nán', '🚹', [['Tính từ', 'Nam, đàn ông, con trai']], '那个男孩子是我弟弟。', 'Cậu bé kia là em trai tôi.'],
    ['女', 'nǚ', '🚺', [['Tính từ', 'Nữ, phụ nữ, con gái']], '我们班有十个女学生。', 'Lớp chúng tôi có mười nữ sinh.'],
    ['姓', 'xìng', '🪪', [['Động từ / Danh từ', 'Mang họ; họ']], '您贵姓？我姓王。', 'Ngài họ gì ạ? Tôi họ Vương.'],
  ],
  'hsk2-l3': [
    ['早上', 'zǎoshang', '🌅', [['Danh từ', 'Buổi sáng']], '我早上喝一杯牛奶。', 'Buổi sáng tôi uống một cốc sữa.'],
    ['晚上', 'wǎnshang', '🌙', [['Danh từ', 'Buổi tối']], '晚上我在家看书。', 'Buổi tối tôi ở nhà đọc sách.'],
    ['起床', 'qǐchuáng', '⏰', [['Động từ', 'Thức dậy, ngủ dậy']], '我每天六点起床。', 'Ngày nào tôi cũng dậy lúc sáu giờ.'],
    ['上班', 'shàngbān', '💼', [['Động từ', 'Đi làm']], '爸爸八点去上班。', 'Bố đi làm lúc tám giờ.'],
    ['小时', 'xiǎoshí', '⏳', [['Danh từ', 'Tiếng, giờ đồng hồ']], '我每天学习两个小时汉语。', 'Mỗi ngày tôi học tiếng Trung hai tiếng.'],
    ['时间', 'shíjiān', '🕰️', [['Danh từ', 'Thời gian']], '你明天有时间吗？', 'Ngày mai bạn có thời gian không?'],
    ['已经', 'yǐjīng', '✅', [['Phó từ', 'Đã, rồi']], '他已经起床了。', 'Anh ấy đã dậy rồi.'],
    ['开始', 'kāishǐ', '🏁', [['Động từ', 'Bắt đầu']], '考试九点开始。', 'Kỳ thi bắt đầu lúc chín giờ.'],
    ['完', 'wán', '🔚', [['Động từ', 'Xong, hết, hoàn thành']], '我吃完饭了。', 'Tôi ăn cơm xong rồi.'],
    ['准备', 'zhǔnbèi', '🎒', [['Động từ', 'Chuẩn bị']], '你准备好了吗？', 'Bạn chuẩn bị xong chưa?'],
  ],
  'hsk2-l4': [
    ['鸡蛋', 'jīdàn', '🥚', [['Danh từ', 'Trứng gà']], '我早上吃了两个鸡蛋。', 'Sáng nay tôi ăn hai quả trứng gà.'],
    ['面条', 'miàntiáo', '🍜', [['Danh từ', 'Mì sợi']], '这家饭店的面条很好吃。', 'Mì của nhà hàng này rất ngon.'],
    ['牛奶', 'niúnǎi', '🥛', [['Danh từ', 'Sữa bò']], '孩子每天都喝牛奶。', 'Bọn trẻ ngày nào cũng uống sữa.'],
    ['咖啡', 'kāfēi', '☕', [['Danh từ', 'Cà phê']], '我要一杯咖啡。', 'Tôi muốn một cốc cà phê.'],
    ['羊肉', 'yángròu', '🍖', [['Danh từ', 'Thịt cừu, thịt dê']], '你吃过羊肉吗？', 'Bạn đã từng ăn thịt cừu chưa?'],
    ['鱼', 'yú', '🐟', [['Danh từ', 'Cá']], '妈妈今天买了一条鱼。', 'Hôm nay mẹ mua một con cá.'],
    ['西瓜', 'xīguā', '🍉', [['Danh từ', 'Dưa hấu']], '这个西瓜很大。', 'Quả dưa hấu này rất to.'],
    ['要', 'yào', '🙋', [['Động từ năng nguyện', 'Muốn, cần, phải'], ['Động từ', 'Muốn có, gọi (món)']], '我要喝茶。', 'Tôi muốn uống trà.'],
    ['每', 'měi', '📆', [['Đại từ', 'Mỗi']], '我每天都喝咖啡。', 'Ngày nào tôi cũng uống cà phê.'],
    ['两', 'liǎng', '✌️', [['Số từ', 'Hai (đứng trước lượng từ)']], '我要两个鸡蛋。', 'Tôi muốn hai quả trứng.'],
  ],
  'hsk2-l5': [
    ['卖', 'mài', '🏷️', [['Động từ', 'Bán']], '这个商店卖水果。', 'Cửa hàng này bán hoa quả.'],
    ['件', 'jiàn', '👕', [['Lượng từ', 'Chiếc, cái (áo); việc (sự việc)']], '我想买这件衣服。', 'Tôi muốn mua chiếc áo này.'],
    ['衣服', 'yīfu', '👗', [['Danh từ', 'Quần áo']], '她的衣服很漂亮。', 'Quần áo của cô ấy rất đẹp.'],
    ['便宜', 'piányi', '💸', [['Tính từ', 'Rẻ']], '这件衣服很便宜。', 'Chiếc áo này rất rẻ.'],
    ['贵', 'guì', '💎', [['Tính từ', 'Đắt, quý']], '太贵了，我不买。', 'Đắt quá, tôi không mua.'],
    ['颜色', 'yánsè', '🎨', [['Danh từ', 'Màu sắc']], '你喜欢什么颜色？', 'Bạn thích màu gì?'],
    ['红', 'hóng', '🟥', [['Tính từ', 'Đỏ']], '我想买那件红的。', 'Tôi muốn mua chiếc màu đỏ kia.'],
    ['白', 'bái', '⬜', [['Tính từ', 'Trắng']], '他穿了一件白衣服。', 'Anh ấy mặc một chiếc áo trắng.'],
    ['黑', 'hēi', '⬛', [['Tính từ', 'Đen']], '我的猫是黑的。', 'Con mèo của tôi màu đen.'],
    ['千', 'qiān', '💰', [['Số từ', 'Nghìn']], '这个手机三千块钱。', 'Chiếc điện thoại này ba nghìn tệ.'],
  ],
  'hsk2-l6': [
    ['公共汽车', 'gōnggòng qìchē', '🚌', [['Danh từ', 'Xe buýt']], '我坐公共汽车去学校。', 'Tôi đi xe buýt đến trường.'],
    ['机场', 'jīchǎng', '🛫', [['Danh từ', 'Sân bay']], '我们几点去机场？', 'Mấy giờ chúng ta ra sân bay?'],
    ['路', 'lù', '🛣️', [['Danh từ', 'Đường, con đường']], '这条路很长。', 'Con đường này rất dài.'],
    ['远', 'yuǎn', '🏔️', [['Tính từ', 'Xa']], '机场离这儿很远。', 'Sân bay cách đây rất xa.'],
    ['近', 'jìn', '📍', [['Tính từ', 'Gần']], '我家离学校很近。', 'Nhà tôi rất gần trường.'],
    ['离', 'lí', '📏', [['Giới từ', 'Cách (chỉ khoảng cách)']], '你家离公司远吗？', 'Nhà bạn cách công ty có xa không?'],
    ['往', 'wǎng', '🧭', [['Giới từ', 'Về phía, hướng về']], '往前走，就是医院。', 'Đi thẳng về phía trước là đến bệnh viện.'],
    ['左边', 'zuǒbian', '⬅️', [['Danh từ chỉ vị trí', 'Bên trái']], '商店在医院左边。', 'Cửa hàng ở bên trái bệnh viện.'],
    ['右边', 'yòubian', '➡️', [['Danh từ chỉ vị trí', 'Bên phải']], '学校在我家右边。', 'Trường học ở bên phải nhà tôi.'],
    ['旁边', 'pángbiān', '🏘️', [['Danh từ chỉ vị trí', 'Bên cạnh']], '我家旁边有一个饭店。', 'Bên cạnh nhà tôi có một nhà hàng.'],
  ],
  'hsk2-l7': [
    ['晴', 'qíng', '☀️', [['Tính từ', 'Nắng, trời quang']], '明天是晴天。', 'Ngày mai trời nắng.'],
    ['阴', 'yīn', '☁️', [['Tính từ', 'Âm u, nhiều mây']], '今天是阴天，可能会下雨。', 'Hôm nay trời âm u, có thể sẽ mưa.'],
    ['雪', 'xuě', '❄️', [['Danh từ', 'Tuyết']], '外面下雪了！', 'Bên ngoài tuyết rơi rồi!'],
    ['去年', 'qùnián', '🗓️', [['Danh từ', 'Năm ngoái']], '我去年去了北京。', 'Năm ngoái tôi đã đi Bắc Kinh.'],
    ['非常', 'fēicháng', '‼️', [['Phó từ', 'Rất, vô cùng']], '今天非常冷。', 'Hôm nay lạnh vô cùng.'],
    ['真', 'zhēn', '✨', [['Phó từ', 'Thật, thật là']], '今天的天气真好！', 'Thời tiết hôm nay đẹp thật!'],
    ['外', 'wài', '🏞️', [['Danh từ chỉ vị trí', 'Ngoài, bên ngoài']], '外面在下雨。', 'Bên ngoài đang mưa.'],
    ['穿', 'chuān', '🧥', [['Động từ', 'Mặc (áo), đi (giày)']], '今天很冷，你要多穿衣服。', 'Hôm nay lạnh, bạn phải mặc thêm áo.'],
    ['觉得', 'juéde', '🤔', [['Động từ', 'Cảm thấy, thấy rằng']], '我觉得今天有点儿热。', 'Tôi thấy hôm nay hơi nóng.'],
    ['可能', 'kěnéng', '🎲', [['Phó từ', 'Có thể, có lẽ']], '明天可能下雪。', 'Ngày mai có lẽ sẽ có tuyết.'],
  ],
  'hsk2-l8': [
    ['生病', 'shēngbìng', '🤒', [['Động từ', 'Bị ốm, sinh bệnh']], '他生病了，今天没去上班。', 'Anh ấy bị ốm, hôm nay không đi làm.'],
    ['药', 'yào', '💊', [['Danh từ', 'Thuốc']], '医生说要每天吃药。', 'Bác sĩ nói phải uống thuốc mỗi ngày.'],
    ['眼睛', 'yǎnjing', '👁️', [['Danh từ', 'Mắt']], '她的眼睛很大。', 'Mắt cô ấy rất to.'],
    ['洗', 'xǐ', '🧼', [['Động từ', 'Rửa, giặt']], '吃饭前要洗手。', 'Trước khi ăn cơm phải rửa tay.'],
    ['别', 'bié', '🚫', [['Phó từ', 'Đừng']], '别看电视了，休息吧。', 'Đừng xem tivi nữa, nghỉ ngơi đi.'],
    ['让', 'ràng', '👉', [['Động từ', 'Bảo, để, khiến (ai làm gì)']], '医生让我多休息。', 'Bác sĩ bảo tôi nghỉ ngơi nhiều.'],
    ['希望', 'xīwàng', '🌈', [['Động từ / Danh từ', 'Hy vọng, mong']], '希望你身体快点儿好。', 'Mong bạn mau khỏe lại.'],
    ['为什么', 'wèi shénme', '❓', [['Đại từ', 'Tại sao, vì sao']], '你为什么没来上课？', 'Tại sao bạn không đến lớp?'],
    ['因为', 'yīnwèi', '🔗', [['Liên từ', 'Bởi vì (因为…所以…: vì… nên…)']], '因为生病了，所以他没来。', 'Vì bị ốm nên anh ấy không đến.'],
    ['再', 'zài', '🔄', [['Phó từ', 'Lại, nữa (lặp lại về sau)']], '请再说一次。', 'Xin nói lại một lần nữa.'],
  ],
  'hsk2-l9': [
    ['旅游', 'lǚyóu', '🧳', [['Động từ', 'Du lịch']], '我想去中国旅游。', 'Tôi muốn đi du lịch Trung Quốc.'],
    ['宾馆', 'bīnguǎn', '🏨', [['Danh từ', 'Khách sạn']], '这个宾馆离机场很近。', 'Khách sạn này rất gần sân bay.'],
    ['房间', 'fángjiān', '🛏️', [['Danh từ', 'Phòng']], '这个房间很大。', 'Căn phòng này rất rộng.'],
    ['服务员', 'fúwùyuán', '🛎️', [['Danh từ', 'Nhân viên phục vụ']], '服务员，请给我一杯茶。', 'Phục vụ ơi, cho tôi một cốc trà.'],
    ['票', 'piào', '🎫', [['Danh từ', 'Vé']], '我买了两张火车票。', 'Tôi đã mua hai vé tàu hỏa.'],
    ['门', 'mén', '🚪', [['Danh từ', 'Cửa, cổng']], '请开门。', 'Xin hãy mở cửa.'],
    ['欢迎', 'huānyíng', '🎉', [['Động từ', 'Hoan nghênh, chào mừng']], '欢迎来北京旅游！', 'Chào mừng bạn đến Bắc Kinh du lịch!'],
    ['进', 'jìn', '📥', [['Động từ', 'Vào']], '请进，外面很冷。', 'Mời vào, bên ngoài lạnh lắm.'],
    ['出', 'chū', '📤', [['Động từ', 'Ra']], '他出去了，不在房间。', 'Anh ấy ra ngoài rồi, không có trong phòng.'],
    ['走', 'zǒu', '🚶', [['Động từ', 'Đi, rời đi']], '我们走吧，时间不早了。', 'Chúng ta đi thôi, muộn rồi.'],
  ],
  'hsk2-l10': [
    ['教室', 'jiàoshì', '🏫', [['Danh từ', 'Phòng học, lớp học']], '学生们都在教室里。', 'Các học sinh đều ở trong lớp.'],
    ['课', 'kè', '📖', [['Danh từ', 'Bài học, tiết học']], '我们今天上汉语课。', 'Hôm nay chúng tôi học tiết tiếng Trung.'],
    ['考试', 'kǎoshì', '📝', [['Động từ / Danh từ', 'Thi; kỳ thi']], '明天有汉语考试。', 'Ngày mai có bài thi tiếng Trung.'],
    ['题', 'tí', '🧩', [['Danh từ', 'Đề, câu hỏi (bài tập)']], '这个题我不会做。', 'Câu này tôi không biết làm.'],
    ['问题', 'wèntí', '🙋‍♀️', [['Danh từ', 'Câu hỏi; vấn đề']], '老师，我有一个问题。', 'Thưa thầy, em có một câu hỏi.'],
    ['回答', 'huídá', '💬', [['Động từ', 'Trả lời']], '请回答我的问题。', 'Xin hãy trả lời câu hỏi của tôi.'],
    ['铅笔', 'qiānbǐ', '✏️', [['Danh từ', 'Bút chì']], '这是谁的铅笔？', 'Đây là bút chì của ai?'],
    ['懂', 'dǒng', '💡', [['Động từ', 'Hiểu']], '你听懂了吗？', 'Bạn nghe hiểu chưa?'],
    ['意思', 'yìsi', '🔤', [['Danh từ', 'Ý nghĩa, ý']], '这个字是什么意思？', 'Chữ này có nghĩa là gì?'],
    ['错', 'cuò', '❌', [['Tính từ', 'Sai']], '对不起，我写错了。', 'Xin lỗi, tôi viết sai rồi.'],
  ],
  'hsk2-l11': [
    ['公司', 'gōngsī', '🏢', [['Danh từ', 'Công ty']], '我哥哥在一家公司工作。', 'Anh trai tôi làm việc ở một công ty.'],
    ['事情', 'shìqing', '📋', [['Danh từ', 'Việc, sự việc']], '我今天有很多事情。', 'Hôm nay tôi có rất nhiều việc.'],
    ['忙', 'máng', '🌀', [['Tính từ', 'Bận']], '这个星期我很忙。', 'Tuần này tôi rất bận.'],
    ['帮助', 'bāngzhù', '🤲', [['Động từ', 'Giúp đỡ']], '他常常帮助我学习汉语。', 'Anh ấy thường giúp tôi học tiếng Trung.'],
    ['告诉', 'gàosu', '🗣️', [['Động từ', 'Nói cho biết, bảo']], '请告诉我你的名字。', 'Hãy cho tôi biết tên của bạn.'],
    ['介绍', 'jièshào', '🙌', [['Động từ', 'Giới thiệu']], '我来介绍一下，这是王老师。', 'Để tôi giới thiệu một chút, đây là thầy Vương.'],
    ['大家', 'dàjiā', '👥', [['Đại từ', 'Mọi người']], '大家好！我叫小明。', 'Chào mọi người! Tôi tên là Tiểu Minh.'],
    ['正在', 'zhèngzài', '⏯️', [['Phó từ', 'Đang (làm gì)']], '他正在打电话呢。', 'Anh ấy đang gọi điện thoại.'],
    ['着', 'zhe', '🪑', [['Trợ từ', 'Đang (trạng thái kéo dài)']], '门开着，请进。', 'Cửa đang mở, mời vào.'],
    ['报纸', 'bàozhǐ', '📰', [['Danh từ', 'Báo, tờ báo']], '爸爸每天早上看报纸。', 'Sáng nào bố cũng đọc báo.'],
  ],
  'hsk2-l12': [
    ['生日', 'shēngrì', '🎂', [['Danh từ', 'Sinh nhật']], '今天是我妈妈的生日。', 'Hôm nay là sinh nhật mẹ tôi.'],
    ['快乐', 'kuàilè', '😄', [['Tính từ', 'Vui vẻ, hạnh phúc']], '祝你生日快乐！', 'Chúc bạn sinh nhật vui vẻ!'],
    ['送', 'sòng', '🎁', [['Động từ', 'Tặng; tiễn, đưa']], '我想送妈妈一件衣服。', 'Tôi muốn tặng mẹ một chiếc áo.'],
    ['给', 'gěi', '🫴', [['Động từ', 'Cho, đưa'], ['Giới từ', 'Cho, giúp (ai)']], '请给我一杯水。', 'Xin cho tôi một cốc nước.'],
    ['手表', 'shǒubiǎo', '⌚', [['Danh từ', 'Đồng hồ đeo tay']], '这块手表是爸爸送我的。', 'Chiếc đồng hồ này là bố tặng tôi.'],
    ['手机', 'shǒujī', '📱', [['Danh từ', 'Điện thoại di động']], '我的手机是新的。', 'Điện thoại của tôi là đồ mới.'],
    ['岁', 'suì', '🕯️', [['Lượng từ', 'Tuổi']], '你女儿几岁了？', 'Con gái bạn mấy tuổi rồi?'],
    ['几', 'jǐ', '🔢', [['Đại từ', 'Mấy (hỏi số lượng nhỏ)']], '你家有几口人？', 'Nhà bạn có mấy người?'],
    ['笑', 'xiào', '😂', [['Động từ', 'Cười']], '孩子们都笑了。', 'Bọn trẻ đều cười.'],
    ['唱歌', 'chànggē', '🎤', [['Động từ', 'Hát, ca hát']], '大家一起唱歌吧！', 'Mọi người cùng hát nào!'],
  ],
  'hsk2-l13': [
    ['比', 'bǐ', '⚖️', [['Giới từ', 'So với, hơn']], '今天比昨天冷。', 'Hôm nay lạnh hơn hôm qua.'],
    ['高', 'gāo', '🦒', [['Tính từ', 'Cao']], '哥哥比我高。', 'Anh trai cao hơn tôi.'],
    ['长', 'cháng', '📐', [['Tính từ', 'Dài']], '这个电影很长。', 'Bộ phim này rất dài.'],
    ['新', 'xīn', '🆕', [['Tính từ', 'Mới']], '这是我的新手机。', 'Đây là điện thoại mới của tôi.'],
    ['快', 'kuài', '⚡', [['Tính từ', 'Nhanh']], '他跑得很快。', 'Anh ấy chạy rất nhanh.'],
    ['慢', 'màn', '🐢', [['Tính từ', 'Chậm']], '请说慢一点儿。', 'Xin nói chậm một chút.'],
    ['最', 'zuì', '🏆', [['Phó từ', 'Nhất']], '他是我们班跑得最快的。', 'Cậu ấy là người chạy nhanh nhất lớp chúng tôi.'],
    ['第一', 'dì yī', '🥇', [['Số từ', 'Thứ nhất, hạng nhất']], '这次考试他是第一。', 'Kỳ thi lần này cậu ấy đứng thứ nhất.'],
    ['百', 'bǎi', '💯', [['Số từ', 'Trăm']], '我们学校有八百个学生。', 'Trường chúng tôi có tám trăm học sinh.'],
    ['零', 'líng', '0️⃣', [['Số từ', 'Số không, linh']], '现在是二零二六年。', 'Bây giờ là năm 2026.'],
  ],
  'hsk2-l14': [
    ['问', 'wèn', '🙋‍♂️', [['Động từ', 'Hỏi']], '我可以问你一个问题吗？', 'Tôi có thể hỏi bạn một câu được không?'],
    ['知道', 'zhīdào', '🧠', [['Động từ', 'Biết']], '你知道她在哪儿吗？', 'Bạn có biết cô ấy ở đâu không?'],
    ['找', 'zhǎo', '🔍', [['Động từ', 'Tìm']], '我在找我的手机。', 'Tôi đang tìm điện thoại của mình.'],
    ['等', 'děng', '⏱️', [['Động từ', 'Đợi, chờ']], '请等我一下。', 'Xin đợi tôi một chút.'],
    ['玩', 'wán', '🎮', [['Động từ', 'Chơi']], '孩子们在外面玩。', 'Bọn trẻ đang chơi ở bên ngoài.'],
    ['它', 'tā', '🐾', [['Đại từ', 'Nó (chỉ vật, con vật)']], '这是我的狗，它叫小白。', 'Đây là con chó của tôi, nó tên là Tiểu Bạch.'],
    ['有', 'yǒu', '🈶', [['Động từ', 'Có']], '我有一个哥哥。', 'Tôi có một anh trai.'],
    ['来', 'lái', '👋', [['Động từ', 'Đến, tới']], '他明天来北京。', 'Ngày mai anh ấy đến Bắc Kinh.'],
    ['也', 'yě', '➕', [['Phó từ', 'Cũng']], '我也喜欢跑步。', 'Tôi cũng thích chạy bộ.'],
    ['可以', 'kěyǐ', '👌', [['Động từ năng nguyện', 'Có thể, được phép']], '我可以进来吗？', 'Tôi vào được không?'],
  ],
  'hsk2-l15': [
    ['过', 'guo', '✈️', [['Trợ từ', 'Đã từng (biểu thị kinh nghiệm)']], '我去过北京。', 'Tôi đã từng đến Bắc Kinh.'],
    ['还', 'hái', '⏸️', [['Phó từ', 'Còn, vẫn; vẫn còn']], '他还没起床。', 'Anh ấy vẫn chưa dậy.'],
    ['就', 'jiù', '🎯', [['Phó từ', 'Thì, liền, chính là']], '往前走就是机场。', 'Đi thẳng về phía trước chính là sân bay.'],
    ['到', 'dào', '📌', [['Động từ', 'Đến, tới nơi']], '我们到机场了。', 'Chúng ta đến sân bay rồi.'],
    ['从', 'cóng', '🛬', [['Giới từ', 'Từ']], '我从越南来。', 'Tôi đến từ Việt Nam.'],
    ['次', 'cì', '🔂', [['Lượng từ', 'Lần, lượt']], '我去过中国两次。', 'Tôi đã đến Trung Quốc hai lần.'],
    ['一下', 'yíxià', '☝️', [['Số lượng từ', 'Một chút, một lát']], '你看一下这个。', 'Bạn xem cái này một chút.'],
    ['虽然', 'suīrán', '🌗', [['Liên từ', 'Tuy rằng (虽然…但是…: tuy… nhưng…)']], '虽然很累，但是我很快乐。', 'Tuy mệt nhưng tôi rất vui.'],
    ['对', 'duì', '✔️', [['Tính từ', 'Đúng'], ['Giới từ', 'Đối với']], '你说得对。', 'Bạn nói đúng.'],
    ['得', 'de', '🎚️', [['Trợ từ', 'Trợ từ kết cấu (nối bổ ngữ trình độ)']], '他汉语说得很好。', 'Anh ấy nói tiếng Trung rất giỏi.'],
  ],
};

let counter = 0;
const hsk2Vocab = [];
for (const lesson of hsk2Lessons) {
  const words = lessonWords[lesson.id];
  words.forEach(([hanzi, pinyin, emoji, meanings, exampleSentence, exampleSentenceVi], idx) => {
    counter += 1;
    hsk2Vocab.push({
      id: `hsk2-v${String(counter).padStart(3, '0')}`,
      lessonId: lesson.id,
      hanzi,
      pinyin,
      order: idx + 1,
      imageUrl: emojiImage(emoji),
      exampleSentence,
      exampleSentenceVi,
      meanings: meanings.map(([wordClass, meaningVi]) => ({ wordClass, meaningVi })),
    });
  });
}

const hsk2Grammars = [
  {
    id: 'gram-hsk2-1', lessonId: 'hsk2-l1',
    title: 'Bổ ngữ trình độ với 得 (de)',
    explanation: 'Cấu trúc "Động từ + 得 + (很) + Tính từ" dùng để đánh giá một hành động được làm như thế nào. Nếu động từ có tân ngữ, phải lặp lại động từ: "游泳游得很好", hoặc đưa tân ngữ lên trước: "她游泳游得很好 / 她汉语说得很好".',
    examples: JSON.stringify([
      { zh: '他跑得很快。', pinyin: 'Tā pǎo de hěn kuài.', vi: 'Anh ấy chạy rất nhanh.' },
      { zh: '她游泳游得很好。', pinyin: 'Tā yóuyǒng yóu de hěn hǎo.', vi: 'Cô ấy bơi rất giỏi.' },
      { zh: '你说得很对。', pinyin: 'Nǐ shuō de hěn duì.', vi: 'Bạn nói rất đúng.' },
    ]),
  },
  {
    id: 'gram-hsk2-2', lessonId: 'hsk2-l2',
    title: 'Hỏi và trả lời về họ: 您贵姓？我姓…',
    explanation: '"姓" chỉ dùng cho họ, còn "叫" dùng cho tên hoặc họ tên đầy đủ. Cách hỏi lịch sự là "您贵姓？", khi trả lời không nói "贵" mà nói "我姓 + họ".',
    examples: JSON.stringify([
      { zh: '您贵姓？', pinyin: 'Nín guìxìng?', vi: 'Ngài họ gì ạ?' },
      { zh: '我姓王，叫王小明。', pinyin: 'Wǒ xìng Wáng, jiào Wáng Xiǎomíng.', vi: 'Tôi họ Vương, tên là Vương Tiểu Minh.' },
      { zh: '他姓什么？', pinyin: 'Tā xìng shénme?', vi: 'Anh ấy họ gì?' },
    ]),
  },
  {
    id: 'gram-hsk2-3', lessonId: 'hsk2-l3',
    title: 'Cấu trúc 已经…了 (yǐjīng…le)',
    explanation: '"已经 + Động từ / Cụm từ chỉ thời gian + 了" nhấn mạnh hành động đã hoàn thành hoặc thời gian đã đến một mức nào đó, thường hàm ý "sớm hơn / nhiều hơn dự kiến".',
    examples: JSON.stringify([
      { zh: '他已经起床了。', pinyin: 'Tā yǐjīng qǐchuáng le.', vi: 'Anh ấy đã dậy rồi.' },
      { zh: '已经十点了，快走吧。', pinyin: 'Yǐjīng shí diǎn le, kuài zǒu ba.', vi: 'Đã mười giờ rồi, đi nhanh thôi.' },
      { zh: '我已经吃完饭了。', pinyin: 'Wǒ yǐjīng chī wán fàn le.', vi: 'Tôi đã ăn cơm xong rồi.' },
    ]),
  },
  {
    id: 'gram-hsk2-4', lessonId: 'hsk2-l4',
    title: 'Động từ năng nguyện 要 (yào)',
    explanation: '"要" diễn tả ý muốn mạnh (muốn), sự cần thiết (cần, phải) hoặc khi gọi món "要 + danh từ". Lưu ý: muốn nói "không muốn" dùng "不想"; còn "不要" mang nghĩa "đừng".',
    examples: JSON.stringify([
      { zh: '我要一杯咖啡。', pinyin: 'Wǒ yào yì bēi kāfēi.', vi: 'Tôi muốn một cốc cà phê.' },
      { zh: '我要去机场。', pinyin: 'Wǒ yào qù jīchǎng.', vi: 'Tôi muốn (phải) ra sân bay.' },
      { zh: '你要多喝水。', pinyin: 'Nǐ yào duō hē shuǐ.', vi: 'Bạn cần uống nhiều nước.' },
    ]),
  },
  {
    id: 'gram-hsk2-5', lessonId: 'hsk2-l5',
    title: 'Kết cấu chữ 的 (的字结构)',
    explanation: '"Tính từ / Danh từ / Đại từ + 的" có thể thay thế cho danh từ đã biết trong ngữ cảnh, tránh lặp lại. Ví dụ "红的" = cái màu đỏ, "我的" = cái của tôi.',
    examples: JSON.stringify([
      { zh: '这件衣服是我的。', pinyin: 'Zhè jiàn yīfu shì wǒ de.', vi: 'Chiếc áo này là của tôi.' },
      { zh: '我想买那件红的。', pinyin: 'Wǒ xiǎng mǎi nà jiàn hóng de.', vi: 'Tôi muốn mua chiếc màu đỏ kia.' },
      { zh: '白的比黑的贵。', pinyin: 'Bái de bǐ hēi de guì.', vi: 'Cái màu trắng đắt hơn cái màu đen.' },
    ]),
  },
  {
    id: 'gram-hsk2-6', lessonId: 'hsk2-l6',
    title: 'Biểu thị khoảng cách với 离 (lí)',
    explanation: 'Cấu trúc "A + 离 + B + (很) 远 / 近" diễn tả khoảng cách giữa hai địa điểm (hoặc hai thời điểm). Câu hỏi: "A 离 B 远吗？" hoặc "A 离 B 有多远？".',
    examples: JSON.stringify([
      { zh: '我家离学校很近。', pinyin: 'Wǒ jiā lí xuéxiào hěn jìn.', vi: 'Nhà tôi rất gần trường.' },
      { zh: '机场离这儿远吗？', pinyin: 'Jīchǎng lí zhèr yuǎn ma?', vi: 'Sân bay cách đây có xa không?' },
      { zh: '你家离公司有多远？', pinyin: 'Nǐ jiā lí gōngsī yǒu duō yuǎn?', vi: 'Nhà bạn cách công ty bao xa?' },
    ]),
  },
  {
    id: 'gram-hsk2-7', lessonId: 'hsk2-l7',
    title: '了 cuối câu biểu thị sự thay đổi',
    explanation: 'Trợ từ "了" đặt cuối câu cho biết một tình huống mới đã xuất hiện hoặc trạng thái đã thay đổi so với trước: "下雪了" (tuyết bắt đầu rơi), "我不累了" (giờ không mệt nữa).',
    examples: JSON.stringify([
      { zh: '下雪了！', pinyin: 'Xià xuě le!', vi: 'Tuyết rơi rồi!' },
      { zh: '天晴了，我们出去玩吧。', pinyin: 'Tiān qíng le, wǒmen chūqu wán ba.', vi: 'Trời nắng rồi, chúng ta ra ngoài chơi đi.' },
      { zh: '我十八岁了。', pinyin: 'Wǒ shíbā suì le.', vi: 'Tôi mười tám tuổi rồi.' },
    ]),
  },
  {
    id: 'gram-hsk2-8', lessonId: 'hsk2-l8',
    title: 'Quan hệ nhân quả 因为…所以…',
    explanation: '"因为" nêu nguyên nhân, "所以" nêu kết quả. Có thể dùng cả cặp hoặc lược bớt một vế. Khi lý do đứng sau, thường chỉ dùng "因为".',
    examples: JSON.stringify([
      { zh: '因为生病了，所以他没来上课。', pinyin: 'Yīnwèi shēngbìng le, suǒyǐ tā méi lái shàngkè.', vi: 'Vì bị ốm nên anh ấy không đến lớp.' },
      { zh: '因为下雨，所以我们不去跑步了。', pinyin: 'Yīnwèi xiàyǔ, suǒyǐ wǒmen bú qù pǎobù le.', vi: 'Vì trời mưa nên chúng tôi không đi chạy bộ nữa.' },
      { zh: '他没来，因为他生病了。', pinyin: 'Tā méi lái, yīnwèi tā shēngbìng le.', vi: 'Anh ấy không đến vì bị ốm.' },
    ]),
  },
  {
    id: 'gram-hsk2-9', lessonId: 'hsk2-l9',
    title: 'Bổ ngữ xu hướng đơn 来 / 去',
    explanation: '"Động từ + 来" chỉ hướng tiến về phía người nói, "Động từ + 去" chỉ hướng rời xa người nói: 进来 (vào đây), 出去 (ra ngoài), 下来 (xuống đây).',
    examples: JSON.stringify([
      { zh: '请进来！', pinyin: 'Qǐng jìnlai!', vi: 'Mời vào đây!' },
      { zh: '他出去了。', pinyin: 'Tā chūqu le.', vi: 'Anh ấy ra ngoài rồi.' },
      { zh: '你下来吧！', pinyin: 'Nǐ xiàlai ba!', vi: 'Bạn xuống đây đi!' },
    ]),
  },
  {
    id: 'gram-hsk2-10', lessonId: 'hsk2-l10',
    title: 'Bổ ngữ kết quả 懂 / 完 / 错 / 好',
    explanation: '"Động từ + Bổ ngữ kết quả" cho biết kết quả của hành động: 听懂 (nghe hiểu), 做完 (làm xong), 写错 (viết sai). Dạng phủ định dùng "没": 我没听懂.',
    examples: JSON.stringify([
      { zh: '你听懂了吗？', pinyin: 'Nǐ tīng dǒng le ma?', vi: 'Bạn nghe hiểu chưa?' },
      { zh: '我写错了。', pinyin: 'Wǒ xiě cuò le.', vi: 'Tôi viết sai rồi.' },
      { zh: '我还没做完。', pinyin: 'Wǒ hái méi zuò wán.', vi: 'Tôi vẫn chưa làm xong.' },
    ]),
  },
  {
    id: 'gram-hsk2-11', lessonId: 'hsk2-l11',
    title: 'Hành động đang diễn ra: 正在…呢 và Động từ + 着',
    explanation: '"(正)在 + Động từ + (呢)" diễn tả hành động đang tiến hành. "Động từ + 着" diễn tả trạng thái đang được duy trì (cửa đang mở, đang ngồi) hoặc cách thức đi kèm một hành động khác.',
    examples: JSON.stringify([
      { zh: '他正在打电话呢。', pinyin: 'Tā zhèngzài dǎ diànhuà ne.', vi: 'Anh ấy đang gọi điện thoại.' },
      { zh: '门开着。', pinyin: 'Mén kāizhe.', vi: 'Cửa đang mở.' },
      { zh: '她笑着说："谢谢！"', pinyin: 'Tā xiàozhe shuō: "Xièxie!"', vi: 'Cô ấy cười và nói: "Cảm ơn!"' },
    ]),
  },
  {
    id: 'gram-hsk2-12', lessonId: 'hsk2-l12',
    title: 'Câu hai tân ngữ với 送 / 给 / 告诉 / 问',
    explanation: 'Một số động từ có thể mang hai tân ngữ theo thứ tự "Động từ + Người + Vật": 送妈妈一件衣服 (tặng mẹ một chiếc áo), 告诉我你的名字 (cho tôi biết tên bạn).',
    examples: JSON.stringify([
      { zh: '我送妈妈一件衣服。', pinyin: 'Wǒ sòng māma yí jiàn yīfu.', vi: 'Tôi tặng mẹ một chiếc áo.' },
      { zh: '请给我一杯水。', pinyin: 'Qǐng gěi wǒ yì bēi shuǐ.', vi: 'Xin cho tôi một cốc nước.' },
      { zh: '告诉我你的名字。', pinyin: 'Gàosu wǒ nǐ de míngzi.', vi: 'Cho tôi biết tên của bạn.' },
    ]),
  },
  {
    id: 'gram-hsk2-13', lessonId: 'hsk2-l13',
    title: 'Câu so sánh với 比 và phó từ 最',
    explanation: '"A + 比 + B + Tính từ (+ mức chênh lệch)" dùng để so sánh hơn. Trong câu "比" không dùng 很 / 非常 trước tính từ. "最 + Tính từ" biểu thị mức cao nhất.',
    examples: JSON.stringify([
      { zh: '今天比昨天冷。', pinyin: 'Jīntiān bǐ zuótiān lěng.', vi: 'Hôm nay lạnh hơn hôm qua.' },
      { zh: '哥哥比我高一点儿。', pinyin: 'Gēge bǐ wǒ gāo yìdiǎnr.', vi: 'Anh trai cao hơn tôi một chút.' },
      { zh: '他跑得最快。', pinyin: 'Tā pǎo de zuì kuài.', vi: 'Anh ấy chạy nhanh nhất.' },
    ]),
  },
  {
    id: 'gram-hsk2-14', lessonId: 'hsk2-l14',
    title: 'Xin phép và cho phép với 可以 (kěyǐ)',
    explanation: '"可以 + Động từ" dùng để xin phép hoặc cho phép làm gì. Câu trả lời phủ định thường dùng "不能" hoặc "不可以".',
    examples: JSON.stringify([
      { zh: '我可以进来吗？', pinyin: 'Wǒ kěyǐ jìnlai ma?', vi: 'Tôi vào được không?' },
      { zh: '你可以坐这儿。', pinyin: 'Nǐ kěyǐ zuò zhèr.', vi: 'Bạn có thể ngồi đây.' },
      { zh: '这儿不能踢足球。', pinyin: 'Zhèr bù néng tī zúqiú.', vi: 'Ở đây không được đá bóng.' },
    ]),
  },
  {
    id: 'gram-hsk2-15', lessonId: 'hsk2-l15',
    title: 'Trợ từ động thái 过 (guo) — kinh nghiệm',
    explanation: '"Động từ + 过" cho biết đã từng trải qua việc gì trong quá khứ. Phủ định: "没 + Động từ + 过". Câu hỏi: "…过…吗？" hoặc "…过…没有？".',
    examples: JSON.stringify([
      { zh: '我去过中国。', pinyin: 'Wǒ qùguo Zhōngguó.', vi: 'Tôi đã từng đến Trung Quốc.' },
      { zh: '你吃过羊肉吗？', pinyin: 'Nǐ chīguo yángròu ma?', vi: 'Bạn đã từng ăn thịt cừu chưa?' },
      { zh: '我没看过这个电影。', pinyin: 'Wǒ méi kànguo zhège diànyǐng.', vi: 'Tôi chưa từng xem bộ phim này.' },
    ]),
  },
  {
    id: 'gram-hsk2-16', lessonId: 'hsk2-l15',
    title: 'Quan hệ nhượng bộ 虽然…但是…',
    explanation: '"虽然 A，但是 B" = tuy A nhưng B. "虽然" có thể đứng trước hoặc sau chủ ngữ; "但是" luôn đứng đầu vế sau.',
    examples: JSON.stringify([
      { zh: '虽然很累，但是我很快乐。', pinyin: 'Suīrán hěn lèi, dànshì wǒ hěn kuàilè.', vi: 'Tuy mệt nhưng tôi rất vui.' },
      { zh: '这件衣服虽然很贵，但是很漂亮。', pinyin: 'Zhè jiàn yīfu suīrán hěn guì, dànshì hěn piàoliang.', vi: 'Chiếc áo này tuy đắt nhưng rất đẹp.' },
      { zh: '虽然下雨了，但是他还是去跑步了。', pinyin: 'Suīrán xiàyǔ le, dànshì tā háishi qù pǎobù le.', vi: 'Tuy trời mưa nhưng anh ấy vẫn đi chạy bộ.' },
    ]),
  },
];

module.exports = { hsk2Lessons, hsk2Vocab, hsk2Grammars };
