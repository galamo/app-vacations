FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb_container --db seed-data --collection users --type json --file /init.json --jsonArray
