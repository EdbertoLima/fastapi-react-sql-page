FROM node:lts

# Set working directory
WORKDIR /app

# Install dependencies first (better Docker caching)
COPY package*.json ./
RUN npm ci

# Copy project source
COPY . .

# Environment: development mode
ENV NODE_ENV=development

# Vite default dev port + optional HMR overlay/websocket port
EXPOSE 5173     # Vite dev server
EXPOSE 5174     # Vite HMR (optional)
EXPOSE 8000     # If you proxy your FastAPI though the container
EXPOSE 35729    # Legacy livereload (can be removed)

# Ensure run.sh is executable (important!)
RUN chmod +x /app/run.sh

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
