FROM ubuntu:focal 

RUN apt-get update
RUN apt-get install -y curl
# npm install 
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN apt-get install git -y

RUN mkdir -p home/app/output

COPY index.js /home/app/index.js
COPY package*.json /home/app

RUN cd /home/app && npm install

EXPOSE 80




ENTRYPOINT [ "node","/home/app/index.js" ]
