FROM node:20

RUN apt update && apt install -y less man-db sudo postgresql postgresql-contrib

ARG USERNAME=node
RUN echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

ENV DEVCONTAINER=true

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env /app/.env

ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/challenge?schema=public

RUN service postgresql start && \
    sudo -u postgres psql -c "CREATE DATABASE challenge;" && \
    sudo -u postgres psql -c "CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';" && \
    sudo -u postgres psql -c "ALTER USER postgres WITH SUPERUSER;"

EXPOSE 3000
EXPOSE 5432

CMD service postgresql start && npm run start
