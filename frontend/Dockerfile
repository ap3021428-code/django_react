FROM node:20-slim

WORKDIR /app

# Copy only package files first (for caching)
COPY package.json package-lock.json ./

# Clean install
RUN npm install

# Copy rest of the code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
