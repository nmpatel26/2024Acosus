from flask import Flask, request, jsonify, Response, make_response
from flask_cors import CORS
import pandas as pd
import json
import numpy as np
import os
from flask import Flask, request, jsonify
import pandas as pandas
from pickle import dump,load
from sklearn.preprocessing import StandardScaler
from keras.models import load_model
from sklearn.preprocessing import StandardScaler
from keras.models import load_model
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Activation,Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from datetime import datetime
from pymongo import MongoClient
import numpy as np


app = Flask(__name__)
CORS(app)


current_model = None

def transform_data(data):
    data_df=data
    numerical_cols=[]
    string_cols=[]
    for cols in data_df.columns:
        val=(data_df[cols][0])
        if type(val)==np.int64 or type(val)==np.float64:
            numerical_cols.append(cols)
        else:
            string_cols.append(cols)
    global transformed_data 
    print("Numerical Columns",numerical_cols,"\tString columns",string_cols)
    unique_jobs=[]
    major_data=pd.read_excel('majors and jobs.xlsx')
    major_data=pd.DataFrame(major_data)
    StudentExposure={'Project':5,'Paper':4,'Extra-classes':3,'Conference':2}
    index=0
    transform=[]
    for course in data_df['Course']:
        if data_df['Career'][index] in str(list(major_data['Job Categories'].loc[major_data['IT Major']==course])):
            transform.append(1)
        else:
            transform.append(0)
        index+=1
    transformed_data['Career_Similarity']=transform
    transformed_data['Student_Exposure']=[StudentExposure[values] for values in data_df['Student_Exposure']]
    transformed_data['Accessibility']=[0 if int(values)>30 or str(values).lower!='online' else 1 for values in data_df['Accessibility']]
    encoding_cols=['Family_Contribution','Financial_Status']
    for col in encoding_cols:
        encoded=pd.get_dummies(data_df[col],prefix=col)
        transformed_data=(pd.concat([transformed_data,encoded],axis=1,ignore_index=False))
    #To append only needed columns
    numerical_cols.remove('Accessibility')
    rem_columns=numerical_cols
    transformed_data=pd.concat([transformed_data,data_df[rem_columns]],axis=1)
def scaling_data(action):
    action=action
    Min_max_scale = load(open('scale.pkl','rb'))
    data_order=pandas.DataFrame(columns=['GPA', 'Credit_Completion', 'SAT', 'Course_Similarity',
   'Student_Interest', 'Student_Exposure', 'PersonalityTraits_Scores',
   'Accessibility', 'Career_Similarity', 'Family_Contribution_No',
   'Family_Contribution_Yes', 'Financial_Status_No',
   'Financial_Status_Yes'])
    global transformed_data
    missing_cols = set( data_order) - set( transformed_data.columns )
    for c in missing_cols:
        transformed_data[c] = 0
    # Ensure the order of column in the test set is in the same order than in train set'''
    if str(action).lower()=='predict':
        transformed_data=transformed_data[data_order.columns]
        prediction_set=Min_max_scale.transform(transformed_data)
        return(prediction_set)
    elif str(action).lower()=='train':
        x=transformed_data[data_order.columns]
        y=transformed_data['Success_Rate']
        x=Min_max_scale.transform(x)
        return(x,y)

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
        data_df=data_df.append(record,ignore_index=True)
    transformed_data=pandas.DataFrame()
    transform_data(data_df)
    x,y=scaling_data(action)
    traindata_x,testdata_x,traindata_y,testdata_y=train_test_split(x,y,test_size=0.2)
    print(traindata_y,testdata_y)
    model=Sequential([Dense(50, input_shape=(13,),activation='ReLU'),
                 Dropout(0.1),
                 Dense(50,activation='ReLU'),
                 Dropout(0.1),
                 Dense(50,activation='ReLU'),
                 Dropout(0.1),
                 Dense(50,activation='ReLU'),
                 Dropout(0.1),
                 Dense(50,activation='ReLU'),
                 Dropout(0.1),
                 Dense(50,activation='ReLU'),
                 Dropout(0.1),
                 Dense(1,activation='ReLU')])
    model.compile(optimizer='adam',loss='mse',metrics=['accuracy'])
    model.summary()
    model_fit=model.fit(x=traindata_x,y=traindata_y,epochs=20,verbose=2)
    model_validate=model.predict(testdata_x)
    mae=mean_absolute_error(testdata_y,model_validate)
    mse=mean_squared_error(testdata_y,model_validate)
    r2_sc=r2_score(testdata_y,model_validate)
    current_date=datetime.now().date()
    model.save(f'neural_network{current_date}.h5')

    data_to_send = {
    'absolute': mae.tolist(),  # Convert NumPy array to a Python list
    'squared': mse.tolist(),
    'r2': r2_sc.tolist()
}
    return json.dumps(data_to_send)
    
