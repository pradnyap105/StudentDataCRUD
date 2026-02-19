const pool = require("../db");

/**
 * GET all students
 */
exports.getAllStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET student by ID
 */
exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * CREATE new student
 */
exports.createStudent = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    roll_number,
    dob,
    college_name,
    gender,
    blood_group,
    contact_number,
    email
  } = req.body;

  try {
    const query = `
      INSERT INTO students
      (first_name, middle_name, last_name, roll_number, dob, college_name,
       gender, blood_group, contact_number, email)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      first_name,
      middle_name,
      last_name,
      roll_number,
      dob,
      college_name,
      gender,
      blood_group,
      contact_number,
      email
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Student created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE student
 */
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    middle_name,
    last_name,
    roll_number,
    dob,
    college_name,
    gender,
    blood_group,
    contact_number,
    email
  } = req.body;

  try {
    const query = `
      UPDATE students SET
        first_name = $1,
        middle_name = $2,
        last_name = $3,
        roll_number = $4,
        dob = $5,
        college_name = $6,
        gender = $7,
        blood_group = $8,
        contact_number = $9,
        email = $10
      WHERE id = $11
      RETURNING *;
    `;

    const values = [
      first_name,
      middle_name,
      last_name,
      roll_number,
      dob,
      college_name,
      gender,
      blood_group,
      contact_number,
      email,
      id
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE student
 */
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
