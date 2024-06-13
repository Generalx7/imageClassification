# import system libs
import os
import time
import shutil
import itertools

# import data handling tools
import cv2
import numpy as np
import pandas as pd
import seaborn as sns

sns.set_style("darkgrid")
import matplotlib.pyplot as plt

# import Deep learning Libraries

# Install the missing tensorflow.keras module
import tensorflow as tf
from tensorflow import keras
from keras.layers import (
    Conv2D,
    MaxPooling2D,
    Flatten,
    Dense,
    Activation,
    Dropout,
    BatchNormalization,
)
from keras.models import Model, load_model, Sequential
from keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from keras.optimizers import Adam, Adamax
from keras import regularizers
from keras.metrics import categorical_crossentropy
import matplotlib.pyplot as plt
from PIL import Image
import seaborn as sns
from keras.utils import to_categorical
from glob import glob

# Ignore Warnings
import warnings

warnings.filterwarnings("ignore")

print("modules loaded")
loaded_model = tf.keras.models.load_model(
    "C:\\Users\\mohamed saleh\\Documents\\vscode_projects\\Node JS\\imageClassification\\model\\SC Classifier.h5", compile=False
)
loaded_model.compile(
    Adamax(learning_rate=0.001), loss="categorical_crossentropy", metrics=["accuracy"]
)
from PIL import Image

img = Image.open(os.getcwd())
if img:
    print("Image loaded successfully.")
else:
    print("Failed to load image.")
img = tf.keras.preprocessing.image.load_img(
    "C:\\Users\\mohamed saleh\\Documents\\vscode_projects\\Node JS\\imageClassification\\model\\ISIC_0024747.jpg"
)
img_array = tf.keras.preprocessing.image.img_to_array(img)
img_array = tf.keras.preprocessing.image.smart_resize(img_array, (28, 28))
img_array = tf.expand_dims(img_array, axis=0)
print(img_array)
import tensorflow as tf
import numpy as np

print(img_array.shape)
print(loaded_model.input_shape)
predictions = loaded_model.predict(img_array)
classes = {
    4: ("nv", " melanocytic nevi"),
    6: ("mel", "melanoma"),
    2: ("bkl", "benign keratosis-like lesions"),
    1: ("bcc", " basal cell carcinoma"),
    5: ("vasc", " pyogenic granulomas and hemorrhage"),
    0: ("akiec", "Actinic keratoses and intraepithelial carcinomae"),
    3: ("df", "dermatofibroma"),
}
from sklearn.preprocessing import LabelEncoder

print(classes)
print(predictions)
print(type(predictions))
print(predictions.shape)
print(predictions[0])
if "classes" not in globals():
    print("`classes` is not defined.")
score = tf.nn.softmax(predictions[0])
print(f"{classes[tf.argmax(score).numpy()]}")