@app.route('/model/predict', methods=['POST'])
def predict():
    print("predict function............")
    data1 = request.data
    str_data = data1.decode('utf-8')
    data = json.loads(str_data)

    data_df=pd.DataFrame()
    data_df['GPA'] = [data['gpa']]
    data_df['Credit_Completion'] = [data['credits']]
    data_df['SAT'] = [data['satScore']]
    data_df['Course_Similarity'] = [data['course']]
    data_df['Career'] = [data['career']]
    data_df['Course'] = ['information system']
    data_df['Student_Interest'] = [data['interest']]
    data_df['Student_Exposure'] = [data['experience']]
    data_df['Family_Contribution'] = [data['familyGuide']]
    data_df['PersonalityTraits_Scores'] = [data['personalityScore']]
    data_df['Accessibility'] = [data['proximity']]
    data_df['Financial_Status'] = [data['income']]
    

    # Process the data or perform any backend tasks
 # Process the data or perform any backend tasks
    from sklearn.preprocessing import StandardScaler
    from keras.models import load_model
    global current_model
    model_used = current_model
    print(model_used)
    if model_used is None:
        model_used = "best_model.h5"
    model_name = 'Model/' + model_used
    print(model_name)
    model= load_model(model_used)
    transformed_data=pd.DataFrame()
    unique_jobs=[]
    major_data=pd.read_excel('majors and jobs.xlsx')
    major_data=pd.DataFrame(major_data)
    unique_jobs=[]
    StudentExposure={'Project':5,'Paper':4,'Extra-classes':3,'Conference':2}
    for jobs in major_data['Job Categories']:
        for job in jobs.split(','):
            unique_jobs.append(str(job).strip())
    unique_jobs=list(set(unique_jobs))   
 
    def transform_course():
        index=0
        transform=[]
        for course in data_df['Course']:
            if data_df['Career'][index] in str(list(major_data['Job Categories'].loc[major_data['IT Major']==course])):
                transform.append(1)
            else:
                transform.append(0)
            index+=1
        transformed_data['Career_Similarity']=transform
    def transform_stdexposure():
        transformed_data['Student_Exposure']=[StudentExposure[values] for values in data_df['Student_Exposure']]
    def transform_accessibility():
        transformed_data['Accessibility']=[0 if int(values)>30 else 1 for values in data_df['Accessibility']]
    def encode(col):
        encoded=pd.get_dummies(data_df[col],prefix=col)
        return(pd.concat([transformed_data,encoded],axis=1,ignore_index=False))
    transform_course()
    transform_accessibility()
    transform_stdexposure()
    transformed_data=encode('Family_Contribution')
    transformed_data=encode('Financial_Status')
    rem_columns=['GPA','Credit_Completion','SAT','Course_Similarity','Student_Interest','PersonalityTraits_Scores']
    transformed_data=pd.concat([transformed_data,data_df[rem_columns]],axis=1)
    train_data_cols=pd.DataFrame(columns=['GPA', 'Credit_Completion', 'SAT', 'Course_Similarity',
       'Student_Interest', 'Student_Exposure', 'PersonalityTraits_Scores',
       'Accessibility', 'Career_Similarity', 'Family_Contribution_No',
       'Family_Contribution_Yes', 'Financial_Status_No',
       'Financial_Status_Yes'])
    #print(transformed_data)
    missing_cols = set( train_data_cols) - set( transformed_data.columns )
    #print(missing_cols)
    for c in missing_cols:
        transformed_data[c] = 0
        
    # print(transformed_data.columns)
    
    # Ensure the order of column in the test set is in the same order than in train set
    scale = StandardScaler()
    test_data=scale.fit_transform(transformed_data)
    print(test_data)
    
    predicted=model.predict(test_data)
    predicted_list = predicted.tolist()
    predicted_json = json.dumps(predicted_list)
    print(predicted_list)
    print(f"----------------{predicted}, {type(predicted)}--------------------")
    print(f"------------------{predicted_json}, {type(predicted_json)}")
    # Return a response back to the frontend
    # return str(predicted_list[0][0])
    return (predicted_json)

if __name__ == '__main__':
    print("Python file started...............")
    app.run(host='3000', port=5001, debug=True) 
