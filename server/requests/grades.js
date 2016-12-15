module.exports = {
    bestclass: [
        {
            $unwind: "$scores"
        },
        {
            $match: {

                $or: [
                    { "scores.type": "exam" },
                    { "scores.type": "homework" }
                ]
            }
        },
        {
            $group: {
                _id: { student_id: "$student_id", class_id: "$class_id" },
                mark_avg: {
                    $avg: "$scores.score"
                }
            }
        },
        {
            $sort: {
                "_id.class_id": 1,
                "_id.student_id": 1
            }
        },
        {
            $group: {
                _id: { class: "$_id.class_id" },
                mark_avg_in_class: {
                    $avg: "$mark_avg"
                }
            }
        },
        {
            $sort: {
                "mark_avg_in_class": -1
            }
        }
    ]
}