class Course {
    constructor (name, time, date, rooms) {
        this.name = name;
        this.time = time;
        this.date = date;
        this.rooms = rooms;
    }
    toString () {
        return this.name;
    }
}
class Student {
    constructor (id, name, gpa, courses) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = courses;
    }
    toString () {
        return this.id+'';
    }
}
class Point {
    constructor (x,y) {
        this.x = x;
        this.y = y;
    }
    toString () {
        return '(' +this.x + ', ' + this.y+ ')';
    }
}
class Point3D extends Point {
    constructor (x, y, z) {
        super(x,y);
        this.z = z;
    }
    toString () {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
    }
}
class CW5 extends Menu {
    constructor () {
        super()
        var ders = new Course("Advanced Prog", "15:00", new Date("2019-11-11"), ["B121"]);
        this.student = new Student(230, "Halil KÖZEN", 2.61, ders);
        this.course = ders;
        this.point = new Point(3,4);
        this.point3d = new Point3D(3,4,5);
    }
}
