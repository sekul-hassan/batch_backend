const addMember = async (req, res) => {
    try {
        // Check if req.body.data is already an object
        const data = typeof req.body.data === "string"
            ? JSON.parse(req.body.data)
            : req.body.data;

        console.log(data);

        const { id, name, phone, district, email } = data;

        // Process the data as needed
        res.status(200).json({ message: "Member added successfully", data });
    } catch (error) {
        console.error("Error in addMember:", error.message);
        res.status(500).json({ error: "Failed to add member" });
    }
};

module.exports = { addMember };
