// prisma/data/emoji-image.js
// Tạo ảnh minh họa cục bộ (SVG data URI) từ emoji — chạy offline 100%,
// không phụ thuộc Unsplash. Nền tối theo phong cách sân vận động ban đêm.

function emojiImage(emoji) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">` +
    `<defs>` +
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#18223d"/><stop offset="1" stop-color="#0d1528"/>` +
    `</linearGradient>` +
    `<pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">` +
    `<rect width="28" height="28" fill="none"/><rect width="2" height="28" fill="#ffffff" fill-opacity="0.035"/>` +
    `</pattern>` +
    `</defs>` +
    `<rect width="400" height="300" fill="url(#g)"/>` +
    `<rect width="400" height="300" fill="url(#p)"/>` +
    `<rect x="0" y="292" width="400" height="8" fill="#ff6a1a"/>` +
    `<text x="200" y="158" font-size="132" text-anchor="middle" dominant-baseline="central" ` +
    `font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif">${emoji}</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

module.exports = { emojiImage };
