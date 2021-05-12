npm set registry https://registry.npm.taobao.org
rm -drf node_modules package-lock.json

rm -drf ./node_modules

echo "##### npm install"
npm install

echo "##### npm build"
npm run build
