# Kain2

### OS Setup
```
sudo apt update
sudo apt install nginx git
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default
cd $HOME
git clone https://bitbucket.org/martincastro/loancalculator
```

### Django Setup
```
apt install python3 python3-virtualenv python3-pip uwsgi
apt-get install libmysqlclient-dev
apt-get install build-essential libssl-dev libffi-dev python3-dev
apt-get install uwsgi-plugin-python3
apt-get install mariadb-server

cd $HOME/loancalculator/app/

virtualenv -p python3 .ve
source .ve/bin/activate
pip3 install -r requirements.txt
cp ./loancalculator/settings/template.py ./loancalculator/settings/locals.py
vi ./loancalculator/settings/locals.py

sudo echo "
server {
  listen 7004 ssl;
  listen [::]:7004 default_server ipv6only=on;
  server_name loancalculatorapp.phi.com;
  client_max_body_size 2m;
  ssl on;
  ssl_certificate /home/ubuntu/loancalculator/ssl/loancalculator.cert;
  ssl_certificate_key /home/ubuntu/loancalculator/ssl/loancalculator.key;
  location / {
    include uwsgi_params;
    uwsgi_read_timeout 1300;
    uwsgi_pass unix:/tmp/loancalculator.sock;
  }
  location /static {
    alias /home/ubuntu/loancalculator/app/loancalculator/static/;
  }
  location /media {
    alias /home/ubuntu/loancalculator/app/loancalculator/media/;
  }
}
" > /etc/nginx/sites-available/loancalculatorapp

sudo echo "
[uwsgi]
vhost = true
plugins = python3
socket = /tmp/loancalculator.sock
venv = /home/ubuntu/loancalculator/app/.ve
chdir = /home/ubuntu/loancalculator/app/
wsgi-file = /home/ubuntu/loancalculator/app/loancalculator/wsgi.py
callable = application
" > /etc/uwsgi/apps-available/loancalculatorapp.ini

sudo ln -sf /etc/nginx/sites-available/loancalculatorapp /etc/nginx/sites-enabled
sudo ln -sf /etc/uwsgi/apps-available/loancalculatorapp.ini /etc/uwsgi/apps-enabled

python3 manage.py migrate
python3 manage.py collectstatic

sudo service nginx restart
sudo service uwsgi restart
```

### Ionic Setup
```
cd $HOME/loancalculator/web/
sudo echo "
server {
  listen 7005 ssl;
  listen [::]:7005 default_server ipv6only=on;
  server_name loancalculatorweb.phi.com;
  client_max_body_size 2m;
  ssl on;
  ssl_certificate /home/ubuntu/loancalculator/ssl/loancalculator.cert;
  ssl_certificate_key /home/ubuntu/loancalculator/ssl/loancalculator.key;
  root /home/ubuntu/loancalculator/web/www/;
  index index.html;
}
" > /etc/nginx/sites-available/loancalculatorweb
sudo ln -sf /etc/nginx/sites-available/loancalculatorweb /etc/nginx/sites-enabled/
```

### Logs.
```
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/uwsgi/app/loancalculatorapp.log
```
