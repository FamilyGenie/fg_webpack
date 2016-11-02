cd familygenie-angular
npm run build
cd ..
rm -r familygenie-angserver/public/*
cp -r familygenie-angular/dist/* familygenie-angserver/public/
cp -r familygenie-angular/assets/* familygenie-angserver/public/assets