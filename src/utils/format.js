//information data
const subjects = [
   "Biologia",
   "Filosofia",
   "Física",
   "Geografia",
   "Inglês",
   "História",
   "Matemática",
   "Português",
   "Química",
   "Sociologia",
   "Educação Física",
]

const weekdays = [
   "Domingo",
   "Segunda-feira",
   "Terça-feira",
   "Quarta-feira",
   "Quinta-feira",
   "Sexta-feira",
   "Sábado",
]

function getSubject(subjectNumber) {
const position = +subjectNumber - 1
return subjects[position]
}

function convertHoursToMinutes(time) {
   const [hours, minutes] = time.split(':')
   return Number((hours * 60) + minutes)
}

module.exports = {
   subjects,
   weekdays,
   getSubject,
   convertHoursToMinutes
}