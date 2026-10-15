// prisma/data/dictations.js
// Video luyện nghe chép chính tả. Mỗi câu transcript có mốc startSec / endSec.
// Lưu ý: thay youtubeId bằng ID video thật bạn muốn dùng (xem trang /admin).

const dictations = [
  {
    id: 'dict-1',
    youtubeId: 'bC36d8e3-mo', // High-quality Mandarin dialogue sample
    title: 'HSK 1 - Hội thoại chào hỏi và giới thiệu bản thân',
    level: 'HSK 1',
    channelName: 'Easy Mandarin Lessons',
    publishedAt: '2024-03-15',
    isFreeTrial: true,
    transcript: JSON.stringify([
      { text: '你好，请问你叫什么名字？', pinyin: 'Nǐ hǎo, qǐngwèn nǐ jiào shénme míngzi?', vi: 'Xin chào, xin hỏi bạn tên là gì?', startSec: 1, endSec: 5 },
      { text: '你好！我叫王小明。', pinyin: 'Nǐ hǎo! Wǒ jiào Wáng Xiǎomíng.', vi: 'Xin chào! Tôi tên là Vương Tiểu Minh.', startSec: 6, endSec: 10 },
      { text: '很高兴认识你。', pinyin: 'Hěn gāoxìng rènshi nǐ.', vi: 'Rất vui được làm quen với bạn.', startSec: 11, endSec: 15 },
      { text: '我也是，再见！', pinyin: 'Wǒ yě shì, zàijiàn!', vi: 'Tôi cũng vậy, tạm biệt!', startSec: 16, endSec: 20 },
    ]),
  },
  {
    id: 'dict-2',
    youtubeId: 't4mBv1o6y5M',
    title: 'HSK 2 - Mua sắm và hỏi giá cả tại siêu thị',
    level: 'HSK 2',
    channelName: 'Mandarin Corner',
    publishedAt: '2024-04-20',
    isFreeTrial: true,
    transcript: JSON.stringify([
      { text: '请问这件衣服多少钱？', pinyin: 'Qǐngwèn zhè jiàn yīfu duōshao qián?', vi: 'Xin hỏi bộ quần áo này bao nhiêu tiền?', startSec: 2, endSec: 6 },
      { text: '这件衣服一百块钱。', pinyin: 'Zhè jiàn yīfu yībǎi kuài qián.', vi: 'Bộ quần áo này một trăm tệ.', startSec: 7, endSec: 11 },
      { text: '太贵了，便宜一点儿行吗？', pinyin: 'Tài guì le, piányi yīdiǎnr xíng ma?', vi: 'Đắt quá, rẻ một chút có được không?', startSec: 12, endSec: 17 },
      { text: '可以给你八十块。', pinyin: 'Kěyǐ gěi nǐ bāshí kuài.', vi: 'Có thể để cho bạn tám mươi tệ.', startSec: 18, endSec: 22 },
    ]),
  },
  {
    id: 'dict-3',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'HSK 3 - Cuộc hẹn cuối tuần cùng bạn bè',
    level: 'HSK 3',
    channelName: 'Mandarin Click',
    publishedAt: '2024-05-10',
    isFreeTrial: false,
    transcript: JSON.stringify([
      { text: '周末你有空吗？我们一起去爬山吧。', pinyin: 'Zhōumò nǐ yǒu kòng ma? Wǒmen yīqǐ qù páshān ba.', vi: 'Cuối tuần bạn rảnh không? Chúng ta cùng đi leo núi nhé.', startSec: 1, endSec: 6 },
      { text: '天气预报说周六可能会下雨。', pinyin: 'Tiānqì yùbào shuō zhōuliù kěnéng huì xiàyǔ.', vi: 'Dự báo thời tiết nói thứ bảy có thể có mưa.', startSec: 7, endSec: 13 },
      { text: '那我们去电影院看电影怎么样？', pinyin: 'Nà wǒmen qù diànyǐngyuàn kàn diànyǐng zěnmeyàng?', vi: 'Thế chúng mình đi rạp chiếu phim xem phim được không?', startSec: 14, endSec: 20 },
    ]),
  },
];

module.exports = { dictations };
