# Battleship

## Installation
Docker, Docker Compose and Make are required to install the project.

To create .env files run the command:
```
make env
```

To start the project:
```
make start
```

To install all needed dependencies:
```
make install
```

At first you need to run the server:
```
make server-start
```

Then you may run the application:
```
make app-dev
```

To stop the project:
```
make stop
```

To connect to the application using sh:
```
make app-ssh
```

To connect to the server using sh:
```
make server-ssh
```

## Run using a local network

1. Get ip-address of your machine
2. Update the `VITE_SERVER_DOMAIN` variable with the ip-address in the `app/.env` file
3. Update the `DOMAIN` variable with the ip-address in the `server/.env` file
4. Run the server and the application to pull changes from the `.env`
5. Expose ports (`3000` and `3001`) from your machine
6. Connect all needed devices to the same network (e.g. you home Wi-Fi network)
7. Create a new session on laptop and scan QR-codes using your phones
8. Have fun!

## Run using WSL2

1. Run `PowerShell` as Administrator
2. Run this command to expose WSL2 to the local network

```sh
netsh interface portproxy add v4tov4 listenport=3001 listenaddress=0.0.0.0 connectport=3001 connectaddress=$($(wsl hostname -I).Trim());
```

3. Setup Firewall:

- Network and Sharing Centre
- Windows Defender Firewall
- Advanced settings
- Inbound Rules
- New Rule
- Port
- TCP
- Specific local ports: 3000-3001
- Allow the connection
- Domain/Private/Public
- WSL2 3000-3001
