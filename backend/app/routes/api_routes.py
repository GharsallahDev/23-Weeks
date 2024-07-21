from flask import Blueprint, jsonify, request, current_app, request
import os
import numpy as np
from PIL import Image
import base64
import torch
import pickle
import cv2
import requests

bp = Blueprint('api', __name__)

def load_entity_classification_model():
    model_path = os.path.join(current_app.root_path, 'models', 'entity_classification.pth')
    model = torch.load(model_path, map_location=torch.device('cpu'))
    model.eval()
    return model

def load_head_circumference_model():
    model_path = os.path.join(current_app.root_path, 'models', 'head_circumference_model.pkl')
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    return model

def load_baby_name_generator_model():
    model_path = os.path.join(current_app.root_path, 'models', 'baby_name_generator.pkl')
    model = torch.load(model_path, map_location=torch.device('cpu'))
    model.eval()
    return model

entity_classification_model = load_entity_classification_model()
head_circumference_model = load_head_circumference_model()
baby_name_model = load_baby_name_generator_model()

CLASS_NAMES = ['Fetal brain', 'Fetal thorax', 'Maternal cervix', 'Fetal femur', 'Fetal abdomen']
SUBCLASS_NAMES = {
    'Fetal brain': ['Trans-thalamic', 'Trans-cerebellum', 'Trans-ventricular'],
    'Fetal thorax': ['Four chamber view', 'Three vessel view'],
    'Maternal cervix': ['Transverse view', 'Sagittal view'],
    'Fetal femur': ['Length measurement'],
    'Fetal abdomen': ['Abdominal circumference', 'Stomach and bladder']
}

def preprocess_image_for_classification(image):
    image = image.resize((224, 224))
    image_array = np.array(image).transpose(2, 0, 1) / 255.0
    image_tensor = torch.from_numpy(image_array).float().unsqueeze(0)
    return image_tensor

def preprocess_image_for_head_circumference(image):
    image = image.resize((256, 256))
    image = image.convert('L')
    image_array = np.array(image).reshape(1, -1) / 255.0
    return image_array

@bp.route('/classify-ultrasound', methods=['POST'])
def classify_ultrasound():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    
    try:
        image = Image.open(file.stream).convert('RGB')
        preprocessed_image = preprocess_image_for_classification(image)

        with torch.no_grad():
            predictions = entity_classification_model(preprocessed_image)
        
        main_class_index = torch.argmax(predictions[0]).item()
        
        main_class = CLASS_NAMES[main_class_index]
        
        subclass = np.random.choice(SUBCLASS_NAMES[main_class])
        
        results = {
            "mainClass": main_class,
            "subClass": subclass,
            "accuracy": float(predictions[0][main_class_index]),
            "allClasses": [
                {"name": class_name, "probability": float(prob)}
                for class_name, prob in zip(CLASS_NAMES, predictions[0].tolist())
            ]
        }
        
        return jsonify(results), 200

    except Exception as e:
        current_app.logger.error(f"Error processing image: {str(e)}")
        return jsonify({"error": "An error occurred while processing the image"}), 500

@bp.route('/calculate-circumference', methods=['POST'])
def calculate_circumference():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    
    try:
        image = Image.open(file.stream).convert('RGB')
        preprocessed_image = preprocess_image_for_head_circumference(image)

        circumference = head_circumference_model.predict(preprocessed_image)[0]

        mask = np.zeros((256, 256), dtype=np.uint8)
        cv2.circle(mask, (128, 128), int(circumference / 2), 255, 2)
        
        _, buffer = cv2.imencode('.png', mask)
        mask_base64 = base64.b64encode(buffer).decode('utf-8')

        results = {
            "circumference": float(circumference),
            "maskImage": mask_base64
        }
        
        return jsonify(results), 200

    except Exception as e:
        current_app.logger.error(f"Error processing image: {str(e)}")
        return jsonify({"error": "An error occurred while processing the image"}), 500

@bp.route('/chatbot', methods=['POST'])
def chatbot():
    message = request.json.get('message')
    
    url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2"
    
    payload = {
        "messages": [
            {
                "role": "user",
                "content": message
            }
        ],
        "system_prompt": "You are a prenatal care expert named Dr. Gyno. Provide helpful and accurate information about pregnancy and prenatal care.",
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256,
        "web_access": False
    }
    
    headers = {
        "x-rapidapi-key": "5a9b49fd20mshfcadc134baa4806p1957f4jsn6edb72892bc3",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        chatbot_response = response.json()
        return jsonify({"content": chatbot_response['result']}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route('/generate-baby-names', methods=['POST'])
def generate_baby_names():
    data = request.json
    
    try:
        model_input = [
            data['0'],  # Gender
            data['1'],  # Origin
            data['2'],  # Style
            data['3'],  # Syllables
            data['4'],  # Personality trait
            data['5']   # Nature element
        ]
        
        names = baby_name_model.predict([model_input])[0]
        
        if len(names) > 5:
            names = names[:5]
        while len(names) < 5:
            names.append(f"Name{len(names)+1}")
        
        return jsonify({"names": names.tolist()})
    
    except KeyError as e:
        current_app.logger.error(f"Missing required input: {str(e)}")
        return jsonify({"error": f"Missing required input: {str(e)}"}), 400
    except Exception as e:
        current_app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": "Failed to generate names. Please try again."}), 500