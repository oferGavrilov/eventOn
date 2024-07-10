COMPOSE_FILE=docker-compose.yml

up:
	@docker-compose -f $(COMPOSE_FILE) up -d

down:
	@docker-compose -f $(COMPOSE_FILE) down

build:
	@docker-compose -f $(COMPOSE_FILE) build

restart:
	@docker-compose -f $(COMPOSE_FILE) down
	@docker-compose -f $(COMPOSE_FILE) up -d --build

logs:
	@docker-compose -f $(COMPOSE_FILE) logs -f

clean:
	@docker system prune -f
	@docker volume prune -f

.PHONY: up down build restart logs clean