# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list
https://monosnap.com/file/mrp0IkBajeymqL8iLbzyWzCGUSxwGZ

# Получаем контакт по id

node index.js --action get --id 5
https://monosnap.com/file/mKMcHRKeYfDnWPs9CPVaCYg5FhYBkv

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone
322-22-22 https://monosnap.com/file/gizo6kkPY8QKZysz35UVGvcxKDfyL1

# Удаляем контакт

node index.js --action remove --id=3
https://monosnap.com/file/lrzyjBUZTlTNAhwrM24pP7Uyzgl4Gd
