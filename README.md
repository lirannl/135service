# 135service
135code's open-source API + frontend

A deno-powered web API and a React-based frontend for custom algorithms

To interface, make an http POST request with a json body containing the attributes "operation" to determine which function to run, and "args", which supplies the python function with arguments.

Example request:
![https://135code.com:8443/135cipher](https://i.imgur.com/R3VgvQe.png)

Example with extra arguments:
![https://135code.com:8443/135cipher](https://i.imgur.com/u0ESupQ.png)
