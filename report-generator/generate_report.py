# Importing the required libraries
from ruamel import yaml
from datetime import datetime, timedelta
import re
import requests
import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import datetime as DT

CONFIG_FILE="/home/mark/projects/asltesting/report.yaml"

report_yaml = yaml.safe_load(open(CONFIG_FILE))

## do a bunch of things with dates
today = DT.date.today()
week_ago = today - DT.timedelta(days=7)
week_ago_formatted =  (week_ago.strftime('%Y/%m/%d'))

done_query_fragment1 = 'https://standardsportal.atlassian.net/issues/?jql=project%20=%20STAN%20and%20status%20=%20DONE%20and%20updatedDate%20%3E=%20%22'
done_query_fragment2 = '%22';
full_query=done_query_fragment1+week_ago_formatted+done_query_fragment2

browser = webdriver.Firefox()
browser.get('https://standardsportal.atlassian.net/jira/your-work')

login_user = browser.find_element(By.XPATH, "//input[@id=\'username\']")
login_user.clear()
login_user.send_keys(report_yaml['Values']['ATLASSIAN_USER'])
login_user.send_keys(Keys.RETURN)
time.sleep(5)
login_password = browser.find_element(By.XPATH, "//input[@id=\'password\']")
login_password.clear()
login_password.send_keys(report_yaml['Values']['ATLASSIAN'])
login_password.send_keys(Keys.RETURN)
time.sleep(5)

browser.get(full_query)
done_page = browser.page_source
time.sleep(5)
browser.get("https://standardsportal.atlassian.net/issues/?jql=project%20%3D%20STAN%20and%20status%20in%20(%22Selected%20for%20Development%22%2C%20%22In%20Progress%22)") 
doing_page = browser.page_source
time.sleep(5)

data = done_page

# Creating BeautifulSoup object
soup = BeautifulSoup(data, 'html.parser')
table = soup.find('table', class_='aui')
done_list = []
done_goals = []

# Collecting Ddata
for row in table.tbody.find_all('tr'):
    # Find all data for each column
    columns = row.find_all('td')
    row_text = columns[2].text.strip()
    ## ignore things that are marked won't fix
    if (re.search("Won't", row_text, re.IGNORECASE) is None):
        if (re.search("^GOAL", row_text, re.IGNORECASE)):
            done_goals.append(row_text+"\n")
        else:
            done_list.append(row_text + "\n")

data = doing_page

# Creating BeautifulSoup object
soup = BeautifulSoup(data, 'html.parser')
table = soup.find('table', class_='aui')
doing_list = []
doing_goals = []

# Collecting Ddata
for row in table.tbody.find_all('tr'):    
    # Find all data for each column
    columns = row.find_all('td')
    row_text = columns[2].text.strip()
    ## ignore things that are marked "RAD" - risks and dependencies
    if (re.search("^RAD.*", row_text, re.IGNORECASE) is None):
        if (re.search("^GOAL", row_text, re.IGNORECASE)):
            doing_goals.append(row_text+"\n")
        else:
            doing_list.append(row_text + "\n")


#### to do extract the goals
## what's today
the_date = datetime.now()
the_date_long = the_date.strftime("%A %d %B %Y")
print ("Long date "+the_date_long+"\n")


day = the_date.strftime("%d")
if ((day == '1') or (day == '11') or (day == '21')):
	human_day = day+"st"
elif ((day == '2') or (day == '22')):
	human_day = day+"nd"
elif ((day == '3') or (day == '23')):
	human_day = day+"rd"
else: 
	human_day=day+"th"
	
human_formatted_date = human_day+" "+the_date.strftime("%B %Y")


## what's tomorrow 
tomorrow = the_date + timedelta(days=1)
tomorrow_long = tomorrow.strftime("%A %d %B %Y")
print ("tomorrow long "+tomorrow_long+"\n")

## what's six days ago
six_days_ago = the_date - timedelta(days=6)
six_days_ago_long = six_days_ago.strftime("%A %d %B %Y")
print ("six days ago "+six_days_ago_long+"\n")

## what's next week
seven_days_hence = the_date + timedelta(days=7)
seven_days_hence_long = seven_days_hence.strftime("%A %d %B %Y")
print ("seven_days_hence "+seven_days_hence_long+"\n")

## figure out the name of the report
report_name = the_date.strftime("%Y-%m-%d.md")

## read in the template as a multi-line string
text_file = open(report_yaml['Values']['NHS_REPORT_TEMPLATE'], "r")
template_data = text_file.read()
text_file.close()

template_data = re.sub(r"XXX_TODAY_XXX", the_date_long, template_data)
template_data = re.sub(r"XXX_SIX_DAYS_AGO_XXX", six_days_ago_long, template_data)
template_data = re.sub(r"XXX_TOMORROW_XXX", tomorrow_long, template_data)
template_data = re.sub(r"XXX_SEVEN_DAYS_HENCE_XXX", seven_days_hence_long, template_data)
done_list_string = "* "+('* '.join(done_list))
doing_list_string = "* "+('* '.join(doing_list))
template_data = re.sub(r"XXX_DONE_LIST_XXX", done_list_string, template_data)
template_data = re.sub(r"XXX_DOING_LIST_XXX", doing_list_string, template_data)
done_goals_string = "* "+('* '.join(done_goals))
doing_goals_string = "* "+('* '.join(doing_goals))
template_data = re.sub(r"XXX_DONE_GOALS_XXX", done_goals_string, template_data)
template_data = re.sub(r"XXX_DOING_GOALS_XXX", doing_goals_string, template_data)

print (template_data)
browser.close()
report_dir=report_yaml['Values']['NHS_REPORT_TARGET_DIR']
full_report_name=report_dir+report_name
## write the text to the file
f = open(full_report_name, "w")
f.write(template_data)
f.close()

## read in the index file and replace the top title with the top title and the new link
index_file = open(report_yaml['Values']['NHS_REPORT_INDEX'], "r")
index_data = index_file.read()
index_file.close()

index_data = re.sub(r"\# Weekly Reports\s+", "# Weekly Reports\n\n* ["+human_formatted_date+"](./reports/"+report_name+")\n\n", index_data)

## replace the index file
index_file = open(report_yaml['Values']['NHS_REPORT_INDEX'], "r+")
index_file.truncate(0)
index_file.write(index_data)
index_file.close()


