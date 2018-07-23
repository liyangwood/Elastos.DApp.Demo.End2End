## Set CORS for ditto-server
* open ./data/ditto/config/domains.config.php
* add *"header('Access-Control-Allow-Origin: *');"* in bottom

## Set CORS for ipfs
* open ./data/ipfs/config
* add the following lines behind *HTTPHeaders*
```
"Access-Control-Allow-Credentials": ["true"],
"Access-Control-Allow-Origin": ["*"],
```