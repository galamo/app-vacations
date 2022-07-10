db = db.getSiblingDB("cars");
db.getCollection("cars").find(
    {
        "Name" : "chevrolet chevelle malibu", "Cylinders":8
    }
);