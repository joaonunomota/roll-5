Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

git reset --hard
git checkout master
git pull

# npm install
npm run build

Copy-Item ".\_config.yml" -Destination ".\dist"

Set-Location dist

git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:joaonunomota/roll-5 master:gh-pages

Set-Location ..