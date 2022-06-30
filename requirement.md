# REQUIREMENTS: 

## Installing the pacjages of the Project:
```sh 
npm install 
```

## Database setup

### CREATE USER 

```sh 
CREATE USER mans1611 PASSWORD 'mans';
ALTER USER mans1611 WITH SUPERUSER;
GRANT postgres TO mans1611;
```

## database port : 5432

### Before Launching the app you have to migrate the database in the rootfolder of the project

```sh
db-migtare up 
```
