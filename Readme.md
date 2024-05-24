sudo yum update

sudo yum install git

mkdir app

git clone -b production https://github.com/nmpatel26/2024Acosus.git .

sudo dnf module list nodejs

sudo dnf module enable nodejs:20

sudo dnf install nodejs

node --version

sudo yum install epel-release

sudo yum install nginx

### in case we cant install nginx we work around this by making swapfile

follow steps
-sudo fallocate -l 1G /swapfile
-sudo chmod 600 /swapfile
-sudo mkswap /swapfile
-sudo swapon /swapfile
-echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
-sudo swapon --show
-free -h

Now try again installing nginx

sudo yum install nginx
