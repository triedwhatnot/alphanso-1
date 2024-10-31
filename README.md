# Alphanso - round 1 : TO-DO APP

## Steps to run the app:
1. Run command in root directory : "npm ci" 
2. Run command in root directory : "npm run build" 
3. And then run, "npm run preview"


## Steps to test the app:
1. Run command in root directory : "npm ci" 
2. Run command in root directory to test : "npm run test" 
3. Run command in root directory to check test's code coverage : "npm run coverage"

## Functionalities implemented
1. Add, Delete, Update status of task.
    - Enter key too can be used to add the task.
    - Form validation : Task with no description cannot be added. A red border appears around input field, indicating this error state.
    - Tasks sorting order : Newly added tasks are added on the top of the list and "pending" tasks are listed above "completed" tasks.
    - A "zeroth" state appears in case no tasks have been added in the app
2. Undo deletion operation of task within a window of 3 secs.
3. Filter on the basis of task status: completed or pending or simply, list all.
4. Search tasks on the basis of their description and even filter them on the basis of completion status.
    - Debouncing have been added, so as to limit the rate of filtering logic execution.
5. LocalStorage has been used to persist the data.
6. Test cases have been implemented to test app's usability with code coverage greater than 90%.
