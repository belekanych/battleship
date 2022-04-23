# Battleship

## Run using WSL2
1. Run `PowerShell` as Administrator
2. Run this command to expose WSL2 to the local network
```sh
netsh interface portproxy add v4tov4 listenport=19000 listenaddress=0.0.0.0 connectport=3000 connectaddress=$($(wsl hostname -I).Trim());
```
3. Setup Firewall:
  * Network and Sharing Centre
  * Windows Defender Firewall
  * Advanced settings
  * Inbound Rules
  * New Rule
  * Port
  * TCP
  * Specific local ports: 3000-3001
  * Allow the connection
  * Domain/Private/Public
  * WSL2 3000-3001
