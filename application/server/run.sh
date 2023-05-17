docker system prune -a -f
docker compose down --rmi all
docker compose up -d