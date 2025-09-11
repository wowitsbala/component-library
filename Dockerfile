# Use Node.js 20 as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy Lerna configuration files
COPY lerna.json ./

# Copy the entire packages directory (for monorepo)
COPY packages ./packages

# Install dependencies
RUN npm install

# Install Lerna globally
RUN npm install -g lerna

# Bootstrap the monorepo with Lerna
RUN npx lerna bootstrap

# Build the component library
RUN npm run build

# Expose port for Storybook (default is 6006)
EXPOSE 6006

# Command to run Storybook
CMD ["npm", "run", "storybook"]