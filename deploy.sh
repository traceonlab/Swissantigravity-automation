#!/data/data/com.termux/files/usr/bin/sh
pkg install -y git
git config --global user.name "traceonlab"
git config --global user.email "traceonlab@gmail.com"

cd ~/automation-bot
git init 2>/dev/null
git add .
git commit -m "🚀 المرحلة 1" 2>/dev/null || echo "لا تغييرات جديدة"
git branch -M main 2>/dev/null
git remote add origin https://github.com/traceonlab/swissgravity-automation.git 2>/dev/null || true
git push -u origin main
