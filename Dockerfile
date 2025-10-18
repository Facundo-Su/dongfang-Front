# Stage 1: construir la app
FROM node:20 AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Construir los archivos estáticos
RUN npm run build

# Stage 2: servir con nginx
FROM nginx:alpine

# Copiar archivos build a nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración opcional de nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto que Render asigna
ENV PORT=8080
EXPOSE $PORT

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
