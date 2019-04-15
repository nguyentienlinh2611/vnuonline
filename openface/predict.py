import openface
import pickle

FILE_MODEL = 'data/generated_embeddings/vnuonline_knn.pkl'

def predict(imgs):
    with openface.TorchNeuralNet(model="models/openface/nn4.small2.v1.t7") as net:
        model = pickle.load(open(FILE_MODEL, 'rb'))
        result = []
        for img in imgs:
            mapping = net.forwardPath(img)
            y_mu = model.predict(mapping)[0]
            result.append(y_mu)
    return result