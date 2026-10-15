// prisma/data/characters.js
// Thông tin 345 chữ Hán xuất hiện trong từ vựng HSK 1–2 của dự án.
// Số nét: theo dữ liệu nét chữ của hanzi-writer (Make Me a Hanzi).
// Bộ thủ: bộ chính của chữ theo từ điển Make Me a Hanzi, liên kết tới bảng 214 bộ thủ.
// Từ ghép: lấy từ chính kho từ vựng HSK 1–2 trong dự án.
// File được sinh tự động — nếu thêm từ vựng mới, có thể bổ sung tay theo đúng định dạng.

const characters = [
{
"id": "char-ni",
"hanzi": "你",
"strokeCount": 7,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "你们",
  "pinyin": "nǐmen",
  "meaning": "Các bạn, các anh, các chị"
  }
]
},
{
"id": "char-hao",
"hanzi": "好",
"strokeCount": 6,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "好吃",
  "pinyin": "hǎochī",
  "meaning": "Ngon, ngon miệng"
  }
]
},
{
"id": "char-nin",
"hanzi": "您",
"strokeCount": 11,
"radicalIds": [
  "rad-xin"
],
"compounds": []
},
{
"id": "char-u4eec",
"hanzi": "们",
"strokeCount": 5,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "你们",
  "pinyin": "nǐmen",
  "meaning": "Các bạn, các anh, các chị"
  },
  {
  "hanzi": "我们",
  "pinyin": "wǒmen",
  "meaning": "Chúng tôi, chúng ta"
  },
  {
  "hanzi": "他们",
  "pinyin": "tāmen",
  "meaning": "Họ, bọn họ, các anh ấy"
  }
]
},
{
"id": "char-u5bf9",
"hanzi": "对",
"strokeCount": 5,
"radicalIds": [
  "rad-k041"
],
"compounds": [
  {
  "hanzi": "对不起",
  "pinyin": "duìbuqǐ",
  "meaning": "Xin lỗi"
  }
]
},
{
"id": "char-u4e0d",
"hanzi": "不",
"strokeCount": 4,
"radicalIds": [
  "rad-k001"
],
"compounds": [
  {
  "hanzi": "对不起",
  "pinyin": "duìbuqǐ",
  "meaning": "Xin lỗi"
  },
  {
  "hanzi": "不客气",
  "pinyin": "búkèqi",
  "meaning": "Đừng khách sáo, không có gì"
  }
]
},
{
"id": "char-u8d77",
"hanzi": "起",
"strokeCount": 10,
"radicalIds": [
  "rad-k156"
],
"compounds": [
  {
  "hanzi": "对不起",
  "pinyin": "duìbuqǐ",
  "meaning": "Xin lỗi"
  },
  {
  "hanzi": "一起",
  "pinyin": "yìqǐ",
  "meaning": "Cùng nhau"
  },
  {
  "hanzi": "起床",
  "pinyin": "qǐchuáng",
  "meaning": "Thức dậy, ngủ dậy"
  }
]
},
{
"id": "char-u6ca1",
"hanzi": "没",
"strokeCount": 7,
"radicalIds": [
  "rad-shui"
],
"compounds": [
  {
  "hanzi": "没关系",
  "pinyin": "méiguānxi",
  "meaning": "Không có gì, không sao"
  }
]
},
{
"id": "char-u5173",
"hanzi": "关",
"strokeCount": 6,
"radicalIds": [
  "rad-k012"
],
"compounds": [
  {
  "hanzi": "没关系",
  "pinyin": "méiguānxi",
  "meaning": "Không có gì, không sao"
  }
]
},
{
"id": "char-u7cfb",
"hanzi": "系",
"strokeCount": 7,
"radicalIds": [
  "rad-k120"
],
"compounds": [
  {
  "hanzi": "没关系",
  "pinyin": "méiguānxi",
  "meaning": "Không có gì, không sao"
  }
]
},
{
"id": "char-xie",
"hanzi": "谢",
"strokeCount": 12,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "谢谢",
  "pinyin": "xièxie",
  "meaning": "Cảm ơn, tạ ơn"
  }
]
},
{
"id": "char-u5ba2",
"hanzi": "客",
"strokeCount": 9,
"radicalIds": [
  "rad-mian"
],
"compounds": [
  {
  "hanzi": "不客气",
  "pinyin": "búkèqi",
  "meaning": "Đừng khách sáo, không có gì"
  }
]
},
{
"id": "char-u6c14",
"hanzi": "气",
"strokeCount": 4,
"radicalIds": [
  "rad-k084"
],
"compounds": [
  {
  "hanzi": "不客气",
  "pinyin": "búkèqi",
  "meaning": "Đừng khách sáo, không có gì"
  },
  {
  "hanzi": "天气",
  "pinyin": "tiānqì",
  "meaning": "Thời tiết"
  }
]
},
{
"id": "char-u518d",
"hanzi": "再",
"strokeCount": 6,
"radicalIds": [
  "rad-k013"
],
"compounds": [
  {
  "hanzi": "再见",
  "pinyin": "zàijiàn",
  "meaning": "Tạm biệt, hẹn gặp lại"
  }
]
},
{
"id": "char-u89c1",
"hanzi": "见",
"strokeCount": 4,
"radicalIds": [
  "rad-k147"
],
"compounds": [
  {
  "hanzi": "再见",
  "pinyin": "zàijiàn",
  "meaning": "Tạm biệt, hẹn gặp lại"
  },
  {
  "hanzi": "看见",
  "pinyin": "kànjiàn",
  "meaning": "Nhìn thấy, trông thấy"
  }
]
},
{
"id": "char-u8bf7",
"hanzi": "请",
"strokeCount": 10,
"radicalIds": [
  "rad-yan"
],
"compounds": []
},
{
"id": "char-u4e00",
"hanzi": "一",
"strokeCount": 1,
"radicalIds": [
  "rad-k001"
],
"compounds": [
  {
  "hanzi": "一起",
  "pinyin": "yìqǐ",
  "meaning": "Cùng nhau"
  },
  {
  "hanzi": "第一",
  "pinyin": "dì yī",
  "meaning": "Thứ nhất, hạng nhất"
  },
  {
  "hanzi": "一下",
  "pinyin": "yíxià",
  "meaning": "Một chút, một lát"
  }
]
},
{
"id": "char-u4e8c",
"hanzi": "二",
"strokeCount": 2,
"radicalIds": [
  "rad-k007"
],
"compounds": []
},
{
"id": "char-u4e09",
"hanzi": "三",
"strokeCount": 3,
"radicalIds": [
  "rad-k001"
],
"compounds": []
},
{
"id": "char-u56db",
"hanzi": "四",
"strokeCount": 5,
"radicalIds": [
  "rad-k031"
],
"compounds": []
},
{
"id": "char-u4e94",
"hanzi": "五",
"strokeCount": 4,
"radicalIds": [
  "rad-k007"
],
"compounds": []
},
{
"id": "char-u516d",
"hanzi": "六",
"strokeCount": 4,
"radicalIds": [
  "rad-k012"
],
"compounds": []
},
{
"id": "char-u4e03",
"hanzi": "七",
"strokeCount": 2,
"radicalIds": [
  "rad-k001"
],
"compounds": []
},
{
"id": "char-u516b",
"hanzi": "八",
"strokeCount": 2,
"radicalIds": [
  "rad-k012"
],
"compounds": []
},
{
"id": "char-u4e5d",
"hanzi": "九",
"strokeCount": 2,
"radicalIds": [
  "rad-k005"
],
"compounds": []
},
{
"id": "char-u5341",
"hanzi": "十",
"strokeCount": 2,
"radicalIds": [
  "rad-k024"
],
"compounds": []
},
{
"id": "char-u6211",
"hanzi": "我",
"strokeCount": 7,
"radicalIds": [
  "rad-k062"
],
"compounds": [
  {
  "hanzi": "我们",
  "pinyin": "wǒmen",
  "meaning": "Chúng tôi, chúng ta"
  }
]
},
{
"id": "char-u4ed6",
"hanzi": "他",
"strokeCount": 5,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "他们",
  "pinyin": "tāmen",
  "meaning": "Họ, bọn họ, các anh ấy"
  }
]
},
{
"id": "char-u5979",
"hanzi": "她",
"strokeCount": 6,
"radicalIds": [
  "rad-nv"
],
"compounds": []
},
{
"id": "char-u53eb",
"hanzi": "叫",
"strokeCount": 5,
"radicalIds": [
  "rad-kou"
],
"compounds": []
},
{
"id": "char-u540d",
"hanzi": "名",
"strokeCount": 6,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "名字",
  "pinyin": "míngzi",
  "meaning": "Tên, danh xưng"
  }
]
},
{
"id": "char-u5b57",
"hanzi": "字",
"strokeCount": 6,
"radicalIds": [
  "rad-zi"
],
"compounds": [
  {
  "hanzi": "名字",
  "pinyin": "míngzi",
  "meaning": "Tên, danh xưng"
  },
  {
  "hanzi": "汉字",
  "pinyin": "hànzì",
  "meaning": "Chữ Hán"
  }
]
},
{
"id": "char-u4ec0",
"hanzi": "什",
"strokeCount": 4,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "什么",
  "pinyin": "shénme",
  "meaning": "Cái gì, gì"
  },
  {
  "hanzi": "为什么",
  "pinyin": "wèi shénme",
  "meaning": "Tại sao, vì sao"
  }
]
},
{
"id": "char-u4e48",
"hanzi": "么",
"strokeCount": 3,
"radicalIds": [
  "rad-k004"
],
"compounds": [
  {
  "hanzi": "什么",
  "pinyin": "shénme",
  "meaning": "Cái gì, gì"
  },
  {
  "hanzi": "怎么",
  "pinyin": "zěnme",
  "meaning": "Thế nào, làm sao, bằng cách nào"
  },
  {
  "hanzi": "怎么样",
  "pinyin": "zěnmeyàng",
  "meaning": "Như thế nào, ra sao"
  },
  {
  "hanzi": "为什么",
  "pinyin": "wèi shénme",
  "meaning": "Tại sao, vì sao"
  }
]
},
{
"id": "char-shi",
"hanzi": "是",
"strokeCount": 9,
"radicalIds": [
  "rad-ri"
],
"compounds": []
},
{
"id": "char-ren",
"hanzi": "人",
"strokeCount": 2,
"radicalIds": [
  "rad-ren"
],
"compounds": []
},
{
"id": "char-u4e2d",
"hanzi": "中",
"strokeCount": 4,
"radicalIds": [
  "rad-k002"
],
"compounds": [
  {
  "hanzi": "中国",
  "pinyin": "Zhōngguó",
  "meaning": "Trung Quốc"
  },
  {
  "hanzi": "中午",
  "pinyin": "zhōngwǔ",
  "meaning": "Buổi trưa"
  }
]
},
{
"id": "char-u56fd",
"hanzi": "国",
"strokeCount": 8,
"radicalIds": [
  "rad-k031"
],
"compounds": [
  {
  "hanzi": "中国",
  "pinyin": "Zhōngguó",
  "meaning": "Trung Quốc"
  }
]
},
{
"id": "char-u5317",
"hanzi": "北",
"strokeCount": 5,
"radicalIds": [
  "rad-k021"
],
"compounds": [
  {
  "hanzi": "北京",
  "pinyin": "Běijīng",
  "meaning": "Bắc Kinh"
  }
]
},
{
"id": "char-u4eac",
"hanzi": "京",
"strokeCount": 8,
"radicalIds": [
  "rad-k008"
],
"compounds": [
  {
  "hanzi": "北京",
  "pinyin": "Běijīng",
  "meaning": "Bắc Kinh"
  }
]
},
{
"id": "char-u7238",
"hanzi": "爸",
"strokeCount": 8,
"radicalIds": [
  "rad-k088"
],
"compounds": [
  {
  "hanzi": "爸爸",
  "pinyin": "bàba",
  "meaning": "Bố, ba, cha"
  }
]
},
{
"id": "char-u5988",
"hanzi": "妈",
"strokeCount": 6,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "妈妈",
  "pinyin": "māma",
  "meaning": "Mẹ, má"
  }
]
},
{
"id": "char-u513f",
"hanzi": "儿",
"strokeCount": 2,
"radicalIds": [
  "rad-k010"
],
"compounds": [
  {
  "hanzi": "儿子",
  "pinyin": "érzi",
  "meaning": "Con trai"
  },
  {
  "hanzi": "女儿",
  "pinyin": "nǚ'ér",
  "meaning": "Con gái"
  },
  {
  "hanzi": "哪儿",
  "pinyin": "nǎr",
  "meaning": "Ở đâu, đâu"
  }
]
},
{
"id": "char-u5b50",
"hanzi": "子",
"strokeCount": 3,
"radicalIds": [
  "rad-zi"
],
"compounds": [
  {
  "hanzi": "儿子",
  "pinyin": "érzi",
  "meaning": "Con trai"
  },
  {
  "hanzi": "杯子",
  "pinyin": "bēizi",
  "meaning": "Cốc, ly, tách"
  },
  {
  "hanzi": "桌子",
  "pinyin": "zhuōzi",
  "meaning": "Cái bàn"
  },
  {
  "hanzi": "椅子",
  "pinyin": "yǐzi",
  "meaning": "Cái ghế"
  },
  {
  "hanzi": "妻子",
  "pinyin": "qīzi",
  "meaning": "Vợ"
  },
  {
  "hanzi": "孩子",
  "pinyin": "háizi",
  "meaning": "Con, đứa trẻ"
  }
]
},
{
"id": "char-u5973",
"hanzi": "女",
"strokeCount": 3,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "女儿",
  "pinyin": "nǚ'ér",
  "meaning": "Con gái"
  }
]
},
{
"id": "char-u5bb6",
"hanzi": "家",
"strokeCount": 10,
"radicalIds": [
  "rad-mian"
],
"compounds": [
  {
  "hanzi": "大家",
  "pinyin": "dàjiā",
  "meaning": "Mọi người"
  }
]
},
{
"id": "char-u8c01",
"hanzi": "谁",
"strokeCount": 10,
"radicalIds": [
  "rad-yan"
],
"compounds": []
},
{
"id": "char-u7684",
"hanzi": "的",
"strokeCount": 8,
"radicalIds": [
  "rad-k106"
],
"compounds": []
},
{
"id": "char-u8001",
"hanzi": "老",
"strokeCount": 6,
"radicalIds": [
  "rad-k125"
],
"compounds": [
  {
  "hanzi": "老师",
  "pinyin": "lǎoshī",
  "meaning": "Thầy giáo, cô giáo"
  }
]
},
{
"id": "char-u5e08",
"hanzi": "师",
"strokeCount": 6,
"radicalIds": [
  "rad-k050"
],
"compounds": [
  {
  "hanzi": "老师",
  "pinyin": "lǎoshī",
  "meaning": "Thầy giáo, cô giáo"
  }
]
},
{
"id": "char-u5b66",
"hanzi": "学",
"strokeCount": 8,
"radicalIds": [
  "rad-zi"
],
"compounds": [
  {
  "hanzi": "学生",
  "pinyin": "xuésheng",
  "meaning": "Học sinh, sinh viên"
  },
  {
  "hanzi": "同学",
  "pinyin": "tóngxué",
  "meaning": "Bạn học, bạn cùng lớp"
  },
  {
  "hanzi": "学校",
  "pinyin": "xuéxiào",
  "meaning": "Trường học"
  },
  {
  "hanzi": "学习",
  "pinyin": "xuéxí",
  "meaning": "Học tập, học hỏi"
  }
]
},
{
"id": "char-u751f",
"hanzi": "生",
"strokeCount": 5,
"radicalIds": [
  "rad-k100"
],
"compounds": [
  {
  "hanzi": "学生",
  "pinyin": "xuésheng",
  "meaning": "Học sinh, sinh viên"
  },
  {
  "hanzi": "医生",
  "pinyin": "yīshēng",
  "meaning": "Bác sĩ, thầy thuốc"
  },
  {
  "hanzi": "先生",
  "pinyin": "xiānsheng",
  "meaning": "Ông, ngài, quý ông"
  },
  {
  "hanzi": "生病",
  "pinyin": "shēngbìng",
  "meaning": "Bị ốm, sinh bệnh"
  },
  {
  "hanzi": "生日",
  "pinyin": "shēngrì",
  "meaning": "Sinh nhật"
  }
]
},
{
"id": "char-u540c",
"hanzi": "同",
"strokeCount": 6,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "同学",
  "pinyin": "tóngxué",
  "meaning": "Bạn học, bạn cùng lớp"
  }
]
},
{
"id": "char-u670b",
"hanzi": "朋",
"strokeCount": 8,
"radicalIds": [
  "rad-yue"
],
"compounds": [
  {
  "hanzi": "朋友",
  "pinyin": "péngyou",
  "meaning": "Bạn bè, người bạn"
  }
]
},
{
"id": "char-u53cb",
"hanzi": "友",
"strokeCount": 4,
"radicalIds": [
  "rad-k029"
],
"compounds": [
  {
  "hanzi": "朋友",
  "pinyin": "péngyou",
  "meaning": "Bạn bè, người bạn"
  }
]
},
{
"id": "char-u533b",
"hanzi": "医",
"strokeCount": 7,
"radicalIds": [
  "rad-k023"
],
"compounds": [
  {
  "hanzi": "医生",
  "pinyin": "yīshēng",
  "meaning": "Bác sĩ, thầy thuốc"
  },
  {
  "hanzi": "医院",
  "pinyin": "yīyuàn",
  "meaning": "Bệnh viện"
  }
]
},
{
"id": "char-u5148",
"hanzi": "先",
"strokeCount": 6,
"radicalIds": [
  "rad-k010"
],
"compounds": [
  {
  "hanzi": "先生",
  "pinyin": "xiānsheng",
  "meaning": "Ông, ngài, quý ông"
  }
]
},
{
"id": "char-u5c0f",
"hanzi": "小",
"strokeCount": 3,
"radicalIds": [
  "rad-k042"
],
"compounds": [
  {
  "hanzi": "小姐",
  "pinyin": "xiǎojiě",
  "meaning": "Cô, tiểu thư"
  },
  {
  "hanzi": "小时",
  "pinyin": "xiǎoshí",
  "meaning": "Tiếng, giờ đồng hồ"
  }
]
},
{
"id": "char-u59d0",
"hanzi": "姐",
"strokeCount": 8,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "小姐",
  "pinyin": "xiǎojiě",
  "meaning": "Cô, tiểu thư"
  },
  {
  "hanzi": "姐姐",
  "pinyin": "jiějie",
  "meaning": "Chị gái"
  }
]
},
{
"id": "char-u6821",
"hanzi": "校",
"strokeCount": 10,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "学校",
  "pinyin": "xuéxiào",
  "meaning": "Trường học"
  }
]
},
{
"id": "char-u4e60",
"hanzi": "习",
"strokeCount": 3,
"radicalIds": [
  "rad-k015"
],
"compounds": [
  {
  "hanzi": "学习",
  "pinyin": "xuéxí",
  "meaning": "Học tập, học hỏi"
  }
]
},
{
"id": "char-u5de5",
"hanzi": "工",
"strokeCount": 3,
"radicalIds": [
  "rad-k048"
],
"compounds": [
  {
  "hanzi": "工作",
  "pinyin": "gōngzuò",
  "meaning": "Làm việc / Công việc"
  }
]
},
{
"id": "char-u4f5c",
"hanzi": "作",
"strokeCount": 7,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "工作",
  "pinyin": "gōngzuò",
  "meaning": "Làm việc / Công việc"
  }
]
},
{
"id": "char-u4eca",
"hanzi": "今",
"strokeCount": 4,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "今天",
  "pinyin": "jīntiān",
  "meaning": "Hôm nay"
  }
]
},
{
"id": "char-u5929",
"hanzi": "天",
"strokeCount": 4,
"radicalIds": [
  "rad-k037"
],
"compounds": [
  {
  "hanzi": "今天",
  "pinyin": "jīntiān",
  "meaning": "Hôm nay"
  },
  {
  "hanzi": "明天",
  "pinyin": "míngtiān",
  "meaning": "Ngày mai"
  },
  {
  "hanzi": "昨天",
  "pinyin": "zuótiān",
  "meaning": "Hôm qua"
  },
  {
  "hanzi": "天气",
  "pinyin": "tiānqì",
  "meaning": "Thời tiết"
  }
]
},
{
"id": "char-u660e",
"hanzi": "明",
"strokeCount": 8,
"radicalIds": [
  "rad-ri"
],
"compounds": [
  {
  "hanzi": "明天",
  "pinyin": "míngtiān",
  "meaning": "Ngày mai"
  }
]
},
{
"id": "char-u6628",
"hanzi": "昨",
"strokeCount": 9,
"radicalIds": [
  "rad-ri"
],
"compounds": [
  {
  "hanzi": "昨天",
  "pinyin": "zuótiān",
  "meaning": "Hôm qua"
  }
]
},
{
"id": "char-u5e74",
"hanzi": "年",
"strokeCount": 6,
"radicalIds": [
  "rad-k051"
],
"compounds": [
  {
  "hanzi": "去年",
  "pinyin": "qùnián",
  "meaning": "Năm ngoái"
  }
]
},
{
"id": "char-u6708",
"hanzi": "月",
"strokeCount": 4,
"radicalIds": [
  "rad-yue"
],
"compounds": []
},
{
"id": "char-u65e5",
"hanzi": "日",
"strokeCount": 4,
"radicalIds": [
  "rad-ri"
],
"compounds": [
  {
  "hanzi": "生日",
  "pinyin": "shēngrì",
  "meaning": "Sinh nhật"
  }
]
},
{
"id": "char-u53f7",
"hanzi": "号",
"strokeCount": 5,
"radicalIds": [
  "rad-kou"
],
"compounds": []
},
{
"id": "char-u661f",
"hanzi": "星",
"strokeCount": 9,
"radicalIds": [
  "rad-ri"
],
"compounds": [
  {
  "hanzi": "星期",
  "pinyin": "xīngqī",
  "meaning": "Tuần, thứ"
  }
]
},
{
"id": "char-u671f",
"hanzi": "期",
"strokeCount": 12,
"radicalIds": [
  "rad-yue"
],
"compounds": [
  {
  "hanzi": "星期",
  "pinyin": "xīngqī",
  "meaning": "Tuần, thứ"
  }
]
},
{
"id": "char-u4e0a",
"hanzi": "上",
"strokeCount": 3,
"radicalIds": [
  "rad-k001"
],
"compounds": [
  {
  "hanzi": "上午",
  "pinyin": "shàngwǔ",
  "meaning": "Buổi sáng"
  },
  {
  "hanzi": "早上",
  "pinyin": "zǎoshang",
  "meaning": "Buổi sáng"
  },
  {
  "hanzi": "晚上",
  "pinyin": "wǎnshang",
  "meaning": "Buổi tối"
  },
  {
  "hanzi": "上班",
  "pinyin": "shàngbān",
  "meaning": "Đi làm"
  }
]
},
{
"id": "char-u5348",
"hanzi": "午",
"strokeCount": 4,
"radicalIds": [
  "rad-k024"
],
"compounds": [
  {
  "hanzi": "上午",
  "pinyin": "shàngwǔ",
  "meaning": "Buổi sáng"
  },
  {
  "hanzi": "下午",
  "pinyin": "xiàwǔ",
  "meaning": "Buổi chiều"
  },
  {
  "hanzi": "中午",
  "pinyin": "zhōngwǔ",
  "meaning": "Buổi trưa"
  }
]
},
{
"id": "char-u4e0b",
"hanzi": "下",
"strokeCount": 3,
"radicalIds": [
  "rad-k001"
],
"compounds": [
  {
  "hanzi": "下午",
  "pinyin": "xiàwǔ",
  "meaning": "Buổi chiều"
  },
  {
  "hanzi": "下雨",
  "pinyin": "xiàyǔ",
  "meaning": "Mưa, trời mưa"
  },
  {
  "hanzi": "一下",
  "pinyin": "yíxià",
  "meaning": "Một chút, một lát"
  }
]
},
{
"id": "char-u73b0",
"hanzi": "现",
"strokeCount": 8,
"radicalIds": [
  "rad-k096"
],
"compounds": [
  {
  "hanzi": "现在",
  "pinyin": "xiànzài",
  "meaning": "Bây giờ, hiện tại"
  }
]
},
{
"id": "char-u5728",
"hanzi": "在",
"strokeCount": 6,
"radicalIds": [
  "rad-tu"
],
"compounds": [
  {
  "hanzi": "现在",
  "pinyin": "xiànzài",
  "meaning": "Bây giờ, hiện tại"
  },
  {
  "hanzi": "正在",
  "pinyin": "zhèngzài",
  "meaning": "Đang (làm gì)"
  }
]
},
{
"id": "char-u70b9",
"hanzi": "点",
"strokeCount": 9,
"radicalIds": [
  "rad-huo"
],
"compounds": []
},
{
"id": "char-u5206",
"hanzi": "分",
"strokeCount": 4,
"radicalIds": [
  "rad-dao"
],
"compounds": [
  {
  "hanzi": "分钟",
  "pinyin": "fēnzhōng",
  "meaning": "Phút"
  }
]
},
{
"id": "char-u949f",
"hanzi": "钟",
"strokeCount": 9,
"radicalIds": [
  "rad-jin"
],
"compounds": [
  {
  "hanzi": "分钟",
  "pinyin": "fēnzhōng",
  "meaning": "Phút"
  }
]
},
{
"id": "char-u65f6",
"hanzi": "时",
"strokeCount": 7,
"radicalIds": [
  "rad-ri"
],
"compounds": [
  {
  "hanzi": "时候",
  "pinyin": "shíhou",
  "meaning": "Lúc, khi, thời điểm"
  },
  {
  "hanzi": "小时",
  "pinyin": "xiǎoshí",
  "meaning": "Tiếng, giờ đồng hồ"
  },
  {
  "hanzi": "时间",
  "pinyin": "shíjiān",
  "meaning": "Thời gian"
  }
]
},
{
"id": "char-u5019",
"hanzi": "候",
"strokeCount": 10,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "时候",
  "pinyin": "shíhou",
  "meaning": "Lúc, khi, thời điểm"
  }
]
},
{
"id": "char-u5403",
"hanzi": "吃",
"strokeCount": 6,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "好吃",
  "pinyin": "hǎochī",
  "meaning": "Ngon, ngon miệng"
  }
]
},
{
"id": "char-u7761",
"hanzi": "睡",
"strokeCount": 13,
"radicalIds": [
  "rad-mu"
],
"compounds": [
  {
  "hanzi": "睡觉",
  "pinyin": "shuìjiào",
  "meaning": "Ngủ, đi ngủ"
  }
]
},
{
"id": "char-u89c9",
"hanzi": "觉",
"strokeCount": 9,
"radicalIds": [
  "rad-k147"
],
"compounds": [
  {
  "hanzi": "睡觉",
  "pinyin": "shuìjiào",
  "meaning": "Ngủ, đi ngủ"
  },
  {
  "hanzi": "觉得",
  "pinyin": "juéde",
  "meaning": "Cảm thấy, thấy rằng"
  }
]
},
{
"id": "char-u56de",
"hanzi": "回",
"strokeCount": 6,
"radicalIds": [
  "rad-k031"
],
"compounds": [
  {
  "hanzi": "回答",
  "pinyin": "huídá",
  "meaning": "Trả lời"
  }
]
},
{
"id": "char-u53bb",
"hanzi": "去",
"strokeCount": 5,
"radicalIds": [
  "rad-k028"
],
"compounds": [
  {
  "hanzi": "去年",
  "pinyin": "qùnián",
  "meaning": "Năm ngoái"
  }
]
},
{
"id": "char-u4f4f",
"hanzi": "住",
"strokeCount": 7,
"radicalIds": [
  "rad-ren"
],
"compounds": []
},
{
"id": "char-u559d",
"hanzi": "喝",
"strokeCount": 12,
"radicalIds": [
  "rad-kou"
],
"compounds": []
},
{
"id": "char-u8336",
"hanzi": "茶",
"strokeCount": 9,
"radicalIds": [
  "rad-cao"
],
"compounds": []
},
{
"id": "char-shui",
"hanzi": "水",
"strokeCount": 4,
"radicalIds": [
  "rad-shui"
],
"compounds": [
  {
  "hanzi": "水果",
  "pinyin": "shuǐguǒ",
  "meaning": "Hoa quả, trái cây"
  }
]
},
{
"id": "char-u83dc",
"hanzi": "菜",
"strokeCount": 11,
"radicalIds": [
  "rad-cao"
],
"compounds": []
},
{
"id": "char-u7c73",
"hanzi": "米",
"strokeCount": 6,
"radicalIds": [
  "rad-k119"
],
"compounds": [
  {
  "hanzi": "米饭",
  "pinyin": "mǐfàn",
  "meaning": "Cơm, cơm trắng"
  }
]
},
{
"id": "char-u996d",
"hanzi": "饭",
"strokeCount": 7,
"radicalIds": [
  "rad-shi"
],
"compounds": [
  {
  "hanzi": "米饭",
  "pinyin": "mǐfàn",
  "meaning": "Cơm, cơm trắng"
  },
  {
  "hanzi": "饭店",
  "pinyin": "fàndiàn",
  "meaning": "Nhà hàng, quán ăn, khách sạn"
  }
]
},
{
"id": "char-u679c",
"hanzi": "果",
"strokeCount": 8,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "水果",
  "pinyin": "shuǐguǒ",
  "meaning": "Hoa quả, trái cây"
  },
  {
  "hanzi": "苹果",
  "pinyin": "píngguǒ",
  "meaning": "Quả táo"
  }
]
},
{
"id": "char-u82f9",
"hanzi": "苹",
"strokeCount": 8,
"radicalIds": [
  "rad-cao"
],
"compounds": [
  {
  "hanzi": "苹果",
  "pinyin": "píngguǒ",
  "meaning": "Quả táo"
  }
]
},
{
"id": "char-u676f",
"hanzi": "杯",
"strokeCount": 8,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "杯子",
  "pinyin": "bēizi",
  "meaning": "Cốc, ly, tách"
  }
]
},
{
"id": "char-u60f3",
"hanzi": "想",
"strokeCount": 13,
"radicalIds": [
  "rad-xin"
],
"compounds": []
},
{
"id": "char-mai",
"hanzi": "买",
"strokeCount": 6,
"radicalIds": [
  "rad-k037"
],
"compounds": []
},
{
"id": "char-u4e1c",
"hanzi": "东",
"strokeCount": 5,
"radicalIds": [
  "rad-k001"
],
"compounds": [
  {
  "hanzi": "东西",
  "pinyin": "dōngxi",
  "meaning": "Đồ vật, đồ đạc"
  }
]
},
{
"id": "char-u897f",
"hanzi": "西",
"strokeCount": 6,
"radicalIds": [
  "rad-k146"
],
"compounds": [
  {
  "hanzi": "东西",
  "pinyin": "dōngxi",
  "meaning": "Đồ vật, đồ đạc"
  },
  {
  "hanzi": "西瓜",
  "pinyin": "xīguā",
  "meaning": "Dưa hấu"
  }
]
},
{
"id": "char-u5546",
"hanzi": "商",
"strokeCount": 11,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "商店",
  "pinyin": "shāngdiàn",
  "meaning": "Cửa hàng, tiệm"
  }
]
},
{
"id": "char-u5e97",
"hanzi": "店",
"strokeCount": 8,
"radicalIds": [
  "rad-k053"
],
"compounds": [
  {
  "hanzi": "商店",
  "pinyin": "shāngdiàn",
  "meaning": "Cửa hàng, tiệm"
  },
  {
  "hanzi": "饭店",
  "pinyin": "fàndiàn",
  "meaning": "Nhà hàng, quán ăn, khách sạn"
  }
]
},
{
"id": "char-u94b1",
"hanzi": "钱",
"strokeCount": 10,
"radicalIds": [
  "rad-jin"
],
"compounds": []
},
{
"id": "char-u5757",
"hanzi": "块",
"strokeCount": 7,
"radicalIds": [
  "rad-tu"
],
"compounds": []
},
{
"id": "char-u591a",
"hanzi": "多",
"strokeCount": 6,
"radicalIds": [
  "rad-k036"
],
"compounds": [
  {
  "hanzi": "多少",
  "pinyin": "duōshao",
  "meaning": "Bao nhiêu"
  }
]
},
{
"id": "char-u5c11",
"hanzi": "少",
"strokeCount": 4,
"radicalIds": [
  "rad-k042"
],
"compounds": [
  {
  "hanzi": "多少",
  "pinyin": "duōshao",
  "meaning": "Bao nhiêu"
  }
]
},
{
"id": "char-u8fd9",
"hanzi": "这",
"strokeCount": 7,
"radicalIds": [
  "rad-zou"
],
"compounds": []
},
{
"id": "char-u90a3",
"hanzi": "那",
"strokeCount": 6,
"radicalIds": [
  "rad-k163"
],
"compounds": []
},
{
"id": "char-u4e2a",
"hanzi": "个",
"strokeCount": 3,
"radicalIds": [
  "rad-k002"
],
"compounds": []
},
{
"id": "char-u672c",
"hanzi": "本",
"strokeCount": 5,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": []
},
{
"id": "char-u684c",
"hanzi": "桌",
"strokeCount": 10,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "桌子",
  "pinyin": "zhuōzi",
  "meaning": "Cái bàn"
  }
]
},
{
"id": "char-u6905",
"hanzi": "椅",
"strokeCount": 12,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "椅子",
  "pinyin": "yǐzi",
  "meaning": "Cái ghế"
  }
]
},
{
"id": "char-u7535",
"hanzi": "电",
"strokeCount": 5,
"radicalIds": [
  "rad-k073"
],
"compounds": [
  {
  "hanzi": "电脑",
  "pinyin": "diànnǎo",
  "meaning": "Máy tính, máy vi tính"
  },
  {
  "hanzi": "电视",
  "pinyin": "diànshì",
  "meaning": "Truyền hình, ti-vi"
  },
  {
  "hanzi": "打电话",
  "pinyin": "dǎ diànhuà",
  "meaning": "Gọi điện thoại"
  },
  {
  "hanzi": "电影",
  "pinyin": "diànyǐng",
  "meaning": "Phim, phim điện ảnh"
  }
]
},
{
"id": "char-u8111",
"hanzi": "脑",
"strokeCount": 10,
"radicalIds": [
  "rad-k130"
],
"compounds": [
  {
  "hanzi": "电脑",
  "pinyin": "diànnǎo",
  "meaning": "Máy tính, máy vi tính"
  }
]
},
{
"id": "char-u89c6",
"hanzi": "视",
"strokeCount": 8,
"radicalIds": [
  "rad-k147"
],
"compounds": [
  {
  "hanzi": "电视",
  "pinyin": "diànshì",
  "meaning": "Truyền hình, ti-vi"
  }
]
},
{
"id": "char-u4e66",
"hanzi": "书",
"strokeCount": 4,
"radicalIds": [
  "rad-k002"
],
"compounds": []
},
{
"id": "char-u524d",
"hanzi": "前",
"strokeCount": 9,
"radicalIds": [
  "rad-dao"
],
"compounds": [
  {
  "hanzi": "前面",
  "pinyin": "qiánmiàn",
  "meaning": "Phía trước, đằng trước"
  }
]
},
{
"id": "char-u9762",
"hanzi": "面",
"strokeCount": 9,
"radicalIds": [
  "rad-k176"
],
"compounds": [
  {
  "hanzi": "前面",
  "pinyin": "qiánmiàn",
  "meaning": "Phía trước, đằng trước"
  },
  {
  "hanzi": "后面",
  "pinyin": "hòumiàn",
  "meaning": "Phía sau, đằng sau"
  },
  {
  "hanzi": "面条",
  "pinyin": "miàntiáo",
  "meaning": "Mì sợi"
  }
]
},
{
"id": "char-u540e",
"hanzi": "后",
"strokeCount": 6,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "后面",
  "pinyin": "hòumiàn",
  "meaning": "Phía sau, đằng sau"
  }
]
},
{
"id": "char-u91cc",
"hanzi": "里",
"strokeCount": 7,
"radicalIds": [
  "rad-k166"
],
"compounds": []
},
{
"id": "char-u54ea",
"hanzi": "哪",
"strokeCount": 9,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "哪儿",
  "pinyin": "nǎr",
  "meaning": "Ở đâu, đâu"
  }
]
},
{
"id": "char-u9662",
"hanzi": "院",
"strokeCount": 9,
"radicalIds": [
  "rad-k170"
],
"compounds": [
  {
  "hanzi": "医院",
  "pinyin": "yīyuàn",
  "meaning": "Bệnh viện"
  }
]
},
{
"id": "char-u706b",
"hanzi": "火",
"strokeCount": 4,
"radicalIds": [
  "rad-huo"
],
"compounds": [
  {
  "hanzi": "火车站",
  "pinyin": "huǒchēzhàn",
  "meaning": "Ga xe lửa, ga tàu hỏa"
  }
]
},
{
"id": "char-u8f66",
"hanzi": "车",
"strokeCount": 4,
"radicalIds": [
  "rad-k159"
],
"compounds": [
  {
  "hanzi": "火车站",
  "pinyin": "huǒchēzhàn",
  "meaning": "Ga xe lửa, ga tàu hỏa"
  },
  {
  "hanzi": "出租车",
  "pinyin": "chūzūchē",
  "meaning": "Xe taxi"
  },
  {
  "hanzi": "公共汽车",
  "pinyin": "gōnggòng qìchē",
  "meaning": "Xe buýt"
  }
]
},
{
"id": "char-u7ad9",
"hanzi": "站",
"strokeCount": 10,
"radicalIds": [
  "rad-k117"
],
"compounds": [
  {
  "hanzi": "火车站",
  "pinyin": "huǒchēzhàn",
  "meaning": "Ga xe lửa, ga tàu hỏa"
  }
]
},
{
"id": "char-u98de",
"hanzi": "飞",
"strokeCount": 3,
"radicalIds": [
  "rad-k183"
],
"compounds": [
  {
  "hanzi": "飞机",
  "pinyin": "fēijī",
  "meaning": "Máy bay"
  }
]
},
{
"id": "char-u673a",
"hanzi": "机",
"strokeCount": 6,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "飞机",
  "pinyin": "fēijī",
  "meaning": "Máy bay"
  },
  {
  "hanzi": "机场",
  "pinyin": "jīchǎng",
  "meaning": "Sân bay"
  },
  {
  "hanzi": "手机",
  "pinyin": "shǒujī",
  "meaning": "Điện thoại di động"
  }
]
},
{
"id": "char-u51fa",
"hanzi": "出",
"strokeCount": 5,
"radicalIds": [
  "rad-k017"
],
"compounds": [
  {
  "hanzi": "出租车",
  "pinyin": "chūzūchē",
  "meaning": "Xe taxi"
  }
]
},
{
"id": "char-u79df",
"hanzi": "租",
"strokeCount": 10,
"radicalIds": [
  "rad-k115"
],
"compounds": [
  {
  "hanzi": "出租车",
  "pinyin": "chūzūchē",
  "meaning": "Xe taxi"
  }
]
},
{
"id": "char-u5f00",
"hanzi": "开",
"strokeCount": 4,
"radicalIds": [
  "rad-k055"
],
"compounds": [
  {
  "hanzi": "开始",
  "pinyin": "kāishǐ",
  "meaning": "Bắt đầu"
  }
]
},
{
"id": "char-u5750",
"hanzi": "坐",
"strokeCount": 7,
"radicalIds": [
  "rad-tu"
],
"compounds": []
},
{
"id": "char-u600e",
"hanzi": "怎",
"strokeCount": 9,
"radicalIds": [
  "rad-xin"
],
"compounds": [
  {
  "hanzi": "怎么",
  "pinyin": "zěnme",
  "meaning": "Thế nào, làm sao, bằng cách nào"
  },
  {
  "hanzi": "怎么样",
  "pinyin": "zěnmeyàng",
  "meaning": "Như thế nào, ra sao"
  }
]
},
{
"id": "char-u732b",
"hanzi": "猫",
"strokeCount": 11,
"radicalIds": [
  "rad-k094"
],
"compounds": []
},
{
"id": "char-u72d7",
"hanzi": "狗",
"strokeCount": 8,
"radicalIds": [
  "rad-k094"
],
"compounds": []
},
{
"id": "char-u6837",
"hanzi": "样",
"strokeCount": 10,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "怎么样",
  "pinyin": "zěnmeyàng",
  "meaning": "Như thế nào, ra sao"
  }
]
},
{
"id": "char-u51b7",
"hanzi": "冷",
"strokeCount": 7,
"radicalIds": [
  "rad-k015"
],
"compounds": []
},
{
"id": "char-u70ed",
"hanzi": "热",
"strokeCount": 10,
"radicalIds": [
  "rad-huo"
],
"compounds": []
},
{
"id": "char-u96e8",
"hanzi": "雨",
"strokeCount": 8,
"radicalIds": [
  "rad-yu"
],
"compounds": [
  {
  "hanzi": "下雨",
  "pinyin": "xiàyǔ",
  "meaning": "Mưa, trời mưa"
  }
]
},
{
"id": "char-u592a",
"hanzi": "太",
"strokeCount": 4,
"radicalIds": [
  "rad-k037"
],
"compounds": []
},
{
"id": "char-u5f88",
"hanzi": "很",
"strokeCount": 9,
"radicalIds": [
  "rad-k060"
],
"compounds": []
},
{
"id": "char-u90fd",
"hanzi": "都",
"strokeCount": 10,
"radicalIds": [
  "rad-k163"
],
"compounds": []
},
{
"id": "char-u4f1a",
"hanzi": "会",
"strokeCount": 6,
"radicalIds": [
  "rad-ren"
],
"compounds": []
},
{
"id": "char-u80fd",
"hanzi": "能",
"strokeCount": 10,
"radicalIds": [
  "rad-k130"
],
"compounds": [
  {
  "hanzi": "可能",
  "pinyin": "kěnéng",
  "meaning": "Có thể, có lẽ"
  }
]
},
{
"id": "char-u8bf4",
"hanzi": "说",
"strokeCount": 9,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "说话",
  "pinyin": "shuōhuà",
  "meaning": "Nói chuyện, phát biểu"
  }
]
},
{
"id": "char-u8bdd",
"hanzi": "话",
"strokeCount": 8,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "说话",
  "pinyin": "shuōhuà",
  "meaning": "Nói chuyện, phát biểu"
  },
  {
  "hanzi": "打电话",
  "pinyin": "dǎ diànhuà",
  "meaning": "Gọi điện thoại"
  }
]
},
{
"id": "char-u8bfb",
"hanzi": "读",
"strokeCount": 10,
"radicalIds": [
  "rad-yan"
],
"compounds": []
},
{
"id": "char-u5199",
"hanzi": "写",
"strokeCount": 5,
"radicalIds": [
  "rad-k014"
],
"compounds": []
},
{
"id": "char-u6c49",
"hanzi": "汉",
"strokeCount": 5,
"radicalIds": [
  "rad-shui"
],
"compounds": [
  {
  "hanzi": "汉字",
  "pinyin": "hànzì",
  "meaning": "Chữ Hán"
  },
  {
  "hanzi": "汉语",
  "pinyin": "hànyǔ",
  "meaning": "Tiếng Hán, tiếng Trung"
  }
]
},
{
"id": "char-u8bed",
"hanzi": "语",
"strokeCount": 9,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "汉语",
  "pinyin": "hànyǔ",
  "meaning": "Tiếng Hán, tiếng Trung"
  }
]
},
{
"id": "char-u542c",
"hanzi": "听",
"strokeCount": 7,
"radicalIds": [
  "rad-kou"
],
"compounds": []
},
{
"id": "char-u7231",
"hanzi": "爱",
"strokeCount": 10,
"radicalIds": [
  "rad-k087"
],
"compounds": []
},
{
"id": "char-u559c",
"hanzi": "喜",
"strokeCount": 12,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "喜欢",
  "pinyin": "xǐhuan",
  "meaning": "Thích, yêu thích"
  }
]
},
{
"id": "char-u6b22",
"hanzi": "欢",
"strokeCount": 6,
"radicalIds": [
  "rad-k076"
],
"compounds": [
  {
  "hanzi": "喜欢",
  "pinyin": "xǐhuan",
  "meaning": "Thích, yêu thích"
  },
  {
  "hanzi": "欢迎",
  "pinyin": "huānyíng",
  "meaning": "Hoan nghênh, chào mừng"
  }
]
},
{
"id": "char-u8ba4",
"hanzi": "认",
"strokeCount": 4,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "认识",
  "pinyin": "rènshi",
  "meaning": "Quen biết, nhận biết"
  }
]
},
{
"id": "char-u8bc6",
"hanzi": "识",
"strokeCount": 7,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "认识",
  "pinyin": "rènshi",
  "meaning": "Quen biết, nhận biết"
  }
]
},
{
"id": "char-u9ad8",
"hanzi": "高",
"strokeCount": 10,
"radicalIds": [
  "rad-k189"
],
"compounds": [
  {
  "hanzi": "高兴",
  "pinyin": "gāoxìng",
  "meaning": "Vui vẻ, phấn khởi"
  }
]
},
{
"id": "char-u5174",
"hanzi": "兴",
"strokeCount": 6,
"radicalIds": [
  "rad-k012"
],
"compounds": [
  {
  "hanzi": "高兴",
  "pinyin": "gāoxìng",
  "meaning": "Vui vẻ, phấn khởi"
  }
]
},
{
"id": "char-u6f02",
"hanzi": "漂",
"strokeCount": 14,
"radicalIds": [
  "rad-shui"
],
"compounds": [
  {
  "hanzi": "漂亮",
  "pinyin": "piàoliang",
  "meaning": "Đẹp, xinh đẹp"
  }
]
},
{
"id": "char-u4eae",
"hanzi": "亮",
"strokeCount": 9,
"radicalIds": [
  "rad-k008"
],
"compounds": [
  {
  "hanzi": "漂亮",
  "pinyin": "piàoliang",
  "meaning": "Đẹp, xinh đẹp"
  }
]
},
{
"id": "char-u5927",
"hanzi": "大",
"strokeCount": 3,
"radicalIds": [
  "rad-k037"
],
"compounds": [
  {
  "hanzi": "大家",
  "pinyin": "dàjiā",
  "meaning": "Mọi người"
  }
]
},
{
"id": "char-u4e9b",
"hanzi": "些",
"strokeCount": 8,
"radicalIds": [
  "rad-k007"
],
"compounds": []
},
{
"id": "char-u5582",
"hanzi": "喂",
"strokeCount": 12,
"radicalIds": [
  "rad-kou"
],
"compounds": []
},
{
"id": "char-u6253",
"hanzi": "打",
"strokeCount": 5,
"radicalIds": [
  "rad-shou"
],
"compounds": [
  {
  "hanzi": "打电话",
  "pinyin": "dǎ diànhuà",
  "meaning": "Gọi điện thoại"
  },
  {
  "hanzi": "打篮球",
  "pinyin": "dǎ lánqiú",
  "meaning": "Chơi bóng rổ"
  }
]
},
{
"id": "char-u505a",
"hanzi": "做",
"strokeCount": 11,
"radicalIds": [
  "rad-ren"
],
"compounds": []
},
{
"id": "char-u770b",
"hanzi": "看",
"strokeCount": 9,
"radicalIds": [
  "rad-mu"
],
"compounds": [
  {
  "hanzi": "看见",
  "pinyin": "kànjiàn",
  "meaning": "Nhìn thấy, trông thấy"
  }
]
},
{
"id": "char-u5f71",
"hanzi": "影",
"strokeCount": 15,
"radicalIds": [
  "rad-k059"
],
"compounds": [
  {
  "hanzi": "电影",
  "pinyin": "diànyǐng",
  "meaning": "Phim, phim điện ảnh"
  }
]
},
{
"id": "char-u548c",
"hanzi": "和",
"strokeCount": 8,
"radicalIds": [
  "rad-kou"
],
"compounds": []
},
{
"id": "char-u4e86",
"hanzi": "了",
"strokeCount": 2,
"radicalIds": [
  "rad-k006"
],
"compounds": []
},
{
"id": "char-u5427",
"hanzi": "吧",
"strokeCount": 7,
"radicalIds": [
  "rad-kou"
],
"compounds": []
},
{
"id": "char-u8fd0",
"hanzi": "运",
"strokeCount": 7,
"radicalIds": [
  "rad-zou"
],
"compounds": [
  {
  "hanzi": "运动",
  "pinyin": "yùndòng",
  "meaning": "Thể thao, vận động"
  }
]
},
{
"id": "char-u52a8",
"hanzi": "动",
"strokeCount": 6,
"radicalIds": [
  "rad-k019"
],
"compounds": [
  {
  "hanzi": "运动",
  "pinyin": "yùndòng",
  "meaning": "Thể thao, vận động"
  }
]
},
{
"id": "char-u7bee",
"hanzi": "篮",
"strokeCount": 16,
"radicalIds": [
  "rad-k118"
],
"compounds": [
  {
  "hanzi": "打篮球",
  "pinyin": "dǎ lánqiú",
  "meaning": "Chơi bóng rổ"
  }
]
},
{
"id": "char-u7403",
"hanzi": "球",
"strokeCount": 11,
"radicalIds": [
  "rad-k096"
],
"compounds": [
  {
  "hanzi": "打篮球",
  "pinyin": "dǎ lánqiú",
  "meaning": "Chơi bóng rổ"
  },
  {
  "hanzi": "踢足球",
  "pinyin": "tī zúqiú",
  "meaning": "Đá bóng"
  }
]
},
{
"id": "char-u8e22",
"hanzi": "踢",
"strokeCount": 15,
"radicalIds": [
  "rad-k157"
],
"compounds": [
  {
  "hanzi": "踢足球",
  "pinyin": "tī zúqiú",
  "meaning": "Đá bóng"
  }
]
},
{
"id": "char-u8db3",
"hanzi": "足",
"strokeCount": 7,
"radicalIds": [
  "rad-k157"
],
"compounds": [
  {
  "hanzi": "踢足球",
  "pinyin": "tī zúqiú",
  "meaning": "Đá bóng"
  }
]
},
{
"id": "char-u8dd1",
"hanzi": "跑",
"strokeCount": 12,
"radicalIds": [
  "rad-k157"
],
"compounds": [
  {
  "hanzi": "跑步",
  "pinyin": "pǎobù",
  "meaning": "Chạy bộ"
  }
]
},
{
"id": "char-u6b65",
"hanzi": "步",
"strokeCount": 7,
"radicalIds": [
  "rad-k077"
],
"compounds": [
  {
  "hanzi": "跑步",
  "pinyin": "pǎobù",
  "meaning": "Chạy bộ"
  }
]
},
{
"id": "char-u6e38",
"hanzi": "游",
"strokeCount": 12,
"radicalIds": [
  "rad-shui"
],
"compounds": [
  {
  "hanzi": "游泳",
  "pinyin": "yóuyǒng",
  "meaning": "Bơi lội"
  },
  {
  "hanzi": "旅游",
  "pinyin": "lǚyóu",
  "meaning": "Du lịch"
  }
]
},
{
"id": "char-u6cf3",
"hanzi": "泳",
"strokeCount": 8,
"radicalIds": [
  "rad-shui"
],
"compounds": [
  {
  "hanzi": "游泳",
  "pinyin": "yóuyǒng",
  "meaning": "Bơi lội"
  }
]
},
{
"id": "char-u8df3",
"hanzi": "跳",
"strokeCount": 13,
"radicalIds": [
  "rad-k157"
],
"compounds": [
  {
  "hanzi": "跳舞",
  "pinyin": "tiàowǔ",
  "meaning": "Nhảy múa, khiêu vũ"
  }
]
},
{
"id": "char-u821e",
"hanzi": "舞",
"strokeCount": 14,
"radicalIds": [
  "rad-k136"
],
"compounds": [
  {
  "hanzi": "跳舞",
  "pinyin": "tiàowǔ",
  "meaning": "Nhảy múa, khiêu vũ"
  }
]
},
{
"id": "char-u8eab",
"hanzi": "身",
"strokeCount": 7,
"radicalIds": [
  "rad-k158"
],
"compounds": [
  {
  "hanzi": "身体",
  "pinyin": "shēntǐ",
  "meaning": "Cơ thể; sức khỏe"
  }
]
},
{
"id": "char-u4f53",
"hanzi": "体",
"strokeCount": 7,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "身体",
  "pinyin": "shēntǐ",
  "meaning": "Cơ thể; sức khỏe"
  }
]
},
{
"id": "char-u7d2f",
"hanzi": "累",
"strokeCount": 11,
"radicalIds": [
  "rad-k120"
],
"compounds": []
},
{
"id": "char-u4f11",
"hanzi": "休",
"strokeCount": 6,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "休息",
  "pinyin": "xiūxi",
  "meaning": "Nghỉ ngơi"
  }
]
},
{
"id": "char-u606f",
"hanzi": "息",
"strokeCount": 10,
"radicalIds": [
  "rad-xin"
],
"compounds": [
  {
  "hanzi": "休息",
  "pinyin": "xiūxi",
  "meaning": "Nghỉ ngơi"
  }
]
},
{
"id": "char-u54e5",
"hanzi": "哥",
"strokeCount": 10,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "哥哥",
  "pinyin": "gēge",
  "meaning": "Anh trai"
  }
]
},
{
"id": "char-u5f1f",
"hanzi": "弟",
"strokeCount": 7,
"radicalIds": [
  "rad-k057"
],
"compounds": [
  {
  "hanzi": "弟弟",
  "pinyin": "dìdi",
  "meaning": "Em trai"
  }
]
},
{
"id": "char-u59b9",
"hanzi": "妹",
"strokeCount": 8,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "妹妹",
  "pinyin": "mèimei",
  "meaning": "Em gái"
  }
]
},
{
"id": "char-u4e08",
"hanzi": "丈",
"strokeCount": 3,
"radicalIds": [
  "rad-k001"
],
"compounds": [
  {
  "hanzi": "丈夫",
  "pinyin": "zhàngfu",
  "meaning": "Chồng"
  }
]
},
{
"id": "char-u592b",
"hanzi": "夫",
"strokeCount": 4,
"radicalIds": [
  "rad-k037"
],
"compounds": [
  {
  "hanzi": "丈夫",
  "pinyin": "zhàngfu",
  "meaning": "Chồng"
  }
]
},
{
"id": "char-u59bb",
"hanzi": "妻",
"strokeCount": 8,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "妻子",
  "pinyin": "qīzi",
  "meaning": "Vợ"
  }
]
},
{
"id": "char-u5b69",
"hanzi": "孩",
"strokeCount": 9,
"radicalIds": [
  "rad-zi"
],
"compounds": [
  {
  "hanzi": "孩子",
  "pinyin": "háizi",
  "meaning": "Con, đứa trẻ"
  }
]
},
{
"id": "char-u7537",
"hanzi": "男",
"strokeCount": 7,
"radicalIds": [
  "rad-k102"
],
"compounds": []
},
{
"id": "char-u59d3",
"hanzi": "姓",
"strokeCount": 8,
"radicalIds": [
  "rad-nv"
],
"compounds": []
},
{
"id": "char-u65e9",
"hanzi": "早",
"strokeCount": 6,
"radicalIds": [
  "rad-ri"
],
"compounds": [
  {
  "hanzi": "早上",
  "pinyin": "zǎoshang",
  "meaning": "Buổi sáng"
  }
]
},
{
"id": "char-u665a",
"hanzi": "晚",
"strokeCount": 11,
"radicalIds": [
  "rad-ri"
],
"compounds": [
  {
  "hanzi": "晚上",
  "pinyin": "wǎnshang",
  "meaning": "Buổi tối"
  }
]
},
{
"id": "char-u5e8a",
"hanzi": "床",
"strokeCount": 7,
"radicalIds": [
  "rad-k053"
],
"compounds": [
  {
  "hanzi": "起床",
  "pinyin": "qǐchuáng",
  "meaning": "Thức dậy, ngủ dậy"
  }
]
},
{
"id": "char-u73ed",
"hanzi": "班",
"strokeCount": 10,
"radicalIds": [
  "rad-k096"
],
"compounds": [
  {
  "hanzi": "上班",
  "pinyin": "shàngbān",
  "meaning": "Đi làm"
  }
]
},
{
"id": "char-u95f4",
"hanzi": "间",
"strokeCount": 7,
"radicalIds": [
  "rad-men"
],
"compounds": [
  {
  "hanzi": "时间",
  "pinyin": "shíjiān",
  "meaning": "Thời gian"
  },
  {
  "hanzi": "房间",
  "pinyin": "fángjiān",
  "meaning": "Phòng"
  }
]
},
{
"id": "char-u5df2",
"hanzi": "已",
"strokeCount": 3,
"radicalIds": [
  "rad-k049"
],
"compounds": [
  {
  "hanzi": "已经",
  "pinyin": "yǐjīng",
  "meaning": "Đã, rồi"
  }
]
},
{
"id": "char-u7ecf",
"hanzi": "经",
"strokeCount": 8,
"radicalIds": [
  "rad-k120"
],
"compounds": [
  {
  "hanzi": "已经",
  "pinyin": "yǐjīng",
  "meaning": "Đã, rồi"
  }
]
},
{
"id": "char-u59cb",
"hanzi": "始",
"strokeCount": 8,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "开始",
  "pinyin": "kāishǐ",
  "meaning": "Bắt đầu"
  }
]
},
{
"id": "char-u5b8c",
"hanzi": "完",
"strokeCount": 7,
"radicalIds": [
  "rad-mian"
],
"compounds": []
},
{
"id": "char-u51c6",
"hanzi": "准",
"strokeCount": 10,
"radicalIds": [
  "rad-k015"
],
"compounds": [
  {
  "hanzi": "准备",
  "pinyin": "zhǔnbèi",
  "meaning": "Chuẩn bị"
  }
]
},
{
"id": "char-u5907",
"hanzi": "备",
"strokeCount": 8,
"radicalIds": [
  "rad-k034"
],
"compounds": [
  {
  "hanzi": "准备",
  "pinyin": "zhǔnbèi",
  "meaning": "Chuẩn bị"
  }
]
},
{
"id": "char-u9e21",
"hanzi": "鸡",
"strokeCount": 7,
"radicalIds": [
  "rad-k196"
],
"compounds": [
  {
  "hanzi": "鸡蛋",
  "pinyin": "jīdàn",
  "meaning": "Trứng gà"
  }
]
},
{
"id": "char-u86cb",
"hanzi": "蛋",
"strokeCount": 11,
"radicalIds": [
  "rad-chong"
],
"compounds": [
  {
  "hanzi": "鸡蛋",
  "pinyin": "jīdàn",
  "meaning": "Trứng gà"
  }
]
},
{
"id": "char-u6761",
"hanzi": "条",
"strokeCount": 7,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": [
  {
  "hanzi": "面条",
  "pinyin": "miàntiáo",
  "meaning": "Mì sợi"
  }
]
},
{
"id": "char-u725b",
"hanzi": "牛",
"strokeCount": 4,
"radicalIds": [
  "rad-k093"
],
"compounds": [
  {
  "hanzi": "牛奶",
  "pinyin": "niúnǎi",
  "meaning": "Sữa bò"
  }
]
},
{
"id": "char-u5976",
"hanzi": "奶",
"strokeCount": 5,
"radicalIds": [
  "rad-nv"
],
"compounds": [
  {
  "hanzi": "牛奶",
  "pinyin": "niúnǎi",
  "meaning": "Sữa bò"
  }
]
},
{
"id": "char-u5496",
"hanzi": "咖",
"strokeCount": 8,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "咖啡",
  "pinyin": "kāfēi",
  "meaning": "Cà phê"
  }
]
},
{
"id": "char-u5561",
"hanzi": "啡",
"strokeCount": 11,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "咖啡",
  "pinyin": "kāfēi",
  "meaning": "Cà phê"
  }
]
},
{
"id": "char-u7f8a",
"hanzi": "羊",
"strokeCount": 6,
"radicalIds": [
  "rad-k123"
],
"compounds": [
  {
  "hanzi": "羊肉",
  "pinyin": "yángròu",
  "meaning": "Thịt cừu, thịt dê"
  }
]
},
{
"id": "char-u8089",
"hanzi": "肉",
"strokeCount": 6,
"radicalIds": [
  "rad-k130"
],
"compounds": [
  {
  "hanzi": "羊肉",
  "pinyin": "yángròu",
  "meaning": "Thịt cừu, thịt dê"
  }
]
},
{
"id": "char-u9c7c",
"hanzi": "鱼",
"strokeCount": 8,
"radicalIds": [
  "rad-k195"
],
"compounds": []
},
{
"id": "char-u74dc",
"hanzi": "瓜",
"strokeCount": 5,
"radicalIds": [
  "rad-k097"
],
"compounds": [
  {
  "hanzi": "西瓜",
  "pinyin": "xīguā",
  "meaning": "Dưa hấu"
  }
]
},
{
"id": "char-u8981",
"hanzi": "要",
"strokeCount": 9,
"radicalIds": [
  "rad-k146"
],
"compounds": []
},
{
"id": "char-u6bcf",
"hanzi": "每",
"strokeCount": 7,
"radicalIds": [
  "rad-k080"
],
"compounds": []
},
{
"id": "char-u4e24",
"hanzi": "两",
"strokeCount": 7,
"radicalIds": [
  "rad-k001"
],
"compounds": []
},
{
"id": "char-u5356",
"hanzi": "卖",
"strokeCount": 8,
"radicalIds": [
  "rad-k024"
],
"compounds": []
},
{
"id": "char-u4ef6",
"hanzi": "件",
"strokeCount": 6,
"radicalIds": [
  "rad-ren"
],
"compounds": []
},
{
"id": "char-u8863",
"hanzi": "衣",
"strokeCount": 6,
"radicalIds": [
  "rad-k145"
],
"compounds": [
  {
  "hanzi": "衣服",
  "pinyin": "yīfu",
  "meaning": "Quần áo"
  }
]
},
{
"id": "char-u670d",
"hanzi": "服",
"strokeCount": 8,
"radicalIds": [
  "rad-yue"
],
"compounds": [
  {
  "hanzi": "衣服",
  "pinyin": "yīfu",
  "meaning": "Quần áo"
  },
  {
  "hanzi": "服务员",
  "pinyin": "fúwùyuán",
  "meaning": "Nhân viên phục vụ"
  }
]
},
{
"id": "char-u4fbf",
"hanzi": "便",
"strokeCount": 9,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "便宜",
  "pinyin": "piányi",
  "meaning": "Rẻ"
  }
]
},
{
"id": "char-u5b9c",
"hanzi": "宜",
"strokeCount": 8,
"radicalIds": [
  "rad-mian"
],
"compounds": [
  {
  "hanzi": "便宜",
  "pinyin": "piányi",
  "meaning": "Rẻ"
  }
]
},
{
"id": "char-u8d35",
"hanzi": "贵",
"strokeCount": 9,
"radicalIds": [
  "rad-k154"
],
"compounds": []
},
{
"id": "char-u989c",
"hanzi": "颜",
"strokeCount": 15,
"radicalIds": [
  "rad-k181"
],
"compounds": [
  {
  "hanzi": "颜色",
  "pinyin": "yánsè",
  "meaning": "Màu sắc"
  }
]
},
{
"id": "char-u8272",
"hanzi": "色",
"strokeCount": 6,
"radicalIds": [
  "rad-k139"
],
"compounds": [
  {
  "hanzi": "颜色",
  "pinyin": "yánsè",
  "meaning": "Màu sắc"
  }
]
},
{
"id": "char-u7ea2",
"hanzi": "红",
"strokeCount": 6,
"radicalIds": [
  "rad-k120"
],
"compounds": []
},
{
"id": "char-u767d",
"hanzi": "白",
"strokeCount": 5,
"radicalIds": [
  "rad-k106"
],
"compounds": []
},
{
"id": "char-u9ed1",
"hanzi": "黑",
"strokeCount": 12,
"radicalIds": [
  "rad-k203"
],
"compounds": []
},
{
"id": "char-u5343",
"hanzi": "千",
"strokeCount": 3,
"radicalIds": [
  "rad-k024"
],
"compounds": []
},
{
"id": "char-u516c",
"hanzi": "公",
"strokeCount": 4,
"radicalIds": [
  "rad-k012"
],
"compounds": [
  {
  "hanzi": "公共汽车",
  "pinyin": "gōnggòng qìchē",
  "meaning": "Xe buýt"
  },
  {
  "hanzi": "公司",
  "pinyin": "gōngsī",
  "meaning": "Công ty"
  }
]
},
{
"id": "char-u5171",
"hanzi": "共",
"strokeCount": 6,
"radicalIds": [
  "rad-k012"
],
"compounds": [
  {
  "hanzi": "公共汽车",
  "pinyin": "gōnggòng qìchē",
  "meaning": "Xe buýt"
  }
]
},
{
"id": "char-u6c7d",
"hanzi": "汽",
"strokeCount": 7,
"radicalIds": [
  "rad-shui"
],
"compounds": [
  {
  "hanzi": "公共汽车",
  "pinyin": "gōnggòng qìchē",
  "meaning": "Xe buýt"
  }
]
},
{
"id": "char-u573a",
"hanzi": "场",
"strokeCount": 6,
"radicalIds": [
  "rad-tu"
],
"compounds": [
  {
  "hanzi": "机场",
  "pinyin": "jīchǎng",
  "meaning": "Sân bay"
  }
]
},
{
"id": "char-u8def",
"hanzi": "路",
"strokeCount": 13,
"radicalIds": [
  "rad-k157"
],
"compounds": []
},
{
"id": "char-u8fdc",
"hanzi": "远",
"strokeCount": 7,
"radicalIds": [
  "rad-zou"
],
"compounds": []
},
{
"id": "char-u8fd1",
"hanzi": "近",
"strokeCount": 7,
"radicalIds": [
  "rad-zou"
],
"compounds": []
},
{
"id": "char-u79bb",
"hanzi": "离",
"strokeCount": 10,
"radicalIds": [
  "rad-k114"
],
"compounds": []
},
{
"id": "char-u5f80",
"hanzi": "往",
"strokeCount": 8,
"radicalIds": [
  "rad-k060"
],
"compounds": []
},
{
"id": "char-u5de6",
"hanzi": "左",
"strokeCount": 5,
"radicalIds": [
  "rad-k048"
],
"compounds": [
  {
  "hanzi": "左边",
  "pinyin": "zuǒbian",
  "meaning": "Bên trái"
  }
]
},
{
"id": "char-u8fb9",
"hanzi": "边",
"strokeCount": 5,
"radicalIds": [
  "rad-zou"
],
"compounds": [
  {
  "hanzi": "左边",
  "pinyin": "zuǒbian",
  "meaning": "Bên trái"
  },
  {
  "hanzi": "右边",
  "pinyin": "yòubian",
  "meaning": "Bên phải"
  },
  {
  "hanzi": "旁边",
  "pinyin": "pángbiān",
  "meaning": "Bên cạnh"
  }
]
},
{
"id": "char-u53f3",
"hanzi": "右",
"strokeCount": 5,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "右边",
  "pinyin": "yòubian",
  "meaning": "Bên phải"
  }
]
},
{
"id": "char-u65c1",
"hanzi": "旁",
"strokeCount": 10,
"radicalIds": [
  "rad-k070"
],
"compounds": [
  {
  "hanzi": "旁边",
  "pinyin": "pángbiān",
  "meaning": "Bên cạnh"
  }
]
},
{
"id": "char-u6674",
"hanzi": "晴",
"strokeCount": 12,
"radicalIds": [
  "rad-ri"
],
"compounds": []
},
{
"id": "char-u9634",
"hanzi": "阴",
"strokeCount": 6,
"radicalIds": [
  "rad-k170"
],
"compounds": []
},
{
"id": "char-u96ea",
"hanzi": "雪",
"strokeCount": 11,
"radicalIds": [
  "rad-yu"
],
"compounds": []
},
{
"id": "char-u975e",
"hanzi": "非",
"strokeCount": 8,
"radicalIds": [
  "rad-k175"
],
"compounds": [
  {
  "hanzi": "非常",
  "pinyin": "fēicháng",
  "meaning": "Rất, vô cùng"
  }
]
},
{
"id": "char-u5e38",
"hanzi": "常",
"strokeCount": 11,
"radicalIds": [
  "rad-k050"
],
"compounds": [
  {
  "hanzi": "非常",
  "pinyin": "fēicháng",
  "meaning": "Rất, vô cùng"
  }
]
},
{
"id": "char-u771f",
"hanzi": "真",
"strokeCount": 10,
"radicalIds": [
  "rad-mu"
],
"compounds": []
},
{
"id": "char-u5916",
"hanzi": "外",
"strokeCount": 5,
"radicalIds": [
  "rad-k036"
],
"compounds": []
},
{
"id": "char-u7a7f",
"hanzi": "穿",
"strokeCount": 9,
"radicalIds": [
  "rad-k116"
],
"compounds": []
},
{
"id": "char-u5f97",
"hanzi": "得",
"strokeCount": 11,
"radicalIds": [
  "rad-k060"
],
"compounds": [
  {
  "hanzi": "觉得",
  "pinyin": "juéde",
  "meaning": "Cảm thấy, thấy rằng"
  }
]
},
{
"id": "char-u53ef",
"hanzi": "可",
"strokeCount": 5,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "可能",
  "pinyin": "kěnéng",
  "meaning": "Có thể, có lẽ"
  },
  {
  "hanzi": "可以",
  "pinyin": "kěyǐ",
  "meaning": "Có thể, được phép"
  }
]
},
{
"id": "char-u75c5",
"hanzi": "病",
"strokeCount": 10,
"radicalIds": [
  "rad-k104"
],
"compounds": [
  {
  "hanzi": "生病",
  "pinyin": "shēngbìng",
  "meaning": "Bị ốm, sinh bệnh"
  }
]
},
{
"id": "char-u836f",
"hanzi": "药",
"strokeCount": 9,
"radicalIds": [
  "rad-cao"
],
"compounds": []
},
{
"id": "char-u773c",
"hanzi": "眼",
"strokeCount": 11,
"radicalIds": [
  "rad-mu"
],
"compounds": [
  {
  "hanzi": "眼睛",
  "pinyin": "yǎnjing",
  "meaning": "Mắt"
  }
]
},
{
"id": "char-u775b",
"hanzi": "睛",
"strokeCount": 13,
"radicalIds": [
  "rad-mu"
],
"compounds": [
  {
  "hanzi": "眼睛",
  "pinyin": "yǎnjing",
  "meaning": "Mắt"
  }
]
},
{
"id": "char-u6d17",
"hanzi": "洗",
"strokeCount": 9,
"radicalIds": [
  "rad-shui"
],
"compounds": []
},
{
"id": "char-u522b",
"hanzi": "别",
"strokeCount": 7,
"radicalIds": [
  "rad-dao"
],
"compounds": []
},
{
"id": "char-u8ba9",
"hanzi": "让",
"strokeCount": 5,
"radicalIds": [
  "rad-yan"
],
"compounds": []
},
{
"id": "char-u5e0c",
"hanzi": "希",
"strokeCount": 7,
"radicalIds": [
  "rad-k050"
],
"compounds": [
  {
  "hanzi": "希望",
  "pinyin": "xīwàng",
  "meaning": "Hy vọng, mong"
  }
]
},
{
"id": "char-u671b",
"hanzi": "望",
"strokeCount": 11,
"radicalIds": [
  "rad-yue"
],
"compounds": [
  {
  "hanzi": "希望",
  "pinyin": "xīwàng",
  "meaning": "Hy vọng, mong"
  }
]
},
{
"id": "char-u4e3a",
"hanzi": "为",
"strokeCount": 4,
"radicalIds": [
  "rad-k003"
],
"compounds": [
  {
  "hanzi": "为什么",
  "pinyin": "wèi shénme",
  "meaning": "Tại sao, vì sao"
  },
  {
  "hanzi": "因为",
  "pinyin": "yīnwèi",
  "meaning": "Bởi vì (因为…所以…: vì… nên…)"
  }
]
},
{
"id": "char-u56e0",
"hanzi": "因",
"strokeCount": 6,
"radicalIds": [
  "rad-k031"
],
"compounds": [
  {
  "hanzi": "因为",
  "pinyin": "yīnwèi",
  "meaning": "Bởi vì (因为…所以…: vì… nên…)"
  }
]
},
{
"id": "char-u65c5",
"hanzi": "旅",
"strokeCount": 10,
"radicalIds": [
  "rad-k070"
],
"compounds": [
  {
  "hanzi": "旅游",
  "pinyin": "lǚyóu",
  "meaning": "Du lịch"
  }
]
},
{
"id": "char-u5bbe",
"hanzi": "宾",
"strokeCount": 10,
"radicalIds": [
  "rad-mian"
],
"compounds": [
  {
  "hanzi": "宾馆",
  "pinyin": "bīnguǎn",
  "meaning": "Khách sạn"
  }
]
},
{
"id": "char-u9986",
"hanzi": "馆",
"strokeCount": 11,
"radicalIds": [
  "rad-shi"
],
"compounds": [
  {
  "hanzi": "宾馆",
  "pinyin": "bīnguǎn",
  "meaning": "Khách sạn"
  }
]
},
{
"id": "char-u623f",
"hanzi": "房",
"strokeCount": 8,
"radicalIds": [
  "rad-k063"
],
"compounds": [
  {
  "hanzi": "房间",
  "pinyin": "fángjiān",
  "meaning": "Phòng"
  }
]
},
{
"id": "char-u52a1",
"hanzi": "务",
"strokeCount": 5,
"radicalIds": [
  "rad-k034"
],
"compounds": [
  {
  "hanzi": "服务员",
  "pinyin": "fúwùyuán",
  "meaning": "Nhân viên phục vụ"
  }
]
},
{
"id": "char-u5458",
"hanzi": "员",
"strokeCount": 7,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "服务员",
  "pinyin": "fúwùyuán",
  "meaning": "Nhân viên phục vụ"
  }
]
},
{
"id": "char-u7968",
"hanzi": "票",
"strokeCount": 11,
"radicalIds": [
  "rad-k113"
],
"compounds": []
},
{
"id": "char-u95e8",
"hanzi": "门",
"strokeCount": 3,
"radicalIds": [
  "rad-men"
],
"compounds": []
},
{
"id": "char-u8fce",
"hanzi": "迎",
"strokeCount": 7,
"radicalIds": [
  "rad-zou"
],
"compounds": [
  {
  "hanzi": "欢迎",
  "pinyin": "huānyíng",
  "meaning": "Hoan nghênh, chào mừng"
  }
]
},
{
"id": "char-u8fdb",
"hanzi": "进",
"strokeCount": 7,
"radicalIds": [
  "rad-zou"
],
"compounds": []
},
{
"id": "char-u8d70",
"hanzi": "走",
"strokeCount": 7,
"radicalIds": [
  "rad-k156"
],
"compounds": []
},
{
"id": "char-u6559",
"hanzi": "教",
"strokeCount": 11,
"radicalIds": [
  "rad-k066"
],
"compounds": [
  {
  "hanzi": "教室",
  "pinyin": "jiàoshì",
  "meaning": "Phòng học, lớp học"
  }
]
},
{
"id": "char-u5ba4",
"hanzi": "室",
"strokeCount": 9,
"radicalIds": [
  "rad-mian"
],
"compounds": [
  {
  "hanzi": "教室",
  "pinyin": "jiàoshì",
  "meaning": "Phòng học, lớp học"
  }
]
},
{
"id": "char-u8bfe",
"hanzi": "课",
"strokeCount": 10,
"radicalIds": [
  "rad-yan"
],
"compounds": []
},
{
"id": "char-u8003",
"hanzi": "考",
"strokeCount": 6,
"radicalIds": [
  "rad-k125"
],
"compounds": [
  {
  "hanzi": "考试",
  "pinyin": "kǎoshì",
  "meaning": "Thi; kỳ thi"
  }
]
},
{
"id": "char-u8bd5",
"hanzi": "试",
"strokeCount": 8,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "考试",
  "pinyin": "kǎoshì",
  "meaning": "Thi; kỳ thi"
  }
]
},
{
"id": "char-u9898",
"hanzi": "题",
"strokeCount": 15,
"radicalIds": [
  "rad-k181"
],
"compounds": [
  {
  "hanzi": "问题",
  "pinyin": "wèntí",
  "meaning": "Câu hỏi; vấn đề"
  }
]
},
{
"id": "char-u95ee",
"hanzi": "问",
"strokeCount": 6,
"radicalIds": [
  "rad-men"
],
"compounds": [
  {
  "hanzi": "问题",
  "pinyin": "wèntí",
  "meaning": "Câu hỏi; vấn đề"
  }
]
},
{
"id": "char-u7b54",
"hanzi": "答",
"strokeCount": 12,
"radicalIds": [
  "rad-k118"
],
"compounds": [
  {
  "hanzi": "回答",
  "pinyin": "huídá",
  "meaning": "Trả lời"
  }
]
},
{
"id": "char-u94c5",
"hanzi": "铅",
"strokeCount": 10,
"radicalIds": [
  "rad-jin"
],
"compounds": [
  {
  "hanzi": "铅笔",
  "pinyin": "qiānbǐ",
  "meaning": "Bút chì"
  }
]
},
{
"id": "char-u7b14",
"hanzi": "笔",
"strokeCount": 10,
"radicalIds": [
  "rad-k118"
],
"compounds": [
  {
  "hanzi": "铅笔",
  "pinyin": "qiānbǐ",
  "meaning": "Bút chì"
  }
]
},
{
"id": "char-u61c2",
"hanzi": "懂",
"strokeCount": 15,
"radicalIds": [
  "rad-xin"
],
"compounds": []
},
{
"id": "char-u610f",
"hanzi": "意",
"strokeCount": 13,
"radicalIds": [
  "rad-xin"
],
"compounds": [
  {
  "hanzi": "意思",
  "pinyin": "yìsi",
  "meaning": "Ý nghĩa, ý"
  }
]
},
{
"id": "char-u601d",
"hanzi": "思",
"strokeCount": 9,
"radicalIds": [
  "rad-xin"
],
"compounds": [
  {
  "hanzi": "意思",
  "pinyin": "yìsi",
  "meaning": "Ý nghĩa, ý"
  }
]
},
{
"id": "char-u9519",
"hanzi": "错",
"strokeCount": 13,
"radicalIds": [
  "rad-jin"
],
"compounds": []
},
{
"id": "char-u53f8",
"hanzi": "司",
"strokeCount": 5,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "公司",
  "pinyin": "gōngsī",
  "meaning": "Công ty"
  }
]
},
{
"id": "char-u4e8b",
"hanzi": "事",
"strokeCount": 8,
"radicalIds": [
  "rad-k006"
],
"compounds": [
  {
  "hanzi": "事情",
  "pinyin": "shìqing",
  "meaning": "Việc, sự việc"
  }
]
},
{
"id": "char-u60c5",
"hanzi": "情",
"strokeCount": 11,
"radicalIds": [
  "rad-xin"
],
"compounds": [
  {
  "hanzi": "事情",
  "pinyin": "shìqing",
  "meaning": "Việc, sự việc"
  }
]
},
{
"id": "char-u5fd9",
"hanzi": "忙",
"strokeCount": 6,
"radicalIds": [
  "rad-xin"
],
"compounds": []
},
{
"id": "char-u5e2e",
"hanzi": "帮",
"strokeCount": 9,
"radicalIds": [
  "rad-k050"
],
"compounds": [
  {
  "hanzi": "帮助",
  "pinyin": "bāngzhù",
  "meaning": "Giúp đỡ"
  }
]
},
{
"id": "char-u52a9",
"hanzi": "助",
"strokeCount": 7,
"radicalIds": [
  "rad-k019"
],
"compounds": [
  {
  "hanzi": "帮助",
  "pinyin": "bāngzhù",
  "meaning": "Giúp đỡ"
  }
]
},
{
"id": "char-u544a",
"hanzi": "告",
"strokeCount": 7,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "告诉",
  "pinyin": "gàosu",
  "meaning": "Nói cho biết, bảo"
  }
]
},
{
"id": "char-u8bc9",
"hanzi": "诉",
"strokeCount": 7,
"radicalIds": [
  "rad-yan"
],
"compounds": [
  {
  "hanzi": "告诉",
  "pinyin": "gàosu",
  "meaning": "Nói cho biết, bảo"
  }
]
},
{
"id": "char-u4ecb",
"hanzi": "介",
"strokeCount": 4,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "介绍",
  "pinyin": "jièshào",
  "meaning": "Giới thiệu"
  }
]
},
{
"id": "char-u7ecd",
"hanzi": "绍",
"strokeCount": 8,
"radicalIds": [
  "rad-k120"
],
"compounds": [
  {
  "hanzi": "介绍",
  "pinyin": "jièshào",
  "meaning": "Giới thiệu"
  }
]
},
{
"id": "char-u6b63",
"hanzi": "正",
"strokeCount": 5,
"radicalIds": [
  "rad-k077"
],
"compounds": [
  {
  "hanzi": "正在",
  "pinyin": "zhèngzài",
  "meaning": "Đang (làm gì)"
  }
]
},
{
"id": "char-u7740",
"hanzi": "着",
"strokeCount": 11,
"radicalIds": [
  "rad-mu"
],
"compounds": []
},
{
"id": "char-u62a5",
"hanzi": "报",
"strokeCount": 7,
"radicalIds": [
  "rad-shou"
],
"compounds": [
  {
  "hanzi": "报纸",
  "pinyin": "bàozhǐ",
  "meaning": "Báo, tờ báo"
  }
]
},
{
"id": "char-u7eb8",
"hanzi": "纸",
"strokeCount": 7,
"radicalIds": [
  "rad-k120"
],
"compounds": [
  {
  "hanzi": "报纸",
  "pinyin": "bàozhǐ",
  "meaning": "Báo, tờ báo"
  }
]
},
{
"id": "char-u5feb",
"hanzi": "快",
"strokeCount": 7,
"radicalIds": [
  "rad-xin"
],
"compounds": [
  {
  "hanzi": "快乐",
  "pinyin": "kuàilè",
  "meaning": "Vui vẻ, hạnh phúc"
  }
]
},
{
"id": "char-u4e50",
"hanzi": "乐",
"strokeCount": 5,
"radicalIds": [
  "rad-k004"
],
"compounds": [
  {
  "hanzi": "快乐",
  "pinyin": "kuàilè",
  "meaning": "Vui vẻ, hạnh phúc"
  }
]
},
{
"id": "char-u9001",
"hanzi": "送",
"strokeCount": 9,
"radicalIds": [
  "rad-zou"
],
"compounds": []
},
{
"id": "char-u7ed9",
"hanzi": "给",
"strokeCount": 9,
"radicalIds": [
  "rad-k120"
],
"compounds": []
},
{
"id": "char-u624b",
"hanzi": "手",
"strokeCount": 4,
"radicalIds": [
  "rad-shou"
],
"compounds": [
  {
  "hanzi": "手表",
  "pinyin": "shǒubiǎo",
  "meaning": "Đồng hồ đeo tay"
  },
  {
  "hanzi": "手机",
  "pinyin": "shǒujī",
  "meaning": "Điện thoại di động"
  }
]
},
{
"id": "char-u8868",
"hanzi": "表",
"strokeCount": 8,
"radicalIds": [
  "rad-k145"
],
"compounds": [
  {
  "hanzi": "手表",
  "pinyin": "shǒubiǎo",
  "meaning": "Đồng hồ đeo tay"
  }
]
},
{
"id": "char-u5c81",
"hanzi": "岁",
"strokeCount": 6,
"radicalIds": [
  "rad-k046"
],
"compounds": []
},
{
"id": "char-u51e0",
"hanzi": "几",
"strokeCount": 2,
"radicalIds": [
  "rad-k016"
],
"compounds": []
},
{
"id": "char-u7b11",
"hanzi": "笑",
"strokeCount": 10,
"radicalIds": [
  "rad-k118"
],
"compounds": []
},
{
"id": "char-u5531",
"hanzi": "唱",
"strokeCount": 11,
"radicalIds": [
  "rad-kou"
],
"compounds": [
  {
  "hanzi": "唱歌",
  "pinyin": "chànggē",
  "meaning": "Hát, ca hát"
  }
]
},
{
"id": "char-u6b4c",
"hanzi": "歌",
"strokeCount": 14,
"radicalIds": [
  "rad-k076"
],
"compounds": [
  {
  "hanzi": "唱歌",
  "pinyin": "chànggē",
  "meaning": "Hát, ca hát"
  }
]
},
{
"id": "char-u6bd4",
"hanzi": "比",
"strokeCount": 4,
"radicalIds": [
  "rad-k081"
],
"compounds": []
},
{
"id": "char-u957f",
"hanzi": "长",
"strokeCount": 4,
"radicalIds": [
  "rad-k168"
],
"compounds": []
},
{
"id": "char-u65b0",
"hanzi": "新",
"strokeCount": 13,
"radicalIds": [
  "rad-k069"
],
"compounds": []
},
{
"id": "char-u6162",
"hanzi": "慢",
"strokeCount": 14,
"radicalIds": [
  "rad-xin"
],
"compounds": []
},
{
"id": "char-u6700",
"hanzi": "最",
"strokeCount": 12,
"radicalIds": [
  "rad-k073"
],
"compounds": []
},
{
"id": "char-u7b2c",
"hanzi": "第",
"strokeCount": 11,
"radicalIds": [
  "rad-k118"
],
"compounds": [
  {
  "hanzi": "第一",
  "pinyin": "dì yī",
  "meaning": "Thứ nhất, hạng nhất"
  }
]
},
{
"id": "char-u767e",
"hanzi": "百",
"strokeCount": 6,
"radicalIds": [
  "rad-k106"
],
"compounds": []
},
{
"id": "char-u96f6",
"hanzi": "零",
"strokeCount": 13,
"radicalIds": [
  "rad-yu"
],
"compounds": []
},
{
"id": "char-u77e5",
"hanzi": "知",
"strokeCount": 8,
"radicalIds": [
  "rad-k111"
],
"compounds": [
  {
  "hanzi": "知道",
  "pinyin": "zhīdào",
  "meaning": "Biết"
  }
]
},
{
"id": "char-u9053",
"hanzi": "道",
"strokeCount": 12,
"radicalIds": [
  "rad-zou"
],
"compounds": [
  {
  "hanzi": "知道",
  "pinyin": "zhīdào",
  "meaning": "Biết"
  }
]
},
{
"id": "char-u627e",
"hanzi": "找",
"strokeCount": 7,
"radicalIds": [
  "rad-shou"
],
"compounds": []
},
{
"id": "char-u7b49",
"hanzi": "等",
"strokeCount": 12,
"radicalIds": [
  "rad-k118"
],
"compounds": []
},
{
"id": "char-u73a9",
"hanzi": "玩",
"strokeCount": 8,
"radicalIds": [
  "rad-k096"
],
"compounds": []
},
{
"id": "char-u5b83",
"hanzi": "它",
"strokeCount": 5,
"radicalIds": [
  "rad-mian"
],
"compounds": []
},
{
"id": "char-u6709",
"hanzi": "有",
"strokeCount": 6,
"radicalIds": [
  "rad-yue"
],
"compounds": []
},
{
"id": "char-u6765",
"hanzi": "来",
"strokeCount": 7,
"radicalIds": [
  "rad-mu-tree"
],
"compounds": []
},
{
"id": "char-u4e5f",
"hanzi": "也",
"strokeCount": 3,
"radicalIds": [
  "rad-k005"
],
"compounds": []
},
{
"id": "char-u4ee5",
"hanzi": "以",
"strokeCount": 4,
"radicalIds": [
  "rad-ren"
],
"compounds": [
  {
  "hanzi": "可以",
  "pinyin": "kěyǐ",
  "meaning": "Có thể, được phép"
  }
]
},
{
"id": "char-u8fc7",
"hanzi": "过",
"strokeCount": 6,
"radicalIds": [
  "rad-zou"
],
"compounds": []
},
{
"id": "char-u8fd8",
"hanzi": "还",
"strokeCount": 7,
"radicalIds": [
  "rad-zou"
],
"compounds": []
},
{
"id": "char-u5c31",
"hanzi": "就",
"strokeCount": 12,
"radicalIds": [
  "rad-k043"
],
"compounds": []
},
{
"id": "char-u5230",
"hanzi": "到",
"strokeCount": 8,
"radicalIds": [
  "rad-dao"
],
"compounds": []
},
{
"id": "char-u4ece",
"hanzi": "从",
"strokeCount": 4,
"radicalIds": [
  "rad-ren"
],
"compounds": []
},
{
"id": "char-u6b21",
"hanzi": "次",
"strokeCount": 6,
"radicalIds": [
  "rad-k076"
],
"compounds": []
},
{
"id": "char-u867d",
"hanzi": "虽",
"strokeCount": 9,
"radicalIds": [
  "rad-chong"
],
"compounds": [
  {
  "hanzi": "虽然",
  "pinyin": "suīrán",
  "meaning": "Tuy rằng (虽然…但是…: tuy… nhưng…)"
  }
]
},
{
"id": "char-u7136",
"hanzi": "然",
"strokeCount": 12,
"radicalIds": [
  "rad-huo"
],
"compounds": [
  {
  "hanzi": "虽然",
  "pinyin": "suīrán",
  "meaning": "Tuy rằng (虽然…但是…: tuy… nhưng…)"
  }
]
}
];

module.exports = { characters };
