import cv2
import numpy as np
import streamlit as st
from tensorflow.keras.applications.mobilenet_v2 import (
    MobileNetV2,
    preprocess_input,
    decode_predictions
)
from PIL import Image


def load_model():
    model = MobileNetV2(weights="imagenet")
    return model


def preprocess_image(image):
    # the image is converted into an array of arrays of pixels
    img = np.array(image)
    img = cv2.resize(img, (224, 224))
    img = preprocess_input(img)
    img = np.expand_dims(img, axis=0)
    return img


def classify_image(model, image):
    try:
        processed_image = preprocess_image(image)
        predictions = model.predict(processed_image)
        # top=3 because we want to take the top 3 predictions
        # [0] because the model expects to get multiple images and we're passing just one image and therefore we will get one response
        decoded_predictions = decode_predictions(predictions, top=3)[0]
        return decoded_predictions
    except Exception as e:
        st.error(f"Error classifying image: {str(e)}")
        return None


def main():
    st.set_page_config(page_title="AI Image Classifier", page_icon="🖼️", layout="centered")

    st.title("AI Image Classifier")
    st.write("Upload an image and let AI tell you what is in it!")

    # the way the streamlit works is that any time any state changes,
    # the whole Python script is reran
    # so rather than loading the model over and over again,
    # we cache this so if the model is already loaded,
    # it returns the loaded model and won't load it again
    @st.cache_resource
    def load_cached_model():
        return load_model()

    model = load_cached_model()

    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "png"])

    # displaying the image
    if uploaded_file is not None:
        image = st.image(
            uploaded_file, caption="Uploaded Image", use_container_width=True
        )
        btn = st.button("Classify Image")

        if btn:
            # loading icon
            with st.spinner("Analyzing Image..."):
                image = Image.open(uploaded_file)
                predictions = classify_image(model, image)

                if predictions:
                    st.subheader("Predictions")
                    # _ because we don't use the index variable
                    for _, label, score in predictions:
                        st.write(f"**{label}**: {score:.2%}")


if __name__ == "__main__":
    main()