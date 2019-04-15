from flask import Flask, request, jsonify
import base64
import json
import os
from predict import predict
from crontab import CronTab

app = Flask(__name__)

if os.path.isdir("data/known/aligned") == False:
    os.mkdir("data/known/aligned")

training_cron = CronTab(user='root')
job = training_cron.new(command='python training.py')
job.hour.on(0)

training_cron.write()

# request body: {faces: ["path to faces, ex: data/unknown/aligned/xxx"]}
@app.route("/recognize", methods=["POST"])
def runRecognite():
	if request.is_json:
		data = request.get_json()
		if type(data) is str:
			data = json.loads(data)
		persons = predict(data["faces"])
	return jsonify(faces=persons)

# request body: {img: "image file name", user: "user id"}
@app.route("/confirm", methods=["POST"])
def runConfirm():
	if request.is_json:
		data = request.get_json()
		if type(data) is str:
			data = json.loads(data)
		if(os.path.isfile('"data/unknown/"+data["img"]')):
			os.rename("data/unknown/"+data["img"],"data/known/"+data["user"]+"/"+data["img"])
		if(os.path.isfile('"data/unknown/aligned/"+data["img"]')):
			os.rename("data/unknown/aligned/" + data["img"], "data/known/aligned/"+data["user"]+"/"+data["img"])
	return jsonify()

if __name__ == "__main__":
    app.run(host="0.0.0.0")
