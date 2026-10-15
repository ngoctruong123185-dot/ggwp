// prisma/seed.js
// Nạp toàn bộ nội dung học (cấp độ, bài học, từ vựng, ngữ pháp, bộ thủ, chữ Hán, video).
//
//   node prisma/seed.js                → làm mới NỘI DUNG, GIỮ NGUYÊN tài khoản & tiến độ học
//   node prisma/seed.js --reset-users  → xóa sạch cả tài khoản, tiến độ và tạo lại tài khoản mẫu
//
// Tài khoản mẫu (chỉ tạo nếu chưa tồn tại): admin / admin123 và hocvien / 123456

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { hsk1Lessons, hsk1Vocab, hsk1Grammars } = require('./data/hsk1-full');
const { hsk2Lessons, hsk2Vocab, hsk2Grammars } = require('./data/hsk2-full');
const { radicalThemes, radicals } = require('./data/radicals');
const { characters } = require('./data/characters');
const { dictations } = require('./data/dictations');

const prisma = new PrismaClient();
const RESET_USERS = process.argv.includes('--reset-users');

const levels = [
  { id: 'hsk1', name: 'HSK 1', order: 1, description: 'Trọn bộ 150 từ vựng cơ bản, phát âm chuẩn và các mẫu câu giao tiếp hàng ngày quen thuộc.' },
  { id: 'hsk2', name: 'HSK 2', order: 2, description: '300 từ vựng, mở rộng các chủ đề đời sống, mua sắm và hỏi đường đi lại.' },
  { id: 'hsk3', name: 'HSK 3', order: 3, description: '600 từ vựng, trao đổi tự tin trong công việc, học tập và du lịch.' },
  { id: 'hsk4', name: 'HSK 4', order: 4, description: '1200 từ vựng, thảo luận sâu về nhiều chủ đề và giao tiếp tự nhiên với người bản ngữ.' },
  { id: 'hsk5', name: 'HSK 5', order: 5, description: '2500 từ vựng, đọc hiểu báo chí, xem phim và thuyết trình ý tưởng mạch lạc.' },
  { id: 'hsk6', name: 'HSK 6', order: 6, description: '5000+ từ vựng, làm chủ tiếng Trung, sử dụng thành thạo như tiếng mẹ đẻ.' },
];

async function seedContent() {
  // Xóa nội dung cũ (không đụng tới bảng User / UserProgress / UserStreak)
  await prisma.dictationVideo.deleteMany({});
  await prisma.grammar.deleteMany({});
  await prisma.characterDetail.deleteMany({});
  await prisma.radical.deleteMany({});
  await prisma.radicalTheme.deleteMany({});
  await prisma.meaning.deleteMany({});
  await prisma.vocabItem.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.level.deleteMany({});

  await prisma.level.createMany({ data: levels });
  await prisma.lesson.createMany({ data: [...hsk1Lessons, ...hsk2Lessons] });

  const vocab = [...hsk1Vocab, ...hsk2Vocab];
  await prisma.vocabItem.createMany({
    data: vocab.map(({ meanings, ...item }) => item),
  });
  await prisma.meaning.createMany({
    data: vocab.flatMap((v) =>
      v.meanings.map((m, i) => ({
        id: `${v.id}-m${i + 1}`,
        vocabId: v.id,
        wordClass: m.wordClass,
        meaningVi: m.meaningVi,
        order: i + 1,
      }))
    ),
  });

  await prisma.grammar.createMany({ data: [...hsk1Grammars, ...hsk2Grammars] });

  await prisma.radicalTheme.createMany({ data: radicalThemes });
  await prisma.radical.createMany({ data: radicals });

  await prisma.characterDetail.createMany({
    data: characters.map((c) => ({
      id: c.id,
      hanzi: c.hanzi,
      strokeCount: c.strokeCount,
      radicalIds: JSON.stringify(c.radicalIds),
      compounds: JSON.stringify(c.compounds),
    })),
  });

  await prisma.dictationVideo.createMany({ data: dictations });

  return { vocab: vocab.length, radicals: radicals.length, characters: characters.length };
}

