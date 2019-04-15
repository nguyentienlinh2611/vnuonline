import openface
from sklearn.neighbors import KNeighborsClassifier
import pickle

FILE_MODEL = 'data/generated_embeddings/vnuonline_knn.pkl'

X = []
y = []
with openface.TorchNeuralNet(model="models/openface/nn4.small2.v1.t7") as net:
    knownImgs = openface.data.iterImgs("data/known/aligned")
    for img in knownImgs:
        mapping = net.forwardPath(img.path)
        X.append(mapping)
        y.append(img.cls)
    model = KNeighborsClassifier(n_neighbors=1)
    model.fit(X, y)
    pickle.dump(model, open(FILE_MODEL, 'wb'))
