## Hosted Project

[TODO-LIST APP](https://todo-list-app-z4ww.onrender.com)

#### Setup Basic Express Server

# ToDo-List App Schema Design

## User Story

- As a user, I want to be able to create a todo list/task manager which helps remind me of activities i should attend to 
- Users can register or login to their account and are able to view their todo lists, change activities in their todo lists and delete activities that have already been fulfilled in their todo lists.
- Users can also update their account and change their passwords.
- A user cannot access the todo list of another user 
- Only admin can get access to all activites created by different users in their todo lists. 

## Requirement Analysis

### Entities:

- Authentication: This allows for registering and enabling users login to their account and also logging out
- Tasks: A TODO list has a list of tasks, each with a title,description,category the tasks falls under,status, date due for completion of task
- Users: A user has a unique identifier, name, email, and password.

### Relationships:
- A user can view the lists of tasks he/she created.
- A user can only access tasks from the TODO lists peculiar to him

### Admin Details:
- name:"james"
- password:"secret"

### Postman Link:
https://documenter.getpostman.com/view/26636754/2s93kxcRsv