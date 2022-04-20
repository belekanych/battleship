# Battleship

# Run using WSL2
1. Run `PowerShell` as Administrator
2. Run this command to expose WSL2 to the local network
```sh
netsh interface portproxy add v4tov4 listenport=19000 listenaddress=0.0.0.0 connectport=3000 connectaddress=$($(wsl hostname -I).Trim());
```
