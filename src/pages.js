//Call the server
const dataBase = require('./database/db')

//functionalities
const {  subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) {
   return res.render("index.html")
}

async function pageStudy(req, res) {
   const filters  = req.query // req.query = Receives the data

   if(!filters.subject || !filters.weekday || !filters.time) {
      return res.render("study.html", { filters, subjects,weekdays })
   }
   
   //convert hour to minutes
   const timeToMinutes = convertHoursToMinutes(filters.time)

   const query = `
      SELECT classes.*, proffys.*
      FROM proffys
      JOIN classes ON (classes.proffy_id = proffys.id)
      WHERE EXISTS (
         SELECT class_schedule.*
         FROM class_schedule
         WHERE class_schedule.class_id = classes.id
         AND class_schedule.weekday = ${filters.weekday}
         AND class_schedule.time_from <= ${timeToMinutes}
         AND class_schedule.time_to > ${timeToMinutes}
      )
      AND classes.subject = '${filters.subject}'
   `  
   //Caso haja erro na consulta
   try {
      const db = await dataBase
      const proffys = await db.all(query)

      proffys.map((proffy) => {
         proffy.subject = getSubject(proffy.subject)
      })

      return res.render('study.html', { proffys, subjects, filters, weekdays})

   } catch (error) {
      console.log(error)
   }

}

function pageGiveClasses(req, res) {
   

   return res.render("give-classes.html", { subjects, weekdays })
}

async function pageSaveClasses(req, res) {
   const creatProffy = require('./database/creatProffy')

   const proffyValue = {
      name : req.body.name,
      avatar : req.body.avatar,
      whatsapp : req.body.whatsapp,
      bio : req.body.bio
   }

   const classValue = {
      subject : req.body.subject,
      cost : req.body.cost
   }

   const classScheduleValues = req.body.weekday.map((weekday, index) => {

      return {
         weekday : weekday,
         time_from : convertHoursToMinutes(req.body.time_from[index]),
         time_to : convertHoursToMinutes(req.body.time_to[index])
      }

   })

   try {
      
      const db = await dataBase

      await creatProffy(db, { proffyValue, classValue, classScheduleValues })

      let queryString = "?subject=" +req.body.subject
      queryString += "&weekday=" +req.body.weekday[0]
      queryString += "&time=" +req.body.time_from[0]

      return res.redirect("/study" + queryString)

   } catch (error) {
      console.log(error)
   }

}

module.exports = {
   pageLanding,
   pageStudy,
   pageGiveClasses,
   pageSaveClasses
}