async function seedUsers() {
  if (RESET_USERS) {
    await prisma.userProgress.deleteMany({});
    await prisma.userStreak.deleteMany({});
    await prisma.user.deleteMany({});
  }

  const existingAdmin = await prisma.user.findUnique({ where: { username: 'admin' } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        id: 'admin-user',
        username: 'admin',
        passwordHash: bcrypt.hashSync('admin123', 10),
        displayName: 'Quản trị viên',
        role: 'ADMIN',
      },
    });
  }

  const existingDemo = await prisma.user.findUnique({ where: { username: 'hocvien' } });
  if (!existingDemo) {
    const demo = await prisma.user.create({
      data: {
        id: 'demo-user',
        username: 'hocvien',
        passwordHash: bcrypt.hashSync('123456', 10),
        displayName: 'Học viên Demo',
        role: 'USER',
      },
    });
    await prisma.userStreak.create({
      data: { userId: demo.id, currentStreak: 5, lastActiveDate: new Date().toISOString().slice(0, 10) },
    });
    await prisma.userProgress.createMany({
      data: [
        { userId: demo.id, itemType: 'vocab', itemId: 'hsk1-v001', status: 'done', score: 100 },
        { userId: demo.id, itemType: 'vocab', itemId: 'hsk1-v002', status: 'done', score: 95 },
        { userId: demo.id, itemType: 'vocab', itemId: 'hsk1-v003', status: 'in_progress', score: 60 },
        { userId: demo.id, itemType: 'lesson', itemId: 'hsk1-l1', status: 'in_progress', score: 75 },
      ],
    });
  }
}

// Xóa tiến độ trỏ tới nội dung không còn tồn tại (ví dụ các bài HSK 2 tạm thời cũ)
async function pruneOrphanProgress() {
  const [vocabIds, lessonIds, radicalIds, dictIds] = await Promise.all([
    prisma.vocabItem.findMany({ select: { id: true } }),
    prisma.lesson.findMany({ select: { id: true } }),
    prisma.radical.findMany({ select: { id: true } }),
    prisma.dictationVideo.findMany({ select: { id: true } }),
  ]);
  const valid = {
    vocab: new Set(vocabIds.map((x) => x.id)),
    lesson: new Set(lessonIds.map((x) => x.id)),
    radical: new Set(radicalIds.map((x) => x.id)),
    dictation: new Set(dictIds.map((x) => x.id)),
  };
  const rows = await prisma.userProgress.findMany({ select: { id: true, itemType: true, itemId: true } });
  const orphanIds = rows
    .filter((r) => valid[r.itemType] && !valid[r.itemType].has(r.itemId.split(':')[0]))
    .map((r) => r.id);
  if (orphanIds.length) {
    await prisma.userProgress.deleteMany({ where: { id: { in: orphanIds } } });
  }
  return orphanIds.length;
}

async function main() {
  console.log('Đang nạp dữ liệu HiHSK…');
  const counts = await seedContent();
  await seedUsers();
  const pruned = await pruneOrphanProgress();
  const users = await prisma.user.count();

  console.log(`✔ ${levels.length} cấp độ · ${hsk1Lessons.length + hsk2Lessons.length} bài học · ${counts.vocab} từ vựng`);
  console.log(`✔ ${counts.radicals} bộ thủ · ${counts.characters} chữ Hán · ${dictations.length} video chép chính tả`);
  console.log(`✔ ${users} tài khoản ${RESET_USERS ? '(đã tạo lại từ đầu)' : '(giữ nguyên tài khoản cũ)'}${pruned ? ` · dọn ${pruned} tiến độ cũ` : ''}`);
  console.log('Tài khoản mẫu: admin / admin123 · hocvien / 123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
