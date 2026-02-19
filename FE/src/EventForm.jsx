import React, { useState } from "react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    rollNo: "",
    collegeName: "",
    gender: "",
    mobileNo: "",
    email: "",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [showData, setShowData] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/students`);
      const data = await response.json();
      if (response.ok) {
        setStudents(data);
        setShowData(true);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Map frontend fields to backend fields
    const studentData = {
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      roll_number: formData.rollNo,
      dob: formData.dob,
      college_name: formData.collegeName,
      gender: formData.gender,
      blood_group: formData.bloodGroup,
      contact_number: formData.mobileNo,
      email: formData.email
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Form Submitted Successfully:", result);
        alert("Registration Successful!");
        
        // Refresh data list if it's currently showing
        if (showData) {
          fetchStudents();
        }

        // Reset form
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          dob: "",
          rollNo: "",
          collegeName: "",
          gender: "",
          mobileNo: "",
          email: "",
          bloodGroup: "",
        });
      } else {
        setError(result.message || "An error occurred while registering.");
      }
    } catch (err) {
      console.error("API Call Error:", err);
      setError("Failed to connect to the server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl w-full">
        <div className="form-card overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 -mx-8 -mt-8 px-8 py-6 mb-8">
            <h2 className="text-3xl font-extrabold text-white text-center tracking-tight">
              College Event Registration
            </h2>
            <p className="text-indigo-100 text-center mt-2 font-medium">
              Join us for an unforgettable experience. Please fill in your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="label-text">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div>
                <label className="label-text">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter Middle Name"
                />
              </div>
              <div>
                <label className="label-text">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>

            {/* DOB & Roll No & College Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="label-text">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="label-text">Roll No</label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="CS2024001"
                  required
                />
              </div>
              <div>
                <label className="label-text">College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Tech Institute of Science"
                  required
                />
              </div>
            </div>

            {/* Gender & Blood Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Gender</label>
                <div className="radio-group h-11 flex items-center bg-slate-50 rounded-lg px-4 border border-slate-200">
                  <label className="radio-option mr-6">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="radio-input mr-2"
                      required
                    />
                    <span className="text-sm font-medium text-slate-700">Male</span>
                  </label>
                  <label className="radio-option mr-6">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="radio-input mr-2"
                    />
                    <span className="text-sm font-medium text-slate-700">Female</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleChange}
                      className="radio-input mr-2"
                    />
                    <span className="text-sm font-medium text-slate-700">Other</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="label-text">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Mobile No</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div>
                <label className="label-text">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="john.doe@college.edu"
                  required
                />
              </div>
            </div>

            {/* Show Data Section */}
            {showData && students.length > 0 && (
              <div className="mt-8 overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Roll No</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">College</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                          {student.first_name} {student.last_name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 font-mono">
                          {student.roll_number}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                          {student.college_name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                          {student.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Buttons Section */}
            <div className="pt-4 flex flex-col gap-4">
              <button 
                type="button"
                onClick={fetchStudents}
                className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Show Data
              </button>

              <button 
                type="submit" 
                className={`btn-primary flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Register for Event"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer Info */}
        <p className="mt-8 text-center text-slate-500 text-sm">
          &copy; PrompterTech 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
}