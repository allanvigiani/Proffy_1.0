const database = require('./db')
const creatProffy = require('./creatProffy')

database.then(async (db) => { //parametro db da pasta db.js da function excute()
   //Insert data
   proffyValue = { //proffys table
      name : 'Allan Vigiani',
      avatar : 'https://avatars3.githubusercontent.com/u/64793591?s=460&u=9d10e049dbceae9dd80f154634881bf52a647288&v=4',
      whatsapp : '2199999999',
      bio : 'Uma bio legal'
   }

   classValue = { //classes table
      subject : 3,
      cost : '50',
      //proffy_id will come through the database
   }

   classScheduleValues = [ //class_schedule table
      //class_id will come through the database after registering the class
      {
         weekday : 1,
         time_from : 720,
         time_to : 1220
      },
      {
         weekday : 4,
         time_from : 1220,
         time_to : 1820
      }
   ]

   //await creatProffy(db, {proffyValue, classValue, classScheduleValues})

   //Query entered data (Colsultar dados)
   
   //All proffys
   const selectedProffys = await db.all("SELECT * FROM proffys")
   //console.log(selectedProffys)

   //consult a specific teacher’s CLASSES
   //Bring teacher data
   const selectClassesAndProffys = await db.all(`
      SELECT classes.*, proffys.*
      FROM proffys
      JOIN classes ON (classes.proffy_id = proffys.id)
      WHERE classes.proffy_id = 1
   `)
   //console.log(selectClassesAndProffys)

   // horário de trabalho - time_from e time_to
   const selectClassesSchedule = await db.all(`
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = "1"
      AND class_schedule.weekday = "4"
      AND class_schedule.time_from <= "1220"
      AND class_schedule.time_to > "1220"
   `)
   //console.log(selectClassesSchedule)

})