from bs4 import BeautifulSoup
import logging
import pandas as pd
import sys
import os

#==========================================#
# Replace with suitable file location and name
folderdir="webscrapping\html ttb"
resultdir="webscrapping\data\\"
#==========================================#

#data init
data_list=[["course_code"],["class_nbr"],["cours_title"],["credit"],["teaching_staff"],["class_type"],["period"],["venue"],["date"],["weekday"]]

def retriveData():
    file = open(filedir).read()
    soup = BeautifulSoup(file,"html.parser")

    table = soup.find(id="gv_detail")

    if table == None: 
        print("no course offering in this semester")
        return



    for table in table.find_all('tbody'):
        rows = table.find_all("tr")
        for row in rows:
            try:
                data = row.find_all('td')
                course_code = data[0].text
                class_nbr = data[1].text
                cours_title = data[2].text
                credit = data[3].text
                teaching_staff = data[4].text
                class_type = data[7].text
                period = data[10].text[3:]
                weekday = data[10].text[0:2]
                if weekday=="TB":
                    weekday="TBA"
                venue = data[11].text
                date = data[12].text

                raw_data=[course_code,class_nbr,cours_title,credit,teaching_staff,class_type,period,venue,date,weekday]

                #skip redundant data 
                if (class_type=='\xa0' or class_type=='&nbsp'):
                    continue  

                for i in range(len(raw_data)):
                    data_list[i].append(raw_data[i])
                              

            except:
                logging.debug("no td item")


    logging.info("data retrive done")
    print("data retrive done")

    # save to 
    df = pd.DataFrame(data_list)
    df.to_json(name)


for filename in os.listdir(folderdir):
    if filename.endswith(".html"):
        filedir = os.path.join(folderdir,filename)
        name = resultdir+filename[0:-5]+".json"
        retriveData()