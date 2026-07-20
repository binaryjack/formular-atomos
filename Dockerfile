FROM node:20-alpine AS builder

# Enable pnpm
RUN corepack enable pnpm

WORKDIR /app

# Copy monorepo configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json vite.config.ts .npmrc* ./

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
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone build output
COPY --from=builder /app/packages/showcase/.next/standalone ./
COPY --from=builder /app/packages/showcase/.next/static ./packages/showcase/.next/static
COPY --from=builder /app/packages/showcase/public ./packages/showcase/public

EXPOSE 3000

# Run Next.js standalone server
CMD ["packages/showcase/server.js"]
