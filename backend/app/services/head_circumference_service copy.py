import torch
import numpy as np
from PIL import Image
import io
import cv2
import traceback
from torchvision import transforms
from app.models.modelCSM import CSM


def load_model():
    try:
        print("Loading model...")
        model_path = '/Users/nourbenammar/Desktop/23-Weeks-main 2/backend/app/models/HeadCircumferenceModel.pth'
        
        # Initialize the model architecture
        model = CSM()  # Replace CSM() with your model's class name

        # Load the state_dict into the model
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        model.load_state_dict(state_dict)

        # Set the model to evaluation mode
        model.eval()
        
        print("Model loaded successfully.")
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        traceback.print_exc()
        raise

def preprocess_image(image_bytes):
    try:
        # Convert bytes to NumPy array
        np_array = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(np_array, cv2.IMREAD_GRAYSCALE)

        if image is None:
            raise ValueError("Image decoding failed")

        # Example preprocessing steps
        desired_size = (256, 256)  # Adjust to your model's expected size
        resized_image = cv2.resize(image, desired_size)

        # Normalize the image
        normalized_image = resized_image / 255.0

        # Convert to PyTorch tensor and add batch and channel dimensions
        processed_image = np.expand_dims(normalized_image, axis=0)  # Add channel dimension
        processed_image = np.expand_dims(processed_image, axis=0)  # Add batch dimension

        # Convert to PyTorch tensor
        processed_image = torch.tensor(processed_image, dtype=torch.float32)

        return processed_image
    except Exception as e:
        print(f"Error during image preprocessing: {str(e)}")
        traceback.print_exc()
        return None

def calculate_circumference_from_mask(mask_image):
    try:
        # Convert tensor to NumPy array
        mask_image = mask_image.detach().cpu().squeeze().numpy()  # Remove batch and channel dimensions
        mask_image = (mask_image * 255).astype(np.uint8)  # Convert back to 8-bit image

        contours, _ = cv2.findContours(mask_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if contours:
            # Compute circumference from contours
            circumference = cv2.arcLength(contours[0], True)
            return circumference
        else:
            raise ValueError("No contours found")
    except Exception as e:
        print(f"Error calculating circumference from mask: {str(e)}")
        traceback.print_exc()
        return None


def generate_mask_and_circumference(model, image_tensor):
    try:
        print("Generating mask and calculating head circumference...")
        with torch.no_grad():
            output = model(image_tensor)
        
        # Assuming the model output is a tensor representing the mask
        mask_image = output[0]  # Handle if the output is a tuple or single tensor

        print(f"Mask image type: {type(mask_image)}, shape: {mask_image.shape}")

        # Further processing for head circumference
        head_circumference = calculate_circumference_from_mask(mask_image)

        return mask_image, head_circumference

    except Exception as e:
        print(f"Error generating mask and circumference: {str(e)}")
        traceback.print_exc()
        raise

def calculate_circumference(image_bytes):
    try:
        # Process image
        processed_image = preprocess_image(image_bytes)
        
        if processed_image is None:
            raise ValueError("Image processing failed")

        # Load model and generate mask
        model = load_model()
        mask_image, circumference = generate_mask_and_circumference(model, processed_image)

        return circumference
    except Exception as e:
        print(f"Error during processing: {str(e)}")
        traceback.print_exc()
        return None
