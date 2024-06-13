import os
import sys
img_path = sys.argv[1]
import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
model1 = tf.keras.models.load_model(r"C:\Users\Mahmoud Fouad\Desktop\img classifier11\imageClassification\model\SC-MobileNetV2.h5")
img = Image.open(f"{img_path}")
#img = Image.open(r"D:\Downloads\sc\isic Melanocytic.jpg")
from tensorflow.keras.preprocessing.image import img_to_array
image = np.array(img)
resized_image = Image.fromarray(image).resize((64, 64))
resized_img_array = img_to_array(resized_image) / 255.0
predictions = model1.predict(np.expand_dims(resized_img_array, axis=0))
classes = {4: ('mel', ' melanoma'),
           6: ('vasc', 'vascular lesion'),
           2: ('bkl', 'benign keratosis-like lesions'), 
           1: ('bcc' , ' basal cell carcinoma'),
           5: ('nv', 'melanocytic nevi'),
           0: ('akiec', 'Actinic keratoses'),
           3: ('df', 'dermatofibroma')}
predicted_class = classes[np.argmax(predictions)]
predicted_prob = np.max(predictions)
if predicted_prob >= 0.7:
    class_code, class_name = predicted_class
    print(f"{class_code}, {class_name}")
else:
    print("Image classified as unknown skin lesion")
