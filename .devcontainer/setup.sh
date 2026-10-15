#!/usr/bin/env bash
# One-time setup for GitHub Codespaces (see .devcontainer/devcontainer.json).
set -euo pipefail

echo "==> Installing packages"
npm install --no-audit --no-fund

if [ ! -f .env.local ]; then
  echo "==> Creating .env.local with a private login secret"
  node -e "process.stdout.write('JWT_SECRET='+require('crypto').randomBytes(48).toString('hex')+'\n')" > .env.local
fi

fresh=0
[ -f prisma/dev.db ] || fresh=1

echo "==> Syncing the database schema"
npx prisma db push --skip-generate

if [ "$fresh" = 1 ]; then
  echo "==> Loading lessons, radicals and demo accounts"
  npm run db:seed
fi

echo "==> Setup finished. The app starts with: npm run dev"
