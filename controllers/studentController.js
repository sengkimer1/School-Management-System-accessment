import studentModel from "../models/studentModel.js";

export const createStudent = async (req, res) => {
    const { IDCard, name, email, phone, classId } = req.body;

    if (!IDCard || !name || !email || !phone || !classId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newStudent = new studentModel({
            IDCard,
            name,
            email,
            phone,
            classId,
        });

        await newStudent.save();

        return res
            .status(201)
            .json({ message: "Student created successfully", newStudent });
    } catch (error) {
        console.error("Error creating student:", error.message);
        return res.status(500).json({ error: "An error occurred while creating the student" });
    }
};

export const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const studentDetail = await studentModel.findById(id);

        if (!studentDetail) {
            return res.status(404).json({ error: "Student not found" });
        }

        return res.status(200).json({ studentDetail });
    } catch (error) {
        console.error("Error fetching student details:", error.message);
        return res.status(500).json({ error: "An error occurred while fetching the student details" });
    }
};

export const getStudents = async (req, res) => {

    try {
        const studentall = await studentModel.find({});

        if (!studentall) {
            return res.status(404).json({ error: "Student not found" });
        }

        return res.status(200).json({ studentall });
    } catch (error) {
        console.error("Error fetching student all :", error.message);
        return res.status(500).json({ error: "An error occurred while fetching the student all" });
    }
};
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, classId } = req.body;
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            classId
        }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        return res.status(200).json({ updatedStudent });
    } catch (error) {
        console.error("Error updating student details:", error.message);
        return res.status(500).json({
            error: "An error occurred while updating the student details "
        });
    }
};
export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await studentModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student details:", error.message);
        return res.status(500).json({
            error: "An error occurred while deleting the student details "
        });
    }
};