## Description

create simple user CRUD operation using [Nest](https://github.com/nestjs/nest) framework qraphql and websocket([socket.io](https://socket.io/)).

## Installation

<b><h5>Prerequierement:</h5></b>
<ul>
    <li><a href="https://www.postgresql.org/download/">install postgresql</a></li>
    <li><a href="https://nodejs.org/en/download/">install nodejs and npm</a></li>
    <li>execute query statements existed in <b>"./src/sql.sql"</b> in postgresql server(to create necessary database and tables)</li>
</ul>


<b><h5>Install required packages:</h5></b>

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## API Document
- ### [graphql](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#api-documentgraphql)
    - [get one user](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#title-get-one-user)
    - [get all user](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#title-get-all-user)
    - [createUser](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#title-create-user)
    - [updateUser](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#title-create-user)
    - [deleteUser](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#title-delete-user)
- ### [websocket](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#api-documentwebsocket)
    - [get one user](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#title-get-one-user-1)
    - [get all user](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#title-get-all-user-1)
    - [createUser](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#titlecreateuser)
    - [updateUser](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#titleupdateuser)
    - [deleteUser](https://github.com/faridEsnaashari/readmetest/blob/master/README.md#titledeleteuser)
## API Document(graphql)
#### <b>title:</b> get one user<br>
<b>description:</b> get details of an user specified by id(user\_id)<br>
<b>method:</b> \<POST\><br>
<b>request domain:</b> "localhost:3000/graphql"<br>
<b>request body:</b> 

    query{
        user(user_id: <$id: number>){
            name
            age
            gender
            phonenumber
        }
    }

***

#### <b>title:</b> get all user<br>
<b>description:</b>get details of all users<br>
<b>method:</b> \<POST\><br>
<b>request domain:</b> "localhost:3000/graphql"<br>
<b>request body:</b> 

    query{
        users(){
            name
            age
            gender
            phonenumber
        }
    }

***

#### <b>title:</b> create user<br>
<b>description:</b>create an user with the provided details<br>
<b>method:</b> \<POST\><br>
<b>request domain:</b> "localhost:3000/graphql"<br>
<b>request body:</b> 

    mutation{
        createUser(
            userDetails: {
                name: <$name: string>, 
                age: <$age: number>, 
                gender: <$gender: string>
                phonenumber: <$phonenumber: string>, 
            }
        ){
            statusCode
            message
            user_id
        }
    }

***

#### <b>title:</b> update user<br>
<b>description:</b>update an user specified by id with the provided details<br>
<b>method:</b> \<POST\><br>
<b>request domain:</b> "localhost:3000/graphql"<br>
<b>request body:</b> 

    mutation{
        updateUser(
            userDetails: {
                id: <$id: number>,
                name: <$name: string>, 
                age: <$age: number>, 
                gender: <$gender: string>
                phonenumber: <$phonenumber: string>, 
            }
        ){
            statusCode
            message
        }
    }

***

#### <b>title:</b> delete user<br>
<b>description:</b>update an user specified by id<br>
<b>request domain:</b> "localhost:3000/graphql"<br>
<b>request body:</b> 

    mutation{
        deleteUser(user_id: <$id: number>){
            statusCode
            message
        }
    }

***

## API Document(websocket)
initialize socket to "localhost:3000/websocket" domain:

```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:3000/websocket');
```

then you can publish or subscribe to events like this:

```javascript
//subscribe to "createUser" event:
socket.on("createUser", data => {
    console.log(data);
});

//publish to "createUser" event:
const data = {
    name: "farid",
    age: 20,
    gender: "male",
    phonenumber: "09133448564",
};

socket.emit("createUser", data);
```

***

#### <b>title:</b> get one user<br>
<b>description:</b> for get details of an user specified by id(user\_id), emit to event describe blow. the server return data at same event.<br>
<b>websocket domain:</b> "localhost:3000/websocket"<br>
<b>emit to "getOneUser" event:</b> 

```javascript
socket.emit("getOneUser", <$user_id: number>);
```

<b>subscribe to "getOneUser" event:</b> 

```javascript
socket.on("getOneUser", data => {});
//the data contain these information in an object:
//name, age, gender, phonenumber
```

for example:

```javascript
socket.emit("getOneUser", 13);

socket.on("getOneUser", data => {
    console.log(data);
});

//the console.log method, print this to screen:
//{
//    name: "farid",
//    age: 21,
//    phonenumber: "09140435748",
//    gender: "male"
//}
```

***

#### <b>title:</b> get all user<br>
<b>description:</b> for get details of all users, emit to event describe blow. the server return data at same event<br>
<b>websocket domain:</b> "localhost:3000/websocket"<br>
<b>emit to "getAllUsers" event:</b> 

```javascript
socket.emit("getAllUsers");
```

<b>subscribe to "getAllUsers" event:</b> 

```javascript
socket.on("getAllUsers", data => {});
//the data contain these information about all users in an array of objects:
//name, age, gender, phonenumber
```

for example:

```javascript
socket.emit("getAllUsers");

socket.on("getAllUsers", data => {
    console.log(data);
});

//the console.log method, print this to screen:
//[
//    {
//        name: "farid",
//        age: 21,
//        phonenumber: "09140435748",
//        gender: "male"
//    },
//    {
//        name: "asghar",
//        age: 22,
//        phonenumber: "09140455748",
//        gender: "male"
//    },
//    .
//    .
//    .
//]
```

***

#### <b>title:</b>createUser<br>
<b>description:</b> for create an user with the details provided, emit to event describe blow. the server return data at same event<br>
<b>websocket domain:</b> "localhost:3000/websocket"<br>
<b>emit to "createUser" event:</b> 

```javascript
const data = {
    name: <$name: string>,
    age: <$age: number>,
    gender: <$gender: string>,
    phonenumber: <$phonenumber: string>,
};
socket.emit("createUser", data);
```

<b>subscribe to "createUser" event:</b> 

```javascript
socket.on("createUser", data => {});
//the data contain these information about operation in an objects:
//user_id, message, statusCode
```

for example:

```javascript
const data = {
    name: "farid",
    age: 20,
    gender: "male",
    phonenumber: "09133448344",
};

socket.emit("createUser", data);

socket.on("createUser", data => {
    console.log(data);
});

//the console.log method, print this to screen:
//{ user_id: 27, message: 'user created', statusCode: 201  }
```

***

#### <b>title:</b>updateUser<br>
<b>description:</b> for update an user specified by id with the details provided, emit to event describe blow. the server return data at same event<br>
<b>websocket domain:</b> "localhost:3000/websocket"<br>
<b>emit to "updateUser" event:</b> 

```javascript
const data = {
    id: <$id: number>,
    name: <$name: string>,
    age: <$age: number>,
    gender: <$gender: string>,
    phonenumber: <$phonenumber: string>,
};
socket.emit("updateUser", data);
```

<b>subscribe to "updateUser" event:</b> 

```javascript
socket.on("updateUser", data => {});
//the data contain these information about operation in an objects:
//message, statusCode
```

for example:

```javascript
const data = {
    id: 21,
    name: "farid",
    age: 20,
    gender: "male",
    phonenumber: "09133448344",
};

socket.emit("updateUser", data);

socket.on("updateUser", data => {
    console.log(data);
});

//the console.log method, print this to screen:
//{message: 'user updated', statusCode: 200  }
```

***

#### <b>title:</b>deleteUser<br>
<b>description:</b> for delete an user specified by id, emit to event describe blow. the server return data at same event<br>
<b>websocket domain:</b> "localhost:3000/websocket"<br>
<b>emit to "deleteUser" event:</b> 

```javascript
socket.emit("deleteUser", <$user_id: number>);
```

<b>subscribe to "deleteUser" event:</b> 

```javascript
socket.on("deleteUser", data => {});
//the data contain these information about operation in an objects:
//message, statusCode
```

for example:

```javascript
socket.emit("deleteUser", 12);

socket.on("deleteUser", data => {
    console.log(data);
});

//the console.log method, print this to screen:
//{message: 'user deleted', statusCode: 200  }
```

***



## Contact me

- linkdin - [farid esnaashar](https://www.linkedin.com/in/farid-esnaashar-8bb139199)
- telegram - [@farid_esnaashar](https://t.me/farid_esnaashar)


