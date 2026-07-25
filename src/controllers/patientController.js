const crypto = require("crypto");

// Simulate Database (In the real world, will be used DB eg MongoDB, PostgreSQL)
const guestPatientUsers = [];

const addPatient = (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "No data provided" });
    }

    guestPatientUsers.push(data);
    req.io.emit('message:submitted', guestPatientUsers);

    res.status(200).json({
      success: true,
      data: guestPatientUsers
    });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const generateSessionId = (req, res) => {
  try {
    const sessionId = crypto.randomUUID();
    res.status(200).json({ sessionId });
  } catch (error) {
    console.error("Error generating session ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getExistingPatientById = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No data provided" });
    }
    const existingPatient = guestPatientUsers.find(patient => patient.sessionId === id);
    res.status(200).json({
        data: existingPatient ?? {}
      });
  } catch (error) {
    console.error("Error getting patient: by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getExistingPatient = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: guestPatientUsers
    });
  } catch (error) {
    console.error("Error getting patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  addPatient,
  generateSessionId,
  getExistingPatientById,
  getExistingPatient,
  guestPatientUsers
};
