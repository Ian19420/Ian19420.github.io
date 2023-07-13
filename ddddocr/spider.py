import ddddocr
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
from google.oauth2.service_account import Credentials
import gspread
import pandas as pd

#讀取表單
scope = ['https://www.googleapis.com/auth/spreadsheets']
creds = Credentials.from_service_account_file("key.json", scopes=scope) #key.json為金鑰 已撤銷
gs = gspread.authorize(creds)
sheet = gs.open_by_url("https://docs.google.com/spreadsheets/d/1Jx1C9TCMMcpmAURPfb5x6127JAZ9_yWvkb6glHBerzE/edit#gid=0")
worksheet = sheet.get_worksheet(0)
df = pd.DataFrame(worksheet.get_all_records())
lunch = list(df["lunch"])
price = list(df["price"])
number = list(df["number"])

#自動化爬蟲_填午餐
driver = webdriver.Chrome("./chromedriver")
driver.implicitly_wait(10)
driver.get("https://webap1.kshs.kh.edu.tw/kshsSSO/")
img = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/div/table/tbody/tr[4]/td[3]/img")
with open("img.png", "wb") as f:
    f.write(img.screenshot_as_png)

ocr = ddddocr.DdddOcr() #解驗證碼
with open("img.png", 'rb') as f:
    image = f.read()
res = ocr.classification(image)

account = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/div/table/tbody/tr[1]/td[3]/input")
passwords = driver.find_element(By.XPATH, "//*[@id='ContentPlaceHolder1_txtPassword']")
code = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/div/table/tbody/tr[3]/td[3]/input")
button = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/div/table/tbody/tr[5]/td[3]/a[1]")
code.send_keys(res)
account.send_keys("學號") #學號為總務股長的學號 已撤銷
passwords.send_keys("密碼") #密碼為總務股長的密碼 已撤銷
button.click()

student = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/div[1]/ul/li[2]/a")
ActionChains(driver).move_to_element(student).perform()
button = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/div[1]/ul/li[2]/ul/li[7]/a")
button.click()
button = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/table/tbody/tr/td[2]/div/fieldset/table/tbody/tr[2]/td[1]/a")
button.click()
button = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/div/table[1]/tbody/tr/td[3]/div[1]/ul/li[1]/a")
button.click()
button = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/div/table[2]/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td[2]/input")
button.click()

set_lunch = set(lunch)
dict_lunch = {}
for i in set_lunch:
    dict_lunch[i] = lunch.count(i)

for key, value in dict_lunch.items():
    select = driver.find_element(By.XPATH, f"//td[contains(text(), '{key}')]")
    select = select.find_element(By.XPATH, f"../td[7]/select/option[@value = '{value}']")
    select.click()
submit = driver.find_element(By.XPATH, "/html/body/form/div[3]/table/tbody/tr[3]/td/div/table[2]/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td[2]/input[2]")
submit.click()
time.sleep(10)

