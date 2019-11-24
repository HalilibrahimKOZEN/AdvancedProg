class Course {
    constructor(code, time, date, rooms) {
        this.code = code || ''
        this.time = time || ''
        this.date = date || ''
        this.rooms = rooms || []
    }

    toString () {
        return this.code + ''
    }
}
class Student {
    constructor (id, name, gpa, courses) {
        this.id = id || ''
        this.name = name || ''
        this.gpa = gpa || ''
        this.courses = courses || []
    }
    toString () {
        return this.id + ''
    }
}

class Database {
    constructor () {
        this.courses = new Map()
        this.students = new Map()
		this.rooms = new Map()
        this.readCourses()
        this.readStudents()
    }

    readCourses () {
        const url = "https://maeyler.github.io/JS/data/Courses.txt"
        fetch(url)
        .then(res => res.text()) 
        .then(res => [
            this.addCourses(res)
			
        ])
    }

    readStudents () {
        const url = "https://maeyler.github.io/JS/data/Students.txt"
        fetch(url)
        .then(res => res.text())
        .then(res => [
            this.addStudents(res)
        ])
    }

    addCourses(txt) {
        let msg = 'Courses: ' + txt.length + ' chars, '
        let a = txt.split('\n')
        msg += a.length + ' lines'
        console.log(msg)

        //create course object
        const courseList = a.map(item => {
            let word = item.split('\t')
            const course = new Course (word[0], word[1], word[2], word.slice(3))
            return course
        })

        //add courses to map
        for (let x in courseList) {
            if(courseList[x].code !== '' || undefined) {
                this.courses.set(courseList[x].code, courseList[x])
            }
        }

        //find all rooms
        this.findAllRooms()
    }

    addStudents (txt) {
        let msg = 'Students: ' + txt.length + ' chars, ';
        let a = txt.split('\n')
        msg += a.length + ' lines'
        console.log(msg)

        //create student object
        const studentList = a.map(item => {
            let word = item.split('\t')
            const student = new Student (word[0], word[1], word[2])

            //find the courses in map which takes student
            for (let z in word.slice(3)){
                student.courses.push(this.courses.get(word.slice(3)[z]))
            }

            return student
        })

        //add students to map
        for (let y in studentList) {
            if(studentList[y].id !== '' | undefined) {
                this.students.set(studentList[y].id, studentList[y])
            }
        }
        document.getElementById("info").innerHTML += this.toString()
    }

    findAllRooms () {
        this.courses.forEach(course => {
            course.rooms.forEach(room => {
                if(this.rooms.get(room) == undefined) {
                    this.rooms.set(room, 1)
                }else{
                    this.rooms.set(room, this.rooms.get(room)+1)
                }
            })
        })
    }

    randomStudent () {
        const keys = Array.from(this.students.keys())
        return this.students.get(keys[Math.trunc(keys.length * Math.random())])
    }

    randomCourse () {
        const keys = Array.from(this.courses.keys())
        return this.courses.get(keys[Math.trunc(keys.length * Math.random())])
    }

    randomRoom () {
        const keys = Array.from(this.rooms.keys())
        return keys[Math.trunc(keys.length * Math.random())]
    }

    underGivenGPA (gpa) {
        const students = []
        this.students.forEach( item => {if (item.gpa < gpa){students.push(item)} })
        return students.length
    }
	
	aboveGivenGPA (gpa) {
        const students = []
        this.students.forEach( item => {if (item.gpa > gpa){students.push(item)} })
        return students.length
    }

    coursesTakenByStudent (student) {
        return student.courses
    }

    examSchedule (student) {
        for (let course of student.courses) {
            console.log(course.date +'\t'+ course.time +'\t'+ course.rooms)
        }
    }

    studentListGivenCourse (course) {
        const studentList = []
        this.students.forEach(student => { 
            student.courses.forEach(a => {
                a.code === course.code ? studentList.push(student) : null
            })
        })
        return studentList
    }

    courseListGivenRoom (roomCode) {
        const courseList = []
        this.courses.forEach(course => {
            course.rooms.includes(roomCode) ? courseList.push(course) : null
        })
        return courseList
    }

    courseCountGivenRoom (roomCode) {
        return this.courseListGivenRoom(roomCode).length
    }

    toString () {
        return 'Courses: ' + this.courses.size + ' , Students: ' + this.students.size
    }
}