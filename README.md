# NCHC Covid-19 to MongoDB


## Prerequisite 

1. need [MongoDB v5.0.0](https://docs.mongodb.com/v5.0/release-notes/5.0/)
2. nodejs 
```bash=
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Installation

```
git clone https://github.com/twcc/MongoDBxNCHCxTWS
cd MongoDBxNCHCxTWS
npm install
```

## Fetch Data from Covid19.NCHC

```
bash script/get_data.sh
```


## Limitation
- This service using Security Group to protect MongoDB, you need to enable ["authorization"](https://docs.mongodb.com/manual/core/authentication/) according to MongoDB. I suggest you take [M150: Authentication & Authorization](https://university.mongodb.com/mercury/M150/2021_July_13) for best practices. 