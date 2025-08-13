# STAGE 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This gets the backend API URL from Coolify during the build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# STAGE 2: Serve the built application using the Nginx web server
FROM nginx:stable-alpine
# Copy the final built files from Stage 1 into the web server's public folder
COPY --from=build /app/build /usr/share/nginx/html
# Tell the world that the container is listening on port 80
EXPOSE 80
# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]