import argparse
import cv2
import numpy as np
import dlib
from imutils.face_utils import FaceAligner

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('inputImg', type=str, help="Input image path.")
    parser.add_argument('alignImg', type=str, help="Align image path.")
    args = parser.parse_args()
    detector = dlib.get_frontal_face_detector()
    rgbImg = cv2.imread(args.inputImg)
    fa = FaceAligner("models/dlib/shape_predictor_68_face_landmarks.dat", desiredFaceWidth=96)
    grayImg = cv2.cvtColor(rgbImg, cv2.COLOR_BGR2GRAY)
    rects = detector(grayImg, 0)
    alignedImg = fa.align(rgbImg,grayImg,rects[0])
    cv2.imwrite(args.alignImg, alignedImg, [int(cv2.IMWRITE_JPEG_QUALITY), 100])
