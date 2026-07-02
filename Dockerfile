FROM node:20-alpine AS builder

# Enable pnpm
RUN corepack enable pnpm

WORKDIR /app

# Copy monorepo configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json vite.config.ts .npmrc ./

# Copy source code and packages
COPY src ./src
COPY packages ./packages
COPY demo ./demo

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the root library and the showcase
RUN pnpm run build
RUN pnpm --filter showcase build

# Production server stage
FROM nginx:alpine

# Copy the statically built showcase to Nginx's serve directory
COPY --from=builder /app/packages/showcase/out /usr/share/nginx/html

# Provide a simple nginx configuration if needed, or rely on default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
