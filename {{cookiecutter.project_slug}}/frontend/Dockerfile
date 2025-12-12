FROM node:lts

# Set working directory
WORKDIR /app

# Install dependencies first (better Docker caching)
COPY package*.json ./
RUN npm install

# Copy project source
COPY . .

# Environment: development mode
ENV NODE_ENV=development

# Vite dev server port
EXPOSE 5173

# Ensure run.sh is executable (important!)
RUN chmod +x /app/run.sh

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
