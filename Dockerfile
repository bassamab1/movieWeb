FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# IMPORTANT STEP (fix your error)
RUN npx prisma generate

CMD ["npm", "run", "dev"]