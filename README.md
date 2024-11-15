# install
- primer paso : crear las variables de entorno 
```bash
cp .env.sample .env
```
- segundo paso : instalar node_modules
```bash
npm install
```
- ejecutar modo desarrollo
```bash
npm run dev || nodemon "src/index.js"
```
- ejecutar modo prod
```bash
npm run start
```