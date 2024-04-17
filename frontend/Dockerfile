# Using Node.js version 20
FROM node:20

# Disable Next.js telemetry for privacy
ENV NEXT_TELEMETRY_DISABLED 1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files (assuming you have a yarn.lock)
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install

# Copy the rest of your application code
COPY . .

# The port your app will run on, adjust if different
EXPOSE 3000

# Command to run your application
CMD ["yarn", "dev"]
