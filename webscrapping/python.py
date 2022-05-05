import json
from calendar import weekday
import os
from bs4 import BeautifulSoup
import logging
import pandas as pd
import re

#==========================================#
# Replace with suitable file location and name
name= "data.json"
#==========================================#

#data init
course_code, class_nbr, cours_title, credit,teaching_staff,class_type,section_code,period,venue,weekday =['' for _ in range(10)]
data_list=[[],[],[],[],[],[],[],[],[],[]]
initNumber = 0

files = [f for f in os.listdir('.') if os.path.isfile(f)]

for f in files:
    x = 0
    weekday = 'Hi'
    period = 'Hi'

    if '.html' in f:

        file = open(f, encoding='utf-8').read()
        soup = BeautifulSoup(file, "html.parser")
        table = soup.find(id="gv_detail")

        for table in table.find_all('tbody'):
            rows = table.find_all("tr")

            for row in rows:
                try:
                    data = row.find_all('td')
                    course_code_check = data[0].text.strip('-')
                    if len(course_code_check) >= 8:
                        course_code = course_code_check
                    class_nbr_check = data[1].text.strip('\n')
                    if class_nbr_check != '':
                        class_nbr = class_nbr_check
                    cours_title_check = data[2].text.strip('\n')
                    if cours_title_check != '':
                        cours_title = cours_title_check
                    credit_check = data[3].text
                    if '.00' in credit_check:
                        credit = credit_check
                    teaching_staff_check = data[4].text.strip('\n').strip('-')
                    if teaching_staff_check != '':
                        teaching_staff=teaching_staff_check
                    class_type_check = data[7].text
                    if class_type_check != '\xa0':
                        class_type = class_type_check
                    section_code_check = data[8].text.strip('-')
                    if section_code_check != '':
                        section_code = section_code_check
                    period_check = data[10].text[3:]
                    weekday_check = data[10].text[0:2]
                    venue = data[11].text

                    #skip redundant data
                    if (period_check==period and weekday_check==weekday):
                    # if (weekday!=weekday_check and class_type=='\xa0'):
                        continue

                    weekday = weekday_check
                    period = period_check
                    data_list[0].append(course_code)
                    data_list[1].append(class_nbr)
                    data_list[2].append(cours_title)
                    data_list[3].append(credit)
                    data_list[4].append(teaching_staff)
                    data_list[5].append(class_type)
                    data_list[6].append(section_code)
                    data_list[7].append(period)
                    data_list[8].append(venue)
                    data_list[9].append(weekday)

                except:
                    logging.debug("no td item")


logging.info("data retrive done")
print("data retrive done")

df = pd.DataFrame(data_list)
df.to_json(name)