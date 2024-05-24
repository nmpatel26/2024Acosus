from flask import Flask, request, jsonify, Response, make_response
from flask_cors import CORS
import pandas as pd
import json
import numpy as np
import os
from flask import Flask, request, jsonify
import pandas as pandas
from pickle import dump,load
from sklearn.feature_selection import SequentialFeatureSelector
from sklearn.preprocessing import StandardScaler
from keras.models import load_model
from tensorflow import keras
# from keras.models import Model
# from keras.layers import Dense
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, ReLU
from tensorflow.keras.layers import Dense,Activation,Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from datetime import datetime
from pymongo import MongoClient
import numpy as np
from tensorflow.keras.losses import MeanSquaredError

from tensorflow.keras.models import load_model
# from tensorflow.keras.layers import ReLU
from tensorflow.keras.metrics import MeanSquaredError

app = Flask(__name__)
CORS(app)


current_model = None

@app.route('/set_model', methods=['GET'])
def set_model():
    print("set model...........")
    global current_model
    model_name = request.args.get('model_name')
    if model_name:
        current_model = model_name
        print(current_model + "...............................")
        return make_response("", 200)
    else:
        return make_response("", 400)

@app.route('/get_current-model', methods=['GET'])
def get_current_model():
    global current_model
    return current_model

# Custom metric
# @keras.saving.register_keras_serializable()
# def mse(y_true, y_pred):
#    return MeanSquaredError()(y_true, y_pred)

def transform_data(data):
    data_df=data
    numerical_cols=[]
    string_cols=[]
    for cols in data_df.columns:
        val=(data_df[cols][0])
        if str(val).replace(".","").isdigit():
            numerical_cols.append(cols)
        else:
            string_cols.append(cols)
    global transformed_data 
    print("Numerical Columns",numerical_cols,"\tString columns",string_cols)
    unique_jobs=[]
    major_data=pd.read_excel('Model/majors_and_jobs.xlsx')
    major_data=pd.DataFrame(major_data)
    StudentExposure={'Project':5,'Paper':4,'Extra-classes':3,'Conference':2}
    index=0
    transform=[]
    for course in data_df['Course']:
        if str(data_df['career'][index]).lower() in str(list(major_data['Job Categories'].loc[major_data['IT Major']==course])).lower():
            transform.append(1)
        else:
            transform.append(0)
        index+=1
    transformed_data['Career_Similarity']=transform
    transformed_data['experience']=[StudentExposure[values] for values in data_df['experience']]
    transformed_data['proximity']=[0 if int(values)>30 or str(values).lower!='online' else 1 for values in data_df['proximity']]
    encoding_cols=['familyGuide','income']
    for col in encoding_cols:
        encoded=pd.get_dummies(data_df[col],prefix=col)
        transformed_data=(pd.concat([transformed_data,encoded],axis=1,ignore_index=False))
    #To append only needed columns
    numerical_cols.remove('proximity')
    rem_columns=numerical_cols
    transformed_data=pd.concat([transformed_data,data_df[rem_columns]],axis=1)
    print(transformed_data)
def scaling_data(action):
    action=action
    Min_max_scale = load(open('Model/scale.pkl','rb'))
    # Obtain the columns expected by the scaler
    data_order = Min_max_scale.feature_names_in_
#     data_order=pandas.DataFrame(columns=['gpa', 'credits', 'satScore', 'course',
#    'interest', 'experience', 'personalityScore',
#    'proximity', 'Career_Similarity', 'familyGuide_No',
#    'familyGuide_Yes', 'Financial_Status_No',
#    'Financial_Status_Yes'])
    global transformed_data
    missing_cols = set( data_order) - set( transformed_data.columns )
    for c in missing_cols:
        transformed_data[c] = 0

    # Ensure the order of column in the test set is in the same order than in train set'''
    if str(action).lower()=='predict':
        transformed_data=transformed_data[data_order]
        prediction_set=Min_max_scale.transform(transformed_data)
        return(prediction_set)
    elif str(action).lower()=='train':
        x=transformed_data[data_order]
        y=transformed_data['Success_Rate']
        x=Min_max_scale.transform(x)
        return(x,y)

