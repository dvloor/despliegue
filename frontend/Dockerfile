# Usar una imagen de Nginx para servir la aplicación Angular
FROM nginx:latest

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos de construcción de Angular
COPY dist/frontend /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80
