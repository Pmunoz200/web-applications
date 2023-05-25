# `react-qa-server LAB 08`

The `react-qa-server` is the server-side app companion of HeapOverrun (i.e., `react-qa`). It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### **List of all films**

URL: `/api/films`

HTTP Method: GET.

Description: Get all the available films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:

```
[
    {
        "id":1,
        "title":"Matrix",
        "favorite": "True",
        "date": "2023-02-07",
        "rating": 4
    },
    ...
]

```

### **Get list of films related to filter**

URL: `/api/films/<filter>`

HTTP Method: GET.

Description: Get all the films that comply the condition stated by `<filter>`.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:

```
[
    {
        "id":1,
        "title":"Matrix",
        "favorite": "True",
        "date": "2023-02-07",
        "rating": 4
    },
    ...
]
```

### **List all the answers of a given question**

URL: `/api/questions/<id>/answers`

HTTP Method: GET.

Description: Get all the available answers for the question identified by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: A JSON array of objects, each describing an answer

```
[
    {
        "id":1,
        "text": "Yes",
        "author": "Luca Mannella",
        "score": -10,
        "date": "2023-02-15"
    }
    ...
]
```

### **Create a new answer for a given question**

URL: `/api/questions/<id>/answers`

HTTP Method: POST.

Description: Create a new answer for the question identified by `<id>`.

Request Body: A JSON object representing a new answer

```
{
    "text": "The Italian course has around 230 enrolled students",
    "author": "Enrico Masala",
    "score": 0,
    "date": "2023-05-09"
}
```

Response: `201 Created` (success) or `503 Service unavailable` (generic error). If the request body is not valid `422 Unprocesable Entity`.

Response body: **none**

### **Update an existing answer**

URL: `/api/answers/<id>`

HTTP Method: PUT.

Description: Update an answer identified by `<id>`.

Request Body: A JSON object representing the answer

```
{
    "text": "The Italian course has around 231 enrolled students",
    "author": "Enrico Masala",
    "score": 0,
    "date": "2023-05-09"
}
```

Response: `200 Ok` (success), `404 Not Found` (Wrong id), or `503 Service unavailable` (generic error). If the request body is not valid `422 Unprocesable Entity`.

Response body: **None**

### **Vote for an answer**

URL: `/api/answers/<id>/vote`

HTTP Method: POST.

Description: Upvote (+1) or Downvote (-1) an existing answer (identified by `<id>`).

Request Body: A JSON object representing action

```
{
    "vote": "upvote"
}
```

Response: `204 No content` (success) or `503 Service unavailable` (generic error). If the request body is not valid `422 Unprocesable Entity`.

Response body: **None**
