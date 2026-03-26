FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile || pnpm install
COPY frontend/ ./
RUN pnpm build

FROM eclipse-temurin:21-jdk AS backend-build
WORKDIR /app/backend
COPY backend/ ./
# Copy compiled frontend into Spring static resources for same-domain hosting
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN chmod +x mvnw && ./mvnw -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
