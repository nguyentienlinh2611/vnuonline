from mtcnn.mtcnn import MTCNN
import cv2
from flask import Flask, request, jsonify
import json
import numpy as np
import os
import subprocess

app = Flask(__name__)
detector = MTCNN()

if os.path.isdir("data/detection") == False:
    os.mkdir("data/detection")

# request body {images: [path: "path_to_image", filename: "image filename not contain extension"], aligned: "path to face aligned folder", folder: "path to face folder"}
@app.route("/detection", methods=["POST"])
def detection():
    if request.is_json:
        data = request.get_json()
        result = []
        if os.path.isdir(data["aligned"]) == False:
            os.mkdir(data["aligned"])
        if data["images"]:
            imgFile = data['images']
            image = cv2.imread(imgFile['path'])
            img_cp = image.copy()
            detection_result = detector.detect_faces(image)
            count = 0
            height, width, channels = image.shape
            faces_in_img = []
            for person in detection_result:
                bounding_box = person['box']
                if((bounding_box[2] >= 40) & (bounding_box[3] >= 40)):
                    top = (bounding_box[1]-15) if ((bounding_box[1]-15) > 0) else 0
                    left = (bounding_box[0]-15) if ((bounding_box[0]-15) > 0) else 0
                    right = (bounding_box[0]+bounding_box[2]+15) if ((bounding_box[0]+bounding_box[2]+15) < width) else width
                    bot = (bounding_box[1] + bounding_box[3]+15) if ((bounding_box[1] + bounding_box[3]+15) < height) else height
                    face = image[top:bot, left:right]
                    # aligned_img_filename = data['aligned'] + '/' + imgFile.get('filename')+"_"+str(count)+".jpg"
                    img_filename = data['folder'] + '/' + imgFile.get('filename')+"_"+str(count)+".jpg"
                    # subprocess.run(["python2", "align.py", img_filename, aligned_img_filename])
                    cv2.imwrite(img_filename, face, [int(cv2.IMWRITE_JPEG_QUALITY), 100])
                    cv2.rectangle(img_cp, (bounding_box[0], bounding_box[1]), (bounding_box[0]+bounding_box[2], bounding_box[1] + bounding_box[3]), (255, 255, 255), 5)
                    faces_in_img.append({"face": img_filename})
                    count += 1
            cv2.imwrite("data/detection/"+imgFile.get('filename')+"_detected.jpg", img_cp, [int(cv2.IMWRITE_JPEG_QUALITY), 100])
            result.append({"image_detected": "data/detection/" + imgFile.get('filename')+"_detected.jpg", "faces": faces_in_img})
    return jsonify(result=result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9000)
