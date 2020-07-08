# 135service
135code's open-source API + frontend

A deno-powered web API and a React-based frontend for custom algorithms

To interface, make an http POST request with a json body containing the attributes "key" - integer, and "text" - the text to encrypt/decrypt. You may also include an "extras" attribute, which would be an array, containing extra arguments (the supported arguments vary per-algorithm).

Example request:
![https://135code.com:8443/135cipher](https://i.imgur.com/R3VgvQe.png)

Example with extra arguments:
![https://135code.com:8443/135cipher](https://i.imgur.com/u0ESupQ.png)
