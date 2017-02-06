
class Grade {
    constructor() {
        this.student_id = 0;
        this.class_id = 0;
        this.scores = [];
    }

    static configMongoose() {
        return {
        "student_id": "number",
        "class_id": "number",
        "scores": "array"
        }
    }
}

module.exports = Grade;