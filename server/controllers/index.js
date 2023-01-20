/*
* STATUS CODES
* 200 - GOOD
* 201 - GOOD + CREATED . PENTRU POST
* 203 - NO CONTENT, CAND NU TRIMITEM NIMIC IN BODY CA RESPONSE
* 400 - BAD REQUEST. N-O DAT USERUL TOATE DATELE
* 404 - NOT FOUND, NU AM GASIT CE CAUTAM
* 500 - EROARE LA SERVER. CRAPA CEVA LA NOI, NU E VINA USERULUI
* 300 - REDIRECTURI, CAND TRIMITEM IN ALTA PARTE*/

import { getAllStudents, updateStudent, deleteStudent } from "./students.js";
import { createActivity, deleteActivity, updateActivity, getActivityByDate, getAllActivities } from "./activities.js";

export { getAllStudents, updateStudent, deleteStudent }
export { createActivity, deleteActivity, updateActivity, getActivityByDate, getAllActivities }