# Run these commands locally from the repository root.
npm run lint
npm run build
git status --short
git add .
git diff --cached --check
git commit -m "Replace text arrows with shared icon"
git pull --rebase origin main
git push origin main

# Deploy after the push completes.
# Replace the VPS connection details and repository path before running.
ssh YOUR_VPS_USER@YOUR_VPS_IP "cd /path/to/landing-page && git pull --ff-only origin main && docker compose up -d --build && docker compose ps"
