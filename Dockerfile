# Usar una imagen de Node.js
FROM node:20.13.1

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos del backend
COPY package*.json ./
COPY dist ./dist

# Instalar las dependencias
RUN npm install --production

# Exponer el puerto
EXPOSE 3000

# Ejecutar la aplicación
CMD ["node", "dist/index.js"]