@app.route('/model/predict', methods=['POST'])
def predict():
    action='predict'

    print("predict function............")
    data = request.data
    # Decode JSON data and load into a dictionary
    # data = json.loads(request_data.decode('utf-8'))
    str_data = data.decode('utf-8')
    data = json.loads(str_data)

    data_df=pd.DataFrame()

    #changed.......
    # Create DataFrame from the dictionary, transposing to match expected structure
    data_df = pd.DataFrame.from_dict(data, orient='index').transpose()
    data_df['Course'] = ["Information Systems"]
    # for i in data:
    #     data_df[i] = [data[i]]
    #testing....
    # data_df['GPA'] = [data['gpa']]
    # data_df['Credit_Completion'] = [data['credits']]
    # data_df['SAT'] = [data['satScore']]
    # data_df['Course_Similarity'] = [data['course']]
    # data_df['Career'] = [data['career']]
    # data_df['Course'] = ["Information Systems"]
    # data_df['Student_Interest'] = [data['interest']]
    # data_df['Student_Exposure'] = [data['experience']]
    # data_df['Family_Contribution'] = [data['familyGuide']]
    # data_df['PersonalityTraits_Scores'] = [data['personalityScore']]

    print(data)
    # data = request.data
    # data_df=pandas.DataFrame([data])
    print(data_df)
    # Process the data or perform any backend tasks
    # Process the data or perform any backend tasks
    global transformed_data
    transformed_data=pandas.DataFrame()
    transform_data(data_df)
    predict_data=scaling_data(action)
    #@tf.keras.utils.register_keras_serializable()
    #custom_objects = {
      #  'ReLU': ReLU,
     #   #'mse': mse
    #}
    #model = load_model('finalized_model.h5', custom_objects=custom_objects)
    # model= load_model('finalized_model.h5')
    model = load_model('neural_network2024-05-24.h5', custom_objects={"ReLU": ReLU})

    predicted=model.predict(predict_data)

    predicted_list = round(predicted[0][0],2).tolist()
    predicted_json = json.dumps(predicted_list)
    print(predicted_list)
    print(f"----------------{predicted}, {type(predicted)}--------------------")
    print(f"------------------{predicted_json}, {type(predicted_json)}")

    return (predicted_json)

@app.route('/trainNeural', methods=['POST','GET'])
def trainNeural():
    action='train'
    url='mongodb+srv://nobita9699:xgFi1COLriKTuji7@cluster0.uh0srwc.mongodb.net/?retryWrites=true&w=majority'
    client=MongoClient(url)
    db=client['test']
    collection=db['NewData']
    records=(collection.find())
    data_df=pandas.DataFrame()
    for record in collection.find():
        data_df=data_df._append(record,ignore_index=True)
    global transformed_data
    transformed_data=pandas.DataFrame()
    transform_data(data_df)
    x,y=scaling_data(action)
    traindata_x,testdata_x,traindata_y,testdata_y=train_test_split(x,y,test_size=0.2)
    print(f"traindata_x: {traindata_x}")
    print(f"traindata_y: {traindata_y}")
    # print(traindata_x.describe())  # Summarize data to check for any anomalies
    # print(traindata_y.describe())
    # print("NaNs in traindata_x:", traindata_x.isna().sum().sum())
    # print("NaNs in traindata_y:", traindata_y.isna().sum())
    # print("Infs in traindata_x:", np.isinf(traindata_x).sum().sum())
    # print("Infs in traindata_y:", np.isinf(traindata_y).sum())

    # print(testdata_y)
    model=Sequential([Dense(50, input_shape=(13,),activation='relu'),
                 Dropout(0.1),
                 Dense(50,activation='relu'),
                 Dropout(0.1),
                 Dense(50,activation='relu'),
                 Dropout(0.1),
                 Dense(50,activation='relu'),
                 Dropout(0.1),
                 Dense(50,activation='relu'),
                 Dropout(0.1),
                 Dense(50,activation='relu'),
                 Dropout(0.1),
                 Dense(1,activation='linear')])
    model.compile(optimizer='adam',loss='mean_squared_error' ,metrics=['mean_squared_error'])
    model.summary()
    model_fit=model.fit(x=traindata_x,y=traindata_y,epochs=20,verbose=2)
    model_validate=model.predict(testdata_x)
    mae=mean_absolute_error(testdata_y,model_validate)
    # mse=mean_squared_error(testdata_y,model_validate)

    #edited........
    mse_metric = MeanSquaredError()
    mse_metric.update_state(testdata_y, model_validate)
    mse = mse_metric.result().numpy() 
    r2_sc=r2_score(testdata_y,model_validate)
    current_date=datetime.now().date()
    model.save(f'neural_network{current_date}.h5')
    data_to_send = {
    'absolute': mae.tolist(),  # Convert NumPy array to a Python list
    'squared': [float(mse)],
    'r2': r2_sc.tolist()
    }
    return json.dumps(data_to_send)
    
    

if __name__ == '__main__':
    print("Python file started...............")
    app.run(host='0.0.0.0', port=5001, debug=True) 

