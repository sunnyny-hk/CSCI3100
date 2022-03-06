
from bs4 import BeautifulSoup
import logging
import pandas as pd

# Manually go to website with selected course subject e.g. CSCI
# Save to local repository to proceed
# install bs4 package -php install bs4

# read html file 

#==========================================#
# Replace with suitable file location and name
filedir="websrapping\Teaching Timetable.html"
name= "ACCTdata.json"
#==========================================#



file = open(filedir).read()
soup = BeautifulSoup(file,"html.parser")
table = soup.find(id="gv_detail")

#data init
course_code, class_nbr, cours_title, credit,teaching_staff,class_type,period,venue,date =['' for _ in range(9)]
data_list=[["course_code"],["class_nbr"],["cours_title"],["credit"],["teaching_staff"],["class_type"],["period"],["venue"],["date"]]



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
            period = data[10].text
            venue = data[11].text
            date = data[12].text

            #skip redundant data 
            if (class_type=='\xa0'):
                continue  

            data_list[0].append(course_code)
            data_list[1].append(class_nbr)
            data_list[2].append(cours_title)
            data_list[3].append(credit)
            data_list[4].append(teaching_staff)
            data_list[5].append(class_type)
            data_list[6].append(period)
            data_list[7].append(venue)
            data_list[8].append(date)

        except:
            logging.debug("no td item")


# save to 
df = pd.DataFrame(data_list)
df.to_json(name)

