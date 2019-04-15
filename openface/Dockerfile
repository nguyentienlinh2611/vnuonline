FROM bamos/openface
MAINTAINER nguyentienlinh2611

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && pip3 install --upgrade pip \
  && pip3 install --ignore-installed six \
  && pip install --upgrade pip 

COPY requirements-python2.txt /root/openface
COPY requirements-python3.txt /root/openface
WORKDIR /root/openface

RUN pip install -r requirements-python2.txt \
  && pip3 install -r requirements-python3.txt

COPY . /root/openface

CMD python2 recognize_server.py & python3 detection_server.py
